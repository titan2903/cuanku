<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @OA\Schema(
 *     schema="BudgetResource",
 *     title="Budget Resource",
 *     description="Budget resource representation",
 *     @OA\Property(property="id", type="string", format="uuid"),
 *     @OA\Property(property="detail", type="string"),
 *     @OA\Property(property="nominal", type="number"),
 *     @OA\Property(property="month", type="string"),
 *     @OA\Property(property="year", type="integer"),
 *     @OA\Property(property="type", type="string"),
 *     @OA\Property(property="created_at", type="string", format="date-time")
 * )
 */
class BudgetResource extends JsonResource
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
            'detail' => $this->detail,
            'nominal' => $this->nominal,
            'month' => $this->month,
            'year' => $this->year,
            'type' => $this->type,
            'created_at' => $this->created_at,
        ];
    }
}
