<?php

use App\Http\Controllers\MusicController;
use Illuminate\Support\Facades\Route;

Route::prefix('api')->group(function () {
    Route::get('/', function () {
        return view('welcome');
    });

    Route::post('/import-music', [MusicController::class, 'import']);
    Route::post('/music/{musicId}/user/{userId}', [MusicController::class, 'associateUserMusic']);
    Route::get('/music-users', [MusicController::class, 'getUserMusic']);
});
