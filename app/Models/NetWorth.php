<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class NetWorth extends Model
{
    use HasUuids;

    protected $fillable = [
        "user_id",
        "net_worth_goal",
        "current_net_worth",
        "amount_left",
        "transaction_per_month",
        "year"
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function assets(): HasMany
    {
        return $this->hasMany(Asset::class);
    }
    
    public function liabilities(): HasMany
    {
        return $this->hasMany(Liability::class);
    }
}
