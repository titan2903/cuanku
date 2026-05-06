<?php

namespace App\Http\Controllers;

use App\Enums\LiabilityType;
use App\Enums\MessageType;
use App\Http\Requests\LiabilityRequest;
use App\Http\Resources\LiabilityResource;
use App\Models\Liability;
use App\Models\NetWorth;
use Illuminate\Http\RedirectResponse;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\Auth;
use Inertia\Response;
use Throwable;

use function App\Helpers\flashMessage;

class LiabilityController extends Controller implements HasMiddleware
{
    public static function middleware(): array
    {
        return [
            new Middleware('auth'),
            new Middleware('can:view,netWorth', only: ['index']),
            new Middleware('can:create,netWorth', only: ['create', 'store']),
            new Middleware('can:update,netWorth', only: ['edit', 'update']),
            new Middleware('can:delete,netWorth', only: ['destroy']),
        ];
    }

    /**
     * @OA\Get(
     *     path="/net-worths/{netWorth}/liabilities",
     *     summary="List all liabilities for a specific net worth",
     *     tags={"Liabilities"},
     *     security={{"sanctum":{}}},
     *     @OA\Parameter(name="netWorth", in="path", required=true, @OA\Schema(type="string", format="uuid")),
     *     @OA\Parameter(name="search", in="query", @OA\Schema(type="string")),
     *     @OA\Parameter(name="type", in="query", @OA\Schema(type="string")),
     *     @OA\Response(
     *         response=200,
     *         description="Successful operation",
     *         @OA\JsonContent(
     *             @OA\Property(property="status", type="string", example="success"),
     *             @OA\Property(property="message", type="string", example="Liability retrieved successfully."),
     *             @OA\Property(property="data", type="array", @OA\Items(ref="#/components/schemas/LiabilityResource"))
     *         )
     *     ),
     *     @OA\Response(response=401, ref="#/components/schemas/Unauthorized")
     * )
     */
    public function index(NetWorth $netWorth): Response
    {
        $liabilities = Liability::query()
            ->select([
                'id',
                'net_worth_id',
                'user_id',
                'detail',
                'goal',
                'type',
                'created_at',
            ])
            ->where('net_worth_id', $netWorth->id)
            ->where('user_id', Auth::user()->id)
            ->filter(request()->only(['search', 'type']))
            ->sorting(request()->only(['field', 'direction']))
            ->paginate(request()->load ?? 10);

        return inertia('Liabilities/Index', [
            'page_settings' => fn () => [
                'title' => 'Kewajiban',
                'subtitle' => 'Menampilkan semua data kewajiban yang tersedia pada akun Anda.',
            ],
            'liabilities' => fn () => LiabilityResource::collection($liabilities)->additional([
                'meta' => [
                    'has_pages' => $liabilities->hasPages(),
                ],
            ]),
            'state' => fn () => [
                'page' => request()->page ?? 1,
                'search' => request()->search ?? '',
                'type' => request()->type ?? '',
                'load' => request()->load ?? 10,
            ],
            'items' => fn () => [
                ['label' => 'CuanKu💲', 'href' => route('dashboard')],
                ['label' => 'Kekayaan Bersih', 'href' => route('net-worths.index')],
                ['label' => $netWorth->id, 'href' => route('net-worths.show', $netWorth)],
                ['label' => 'Kewajiban', 'href' => route('liabilities.index', $netWorth)],
                ['label' => 'Kewajiban'],
            ],
            'netWorth' => fn () => $netWorth,
        ]);
    }

    public function create(NetWorth $netWorth): Response
    {
        return inertia('Liabilities/Create', [
            'page_settings' => fn () => [
                'title' => 'Tambah Kewajiban',
                'subtitle' => 'Tambahkan data kewajiban Anda untuk memantau perkembangan finansial Anda.',
                'method' => 'POST',
                'action' => route('liabilities.store', $netWorth),
            ],
            'items' => fn () => [
                ['label' => 'CuanKu💲', 'href' => route('dashboard')],
                ['label' => 'Kekayaan Bersih', 'href' => route('net-worths.index')],
                ['label' => $netWorth->id, 'href' => route('net-worths.show', $netWorth)],
                ['label' => 'Kewajiban', 'href' => route('liabilities.index', $netWorth)],
                ['label' => 'Tambah Kewajiban'],
            ],
            'netWorth' => fn () => $netWorth,
            'liabilityTypes' => fn () => LiabilityType::options(),
        ]);
    }

    /**
     * @OA\Post(
     *     path="/net-worths/{netWorth}/liabilities",
     *     summary="Create a new liability",
     *     tags={"Liabilities"},
     *     security={{"sanctum":{}}},
     *     @OA\Parameter(name="netWorth", in="path", required=true, @OA\Schema(type="string", format="uuid")),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(ref="#/components/schemas/LiabilityRequest")
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Liability created successfully",
     *         @OA\JsonContent(
     *             @OA\Property(property="status", type="string", example="success"),
     *             @OA\Property(property="message", type="string", example="Liability created successfully.")
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
    public function store(NetWorth $netWorth, LiabilityRequest $request): RedirectResponse
    {
        try {
            $netWorth->liabilities()->create([
                'user_id' => Auth::user()->id,
                'detail' => $request->detail,
                'goal' => $request->goal,
                'type' => $request->type,
            ]);

            flashMessage(MessageType::CREATED->message('Kewajiban.'));

            return to_route('liabilities.index', $netWorth);
        } catch (Throwable $e) {
            flashMessage(MessageType::ERROR->message(error: $e->getMessage()), 'error');

            return to_route('liabilities.index', $netWorth);
        }
    }

    public function edit(NetWorth $netWorth, Liability $liability): Response
    {
        return inertia('Liabilities/Edit', [
            'page_settings' => fn () => [
                'title' => 'Edit Kewajiban',
                'subtitle' => 'Edit data kewajiban Anda di sini.',
                'method' => 'PUT',
                'action' => route('liabilities.update', [$netWorth, $liability]),
            ],
            'items' => fn () => [
                ['label' => 'CuanKu💲', 'href' => route('dashboard')],
                ['label' => 'Kekayaan Bersih', 'href' => route('net-worths.index')],
                ['label' => $netWorth->id, 'href' => route('net-worths.show', $netWorth)],
                ['label' => 'Kewajiban', 'href' => route('liabilities.index', $netWorth)],
                ['label' => 'Edit Kewajiban'],
            ],
            'netWorth' => fn () => $netWorth,
            'liabilityTypes' => fn () => LiabilityType::options(),
            'liability' => fn () => $liability,
        ]);
    }

    /**
     * @OA\Put(
     *     path="/net-worths/{netWorth}/liabilities/{liability}",
     *     summary="Update an existing liability",
     *     tags={"Liabilities"},
     *     security={{"sanctum":{}}},
     *     @OA\Parameter(name="netWorth", in="path", required=true, @OA\Schema(type="string", format="uuid")),
     *     @OA\Parameter(name="liability", in="path", required=true, @OA\Schema(type="string", format="uuid")),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(ref="#/components/schemas/LiabilityRequest")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Liability updated successfully",
     *         @OA\JsonContent(
     *             @OA\Property(property="status", type="string", example="success"),
     *             @OA\Property(property="message", type="string", example="Liability updated successfully.")
     *         )
     *     ),
     *     *     @OA\Response(
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
    public function update(NetWorth $netWorth, Liability $liability, LiabilityRequest $request): RedirectResponse
    {
        try {
            $liability->update([
                'detail' => $request->detail,
                'goal' => $request->goal,
                'type' => $request->type,
            ]);

            flashMessage(MessageType::UPDATED->message('Kewajiban.'));

            return to_route('liabilities.index', $netWorth);
        } catch (Throwable $e) {
            flashMessage(MessageType::ERROR->message(error: $e->getMessage()), 'error');

            return to_route('liabilities.index', $netWorth);
        }
    }

    /**
     * @OA\Delete(
     *     path="/net-worths/{netWorth}/liabilities/{liability}",
     *     summary="Delete a liability",
     *     tags={"Liabilities"},
     *     security={{"sanctum":{}}},
     *     @OA\Parameter(name="netWorth", in="path", required=true, @OA\Schema(type="string", format="uuid")),
     *     @OA\Parameter(name="liability", in="path", required=true, @OA\Schema(type="string", format="uuid")),
     *     @OA\Response(
     *         response=200,
     *         description="Liability deleted successfully",
     *         @OA\JsonContent(
     *             @OA\Property(property="status", type="string", example="success"),
     *             @OA\Property(property="message", type="string", example="Liability deleted successfully.")
     *         )
     *     ),
     *     *     @OA\Response(
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
    public function destroy(NetWorth $netWorth, Liability $liability): RedirectResponse
    {
        try {
            $liability->delete();

            flashMessage(MessageType::DELETED->message('Kewajiban.'));

            return to_route('liabilities.index', $netWorth, 303);
        } catch (Throwable $e) {
            flashMessage(MessageType::ERROR->message(error: $e->getMessage()), 'error');

            return to_route('liabilities.index', $netWorth);
        }
    }
}
