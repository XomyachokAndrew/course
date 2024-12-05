<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\FishStoreRequest;
use App\Http\Resources\FishResources;
use App\Http\Resources\PhotoResources;
use App\Models\Fish;
use App\Models\Photo;


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

        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                $path = $image->store('images', 'public');

                // Create a Photo record associated with the newly created Fish
                Photo::create([
                    'fish_id' => $fish->id, // Use the ID of the newly created Fish
                    'path' => $path,
                ]);
            }
        }
        // Return the created Fish along with the uploaded photos
        return response()->json([
            'fish' => new FishResources($fish),
        ], 201);
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
