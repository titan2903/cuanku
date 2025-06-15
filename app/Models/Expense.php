<?php

namespace App\Models;

use App\Enums\BudgetType;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use App\Enums\MonthEnum;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Expense extends Model
{
    use HasUuids;

    protected $fillable = [
        "user_id",
        "budget_id",
        "payment_id",
        "date",
        "description",
        "nominal",
        "type",
        "note",
        "month",
        "year",
    ];

    public function casts(): array
    {
        return [
            'type' => BudgetType::class,
            'month' => MonthEnum::class,
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function payment(): BelongsTo
    {
        return $this->belongsTo(Payment::class);
    }

    public function budget(): BelongsTo
    {
        return $this->belongsTo(Budget::class, foreignKey: 'budget_id', ownerKey: 'id');
    }
}
