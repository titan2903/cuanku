<?php

namespace App\Models;

use App\Enums\BudgetType;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Balance extends Model
{
    use HasUuids;

    protected $fillable = [
        'user_id',
        'goal_id',
        'amount',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function goal(): BelongsTo
    {
        return $this->belongsTo(Goal::class);
    }

    public function scopeFilter(Builder $query, array $filters): void
    {
        $query->when($filters['search'] ?? null,
            function ($query, $search) {
                $query->whereAny(['detail', 'month'], 'REGEXP', $search);
            }
        )->when($filters['month'] ?? null,
            function ($query, $month) {
                $query->where('month', $month);
            }
        )->when($filters['year'] ?? null,
            function ($query, $year) {
                $query->where('year', $year);
            }
        )->when($filters['type'] ?? null,
            function ($query, $type) {
                match ($type) {
                    'Penghasilan' => $query->where('type', BudgetType::INCOME->value),
                    'Tabungan dan Investasi' => $query->where('type', BudgetType::SAVING->value),
                    'Belanja' => $query->where('type', BudgetType::SHOPPING->value),
                    'Expense' => $query->where('type', BudgetType::EXPENSE->value),
                    'Cicilan Utang' => $query->where('type', BudgetType::DEBT->value),
                    'Tagihan' => $query->where('type', BudgetType::BILL->value),
                };
            }
        );
    }

    public function scopeSorting(Builder $query, array $sorting): void
    {
        $query->when(
            ($sorting['field'] ?? null) && ($sorting['direction'] ?? null),
            function ($query) use ($sorting) {
                $query->orderBy($sorting['field'], $sorting['direction']);
            }
        );
    }
}
