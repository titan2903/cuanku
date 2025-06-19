<?php

namespace App\Http\Controllers;

use App\Enums\MessageType;
use App\Http\Requests\NetWorthRequest;
use App\Http\Resources\NetWorthResource;
use App\Models\NetWorth;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\Auth;
use Inertia\Response;
use Throwable;

class NetWorthController extends Controller implements HasMiddleware
{
    public static function middleware(): array
    {
        return [
            new Middleware("auth"),
            new Middleware('password.confirm'),
            new Middleware("can:view,netWorth", only: ['show']),
            new Middleware("can:update,netWorth", only: ['edit', 'update']),
            new Middleware('can:delete,netWorth', only: ['destroy']),
        ];
    }

    public function index(): Response
    {
        $netWorths = NetWorth::query()
            ->select([
                'id',
                'user_id',
                'net_worth_goal',
                'current_net_worth',
                'amount_left',
                'transaction_per_month',
                'year',
                'created_at'
            ])
            ->where('user_id', Auth::user()->id)
            ->filter(request()->only(['search']))
            ->sorting(request()->only(['field', 'direction']))
            ->paginate(request()->load ?? 10);

        return inertia('NetWorths/Index', [
            'page_settings' => fn() => [
                'title' => 'Kekayaan Bersih',
                'subtitle' => 'Menampilkan semua data kekayaan bersih yang tersedia pada akun Anda.',
            ],
            'netWorths' => fn() => NetWorthResource::collection($netWorths)->additional([
                'meta' => [
                    'has_pages' => $netWorths->hasPages(),
                ],
            ]),
            'state' => fn() => [
                'page' => request()->page ?? 1,
                'search' => request()->search ?? '',
                'load' => request()->load ?? 10,
            ],
            'items' => fn() => [
                ['label' => 'CuanKu💲', 'href' => route('dashboard')],
                ['label' => 'Kekayaan Bersih'],
            ],
        ]);
    }

    public function create(): Response
    {
        return inertia('NetWorths/Create', [
            'page_settings' => fn() => [
                'title' => 'Tambah Kekayaan Bersih',
                'subtitle' => 'Tambahkan data kekayaan bersih Anda untuk memantau perkembangan finansial Anda.',
                'method' => 'POST',
                'action' => route('net-worths.store'),
            ],
            'items' => fn() => [
                ['label' => 'CuanKu💲', 'href' => route('dashboard')],
                ['label' => 'Kekayaan Bersih', 'href' => route('net-worths.index')],
                ['label' => 'Tambah Kekayaan Bersih'],
            ],
            'years' => range(2020, now()->year),
        ]);
    }

    public function store(NetWorthRequest $request): RedirectResponse
    {
        try {
            NetWorth::create([
                'user_id' => Auth::user()->id,
                'net_worth_goal' => $netWorthGoal = $request->net_worth_goal,
                'current_net_worth' => 0,
                'amount_left' => $netWorthGoal,
                'transaction_per_month' => $request->transaction_per_month,
                'year' => $request->year ?? now()->year,
            ]);

            flashMessage(MessageType::CREATED->message('Kekayaan Bersih.'));
            return to_route('net-worths.index');
        } catch (Throwable $e) {
            flashMessage(MessageType::ERROR->message(error: $e->getMessage()), 'error');
            return to_route('net-worths.index');
        }
    }

    public function show(NetWorth $netWorth): Response
    {
        return inertia('NetWorths/Show', [
            'page_settings' => fn() => [
                'title' => 'Detail Kekayaan Bersih',
                'subtitle' => 'Menampilkan detail kekayaan bersih Anda.',
            ],
            'items' => fn() => [
                ['label' => 'CuanKu💲', 'href' => route('dashboard')],
                ['label' => 'Kekayaan Bersih', 'href' => route('net-worths.index')],
                ['label' => $netWorth->id],
            ],
            'netWorth' => fn() => $netWorth,
        ]);
    }

    public function edit(NetWorth $netWorth): Response
    {
        return inertia('NetWorths/Edit', [
            'page_settings' => fn() => [
                'title' => 'Edit Kekayaan Bersih',
                'subtitle' => 'Edit kekayaan bersih anda di sini.',
                'method' => 'PUT',
                'action' => route('net-worths.update', $netWorth),
            ],
            'items' => fn() => [
                ['label' => 'CuanKu💲', 'href' => route('dashboard')],
                ['label' => 'Kekayaan Bersih', 'href' => route('net-worths.index')],
                ['label' => 'Edit Kekayaan Bersih'],
            ],
            'netWorth' => fn() => $netWorth,
            'years' => range(2020, now()->year),
        ]);
    }

    public function update(NetWorth $netWorth ,NetWorthRequest $request): RedirectResponse
    {
        try {
            $netWorth->update([
                'net_worth_goal' => $netWorthGoal = $request->net_worth_goal,
                'amount_left' => $netWorthGoal,
                'transaction_per_month' => $request->transaction_per_month,
            ]);

            flashMessage(MessageType::UPDATED->message('Kekayaan Bersih.'));
            return to_route('net-worths.index');
        } catch (Throwable $e) {
            flashMessage(MessageType::ERROR->message(error: $e->getMessage()), 'error');
            return to_route('net-worths.index');
        }
    }

    public function destroy(NetWorth $netWorth): RedirectResponse
    {
        try {
            if ($netWorth->user_id !== Auth::id()) {
                return back()->with('error', 'Anda tidak diizinkan menghapus data ini');
            }

            $netWorth->delete();
            flashMessage(MessageType::DELETED->message('Kekayaan Bersih.'));
            return to_route('net-worths.index', [], 303);
        } catch (Throwable $e) {
            flashMessage(MessageType::ERROR->message(error: $e->getMessage()), 'error');
            return to_route('net-worths.index', [], 303);
        }
    }
}
