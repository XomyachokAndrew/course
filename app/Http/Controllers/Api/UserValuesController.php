<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\FishResources;
use App\Http\Resources\RequestResources;
use App\Models\Fish;
use App\Models\Requests;
use Illuminate\Http\Request;

class UserValuesController extends Controller
{
    public function index($id)
    {
        return FishResources::collection(Fish::where('user_id', '=', $id)->get());
    }

    public function requests($id) 
    {
        return RequestResources::collection(Requests::where('user_id', '=', $id)->get());   
    }
}
