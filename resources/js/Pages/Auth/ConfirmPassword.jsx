import ApplicationLogo from '@/Components/ApplicationLogo';
import InputError from '@/Components/InputError';
import { Button } from '@/Components/ui/button';
import { Card, CardContent } from '@/Components/ui/card';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import GuestLayout from '@/Layouts/GuestLayout';
import { useForm } from '@inertiajs/react';
import { useState } from 'react';
import { toast } from 'sonner';

export default function ConfirmPassword() {
    const { data, setData, post, processing, errors, reset } = useForm({
        password: '',
    });

    const onHandleSubmit = (e) => {
        e.preventDefault();

        const clientErrors = {};
        let hasError = false;
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

        post(route('password.confirm'), {
            onSuccess: (success) => {
                if (success.props.auth.user === null) {
                    toast.error('Gagal mengkonfirmasi password. Silakan coba lagi.', {
                        duration: 3000,
                        position: 'top-center',
                    });
                } else {
                    toast.success('Password berhasil dikonfirmasi!', {
                        duration: 3000,
                        position: 'top-center',
                        icon: '✅',
                    });
                }
            },
            onError: (errors) => {
                const formattedErrors = Object.values(errors).join(', ');
                toast.error(`Terjadi kesalahan: ${formattedErrors}`, {
                    duration: 3000,
                    position: 'top-center',
                });
            },
            onFinish: () => reset('password'),
        });
    };

    // Tambahkan state untuk toggle password visibility
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    return (
        <div className="flex flex-col gap-6">
            <Card className="overflow-hidden">
                <CardContent className="grid p-0 md:grid-cols-2">
                    <form onSubmit={onHandleSubmit} className="p-6 md:p-8">
                        <div className="flex flex-col gap-6">
                            <div className="flex flex-col items-center text-center">
                                <ApplicationLogo />
                                <h1 className="mt-6 text-2xl font-bold leading-relaxed">Konfirmasi Password</h1>
                                <p className="text-sm text-muted-foreground">
                                    Ini adalah area aman dari CuanKu💲. Silakan konfirmasi password anda sebelum
                                    melanjutkan.
                                </p>
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="password">Password</Label>
                                <div className="relative">
                                    <Input
                                        id="password"
                                        type={showConfirmPassword ? 'text' : 'password'}
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
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    >
                                        {showConfirmPassword ? (
                                            <span className="text-gray-400 hover:text-gray-600">🙈</span>
                                        ) : (
                                            <span className="text-gray-400 hover:text-gray-600">👁️</span>
                                        )}
                                    </button>
                                </div>
                                {errors.password && <InputError message={errors.password} />}
                            </div>

                            <Button variant="emerald" type="submit" className="w-full" disabled={processing}>
                                Konfirmasi
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

ConfirmPassword.layout = (page) => <GuestLayout title="Konfirmasi Password" children={page} />;
