#!/bin/bash

echo "🚀 Starting database setup..."

# 1. Start container
echo "📦 Starting container..."
docker compose up -d app

# 2. Wait for healthy
echo "⏳ Waiting for container to be ready..."
sleep 10

# 3. Create database
echo "🗄️ Creating database..."
docker compose exec -T app php -r "
try {
    \$pdo = new PDO('mysql:host=176.100.37.75;port=3307', 'root', 'fah6w2yfG2JL7Jk');
    \$pdo->exec('CREATE DATABASE IF NOT EXISTS cuanku CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci');
    echo 'Database created successfully';
} catch (Exception \$e) {
    echo 'Database creation failed: ' . \$e->getMessage();
    exit 1;
}
"

# 4. Clear cache
echo "🧹 Clearing Laravel cache..."
docker compose exec -T app php artisan config:clear
docker compose exec -T app php artisan cache:clear

# 5. Test connection
echo "🔍 Testing database connection..."
docker compose exec -T app php artisan tinker --execute="
try {
    DB::connection()->getPdo();
    echo 'Connection successful!';
} catch (Exception \$e) {
    echo 'Connection failed: ' . \$e->getMessage();
    exit 1;
}
"

# 6. Run migrations
echo "🔄 Running migrations..."
docker compose exec -T app php artisan migrate --force

echo "✅ Database setup completed!"