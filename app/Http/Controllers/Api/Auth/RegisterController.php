<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\UserRequest;
use App\Http\Resources\UserResources;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;

class RegisterController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(UserRequest $request)
    {
        \Log::info('error', ['12' => $request->all()]);
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'place' => 'required|string|max:255',
            'phone' => 'required|string|min:11|max:12|unique:users',
            'password' => 'required|string|min:8|confirmed',
            'photo' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);
    
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        // Сохранение изображения, если оно было загружено
        $photoPath = null;
        if ($request->hasFile('photo')) {
            $photoPath = $request->file('photo')->store('photos', 'public'); // Сохранение в папку 'photos' в публичном хранилище
            $photoPath = 'http://localhost:8000'.Storage::url($photoPath);
        }

        $user = User::create([
            'role_id' => 1,
            'name' => $request->name,
            'photo' => $photoPath, // Сохранение пути к изображению в базе данных
            'place' => $request->place,
            'phone' => $request->phone,
            'password' => Hash::make($request->password),
        ]);

        return response()->json([
            'user' => new UserResources($user),
            'message' => 'Пользователь успешно зарегистрирован.',
        ], 201);
    }
}
