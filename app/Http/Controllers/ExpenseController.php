<?php

namespace App\Http\Controllers;

use App\Enums\BudgetType;
use App\Enums\MessageType;
use App\Enums\MonthEnum;
use App\Http\Requests\ExpenseRequest;
use App\Http\Resources\ExpenseResource;
use App\Models\Budget;
use App\Models\Expense;
use App\Models\Payment;
use Illuminate\Http\RedirectResponse;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\Auth;
use Inertia\Response;
use Throwable;

use function App\Helpers\flashMessage;

/**
 * @OA\Tag(
 *     name="Expenses",
 *     description="API Endpoints for Expenses"
 * )
 */
class ExpenseController extends Controller implements HasMiddleware
{
    public static function middleware(): array
    {
        return [
            new Middleware('auth'),
            new Middleware('can:update,expense', only: ['edit', 'update']),
            new Middleware('can:delete,expense', only: ['destroy']),
        ];
    }

    /**
     * @OA\Get(
     *     path="/expenses",
     *     summary="List all expenses",
     *     tags={"Expenses"},
     *     security={{"sanctum":{}}},
     *     @OA\Parameter(name="search", in="query", @OA\Schema(type="string")),
     *     @OA\Parameter(name="month", in="query", @OA\Schema(type="string")),
     *     @OA\Parameter(name="year", in="query", @OA\Schema(type="string")),
     *     @OA\Response(response=200, description="Successful operation"),
     *     @OA\Response(response=401, description="Unauthenticated")
     * )
     */
    public function index(): Response
    {
        $expenses = Expense::query()
            ->select([
                'id',
                'user_id',
                'date',
                'description',
                'nominal',
                'type',
                'budget_id',
                'payment_id',
                'notes',
                'month',
                'year',
                'created_at',
            ])
            ->where('user_id', Auth::user()->id)
            ->filter(request()->only(['search', 'month', 'year']))
            ->sorting(request()->only(['field', 'direction']))
            ->with(['typeDetail', 'payment'])
            ->paginate(request()->load ?? 10);

        return inertia('Expenses/Index', [
            'page_settings' => fn () => [
                'title' => 'Pengeluaran',
                'subtitle' => 'Menampilkan semua pengeluaran yang tersedia pada akun anda.',
            ],
            'expenses' => fn () => ExpenseResource::collection($expenses)->additional([
                'meta' => [
                    'has_pages' => $expenses->hasPages(),
                ],
            ]),
            'state' => fn () => [
                'page' => request()->page ?? 1,
                'search' => request()->search ?? '',
                'load' => request()->load ?? 10,
                'month' => request()->month ?? '',
                'year' => request()->year ?? '',
            ],
            'items' => fn () => [
                ['label' => 'CuanKu💲', 'href' => route('dashboard')],
                ['label' => 'Pengeluaran'],
            ],
            'months' => fn () => MonthEnum::options(),
            'years' => range(2020, now()->year),
        ]);
    }

    public function create(): Response
    {
        return inertia('Expenses/Create', [
            'page_settings' => fn () => [
                'title' => 'Tambah Pengeluaran',
                'subtitle' => 'Buat pengeluaran baru di sini, Klik submit setelah selesai.',
                'method' => 'POST',
                'action' => route('expenses.store'),
            ],
            'items' => fn () => [
                ['label' => 'CuanKu💲', 'href' => route('dashboard')],
                ['label' => 'Pengeluaran', 'href' => route('expenses.index')],
                ['label' => 'Tambah Pengeluaran'],
            ],
            'months' => fn () => MonthEnum::options(),
            'years' => range(2020, now()->year),
            'types' => fn () => BudgetType::options([
                'INCOME',
            ]),
            'payments' => fn () => Payment::query()
                ->select(['id', 'name'])
                ->where('user_id', Auth::user()->id)
                ->get()
                ->map(fn ($item) => [
                    'value' => $item->id,
                    'label' => $item->name,
                ]),
            'budgets' => fn () => request()->type ? Budget::query()
                ->select(['id', 'user_id', 'detail',  'year', 'month', 'type'])
                ->where('user_id', Auth::user()->id)
                ->where('type', request()->type)
                ->get()
                ->map(fn ($item) => [
                    'value' => $item->id,
                    'label' => $item->detail,
                    'month' => $item->month,
                    'year' => $item->year,
                ]) : collect([]),
            'state' => fn () => [
                'type' => request()->type ?? '',
            ],
        ]);
    }

    /**
     * @OA\Post(
     *     path="/expenses",
     *     summary="Create a new expense",
     *     tags={"Expenses"},
     *     security={{"sanctum":{}}},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"budget_id", "payment_id", "date", "description", "nominal", "type", "month", "year"},
     *             @OA\Property(property="budget_id", type="integer"),
     *             @OA\Property(property="payment_id", type="integer"),
     *             @OA\Property(property="date", type="string", format="date"),
     *             @OA\Property(property="description", type="string"),
     *             @OA\Property(property="nominal", type="number"),
     *             @OA\Property(property="type", type="string"),
     *             @OA\Property(property="notes", type="string"),
     *             @OA\Property(property="month", type="string"),
     *             @OA\Property(property="year", type="integer")
     *         )
     *     ),
     *     @OA\Response(response=201, description="Expense created successfully"),
     *     @OA\Response(response=422, description="Validation error")
     * )
     */
    public function store(ExpenseRequest $request): RedirectResponse
    {
        try {
            Expense::create([
                'user_id' => Auth::user()->id,
                'budget_id' => $request->budget_id,
                'payment_id' => $request->payment_id,
                'date' => $request->date,
                'description' => $request->description,
                'nominal' => $request->nominal,
                'type' => $request->type,
                'notes' => $request->notes,
                'month' => $request->month,
                'year' => $request->year,
            ]);

            flashMessage(MessageType::CREATED->message('Pengeluaran.'));

            return to_route('expenses.index');
        } catch (Throwable $e) {
            flashMessage(MessageType::ERROR->message(error: $e->getMessage()), 'error');

            return to_route('expenses.index');
        }
    }

    public function edit(Expense $expense): Response
    {
        return inertia('Expenses/Edit', [
            'page_settings' => fn () => [
                'title' => 'Edit Pengeluaran',
                'subtitle' => 'Update pengeluaran di sini, Klik submit setelah selesai.',
                'method' => 'PUT',
                'action' => route('expenses.update', $expense),
            ],
            'items' => fn () => [
                ['label' => 'CuanKu💲', 'href' => route('dashboard')],
                ['label' => 'Pengeluaran', 'href' => route('expenses.index')],
                ['label' => 'Edit Pengeluaran'],
            ],
            'expense' => fn () => $expense,
            'months' => fn () => MonthEnum::options(),
            'years' => range(2020, now()->year),
            'types' => fn () => BudgetType::options([
                'INCOME',
            ]),
            'payments' => fn () => Payment::query()
                ->select(['id', 'name'])
                ->where('user_id', Auth::user()->id)
                ->get()
                ->map(fn ($item) => [
                    'value' => $item->id,
                    'label' => $item->name,
                ]),
            'budgets' => fn () => request()->type ? Budget::query()
                ->select(['id', 'user_id', 'detail',  'year', 'month', 'type'])
                ->where('user_id', Auth::user()->id)
                ->where('type', request()->type)
                ->get()
                ->map(fn ($item) => [
                    'value' => $item->id,
                    'label' => $item->detail,
                    'month' => $item->month,
                    'year' => $item->year,
                ]) : collect([]),
            'state' => fn () => [
                'type' => request()->type ?? $expense->type,
            ],
        ]);
    }

    public function update(Expense $expense, ExpenseRequest $request): RedirectResponse
    {
        try {
            $expense->update([
                'budget_id' => $request->budget_id,
                'payment_id' => $request->payment_id,
                'date' => $request->date,
                'description' => $request->description,
                'nominal' => $request->nominal,
                'type' => $request->type,
                'notes' => $request->notes,
                'month' => $request->month,
                'year' => $request->year,
            ]);

            flashMessage(MessageType::UPDATED->message('Pengeluaran.'));

            return to_route('expenses.index');
        } catch (Throwable $e) {
            flashMessage(MessageType::ERROR->message(error: $e->getMessage()), 'error');

            return to_route('expenses.index');
        }
    }

    public function destroy(Expense $expense): RedirectResponse
    {
        try {
            if ($expense->user_id !== Auth::id()) {
                return back()->with('error', 'Anda tidak diizinkan menghapus data ini');
            }

            $expense->delete();
            flashMessage(MessageType::DELETED->message('Pengeluaran.'));

            return to_route('expenses.index', [], 303);
        } catch (Throwable $e) {
            flashMessage(MessageType::ERROR->message(error: $e->getMessage()), 'error');

            return to_route('expenses.index', [], 303);
        }
    }
}
