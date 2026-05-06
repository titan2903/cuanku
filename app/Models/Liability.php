<?php

namespace App\Models;

use App\Enums\LiabilityType;
use App\Observers\LiabilityObserver;
use Illuminate\Database\Eloquent\Attributes\ObservedBy;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

#[ObservedBy(LiabilityObserver::class)]

/**
 * @OA\Schema(
 *     schema="Liability",
 *     title="Liability",
 *     description="Liability Model",
 *     @OA\Property(property="id", type="string", format="uuid"),
 *     @OA\Property(property="user_id", type="integer"),
 *     @OA\Property(property="net_worth_id", type="string", format="uuid"),
 *     @OA\Property(property="detail", type="string"),
 *     @OA\Property(property="goal", type="number"),
 *     @OA\Property(property="type", type="string"),
 *     @OA\Property(property="created_at", type="string", format="date-time"),
 *     @OA\Property(property="updated_at", type="string", format="date-time")
 * )
 */
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

    public function scopeFilter(Builder $query, array $filters): void
    {
        $query->when($filters['search'] ?? null, function (Builder $query, string $search) {
            $query->whereAny(
                ['detail', 'goal'],
                'REGEXP',
                $search
            );
        })->when($filters['type'] ?? null, function (Builder $query, string $type) {
            match ($type) {
                'Hutang Jangka Pendek' => $query->where('type', LiabilityType::SHORTTERMDEBT->value),
                'Hutang Jangka Menengah' => $query->where('type', LiabilityType::MIDTERMDEBT->value),
                'Hutang Jangka Panjang' => $query->where('type', LiabilityType::LONGTERMDEBT->value),
            };
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
