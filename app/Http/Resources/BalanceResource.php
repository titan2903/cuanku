<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @OA\Schema(
 *     schema="BalanceResource",
 *     title="Balance Resource",
 *     description="Balance resource representation",
 *     @OA\Property(property="id", type="string", format="uuid"),
 *     @OA\Property(property="amount", type="number"),
 *     @OA\Property(property="created_at", type="string", format="date-time")
 * )
 */
class BalanceResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'amount' => $this->amount,
            'created_at' => $this->created_at,
        ];
    }
}
