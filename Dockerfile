# --- Stage 1 : Base Image ---
# Menggunakan alias 'base' untuk referensi di stage lain.
FROM dunglas/frankenphp:1-php8.3 AS base

# Set variabel lingkungan untuk mode non-interaktif selama build.
ENV DEBIAN_FRONTEND=noninteractive

# Gabungkan instalasi dependensi sistem, ekstensi PHP, dan Composer
# ke dalam satu layer RUN untuk mengurangi ukuran image dan mempercepat build.
RUN apt-get update && apt-get install -y \
        libpng-dev \
        libjpeg-dev \
        libfreetype6-dev \
        libzip-dev \
        libicu-dev \
        libonig-dev \
        libxml2-dev \
        unzip \
        curl \
        git \
        default-mysql-client \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install -j$(nproc) \
        gd pdo pdo_mysql zip opcache intl mbstring xml bcmath ctype fileinfo \
    && curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer \
    && rm -rf /var/lib/apt/lists/*

# Konfigurasi OPcache untuk production.
RUN echo "opcache.enable=1" >> /usr/local/etc/php/conf.d/opcache.ini \
    && echo "opcache.memory_consumption=256" >> /usr/local/etc/php/conf.d/opcache.ini \
    && echo "opcache.max_accelerated_files=20000" >> /usr/local/etc/php/conf.d/opcache.ini \
    && echo "opcache.validate_timestamps=0" >> /usr/local/etc/php/conf.d/opcache.ini


# --- Stage 2: Composer Dependencies ---
# Stage ini khusus untuk menginstal dependensi vendor.
FROM base AS vendor

# Build argument untuk membedakan instalasi production dan development.
ARG APP_ENV=production

WORKDIR /app

COPY composer.json composer.lock ./

# Instal dependensi Composer menggunakan BuildKit cache mount untuk kecepatan.
# Logika ini memisahkan instalasi untuk production dan development.
RUN --mount=type=cache,target=/root/.composer/cache,sharing=locked \
    if [ "$APP_ENV" = "production" ]; then \
        echo "Installing production dependencies..."; \
        composer install --no-dev --no-scripts --no-autoloader --ignore-platform-reqs --optimize-autoloader --no-plugins; \
    else \
        echo "Installing development dependencies..."; \
        composer install --no-scripts --no-autoloader --ignore-platform-reqs; \
    fi


# --- Stage 3: Final Application Image ---
# Ini adalah image akhir yang akan dijalankan di production.
FROM base AS final

WORKDIR /app

# Salin dependensi vendor yang sudah di-build dari stage sebelumnya.
COPY --from=vendor /app/vendor /app/vendor

# Salin kode aplikasi. File dalam .dockerignore akan diabaikan.
COPY . .

# Buat file .env sementara yang dibutuhkan untuk optimisasi Laravel.
RUN echo "APP_NAME=CuanKu" > .env \
    && echo "APP_ENV=production" >> .env \
    && echo "APP_KEY=base64:lxbDb+HQTc/b26RkYlQ5BRSSp+9opsZm58H89jPhYI8=" >> .env \
    && echo "APP_DEBUG=false" >> .env \
    && echo "LOG_CHANNEL=stack" >> .env

# Hasilkan file autoload yang dioptimalkan untuk production.
RUN composer dump-autoload --optimize --no-dev --classmap-authoritative --no-scripts

# Hapus file .env sementara setelah tidak lagi diperlukan.
RUN rm -f .env

# Atur kepemilikan (ownership) yang benar untuk seluruh direktori aplikasi.
# Ini penting agar web server (www-data) bisa membaca file.
RUN chown -R www-data:www-data /app

# Atur izin tulis HANYA pada direktori yang membutuhkannya.
# Ini lebih aman dan jauh lebih cepat daripada 'chmod -R' pada seluruh aplikasi.
RUN chmod -R 775 /app/storage /app/bootstrap/cache

# ✅ Salin file Caddyfile kustom Anda ke dalam image.
# Ini akan menimpa konfigurasi default dan memberikan kontrol penuh.
COPY Caddyfile /etc/frankenphp/Caddyfile

# Health check untuk monitoring kontainer.
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD curl -f http://localhost/ || exit 1

# Ekspos port default yang digunakan oleh FrankenPHP.
EXPOSE 80
