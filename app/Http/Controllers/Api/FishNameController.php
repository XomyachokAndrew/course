<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\FishName;
use App\Http\Resources\FishNameResources;

class FishNameController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return FishNameResources::collection(FishName::all());
    }
}
