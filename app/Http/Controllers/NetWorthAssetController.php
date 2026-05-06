<?php

namespace App\Http\Controllers;

use App\Enums\MessageType;
use App\Models\Asset;
use App\Models\NetWorth;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Throwable;

use function App\Helpers\flashMessage;

/**
 * @OA\Tag(
 *     name="Net Worth Assets",
 *     description="API Endpoints for Net Worth Assets"
 * )
 */
class NetWorthAssetController extends Controller implements HasMiddleware
{
    public static function middleware(): array
    {
        return [
            new Middleware(middleware: 'auth'),
        ];
    }

    /**
     * @OA\Post(
     *     path="/net-worths/{netWorth}/assets/{asset}",
     *     summary="Add transaction to asset",
     *     tags={"Net Worth Assets"},
     *     security={{"sanctum":{}}},
     *     @OA\Parameter(name="netWorth", in="path", required=true, @OA\Schema(type="string", format="uuid")),
     *     @OA\Parameter(name="asset", in="path", required=true, @OA\Schema(type="string", format="uuid")),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             @OA\Property(property="transaction_date", type="string", format="date"),
     *             @OA\Property(property="nominal", type="integer")
     *         )
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Transaction added successfully",
     *         @OA\JsonContent(
     *             @OA\Property(property="status", type="string", example="success"),
     *             @OA\Property(property="message", type="string", example="Transaction added successfully.")
     *         )
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="Unauthorized",
     *         @OA\JsonContent(ref="#/components/schemas/Unauthorized")
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Not Found",
     *         @OA\JsonContent(ref="#/components/schemas/NotFound")
     *     )
     * )
     */
    public function __invoke(NetWorth $netWorth, Asset $asset, Request $request): RedirectResponse
    {
        try {
            $transaction_count = $asset->netWorthAssets()
                ->whereMonth('transaction_date', date('m', strtotime($request->transaction_date)))
                ->whereYear('transaction_date', date('Y', strtotime($request->transaction_date)))
                ->count();

            if ($transaction_count >= $netWorth->transaction_per_month) {
                flashMessage('Jumlah transaksi sudah mencapai maksimal, pilih bulan yang lain.', 'error');

                return to_route('assets.index', $netWorth);
            }

            $asset->netWorthAssets()->create([
                'transaction_date' => $request->transaction_date,
                'nominal' => $request->nominal,
            ]);

            flashMessage(MessageType::CREATED->message('Aset kekayaan bersih.'));

            return to_route('net-worths.show', $netWorth);
        } catch (Throwable $e) {
            flashMessage(MessageType::ERROR->message(error: $e->getMessage()), 'error');

            return to_route('net-worths.show', $netWorth);
        }
    }
}
