import BreadcrumbHeader from '@/Components/BreadcrumbHeader';
import HeaderTitle from '@/Components/HeaderTitle';
import InputError from '@/Components/InputError';
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardHeader } from '@/Components/ui/card';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import AppLayout from '@/Layouts/AppLayout';
import { flashMessage } from '@/lib/utils';
import { Link, useForm } from '@inertiajs/react';
import { IconArrowBack, IconChecks, IconMoneybag } from '@tabler/icons-react';
import { toast } from 'sonner';

export default function Create(props) {
    const { data, setData, errors, post, processing, reset } = useForm({
        name: '',
        nominal: 0,
        monthly_saving: 0,
        deadline: '',
        beginning_balance: 0,
        _method: props.page_settings.method,
    });

    const onHandleChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    const onHandleSubmit = (e) => {
        e.preventDefault();

        // Validasi client-side
        const clientErrors = {};
        let hasError = false;
        if (!data.name) {
            clientErrors.name = 'Nama Tujuan harus diisi';
            hasError = true;
        }
        if (!data.deadline) {
            clientErrors.deadline = 'Deadline harus diisi';
            hasError = true;
        }
        if (!data.nominal || data.nominal <= 0) {
            clientErrors.nominal = 'Nominal harus diisi dan lebih besar dari 0';
            hasError = true;
        }
        if (!data.monthly_saving || data.monthly_saving <= 0) {
            clientErrors.monthly_saving = 'Tabungan Bulanan harus diisi dan lebih besar dari 0';
            hasError = true;
        }
        if (!data.beginning_balance || data.beginning_balance < 0) {
            clientErrors.beginning_balance = 'Saldo Awal harus diisi dan tidak boleh negatif';
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

        post(props.page_settings.action, {
            preserveScroll: true,
            preserveState: true,
            onSuccess: (success) => {
                const flash = flashMessage(success);
                if (flash) toast[flash.type](flash.message);

                toast.success('Tujuan berhasil dibuat!', {
                    duration: 3000,
                    position: 'top-center',
                    icon: '✅',
                });
                reset();
            },
            onError: (error) => {
                const aggregatedErrors = Object.values(error).join(', ');
                toast.error(`Terjadi kesalahan: ${aggregatedErrors}`, {
                    duration: 3000,
                    position: 'top-center',
                });
            },
        });
    };

    return (
        <div className="flex w-full flex-col gap-y-6 pb-32">
            <BreadcrumbHeader items={props.items} />
            <Card>
                <CardHeader>
                    <div className="flex flex-col items-start justify-between gap-y-4 lg:flex-row lg:items-center">
                        <HeaderTitle
                            title={props.page_settings.title}
                            subtitle={props.page_settings.subtitle}
                            icon={IconMoneybag}
                        />

                        <Button variant="emerald" size="xl" asChild>
                            <Link href={route('goals.index')}>
                                <IconArrowBack className="size-4" />
                                Kembali
                            </Link>
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <form className="space-y-4" onSubmit={onHandleSubmit}>
                        <div className="flex flex-col gap-y-2">
                            <Label htmlFor="name" className="text-sm font-semibold">
                                Nama Tujuan <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                type="text"
                                name="name"
                                id="name"
                                placeholder="Masukkan Tujuan"
                                value={data.name}
                                onChange={onHandleChange}
                            />
                            {errors.name && <InputError message={errors.name} className="mt-2" />}
                        </div>
                        <div className="flex flex-col gap-y-2">
                            <Label htmlFor="deadline" className="text-sm font-semibold">
                                Deadline <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                type="date"
                                name="deadline"
                                id="deadline"
                                placeholder="Masukkan Deadline"
                                value={data.deadline}
                                onChange={onHandleChange}
                            />
                            {errors.deadline && <InputError message={errors.deadline} className="mt-2" />}
                        </div>
                        <div className="flex flex-col gap-y-2">
                            <Label htmlFor="nominal" className="text-sm font-semibold">
                                Nominal (Rp) <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                type="number"
                                name="nominal"
                                id="nominal"
                                placeholder="Masukkan Tujuan"
                                value={data.nominal}
                                onChange={onHandleChange}
                                min={0}
                                onInput={(e) => {
                                    if (e.target.value < 0) {
                                        e.target.value = 0;
                                    }
                                }}
                            />
                            {errors.nominal && <InputError message={errors.nominal} className="mt-2" />}
                        </div>
                        <div className="flex flex-col gap-y-2">
                            <Label htmlFor="monthly_saving" className="text-sm font-semibold">
                                Tabungan Bulanan (Rp) <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                type="number"
                                name="monthly_saving"
                                id="monthly_saving"
                                placeholder="Masukkan Tabungan Bulanan"
                                value={data.monthly_saving}
                                onChange={onHandleChange}
                                min={0}
                                onInput={(e) => {
                                    if (e.target.value < 0) {
                                        e.target.value = 0;
                                    }
                                }}
                            />
                            {errors.monthly_saving && <InputError message={errors.monthly_saving} className="mt-2" />}
                        </div>
                        <div className="flex flex-col gap-y-2">
                            <Label htmlFor="beginning_balance" className="text-sm font-semibold">
                                Saldo Awal (Rp) <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                type="number"
                                name="beginning_balance"
                                id="beginning_balance"
                                placeholder="Masukkan Saldo Awal"
                                value={data.beginning_balance}
                                onChange={onHandleChange}
                                min={0}
                                onInput={(e) => {
                                    if (e.target.value < 0) {
                                        e.target.value = 0;
                                    }
                                }}
                            />
                            {errors.beginning_balance && (
                                <InputError message={errors.beginning_balance} className="mt-2" />
                            )}
                        </div>

                        <div className="mt-8 flex flex-col gap-2 lg:flex-row lg:justify-end">
                            <Button type="button" variant="ghost" size="xl" onClick={() => reset()}>
                                Reset
                            </Button>
                            <Button type="submit" variant="emerald" size="xl" disabled={processing}>
                                <IconChecks />
                                Submit
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}

Create.layout = (page) => <AppLayout title={page.props.page_settings.title} children={page} />;
