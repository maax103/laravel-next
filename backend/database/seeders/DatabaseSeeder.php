<?php

namespace Database\Seeders;

use App\Models\User;
use Database\Seeders\MusicSeeder as SeedersMusicSeeder;
use Database\Seeders\MusicUserSeeder as SeedersMusicUserSeeder;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            UserSeeder::class,
            SeedersMusicSeeder::class,
            SeedersMusicUserSeeder::class,
        ]);
    }
}
