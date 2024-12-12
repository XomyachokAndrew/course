<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;

class LoginController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $request->validate([
                'phone' => 'required|string',
                'password' => 'required|string',
            ]);

            $credentials = $request->only('phone', 'password');
            \Log::info('Попытка аутентификации для телефона: ', ['phone' => $credentials['phone']]);

            if (!$token = JWTAuth::attempt($credentials)) {
                return response()->json(['error' => 'invalid_credentials'], 401);
            }

            $user = JWTAuth::user();
            return response()->json(compact('token', 'user'));
        } catch (\Exception $e) {
            \Log::error('Ошибка при аутентификации: ' . $e->getMessage());
            return response()->json(['error' => 'internal_server_error'], 500);
        }
    }

    public function destroy()
    {
        JWTAuth::invalidate(JWTAuth::getToken());
        return response()->json(['message' => 'User logged out successfully']);
    }

    public function refresh(Request $request)
    {
        try {
            $token = $request->bearerToken();

            $newToken = JWTAuth::refresh($token);
            return response()->json(['token' => $newToken]);
        } catch (\Exception $e) {
            \Log::error('Ошибка при обновлении токена: ' . $e->getMessage());
            return response()->json(['error' => 'internal_server_error'], 500);
        }
    }
}
