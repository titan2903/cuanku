import ApplicationLogo from '@/Components/ApplicationLogo';
import InputError from '@/Components/InputError';
import { Button } from '@/Components/ui/button';
import { Card, CardContent } from '@/Components/ui/card';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import GuestLayout from '@/Layouts/GuestLayout';
import { useForm } from '@inertiajs/react';

export default function ConfirmPassword() {
    const { data, setData, post, processing, errors, reset } = useForm({
        password: '',
    });

    const onHandleSubmit = (e) => {
        e.preventDefault();

        post(route('password.confirm'), {
            onFinish: () => reset('password'),
        });
    };

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
                                <Input
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    placeholder="Masukkan password anda"
                                    autoComplete="new-password"
                                    autoFocus
                                    onChange={(e) => setData('password', e.target.value)}
                                />
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
