<?php

namespace App\Models;

use App\Enums\LiabilityType;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Liability extends Model
{
    use HasUuids;
    protected $fillable = [
        'user_id',
        'net_worth_id',
        'detail',
        'goal',
        'type',
    ];

    public function casts(): array
    {
        return [
            'type' => LiabilityType::class, // Assuming you have a LiabilityType enum
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function netWorth(): BelongsTo
    {
        return $this->belongsTo(NetWorth::class);
    }

    public function netWorthLiabilities(): HasMany
    {
        return $this->hasMany(NetWorthLiability::class);
    }
}
