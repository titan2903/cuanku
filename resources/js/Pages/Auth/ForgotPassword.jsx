import ApplicationLogo from '@/Components/ApplicationLogo';
import InputError from '@/Components/InputError';
import { Alert, AlertDescription } from '@/Components/ui/alert';
import { Button } from '@/Components/ui/button';
import { Card, CardContent } from '@/Components/ui/card';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import GuestLayout from '@/Layouts/GuestLayout';
import { useForm } from '@inertiajs/react';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const onHandleSubmit = (e) => {
        e.preventDefault();

        post(route('password.email'));
    };

    return (
        <div className="flex flex-col gap-6">
            <Card className="overflow-hidden">
                <CardContent className="grid p-0 md:grid-cols-2">
                    <form onSubmit={onHandleSubmit} className="p-6 md:p-8">
                        <div className="flex flex-col gap-6">
                            <div className="flex flex-col items-center text-center">
                                <ApplicationLogo />
                                <h1 className="mt-6 text-2xl font-bold leading-relaxed">Selamat Datang</h1>
                                <p className="text-sm text-muted-foreground">
                                    Lupa password? Masukkan email anda untuk mengatur ulang password anda
                                </p>
                                {status && (
                                    <Alert variant="success" className="my-2">
                                        <AlertDescription>{status}</AlertDescription>
                                    </Alert>
                                )}
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    placeholder="Masukkan email anda"
                                    autoComplete="username"
                                    autoFocus
                                    onChange={(e) => setData('email', e.target.value)}
                                />
                                {errors.email && <InputError message={errors.email} />}
                            </div>

                            <Button variant="emerald" type="submit" className="w-full" disabled={processing}>
                                Rest Password
                            </Button>
                        </div>
                    </form>
                    <div className="relative hidden bg-muted md:block">
                        <img
                            src="/images/bg.webp"
                            alt="Image"
                            className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.4] dark:grayscale"
                        />
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

ForgotPassword.layout = (page) => <GuestLayout title="Lupa Password" children={page} />;
