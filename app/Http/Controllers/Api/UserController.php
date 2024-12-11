<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResources;
use App\Models\User;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return UserResources::collection(User::all());
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        return new UserResources(User::findOrFail($id));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        User::find($id)->delete();
        return response(null, 204);
    }
}
