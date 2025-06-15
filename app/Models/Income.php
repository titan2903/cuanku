<?php

namespace App\Models;

use App\Enums\MonthEnum;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Income extends Model
{
    use HasUuids;
    protected $fillable = [
        'user_id',
        'budget_id',
        'date',
        'nominal',
        'notes',
        'month',
        'year'
    ];

    public function casts(): array
    {
        return [
            'month' => MonthEnum::class,
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function budget(): BelongsTo
    {
        return $this->belongsTo(Budget::class, foreignKey: 'budget_id', ownerKey: 'id');
    }
}
