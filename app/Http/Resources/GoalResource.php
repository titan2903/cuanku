<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @OA\Schema(
 *     schema="GoalResource",
 *     title="Goal Resource",
 *     description="Goal resource representation",
 *     @OA\Property(property="id", type="string", format="uuid"),
 *     @OA\Property(property="name", type="string"),
 *     @OA\Property(property="percentage", type="number", format="float"),
 *     @OA\Property(property="nominal", type="number"),
 *     @OA\Property(property="monthly_saving", type="number"),
 *     @OA\Property(property="deadline", type="string", format="date"),
 *     @OA\Property(property="beginning_balance", type="number"),
 *     @OA\Property(property="created_at", type="string", format="date-time")
 * )
 */
class GoalResource extends JsonResource
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
            'name' => $this->name,
            'percentage' => $this->percentage,
            'nominal' => $this->nominal,
            'monthly_saving' => $this->monthly_saving,
            'deadline' => $this->deadline,
            'beginning_balance' => $this->beginning_balance,
            'created_at' => $this->created_at,
        ];
    }
}
