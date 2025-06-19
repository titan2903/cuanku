<?php

namespace App\Http\Requests;

use App\Enums\BudgetType;
use App\Enums\MonthEnum;
use Illuminate\Foundation\Http\FormRequest;
use \Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rules\Enum;

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
            'date'=> 'Tanggal',
            'description'=> 'Deskripsi',
            'nominal'=> 'Nominal',
            'type'=> 'Tipe',
            'notes'=> 'Catatan',
            'month'=> 'Bulan',
            'year'=> 'Tahun',
            'budget_id' => 'Detail Anggaran',
            'payment_id' => 'Metode Pembayaran',
        ];
    }
}
