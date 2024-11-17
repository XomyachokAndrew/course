<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\UserRequest;
use App\Http\Resources\UserResources;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class LoginController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $credentials = $request->only('number', 'password');
        \Log::info('Данные найден: ', $credentials);


        if (Auth::attempt($credentials)) {
            $user = Auth::user();
            $token = $user->createToken('CourseProject')->plainTextToken;

            return response()->json([
                'token' => $token,
                'user' => new UserResources($user),
            ], 200);
        }

        return response()->json(['message' => 'Неверные учетные данные.'], 401);
    }
}
