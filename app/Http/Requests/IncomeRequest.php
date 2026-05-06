<?php

namespace App\Http\Requests;

use App\Enums\MonthEnum;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rules\Enum;

/**
 * @OA\Schema(
 *     schema="IncomeRequest",
 *     title="Income Request",
 *     description="Income request body data",
 *     type="object",
 *     required={"budget_id", "date", "nominal", "month", "year"},
 *     @OA\Property(property="budget_id", type="string", format="uuid"),
 *     @OA\Property(property="date", type="string", format="date"),
 *     @OA\Property(property="nominal", type="number"),
 *     @OA\Property(property="notes", type="string"),
 *     @OA\Property(property="month", type="string"),
 *     @OA\Property(property="year", type="integer")
 * )
 */
class IncomeRequest extends FormRequest
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
            'budget_id' => ['required', 'exists:budgets,id'],
            'date' => ['required', 'date'],
            'nominal' => ['required', 'numeric', 'min:0'],
            'notes' => ['nullable', 'string', 'max:255'],
            'month' => ['required', new Enum(MonthEnum::class)],
            'year' => ['required', 'numeric'],
        ];
    }

    public function attributes(): array
    {
        return [
            'budget_id' => 'Sumber',
            'date' => 'Tanggal',
            'nominal' => 'Nominal',
            'notes' => 'Catatan',
            'month' => 'Bulan',
            'year' => 'Tahun',
        ];
    }
}
