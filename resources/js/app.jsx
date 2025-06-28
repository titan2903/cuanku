import '../css/app.css';
import './bootstrap';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import { Toaster } from 'sonner';
import { ThemeProvider } from './Components/Dark/ThemeProvider';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx')),
    setup({ el, App, props }) {
        const appElement = (
            <ThemeProvider defaultTheme="light" storageKey="current-theme">
                <App {...props} />
                <Toaster position="top-center" richColors />
            </ThemeProvider>
        );

        createRoot(el).render(appElement);

        // const root = createRoot(el);

        // root.render(<App {...props} />);
    },
    progress: {
        color: '#4B5563',
    },
});
