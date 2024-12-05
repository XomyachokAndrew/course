<?php

use App\Http\Controllers\Api\UserValuesController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\PhotoController;
use App\Http\Controllers\Api\RequestController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\Auth\LoginController;
use App\Http\Controllers\Api\Auth\RegisterController;
// use App\Http\Controllers\Api\Auth\PersonalAccessTokenController;
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

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });
Route::middleware('auth:api')->get('users', [UserController::class, 'index']);
Route::middleware('auth:api')->get('users/{id}', [UserController::class, 'show']);
Route::post('login', [LoginController::class, 'store']);
Route::get('/csrf-token', function () {
    return response()->json(['csrfToken' => csrf_token()]);
});
Route::middleware('auth:api')->group(function () {
    Route::delete('logout', [LoginController::class, 'destroy']);
    // Другие защищенные маршруты
});

// Route::middleware(['auth:api', 'role:admin'])->group(function () {
//     Route::get('user', [UserController::class, 'destroy']);
// });

Route::apiResources([
    'requests' => RequestController::class,
    'orders' => OrderController::class,
    'photos' => PhotoController::class,
    'fish_names' => FishNameController::class,
    'register' => RegisterController::class,
    'fishes' => FishController::class,
]);

// Если вам нужно добавить дополнительные маршруты, делайте это отдельно
Route::get('requests/{id}', [RequestController::class, 'show']);
Route::get('photos/{id}', [PhotoController::class, 'show']);
Route::get('fishes/{id}', [FishController::class, 'show']);

Route::get('user/fishes/{id}', [UserValuesController::class, 'index']);
Route::get('user/requests/{id}', [UserValuesController::class, 'requests']);
