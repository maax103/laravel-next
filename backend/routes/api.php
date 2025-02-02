<?php

use App\Http\Controllers\MusicController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::prefix('music')
    ->middleware(['auth:sanctum'])
    ->group(function () {
        Route::get('/', [MusicController::class, 'index']);
        Route::post('/', [MusicController::class, 'store']);
        Route::post(('/{music_id}/like'), [MusicController::class, 'likeOrDislike']);
        Route::get('/{id}', [MusicController::class, 'show']);
        Route::put('/{id}', [MusicController::class, 'update']);
        Route::delete('/{id}', [MusicController::class, 'destroy']);
        Route::post('/user/{userId}', [MusicController::class, 'getUserMusic']);
    }
);

Route::post('/music-import', [MusicController::class, 'importMusic'])
    ->middleware(['auth:sanctum']);

Route::post('/music/{musicId}/user/{userId}', [MusicController::class, 'associateUserMusic'])
    ->middleware(['auth:sanctum']);

Route::get('/music-users', [MusicController::class, 'getUserMusic'])
    ->middleware(['auth:sanctum']);

Route::prefix('users')
    ->middleware(['auth:sanctum'])
    ->group(function () {
        Route::get('/', [UserController::class, 'index']);
        Route::get('/{id}', [UserController::class, 'show']);
    }
);

Route::get('/user', function (Request $request) {
    return $request->user();
})
    ->middleware(['auth:sanctum']);

require __DIR__.'/auth.php';
