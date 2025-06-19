<?php

namespace App\Http\Requests;

use App\Enums\AssetType;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rules\Enum;

class AssetRequest extends FormRequest
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
            'goal' => ['required', 'string', 'min:3', 'max:255'],
            'type' => ['required', 'string', new Enum(AssetType::class)],
        ];
    }

    public function attributes()
    {
        return [
            'detail' => 'Detail Aset',
            'goal' => 'Tujuan Aset',
            'type' => 'Tipe Aset',
        ];
    }
}
