<?php

use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\PhotoController;
use App\Http\Controllers\Api\RequestController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\Auth\LoginController;
use App\Http\Controllers\Api\Auth\RegisterController;
use App\Http\Controllers\Api\Auth\PersonalAccessTokenController;
use App\Http\Controllers\Api\FishController;
use App\Http\Controllers\Api\FishNameController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('login', [LoginController::class, 'store']);
Route::post('logout', [LoginController::class, 'destroy']);

Route::apiResources([
    'requests' => RequestController::class,
    'orders' => OrderController::class,
    'photos' => PhotoController::class,
    'fish_names' => FishNameController::class,
    'register' => RegisterController::class,
    // 'tokens' => PersonalAccessTokenController::class,
    'fishes' => FishController::class,
    'requests/{id}' => RequestController::class,
    'photos/{id}' => PhotoController::class,
    'fishes/{id}' => FishController::class,
]);
