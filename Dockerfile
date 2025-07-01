# --- Stage 1 : Base Image ---
FROM dunglas/frankenphp:1-php8.3 AS base

# Instal dependensi sistem yang umum diperlukan oleh package PHP
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
    && rm -rf /var/lib/apt/lists/* \
    && apt-get clean

# Install Composer manually dengan timeout yang lebih besar
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer \
    && chmod +x /usr/local/bin/composer

# Instal ekstensi PHP yang umum untuk Laravel
RUN docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install -j$(nproc) \
        gd \
        pdo \
        pdo_mysql \
        zip \
        opcache \
        intl \
        mbstring \
        xml \
        bcmath \
        ctype \
        fileinfo

# Configure OPcache untuk production
RUN echo "opcache.enable=1" >> /usr/local/etc/php/conf.d/opcache.ini \
    && echo "opcache.memory_consumption=256" >> /usr/local/etc/php/conf.d/opcache.ini \
    && echo "opcache.max_accelerated_files=20000" >> /usr/local/etc/php/conf.d/opcache.ini \
    && echo "opcache.validate_timestamps=0" >> /usr/local/etc/php/conf.d/opcache.ini

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# --- Stage 2: Composer Dependencies ---
FROM base AS composer_deps

WORKDIR /app

# Salin file Composer dan instal dependensi.
# Ini dilakukan terpisah agar Docker bisa menggunakan cache layer
# jika tidak ada perubahan pada dependensi.
COPY composer.json composer.lock ./
# ✅ Jalankan composer install dengan cache mount
RUN --mount=type=cache,target=/root/.composer/cache \
    composer install --no-dev --no-scripts --no-autoloader --ignore-platform-reqs --optimize-autoloader --no-plugins

# --- Stage 3: Final Application Image ---
FROM base AS app

WORKDIR /app

# ✅ Buat direktori storage dan cache terlebih dahulu dengan permission yang benar
RUN mkdir -p /app/storage/app/public \
    && mkdir -p /app/storage/framework/cache/data \
    && mkdir -p /app/storage/framework/sessions \
    && mkdir -p /app/storage/framework/views \
    && mkdir -p /app/storage/logs \
    && mkdir -p /app/bootstrap/cache \
    && chown -R www-data:www-data /app/storage /app/bootstrap \
    && chmod -R 775 /app/storage /app/bootstrap

# Salin dependensi dari stage sebelumnya
COPY --from=composer_deps /app/vendor /app/vendor

# ✅ Salin aplikasi dengan ownership yang benar langsung
COPY --chown=www-data:www-data . .

# ✅ Buat .env minimal untuk autoload optimization
RUN echo "APP_NAME=CuanKu" > .env \
    && echo "APP_ENV=production" >> .env \
    && echo "APP_KEY=base64:lxbDb+HQTc/b26RkYlQ5BRSSp+9opsZm58H89jPhYI8=" >> .env \
    && echo "APP_DEBUG=false" >> .env \
    && echo "LOG_CHANNEL=stack" >> .env \
    && echo "DB_CONNECTION=mysql" >> .env \
    && echo "DB_HOST=127.0.0.1" >> .env \
    && echo "DB_PORT=3306" >> .env \
    && echo "DB_DATABASE=temp" >> .env \
    && echo "DB_USERNAME=temp" >> .env \
    && echo "DB_PASSWORD=temp" >> .env

# ✅ Jalankan autoload optimization tanpa Laravel scripts
RUN composer dump-autoload --optimize --no-dev --classmap-authoritative --no-scripts

# ✅ Hapus .env temporary setelah optimization
RUN rm -f .env

# ✅ Set permissions dengan cara yang lebih efisien - DIUBAH
# Ganti find yang lambat dengan chmod langsung
RUN chmod -R u+rw,g+rw,o+r /app \
    && chmod -R 775 /app/storage /app/bootstrap/cache

# Health check untuk monitoring
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD curl -f http://localhost/ || exit 1

# Port default FrankenPHP adalah 80
EXPOSE 80