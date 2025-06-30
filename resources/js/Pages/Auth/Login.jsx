import ApplicationLogo from '@/Components/ApplicationLogo';
import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import { Alert, AlertDescription } from '@/Components/ui/alert';
import { Button } from '@/Components/ui/button';
import { Card, CardContent } from '@/Components/ui/card';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import GuestLayout from '@/Layouts/GuestLayout';
import { Link, useForm } from '@inertiajs/react';
import { useState } from 'react';
import { toast } from 'sonner';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const onHandleSubmit = (e) => {
        e.preventDefault();

        const clientErrors = {};
        let hasError = false;
        if (!data.email) {
            clientErrors.email = 'Email harus diisi';
            hasError = true;
        }
        if (!data.password) {
            clientErrors.password = 'Password harus diisi';
            hasError = true;
        }

        // Jika ada error, tampilkan dan hentikan submit
        if (hasError) {
            const aggregatedErrors = Object.values(clientErrors).join(', ');
            toast.error(`Terjadi kesalahan validasi: ${aggregatedErrors}`, {
                duration: 3000,
                position: 'top-center',
            });
            return;
        }

        post(route('login'), {
            onFinish: () => reset('password'),
            preserveScroll: true,
            preserveState: true,
            onSuccess: (success) => {
                const flash = success.props.flash_message;
                if (flash) {
                    // Tampilkan pesan sukses
                    if (flash.type === 'success') {
                        status = flash.message;
                    } else {
                        errors[flash.field] = flash.message;
                    }
                }

                if (success.props.auth.user === null) {
                    toast.error('Email atau password salah', {
                        duration: 3000,
                        position: 'top-center',
                        icon: '❌',
                    });
                } else {
                    toast.success('Login berhasil', {
                        duration: 3000,
                        position: 'top-center',
                        icon: '✅',
                    });
                }
            },
            onError: (error) => {
                const errorMessages = Object.values(error).flat().join(', ');
                toast.error(`Terjadi kesalahan: ${errorMessages}`, {
                    duration: 3000,
                    position: 'top-center',
                });
            },
        });
    };

    const [showPassword, setShowPassword] = useState(false);

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
                                    Masuk ke platform cuan untuk mengelola keuangan anda
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
                                    onChange={(e) => setData('email', e.target.value.toLowerCase())}
                                />
                                {errors.email && <InputError message={errors.email} />}
                            </div>

                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Password</Label>
                                    {canResetPassword && (
                                        <Link
                                            href={route('password.request')}
                                            className="ml-auto text-sm underline-offset-2 hover:underline"
                                        >
                                            Lupa Password
                                        </Link>
                                    )}
                                </div>
                                <div className="relative">
                                    <Input
                                        id="password"
                                        type={showPassword ? 'text' : 'password'}
                                        name="password"
                                        value={data.password}
                                        placeholder="Masukkan password anda"
                                        autoComplete="current-password"
                                        onChange={(e) => setData('password', e.target.value)}
                                        className="pr-10"
                                    />
                                    <button
                                        type="button"
                                        className="absolute inset-y-0 right-0 flex items-center pr-3"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? (
                                            <span className="text-gray-400 hover:text-gray-600">🙈</span>
                                        ) : (
                                            <span className="text-gray-400 hover:text-gray-600">👁️</span>
                                        )}
                                    </button>
                                </div>
                                {errors.password && <InputError message={errors.password} />}

                                <div className="mt-4 block">
                                    <label className="flex items-center">
                                        <Checkbox
                                            name="remember"
                                            checked={data.remember}
                                            onChange={(e) => setData('remember', e.target.checked)}
                                        />
                                        <span className="ms-2 text-sm text-gray-600">Remember me</span>
                                    </label>
                                </div>
                            </div>
                            <Button variant="emerald" type="submit" className="w-full" disabled={processing}>
                                Login
                            </Button>
                            <div className="text-center text-sm">
                                Tidak memiliki akun?
                                <span className="ml-1.5">
                                    <Link href={route('register')} className="underline underline-offset-4">
                                        Register
                                    </Link>
                                </span>
                            </div>
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
            <div className="text-balance text-center text-sm text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
                <p>
                    Dengan masuk, Anda setuju dengan{' '}
                    <Link href="#" className="underline">
                        Syarat dan Ketentuan
                    </Link>{' '}
                    serta{' '}
                    <Link href="#" className="underline">
                        Kebijakan Privasi
                    </Link>{' '}
                    kami.
                </p>
            </div>
        </div>
    );
}

Login.layout = (page) => <GuestLayout title="Masuk" children={page} />;
