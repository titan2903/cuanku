<?php

namespace App\Http\Requests;

use App\Enums\BudgetType;
use App\Enums\MonthEnum;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rules\Enum;

/**
 * @OA\Schema(
 *     schema="ExpenseRequest",
 *     title="Expense Request",
 *     description="Expense request body data",
 *     type="object",
 *     required={"budget_id", "payment_id", "date", "description", "nominal", "type", "month", "year"},
 *     @OA\Property(property="budget_id", type="string", format="uuid", example="550e8400-e29b-41d4-a716-446655440000"),
 *     @OA\Property(property="payment_id", type="string", format="uuid", example="550e8400-e29b-41d4-a716-446655440000"),
 *     @OA\Property(property="date", type="string", format="date", example="2023-10-25"),
 *     @OA\Property(property="description", type="string", example="Beli Nasi Goreng"),
 *     @OA\Property(property="nominal", type="number", example=20000),
 *     @OA\Property(property="type", type="string", example="Pengeluaran"),
 *     @OA\Property(property="notes", type="string", example="Makan malam di luar"),
 *     @OA\Property(property="month", type="string", example="Oktober"),
 *     @OA\Property(property="year", type="integer", example=2023)
 * )
 */
class ExpenseRequest extends FormRequest
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
            'budget_id' => [
                'required',
                'exists:budgets,id',
            ],
            'payment_id' => [
                'required',
                'exists:payments,id',
            ],
            'date' => [
                'required',
                'date',
            ],
            'description' => [
                'required',
                'string',
                'min:3',
                'max:255',
            ],
            'nominal' => [
                'required',
                'numeric',
                'min:0',
            ],
            'type' => [
                'required',
                new Enum(BudgetType::class),
            ],
            'notes' => [
                'nullable',
                'string',
                'max:500',
            ],
            'month' => [
                'required',
                new Enum(MonthEnum::class),
            ],
            'year' => [
                'required',
                'numeric',
            ],
        ];
    }

    public function attributes()
    {
        return [
            'date' => 'Tanggal',
            'description' => 'Deskripsi',
            'nominal' => 'Nominal',
            'type' => 'Tipe',
            'notes' => 'Catatan',
            'month' => 'Bulan',
            'year' => 'Tahun',
            'budget_id' => 'Detail Anggaran',
            'payment_id' => 'Metode Pembayaran',
        ];
    }
}
