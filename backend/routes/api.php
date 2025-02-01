<?php

use App\Http\Controllers\MusicController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('/music-import', [MusicController::class, 'importMusic'])
    ->middleware(['auth:sanctum']);

Route::post('/music/{musicId}/user/{userId}', [MusicController::class, 'associateUserMusic'])
    ->middleware(['auth:sanctum']);

Route::get('/music-users', [MusicController::class, 'getUserMusic'])
    ->middleware(['auth:sanctum']);

Route::get('/user', function (Request $request) {
    return $request->user();
})
    ->middleware(['auth:sanctum']);

require __DIR__.'/auth.php';
