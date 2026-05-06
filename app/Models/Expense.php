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
 *     schema="Expense",
 *     title="Expense",
 *     description="Expense Model",
 *     @OA\Property(property="id", type="string", format="uuid"),
 *     @OA\Property(property="user_id", type="integer"),
 *     @OA\Property(property="budget_id", type="string", format="uuid"),
 *     @OA\Property(property="payment_id", type="string", format="uuid"),
 *     @OA\Property(property="date", type="string", format="date"),
 *     @OA\Property(property="description", type="string"),
 *     @OA\Property(property="nominal", type="number"),
 *     @OA\Property(property="type", type="string"),
 *     @OA\Property(property="notes", type="string"),
 *     @OA\Property(property="month", type="string"),
 *     @OA\Property(property="year", type="integer"),
 *     @OA\Property(property="created_at", type="string", format="date-time"),
 *     @OA\Property(property="updated_at", type="string", format="date-time")
 * )
 */
class Expense extends Model
{
    use HasUuids;

    protected $fillable = [
        'user_id',
        'budget_id',
        'payment_id',
        'date',
        'description',
        'nominal',
        'type',
        'notes',
        'month',
        'year',
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

    public function typeDetail(): BelongsTo
    {
        return $this->belongsTo(Budget::class, foreignKey: 'budget_id', ownerKey: 'id');
    }

    public function scopeFilter(Builder $query, array $filters): void
    {
        $query->when($filters['search'] ?? null, function ($query, $search) {
            $query->where(function ($query) use ($search) {
                $query->where('description', 'REGEXP', $search)
                    ->orWhere('type', 'REGEXP', $search)
                    ->orWhere('month', 'REGEXP', $search);
            });
        })->when($filters['month'] ?? null, function ($query, $month) {
            $query->where('month', $month);
        })->when($filters['year'] ?? null, function ($query, $year) {
            $query->where('year', $year);
        });
    }

    public function scopeSorting(Builder $query, array $sorts): void
    {
        $query->when(
            ($sorts['field'] ?? null) && ($sorts['direction'] ?? null),
            function ($query) use ($sorts) {
                $query->orderBy($sorts['field'], $sorts['direction']);
            }
        );
    }
}
