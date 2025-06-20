<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class LiabilityResource extends JsonResource
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
