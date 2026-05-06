<?php

namespace App\Http\Controllers;

use App\Enums\BudgetType;
use App\Enums\MessageType;
use App\Enums\MonthEnum;
use App\Http\Requests\BudgetRequest;
use App\Http\Resources\BudgetResource;
use App\Models\Budget;
use Illuminate\Http\RedirectResponse;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\Auth;
use Inertia\Response;
use Throwable;

use function App\Helpers\flashMessage;

class BudgetController extends Controller implements HasMiddleware
{
    public static function middleware(): array
    {
        return [
            new Middleware('auth'),
            new Middleware('can:update,budget', only: ['edit', 'update']),
            new Middleware('can:delete,budget', only: ['destroy']),
        ];
    }

    /**
     * @OA\Get(
     *     path="/budgets",
     *     summary="List all budgets",
     *     tags={"Budgets"},
     *     security={{"sanctum":{}}},
     *     @OA\Parameter(name="search", in="query", @OA\Schema(type="string")),
     *     @OA\Parameter(name="month", in="query", @OA\Schema(type="string")),
     *     @OA\Parameter(name="year", in="query", @OA\Schema(type="string")),
     *     @OA\Parameter(name="type", in="query", @OA\Schema(type="string")),
     *     @OA\Response(
     *         response=200,
     *         description="Successful operation",
     *         @OA\JsonContent(
     *             @OA\Property(property="status", type="string", example="success"),
     *             @OA\Property(property="message", type="string", example="Budget retrieved successfully."),
     *             @OA\Property(property="data", type="array", @OA\Items(ref="#/components/schemas/BudgetResource"))
     *         )
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="Unauthorized",
     *         @OA\JsonContent(ref="#/components/schemas/Unauthorized")
     *     )
     * )
     */
    public function index(): Response
    {
        $budgets = Budget::query()
            ->select([
                'id',
                'user_id',
                'detail',
                'nominal',
                'month',
                'year',
                'type',
                'created_at',
            ])
            ->where('user_id', Auth::user()->id)
            ->filter(request()->only(['search', 'month', 'year', 'type']))
            ->sorting(request()->only(['field', 'direction']))
            ->paginate(request()->load ?? 10);

        return inertia('Budgets/Index', [
            'page_settings' => fn () => [
                'title' => 'Anggaran',
                'subtitle' => 'Menampilkan semua anggaran yang tersedia pada akun Anda.',
            ],
            'budgets' => fn () => BudgetResource::collection($budgets)->additional([
                'meta' => [
                    'has_pages' => $budgets->hasPages(),
                ],
            ]),
            'state' => fn () => [
                'page' => request()->page ?? 1,
                'search' => request()->search ?? '',
                'load' => request()->load ?? 10,
                'month' => request()->month ?? '',
                'type' => request()->type ?? '',
                'year' => request()->year ?? '',
            ],
            'items' => fn () => [
                ['label' => 'CuanKu💲', 'href' => route('dashboard')],
                ['label' => 'Anggaran'],
            ],
            'months' => fn () => MonthEnum::options(),
            'types' => fn () => BudgetType::options(),
            'years' => range(2020, now()->year),
            'statistics' => fn () => [
                'incomes' => fn () => Budget::query()
                    ->where('user_id', Auth::user()->id)
                    ->when(request()->month, fn ($q, $month) => $q->where('month', $month))
                    ->when(request()->year, fn ($q, $year) => $q->where('year', $year))
                    ->where('type', BudgetType::INCOME->value)
                    ->sum('nominal'),
                'savings' => fn () => Budget::query()
                    ->where('user_id', Auth::user()->id)
                    ->when(request()->month, fn ($q, $month) => $q->where('month', $month))
                    ->when(request()->year, fn ($q, $year) => $q->where('year', $year))
                    ->where('type', BudgetType::SAVING->value)
                    ->sum('nominal'),
                'debts' => fn () => Budget::query()
                    ->where('user_id', Auth::user()->id)
                    ->when(request()->month, fn ($q, $month) => $q->where('month', $month))
                    ->when(request()->year, fn ($q, $year) => $q->where('year', $year))
                    ->where('type', BudgetType::DEBT->value)
                    ->sum('nominal'),
                'bills' => fn () => Budget::query()
                    ->where('user_id', Auth::user()->id)
                    ->when(request()->month, fn ($q, $month) => $q->where('month', $month))
                    ->when(request()->year, fn ($q, $year) => $q->where('year', $year))
                    ->where('type', BudgetType::BILL->value)
                    ->sum('nominal'),
                'shoppings' => fn () => Budget::query()
                    ->where('user_id', Auth::user()->id)
                    ->when(request()->month, fn ($q, $month) => $q->where('month', $month))
                    ->when(request()->year, fn ($q, $year) => $q->where('year', $year))
                    ->where('type', BudgetType::SHOPPING->value)
                    ->sum('nominal'),
                'expenses' => fn () => Budget::query()
                    ->where('user_id', Auth::user()->id)
                    ->when(request()->month, fn ($q, $month) => $q->where('month', $month))
                    ->when(request()->year, fn ($q, $year) => $q->where('year', $year))
                    ->where('type', BudgetType::EXPENSE->value)
                    ->sum('nominal'),
            ],
        ]);
    }

    public function create(): Response
    {
        return inertia('Budgets/Create', [
            'page_settings' => fn () => [
                'title' => 'Tambah Anggaran',
                'subtitle' => 'Buat anggaran baru di sini, Klik submit setelah selesai.',
                'method' => 'POST',
                'action' => route('budgets.store'),
            ],
            'items' => fn () => [
                ['label' => 'CuanKu💲', 'href' => route('dashboard')],
                ['label' => 'Anggaran', 'href' => route('budgets.index')],
                ['label' => 'Tambah Anggaran'],
            ],
            'months' => fn () => MonthEnum::options(),
            'types' => fn () => BudgetType::options(),
            'years' => range(2020, now()->year),
        ]);
    }

    /**
     * @OA\Post(
     *     path="/budgets",
     *     summary="Create a new budget",
     *     tags={"Budgets"},
     *     security={{"sanctum":{}}},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(ref="#/components/schemas/BudgetRequest")
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Budget created successfully",
     *         @OA\JsonContent(
     *             @OA\Property(property="status", type="string", example="success"),
     *             @OA\Property(property="message", type="string", example="Budget created successfully.")
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
    public function store(BudgetRequest $request): RedirectResponse
    {
        try {
            Budget::create([
                'user_id' => Auth::user()->id,
                'detail' => $request->detail,
                'nominal' => $request->nominal,
                'month' => $request->month,
                'year' => $request->year,
                'type' => $request->type,
            ]);

            flashMessage(MessageType::CREATED->message('Anggaran.'));

            return to_route('budgets.index');
        } catch (Throwable $e) {
            flashMessage(MessageType::ERROR->message(error: $e->getMessage()), 'error');

            return to_route('budgets.index');
        }
    }

    public function edit(Budget $budget): Response
    {
        return inertia('Budgets/Edit', [
            'page_settings' => fn () => [
                'title' => 'Edit Anggaran',
                'subtitle' => 'Edit anggaran di sini, Klik submit setelah selesai.',
                'method' => 'PUT',
                'action' => route('budgets.update', $budget),
            ],
            'items' => fn () => [
                ['label' => 'CuanKu💲', 'href' => route('dashboard')],
                ['label' => 'Anggaran', 'href' => route('budgets.index')],
                ['label' => 'Edit Anggaran'],
            ],
            'months' => fn () => MonthEnum::options(),
            'types' => fn () => BudgetType::options(),
            'years' => range(2020, now()->year),
            'budget' => fn () => $budget,
        ]);
    }

    /**
     * @OA\Put(
     *     path="/budgets/{budget}",
     *     summary="Update an existing budget",
     *     tags={"Budgets"},
     *     security={{"sanctum":{}}},
     *     @OA\Parameter(name="budget", in="path", required=true, @OA\Schema(type="string", format="uuid")),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(ref="#/components/schemas/BudgetRequest")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Budget updated successfully",
     *         @OA\JsonContent(
     *             @OA\Property(property="status", type="string", example="success"),
     *             @OA\Property(property="message", type="string", example="Budget updated successfully.")
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Not Found",
     *         @OA\JsonContent(ref="#/components/schemas/NotFound")
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
    public function update(Budget $budget, BudgetRequest $request): RedirectResponse
    {
        try {
            $budget->update([
                'detail' => $request->detail,
                'nominal' => $request->nominal,
                'month' => $request->month,
                'year' => $request->year,
                'type' => $request->type,
            ]);

            flashMessage(MessageType::UPDATED->message('Anggaran.'));

            return to_route('budgets.index');
        } catch (Throwable $e) {
            flashMessage(MessageType::ERROR->message(error: $e->getMessage()), 'error');

            return to_route('budgets.index');
        }
    }

    /**
     * @OA\Delete(
     *     path="/budgets/{budget}",
     *     summary="Delete a budget",
     *     tags={"Budgets"},
     *     security={{"sanctum":{}}},
     *     @OA\Parameter(name="budget", in="path", required=true, @OA\Schema(type="string", format="uuid")),
     *     @OA\Response(
     *         response=200,
     *         description="Budget deleted successfully",
     *         @OA\JsonContent(
     *             @OA\Property(property="status", type="string", example="success"),
     *             @OA\Property(property="message", type="string", example="Budget deleted successfully.")
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
    public function destroy(Budget $budget): RedirectResponse
    {
        try {
            if ($budget->user_id !== Auth::id()) {
                return back()->with('error', 'Anda tidak diizinkan menghapus data ini');
            }

            $budget->delete();
            flashMessage(MessageType::DELETED->message('Anggaran.'));

            return to_route('budgets.index', [], 303);
        } catch (Throwable $e) {
            flashMessage(MessageType::ERROR->message(error: $e->getMessage()), 'error');

            return to_route('budgets.index', [], 303);
        }
    }
}
