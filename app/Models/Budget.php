<?php

namespace App\Models;

use App\Enums\BudgetType;
use App\Enums\MonthEnum;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @OA\Schema(
 *     schema="Budget",
 *     title="Budget",
 *     description="Budget Model",
 *     @OA\Property(property="id", type="string", format="uuid"),
 *     @OA\Property(property="user_id", type="integer"),
 *     @OA\Property(property="detail", type="string", description="Budget Detail"),
 *     @OA\Property(property="nominal", type="number", description="Budget Amount"),
 *     @OA\Property(property="month", type="string", description="Month"),
 *     @OA\Property(property="year", type="integer", description="Year"),
 *     @OA\Property(property="type", type="string", description="Budget Type"),
 *     @OA\Property(property="created_at", type="string", format="date-time"),
 *     @OA\Property(property="updated_at", type="string", format="date-time")
 * )
 */
class Budget extends Model
{
    use HasUuids;

    protected $fillable = [
        'user_id',
        'detail',
        'nominal',
        'month',
        'year',
        'type',
    ];

    public function casts(): array
    {
        return [
            'month' => MonthEnum::class,
            'type' => BudgetType::class,
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function scopeFilter(Builder $query, array $filters): void
    {
        $query->when($filters['search'] ?? null, function ($query, $search) {
            $query->whereAny([
                'detail', 'month',
            ], 'REGEXP', $search);
        })->when($filters['month'] ?? null, function ($query, $month) {
            $query->where('month', $month);
        })->when($filters['year'] ?? null, function ($query, $year) {
            $query->where('year', $year);
        })->when($filters['type'] ?? null, function ($query, $type) {
            match ($type) {
                'Penghasilan' => $query->where('type', BudgetType::INCOME->value),
                'Tabungan dan Investasi' => $query->where('type', BudgetType::SAVING->value),
                'Belanja' => $query->where('type', BudgetType::SHOPPING->value),
                'Pengeluaran' => $query->where('type', BudgetType::EXPENSE->value),
                'Cicilan Hutang' => $query->where('type', BudgetType::DEBT->value),
                'Tagihan' => $query->where('type', BudgetType::BILL->value),
            };
        });
    }

    public function scopeSorting(Builder $query, array $sorts): void
    {
        $query->when($sorts['field'] ?? null && $sorts['direction'] ?? null, function ($query) use ($sorts) {
            $query->orderBy($sorts['field'], $sorts['direction']);
        });
    }
}
