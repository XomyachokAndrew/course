<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Http\Resources\PersonalAccessTokenResources;
use App\Models\PersonalAccessToken;
use Illuminate\Http\Request;

class PersonalAccessTokenController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return PersonalAccessTokenResources::collection(PersonalAccessToken::all());
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        return new PersonalAccessTokenResources(PersonalAccessToken::findOrFail($id));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'Вы вышли из системы.']);
    }
}
