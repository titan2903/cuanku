<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

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
