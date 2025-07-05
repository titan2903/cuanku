<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        // Create admin user
        User::factory()->create([
            'name' => 'Administrator',
            'email' => 'admin@cuanku.com',
            'password' => bcrypt('password'),
            'role' => 'admin',
            'is_active' => true,
            'is_agentic' => false,
        ]);
    }
}