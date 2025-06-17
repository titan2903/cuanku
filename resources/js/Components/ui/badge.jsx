import { cva } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const badgeVariants = cva(
    'inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
    {
        variants: {
            variant: {
                default: 'border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80',
                secondary: 'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
                destructive:
                    'border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80',
                outline: 'text-foreground',
                red: 'text-white bg-gradient-to-r from-red-500 via-red-600 to-red-700',
                orange: 'text-white bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700',
                emerald: 'text-white bg-gradient-to-r from-emerald-500 via-emerald-600 to-emerald-700',
                sky: 'text-white bg-gradient-to-r from-sky-500 via-sky-600 to-sky-700',
                purple: 'text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700',
                rose: 'text-white bg-gradient-to-r from-rose-500 via-rose-600 to-rose-700',
                pink: 'text-white bg-gradient-to-r from-pink-500 via-pink-600 to-pink-700',
                fuchsia: 'text-white bg-gradient-to-r from-fuchsia-500 via-fuchsia-600 to-fuchsia-700',
                violet: 'text-white bg-gradient-to-r from-violet-500 via-violet-600 to-violet-700',
                blue: 'text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700',
                lime: 'text-white bg-gradient-to-r from-lime-500 via-lime-600 to-lime-700',
                teal: 'text-white bg-gradient-to-r from-teal-500 via-teal-600 to-teal-700',
            },
        },
        defaultVariants: {
            variant: 'default',
        },
    },
);

function Badge({ className, variant, ...props }) {
    return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
