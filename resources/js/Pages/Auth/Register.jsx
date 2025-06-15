import ApplicationLogo from '@/Components/ApplicationLogo';
import InputError from '@/Components/InputError';
import { Button } from '@/Components/ui/button';
import { Card, CardContent } from '@/Components/ui/card';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import GuestLayout from '@/Layouts/GuestLayout';
import { Link, useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        phone_number: '',
        password: '',
        password_confirmation: '',
    });

    const onHandleSubmit = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    // Tambahkan state untuk toggle password visibility
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
                                    Masuk daftar sekarang untuk mengelola keuangan anda
                                </p>
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

                            <div className="grid gap-2">
                                <Label htmlFor="name">Nama</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    name="name"
                                    value={data.name}
                                    placeholder="Masukkan nama anda"
                                    autoComplete="name"
                                    autoFocus
                                    onChange={(e) => setData('name', e.target.value)}
                                />
                                {errors.name && <InputError message={errors.name} />}
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="password">Password</Label>
                                <div className="relative">
                                    <Input
                                        id="password"
                                        type={showPassword ? 'text' : 'password'}
                                        name="password"
                                        value={data.password}
                                        placeholder="Masukkan password anda"
                                        autoComplete="new-password"
                                        autoFocus
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
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="password_confirmation">Konfirmasi Password</Label>
                                <div className="relative">
                                    <Input
                                        id="password_confirmation"
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        name="password_confirmation"
                                        value={data.password_confirmation}
                                        placeholder="Masukkan password anda"
                                        autoComplete="new-password"
                                        autoFocus
                                        onChange={(e) => setData('password_confirmation', e.target.value)}
                                        className="pr-10"
                                    />
                                    <button
                                        type="button"
                                        className="absolute inset-y-0 right-0 flex items-center pr-3"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    >
                                        {showConfirmPassword ? (
                                            <span className="text-gray-400 hover:text-gray-600">🙈</span>
                                        ) : (
                                            <span className="text-gray-400 hover:text-gray-600">👁️</span>
                                        )}
                                    </button>
                                </div>
                                {errors.password_confirmation && <InputError message={errors.password_confirmation} />}
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="phone_number">Nomor HP </Label>
                                <Input
                                    id="phone_number"
                                    type="text"
                                    name="phone_number"
                                    value={data.phone_number}
                                    placeholder="Contoh: 0851-2345-6789"
                                    autoComplete="tel"
                                    pattern="^08[1-9][0-9]{7,10}$"
                                    inputMode="numeric"
                                    onChange={(e) => setData('phone_number', e.target.value.replace(/[^0-9]/g, ''))}
                                />
                                <span className="text-xs text-muted-foreground">
                                    Gunakan format nomor HP Indonesia, misal: 0851xxxxxxx
                                </span>
                                {errors.phone_number && <InputError message={errors.phone_number} />}
                            </div>

                            <Button variant="emerald" type="submit" className="w-full" disabled={processing}>
                                Register
                            </Button>
                            <div className="text-center text-sm">
                                Sudah memiliki akun?
                                <span className="ml-1.5">
                                    <Link href={route('login')} className="underline underline-offset-4">
                                        Login
                                    </Link>
                                </span>
                            </div>
                        </div>
                    </form>
                    <div className="relative hidden bg-muted md:block">
                        <img
                            src="/images/bg.webp"
                            alt="Image"
                            className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
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

Register.layout = (page) => <GuestLayout title="Daftar" children={page} />;
