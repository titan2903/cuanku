<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Laporan Pelacakan {{ $month }} {{ $year }} - CuanKu</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'DejaVu Sans', sans-serif;
            font-size: 12px;
            line-height: 1.4;
            color: #333;
        }

        .header {
            text-align: center;
            margin-bottom: 30px;
            padding-bottom: 20px;
            border-bottom: 2px solid #10b981;
        }

        .header h1 {
            color: #10b981;
            font-size: 24px;
            margin-bottom: 5px;
        }

        .header h2 {
            color: #6b7280;
            font-size: 16px;
            font-weight: normal;
        }

        .section {
            margin-bottom: 25px;
            page-break-inside: avoid;
        }

        .section-title {
            background-color: #10b981;
            color: white;
            padding: 8px 12px;
            font-size: 14px;
            font-weight: bold;
            margin-bottom: 10px;
        }

        .table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 15px;
        }

        .table th,
        .table td {
            border: 1px solid #d1d5db;
            padding: 8px;
            text-align: left;
        }

        .table th {
            background-color: #f3f4f6;
            font-weight: bold;
            font-size: 11px;
        }

        .table td {
            font-size: 10px;
        }

        .table tfoot td {
            background-color: #10b981;
            color: white;
            font-weight: bold;
        }

        .currency {
            text-align: right;
        }

        .grid {
            display: table;
            width: 100%;
            margin-bottom: 20px;
        }

        .grid-item {
            display: table-cell;
            width: 50%;
            padding-right: 10px;
            vertical-align: top;
        }

        .grid-item:last-child {
            padding-right: 0;
        }

        .overview-card {
            background-color: #f8fafc;
            border: 1px solid #e2e8f0;
            border-radius: 8px;
            padding: 15px;
            margin-bottom: 15px;
        }

        .overview-title {
            font-size: 14px;
            font-weight: bold;
            color: #1f2937;
            margin-bottom: 10px;
        }

        .cash-flow-positive {
            color: #10b981;
        }

        .cash-flow-negative {
            color: #ef4444;
        }

        .footer {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            height: 30px;
            text-align: center;
            font-size: 10px;
            color: #6b7280;
            border-top: 1px solid #e5e7eb;
            padding-top: 5px;
        }

        .page-break {
            page-break-before: always;
        }

        .no-data {
            text-align: center;
            color: #6b7280;
            font-style: italic;
            padding: 20px;
        }

        .category-badge {
            padding: 2px 6px;
            border-radius: 4px;
            font-size: 9px;
            font-weight: bold;
            color: white;
        }

        .category-income { background-color: #10b981; }
        .category-saving { background-color: #3b82f6; }
        .category-debt { background-color: #ef4444; }
        .category-bill { background-color: #f59e0b; }
        .category-shopping { background-color: #8b5cf6; }
        .category-expense { background-color: #6b7280; }

        .tracker-section {
            margin-top: 20px;
        }

        .tracker-item {
            background-color: #f9fafb;
            border-left: 4px solid #10b981;
            padding: 10px;
            margin-bottom: 8px;
        }

        .tracker-date {
            font-weight: bold;
            color: #374151;
        }

        .tracker-amount {
            font-weight: bold;
            color: #10b981;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>Laporan Pelacakan {{ $month }} {{ $year }}</h1>
        <h2>CuanKu - Personal Finance Management</h2>
        <p style="margin-top: 10px; color: #6b7280;">Digenerate pada {{ $generatedAt->translatedFormat('d F Y, H:i') }} WIB</p>
    </div>

    <!-- Cash Flow Overview -->
    <div class="section">
        <div class="section-title">💰 Ringkasan Arus Kas</div>
        <div class="grid">
            @foreach($cashFlows as $category => $flow)
            <div class="grid-item">
                <div class="overview-card">
                    <div class="overview-title">{{ $category }}</div>
                    <table class="table">
                        <thead>
                            <tr>
                                <th>Aspek</th>
                                <th class="currency">Rencana</th>
                                <th class="currency">Aktual</th>
                                <th class="currency">Selisih</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{{ $category }}</td>
                                <td class="currency">{{ 'Rp ' . number_format($flow['plan'], 0, ',', '.') }}</td>
                                <td class="currency">{{ 'Rp ' . number_format($flow['actual'], 0, ',', '.') }}</td>
                                <td class="currency" style="color: {{ $flow['difference'] >= 0 ? '#10b981' : '#ef4444' }}">
                                    {{ 'Rp ' . number_format($flow['difference'], 0, ',', '.') }}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            @endforeach
        </div>
    </div>

    <!-- Budget Overview -->
    <div class="section">
        <div class="section-title">📊 Ringkasan Budget per Kategori</div>
        <table class="table">
            <thead>
                <tr>
                    <th>Kategori</th>
                    <th class="currency">Rencana</th>
                    <th class="currency">Aktual</th>
                    <th class="currency">Selisih</th>
                    <th class="currency">Persentase</th>
                </tr>
            </thead>
            <tbody>
                @foreach($overviews as $category => $overview)
                <tr>
                    <td>
                        <span class="category-badge 
                            @if($category == 'Tabungan dan Investasi') category-saving
                            @elseif($category == 'Cicilan Hutang') category-debt
                            @elseif($category == 'Tagihan') category-bill
                            @elseif($category == 'Belanja') category-shopping
                            @elseif($category == 'Pengeluaran') category-expense
                            @endif">
                            {{ $category }}
                        </span>
                    </td>
                    <td class="currency">{{ 'Rp ' . number_format($overview['plan'], 0, ',', '.') }}</td>
                    <td class="currency">{{ 'Rp ' . number_format($overview['actual'], 0, ',', '.') }}</td>
                    <td class="currency" style="color: {{ $overview['difference'] >= 0 ? '#10b981' : '#ef4444' }}">
                        {{ 'Rp ' . number_format($overview['difference'], 0, ',', '.') }}
                    </td>
                    <td class="currency">
                        {{ $overview['plan'] > 0 ? number_format(($overview['actual'] / $overview['plan']) * 100, 1) : '0' }}%
                    </td>
                </tr>
                @endforeach
            </tbody>
        </table>
    </div>

    <!-- Budget Details -->
    <div class="section">
        <div class="section-title">📈 Detail Budget Penghasilan</div>
        @if(count($reports['budgetIncomes']['data']) > 0)
            <table class="table">
                <thead>
                    <tr>
                        <th>Budget</th>
                        <th class="currency">Rencana</th>
                        <th class="currency">Aktual</th>
                        <th class="currency">Selisih</th>
                        <th class="currency">Persentase</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach($reports['budgetIncomes']['data'] as $income)
                    <tr>
                        <td>{{ $income['budget_name'] }}</td>
                        <td class="currency">{{ 'Rp ' . number_format($income['plan'], 0, ',', '.') }}</td>
                        <td class="currency">{{ 'Rp ' . number_format($income['actual'], 0, ',', '.') }}</td>
                        <td class="currency" style="color: {{ $income['difference'] >= 0 ? '#10b981' : '#ef4444' }}">
                            {{ 'Rp ' . number_format($income['difference'], 0, ',', '.') }}
                        </td>
                        <td class="currency">{{ $income['plan'] > 0 ? number_format(($income['actual'] / $income['plan']) * 100, 1) : '0' }}%</td>
                    </tr>
                    @endforeach
                </tbody>
                <tfoot>
                    <tr>
                        <td><strong>Total</strong></td>
                        <td class="currency"><strong>{{ 'Rp ' . number_format($reports['budgetIncomes']['total']['plan'], 0, ',', '.') }}</strong></td>
                        <td class="currency"><strong>{{ 'Rp ' . number_format($reports['budgetIncomes']['total']['actual'], 0, ',', '.') }}</strong></td>
                        <td class="currency"><strong>{{ 'Rp ' . number_format($reports['budgetIncomes']['total']['difference'], 0, ',', '.') }}</strong></td>
                        <td class="currency"><strong>{{ $reports['budgetIncomes']['total']['plan'] > 0 ? number_format(($reports['budgetIncomes']['total']['actual'] / $reports['budgetIncomes']['total']['plan']) * 100, 1) : '0' }}%</strong></td>
                    </tr>
                </tfoot>
            </table>
        @else
            <div class="no-data">Tidak ada data budget penghasilan untuk bulan {{ $month }} {{ $year }}</div>
        @endif
    </div>

    <div class="page-break"></div>

    <!-- Income Trackers -->
    <div class="section">
        <div class="section-title">💵 Pelacakan Penghasilan</div>
        @if(count($incomeTrackers) > 0)
            <div class="tracker-section">
                @foreach($incomeTrackers as $income)
                <div class="tracker-item">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <div>
                            <div class="tracker-date">{{ \Carbon\Carbon::parse($income['date'])->locale('id')->translatedFormat('d F Y') }}</div>
                            <div style="font-size: 10px; color: #6b7280;">{{ $income['notes'] ?? 'Tidak ada catatan' }}</div>
                        </div>
                        <div class="tracker-amount">{{ 'Rp ' . number_format($income['nominal'], 0, ',', '.') }}</div>
                    </div>
                </div>
                @endforeach
                <div style="margin-top: 15px; padding: 10px; background-color: #10b981; color: white; text-align: center; font-weight: bold;">
                    Total Penghasilan: {{ 'Rp ' . number_format(collect($incomeTrackers)->sum('nominal'), 0, ',', '.') }}
                </div>
            </div>
        @else
            <div class="no-data">Tidak ada data pelacakan penghasilan untuk bulan {{ $month }} {{ $year }}</div>
        @endif
    </div>

    <!-- Expense Trackers -->
    <div class="section">
        <div class="section-title">💸 Pelacakan Pengeluaran</div>
        @if(count($expenseTrackers) > 0)
            <div class="tracker-section">
                @foreach($expenseTrackers as $expense)
                <div class="tracker-item" style="border-left-color: #ef4444;">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <div>
                            <div class="tracker-date">{{ \Carbon\Carbon::parse($expense['date'])->locale('id')->translatedFormat('d F Y') }}</div>
                            <div style="font-size: 10px; color: #6b7280;">
                                {{ $expense['description'] }}
                                @if($expense['notes'])
                                - {{ $expense['notes'] }}
                                @endif
                            </div>
                            <div style="font-size: 9px; color: #9ca3af;">
                                <span class="category-badge 
                                    @if($expense['type'] == 'Tabungan dan Investasi') category-saving
                                    @elseif($expense['type'] == 'Cicilan Hutang') category-debt
                                    @elseif($expense['type'] == 'Tagihan') category-bill
                                    @elseif($expense['type'] == 'Belanja') category-shopping
                                    @elseif($expense['type'] == 'Pengeluaran') category-expense
                                    @endif">
                                    {{ $expense['type'] }}
                                </span>
                            </div>
                        </div>
                        <div style="color: #ef4444; font-weight: bold;">{{ 'Rp ' . number_format($expense['nominal'], 0, ',', '.') }}</div>
                    </div>
                </div>
                @endforeach
                <div style="margin-top: 15px; padding: 10px; background-color: #ef4444; color: white; text-align: center; font-weight: bold;">
                    Total Pengeluaran: {{ 'Rp ' . number_format(collect($expenseTrackers)->sum('nominal'), 0, ',', '.') }}
                </div>
            </div>
        @else
            <div class="no-data">Tidak ada data pelacakan pengeluaran untuk bulan {{ $month }} {{ $year }}</div>
        @endif
    </div>

    <div class="footer">
        <p>Laporan ini digenerate secara otomatis oleh CuanKu - Personal Finance Management Platform</p>
    </div>
</body>
</html>
