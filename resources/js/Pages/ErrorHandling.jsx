import ApplicationLogo from '@/Components/ApplicationLogo';
import { Button } from '@/Components/ui/button';
import { Card, CardContent } from '@/Components/ui/card';
import { messages } from '@/lib/utils';
import { Link } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';

export default function ErrorHandling({ status }) {
    const errorMessages = messages[status]
    return (
        <div className="flex flex-col gap-6">
            <Card className="overflow-hidden">
                <CardContent className="grid p-0 md:grid-cols-2">
                    <div className='p-6 md:p-8'>
                        <div className="flex flex-col gap-6">
                            <div className='flex flex-col items-center text-center'>
                                <ApplicationLogo />
                                <span className='mt-6 text-sm font-medium text-emerald-600'>
                                    {errorMessages.status}
                                </span>
                                <h1 className='text-2xl font-bold leading-relaxed'>
                                    {errorMessages.title}
                                </h1>
                                <p className='text-sm text-muted-foreground'>
                                    {errorMessages.description}
                                </p>
                            </div>
                            <Button variant="emerald" className='w-full' asChild>
                                <Link href={route('dashboard')}>
                                Kembali ke Dashboard
                                </Link>
                            </Button>
                        </div>
                    </div>
                    <div className='relative hidden bg-muted md:block'>
                        <img src="/images/bg.webp" alt="Image" className='absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale' />
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

ErrorHandling.layout = (page) => <GuestLayout title={messages[page.props.status].title} children={page} />;