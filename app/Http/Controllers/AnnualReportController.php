<?php

namespace App\Http\Controllers;

use App\Enums\BudgetType;
use App\Enums\MonthEnum;
use App\Models\Expense;
use App\Models\Income;
use App\Traits\BudgetTrait;
use App\Traits\FormatReportTrait;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Inertia\Response as InertiaResponse;

class AnnualReportController extends Controller implements HasMiddleware
{
    use BudgetTrait, FormatReportTrait;

    public static function middleware(): array
    {
        return [
            new Middleware(middleware: 'auth'),
            new Middleware('password.confirm'),
        ];
    }

    private function calculateByMonth(Collection $annuals)
    {
        return collect(MonthEnum::cases())->map(function ($monthEnum) use ($annuals) {
            $dataForMonth = $annuals->filter(fn ($item) => $item->month->value === $monthEnum->value);

            $month = $monthEnum->value;

            return [
                'month' => $month,
                'plan' => $dataForMonth->sum('plan'),
                'actual' => $dataForMonth->sum('actual'),
            ];
        });
    }

    private function getAnnualDataGroupByMonth(Collection $annualIncomes, Collection $annualSaving, Collection $annualDebts, Collection $annualBills, Collection $annualShoppings, Collection $annualExpenses): array
    {
        return collect(MonthEnum::cases())->mapWithKeys(function ($monthEnum) use ($annualIncomes, $annualSaving, $annualDebts, $annualBills, $annualShoppings, $annualExpenses) {
            $monthName = $monthEnum->value;

            $categories = [
                'Penghasilan' => [
                    'plan' => $annualIncomes->filter(fn ($item) => $item->month->value === $monthName)->sum('plan'),
                    'actual' => $annualIncomes->filter(fn ($item) => $item->month->value === $monthName)->sum('actual'),
                ],
                'Tabungan dan Investasi' => [
                    'plan' => $annualSaving->filter(fn ($item) => $item->month->value === $monthName)->sum('plan'),
                    'actual' => $annualSaving->filter(fn ($item) => $item->month->value === $monthName)->sum('actual'),
                ],
                'Cicilan Hutang' => [
                    'plan' => $annualDebts->filter(fn ($item) => $item->month->value === $monthName)->sum('plan'),
                    'actual' => $annualDebts->filter(fn ($item) => $item->month->value === $monthName)->sum('actual'),
                ],
                'Tagihan' => [
                    'plan' => $annualBills->filter(fn ($item) => $item->month->value === $monthName)->sum('plan'),
                    'actual' => $annualBills->filter(fn ($item) => $item->month->value === $monthName)->sum('actual'),
                ],
                'Belanja' => [
                    'plan' => $annualShoppings->filter(fn ($item) => $item->month->value === $monthName)->sum('plan'),
                    'actual' => $annualShoppings->filter(fn ($item) => $item->month->value === $monthName)->sum('actual'),
                ],
                'Pengeluaran' => [
                    'plan' => $annualExpenses->filter(fn ($item) => $item->month->value === $monthName)->sum('plan'),
                    'actual' => $annualExpenses->filter(fn ($item) => $item->month->value === $monthName)->sum('actual'),
                ],
            ];

            // Hitung total plan dan actual untuk bulan ini
            $totalPlan = collect($categories)->sum('plan');
            $totalActual = collect($categories)->sum('actual');

            // Gabungkan categories dengan total
            return [
                $monthName => [
                    'categories' => $categories,
                    'total' => [
                        'plan' => abs($totalPlan),
                        'actual' => abs($totalActual),
                    ],
                ],
            ];

        })->toArray();
    }

    public function index(Request $request): InertiaResponse
    {
        $annualIncomes = $this->prepareBudgetData($request, BudgetType::INCOME->value, Income::class, 'budget_id');
        $annualSavings = $this->prepareBudgetData($request, BudgetType::SAVING->value, Expense::class, 'budget_id', BudgetType::SAVING->value);
        $annualDebts = $this->prepareBudgetData($request, BudgetType::DEBT->value, Expense::class, 'budget_id', BudgetType::DEBT->value);
        $annualBills = $this->prepareBudgetData($request, BudgetType::BILL->value, Expense::class, 'budget_id', BudgetType::BILL->value);
        $annualShoppings = $this->prepareBudgetData($request, BudgetType::SHOPPING->value, Expense::class, 'budget_id', BudgetType::SHOPPING->value);
        $annualExpenses = $this->prepareBudgetData($request, BudgetType::EXPENSE->value, Expense::class, 'budget_id', BudgetType::EXPENSE->value);

        $annualMonths = $this->getAnnualDataGroupByMonth(
            $annualIncomes,
            $annualSavings,
            $annualDebts,
            $annualBills,
            $annualShoppings,
            $annualExpenses,
        );

        return inertia('AnnualReports/Index', [
            'page_settings' => fn () => [
                'title' => 'Laporan Tahunan',
                'subtitle' => 'Menampilkan semua data laporan tahunan yang tersedia.',
            ],
            'items' => fn () => [
                ['label' => 'CuanKu💲', 'href' => route('dashboard')],
                ['label' => 'Laporan Tahunan'],
            ],
            'years' => range(2020, now()->year),
            'state' => fn () => [
                'year' => $request->year ?? now()->year,
            ],
            'annuals' => fn () => [
                'annualIncomes' => [
                    'data' => $this->calculateByMonth($annualIncomes),
                    'total' => [
                        'plan' => $annualIncomes->sum('plan'),
                        'actual' => $annualIncomes->sum('actual'),
                    ],
                ],
                'annualSavings' => [
                    'data' => $this->calculateByMonth($annualSavings),
                    'total' => [
                        'plan' => $annualSavings->sum('plan'),
                        'actual' => $annualSavings->sum('actual'),
                    ],
                ],
                'annualDebts' => [
                    'data' => $this->calculateByMonth($annualDebts),
                    'total' => [
                        'plan' => $annualDebts->sum('plan'),
                        'actual' => $annualDebts->sum('actual'),
                    ],
                ],
                'annualBills' => [
                    'data' => $this->calculateByMonth($annualBills),
                    'total' => [
                        'plan' => $annualBills->sum('plan'),
                        'actual' => $annualBills->sum('actual'),
                    ],
                ],
                'annualShoppings' => [
                    'data' => $this->calculateByMonth($annualShoppings),
                    'total' => [
                        'plan' => $annualShoppings->sum('plan'),
                        'actual' => $annualShoppings->sum('actual'),
                    ],
                ],
                'annualExpenses' => [
                    'data' => $this->calculateByMonth($annualExpenses),
                    'total' => [
                        'plan' => $annualExpenses->sum('plan'),
                        'actual' => $annualExpenses->sum('actual'),
                    ],
                ],
                'annualMonths' => $annualMonths,
            ],
        ]);
    }

    public function downloadPdf(Request $request): Response
    {
        $annualIncomes = $this->prepareBudgetData($request, BudgetType::INCOME->value, Income::class, 'budget_id');
        $annualSavings = $this->prepareBudgetData($request, BudgetType::SAVING->value, Expense::class, 'budget_id', BudgetType::SAVING->value);
        $annualDebts = $this->prepareBudgetData($request, BudgetType::DEBT->value, Expense::class, 'budget_id', BudgetType::DEBT->value);
        $annualBills = $this->prepareBudgetData($request, BudgetType::BILL->value, Expense::class, 'budget_id', BudgetType::BILL->value);
        $annualShoppings = $this->prepareBudgetData($request, BudgetType::SHOPPING->value, Expense::class, 'budget_id', BudgetType::SHOPPING->value);
        $annualExpenses = $this->prepareBudgetData($request, BudgetType::EXPENSE->value, Expense::class, 'budget_id', BudgetType::EXPENSE->value);

        $annualMonths = $this->getAnnualDataGroupByMonth(
            $annualIncomes,
            $annualSavings,
            $annualDebts,
            $annualBills,
            $annualShoppings,
            $annualExpenses,
        );

        $year = $request->year ?? now()->year;

        $data = [
            'year' => $year,
            'annuals' => [
                'annualIncomes' => [
                    'data' => $this->calculateByMonth($annualIncomes),
                    'total' => [
                        'plan' => $annualIncomes->sum('plan'),
                        'actual' => $annualIncomes->sum('actual'),
                    ],
                ],
                'annualSavings' => [
                    'data' => $this->calculateByMonth($annualSavings),
                    'total' => [
                        'plan' => $annualSavings->sum('plan'),
                        'actual' => $annualSavings->sum('actual'),
                    ],
                ],
                'annualDebts' => [
                    'data' => $this->calculateByMonth($annualDebts),
                    'total' => [
                        'plan' => $annualDebts->sum('plan'),
                        'actual' => $annualDebts->sum('actual'),
                    ],
                ],
                'annualBills' => [
                    'data' => $this->calculateByMonth($annualBills),
                    'total' => [
                        'plan' => $annualBills->sum('plan'),
                        'actual' => $annualBills->sum('actual'),
                    ],
                ],
                'annualShoppings' => [
                    'data' => $this->calculateByMonth($annualShoppings),
                    'total' => [
                        'plan' => $annualShoppings->sum('plan'),
                        'actual' => $annualShoppings->sum('actual'),
                    ],
                ],
                'annualExpenses' => [
                    'data' => $this->calculateByMonth($annualExpenses),
                    'total' => [
                        'plan' => $annualExpenses->sum('plan'),
                        'actual' => $annualExpenses->sum('actual'),
                    ],
                ],
            ],
            'annualMonths' => $annualMonths,
        ];

        $pdf = Pdf::loadView('pdf.annual-report', $data);
        $pdf->setPaper('A4', 'portrait');
        $pdf->setOptions([
            'isHtml5ParserEnabled' => true,
            'isRemoteEnabled' => true,
            'defaultFont' => 'DejaVu Sans',
        ]);

        $filename = "laporan-tahunan-{$year}-".now()->format('Y-m-d').'.pdf';

        return $pdf->download($filename);
    }
}
