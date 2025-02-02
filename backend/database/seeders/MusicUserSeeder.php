<?php

namespace Database\Seeders;

use App\Models\Music;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MusicUserSeeder extends Seeder
{
    public function run()
    {
        $users = User::all();
        $musics = Music::all();

        foreach ($users as $user) {
            $randomMusics = $musics->random(rand(1, 3));
            foreach ($randomMusics as $music) {
                DB::table('music_user')->insert([
                    'music_id' => $music->id,
                    'user_id' => $user->id,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
        }
    }
}