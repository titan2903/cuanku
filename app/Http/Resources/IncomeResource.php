<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @OA\Schema(
 *     schema="IncomeResource",
 *     title="Income Resource",
 *     description="Income resource representation",
 *     @OA\Property(property="id", type="string", format="uuid"),
 *     @OA\Property(property="date", type="string", format="date"),
 *     @OA\Property(property="nominal", type="number"),
 *     @OA\Property(property="notes", type="string"),
 *     @OA\Property(property="month", type="string"),
 *     @OA\Property(property="year", type="integer"),
 *     @OA\Property(property="created_at", type="string", format="date-time"),
 *     @OA\Property(
 *         property="budget",
 *         type="object",
 *         @OA\Property(property="id", type="string", format="uuid"),
 *         @OA\Property(property="detail", type="string"),
 *         @OA\Property(property="type", type="string")
 *     )
 * )
 */
class IncomeResource extends JsonResource
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
            'date' => $this->date,
            'nominal' => $this->nominal,
            'notes' => $this->notes,
            'month' => $this->month,
            'year' => $this->year,
            'created_at' => $this->created_at,
            'budget' => $this->whenLoaded('budget', [
                'id' => $this->budget->id,
                'detail' => $this->budget->detail,
                'type' => $this->budget->type,
            ]),
        ];
    }
}
