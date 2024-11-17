<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\FishStoreRequest;
use App\Http\Resources\FishResources;
use App\Models\Fish;


class FishController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return FishResources::collection(Fish::all());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(FishStoreRequest $request)
    {
        $fish = Fish::create($request->validated());

        return new FishResources($fish);
    }

    /**
     * Display the specified resource.
     */
    public function show(Fish $fish)
    {
        return new FishResources($fish);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(FishStoreRequest $request, Fish $fish)
    {
        $fish->update($request->validated());

        return new FishResources($fish);
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
