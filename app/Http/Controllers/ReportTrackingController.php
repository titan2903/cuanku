<?php

namespace App\Http\Controllers;

use App\Enums\BudgetType;
use App\Enums\MonthEnum;
use App\Http\Resources\ExpenseResource;
use App\Http\Resources\IncomeResource;
use App\Models\Expense;
use App\Models\Income;
use App\Traits\BudgetTrait;
use App\Traits\FormatReportTrait;
use Barryvdh\DomPDF\Facade\Pdf;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\Auth;
use Inertia\Response as InertiaResponse;

/**
 * @OA\Tag(
 *     name="Report Trackings",
 *     description="API Endpoints for Report Trackings"
 * )
 */
class ReportTrackingController extends Controller implements HasMiddleware
{
    use BudgetTrait, FormatReportTrait;

    public static function middleware(): array
    {
        return [
            new Middleware('auth'),
            new Middleware('password.confirm'),
        ];
    }

    /**
     * @OA\Get(
     *     path="/report-trackings",
     *     summary="Get tracking reports",
     *     tags={"Report Trackings"},
     *     security={{"sanctum":{}}},
     *     @OA\Parameter(name="month", in="query", @OA\Schema(type="string")),
     *     @OA\Parameter(name="year", in="query", @OA\Schema(type="integer")),
     *     @OA\Response(
     *         response=200,
     *         description="Successful operation",
     *         @OA\JsonContent(
     *             @OA\Property(property="reports", type="object"),
     *             @OA\Property(property="incomeTrackers", type="array", @OA\Items(ref="#/components/schemas/IncomeResource")),
     *             @OA\Property(property="expenseTrackers", type="array", @OA\Items(ref="#/components/schemas/ExpenseResource"))
     *         )
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="Unauthorized",
     *         @OA\JsonContent(ref="#/components/schemas/Unauthorized")
     *     )
     * )
     */
    public function __invoke(Request $request): InertiaResponse
    {
        $budgetIncomes = $this->prepareBudgetData($request, BudgetType::INCOME->value, Income::class, 'budget_id');
        $budgetSavings = $this->prepareBudgetData($request, BudgetType::SAVING->value, Expense::class, 'budget_id', BudgetType::SAVING->value);
        $budgetDebts = $this->prepareBudgetData($request, BudgetType::DEBT->value, Expense::class, 'budget_id', BudgetType::DEBT->value);
        $budgetBills = $this->prepareBudgetData($request, BudgetType::BILL->value, Expense::class, 'budget_id', BudgetType::BILL->value);
        $budgetShoppings = $this->prepareBudgetData($request, BudgetType::SHOPPING->value, Expense::class, 'budget_id', BudgetType::SHOPPING->value);
        $budgetExpenses = $this->prepareBudgetData($request, BudgetType::EXPENSE->value, Expense::class, 'budget_id', BudgetType::EXPENSE->value);

        $incomeTrackers = Income::query()
            ->select([
                'id',
                'user_id',
                'budget_id',
                'date',
                'nominal',
                'notes',
                'month',
                'year',
                'created_at',
            ])
            ->when($request->month ?? null, function ($query, $month) {
                $query->where('month', $month);
            })
            ->when($request->year ?? null, function ($query, $year) {
                $query->where('year', $year);
            })
            ->where('user_id', Auth::user()->id)
            ->get();

        $expenseTrackers = Expense::query()
            ->select([
                'id',
                'user_id',
                'budget_id',
                'payment_id',
                'date',
                'description',
                'nominal',
                'type',
                'notes',
                'month',
                'year',
                'created_at',
            ])
            ->when($request->month ?? null, function ($query, $month) {
                $query->where('month', $month);
            })
            ->when($request->year ?? null, function ($query, $year) {
                $query->where('year', $year);
            })
            ->where('user_id', Auth::user()->id)
            ->get();

        $overviews = collect(
            [
                'Cicilan Hutang' => $budgetDebts,
                'Tabungan dan Investasi' => $budgetSavings,
                'Tagihan' => $budgetBills,
                'Belanja' => $budgetShoppings,
                'Pengeluaran' => $budgetExpenses,
            ]
        )->mapWithKeys(function ($items, $category) {
            return [
                $category => [
                    'plan' => $items->sum('plan'),
                    'actual' => $items->sum('actual'),
                    'difference' => $items->sum('difference'),
                ],
            ];
        });

        $cashFlows = collect(
            [
                'Total Penghasilan' => $budgetIncomes,
                'Total Pengeluaran' => $overviews,
            ]
        )->mapWithKeys(function ($item, $category) use ($budgetIncomes, $overviews) {

            if ($category === 'Total Penghasilan') {
                return [
                    $category => [
                        'plan' => $budgetIncomes->sum('plan'),
                        'actual' => $budgetIncomes->sum('actual'),
                        'difference' => $budgetIncomes->sum('difference'),
                    ],
                ];
            } elseif ($category === 'Total Pengeluaran') {
                return [
                    $category => [
                        'plan' => $overviews->sum('plan'),
                        'actual' => $overviews->sum('actual'),
                        'difference' => $overviews->sum('difference'),
                    ],
                ];
            }
        })->merge([
            'Net Cash Flow' => [
                'plan' => abs($budgetIncomes->sum('plan') - $overviews->sum('plan')),
                'actual' => abs($budgetIncomes->sum('actual') - $overviews->sum('actual')),
                'difference' => abs($budgetIncomes->sum('difference') - $overviews->sum('difference')),
            ],
        ]);

        return inertia('ReportTrackings/Index', [
            'page_settings' => fn () => [
                'title' => 'Laporan Pelacakan',
                'subtitle' => 'Menampilkan semua data laporan pelacakan yang tersedia.',
            ],
            'items' => fn () => [
                ['label' => 'CuanKu💲', 'href' => route('dashboard')],
                ['label' => 'Laporan Pelacakan'],
            ],
            'months' => fn () => MonthEnum::options(),
            'years' => range(2020, now()->year),
            'state' => fn () => [
                'month' => $request->month ?? MonthEnum::month(now()->month)->value,
                'year' => $request->year ?? now()->year,
            ],
            'reports' => fn () => [
                'budgetIncomes' => fn () => $this->formatReport($budgetIncomes),
                'budgetExpenses' => fn () => $this->formatReport($budgetExpenses),
                'budgetSavings' => fn () => $this->formatReport($budgetSavings),
                'budgetDebts' => fn () => $this->formatReport($budgetDebts),
                'budgetBills' => fn () => $this->formatReport($budgetBills),
                'budgetShoppings' => fn () => $this->formatReport($budgetShoppings),
            ],
            'incomeTrackers' => fn () => IncomeResource::collection($incomeTrackers),
            'expenseTrackers' => fn () => ExpenseResource::collection($expenseTrackers),
            'overviews' => fn () => $overviews,
            'cashFlows' => fn () => $cashFlows,
        ]);
    }

    /**
     * @OA\Get(
     *     path="/report-trackings/download",
     *     summary="Download tracking report PDF",
     *     tags={"Report Trackings"},
     *     security={{"sanctum":{}}},
     *     @OA\Parameter(name="month", in="query", @OA\Schema(type="string")),
     *     @OA\Parameter(name="year", in="query", @OA\Schema(type="integer")),
     *     @OA\Response(
     *         response=200,
     *         description="Successful operation",
     *         @OA\MediaType(mediaType="application/pdf")
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="Unauthorized",
     *         @OA\JsonContent(ref="#/components/schemas/Unauthorized")
     *     )
     * )
     */
    public function downloadPdf(Request $request): Response
    {
        // Menggunakan data yang sama dengan method __invoke
        $budgetIncomes = $this->prepareBudgetData($request, BudgetType::INCOME->value, Income::class, 'budget_id');
        $budgetSavings = $this->prepareBudgetData($request, BudgetType::SAVING->value, Expense::class, 'budget_id', BudgetType::SAVING->value);
        $budgetDebts = $this->prepareBudgetData($request, BudgetType::DEBT->value, Expense::class, 'budget_id', BudgetType::DEBT->value);
        $budgetBills = $this->prepareBudgetData($request, BudgetType::BILL->value, Expense::class, 'budget_id', BudgetType::BILL->value);
        $budgetShoppings = $this->prepareBudgetData($request, BudgetType::SHOPPING->value, Expense::class, 'budget_id', BudgetType::SHOPPING->value);
        $budgetExpenses = $this->prepareBudgetData($request, BudgetType::EXPENSE->value, Expense::class, 'budget_id', BudgetType::EXPENSE->value);

        $incomeTrackers = Income::query()
            ->select([
                'id',
                'user_id',
                'budget_id',
                'date',
                'nominal',
                'notes',
                'month',
                'year',
                'created_at',
            ])
            ->when($request->month ?? null, function ($query, $month) {
                $query->where('month', $month);
            })
            ->when($request->year ?? null, function ($query, $year) {
                $query->where('year', $year);
            })
            ->where('user_id', Auth::user()->id)
            ->get();

        $expenseTrackers = Expense::query()
            ->select([
                'id',
                'user_id',
                'budget_id',
                'payment_id',
                'date',
                'description',
                'nominal',
                'type',
                'notes',
                'month',
                'year',
                'created_at',
            ])
            ->when($request->month ?? null, function ($query, $month) {
                $query->where('month', $month);
            })
            ->when($request->year ?? null, function ($query, $year) {
                $query->where('year', $year);
            })
            ->where('user_id', Auth::user()->id)
            ->get();

        $overviews = collect(
            [
                'Cicilan Hutang' => $budgetDebts,
                'Tabungan dan Investasi' => $budgetSavings,
                'Tagihan' => $budgetBills,
                'Belanja' => $budgetShoppings,
                'Pengeluaran' => $budgetExpenses,
            ]
        )->mapWithKeys(function ($items, $category) {
            return [
                $category => [
                    'plan' => $items->sum('plan'),
                    'actual' => $items->sum('actual'),
                    'difference' => $items->sum('difference'),
                ],
            ];
        });

        $cashFlows = collect(
            [
                'Total Penghasilan' => $budgetIncomes,
                'Total Pengeluaran' => $overviews,
            ]
        )->mapWithKeys(function ($item, $category) use ($budgetIncomes, $overviews) {

            if ($category === 'Total Penghasilan') {
                return [
                    $category => [
                        'plan' => $budgetIncomes->sum('plan'),
                        'actual' => $budgetIncomes->sum('actual'),
                        'difference' => $budgetIncomes->sum('difference'),
                    ],
                ];
            } elseif ($category === 'Total Pengeluaran') {
                return [
                    $category => [
                        'plan' => $overviews->sum('plan'),
                        'actual' => $overviews->sum('actual'),
                        'difference' => $overviews->sum('difference'),
                    ],
                ];
            }
        })->merge([
            'Net Cash Flow' => [
                'plan' => abs($budgetIncomes->sum('plan') - $overviews->sum('plan')),
                'actual' => abs($budgetIncomes->sum('actual') - $overviews->sum('actual')),
                'difference' => abs($budgetIncomes->sum('difference') - $overviews->sum('difference')),
            ],
        ]);

        $data = [
            'user' => Auth::user(),
            'month' => $request->month ?? MonthEnum::month(now()->month)->value,
            'year' => $request->year ?? now()->year,
            'monthName' => MonthEnum::stringMonth($request->month ?? now()->month)->name,
            'reports' => [
                'budgetIncomes' => $this->formatReport($budgetIncomes),
                'budgetExpenses' => $this->formatReport($budgetExpenses),
                'budgetSavings' => $this->formatReport($budgetSavings),
                'budgetDebts' => $this->formatReport($budgetDebts),
                'budgetBills' => $this->formatReport($budgetBills),
                'budgetShoppings' => $this->formatReport($budgetShoppings),
            ],
            'incomeTrackers' => IncomeResource::collection($incomeTrackers),
            'expenseTrackers' => ExpenseResource::collection($expenseTrackers),
            'overviews' => $overviews,
            'cashFlows' => $cashFlows,
            'generatedAt' => Carbon::now('Asia/Jakarta'),
        ];

        $pdf = Pdf::loadView('pdf.report-tracking', $data);

        $fileName = "laporan-pelacakan-{$data['year']}-{$data['month']}.pdf";

        return $pdf->download($fileName);
    }
}
