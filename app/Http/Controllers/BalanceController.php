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

use function App\Helpers\flashMessage;

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

    /**
     * @OA\Get(
     *     path="/goals/{goal}/balances",
     *     summary="List all balances for a specific goal",
     *     tags={"Balances"},
     *     security={{"sanctum":{}}},
     *     @OA\Parameter(name="goal", in="path", required=true, @OA\Schema(type="string", format="uuid")),
     *     @OA\Parameter(name="search", in="query", @OA\Schema(type="string")),
     *     @OA\Response(
     *         response=200,
     *         description="Successful operation",
     *         @OA\JsonContent(
     *             @OA\Property(property="status", type="string", example="success"),
     *             @OA\Property(property="message", type="string", example="Balance retrieved successfully."),
     *             @OA\Property(property="data", type="array", @OA\Items(ref="#/components/schemas/BalanceResource"))
     *         )
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="Unauthorized",
     *         @OA\JsonContent(ref="#/components/schemas/Unauthorized")
     *     )
     * )
     */
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

    /**
     * @OA\Post(
     *     path="/goals/{goal}/balances",
     *     summary="Create a new balance for a goal",
     *     tags={"Balances"},
     *     security={{"sanctum":{}}},
     *     @OA\Parameter(name="goal", in="path", required=true, @OA\Schema(type="string", format="uuid")),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(ref="#/components/schemas/BalanceRequest")
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Balance created successfully",
     *         @OA\JsonContent(
     *             @OA\Property(property="status", type="string", example="success"),
     *             @OA\Property(property="message", type="string", example="Balance created successfully.")
     *         )
     *     ),
     *     @OA\Response(
     *         response=422,
     *         description="Validation Error",
     *         @OA\JsonContent(ref="#/components/schemas/ValidationError")
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="Unauthorized",
     *         @OA\JsonContent(ref="#/components/schemas/Unauthorized")
     *     )
     * )
     */
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

    /**
     * @OA\Delete(
     *     path="/goals/{goal}/balances/{balance}",
     *     summary="Delete a balance",
     *     tags={"Balances"},
     *     security={{"sanctum":{}}},
     *     @OA\Parameter(name="goal", in="path", required=true, @OA\Schema(type="string", format="uuid")),
     *     @OA\Parameter(name="balance", in="path", required=true, @OA\Schema(type="string", format="uuid")),
     *     @OA\Response(
     *         response=200,
     *         description="Balance deleted successfully",
     *         @OA\JsonContent(
     *             @OA\Property(property="status", type="string", example="success"),
     *             @OA\Property(property="message", type="string", example="Balance deleted successfully.")
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Not Found",
     *         @OA\JsonContent(ref="#/components/schemas/NotFound")
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="Unauthorized",
     *         @OA\JsonContent(ref="#/components/schemas/Unauthorized")
     *     )
     * )
     */
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
