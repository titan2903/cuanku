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
            font-family: 'DejaVu Sans', sans-serif;
            font-size: 12px;
            line-height: 1.5;
            color: #222;
            background: #fff;
            margin: 32px 36px 48px 36px;
        }

        .header {
            text-align: center;
            margin-bottom: 36px;
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

        .month-badge {
            background-color: #e0f2fe;
            color: #0277bd;
            padding: 2px 6px;
            border-radius: 4px;
            font-size: 9px;
            font-weight: bold;
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

        .monthly-grid {
            display: table;
            width: 100%;
        }

        .monthly-item {
            display: table-cell;
            width: 33.33%;
            padding-right: 10px;
            vertical-align: top;
            margin-bottom: 15px;
        }

        .monthly-item:last-child {
            padding-right: 0;
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
    </style>
</head>
<body>
    <div class="header">
        <h1>Laporan Tahunan {{ $year }}</h1>
        <h2>CuanKu - Personal Finance Management</h2>
        <p style="margin-top: 10px; color: #6b7280;">Digenerate pada {{ now()->format('d F Y, H:i') }} WIB</p>
    </div>

    <!-- Summary Cards -->
    <div class="section">
        <div class="section-title">📊 Ringkasan Tahunan</div>
        <div class="grid">
            <div class="grid-item">
                <table class="table">
                    <thead>
                        <tr>
                            <th colspan="3" style="text-align: center; background-color: #10b981; color: white;">💰 Penghasilan</th>
                        </tr>
                        <tr>
                            <th>Aspek</th>
                            <th class="currency">Rencana</th>
                            <th class="currency">Aktual</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Total Penghasilan</td>
                            <td class="currency">{{ 'Rp ' . number_format($annuals['annualIncomes']['total']['plan'], 0, ',', '.') }}</td>
                            <td class="currency">{{ 'Rp ' . number_format($annuals['annualIncomes']['total']['actual'], 0, ',', '.') }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="grid-item">
                <table class="table">
                    <thead>
                        <tr>
                            <th colspan="3" style="text-align: center; background-color: #3b82f6; color: white;">💎 Tabungan & Investasi</th>
                        </tr>
                        <tr>
                            <th>Aspek</th>
                            <th class="currency">Rencana</th>
                            <th class="currency">Aktual</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Total Tabungan</td>
                            <td class="currency">{{ 'Rp ' . number_format($annuals['annualSavings']['total']['plan'], 0, ',', '.') }}</td>
                            <td class="currency">{{ 'Rp ' . number_format($annuals['annualSavings']['total']['actual'], 0, ',', '.') }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>

    <!-- Detailed Monthly Data -->
    <div class="section">
        <div class="section-title">📈 Data Penghasilan Bulanan</div>
        @if(count($annuals['annualIncomes']['data']) > 0)
            <table class="table">
                <thead>
                    <tr>
                        <th>#</th>
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
        @else
            <div class="no-data">Tidak ada data penghasilan untuk tahun {{ $year }}</div>
        @endif
    </div>

    <div class="page-break"></div>

    <!-- Savings Data -->
    <div class="section">
        <div class="section-title">💎 Data Tabungan & Investasi Bulanan</div>
        @if(count($annuals['annualSavings']['data']) > 0)
            <table class="table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Bulan</th>
                        <th class="currency">Rencana</th>
                        <th class="currency">Aktual</th>
                        <th class="currency">Selisih</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach($annuals['annualSavings']['data'] as $index => $saving)
                    <tr>
                        <td>{{ $index + 1 }}</td>
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
                        <td colspan="2"><strong>Total</strong></td>
                        <td class="currency"><strong>{{ 'Rp ' . number_format($annuals['annualSavings']['total']['plan'], 0, ',', '.') }}</strong></td>
                        <td class="currency"><strong>{{ 'Rp ' . number_format($annuals['annualSavings']['total']['actual'], 0, ',', '.') }}</strong></td>
                        <td class="currency"><strong>{{ 'Rp ' . number_format($annuals['annualSavings']['total']['actual'] - $annuals['annualSavings']['total']['plan'], 0, ',', '.') }}</strong></td>
                    </tr>
                </tfoot>
            </table>
        @else
            <div class="no-data">Tidak ada data tabungan & investasi untuk tahun {{ $year }}</div>
        @endif
    </div>

    <!-- Monthly Category Breakdown -->
    <div class="section">
        <div class="section-title">📋 Laporan Per Kategori Bulanan</div>
        @foreach($annualMonths as $month => $data)
            <div style="margin-bottom: 20px; {{ $loop->iteration % 3 == 1 && !$loop->first ? 'page-break-before: always;' : '' }}">
                <h3 style="color: #10b981; margin-bottom: 10px; font-size: 14px;">📅 {{ $month }}</h3>
                <table class="table">
                    <thead>
                        <tr>
                            <th>Kategori</th>
                            <th class="currency">Rencana</th>
                            <th class="currency">Aktual</th>
                            <th class="currency">Selisih</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach($data['categories'] as $category => $values)
                        <tr>
                            <td>
                                <span class="category-badge 
                                    @if($category == 'Penghasilan') category-income
                                    @elseif($category == 'Tabungan dan Investasi') category-saving
                                    @elseif($category == 'Cicilan Hutang') category-debt
                                    @elseif($category == 'Tagihan') category-bill
                                    @elseif($category == 'Belanja') category-shopping
                                    @endif">
                                    {{ $category }}
                                </span>
                            </td>
                            <td class="currency">{{ 'Rp ' . number_format($values['plan'], 0, ',', '.') }}</td>
                            <td class="currency">{{ 'Rp ' . number_format($values['actual'], 0, ',', '.') }}</td>
                            <td class="currency" style="color: {{ ($values['actual'] - $values['plan']) >= 0 ? '#10b981' : '#ef4444' }}">
                                {{ 'Rp ' . number_format($values['actual'] - $values['plan'], 0, ',', '.') }}
                            </td>
                        </tr>
                        @endforeach
                    </tbody>
                    <tfoot>
                        <tr>
                            <td><strong>Total</strong></td>
                            <td class="currency"><strong>{{ 'Rp ' . number_format($data['total']['plan'], 0, ',', '.') }}</strong></td>
                            <td class="currency"><strong>{{ 'Rp ' . number_format($data['total']['actual'], 0, ',', '.') }}</strong></td>
                            <td class="currency"><strong>{{ 'Rp ' . number_format($data['total']['actual'] - $data['total']['plan'], 0, ',', '.') }}</strong></td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        @endforeach
    </div>

    <div class="footer">
        <p>Laporan ini digenerate secara otomatis oleh CuanKu - Personal Finance Management Platform | Halaman <span class="pagenum"></span></p>
    </div>
</body>
</html>
