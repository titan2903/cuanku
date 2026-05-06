<?php

namespace App\Http\Controllers;

use App\Enums\AssetType;
use App\Enums\MessageType;
use App\Http\Requests\AssetRequest;
use App\Http\Resources\AssetResource;
use App\Models\Asset;
use App\Models\NetWorth;
use Illuminate\Http\RedirectResponse;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\Auth;
use Inertia\Response;
use Throwable;

use function App\Helpers\flashMessage;

/**
 * @OA\Tag(
 *     name="Assets",
 *     description="API Endpoints for Assets"
 * )
 */
class AssetController extends Controller implements HasMiddleware
{
    public static function middleware(): array
    {
        return [
            new Middleware(middleware: 'auth'),
            new Middleware('can:viewAny,netWorth', only: ['index']),
            new Middleware('can:create,netWorth', only: ['create', 'store']),
            new Middleware('can:update,netWorth', only: ['edit', 'update']),
            new Middleware('can:delete,netWorth', only: ['destroy']),
        ];
    }

    /**
     * @OA\Get(
     *     path="/net-worths/{netWorth}/assets",
     *     summary="List all assets for a specific net worth",
     *     tags={"Assets"},
     *     security={{"sanctum":{}}},
     *     @OA\Parameter(name="netWorth", in="path", required=true, @OA\Schema(type="string", format="uuid")),
     *     @OA\Parameter(name="search", in="query", @OA\Schema(type="string")),
     *     @OA\Parameter(name="type", in="query", @OA\Schema(type="string")),
     *     @OA\Response(
     *         response=200,
     *         description="Successful operation",
     *         @OA\JsonContent(
     *             type="array",
     *             @OA\Items(ref="#/components/schemas/AssetResource")
     *         )
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="Unauthorized",
     *         @OA\JsonContent(ref="#/components/schemas/Unauthorized")
     *     )
     * )
     */
    public function index(NetWorth $netWorth): Response
    {
        $assets = Asset::query()
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

        return inertia('Assets/Index', [
            'page_settings' => fn () => [
                'title' => 'Aset',
                'subtitle' => 'Menampilkan semua data aset yang tersedia pada akun Anda.',
            ],
            'assets' => fn () => AssetResource::collection($assets)->additional([
                'meta' => [
                    'has_pages' => $assets->hasPages(),
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
                ['label' => 'Aset', 'href' => route('assets.index', $netWorth)],
                ['label' => 'Tambah Aset'],
            ],
            'netWorth' => fn () => $netWorth,
        ]);
    }

    public function create(NetWorth $netWorth): Response
    {
        return inertia('Assets/Create', [
            'page_settings' => fn () => [
                'title' => 'Tambah Aset',
                'subtitle' => 'Tambahkan data aset Anda untuk memantau perkembangan finansial Anda.',
                'method' => 'POST',
                'action' => route('assets.store', $netWorth),
            ],
            'items' => fn () => [
                ['label' => 'CuanKu💲', 'href' => route('dashboard')],
                ['label' => 'Kekayaan Bersih', 'href' => route('net-worths.index')],
                ['label' => $netWorth->id, 'href' => route('net-worths.show', $netWorth)],
                ['label' => 'Aset', 'href' => route('assets.index', $netWorth)],
                ['label' => 'Tambah Aset'],
            ],
            'netWorth' => fn () => $netWorth,
            'assetTypes' => fn () => AssetType::options(),
        ]);
    }

    /**
     * @OA\Post(
     *     path="/net-worths/{netWorth}/assets",
     *     summary="Create a new asset",
     *     tags={"Assets"},
     *     security={{"sanctum":{}}},
     *     @OA\Parameter(name="netWorth", in="path", required=true, @OA\Schema(type="string", format="uuid")),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(ref="#/components/schemas/AssetRequest")
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Asset created successfully",
     *         @OA\JsonContent(ref="#/components/schemas/Success")
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
    public function store(NetWorth $netWorth, AssetRequest $request): RedirectResponse
    {
        try {
            $netWorth->assets()->create([
                'user_id' => Auth::user()->id,
                'detail' => $request->detail,
                'goal' => $request->goal,
                'type' => $request->type,
            ]);

            flashMessage(MessageType::CREATED->message('Aset.'));

            return to_route('assets.index', $netWorth);
        } catch (Throwable $e) {
            flashMessage(MessageType::ERROR->message(error: $e->getMessage()), 'error');

            return to_route('assets.index', $netWorth);
        }
    }

    public function edit(NetWorth $netWorth, Asset $asset): Response
    {
        return inertia('Assets/Edit', [
            'page_settings' => fn () => [
                'title' => 'Edit Aset',
                'subtitle' => 'Edit data aset Anda di sini.',
                'method' => 'PUT',
                'action' => route('assets.update', [$netWorth, $asset]),
            ],
            'items' => fn () => [
                ['label' => 'CuanKu💲', 'href' => route('dashboard')],
                ['label' => 'Kekayaan Bersih', 'href' => route('net-worths.index')],
                ['label' => $netWorth->id, 'href' => route('net-worths.show', $netWorth)],
                ['label' => 'Aset', 'href' => route('assets.index', $netWorth)],
                ['label' => 'Edit Aset'],
            ],
            'netWorth' => fn () => $netWorth,
            'asset' => fn () => $asset,
            'assetTypes' => fn () => AssetType::options(),
        ]);
    }

    /**
     * @OA\Put(
     *     path="/net-worths/{netWorth}/assets/{asset}",
     *     summary="Update an existing asset",
     *     tags={"Assets"},
     *     security={{"sanctum":{}}},
     *     @OA\Parameter(name="netWorth", in="path", required=true, @OA\Schema(type="string", format="uuid")),
     *     @OA\Parameter(name="asset", in="path", required=true, @OA\Schema(type="string", format="uuid")),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(ref="#/components/schemas/AssetRequest")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Asset updated successfully",
     *         @OA\JsonContent(ref="#/components/schemas/Success")
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
    public function update(NetWorth $netWorth, Asset $asset, AssetRequest $request): RedirectResponse
    {
        try {
            $asset->update([
                'detail' => $request->detail,
                'goal' => $request->goal,
                'type' => $request->type,
            ]);

            flashMessage(MessageType::UPDATED->message('Aset.'));

            return to_route('assets.index', $netWorth);
        } catch (Throwable $e) {
            flashMessage(MessageType::ERROR->message(error: $e->getMessage()), 'error');

            return to_route('assets.index', $netWorth);
        }
    }

    /**
     * @OA\Delete(
     *     path="/net-worths/{netWorth}/assets/{asset}",
     *     summary="Delete an asset",
     *     tags={"Assets"},
     *     security={{"sanctum":{}}},
     *     @OA\Parameter(name="netWorth", in="path", required=true, @OA\Schema(type="string", format="uuid")),
     *     @OA\Parameter(name="asset", in="path", required=true, @OA\Schema(type="string", format="uuid")),
     *     @OA\Response(
     *         response=200,
     *         description="Asset deleted successfully",
     *         @OA\JsonContent(ref="#/components/schemas/Success")
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
    public function destroy(NetWorth $netWorth, Asset $asset): RedirectResponse
    {
        try {
            $asset->delete();

            flashMessage(MessageType::DELETED->message('Aset.'));

            return to_route('assets.index', $netWorth, 303);
        } catch (Throwable $e) {
            flashMessage(MessageType::ERROR->message(error: $e->getMessage()), 'error');

            return to_route('assets.index', $netWorth);
        }
    }
}
