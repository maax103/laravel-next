<?php

namespace Database\Seeders;

use App\Models\Music;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class MusicSeeder extends Seeder
{
    public function run()
    {
        $musics = [
            ['title' => 'Song A', 'artist' => 'Artist 1', 'album' => 'Album X', 'isrc' => 'ISRC12345A', 'platform' => 'Spotify', 'track_id' => 'TRK123A', 'duration' => 210, 'added_date' => Carbon::now(), 'added_by' => 1, 'url' => 'https://spotify.com/track/TRK123A'],
            ['title' => 'Song B', 'artist' => 'Artist 2', 'album' => 'Album Y', 'isrc' => 'ISRC12345B', 'platform' => 'Apple Music', 'track_id' => 'TRK123B', 'duration' => 180, 'added_date' => Carbon::now(), 'added_by' => 2, 'url' => 'https://apple.com/track/TRK123B'],
        ];

        foreach ($musics as $music) {
            Music::create($music);
        }
    }
}
