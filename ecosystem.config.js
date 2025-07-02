module.exports = {
    apps: [
        {
            name: 'cuanku-app',
            script: 'php',
            args: 'artisan serve --host=127.0.0.1 --port=8000',
            env: {
                APP_ENV: 'production',
                NODE_ENV: 'production',
            },
            watch: false,
            instances: 1,
            exec_mode: 'fork',
            max_memory_restart: '200M',
            restart_delay: 3000,
        },
        {
            name: 'cuanku-queue',
            script: 'php',
            args: 'artisan queue:work --tries=3 --timeout=90',
            env: {
                APP_ENV: 'production',
                NODE_ENV: 'production',
            },
            watch: false,
            instances: 1,
            exec_mode: 'fork',
            max_memory_restart: '150M',
        },
    ],
};
