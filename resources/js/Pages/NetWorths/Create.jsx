import BreadcrumbHeader from '@/Components/BreadcrumbHeader';
import HeaderTitle from '@/Components/HeaderTitle';
import InputError from '@/Components/InputError';
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardHeader } from '@/Components/ui/card';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import AppLayout from '@/Layouts/AppLayout';
import { flashMessage } from '@/lib/utils';
import { Link, useForm } from '@inertiajs/react';
import { IconArrowBack, IconChecks, IconPigMoney } from '@tabler/icons-react';
import { toast } from 'sonner';

export default function Create(props) {
    const { data, setData, errors, post, processing, reset } = useForm({
        net_worth_goal: 0,
        transaction_per_month: 1,
        year: null,
        _method: props.page_settings.method,
    });

    const onHandleChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    const onHandleSubmit = (e) => {
        e.preventDefault();

        const clientErrors = {};
        let hasError = false;
        if (data.net_worth_goal <= 0) {
            clientErrors.net_worth_goal = 'Tujuan Kekayaan Bersih harus lebih besar dari 0';
            hasError = true;
        }
        if (data.transaction_per_month <= 0) {
            clientErrors.transaction_per_month = 'Transaksi per Bulan harus lebih besar dari 0';
            hasError = true;
        }
        if (!data.year) {
            clientErrors.year = 'Tahun harus dipilih';
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

                toast.success('Kekayaan bersih berhasil ditambahkan', {
                    duration: 3000,
                    position: 'top-center',
                    icon: '✅',
                });
                reset();
            },
            // onError: (errors) => {
            //     const formattedErrors = Object.values(errors).join(', ');
            //     toast.error(`Terjadi kesalahan: ${formattedErrors}`, {
            //         duration: 3000,
            //         position: 'top-center',
            //     });
            // },
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
                            icon={IconPigMoney}
                        />

                        <Button variant="emerald" size="xl" asChild>
                            <Link href={route('net-worths.index')}>
                                <IconArrowBack className="size-4" />
                                Kembali
                            </Link>
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <form className="space-y-4" onSubmit={onHandleSubmit}>
                        <div className="flex flex-col gap-y-2">
                            <Label htmlFor="net_worth_goal" className="text-sm font-semibold">
                                Tujuan Kekayaan Bersih <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                type="number"
                                name="net_worth_goal"
                                id="net_worth_goal"
                                placeholder="Masukkan Tujuan Kekayaan Bersih"
                                value={data.net_worth_goal}
                                onChange={onHandleChange}
                                min={0}
                                onInput={(e) => {
                                    if (e.target.value < 0) {
                                        e.target.value = 0;
                                    }
                                }}
                            />
                            {errors.net_worth_goal && <InputError message={errors.net_worth_goal} />}
                        </div>
                        <div className="flex flex-col gap-y-2">
                            <Label htmlFor="transaction_per_month" className="text-sm font-semibold">
                                Transaksi per Bulan <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                type="number"
                                name="transaction_per_month"
                                id="transaction_per_month"
                                placeholder="Masukkan Transaksi per Bulan"
                                value={data.transaction_per_month}
                                onChange={onHandleChange}
                                min={0}
                                onInput={(e) => {
                                    if (e.target.value < 0) {
                                        e.target.value = 0;
                                    }
                                }}
                            />
                            {errors.transaction_per_month && <InputError message={errors.transaction_per_month} />}
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="year" className="text-sm font-semibold">
                                Pilih Tahun
                            </Label>
                            <Select defaultValue={data.year} onValueChange={(value) => setData('year', value)}>
                                <SelectTrigger>
                                    <SelectValue>
                                        {props.years.find((year) => year == data.year) ?? 'Pilih Tahun'}
                                    </SelectValue>
                                </SelectTrigger>
                                <SelectContent>
                                    {props.years.map((year, index) => (
                                        <SelectItem key={index} value={year.toString()}>
                                            {year}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.year && <InputError message={errors.year} />}
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
