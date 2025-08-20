<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Laporan Tahunan {{ $year }} - CuanKu</title>
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

            .grid {
                display: block;
            }
            
            .grid-item {
                margin-bottom: 15px;
                page-break-inside: avoid;
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
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 20px;
            margin-bottom: 20px;
        }
        
        .grid-item {
            background-color: #f8fafc;
            border: 2px solid #e2e8f0;
            border-radius: 8px;
            padding: 16px;
        }
        
        .monthly-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 15px;
            margin-bottom: 20px;
        }
        
        .monthly-item {
            background-color: #f9fafb;
            border: 1px solid #e5e7eb;
            border-radius: 6px;
            padding: 12px;
        }
        
        .monthly-item h4 {
            font-size: 14px;
            font-weight: bold;
            color: #1f2937;
            margin-bottom: 8px;
        }
        
        .month-badge {
            background-color: #e0f2fe;
            color: #0277bd;
            padding: 2px 8px;
            border-radius: 4px;
            font-size: 10px;
            font-weight: bold;
            display: inline-block;
            margin-bottom: 5px;
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
        
        .summary-card {
            background: linear-gradient(135deg, #10b981 0%, #059669 100%);
            color: white;
            border-radius: 8px;
            padding: 20px;
            text-align: center;
            margin-bottom: 20px;
        }
        
        .summary-card h3 {
            font-size: 18px;
            margin-bottom: 10px;
        }
        
        .summary-amount {
            font-size: 24px;
            font-weight: bold;
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
        
        .no-data {
            text-align: center;
            color: #6b7280;
            font-style: italic;
            padding: 20px;
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
        <a href="{{ route('annual-reports') }}" class="back-link no-print">← Kembali ke Laporan Tahunan</a>
        
        <div class="header">
            <h1>CuanKu</h1>
            <h2>Laporan Tahunan {{ $year }}</h2>
            <p>Digenerate pada: {{ now()->format('d F Y, H:i') }} WIB</p>
        </div>

        <!-- Ringkasan Tahunan per Bulan -->
        @if(count($annuals['annualMonths']) > 0)
        <div class="section avoid-break">
            <div class="section-title">
                📅 Ringkasan Bulanan {{ $year }}
            </div>
            <div class="monthly-grid">
                @foreach($annuals['annualMonths'] as $monthData)
                <div class="monthly-item">
                    <span class="month-badge">{{ $monthData['month'] }}</span>
                    <h4>Total Penghasilan</h4>
                    <p class="currency" style="color: #10b981; font-weight: bold;">
                        {{ 'Rp ' . number_format($monthData['totalIncome'], 0, ',', '.') }}
                    </p>
                    <h4>Total Pengeluaran</h4>
                    <p class="currency" style="color: #ef4444; font-weight: bold;">
                        {{ 'Rp ' . number_format($monthData['totalExpense'], 0, ',', '.') }}
                    </p>
                    <h4>Saldo</h4>
                    <p class="currency" style="color: {{ $monthData['balance'] >= 0 ? '#10b981' : '#ef4444' }}; font-weight: bold;">
                        {{ 'Rp ' . number_format($monthData['balance'], 0, ',', '.') }}
                    </p>
                </div>
                @endforeach
            </div>
        </div>
        @endif

        <!-- Penghasilan Tahunan -->
        @if(count($annuals['annualIncomes']['data']) > 0)
        <div class="section avoid-break">
            <div class="section-title">
                💵 Penghasilan Tahunan
            </div>
            <div class="summary-card">
                <h3>Total Penghasilan {{ $year }}</h3>
                <div class="summary-amount">{{ 'Rp ' . number_format($annuals['annualIncomes']['total']['actual'], 0, ',', '.') }}</div>
            </div>
            <table class="table">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Bulan</th>
                        <th class="currency">Rencana</th>
                        <th class="currency">Aktual</th>
                        <th class="currency">Selisih</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach($annuals['annualIncomes']['data'] as $index => $income)
                    <tr>
                        <td>{{ $index + 1 }}</td>
                        <td><span class="month-badge">{{ $income['month'] }}</span></td>
                        <td class="currency">{{ 'Rp ' . number_format($income['plan'], 0, ',', '.') }}</td>
                        <td class="currency">{{ 'Rp ' . number_format($income['actual'], 0, ',', '.') }}</td>
                        <td class="currency" style="color: {{ ($income['actual'] - $income['plan']) >= 0 ? '#10b981' : '#ef4444' }}">
                            {{ 'Rp ' . number_format($income['actual'] - $income['plan'], 0, ',', '.') }}
                        </td>
                    </tr>
                    @endforeach
                </tbody>
                <tfoot>
                    <tr>
                        <td colspan="2"><strong>Total</strong></td>
                        <td class="currency"><strong>{{ 'Rp ' . number_format($annuals['annualIncomes']['total']['plan'], 0, ',', '.') }}</strong></td>
                        <td class="currency"><strong>{{ 'Rp ' . number_format($annuals['annualIncomes']['total']['actual'], 0, ',', '.') }}</strong></td>
                        <td class="currency"><strong>{{ 'Rp ' . number_format($annuals['annualIncomes']['total']['actual'] - $annuals['annualIncomes']['total']['plan'], 0, ',', '.') }}</strong></td>
                    </tr>
                </tfoot>
            </table>
        </div>
        @endif

        <!-- Pengeluaran Tahunan -->
        @if(count($annuals['annualExpenses']['data']) > 0)
        <div class="section avoid-break page-break">
            <div class="section-title">
                💸 Pengeluaran Tahunan
            </div>
            <div class="summary-card" style="background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);">
                <h3>Total Pengeluaran {{ $year }}</h3>
                <div class="summary-amount">{{ 'Rp ' . number_format($annuals['annualExpenses']['total']['actual'], 0, ',', '.') }}</div>
            </div>
            <table class="table">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Bulan</th>
                        <th class="currency">Rencana</th>
                        <th class="currency">Aktual</th>
                        <th class="currency">Selisih</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach($annuals['annualExpenses']['data'] as $index => $expense)
                    <tr>
                        <td>{{ $index + 1 }}</td>
                        <td><span class="month-badge">{{ $expense['month'] }}</span></td>
                        <td class="currency">{{ 'Rp ' . number_format($expense['plan'], 0, ',', '.') }}</td>
                        <td class="currency">{{ 'Rp ' . number_format($expense['actual'], 0, ',', '.') }}</td>
                        <td class="currency" style="color: {{ ($expense['actual'] - $expense['plan']) >= 0 ? '#10b981' : '#ef4444' }}">
                            {{ 'Rp ' . number_format($expense['actual'] - $expense['plan'], 0, ',', '.') }}
                        </td>
                    </tr>
                    @endforeach
                </tbody>
                <tfoot>
                    <tr>
                        <td colspan="2"><strong>Total</strong></td>
                        <td class="currency"><strong>{{ 'Rp ' . number_format($annuals['annualExpenses']['total']['plan'], 0, ',', '.') }}</strong></td>
                        <td class="currency"><strong>{{ 'Rp ' . number_format($annuals['annualExpenses']['total']['actual'], 0, ',', '.') }}</strong></td>
                        <td class="currency"><strong>{{ 'Rp ' . number_format($annuals['annualExpenses']['total']['actual'] - $annuals['annualExpenses']['total']['plan'], 0, ',', '.') }}</strong></td>
                    </tr>
                </tfoot>
            </table>
        </div>
        @endif

        <!-- Kategori Lainnya dalam Grid -->
        <div class="grid">
            <!-- Tabungan -->
            @if(count($annuals['annualSavings']['data']) > 0)
            <div class="grid-item avoid-break">
                <div class="section-title" style="background-color: #3b82f6;">
                    💰 Tabungan
                </div>
                <table class="table">
                    <thead>
                        <tr>
                            <th>Bulan</th>
                            <th class="currency">Rencana</th>
                            <th class="currency">Aktual</th>
                            <th class="currency">Selisih</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach($annuals['annualSavings']['data'] as $saving)
                        <tr>
                            <td><span class="month-badge">{{ $saving['month'] }}</span></td>
                            <td class="currency">{{ 'Rp ' . number_format($saving['plan'], 0, ',', '.') }}</td>
                            <td class="currency">{{ 'Rp ' . number_format($saving['actual'], 0, ',', '.') }}</td>
                            <td class="currency" style="color: {{ ($saving['actual'] - $saving['plan']) >= 0 ? '#10b981' : '#ef4444' }}">
                                {{ 'Rp ' . number_format($saving['actual'] - $saving['plan'], 0, ',', '.') }}
                            </td>
                        </tr>
                        @endforeach
                    </tbody>
                    <tfoot>
                        <tr>
                            <td><strong>Total</strong></td>
                            <td class="currency"><strong>{{ 'Rp ' . number_format($annuals['annualSavings']['total']['plan'], 0, ',', '.') }}</strong></td>
                            <td class="currency"><strong>{{ 'Rp ' . number_format($annuals['annualSavings']['total']['actual'], 0, ',', '.') }}</strong></td>
                            <td class="currency"><strong>{{ 'Rp ' . number_format($annuals['annualSavings']['total']['actual'] - $annuals['annualSavings']['total']['plan'], 0, ',', '.') }}</strong></td>
                        </tr>
                    </tfoot>
                </table>
            </div>
            @endif

            <!-- Utang -->
            @if(count($annuals['annualDebts']['data']) > 0)
            <div class="grid-item avoid-break">
                <div class="section-title" style="background-color: #ef4444;">
                    🏦 Utang
                </div>
                <table class="table">
                    <thead>
                        <tr>
                            <th>Bulan</th>
                            <th class="currency">Rencana</th>
                            <th class="currency">Aktual</th>
                            <th class="currency">Selisih</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach($annuals['annualDebts']['data'] as $debt)
                        <tr>
                            <td><span class="month-badge">{{ $debt['month'] }}</span></td>
                            <td class="currency">{{ 'Rp ' . number_format($debt['plan'], 0, ',', '.') }}</td>
                            <td class="currency">{{ 'Rp ' . number_format($debt['actual'], 0, ',', '.') }}</td>
                            <td class="currency" style="color: {{ ($debt['actual'] - $debt['plan']) >= 0 ? '#10b981' : '#ef4444' }}">
                                {{ 'Rp ' . number_format($debt['actual'] - $debt['plan'], 0, ',', '.') }}
                            </td>
                        </tr>
                        @endforeach
                    </tbody>
                    <tfoot>
                        <tr>
                            <td><strong>Total</strong></td>
                            <td class="currency"><strong>{{ 'Rp ' . number_format($annuals['annualDebts']['total']['plan'], 0, ',', '.') }}</strong></td>
                            <td class="currency"><strong>{{ 'Rp ' . number_format($annuals['annualDebts']['total']['actual'], 0, ',', '.') }}</strong></td>
                            <td class="currency"><strong>{{ 'Rp ' . number_format($annuals['annualDebts']['total']['actual'] - $annuals['annualDebts']['total']['plan'], 0, ',', '.') }}</strong></td>
                        </tr>
                    </tfoot>
                </table>
            </div>
            @endif

            <!-- Tagihan -->
            @if(count($annuals['annualBills']['data']) > 0)
            <div class="grid-item avoid-break">
                <div class="section-title" style="background-color: #f59e0b;">
                    📄 Tagihan
                </div>
                <table class="table">
                    <thead>
                        <tr>
                            <th>Bulan</th>
                            <th class="currency">Rencana</th>
                            <th class="currency">Aktual</th>
                            <th class="currency">Selisih</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach($annuals['annualBills']['data'] as $bill)
                        <tr>
                            <td><span class="month-badge">{{ $bill['month'] }}</span></td>
                            <td class="currency">{{ 'Rp ' . number_format($bill['plan'], 0, ',', '.') }}</td>
                            <td class="currency">{{ 'Rp ' . number_format($bill['actual'], 0, ',', '.') }}</td>
                            <td class="currency" style="color: {{ ($bill['actual'] - $bill['plan']) >= 0 ? '#10b981' : '#ef4444' }}">
                                {{ 'Rp ' . number_format($bill['actual'] - $bill['plan'], 0, ',', '.') }}
                            </td>
                        </tr>
                        @endforeach
                    </tbody>
                    <tfoot>
                        <tr>
                            <td><strong>Total</strong></td>
                            <td class="currency"><strong>{{ 'Rp ' . number_format($annuals['annualBills']['total']['plan'], 0, ',', '.') }}</strong></td>
                            <td class="currency"><strong>{{ 'Rp ' . number_format($annuals['annualBills']['total']['actual'], 0, ',', '.') }}</strong></td>
                            <td class="currency"><strong>{{ 'Rp ' . number_format($annuals['annualBills']['total']['actual'] - $annuals['annualBills']['total']['plan'], 0, ',', '.') }}</strong></td>
                        </tr>
                    </tfoot>
                </table>
            </div>
            @endif

            <!-- Belanja -->
            @if(count($annuals['annualShoppings']['data']) > 0)
            <div class="grid-item avoid-break">
                <div class="section-title" style="background-color: #8b5cf6;">
                    🛍️ Belanja
                </div>
                <table class="table">
                    <thead>
                        <tr>
                            <th>Bulan</th>
                            <th class="currency">Rencana</th>
                            <th class="currency">Aktual</th>
                            <th class="currency">Selisih</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach($annuals['annualShoppings']['data'] as $shopping)
                        <tr>
                            <td><span class="month-badge">{{ $shopping['month'] }}</span></td>
                            <td class="currency">{{ 'Rp ' . number_format($shopping['plan'], 0, ',', '.') }}</td>
                            <td class="currency">{{ 'Rp ' . number_format($shopping['actual'], 0, ',', '.') }}</td>
                            <td class="currency" style="color: {{ ($shopping['actual'] - $shopping['plan']) >= 0 ? '#10b981' : '#ef4444' }}">
                                {{ 'Rp ' . number_format($shopping['actual'] - $shopping['plan'], 0, ',', '.') }}
                            </td>
                        </tr>
                        @endforeach
                    </tbody>
                    <tfoot>
                        <tr>
                            <td><strong>Total</strong></td>
                            <td class="currency"><strong>{{ 'Rp ' . number_format($annuals['annualShoppings']['total']['plan'], 0, ',', '.') }}</strong></td>
                            <td class="currency"><strong>{{ 'Rp ' . number_format($annuals['annualShoppings']['total']['actual'], 0, ',', '.') }}</strong></td>
                            <td class="currency"><strong>{{ 'Rp ' . number_format($annuals['annualShoppings']['total']['actual'] - $annuals['annualShoppings']['total']['plan'], 0, ',', '.') }}</strong></td>
                        </tr>
                    </tfoot>
                </table>
            </div>
            @endif
        </div>
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