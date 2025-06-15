import { Link } from '@inertiajs/react';
import { IconCash } from '@tabler/icons-react';

export default function ApplicationLogo({ url = '#' }) {
    return (
        <Link href={url} className="mt-6 flex items-center gap-x-2">
            <div className="rounded-xl bg-gradient-to-br from-emerald-400 via-emerald-500 to-yellow-200 p-2">
                <IconCash className="size-6 text-white" />
            </div>
            <span className="text-xl font-semibold leading-relaxed tracking-wide dark:text-emerald-500">
                CuanKu<span className="text-lg text-emerald-500 dark:text-white">💲</span>
            </span>
        </Link>
    );
}
