<?php

namespace App\Observers;

use App\Models\NetWorthLiability;

class NetWorthLiabilityObserver
{
    public function created(NetWorthLiability $netWorthLiability)
    {
        $netWorth = $netWorthLiability->liability->netWorth;
        $netWorth->update([
            'current_net_worth' => $netWorth->current_net_worth - $netWorthLiability->nominal,
            'amount_left' => $netWorth->net_worth_goal - ($netWorth->current_net_worth - $netWorthLiability->nominal),
        ]);
    }
}
