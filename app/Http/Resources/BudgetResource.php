<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

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
