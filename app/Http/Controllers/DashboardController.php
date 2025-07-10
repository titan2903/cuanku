<?php

namespace App\Http\Controllers;

use App\Constants\ColorConstant;
use App\Enums\BudgetType;
use App\Enums\MonthEnum;
use App\Models\Budget;
use App\Models\Expense;
use App\Models\Goal;
use App\Models\Income;
use App\Models\NetWorth;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\Auth;
use Inertia\Response;

class DashboardController extends Controller implements HasMiddleware
{
    public static function middleware(): array
    {
        return [
            new Middleware('auth'),
        ];
    }

    public function index(): Response
    {
        $incomeSum = Income::query()
            ->where([
                ['user_id', Auth::user()->id],
                ['year', now()->year],
            ])
            ->sum('nominal');

        $expenseSum = Expense::query()
            ->where([
                ['user_id', Auth::user()->id],
                ['year', now()->year],
            ])
            ->sum('nominal');

        $balanceSum = Goal::query()
            ->with('balances')
            ->where('user_id', Auth::user()->id)
            ->get()
            ->sum(fn ($goal) => $goal->balances->sum('amount') + $goal->beginning_balance);

        $netWorthSum = NetWorth::query()
            ->where([
                ['user_id', Auth::user()->id],
                ['year', now()->year],
            ])->sum('amount_left');

        $goals = Goal::query()
            ->select([
                'id',
                'user_id',
                'name',
                'percentage',
                'nominal',
                'beginning_balance',
                'deadline',
                'created_at',
                'monthly_saving',
            ])->where('user_id', Auth::user()->id)
            ->latest('deadline')
            ->withSum('balances', 'amount')
            ->limit(5)
            ->get();

        $incomes = Income::query()
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
            ])->where([
                ['user_id', Auth::user()->id],
                ['year', now()->year],
            ])
            ->with(['budget'])
            ->latest('created_at')
            ->limit(5)
            ->get();

        $expenses = Expense::query()
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
            ])->where([
                ['user_id', Auth::user()->id],
                ['year', now()->year],
            ])
            ->with(['typeDetail', 'payment'])
            ->latest('created_at')
            ->limit(5)
            ->get();

        return inertia(
            component: 'Dashboard',
            props: [
                'sum' => fn () => [
                    'incomeSum' => $incomeSum,
                    'expenseSum' => $expenseSum,
                    'balanceSum' => $balanceSum,
                    'netWorthSum' => $netWorthSum,
                ],
                'budgetChart' => fn () => $this->budgetChart(),
                'incomeExpenseChart' => fn () => $this->incomeExpenseChart(),
                'year' => now()->year,
                'goals' => $goals,
                'incomes' => $incomes,
                'expenses' => $expenses,
            ]
        );
    }

    private static function getColorForBudgetType(string $typeValue): string
    {
        // Peta eksplisit dari nilai enum ke warna spesifik
        return match ($typeValue) {
            BudgetType::INCOME->value => ColorConstant::COLORS[4],
            BudgetType::SAVING->value => ColorConstant::COLORS[3],
            BudgetType::EXPENSE->value => ColorConstant::COLORS[0],
            BudgetType::SHOPPING->value => ColorConstant::COLORS[2],
            BudgetType::DEBT->value => ColorConstant::COLORS[1],
            BudgetType::BILL->value => ColorConstant::COLORS[8],
            default => '#6b7280', // Gray sebagai warna cadangan
        };
    }

    private function budgetChart(): array
    {
        $budgets = Budget::query()
            ->selectRaw('type, SUM(nominal) as total_nominal')
            ->where([
                ['user_id', Auth::user()->id],
                ['year', now()->year],
            ])
            ->groupBy('type')
            ->get()
            ->map(function ($budget) {
                return [
                    'type' => $budget->type,
                    'nominals' => (int) $budget->total_nominal,
                    'fill' => self::getColorForBudgetType($budget->type->value),
                ];
            });

        $chartConfigBudget = [
            'nominals' => [
                'label' => 'Nominal',
            ],
        ];

        foreach (BudgetType::cases() as $budgetType) {
            $key = strtolower(str_replace(' ', '_', $budgetType->value));

            $chartConfigBudget[$key] = [
                'label' => $budgetType->value,
                'color' => self::getColorForBudgetType($budgetType->value),
            ];
        }

        return [
            'budgets' => $budgets,
            'chartConfigBudget' => $chartConfigBudget,
        ];
    }

    private function incomeExpenseChart()
    {
        $incomeData = Income::query()
            ->selectRaw('month, year, SUM(nominal) as pemasukan')
            ->where([
                ['user_id', Auth::user()->id],
                ['year', now()->year],
            ])
            ->groupBy('month', 'year')
            ->get();

        $expenseData = Expense::query()
            ->selectRaw('month, year, SUM(nominal) as pengeluaran')
            ->where([
                ['user_id', Auth::user()->id],
                ['year', now()->year],
            ])
            ->groupBy('month', 'year')
            ->get();

        $chartData = [];

        foreach (MonthEnum::cases() as $monthEnum) {
            $month = $monthEnum->value;
            $year = now()->year;

            $incomes = $incomeData->where('month', $month)->where('year', $year)->first()?->pemasukan ?? 0;

            $expenses = $expenseData->where('month', $month)->where('year', $year)->first()?->pengeluaran ?? 0;

            $chartData[] = [
                'month' => $month,
                'pemasukan' => $incomes,
                'pengeluaran' => $expenses,
            ];
        }

        return $chartData;
    }
}
