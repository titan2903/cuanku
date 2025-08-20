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
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            font-size: 14px;
            line-height: 1.6;
            color: #333;
            background: #fff;
            margin: 0;
            padding: 20px;
        }

        /* Print-specific styles */
        @media print {
            body {
                margin: 0;
                padding: 15px;
                font-size: 12px;
            }
            
            .no-print {
                display: none !important;
            }
            
            .page-break {
                page-break-before: always;
            }
            
            .avoid-break {
                page-break-inside: avoid;
            }
            
            table {
                page-break-inside: auto;
            }
            
            tr {
                page-break-inside: avoid;
                page-break-after: auto;
            }
            
            .header {
                margin-bottom: 25px;
            }
            
            .section {
                margin-bottom: 25px;
            }
        }

        /* Screen styles */
        @media screen {
            body {
                max-width: 210mm;
                margin: 0 auto;
                background: #f5f5f5;
                padding: 20px;
            }
            
            .container {
                background: white;
                padding: 30px;
                border-radius: 8px;
                box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            }
            
            .print-actions {
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 1000;
            }
            
            .print-btn {
                background: #10b981;
                color: white;
                border: none;
                padding: 12px 24px;
                border-radius: 6px;
                cursor: pointer;
                font-size: 14px;
                font-weight: 500;
                box-shadow: 0 2px 4px rgba(16, 185, 129, 0.2);
                transition: all 0.2s;
            }
            
            .print-btn:hover {
                background: #059669;
                transform: translateY(-1px);
                box-shadow: 0 4px 8px rgba(16, 185, 129, 0.3);
            }
        }
        
        .header {
            text-align: center;
            margin-bottom: 30px;
            padding-bottom: 20px;
            border-bottom: 3px solid #10b981;
        }
        
        .header h1 {
            color: #10b981;
            font-size: 32px;
            font-weight: bold;
            margin-bottom: 8px;
            letter-spacing: 1px;
        }
        
        .header h2 {
            color: #6b7280;
            font-size: 18px;
            font-weight: normal;
            margin-bottom: 5px;
        }
        
        .header p {
            color: #6b7280;
            font-size: 12px;
            margin-top: 10px;
        }
        
        .section {
            margin-bottom: 30px;
            page-break-inside: avoid;
        }
        
        .section-title {
            background-color: #10b981;
            color: white;
            padding: 12px 16px;
            font-size: 16px;
            font-weight: bold;
            margin-bottom: 15px;
            border-radius: 6px;
            display: flex;
            align-items: center;
            gap: 8px;
        }
        
        .table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
            background: #fff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }
        
        .table th,
        .table td {
            border: 1px solid #e5e7eb;
            padding: 12px 10px;
            text-align: left;
        }
        
        .table th {
            background-color: #f0fdf4;
            font-weight: bold;
            font-size: 14px;
            color: #065f46;
            border-bottom: 2px solid #10b981;
        }
        
        .table td {
            font-size: 13px;
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
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            margin-bottom: 20px;
        }
        
        .overview-card {
            background-color: #f8fafc;
            border: 2px solid #e2e8f0;
            border-radius: 8px;
            padding: 16px;
        }
        
        .overview-title {
            font-size: 14px;
            font-weight: bold;
            color: #1f2937;
            margin-bottom: 10px;
        }
        
        .overview-amount {
            font-size: 18px;
            font-weight: bold;
        }
        
        .cash-flow-positive {
            color: #10b981;
        }
        
        .cash-flow-negative {
            color: #ef4444;
        }
        
        .no-data {
            text-align: center;
            color: #6b7280;
            font-style: italic;
            padding: 20px;
        }
        
        .category-badge {
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 10px;
            font-weight: bold;
            color: white;
            display: inline-block;
            margin-right: 8px;
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
            padding: 12px 16px;
            margin-bottom: 8px;
            border-radius: 0 6px 6px 0;
        }
        
        .tracker-item h4 {
            font-size: 14px;
            font-weight: bold;
            color: #1f2937;
            margin-bottom: 4px;
        }
        
        .tracker-item p {
            font-size: 12px;
            color: #6b7280;
            margin: 2px 0;
        }
        
        .tracker-amount {
            font-size: 16px;
            font-weight: bold;
            color: #10b981;
        }

        .back-link {
            display: inline-block;
            margin-bottom: 20px;
            color: #10b981;
            text-decoration: none;
            font-weight: 500;
        }
        
        .back-link:hover {
            text-decoration: underline;
        }
    </style>
</head>
<body>
    <div class="print-actions no-print">
        <button onclick="window.print()" class="print-btn">
            🖨️ Print Report
        </button>
    </div>

    <div class="container">
        <a href="{{ route('report-trackings') }}" class="back-link no-print">← Kembali ke Laporan Pelacakan</a>
        
        <div class="header">
            <h1>CuanKu</h1>
            <h2>Laporan Pelacakan {{ $monthName }} {{ $year }}</h2>
            <p>Digenerate pada: {{ $generatedAt->format('d F Y, H:i') }} WIB</p>
        </div>

        <!-- Ringkasan Arus Kas -->
        <div class="section avoid-break">
            <div class="section-title">
                💰 Ringkasan Arus Kas
            </div>
            <div class="grid">
                @foreach($overviews as $overview)
                <div class="overview-card">
                    <div class="overview-title">{{ $overview['label'] }}</div>
                    <div class="overview-amount {{ $overview['label'] === 'Arus Kas' ? ($overview['amount'] >= 0 ? 'cash-flow-positive' : 'cash-flow-negative') : '' }}">
                        {{ 'Rp ' . number_format($overview['amount'], 0, ',', '.') }}
                    </div>
                </div>
                @endforeach
            </div>
        </div>

        <!-- Budget Incomes -->
        @if(count($reports['budgetIncomes']['data']) > 0)
        <div class="section avoid-break">
            <div class="section-title">
                💵 Anggaran Penghasilan
            </div>
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
        </div>
        @endif

        <!-- Budget Expenses -->
        @if(count($reports['budgetExpenses']['data']) > 0)
        <div class="section avoid-break">
            <div class="section-title">
                💸 Anggaran Pengeluaran
            </div>
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
        </div>
        @endif

        <!-- Budget Savings -->
        @if(count($reports['budgetSavings']['data']) > 0)
        <div class="section avoid-break">
            <div class="section-title">
                💰 Anggaran Tabungan
            </div>
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
        </div>
        @endif

        <!-- Budget Debts -->
        @if(count($reports['budgetDebts']['data']) > 0)
        <div class="section avoid-break">
            <div class="section-title">
                🏦 Anggaran Utang
            </div>
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
        </div>
        @endif

        <!-- Budget Bills -->
        @if(count($reports['budgetBills']['data']) > 0)
        <div class="section avoid-break">
            <div class="section-title">
                📄 Anggaran Tagihan
            </div>
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
        </div>
        @endif

        <!-- Budget Shoppings -->
        @if(count($reports['budgetShoppings']['data']) > 0)
        <div class="section avoid-break">
            <div class="section-title">
                🛍️ Anggaran Belanja
            </div>
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
        </div>
        @endif

        <!-- Income Trackers -->
        @if(count($incomeTrackers) > 0)
        <div class="section tracker-section page-break">
            <div class="section-title">
                📈 Pelacak Penghasilan
            </div>
            @foreach($incomeTrackers as $tracker)
            <div class="tracker-item">
                <h4>
                    <span class="category-badge category-income">INCOME</span>
                    {{ $tracker['name'] }}
                </h4>
                <p><strong>Budget:</strong> {{ $tracker['budget_name'] }}</p>
                <p><strong>Tanggal:</strong> {{ $tracker['date'] }}</p>
                <p class="tracker-amount">{{ 'Rp ' . number_format($tracker['amount'], 0, ',', '.') }}</p>
                @if($tracker['note'])
                <p><strong>Catatan:</strong> {{ $tracker['note'] }}</p>
                @endif
            </div>
            @endforeach
        </div>
        @endif

        <!-- Expense Trackers -->
        @if(count($expenseTrackers) > 0)
        <div class="section tracker-section">
            <div class="section-title">
                📉 Pelacak Pengeluaran
            </div>
            @foreach($expenseTrackers as $tracker)
            <div class="tracker-item">
                <h4>
                    <span class="category-badge category-expense">EXPENSE</span>
                    {{ $tracker['name'] }}
                </h4>
                <p><strong>Budget:</strong> {{ $tracker['budget_name'] }}</p>
                <p><strong>Tanggal:</strong> {{ $tracker['date'] }}</p>
                <p class="tracker-amount" style="color: #ef4444;">{{ 'Rp ' . number_format($tracker['amount'], 0, ',', '.') }}</p>
                @if($tracker['note'])
                <p><strong>Catatan:</strong> {{ $tracker['note'] }}</p>
                @endif
            </div>
            @endforeach
        </div>
        @endif
    </div>

    <script>
        // Auto-print when page loads if print parameter is present
        if (window.location.search.includes('auto-print=1')) {
            window.onload = function() {
                setTimeout(function() {
                    window.print();
                }, 500);
            };
        }
    </script>
</body>
</html>