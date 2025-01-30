<?php

namespace App\Services;

use Illuminate\Support\Facades\DB;

class MusicUserService
{
    public function associate($musicId, $userId)
    {
        DB::table('music_user')->insert([
            'music_id' => $musicId,
            'user_id' => $userId
        ]);
    }
}