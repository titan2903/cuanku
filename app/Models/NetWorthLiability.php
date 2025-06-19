<?php

namespace App\Models;

use App\Observers\NetWorthLiabilityObserver;
use Illuminate\Database\Eloquent\Attributes\ObservedBy;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[ObservedBy(NetWorthLiabilityObserver::class)]
class NetWorthLiability extends Model
{
    use HasUuids;

    protected $fillable = [
        'liability_id',
        'transaction_date',
        'nominal',
    ];

    public function liability(): BelongsTo
    {
        return $this->belongsTo(Liability::class);
    }
}
