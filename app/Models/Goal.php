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
        $query->when($filters['search'] ?? null, function($query, $search) {
            $query->where('name','REGXP', $search);
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
