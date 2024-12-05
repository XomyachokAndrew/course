<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class FishStoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            "fish_name_id" => 'required|integer',
            "user_id" => 'required|integer',
            "weight" => 'required|numeric',
            "cost_per_kg" => 'required|numeric',
            'images' => 'required|array',
            'images.*' => 'image|mimes:jpeg,png,jpg,gif|max:2048',
        ];
    }
}
