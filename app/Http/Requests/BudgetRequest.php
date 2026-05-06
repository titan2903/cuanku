<?php

namespace App\Http\Requests;

use App\Enums\BudgetType;
use App\Enums\MonthEnum;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rules\Enum;

/**
 * @OA\Schema(
 *     schema="BudgetRequest",
 *     title="Budget Request",
 *     description="Budget request body data",
 *     type="object",
 *     required={"detail", "nominal", "month", "year", "type"},
 *     @OA\Property(property="detail", type="string"),
 *     @OA\Property(property="nominal", type="number"),
 *     @OA\Property(property="month", type="string"),
 *     @OA\Property(property="year", type="integer"),
 *     @OA\Property(property="type", type="string")
 * )
 */
class BudgetRequest extends FormRequest
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
            'detail' => ['required', 'string', 'min:3', 'max:255'],
            'nominal' => ['required', 'numeric', 'min:0'],
            'month' => ['required', new Enum(MonthEnum::class)],
            'year' => ['required', 'numeric'],
            'type' => ['required', new Enum(BudgetType::class)],
        ];
    }

    public function attributes()
    {
        return [
            'detail' => 'Rincian Anggaran',
            'nominal' => 'Nominal',
            'month' => 'Bulan',
            'year' => 'Tahun',
            'type' => 'Tipe Anggaran',
        ];
    }
}
