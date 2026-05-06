<?php

namespace App\Models;

use App\Observers\GoalObserver;
use Illuminate\Database\Eloquent\Attributes\ObservedBy;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

#[ObservedBy(GoalObserver::class)]

/**
 * @OA\Schema(
 *     schema="Goal",
 *     title="Goal",
 *     description="Goal Model",
 *     @OA\Property(property="id", type="string", format="uuid"),
 *     @OA\Property(property="user_id", type="integer"),
 *     @OA\Property(property="name", type="string"),
 *     @OA\Property(property="nominal", type="number"),
 *     @OA\Property(property="monthly_saving", type="number"),
 *     @OA\Property(property="deadline", type="string", format="date"),
 *     @OA\Property(property="beginning_balance", type="number"),
 *     @OA\Property(property="percentage", type="number", format="float"),
 *     @OA\Property(property="created_at", type="string", format="date-time"),
 *     @OA\Property(property="updated_at", type="string", format="date-time")
 * )
 */
class Goal extends Model
{
    use HasUuids;

    protected $fillable = [
        'user_id',
        'name',
        'nominal',
        'monthly_saving',
        'deadline',
        'beginning_balance',
        'percentage',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function balances(): HasMany
    {
        return $this->hasMany(Balance::class);
    }

    public function scopeFilter(Builder $query, array $filters): void
    {
        $query->when($filters['search'] ?? null, function ($query, $search) {
            $query->whereAny([
                'name',
            ], 'REGEXP', $search);
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

    public function calculateBalance(string $user_id): int
    {
        return Balance::where('user_id', $user_id)->where('user_id', $user_id)
            ->where('goal_id', $this->id)
            ->sum('amount');
    }

    public function calculatePercentage(int $beginning_balance, int $nominal, string $user_id): float
    {
        return round((($beginning_balance + $this->calculateBalance($user_id)) / $nominal) * 100, 2);
    }
}
