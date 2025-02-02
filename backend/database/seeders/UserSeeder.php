<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run()
    {
        User::factory()->count(5)->create();
        
        $user = User::create([
            'name' => 'Max',
            'email' => 'maximilianomfurtado@gmail.com',
            'password' => Hash::make('max12345'),
        ]);
    }
}
