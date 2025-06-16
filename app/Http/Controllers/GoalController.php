<?php

namespace App\Http\Controllers;

use App\Enums\MessageType;
use App\Http\Requests\GoalRequest;
use App\Http\Resources\GoalResource;
use App\Models\Balance;
use App\Models\Goal;
use Illuminate\Http\RedirectResponse;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Carbon;
use Inertia\Response;
use Illuminate\Support\Facades\Auth;
use Throwable;

class GoalController extends Controller implements HasMiddleware
{
    public static function middleware(): array
    {
        return [
            new Middleware("auth"),
            new Middleware("can:update,goal", only: ['edit', 'update']),
            new Middleware("can:delete,goal", only: ['destroy']),
        ];
    }

    public function index(): Response
    {
        $goals = Goal::query()
            ->select([
                'id',
                'user_id',
                'name',
                'percentage',
                'nominal',
                'monthly_saving',
                'deadline',
                'beginning_balance',
                'created_at'
            ])
            ->where('user_id', Auth::user()->id)
            ->filter(request()->only(['search']))
            ->sorting(request()->only(['field', 'direction']))
            ->paginate(request()->load ?? 10);

        return inertia('Savings/Index', [
            'page_settings' => fn() => [
                'title' => 'Tujuan Menabung',
                'subtitle' => 'Menabung untuk Pendidikan, Kesehatan, Liburan, atau Investasi Masa Depan',
                'banner' => [
                    'title' => 'Tabungan',
                    'subtitle' => 'Wujudkan impianmu dengan menabung. Langkah kecil menuju tujuan besar.',
                ]
            ],
            'goals' => fn() => GoalResource::collection($goals)->additional([
                'meta' => [
                    'has_pages' => $goals->hasPages(),
                ],
            ]),
            'state' => fn() => [
                'page' => request()->page ?? 1,
                'search' => request()->search ?? '',
                'load' => request()->load ?? 10,
            ],
            'items' => fn() => [
                ['label' => 'CuanKu💲', 'href' => route('dashboard')],
                ['label' => 'Tabungan'],
            ],
            'year' => fn() => now()->year,
            'count' => fn() => [
                'countGoal' => fn() => Goal::query()->where('user_id', Auth::user()->id)->count(),
                'countGoalAchieved' => fn() => Goal::query()
                    ->where('user_id', Auth::user()->id)
                    ->where('percentage', 100)
                    ->count(),
                'countGoalNotAchieved' => fn() => Goal::query()
                    ->where('user_id', Auth::user()->id)
                    ->where('percentage', '<', 100)
                    ->count(),
                'countBalance' => fn() => Balance::query()->whereHas('goal', fn($query) => $query->where('user_id', Auth::user()->id))->sum('amount') + Goal::query()
                    ->where('user_id', Auth::user()->id)
                    ->sum('beginning_balance'),
            ],
            'productivity_count' => $this->getProductivityCount(),
        ]);
    }

    public function create(): Response
    {
        return inertia('Savings/Create', [
            'page_settings' => fn() => [
                'title' => 'Buat Tujuan Menabung',
                'subtitle' => 'Tetapkan tujuan menabung untuk masa depan yang lebih baik.',
                'method' => 'POST',
                'action' => route('goals.store'),
                'banner' => [
                    'title' => 'Buat Tujuan',
                    'subtitle' => 'Mulailah perjalanan menabungmu hari ini.',
                ]
            ],
            'items' => fn() => [
                ['label' => 'CuanKu💲', 'href' => route('dashboard')],
                ['label' => 'Tabungan', 'href' => route('goals.index')],
                ['label' => 'Buat Tujuan Menabung'],
            ],
        ]);
    }

    public function store(GoalRequest $request): RedirectResponse
    {
        try {
            Goal::create([
                'user_id' => Auth::user()->id,
                'name' => $request->name,
                'nominal' => $request->nominal,
                'monthly_saving' => $request->monthly_saving,
                'deadline' => $request->deadline,
                'beginning_balance' => $request->beginning_balance,
            ]);

            flashMessage(MessageType::CREATED->message('Tujuan'));
            return to_route('goals.index', [], 303);
        } catch (Throwable $e) {
            flashMessage(MessageType::ERROR->message(error: $e->getMessage()), 'error');
            return to_route('goals.index', [], 303);
        }
    }

    public function edit(Goal $goal): Response
    {
        return inertia('Savings/Edit', [
            'page_settings' => fn() => [
                'title' => 'Buat Tujuan Menabung',
                'subtitle' => 'Tetapkan tujuan menabung untuk masa depan yang lebih baik.',
                'method' => 'PUT',
                'action' => route('goals.update', $goal),
                'banner' => [
                    'title' => 'Buat Tujuan',
                    'subtitle' => 'Mulailah perjalanan menabungmu hari ini.',
                ]
            ],
            'goal' => fn() => $goal,
            'items' => fn() => [
                ['label' => 'CuanKu💲', 'href' => route('dashboard')],
                ['label' => 'Tabungan', 'href' => route('goals.index')],
                ['label' => 'Perbarui Tujuan Menabung'],
            ],
        ]);
    }

    public function update(Goal $goal, GoalRequest $request): RedirectResponse
    {
        try {
            $goal->update([
                'name' => $request->name,
                'nominal' => $request->nominal,
                'monthly_saving' => $request->monthly_saving,
                'deadline' => $request->deadline,
                'beginning_balance' => $request->beginning_balance,
                'percentage' => $goal->calculatePercentage(
                    $request->beginning_balance,
                    $request->nominal,
                    Auth::user()->id
                ),
            ]);

            flashMessage(MessageType::UPDATED->message('Tujuan'));
            return to_route('goals.index', 303);
        } catch (Throwable $e) {
            flashMessage(MessageType::ERROR->message(error: $e->getMessage()), 'error');
            return to_route('goals.index', 303);
        }
    }

    public function destroy(Goal $goal): RedirectResponse
    {
        try {
            if ($goal->user_id !== Auth::id()) {
                return back()->with('error', 'Anda tidak diizinkan menghapus data ini');
            }

            $goal->delete();
            flashMessage(MessageType::DELETED->message('Tujuan'));
            return to_route('goals.index', [], 303);
        } catch (Throwable $e) {
            flashMessage(MessageType::ERROR->message(error: $e->getMessage()), 'error');
            return to_route('goals.index', [], 303);
        }
    }

    public function getProductivityCount(): array
    {
        $startDate = Carbon::create(now()->year, 1, 1);
        $endDate = Carbon::create(now()->year, 12, 31);
        $balances = Balance::query()
            ->where('user_id', Auth::user()->id)
            ->selectRaw('DATE(created_at) as transaction_date, count(*) as count')
            ->whereBetween('created_at', [$startDate, $endDate])
            ->groupBy('transaction_date')
            ->orderBy('transaction_date', 'asc')
            ->get();

        $currentDate = $startDate;

        $dates = [];
        while ($currentDate <= $endDate) {
            $dates[] = $currentDate->format('Y-m-d');
            $currentDate->addDay();
        }

        $result = [];
        foreach ($dates as $date) {
            $transaction = $balances->firstWhere('transaction_date', $date);
            $result[] = [
                'transaction_date' => $date,
                'count' => $transaction ? $transaction->count : 0,
            ];
        }

        return $result;
    }
}
