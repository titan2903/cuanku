-- Query untuk membuat laporan keuangan tahunan komprehensif per pengguna
SELECT 
    u.name AS "Nama",
    u.email AS "Email",
    u.phone_number AS "Nomor Telepon",
    YEAR(CURDATE()) AS "Tahun",
    
    -- Summary Anggaran vs Realisasi Tahunan
    bt.total_budget AS "Total Anggaran Tahunan",
    bt.total_expense AS "Total Pengeluaran Tahunan",
    bt.total_budget - bt.total_expense AS "Selisih Anggaran Tahunan",
    
    -- Summary Pendapatan Tahunan
    inc.total_income AS "Total Pendapatan Tahunan",
    
    -- Rasio Pengeluaran-Pendapatan
    CASE 
        WHEN inc.total_income > 0 THEN ROUND((bt.total_expense / inc.total_income) * 100, 2)
        ELSE 0 
    END AS "Rasio Pengeluaran (%)",
    
    -- Progres Tujuan Keuangan
    g.goal_count AS "Jumlah Tujuan Keuangan",
    g.completed_goals AS "Tujuan Tercapai",
    g.total_saved AS "Total Tabungan Tahun Ini",
    g.avg_progress AS "Rata-rata Kemajuan Tujuan (%)",
    
    -- Perubahan Kekayaan Bersih
    nw.beginning_net_worth AS "Kekayaan Bersih Awal Tahun",
    nw.current_net_worth AS "Kekayaan Bersih Saat Ini",
    nw.current_net_worth - nw.beginning_net_worth AS "Perubahan Kekayaan Bersih",
    nw.total_assets AS "Total Aset",
    nw.total_liabilities AS "Total Kewajiban",
    
    -- Ringkasan Hutang
    dp.total_debt AS "Total Hutang",
    dp.paid_debt AS "Total Hutang Terbayar",
    dp.total_debt - dp.paid_debt AS "Sisa Hutang"

FROM cuanku.users u
LEFT JOIN (
    -- Agregasi Anggaran dan Pengeluaran Tahunan
    SELECT 
        b.user_id,
        SUM(b.nominal) as total_budget,
        COALESCE(SUM(e.nominal), 0) as total_expense
    FROM cuanku.budgets b
    LEFT JOIN cuanku.expenses e ON b.id = e.budget_id AND b.year = e.year
    WHERE b.year = YEAR(CURDATE())
    GROUP BY b.user_id
) bt ON u.id = bt.user_id

LEFT JOIN (
    -- Agregasi Pendapatan Tahunan
    SELECT 
        i.user_id,
        SUM(i.nominal) as total_income
    FROM cuanku.incomes i
    WHERE i.year = YEAR(CURDATE())
    GROUP BY i.user_id
) inc ON u.id = inc.user_id

LEFT JOIN (
    -- Agregasi Tujuan Keuangan dan Progresnya
    SELECT 
        g.user_id,
        COUNT(g.id) as goal_count,
        SUM(CASE WHEN g.percentage >= 100 THEN 1 ELSE 0 END) as completed_goals,
        SUM(COALESCE(b.amount, 0)) as total_saved,
        AVG(g.percentage) as avg_progress
    FROM cuanku.goals g
    LEFT JOIN cuanku.balances b ON g.id = b.goal_id 
        AND YEAR(b.created_at) = YEAR(CURDATE())
    WHERE g.created_at <= LAST_DAY(CONCAT(YEAR(CURDATE()), '-12-31'))
    GROUP BY g.user_id
) g ON u.id = g.user_id

LEFT JOIN (
    -- Agregasi Kekayaan Bersih
    SELECT
        nw.user_id,
        -- Kekayaan di awal tahun
        (SELECT COALESCE(nw_start.current_net_worth, 0)
         FROM cuanku.net_worths nw_start 
         WHERE nw_start.user_id = nw.user_id 
         AND nw_start.created_at <= CONCAT(YEAR(CURDATE()), '-01-01')
         ORDER BY nw_start.created_at DESC LIMIT 1) as beginning_net_worth,
        -- Kekayaan saat ini
        nw.current_net_worth,
        SUM(COALESCE(nwa.nominal, 0)) as total_assets,
        SUM(COALESCE(nwl.nominal, 0)) as total_liabilities
    FROM cuanku.net_worths nw
    LEFT JOIN cuanku.assets a ON nw.id = a.net_worth_id
    LEFT JOIN cuanku.net_worth_assets nwa ON a.id = nwa.asset_id
    LEFT JOIN cuanku.liabilities l ON nw.id = l.net_worth_id
    LEFT JOIN cuanku.net_worth_liabilities nwl ON l.id = nwl.liability_id
    WHERE nw.year = YEAR(CURDATE())
    GROUP BY nw.user_id, nw.current_net_worth
) nw ON u.id = nw.user_id

LEFT JOIN (
    -- Agregasi Pembayaran Hutang
    SELECT
        b.user_id,
        SUM(b.nominal) as total_debt,
        SUM(COALESCE(e.nominal, 0)) as paid_debt
    FROM cuanku.budgets b
    LEFT JOIN cuanku.expenses e ON b.id = e.budget_id
    WHERE b.type = 'Cicilan Hutang'
      AND b.year = YEAR(CURDATE())
    GROUP BY b.user_id
) dp ON u.id = dp.user_id

WHERE u.phone_number IS NOT NULL and u.name != 'admin' and u.email in ('titanioy98@gmail.com', 'fadilananda256@gmail.com', 'arwantiyeninur@gmail.com')
-- Tidak perlu GROUP BY karena sub-query sudah melakukan agregasi
ORDER BY u.name;