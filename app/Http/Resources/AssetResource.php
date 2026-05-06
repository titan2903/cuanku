<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @OA\Schema(
 *     schema="AssetResource",
 *     title="Asset Resource",
 *     description="Asset resource representation",
 *     @OA\Property(property="id", type="string", format="uuid"),
 *     @OA\Property(property="net_worth_id", type="string", format="uuid"),
 *     @OA\Property(property="detail", type="string"),
 *     @OA\Property(property="goal", type="number"),
 *     @OA\Property(property="type", type="string"),
 *     @OA\Property(property="created_at", type="string", format="date-time")
 * )
 */
class AssetResource extends JsonResource
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
            'net_worth_id' => $this->net_worth_id,
            'detail' => $this->detail,
            'goal' => $this->goal,
            'type' => $this->type,
            'created_at' => $this->created_at,
        ];
    }
}
