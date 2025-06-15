import { IconMoon, IconSun } from '@tabler/icons-react';
import { Button } from '../ui/button';
import { useTheme } from './ThemeProvider';

export default function ThemeSwitcher() {
    const { theme, setTheme } = useTheme();

    const toggleTheme = () => {
        if (theme === 'dark') {
            setTheme('light');
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        } else {
            setTheme('dark');
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        }
    };

    return (
        <Button variant="emerald" size="xl" className="ml-auto" onClick={toggleTheme}>
            {theme === 'dark' ? <IconSun className="size-10 text-white" /> : <IconMoon className="size-10" />}
        </Button>
    );
}
