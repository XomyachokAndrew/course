<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\UserRequest;
use App\Http\Resources\UserResources;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Str;


class RegisterController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(UserRequest $request)
    {
        // Валидация входящих данных
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'place' => 'required|string|max:255',
            'number' => 'required|string|max:11|unique:users', // Убедитесь, что это поле уникально
            'password' => 'required|string|min:8',
            'password_confirmation' => 'required|string|min:8',
        ]);

        if ($validator->fails()) {
            \Log::info('Данные найден: ', [$request['name'], $request['role_id'], $request['password']]);
            return response()->json($validator->errors(), 422);
        }

        if ($request['password'] != $request['password_confirmation']) {
            return response()->json($validator->errors(), 422);
        }

        $user = User::create([
            'name' => $request->name,
            'place' => $request->place,
            'number' => $request->number,
            'password' => Hash::make($request->password),
        ]);
        // Генерация токена
        $token = Str::random(60); // Генерация случайного токена

        // Сохранение токена в кэше с привязкой к пользователю
        Cache::put('token_' . $token, $user->id, 60 * 60); // Токен действителен 1 час

        // Возврат ответа с данными пользователя и токеном
        return response()->json([
            'token' => $token,
            'user' => new UserResources($user),
            'message' => 'Пользователь успешно зарегистрирован.',
        ], 201);
    }
}
