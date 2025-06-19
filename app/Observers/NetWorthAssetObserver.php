<?php

namespace App\Observers;

use App\Models\NetWorthAsset;

class NetWorthAssetObserver
{
    public function created(NetWorthAsset $netWorthAsset)
    {
        $netWorth = $netWorthAsset->asset->netWorth;
        $netWorth->update([
            'current_net_worth' => $netWorth->current_net_worth + $netWorthAsset->nominal,
            'amount_left' => $netWorth->net_worth_goal - ($netWorth->current_net_worth + $netWorthAsset->nominal),
        ]);
    }
}
