#!/bin/bash

# Hentikan skrip jika ada perintah yang gagal
set -e

# --- Langkah 1: Hentikan dan Hapus Kontainer Lama (Opsional, untuk memulai dari awal) ---
echo "🛑 Menghentikan dan menghapus kontainer lama (jika ada)..."
docker compose down --remove-orphans
echo "✅ Kontainer lama berhasil dihapus."
echo ""

# --- Langkah 2: Bangun Aset Frontend ---
echo "📦 Membangun aset frontend (JavaScript/CSS)..."
docker compose --profile build up
echo "✅ Aset frontend selesai dibangun."
echo ""

# Hapus kontainer node-build setelah selesai untuk membersihkan
docker compose rm -f node-build

# --- Langkah 3: Bangun Image Aplikasi Utama ---
echo "🔨 Membangun image untuk aplikasi Laravel..."
docker compose build app
echo "✅ Image aplikasi selesai dibangun."
echo ""

# --- Langkah 4: Jalankan Aplikasi ---
echo "🚀 Menjalankan aplikasi Laravel di latar belakang..."
docker compose up -d app
echo "✅ Aplikasi berhasil dijalankan."
echo ""

# Beri sedikit jeda agar aplikasi benar-benar siap sebelum menjalankan perintah artisan
echo "⏳ Menunggu aplikasi siap..."
sleep 10

# --- Langkah 5: Jalankan Migrasi & Optimisasi ---
echo "🔄 Menjalankan migrasi dan optimisasi Laravel..."

echo "  - Menjalankan migrasi database..."
docker compose exec -T app php artisan migrate --force

echo "  - Membuat cache untuk config..."
docker compose exec -T app php artisan config:cache

echo "  - Membuat cache untuk route..."
docker compose exec -T app php artisan route:cache

echo "  - Membuat cache untuk view..."
docker compose exec -T app php artisan view:cache

echo "✅ Migrasi dan optimisasi selesai."
echo ""

# --- Selesai ---
echo "🎉 Proses selesai! Aplikasi Anda berjalan di http://localhost:8000"
