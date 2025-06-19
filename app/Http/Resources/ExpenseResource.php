<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

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
