<?php

namespace App\Models;

use App\Enums\PaymentType;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Crypt;

/**
 * @OA\Schema(
 *     schema="Payment",
 *     title="Payment",
 *     description="Payment Model",
 *     @OA\Property(property="id", type="string", format="uuid"),
 *     @OA\Property(property="user_id", type="integer"),
 *     @OA\Property(property="name", type="string"),
 *     @OA\Property(property="type", type="string"),
 *     @OA\Property(property="account_number", type="string"),
 *     @OA\Property(property="account_owner", type="string"),
 *     @OA\Property(property="created_at", type="string", format="date-time"),
 *     @OA\Property(property="updated_at", type="string", format="date-time")
 * )
 */
class Payment extends Model
{
    use HasUuids;

    protected $fillable = [
        'user_id',
        'name',
        'type',
        'account_number',
        'account_owner',
    ];

    protected $hidden = [
        'account_number',
    ];

    public function casts(): array
    {
        return [
            'type' => PaymentType::class,
        ];
    }

    protected function accountNumber(): Attribute
    {
        return Attribute::make(
            set: fn (?string $value) => $value ? Crypt::encrypt($value) : null,
        );
    }

    public function scopeFilter(Builder $query, array $filters): void
    {
        $query->when($filters['search'] ?? null, function ($query, $search) {
            $query->whereAny([
                'name',
                'type',
                'account_number',
                'account_owner',
            ], 'REGEXP', $search);
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
