<?php

namespace App\Services;

use Illuminate\Support\Facades\DB;

class MusicUserService
{
    public function associateOrDisassociate($musicId, $userId)
    {

        $user_liked = DB::table('music_user')->where('music_id', $musicId)->where('user_id', $userId)->exists();

        if ($user_liked) {
            DB::table('music_user')->where('music_id', $musicId)->where('user_id', $userId)->delete();
        } else {   
            DB::table('music_user')->insert([
                'music_id' => $musicId,
                'user_id' => $userId
            ]);
        }

        return !$user_liked;
    }
}