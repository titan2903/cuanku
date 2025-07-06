-- This SQL query retrieves a comprehensive monthly financial summary for each user, including budget vs actual expenses, income sources, expenses by type, goals, net worth, income vs expense summary, and debt payments with GROUP BY clauses to ensure unique rows.
SELECT 
    u.name AS "Nama",
    u.email AS "Email",
    u.phone_number AS "Nomor Telepon",
    
    -- Budget vs Actual
    bt.type AS "Jenis Anggaran",
    bt.budget_amount AS "Jumlah Anggaran",
    bt.actual_expense AS "Pengeluaran Aktual",
    bt.difference AS "Selisih",
    
    -- Income Source
    is_data.income_source AS "Sumber Pendapatan",
    is_data.total_income AS "Total Pendapatan",
    
    -- Expenses by Type
    et.type AS "Jenis Pengeluaran",
    et.total_expense AS "Total Pengeluaran",
    
    -- Goals
    g.goal_name AS "Nama Tujuan",
    g.target_amount AS "Jumlah Target",
    g.monthly_target AS "Target Bulanan",
    g.current_amount AS "Jumlah Saat Ini",
    g.progress_percentage AS "Persentase Kemajuan",
    g.deadline AS "Tenggat Waktu",
    
    -- Net Worth
    nw.net_worth_goal AS "Target Kekayaan Bersih",
    nw.current_net_worth AS "Kekayaan Bersih Saat Ini",
    nw.amount_left AS "Jumlah Tersisa",
    nw.total_assets AS "Total Aset",
    nw.total_liabilities AS "Total Kewajiban",
    
    -- Income vs Expense Summary
    ie.category AS "Kategori",
    ie.amount AS "Jumlah",
    
    -- Debt Payments
    dp.debt_name AS "Nama Hutang",
    dp.planned_payment AS "Pembayaran Direncanakan",
    dp.actual_payment AS "Pembayaran Aktual",
    dp.difference AS "Selisih Pembayaran"

FROM cuanku.users u
LEFT JOIN (
    -- Budget vs Actual
    SELECT 
        b.user_id,
        b.type, 
        SUM(b.nominal) as budget_amount,
        COALESCE(SUM(e.nominal), 0) as actual_expense,
        SUM(b.nominal) - COALESCE(SUM(e.nominal), 0) as difference
    FROM cuanku.budgets b
    LEFT JOIN cuanku.expenses e ON b.id = e.budget_id AND b.month = e.month AND b.year = e.year
    WHERE b.month = MONTH(CURDATE()) AND b.year = YEAR(CURDATE())
    GROUP BY b.user_id, b.type
) bt ON u.id = bt.user_id

LEFT JOIN (
    -- Income Sources
    SELECT 
        i.user_id,
        b.detail as income_source,
        SUM(i.nominal) as total_income
    FROM cuanku.incomes i
    JOIN cuanku.budgets b ON i.budget_id = b.id
    WHERE i.month = MONTH(CURDATE()) AND i.year = YEAR(CURDATE())
    GROUP BY i.user_id, b.detail
) is_data ON u.id = is_data.user_id

LEFT JOIN (
    -- Expenses by Type
    SELECT 
        e.user_id,
        e.type,
        SUM(e.nominal) as total_expense
    FROM cuanku.expenses e
    WHERE e.month = MONTH(CURDATE()) AND e.year = YEAR(CURDATE())
    GROUP BY e.user_id, e.type
) et ON u.id = et.user_id

LEFT JOIN (
    -- Goals
    SELECT 
        g.user_id,
        g.name as goal_name,
        g.nominal as target_amount,
        g.monthly_saving as monthly_target,
        g.beginning_balance + COALESCE(SUM(b.amount), 0) as current_amount,
        g.percentage as progress_percentage,
        g.deadline
    FROM cuanku.goals g
    LEFT JOIN cuanku.balances b ON g.id = b.goal_id 
        AND (MONTH(b.created_at) = MONTH(CURDATE()) AND YEAR(b.created_at) = YEAR(CURDATE()))
    GROUP BY g.user_id, g.id, g.name, g.nominal, g.monthly_saving, g.beginning_balance, g.percentage, g.deadline
) g ON u.id = g.user_id

LEFT JOIN (
    -- Net Worth
    SELECT
        nw.user_id,
        nw.net_worth_goal,
        nw.current_net_worth,
        nw.amount_left,
        SUM(COALESCE(nwa.nominal, 0)) as total_assets,
        SUM(COALESCE(nwl.nominal, 0)) as total_liabilities
    FROM cuanku.net_worths nw
    LEFT JOIN cuanku.assets a ON nw.id = a.net_worth_id
    LEFT JOIN cuanku.net_worth_assets nwa ON a.id = nwa.asset_id
    LEFT JOIN cuanku.liabilities l ON nw.id = l.net_worth_id
    LEFT JOIN cuanku.net_worth_liabilities nwl ON l.id = nwl.liability_id
    WHERE nw.year = YEAR(CURDATE())
    GROUP BY nw.user_id, nw.net_worth_goal, nw.current_net_worth, nw.amount_left
) nw ON u.id = nw.user_id

LEFT JOIN (
    -- Income vs Expense
    SELECT
        user_id,
        category,
        amount
    FROM (
        SELECT
            i.user_id,
            'Pemasukan' as category,
            SUM(i.nominal) as amount
        FROM cuanku.incomes i
        WHERE i.month = MONTH(CURDATE()) AND i.year = YEAR(CURDATE())
        GROUP BY i.user_id
        
        UNION ALL
        
        SELECT
            e.user_id,
            'Pengeluaran' as category,
            SUM(e.nominal) as amount
        FROM cuanku.expenses e
        WHERE e.month = MONTH(CURDATE()) AND e.year = YEAR(CURDATE())
        GROUP BY e.user_id
    ) income_expense
) ie ON u.id = ie.user_id

LEFT JOIN (
    -- Debt Payments
    SELECT
        b.user_id,
        b.detail as debt_name,
        b.nominal as planned_payment,
        COALESCE(SUM(e.nominal), 0) as actual_payment,
        b.nominal - COALESCE(SUM(e.nominal), 0) as difference
    FROM cuanku.budgets b
    LEFT JOIN cuanku.expenses e ON b.id = e.budget_id
    WHERE b.type = 'Cicilan Hutang'
      AND b.month = MONTH(CURDATE()) 
      AND b.year = YEAR(CURDATE())
    GROUP BY b.user_id, b.id, b.detail, b.nominal
) dp ON u.id = dp.user_id

WHERE u.phone_number IS NOT NULL

GROUP BY 
    u.name, u.email, u.phone_number, 
    bt.type, bt.budget_amount, bt.actual_expense, bt.difference,
    is_data.income_source, is_data.total_income, 
    et.type, et.total_expense,
    g.goal_name, g.target_amount, g.monthly_target, g.current_amount, g.progress_percentage, g.deadline,
    nw.net_worth_goal, nw.current_net_worth, nw.amount_left, nw.total_assets, nw.total_liabilities,
    ie.category, ie.amount,
    dp.debt_name, dp.planned_payment, dp.actual_payment, dp.difference;



-- This query provides a detailed monthly financial summary for each user, ensuring that all relevant financial data is captured and presented in a structured format using aggreation functions.
SELECT 
    u.name AS "Nama",
    u.email AS "Email",
    u.phone_number AS "Nomor Telepon",
    
    -- Budget vs Actual
    bt.type AS "Jenis Anggaran",
    bt.budget_amount AS "Jumlah Anggaran",
    bt.actual_expense AS "Pengeluaran Aktual",
    bt.difference AS "Selisih",
    
    -- Income Source
    is_data.income_source AS "Sumber Pendapatan",
    is_data.total_income AS "Total Pendapatan",
    
    -- Expenses by Type
    et.type AS "Jenis Pengeluaran",
    et.total_expense AS "Total Pengeluaran",
    
    -- Goals
    g.goal_name AS "Nama Tujuan",
    g.target_amount AS "Jumlah Target",
    g.monthly_target AS "Target Bulanan",
    g.current_amount AS "Jumlah Saat Ini",
    g.progress_percentage AS "Persentase Kemajuan",
    g.deadline AS "Tenggat Waktu",
    
    -- Net Worth
    nw.net_worth_goal AS "Target Kekayaan Bersih",
    nw.current_net_worth AS "Kekayaan Bersih Saat Ini",
    nw.amount_left AS "Jumlah Tersisa",
    nw.total_assets AS "Total Aset",
    nw.total_liabilities AS "Total Kewajiban",
    
    -- Income vs Expense Summary
    ie.category AS "Kategori",
    ie.amount AS "Jumlah",
    
    -- Debt Payments
    dp.debt_name AS "Nama Hutang",
    dp.planned_payment AS "Pembayaran Direncanakan",
    dp.actual_payment AS "Pembayaran Aktual",
    dp.difference AS "Selisih Pembayaran"

FROM cuanku.users u
LEFT JOIN (
    -- Budget vs Actual
    SELECT 
        b.user_id,
        b.type, 
        SUM(b.nominal) as budget_amount,
        COALESCE(SUM(e.nominal), 0) as actual_expense,
        SUM(b.nominal) - COALESCE(SUM(e.nominal), 0) as difference
    FROM cuanku.budgets b
    LEFT JOIN cuanku.expenses e ON b.id = e.budget_id AND b.month = e.month AND b.year = e.year
    WHERE b.month = MONTH(CURDATE()) AND b.year = YEAR(CURDATE())
    GROUP BY b.user_id, b.type
) bt ON u.id = bt.user_id

LEFT JOIN (
    -- Income Sources
    SELECT 
        i.user_id,
        b.detail as income_source,
        SUM(i.nominal) as total_income
    FROM cuanku.incomes i
    JOIN cuanku.budgets b ON i.budget_id = b.id
    WHERE i.month = MONTH(CURDATE()) AND i.year = YEAR(CURDATE())
    GROUP BY i.user_id, b.detail
) is_data ON u.id = is_data.user_id

LEFT JOIN (
    -- Expenses by Type
    SELECT 
        e.user_id,
        e.type,
        SUM(e.nominal) as total_expense
    FROM cuanku.expenses e
    WHERE e.month = MONTH(CURDATE()) AND e.year = YEAR(CURDATE())
    GROUP BY e.user_id, e.type
) et ON u.id = et.user_id

LEFT JOIN (
    -- Goals
    SELECT 
        g.user_id,
        g.name as goal_name,
        g.nominal as target_amount,
        g.monthly_saving as monthly_target,
        g.beginning_balance + COALESCE(SUM(b.amount), 0) as current_amount,
        g.percentage as progress_percentage,
        g.deadline
    FROM cuanku.goals g
    LEFT JOIN cuanku.balances b ON g.id = b.goal_id 
        AND (MONTH(b.created_at) = MONTH(CURDATE()) AND YEAR(b.created_at) = YEAR(CURDATE()))
    GROUP BY g.user_id, g.id, g.name, g.nominal, g.monthly_saving, g.beginning_balance, g.percentage, g.deadline
) g ON u.id = g.user_id

LEFT JOIN (
    -- Net Worth
    SELECT
        nw.user_id,
        nw.net_worth_goal,
        nw.current_net_worth,
        nw.amount_left,
        SUM(COALESCE(nwa.nominal, 0)) as total_assets,
        SUM(COALESCE(nwl.nominal, 0)) as total_liabilities
    FROM cuanku.net_worths nw
    LEFT JOIN cuanku.assets a ON nw.id = a.net_worth_id
    LEFT JOIN cuanku.net_worth_assets nwa ON a.id = nwa.asset_id
    LEFT JOIN cuanku.liabilities l ON nw.id = l.net_worth_id
    LEFT JOIN cuanku.net_worth_liabilities nwl ON l.id = nwl.liability_id
    WHERE nw.year = YEAR(CURDATE())
    GROUP BY nw.user_id, nw.net_worth_goal, nw.current_net_worth, nw.amount_left
) nw ON u.id = nw.user_id

LEFT JOIN (
    -- Income vs Expense
    SELECT
        user_id,
        category,
        amount
    FROM (
        SELECT
            i.user_id,
            'Pemasukan' as category,
            SUM(i.nominal) as amount
        FROM cuanku.incomes i
        WHERE i.month = MONTH(CURDATE()) AND i.year = YEAR(CURDATE())
        GROUP BY i.user_id
        
        UNION ALL
        
        SELECT
            e.user_id,
            'Pengeluaran' as category,
            SUM(e.nominal) as amount
        FROM cuanku.expenses e
        WHERE e.month = MONTH(CURDATE()) AND e.year = YEAR(CURDATE())
        GROUP BY e.user_id
    ) income_expense
) ie ON u.id = ie.user_id

LEFT JOIN (
    -- Debt Payments
    SELECT
        b.user_id,
        b.detail as debt_name,
        b.nominal as planned_payment,
        COALESCE(SUM(e.nominal), 0) as actual_payment,
        b.nominal - COALESCE(SUM(e.nominal), 0) as difference
    FROM cuanku.budgets b
    LEFT JOIN cuanku.expenses e ON b.id = e.budget_id
    WHERE b.type = 'Cicilan Hutang'
      AND b.month = MONTH(CURDATE()) 
      AND b.year = YEAR(CURDATE())
    GROUP BY b.user_id, b.id, b.detail, b.nominal
) dp ON u.id = dp.user_id

WHERE u.phone_number IS NOT NULL and u.name != 'admin' and u.email in ('titanioy98@gmail.com', 'fadilananda256@gmail.com', 'arwantiyeninur@gmail.com');