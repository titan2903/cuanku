<?php

namespace App\Observers;

use App\Models\Liability;

class LiabilityObserver
{
    public function deleting(Liability $liability): void
    {
        $netWorth = $liability->netWorth;
        $totalLiability = $netWorth->liabilities()->sum('nominal');
        $newNetworth =  $netWorth->current_net_worth + $totalLiability;
        $netWorth->update([
            'current_net_worth' => $newNetworth,
            'amount_left' => $netWorth->net_worth_goal - $newNetworth,
        ]);
        $liability->netWorthLiabilities()->delete();
    }
}
