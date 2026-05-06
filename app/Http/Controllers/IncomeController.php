<?php

namespace App\Http\Controllers;

use App\Enums\BudgetType;
use App\Enums\MessageType;
use App\Enums\MonthEnum;
use App\Http\Requests\IncomeRequest;
use App\Http\Resources\IncomeResource;
use App\Models\Budget;
use App\Models\Income;
use Illuminate\Http\RedirectResponse;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\Auth;
use Inertia\Response;
use Throwable;

use function App\Helpers\flashMessage;

/**
 * @OA\Tag(
 *     name="Incomes",
 *     description="API Endpoints for Incomes"
 * )
 */
class IncomeController extends Controller implements HasMiddleware
{
    public static function middleware(): array
    {
        return [
            new Middleware('auth'),
            new Middleware('can:update,income', only: ['edit', 'update']),
            new Middleware('can:delete,income', only: ['destroy']),
        ];
    }

    /**
     * @OA\Get(
     *     path="/incomes",
     *     summary="List all incomes",
     *     tags={"Incomes"},
     *     security={{"sanctum":{}}},
     *     @OA\Parameter(name="search", in="query", @OA\Schema(type="string")),
     *     @OA\Parameter(name="month", in="query", @OA\Schema(type="string")),
     *     @OA\Parameter(name="year", in="query", @OA\Schema(type="string")),
     *     @OA\Response(
     *         response=200,
     *         description="Successful operation",
     *         @OA\JsonContent(
     *             @OA\Property(property="status", type="string", example="success"),
     *             @OA\Property(property="message", type="string", example="Income retrieved successfully."),
     *             @OA\Property(property="data", type="array", @OA\Items(ref="#/components/schemas/IncomeResource"))
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
            ])
            ->where('user_id', Auth::user()->id)
            ->filter(request()->only(['search', 'month', 'year']))
            ->sorting(request()->only(['field', 'direction']))
            ->with(['budget'])
            ->paginate(request()->load ?? 10);

        return inertia('Incomes/Index', [
            'page_settings' => fn () => [
                'title' => 'Pemasukan',
                'subtitle' => 'Menampilkan semua pemasukan yang tersedia pada akun anda.',
            ],
            'incomes' => fn () => IncomeResource::collection($incomes)->additional([
                'meta' => [
                    'has_pages' => $incomes->hasPages(),
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
                ['label' => 'Pemasukan'],
            ],
            'months' => fn () => MonthEnum::options(),
            'years' => range(2020, now()->year),
        ]);
    }

    public function create(): Response
    {
        return inertia('Incomes/Create', [
            'page_settings' => fn () => [
                'title' => 'Tambah Pemasukan',
                'subtitle' => 'Buat pemasukan baru di sini, Klik submit setelah selesai.',
                'method' => 'POST',
                'action' => route('incomes.store'),
            ],
            'items' => fn () => [
                ['label' => 'CuanKu💲', 'href' => route('dashboard')],
                ['label' => 'Pemasukan', 'href' => route('incomes.index')],
                ['label' => 'Tambah Pemasukan'],
            ],
            'months' => fn () => MonthEnum::options(),
            'years' => range(2020, now()->year),
            'sources' => fn () => Budget::query()
                ->select(['id', 'detail', 'year', 'month', 'type'])
                ->where([
                    ['user_id', Auth::user()->id],
                    ['year', now()->year],
                    ['type', BudgetType::INCOME->value],
                ])
                ->whereIn('month', [
                    MonthEnum::month(now()->month)->value,
                    MonthEnum::month(now()->subMonth()->month)->value,
                ])
                ->orderByDesc('year')
                ->orderByDesc('month')
                ->get()
                ->map(fn ($item) => [
                    'value' => $item->id,
                    'label' => $item->detail.' - '.$item->type->value.' ('.$item->month->value.'-'.$item->year.')',
                ]),
        ]);
    }

    /**
     * @OA\Post(
     *     path="/incomes",
     *     summary="Create a new income",
     *     tags={"Incomes"},
     *     security={{"sanctum":{}}},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(ref="#/components/schemas/IncomeRequest")
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Income created successfully",
     *         @OA\JsonContent(
     *             @OA\Property(property="status", type="string", example="success"),
     *             @OA\Property(property="message", type="string", example="Income created successfully.")
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
    public function store(IncomeRequest $request): RedirectResponse
    {
        try {
            Income::create([
                'user_id' => Auth::user()->id,
                'budget_id' => $request->budget_id,
                'date' => $request->date,
                'nominal' => $request->nominal,
                'notes' => $request->notes,
                'month' => $request->month,
                'year' => $request->year,
            ]);

            flashMessage(MessageType::CREATED->message('Pemasukan.'));

            return to_route('incomes.index');
        } catch (Throwable $e) {
            flashMessage(MessageType::ERROR->message(error: $e->getMessage()), 'error');

            return to_route('incomes.index');
        }
    }

    public function edit(Income $income): Response
    {
        return inertia('Incomes/Edit', [
            'page_settings' => fn () => [
                'title' => 'Edit Pemasukan',
                'subtitle' => 'Edit pemasukan di sini, Klik submit setelah selesai.',
                'method' => 'PUT',
                'action' => route('incomes.update', $income),
            ],
            'items' => fn () => [
                ['label' => 'CuanKu💲', 'href' => route('dashboard')],
                ['label' => 'Pemasukan', 'href' => route('incomes.index')],
                ['label' => 'Edit Pemasukan'],
            ],
            'months' => fn () => MonthEnum::options(),
            'years' => range(2020, now()->year),
            'income' => fn () => $income,
            'sources' => fn () => Budget::query()
                ->select(['id', 'detail', 'year', 'month', 'type'])
                ->where([
                    ['user_id', Auth::user()->id],
                    ['year', now()->year],
                    ['type', BudgetType::INCOME->value],
                ])
                ->whereIn('month', [
                    MonthEnum::month(now()->month)->value,
                    MonthEnum::month(now()->subMonth()->month)->value,
                ])
                ->orderByDesc('year')
                ->orderByDesc('month')
                ->get()
                ->map(fn ($item) => [
                    'value' => $item->id,
                    'label' => $item->detail.' - '.$item->type->value.'( '.$item->month->value.'-'.$item->year.' )',
                ]),
        ]);
    }

    /**
     * @OA\Put(
     *     path="/incomes/{income}",
     *     summary="Update an existing income",
     *     tags={"Incomes"},
     *     security={{"sanctum":{}}},
     *     @OA\Parameter(name="income", in="path", required=true, @OA\Schema(type="string", format="uuid")),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(ref="#/components/schemas/IncomeRequest")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Income updated successfully",
     *         @OA\JsonContent(
     *             @OA\Property(property="status", type="string", example="success"),
     *             @OA\Property(property="message", type="string", example="Income updated successfully.")
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
    public function update(Income $income, IncomeRequest $request): RedirectResponse
    {
        try {
            $income->update([
                'budget_id' => $request->budget_id,
                'date' => $request->date,
                'nominal' => $request->nominal,
                'notes' => $request->notes,
                'month' => $request->month,
                'year' => $request->year,
            ]);

            flashMessage(MessageType::UPDATED->message('Pemasukan.'));

            return to_route('incomes.index');
        } catch (Throwable $e) {
            flashMessage(MessageType::ERROR->message(error: $e->getMessage()), 'error');

            return to_route('incomes.index');
        }
    }

    /**
     * @OA\Delete(
     *     path="/incomes/{income}",
     *     summary="Delete an income",
     *     tags={"Incomes"},
     *     security={{"sanctum":{}}},
     *     @OA\Parameter(name="income", in="path", required=true, @OA\Schema(type="string", format="uuid")),
     *     @OA\Response(
     *         response=200,
     *         description="Income deleted successfully",
     *         @OA\JsonContent(
     *             @OA\Property(property="status", type="string", example="success"),
     *             @OA\Property(property="message", type="string", example="Income deleted successfully.")
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
    public function destroy(Income $income): RedirectResponse
    {
        try {
            if ($income->user_id !== Auth::id()) {
                return back()->with('error', 'Anda tidak diizinkan menghapus data ini');
            }

            $income->delete();
            flashMessage(MessageType::DELETED->message('Pemasukan.'));

            return to_route('incomes.index', [], 303);
        } catch (Throwable $e) {
            flashMessage(MessageType::ERROR->message(error: $e->getMessage()), 'error');

            return to_route('incomes.index', [], 303);
        }
    }
}
