<?php

namespace App\Observers;

use App\Models\Asset;

class AssetObserver
{
    public function deleted(Asset $asset)
    {
        $netWorth = $asset->netWorth;
        $totalAsset = $asset->netWorthAssets()->sum('nominal');

        $newNetWorth = $netWorth->current_net_worth - $totalAsset;

        $netWorth->update([
            'current_net_worth' => $newNetWorth,
            'amount_left' => $netWorth->net_worth_goal - $newNetWorth,
        ]);

        $asset->netWorthAssets()->delete();
    }
}
