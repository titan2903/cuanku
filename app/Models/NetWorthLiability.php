<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

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
