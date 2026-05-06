<?php

namespace App\Http\Controllers;

use App\Enums\MessageType;
use App\Models\Liability;
use App\Models\NetWorth;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Throwable;

use function App\Helpers\flashMessage;

/**
 * @OA\Tag(
 *     name="Net Worth Liabilities",
 *     description="API Endpoints for Net Worth Liabilities"
 * )
 */
class NetWorthLiabilityController extends Controller implements HasMiddleware
{
    public static function middleware(): array
    {
        return [
            new Middleware(middleware: 'auth'),
        ];
    }

    /**
     * @OA\Post(
     *     path="/net-worths/{netWorth}/liabilities/{liability}",
     *     summary="Add transaction to liability",
     *     tags={"Net Worth Liabilities"},
     *     security={{"sanctum":{}}},
     *     @OA\Parameter(name="netWorth", in="path", required=true, @OA\Schema(type="string", format="uuid")),
     *     @OA\Parameter(name="liability", in="path", required=true, @OA\Schema(type="string", format="uuid")),
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
    public function __invoke(NetWorth $netWorth, Liability $liability, Request $request): RedirectResponse
    {
        try {
            $transaction_count = $liability->netWorthLiabilities()
                ->whereMonth('transaction_date', date('m', strtotime($request->transaction_date)))
                ->whereYear('transaction_date', date('Y', strtotime($request->transaction_date)))
                ->count();

            if ($transaction_count >= $netWorth->transaction_per_month) {
                flashMessage('Jumlah transaksi sudah mencapai maksimal, pilih bulan yang lain.', 'error');

                return to_route('liabilities.index', $netWorth);
            }

            $liability->netWorthLiabilities()->create([
                'transaction_date' => $request->transaction_date,
                'nominal' => $request->nominal,
            ]);

            flashMessage(MessageType::CREATED->message('Kewajiban Kekayaan Bersih.'));

            return to_route('net-worths.show', $netWorth);
        } catch (Throwable $e) {
            flashMessage(MessageType::ERROR->message(error: $e->getMessage()), 'error');

            return to_route('net-worths.show', $netWorth);
        }
    }
}
