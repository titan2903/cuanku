#!/bin/bash

docker compose exec -T app php -r "
\$admin = \App\Models\User::where('name', 'admin')->first();
if (!\$admin) {
    \App\Models\User::create([
        'name' => 'admin',
        'email' => 'admin@cuanku.local',
        'password' => bcrypt('admin123'),
        'is_active' => true,
        'role' => 'admin',
    ]);
    echo 'Admin user created successfully';
} else {
    echo 'Admin user already exists';
}
"
