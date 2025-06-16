<?php

namespace App\Observers;

use App\Models\Goal;
use Illuminate\Support\Facades\Auth;
class GoalObserver
{
    public function created(Goal $goal)
    {
        $goal->update([
            "percentage" => $goal->calculatePercentage(
                $goal->beginning_balance,
                $goal->nominal,
                Auth::user()->id
            )
            ]);
    }
}
