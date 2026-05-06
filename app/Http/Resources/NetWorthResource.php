<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @OA\Schema(
 *     schema="NetWorthResource",
 *     title="NetWorth Resource",
 *     description="NetWorth resource representation",
 *     @OA\Property(property="id", type="string", format="uuid"),
 *     @OA\Property(property="net_worth_goal", type="number"),
 *     @OA\Property(property="current_net_worth", type="number"),
 *     @OA\Property(property="amount_left", type="number"),
 *     @OA\Property(property="transaction_per_month", type="number"),
 *     @OA\Property(property="year", type="integer"),
 *     @OA\Property(property="created_at", type="string", format="date-time")
 * )
 */
class NetWorthResource extends JsonResource
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
            'net_worth_goal' => $this->net_worth_goal,
            'current_net_worth' => $this->current_net_worth,
            'amount_left' => $this->amount_left,
            'transaction_per_month' => $this->transaction_per_month,
            'year' => $this->year,
            'created_at' => $this->created_at,
        ];
    }
}
