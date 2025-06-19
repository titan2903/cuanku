<?php

namespace App\Models;

use App\Enums\AssetType;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Asset extends Model
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
            'type' => AssetType::class,
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

    public function netWorthAssets(): HasMany
    {
        return $this->hasMany(NetWorthAsset::class);
    }

    public function scopeFilter(Builder $query, array $filters): void
    {
        $query->when($filters['search'] ?? null, function ($query, $search) {
            $query->whereAny(['detail', 'goal'], 'REGEXP', $search);
        })->when($filters['type'] ?? null, function ($query, $type) {
            match ($type) {
                'Kas' => $query->where('type', AssetType::CASH->value),
                'Personal' => $query->where('type', AssetType::PERSONAL->value),
                'Investasi Jangka Pendek' => $query->where('type', AssetType::SHORTTERM->value),
                'Investasi Jangka Menengah' => $query->where('type', AssetType::MIDTERM->value),
                'Investasi Jangka Panjang' => $query->where('type', AssetType::LONGTERM->value),
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
