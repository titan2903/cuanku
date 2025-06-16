<?php

namespace App\Models;

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
        $query->when($filters['search'] ?? null, function($query, $search) {
            $query->where('name', 'REGEXP', $search);
        });
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
