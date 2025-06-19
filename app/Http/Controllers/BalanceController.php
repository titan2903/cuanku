<?php

namespace App\Http\Controllers;

use App\Enums\MessageType;
use App\Http\Requests\BalanceRequest;
use App\Http\Resources\BalanceResource;
use App\Models\Balance;
use App\Models\Goal;
use Illuminate\Http\RedirectResponse;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\Auth;
use Inertia\Response;
use Throwable;

class BalanceController extends Controller implements HasMiddleware
{
    public static function middleware(): array
    {
        return [
            new Middleware('auth'),
            new Middleware('can:view,goal', only: ['index']),
            new Middleware('can:create,goal', only: ['create', 'store']),
            new Middleware('can:delete,balance', only: ['destroy']),
        ];
    }

    public function index(Goal $goal): Response
    {
        $balance = Balance::query()
            ->select(['id', 'user_id', 'goal_id', 'amount', 'created_at'])
            ->where('user_id', Auth::user()->id)
            ->where('goal_id', $goal->id)
            ->filter(request()->only(['search']))
            ->sorting(request()->only(['field', 'direction']))
            ->paginate(request()->load ?? 10);

        return inertia('Savings/Balances/Index', [
            'page_settings' => fn () => [
                'title' => 'Saldo Tabungan',
                'subtitle' => "Kelola saldo tabunganmu dengan mudah dan efektif pada tujuan {$goal->name}.",
                'banner' => [
                    'title' => 'Saldo Tabungan',
                    'subtitle' => 'Pantau dan kelola saldo tabunganmu untuk mencapai tujuan keuangan.',
                ],
            ],
            'balances' => fn () => BalanceResource::collection($balance)->additional([
                'meta' => [
                    'has_pages' => $balance->hasPages(),
                ],
            ]),
            'goal' => fn () => $goal->loadSum('balances', 'amount')->loadSum([
                'balances as balances_sum_amount' => function ($query) {
                    $query->whereMonth('created_at', now()->month)
                        ->whereYear('created_at', now()->year);
                },
            ], 'amount'),
            'state' => fn () => [
                'page' => request()->page ?? 1,
                'search' => request()->search ?? '',
                'load' => request()->load ?? 10,
            ],
            'items' => fn () => [
                ['label' => 'CuanKu💲', 'href' => route('dashboard')],
                ['label' => 'Tabungan', 'href' => route('goals.index')],
                ['label' => $goal->id, 'href' => route('goals.index')],
                ['label' => 'Saldo'],
            ],
        ]);
    }

    public function create(Goal $goal): Response
    {
        return inertia('Savings/Balances/Create', [
            'page_settings' => fn () => [
                'title' => 'Tambah Saldo Tabungan',
                'subtitle' => "Menabung sekarang untuk mencapai tujuan {$goal->name}.",
                'banner' => [
                    'title' => 'Saldo Tabungan',
                    'subtitle' => 'Pantau dan kelola saldo tabunganmu untuk mencapai tujuan keuangan.',
                ],
                'method' => 'POST',
                'action' => route('balances.store', $goal),
            ],
            'goal' => fn () => $goal,
            'items' => fn () => [
                ['label' => 'CuanKu💲', 'href' => route('dashboard')],
                ['label' => 'Tabungan', 'href' => route('goals.index')],
                ['label' => $goal->id, 'href' => route('goals.index')],
                ['label' => 'Saldo', 'href' => route('balances.index', $goal)],
                ['label' => 'Tambah Saldo'],
            ],
        ]);
    }

    public function store(Goal $goal, BalanceRequest $request): RedirectResponse
    {
        try {
            $realized = ($goal->nominal - ($goal->beginning_balance + $goal->calculateBalance((Auth::user()->id))));

            if ($request->amount > $realized) {
                $excess = $request->amount - $realized;
                flashMessage('Tabungan anda melebihi target sebesar '.number_format($excess, 0, ',', '.'), 'warning');

                return to_route('balances.create', $goal, 303);
            }
            if ($request->amount <= 0) {
                flashMessage(('Saldo harus lebih besar dari nol.'), 'warning');

                return to_route('balances.create', $goal, 303);
            }

            Balance::create([
                'user_id' => Auth::user()->id,
                'goal_id' => $goal->id,
                'amount' => $request->amount,
            ]);

            $goal->update([
                'percentage' => $goal->calculatePercentage(
                    $goal->beginning_balance,
                    $goal->nominal,
                    Auth::user()->id
                ),
            ]);

            flashMessage(MessageType::CREATED->message('Saldo'));

            return to_route('balances.index', $goal, 303);
        } catch (Throwable $e) {
            flashMessage(MessageType::ERROR->message(error: $e->getMessage()), 'error');

            return to_route('balances.index', $goal, 303);
        }
    }

    public function destroy(Goal $goal, Balance $balance): RedirectResponse
    {
        try {
            if ($balance->user_id !== Auth::id()) {
                return back()->with('error', 'Anda tidak diizinkan menghapus data ini');
            }

            $goal->update([
                'percentage' => $goal->calculatePercentage(
                    $goal->beginning_balance,
                    $goal->nominal,
                    Auth::user()->id
                ),
            ]);

            $balance->delete();

            flashMessage(MessageType::DELETED->message('Saldo'));

            return to_route('balances.index', $goal, 303);
        } catch (Throwable $e) {
            flashMessage(MessageType::ERROR->message(error: $e->getMessage()), 'error');

            return to_route('balances.index', $goal, 303);
        }
    }
}
