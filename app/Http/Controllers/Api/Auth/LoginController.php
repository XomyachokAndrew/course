<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResources;
use Auth;
use Illuminate\Http\Request;

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
            \Log::info('Attempting authentication for phone: ', ['phone' => substr($credentials['phone'], -4)]); // Log only the last 4 digits

            if (!$token = Auth::attempt($credentials)) {
                return response()->json(['error' => 'invalid_credentials'], 401);
            }

            $user = new UserResources(Auth::user()); // Corrected to use single user instance
            return response()->json(['token' => $token, 'user' => $user]);
        } catch (\Exception $e) {
            \Log::error('Authentication error: ' . $e->getMessage());
            return response()->json(['error' => 'internal_server_error'], 500);
        }
    }

    public function destroy()
    {
        Auth::invalidate(Auth::user());
        return response()->json(['message' => 'User logged out successfully']);
    }

}
