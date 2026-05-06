<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

/**
 * @OA\Schema(
 *     schema="NetWorthRequest",
 *     title="NetWorth Request",
 *     description="NetWorth request body data",
 *     type="object",
 *     required={"net_worth_goal", "transaction_per_month"},
 *     @OA\Property(property="net_worth_goal", type="number"),
 *     @OA\Property(property="transaction_per_month", type="number")
 * )
 */
class NetWorthRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return Auth::check();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'net_worth_goal' => ['required', 'numeric', 'min:0'],
            'transaction_per_month' => ['required', 'numeric', 'min:0'],
        ];
    }

    public function attributes(): array
    {
        return [
            'net_worth_goal' => 'Tujuan Kekayaan Bersih',
            'transaction_per_month' => 'Transaksi per Bulan',
        ];
    }
}
