<?php

namespace App\Http\Requests;

use App\Enums\LiabilityType;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rules\Enum;

class LiabilityRequest extends FormRequest
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
            'detail' => ['required', 'string', 'max:255', 'min:3'],
            'goal' => ['required', 'string', 'max:255', 'min:3'],
            'type' => ['required', new Enum(LiabilityType::class)],
        ];
    }

    public function attributes(): array
    {
        return [
            'detail' => 'Detail',
            'goal' => 'Tujuan',
            'type' => 'Tipe',
        ];
    }
}
