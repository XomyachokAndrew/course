<?php

namespace App\Http\Middleware;

use Closure;
use Tymon\JWTAuth\Facades\JWTAuth;

class CheckRole
{
    public function handle($request, Closure $next, ...$roles)
    {
        try {
            $user = JWTAuth::parseToken()->authenticate();
        } catch (\Exception $e) {
            return response()->json(['error' => 'Token is invalid or expired'], 401);
        }

        if (!$user || !in_array($user->role, $roles)) {
            return response()->json(['error' => 'Unauthorized', 'roles' => $roles], 403);
        }

        return $next($request);
    }
}