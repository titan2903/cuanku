import { cn } from '@/lib/utils';
import { Link } from '@inertiajs/react';

export default function NavLink({ active = false, url = '#', title, icon: Icon, ...props }) {
    return (
        <Link
            {...props}
            href={url}
            className={cn(
                active
                    ? 'bg-gradient-to-br from-emerald-500 via-emerald-500 to-yellow-200 font-medium text-white'
                    : 'hover:bg-muted',
                'flex items-center gap-3 rounded-lg p-2.5 transition-all dark:text-white',
            )}
        >
            <Icon className="size-5" />
            {title}
        </Link>
    );
}
