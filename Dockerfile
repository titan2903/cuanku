# --- Stage 1 : Base Image ---
FROM dunglas/frankenphp:1-php8.3-fpm AS base

# Instal dependensi sistem yang umum diperlukan oleh package PHP
RUN apt-get update && apt-get install -y \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    libzip-dev \
    unzip \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Instal ekstensi PHP yang umum untuk Laravel
RUN docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install -j$(nproc) gd pdo pdo_mysql zip opcache

# Configure OPcache untuk production
RUN echo "opcache.enable=1" >> /usr/local/etc/php/conf.d/opcache.ini \
    && echo "opcache.memory_consumption=256" >> /usr/local/etc/php/conf.d/opcache.ini \
    && echo "opcache.max_accelerated_files=20000" >> /usr/local/etc/php/conf.d/opcache.ini \
    && echo "opcache.validate_timestamps=0" >> /usr/local/etc/php/conf.d/opcache.ini

# --- Stage 2: Composer Dependencies ---
FROM base AS composer_deps

WORKDIR /app

# Salin file Composer dan instal dependensi.
# Ini dilakukan terpisah agar Docker bisa menggunakan cache layer
# jika tidak ada perubahan pada dependensi.
COPY composer.json composer.lock ./
RUN composer install --no-dev --no-scripts --no-autoloader

# --- Stage 3: Final Application Image ---
FROM base AS app

WORKDIR /app

# Salin dependensi dari stage sebelumnya
COPY --from=composer_deps /app/vendor /app/vendor

# Salin sisa kode aplikasi
COPY . .

# Buat cache untuk optimasi (tanpa php artisan optimize yang butuh .env)
RUN composer dump-autoload --optimize --no-dev --classmap-authoritative

# Atur kepemilikan file agar server bisa menulis ke storage dan cache
RUN chown -R www-data:www-data /app/storage /app/bootstrap/cache \
    && chmod -R 775 /app/storage /app/bootstrap/cache

# Health check untuk monitoring
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD curl -f http://localhost/ || exit 1

# Port default FrankenPHP adalah 80
EXPOSE 80