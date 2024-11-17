<?php

namespace App\Http\Controllers;

use App\Http\Requests\FishStoreRequest;
use App\Http\Resources\FishResoures;
use App\Models\Fish;

class FishController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return FishResoures::collection(Fish::all());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(FishStoreRequest $request)
    {
        $fish = Fish::create($request->validated());

        return new FishResoures($fish);
    }

    /**
     * Display the specified resource.
     */
    public function show(Fish $fish)
    {
        return new FishResoures($fish);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(FishStoreRequest $request, Fish $fish)
    {
        $fish->update($request->validated());

        return new FishResoures($fish);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Fish $fish)
    {
        $fish->delete();

        return response(null, 204);
    }
}
