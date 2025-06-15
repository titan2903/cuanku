<?php

namespace App\Http\Controllers;

use App\Enums\MessageType;
use App\Http\Requests\GoalRequest;
use App\Http\Resources\GoalResource;
use App\Models\Goal;
use Illuminate\Http\RedirectResponse;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Inertia\Response;
use Illuminate\Support\Facades\Auth;
use Throwable;

class GoalController extends Controller implements HasMiddleware
{
    public static function middleware(): array
    {
        return [
            new Middleware("auth"),
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
        try{
            Goal::create([
                'user_id' => Auth::user()->id,
                'name' => $request->name,
                'nominal' => $request->nominal,
                'monthly_saving' => $request->monthly_saving,
                'deadline' => $request->deadline,
                'beginning_balance' => $request->beginning_balance,
            ]);

            flashMessage(MessageType::CREATED->message('Tujuan'));
            return to_route('goals.index');
        }catch (Throwable $e){
            flashMessage(MessageType::ERROR->message(error: $e->getMessage()), 'error');
            return to_route('goals.index');
        }
    }
}
