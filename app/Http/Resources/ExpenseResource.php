<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @OA\Schema(
 *     schema="ExpenseResource",
 *     title="Expense Resource",
 *     description="Expense resource representation",
 *     @OA\Property(property="id", type="string", format="uuid"),
 *     @OA\Property(property="date", type="string", format="date"),
 *     @OA\Property(property="description", type="string"),
 *     @OA\Property(property="nominal", type="number"),
 *     @OA\Property(property="type", type="string"),
 *     @OA\Property(property="notes", type="string"),
 *     @OA\Property(property="month", type="string"),
 *     @OA\Property(property="year", type="integer"),
 *     @OA\Property(
 *         property="payment",
 *         type="object",
 *         @OA\Property(property="id", type="string", format="uuid"),
 *         @OA\Property(property="name", type="string")
 *     ),
 *     @OA\Property(
 *         property="typeDetail",
 *         type="object",
 *         @OA\Property(property="id", type="string", format="uuid"),
 *         @OA\Property(property="detail", type="string")
 *     ),
 *     @OA\Property(property="created_at", type="string", format="date-time")
 * )
 */
class ExpenseResource extends JsonResource
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
            'description' => $this->description,
            'nominal' => $this->nominal,
            'type' => $this->type,
            'notes' => $this->notes,
            'month' => $this->month,
            'year' => $this->year,
            'payment' => $this->whenLoaded('payment', [
                'id' => $this->payment->id,
                'name' => $this->payment->name,
            ]),
            'typeDetail' => $this->whenLoaded('typeDetail', [
                'id' => $this->typeDetail->id,
                'detail' => $this->typeDetail->detail,
            ]),
            'created_at' => $this->created_at,
        ];
    }
}
