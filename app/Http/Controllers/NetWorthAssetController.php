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

class NetWorthAssetController extends Controller implements HasMiddleware
{
    public static function middleware(): array
    {
        return [
            new Middleware(middleware: 'auth'),
        ];
    }

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
