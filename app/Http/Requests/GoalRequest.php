<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

/**
 * @OA\Schema(
 *     schema="GoalRequest",
 *     title="Goal Request",
 *     description="Goal request body data",
 *     type="object",
 *     required={"name", "nominal", "monthly_saving", "deadline"},
 *     @OA\Property(property="name", type="string"),
 *     @OA\Property(property="nominal", type="number"),
 *     @OA\Property(property="monthly_saving", type="number"),
 *     @OA\Property(property="deadline", type="string", format="date"),
 *     @OA\Property(property="beginning_balance", type="number")
 * )
 */
class GoalRequest extends FormRequest
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
            'name' => ['required', 'string', 'max:255'],
            'nominal' => ['required', 'numeric', 'min:0'],
            'monthly_saving' => ['required', 'numeric', 'min:0'],
            'deadline' => ['required', 'date'],
            'beginning_balance' => ['nullable', 'numeric', 'min:0'],
        ];
    }

    public function attributes(): array
    {
        return [
            'name' => 'Tujuan',
            'percentage' => 'Persentase',
            'nominal' => 'Nominal',
            'monthly_saving' => 'Tabungan Bulanan',
            'deadline' => 'Deadline',
            'beginning_balance' => 'Saldo Awal',
        ];
    }
}
