<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Laporan Pelacakan {{ $monthName }} {{ $year }} - CuanKu</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: 'DejaVu Sans', sans-serif;
            font-size: 12px;
            line-height: 1.5;
            color: #222;
            background: #fff;
            margin: 32px 36px 48px 36px;
        }
        .header {
            text-align: center;
            margin-bottom: 32px;
            padding-bottom: 18px;
            border-bottom: 3px solid #10b981;
        }
        .header h1 {
            color: #10b981;
            font-size: 28px;
            font-weight: bold;
            margin-bottom: 6px;
            letter-spacing: 1px;
        }
        .header h2 {
            color: #6b7280;
            font-size: 15px;
            font-weight: normal;
        }
        .header p {
            margin-top: 10px;
            color: #6b7280;
            font-size: 11px;
        }
        .section {
            margin-bottom: 32px;
            page-break-inside: avoid;
            padding: 0 6px;
        }
        .section-title {
            background-color: #10b981;
            color: white;
            padding: 7px 14px 7px 10px;
            font-size: 13.5px;
            font-weight: bold;
            margin-bottom: 13px;
            border-radius: 5px;
            display: flex;
            align-items: center;
            gap: 7px;
        }
        .table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 15px;
            background: #fff;
            border-radius: 7px;
            overflow: hidden;
            box-shadow: 0 1px 2px rgba(16,185,129,0.04);
        }
        .table th,
        .table td {
            border: 1px solid #d1d5db;
            padding: 9px 8px;
            text-align: left;
        }
        .table th {
            background-color: #e6f9f2;
            font-weight: bold;
            font-size: 12.5px;
            color: #059669;
            border-bottom: 2px solid #10b981;
        }
        .table td {
            font-size: 11px;
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
            display: flex;
            gap: 16px;
            width: 100%;
            margin-bottom: 18px;
        }
        .grid-item {
            flex: 1 1 0;
            min-width: 0;
        }
        .overview-card {
            background-color: #f8fafc;
            border: 1px solid #e2e8f0;
            border-radius: 8px;
            padding: 12px 10px 10px 10px;
            margin-bottom: 0;
        }
        .overview-title {
            font-size: 13px;
            font-weight: bold;
            color: #1f2937;
            margin-bottom: 8px;
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
            height: 26px;
            text-align: center;
            font-size: 9.5px;
            color: #a0aec0;
            border-top: 1px solid #e5e7eb;
            padding-top: 4px;
            background: #fff;
        }
        .page-break {
            page-break-before: always;
        }
        .no-data {
            text-align: center;
            color: #6b7280;
            font-style: italic;
            padding: 18px;
        }
        .category-badge {
            padding: 2px 7px;
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
            margin-top: 16px;
        }
        .tracker-item {
            background-color: #f9fafb;
            border-left: 4px solid #10b981;
            padding: 8px 10px;
            margin-bottom: 7px;
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
        <h1>Laporan Pelacakan {{ $monthName }} {{ $year }}</h1>
        <h2>CuanKu - Personal Finance Management</h2>
        <p style="margin-top: 10px; color: #6b7280; font-size:12px;">Digenerate pada {{ $generatedAt->translatedFormat('d F Y, H:i') }} WIB</p>
    </div>

    <!-- Cash Flow Overview -->
    <div class="section">
        <div class="section-title"><span style="font-size:15px;">💰</span> Ringkasan Arus Kas</div>
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
        <div class="section-title"><span style="font-size:15px;">📊</span> Ringkasan Budget per Kategori</div>
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
                            @elseif($category == 'Penghasilan') category-income
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
        <div class="section-title"><span style="font-size:15px;">📈</span> Detail Budget Penghasilan</div>
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
            <div class="no-data">Tidak ada data budget penghasilan untuk bulan {{ $monthName }} {{ $year }}</div>
        @endif
    </div>

    <!-- Detail Budget Pengeluaran -->
    <div class="section">
        <div class="section-title"><span style="font-size:15px;">💸</span> Detail Budget Pengeluaran</div>
        @if(count($reports['budgetExpenses']['data']) > 0)
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
                    @foreach($reports['budgetExpenses']['data'] as $expense)
                    <tr>
                        <td>{{ $expense['budget_name'] }}</td>
                        <td class="currency">{{ 'Rp ' . number_format($expense['plan'], 0, ',', '.') }}</td>
                        <td class="currency">{{ 'Rp ' . number_format($expense['actual'], 0, ',', '.') }}</td>
                        <td class="currency" style="color: {{ $expense['difference'] >= 0 ? '#10b981' : '#ef4444' }}">
                            {{ 'Rp ' . number_format($expense['difference'], 0, ',', '.') }}
                        </td>
                        <td class="currency">{{ $expense['plan'] > 0 ? number_format(($expense['actual'] / $expense['plan']) * 100, 1) : '0' }}%</td>
                    </tr>
                    @endforeach
                </tbody>
                <tfoot>
                    <tr>
                        <td><strong>Total</strong></td>
                        <td class="currency"><strong>{{ 'Rp ' . number_format($reports['budgetExpenses']['total']['plan'], 0, ',', '.') }}</strong></td>
                        <td class="currency"><strong>{{ 'Rp ' . number_format($reports['budgetExpenses']['total']['actual'], 0, ',', '.') }}</strong></td>
                        <td class="currency"><strong>{{ 'Rp ' . number_format($reports['budgetExpenses']['total']['difference'], 0, ',', '.') }}</strong></td>
                        <td class="currency"><strong>{{ $reports['budgetExpenses']['total']['plan'] > 0 ? number_format(($reports['budgetExpenses']['total']['actual'] / $reports['budgetExpenses']['total']['plan']) * 100, 1) : '0' }}%</strong></td>
                    </tr>
                </tfoot>
            </table>
        @else
            <div class="no-data">Tidak ada data budget pengeluaran untuk bulan {{ $monthName }} {{ $year }}</div>
        @endif
    </div>

    <!-- Detail Budget Tabungan & Investasi -->
    <div class="section">
        <div class="section-title"><span style="font-size:15px;">💎</span> Detail Budget Tabungan & Investasi</div>
        @if(count($reports['budgetSavings']['data']) > 0)
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
                    @foreach($reports['budgetSavings']['data'] as $saving)
                    <tr>
                        <td>{{ $saving['budget_name'] }}</td>
                        <td class="currency">{{ 'Rp ' . number_format($saving['plan'], 0, ',', '.') }}</td>
                        <td class="currency">{{ 'Rp ' . number_format($saving['actual'], 0, ',', '.') }}</td>
                        <td class="currency" style="color: {{ $saving['difference'] >= 0 ? '#10b981' : '#ef4444' }}">
                            {{ 'Rp ' . number_format($saving['difference'], 0, ',', '.') }}
                        </td>
                        <td class="currency">{{ $saving['plan'] > 0 ? number_format(($saving['actual'] / $saving['plan']) * 100, 1) : '0' }}%</td>
                    </tr>
                    @endforeach
                </tbody>
                <tfoot>
                    <tr>
                        <td><strong>Total</strong></td>
                        <td class="currency"><strong>{{ 'Rp ' . number_format($reports['budgetSavings']['total']['plan'], 0, ',', '.') }}</strong></td>
                        <td class="currency"><strong>{{ 'Rp ' . number_format($reports['budgetSavings']['total']['actual'], 0, ',', '.') }}</strong></td>
                        <td class="currency"><strong>{{ 'Rp ' . number_format($reports['budgetSavings']['total']['difference'], 0, ',', '.') }}</strong></td>
                        <td class="currency"><strong>{{ $reports['budgetSavings']['total']['plan'] > 0 ? number_format(($reports['budgetSavings']['total']['actual'] / $reports['budgetSavings']['total']['plan']) * 100, 1) : '0' }}%</strong></td>
                    </tr>
                </tfoot>
            </table>
        @else
            <div class="no-data">Tidak ada data budget tabungan & investasi untuk bulan {{ $monthName }} {{ $year }}</div>
        @endif
    </div>

    <!-- Detail Budget Cicilan Hutang -->
    <div class="section">
        <div class="section-title"><span style="font-size:15px;">💳</span> Detail Budget Cicilan Hutang</div>
        @if(count($reports['budgetDebts']['data']) > 0)
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
                    @foreach($reports['budgetDebts']['data'] as $debt)
                    <tr>
                        <td>{{ $debt['budget_name'] }}</td>
                        <td class="currency">{{ 'Rp ' . number_format($debt['plan'], 0, ',', '.') }}</td>
                        <td class="currency">{{ 'Rp ' . number_format($debt['actual'], 0, ',', '.') }}</td>
                        <td class="currency" style="color: {{ $debt['difference'] >= 0 ? '#10b981' : '#ef4444' }}">
                            {{ 'Rp ' . number_format($debt['difference'], 0, ',', '.') }}
                        </td>
                        <td class="currency">{{ $debt['plan'] > 0 ? number_format(($debt['actual'] / $debt['plan']) * 100, 1) : '0' }}%</td>
                    </tr>
                    @endforeach
                </tbody>
                <tfoot>
                    <tr>
                        <td><strong>Total</strong></td>
                        <td class="currency"><strong>{{ 'Rp ' . number_format($reports['budgetDebts']['total']['plan'], 0, ',', '.') }}</strong></td>
                        <td class="currency"><strong>{{ 'Rp ' . number_format($reports['budgetDebts']['total']['actual'], 0, ',', '.') }}</strong></td>
                        <td class="currency"><strong>{{ 'Rp ' . number_format($reports['budgetDebts']['total']['difference'], 0, ',', '.') }}</strong></td>
                        <td class="currency"><strong>{{ $reports['budgetDebts']['total']['plan'] > 0 ? number_format(($reports['budgetDebts']['total']['actual'] / $reports['budgetDebts']['total']['plan']) * 100, 1) : '0' }}%</strong></td>
                    </tr>
                </tfoot>
            </table>
        @else
            <div class="no-data">Tidak ada data budget cicilan hutang untuk bulan {{ $monthName }} {{ $year }}</div>
        @endif
    </div>

    <!-- Detail Budget Tagihan -->
    <div class="section">
        <div class="section-title"><span style="font-size:15px;">📄</span> Detail Budget Tagihan</div>
        @if(count($reports['budgetBills']['data']) > 0)
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
                    @foreach($reports['budgetBills']['data'] as $bill)
                    <tr>
                        <td>{{ $bill['budget_name'] }}</td>
                        <td class="currency">{{ 'Rp ' . number_format($bill['plan'], 0, ',', '.') }}</td>
                        <td class="currency">{{ 'Rp ' . number_format($bill['actual'], 0, ',', '.') }}</td>
                        <td class="currency" style="color: {{ $bill['difference'] >= 0 ? '#10b981' : '#ef4444' }}">
                            {{ 'Rp ' . number_format($bill['difference'], 0, ',', '.') }}
                        </td>
                        <td class="currency">{{ $bill['plan'] > 0 ? number_format(($bill['actual'] / $bill['plan']) * 100, 1) : '0' }}%</td>
                    </tr>
                    @endforeach
                </tbody>
                <tfoot>
                    <tr>
                        <td><strong>Total</strong></td>
                        <td class="currency"><strong>{{ 'Rp ' . number_format($reports['budgetBills']['total']['plan'], 0, ',', '.') }}</strong></td>
                        <td class="currency"><strong>{{ 'Rp ' . number_format($reports['budgetBills']['total']['actual'], 0, ',', '.') }}</strong></td>
                        <td class="currency"><strong>{{ 'Rp ' . number_format($reports['budgetBills']['total']['difference'], 0, ',', '.') }}</strong></td>
                        <td class="currency"><strong>{{ $reports['budgetBills']['total']['plan'] > 0 ? number_format(($reports['budgetBills']['total']['actual'] / $reports['budgetBills']['total']['plan']) * 100, 1) : '0' }}%</strong></td>
                    </tr>
                </tfoot>
            </table>
        @else
            <div class="no-data">Tidak ada data budget tagihan untuk bulan {{ $monthName }} {{ $year }}</div>
        @endif
    </div>

    <!-- Detail Budget Belanja -->
    <div class="section">
        <div class="section-title"><span style="font-size:15px;">🛒</span> Detail Budget Belanja</div>
        @if(count($reports['budgetShoppings']['data']) > 0)
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
                    @foreach($reports['budgetShoppings']['data'] as $shopping)
                    <tr>
                        <td>{{ $shopping['budget_name'] }}</td>
                        <td class="currency">{{ 'Rp ' . number_format($shopping['plan'], 0, ',', '.') }}</td>
                        <td class="currency">{{ 'Rp ' . number_format($shopping['actual'], 0, ',', '.') }}</td>
                        <td class="currency" style="color: {{ $shopping['difference'] >= 0 ? '#10b981' : '#ef4444' }}">
                            {{ 'Rp ' . number_format($shopping['difference'], 0, ',', '.') }}
                        </td>
                        <td class="currency">{{ $shopping['plan'] > 0 ? number_format(($shopping['actual'] / $shopping['plan']) * 100, 1) : '0' }}%</td>
                    </tr>
                    @endforeach
                </tbody>
                <tfoot>
                    <tr>
                        <td><strong>Total</strong></td>
                        <td class="currency"><strong>{{ 'Rp ' . number_format($reports['budgetShoppings']['total']['plan'], 0, ',', '.') }}</strong></td>
                        <td class="currency"><strong>{{ 'Rp ' . number_format($reports['budgetShoppings']['total']['actual'], 0, ',', '.') }}</strong></td>
                        <td class="currency"><strong>{{ 'Rp ' . number_format($reports['budgetShoppings']['total']['difference'], 0, ',', '.') }}</strong></td>
                        <td class="currency"><strong>{{ $reports['budgetShoppings']['total']['plan'] > 0 ? number_format(($reports['budgetShoppings']['total']['actual'] / $reports['budgetShoppings']['total']['plan']) * 100, 1) : '0' }}%</strong></td>
                    </tr>
                </tfoot>
            </table>
        @else
            <div class="no-data">Tidak ada data budget belanja untuk bulan {{ $monthName }} {{ $year }}</div>
        @endif
    </div>

    <div class="page-break"></div>

    <!-- Income Trackers -->
    <div class="section">
        <div class="section-title"><span style="font-size:15px;">💵</span> Pelacakan Penghasilan</div>
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
            <div class="no-data">Tidak ada data pelacakan penghasilan untuk bulan {{ $monthName }} {{ $year }}</div>
        @endif
    </div>

    <!-- Expense Trackers -->
    <div class="section">
        <div class="section-title"><span style="font-size:15px;">💸</span> Pelacakan Pengeluaran</div>
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
            <div class="no-data">Tidak ada data pelacakan pengeluaran untuk bulan {{ $monthName }} {{ $year }}</div>
        @endif
    </div>

    <div class="footer">
        <p>Laporan ini digenerate secara otomatis oleh CuanKu - Personal Finance Management Platform</p>
    </div>
</body>
</html>
