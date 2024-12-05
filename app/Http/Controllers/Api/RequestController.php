<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\RequestResources;
use App\Models\Requests;
use Illuminate\Http\Request;

class RequestController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return RequestResources::collection(Requests::all());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $req)
    {
        $requests = Requests::create($req->all());

        return new RequestResources($requests);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        return new RequestResources(Requests::findOrFail($id));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Requests $requests, Request $req)
    {
        $requests->update($req->validated());

        return new RequestResources($requests);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Requests $requests)
    {
        $requests->delete();

        return response(null, 204);
    }
}
