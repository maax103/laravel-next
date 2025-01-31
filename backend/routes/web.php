<?php

use App\Http\Controllers\MusicController;
use Illuminate\Support\Facades\Route;


Route::prefix('api')->group(function () {
    Route::get('/', function () {
        return ['Laravel' => app()->version()];
    });

    Route::post('/music-import', [MusicController::class, 'importMusic']);
    Route::post('/music/{musicId}/user/{userId}', [MusicController::class, 'associateUserMusic']);
    Route::get('/music-users', [MusicController::class, 'getUserMusic']);
});


require __DIR__.'/auth.php';
