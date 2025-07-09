SELECT
    u.id AS "ID_Pengguna",
    u.name AS "Nama_Pengguna",
    u.email AS "Email",
    u.phone_number AS "Nomor_Telepon",
    pendapatan.Detail_Pendapatan AS "Pemasukan",
    pengeluaran.Detail_Pengeluaran AS "Pengeluaran",
    anggaran.Detail_Anggaran AS "Anggaran",
    tujuan.Detail_Tujuan AS "Tujuan_Finansial",
    kekayaan_bersih.Detail_Kekayaan_Bersih AS "Kekayaan_Bersih",
    aset.Detail_Aset AS "Aset",
    liabilitas.Detail_Liabilitas AS "Liabilitas",
    saldo_tujuan.Detail_Saldo_Tujuan AS "Riwayat_Menabung"

FROM cuanku.users u

-- 1. Pendapatan / Penghasilan (HANYA BULAN INI)
LEFT JOIN (
    SELECT
        i.user_id,
        JSON_ARRAYAGG(JSON_OBJECT(
            'Sumber_Pendapatan', b.detail,
            'Tanggal', i.date,
            'Nominal', i.nominal,
            'Bulan', i.month,
            'Tahun', i.year,
            'Catatan', i.notes
        )) AS "Detail_Pendapatan"
    FROM cuanku.incomes i
    JOIN cuanku.budgets b ON i.budget_id = b.id
    -- Filter untuk tahun dan bulan saat ini
    WHERE i.year = YEAR(CURDATE()) AND i.month = ELT(MONTH(CURDATE()), 'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember')
    GROUP BY i.user_id
) pendapatan ON u.id = pendapatan.user_id

-- 2. Pengeluaran (Termasuk Belanja) (HANYA BULAN INI)
LEFT JOIN (
    SELECT
        e.user_id,
        JSON_ARRAYAGG(JSON_OBJECT(
            'Tanggal', e.date,
            'Deskripsi', e.description,
            'Jenis_Pengeluaran', e.type,
            'Nominal', e.nominal,
            'Bulan', e.month,
            'Tahun', e.year,
            'Catatan', e.notes
        )) AS "Detail_Pengeluaran"
    FROM cuanku.expenses e
    -- Filter untuk tahun dan bulan saat ini
    WHERE e.year = YEAR(CURDATE()) AND e.month = ELT(MONTH(CURDATE()), 'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember')
    GROUP BY e.user_id
) pengeluaran ON u.id = pengeluaran.user_id

-- 3. Anggaran (Mencakup Tabungan, Investasi, Belanja, Tagihan, Cicilan Hutang) (HANYA BULAN INI)
LEFT JOIN (
    SELECT
        b.user_id,
        JSON_ARRAYAGG(JSON_OBJECT(
            'Detail_Anggaran', b.detail,
            'Jenis_Anggaran', b.type,
            'Nominal_Anggaran', b.nominal,
            'Bulan', b.month,
            'Tahun', b.year
        )) AS "Detail_Anggaran"
    FROM cuanku.budgets b
    -- Filter untuk tahun dan bulan saat ini
    WHERE b.year = YEAR(CURDATE()) AND b.month = ELT(MONTH(CURDATE()), 'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember')
    GROUP BY b.user_id
) anggaran ON u.id = anggaran.user_id

-- 4. Tujuan Finansial (Goals) - Menampilkan status total, bukan hanya bulan ini
LEFT JOIN (
    SELECT
        user_id,
        JSON_ARRAYAGG(JSON_OBJECT(
            'Nama_Tujuan', nama_tujuan,
            'Target_Nominal', target_nominal,
            'Tabungan_Bulanan', tabungan_bulanan,
            'Jumlah_Sekarang', jumlah_sekarang,
            'Persentase_Kemajuan', persentase_kemajuan,
            'Tenggat_Waktu', tenggat_waktu
        )) AS "Detail_Tujuan"
    FROM (
        SELECT
            g.user_id,
            g.name AS nama_tujuan,
            g.nominal AS target_nominal,
            g.monthly_saving AS tabungan_bulanan,
            (g.beginning_balance + COALESCE(SUM(b.amount), 0)) AS jumlah_sekarang,
            g.percentage AS persentase_kemajuan,
            g.deadline AS tenggat_waktu
        FROM cuanku.goals g
        LEFT JOIN cuanku.balances b ON g.id = b.goal_id
        GROUP BY g.id -- Agregasi per tujuan unik
    ) AS data_tujuan
    GROUP BY user_id -- Agregasi per pengguna
) tujuan ON u.id = tujuan.user_id

-- 5. Kekayaan Bersih (Net Worth) - Menampilkan status total tahun ini
LEFT JOIN (
    SELECT
        nw.user_id,
        JSON_ARRAYAGG(JSON_OBJECT(
            'Target_Kekayaan_Bersih', nw.net_worth_goal,
            'Kekayaan_Bersih_Saat_Ini', nw.current_net_worth,
            'Kekurangan', nw.amount_left,
            'Tahun', nw.year
        )) AS "Detail_Kekayaan_Bersih"
    FROM cuanku.net_worths nw
    WHERE nw.year = YEAR(CURDATE()) -- Filter untuk tahun saat ini
    GROUP BY nw.user_id
) kekayaan_bersih ON u.id = kekayaan_bersih.user_id

-- 6. Aset - Menampilkan total aset
LEFT JOIN (
    SELECT
        a.user_id,
        JSON_ARRAYAGG(JSON_OBJECT(
            'Detail_Aset', a.detail,
            'Tujuan_Aset', a.goal,
            'Jenis_Aset', a.type,
            'Nominal_Saat_Ini', (SELECT SUM(nwa.nominal) FROM cuanku.net_worth_assets nwa WHERE nwa.asset_id = a.id)
        )) AS "Detail_Aset"
    FROM cuanku.assets a
    GROUP BY a.user_id
) aset ON u.id = aset.user_id

-- 7. Liabilitas / Hutang - Menampilkan total liabilitas
LEFT JOIN (
    SELECT
        l.user_id,
        JSON_ARRAYAGG(JSON_OBJECT(
            'Detail_Liabilitas', l.detail,
            'Tujuan_Liabilitas', l.goal,
            'Jenis_Liabilitas', l.type,
            'Nominal_Saat_Ini', (SELECT SUM(nwl.nominal) FROM cuanku.net_worth_liabilities nwl WHERE nwl.liability_id = l.id)
        )) AS "Detail_Liabilitas"
    FROM cuanku.liabilities l
    GROUP BY l.user_id
) liabilitas ON u.id = liabilitas.user_id

-- 8. Saldo (Balances) - Riwayat penambahan dana untuk tujuan (HANYA BULAN INI)
LEFT JOIN (
    SELECT
        b.user_id,
        JSON_ARRAYAGG(JSON_OBJECT(
            'ID_Tujuan', b.goal_id,
            'Nama_Tujuan', g.name,
            'Jumlah_Ditambahkan', b.amount,
            'Tanggal_Penambahan', b.created_at
        )) AS "Detail_Saldo_Tujuan"
    FROM cuanku.balances b
    JOIN cuanku.goals g ON b.goal_id = g.id
    -- Filter untuk tahun dan bulan saat ini
    WHERE YEAR(b.created_at) = YEAR(CURDATE()) AND MONTH(b.created_at) = MONTH(CURDATE())
    GROUP BY b.user_id
) saldo_tujuan ON u.id = saldo_tujuan.user_id

-- Filter Pengguna
WHERE
    u.phone_number IS NOT NULL
    AND u.role != 'admin'
    AND u.is_agentic IS TRUE;