<?php

namespace App\Models;

use App\Enums\MonthEnum;
use Illuminate\Database\Eloquent\Builder;
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
        'year',
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

    public function scopeFilter(Builder $query, array $filters): void
    {
        $query->when($filters['search'] ?? null, function ($query, $search) {
            // Bungkus dalam 'where' untuk logika OR yang benar
            $query->where(function (Builder $subQuery) use ($search) {
                // Cari di kolom 'notes' dari tabel 'incomes' itu sendiri
                $subQuery->where('notes', 'REGEXP', $search)
                         // ATAU cari di kolom 'detail' dari relasi 'budget'
                    ->orWhereHas('budget', function (Builder $budgetQuery) use ($search) {
                        $budgetQuery->where('detail', 'REGEXP', $search);
                    });
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
