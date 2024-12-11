<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\FishResources;
use App\Http\Resources\OrderResources;
use App\Http\Resources\RequestResources;
use App\Models\Fish;
use App\Models\Order;
use App\Models\Requests;

class UserValuesController extends Controller
{
    public function fishes($id)
    {
        return FishResources::collection(Fish::where('user_id', '=', $id)->get());
    }

    public function fishesDestroy($id)
    {
        Fish::where('user_id', '=', $id)->delete();
        return response(null, 204);
    }

    public function requests($id) 
    {
        return RequestResources::collection(Requests::where('user_id', '=', $id)->get());   
    }
    
    public function orders($id) 
    {
        return OrderResources::collection(Order::where('user_id', '=', $id)->get());   
    }

    public function ordersDestroy($id)
    {
        Order::where('user_id', '=', $id)->delete();
        return response(null, 204);
    }

}
