<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Crypt;

/**
 * @OA\Schema(
 *     schema="PaymentResource",
 *     title="Payment Resource",
 *     description="Payment resource representation",
 *     @OA\Property(property="id", type="string", format="uuid"),
 *     @OA\Property(property="name", type="string"),
 *     @OA\Property(property="type", type="string"),
 *     @OA\Property(property="account_number", type="string"),
 *     @OA\Property(property="account_owner", type="string"),
 *     @OA\Property(property="created_at", type="string", format="date-time")
 * )
 */
class PaymentResource extends JsonResource
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
            'type' => $this->type,
            'account_number' => $this->account_number ? '**** ****'.substr(Crypt::decrypt($this->account_number), -4) : null,
            'account_owner' => $this->account_owner,
            'created_at' => $this->created_at,
        ];
    }
}
