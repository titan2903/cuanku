import BreadcrumbHeader from '@/Components/BreadcrumbHeader';
import HeaderTitle from '@/Components/HeaderTitle';
import InputError from '@/Components/InputError';
import { Alert, AlertDescription } from '@/Components/ui/alert';
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardHeader } from '@/Components/ui/card';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { Textarea } from '@/Components/ui/textarea';
import { useFilter } from '@/Hooks/use-filter';
import AppLayout from '@/Layouts/AppLayout';
import { flashMessage } from '@/lib/utils';
import { Link, useForm } from '@inertiajs/react';
import { IconArrowBack, IconChecks, IconMoneybagMove } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export default function Create(props) {
    const [params, setParams] = useState(props.state);

    useFilter({
        route: route('expenses.create'),
        values: params,
        only: ['budgets'],
    });

    const { data, setData, errors, post, processing, reset } = useForm({
        date: '',
        description: '',
        nominal: 0,
        type: params.type,
        budget_id: null,
        notes: '',
        payment_id: null,
        month: null,
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
        if (!data.type) {
            clientErrors.type = 'Tipe harus diisi';
            hasError = true;
        }
        if (!data.budget_id && props.budgets.length > 0) {
            clientErrors.budget_id = 'Sumber Pengeluaran harus diisi';
            hasError = true;
        }
        if (!data.payment_id) {
            clientErrors.payment_id = 'Metode Pembayaran harus diisi';
            hasError = true;
        }
        if (!data.date) {
            clientErrors.date = 'Tanggal harus diisi';
            hasError = true;
        }
        if (!data.description) {
            clientErrors.description = 'Deskripsi harus diisi';
            hasError = true;
        }
        if (data.nominal <= 0) {
            clientErrors.nominal = 'Nominal harus lebih besar dari 0';
            hasError = true;
        }
        if (!data.month) {
            clientErrors.month = 'Bulan harus diisi';
            hasError = true;
        }
        if (!data.year) {
            clientErrors.year = 'Tahun harus diisi';
            hasError = true;
        }

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

                toast.success('Pengeluaran berhasil dibuat', {
                    duration: 3000,
                    position: 'top-center',
                    icon: '✅',
                });
                reset();
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

    useEffect(() => {
        setData('type', params.type);
    }, [params.type]);

    return (
        <div className="flex w-full flex-col gap-y-6 pb-32">
            <BreadcrumbHeader items={props.items} />
            {props.budgets.length === 0 && params?.type && (
                <Alert variant="destructive">
                    <AlertDescription>
                        Tipe detail tidak ditemukan pada tipe <strong>{params.type}</strong>. Silakan buat terlebih
                        dahulu pada halaman{' '}
                        <Link href={route('budgets.index')} className="underline">
                            Sumber Pengeluaran
                        </Link>
                        .
                    </AlertDescription>
                </Alert>
            )}
            <Card>
                <CardHeader>
                    <div className="flex flex-col items-start justify-between gap-y-4 lg:flex-row lg:items-center">
                        <HeaderTitle
                            title={props.page_settings.title}
                            subtitle={props.page_settings.subtitle}
                            icon={IconMoneybagMove}
                        />
                        <Button variant="emerald" size="xl" asChild>
                            <Link href={route('expenses.index')}>
                                <IconArrowBack className="size-4" />
                                Kembali
                            </Link>
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <form className="space-y-4" onSubmit={onHandleSubmit}>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="type" className="text-sm font-semibold">
                                Tipe <span className="text-red-500">*</span>
                            </Label>
                            <Select
                                value={params.type}
                                onValueChange={(value) => setParams({ ...params, type: value })}
                            >
                                <SelectTrigger>
                                    {props.types.find((type) => type.value == data.type)?.label ?? 'Pilih Tipe'}
                                </SelectTrigger>
                                <SelectContent>
                                    {props.types.map((type, index) => (
                                        <SelectItem key={index} value={type.value}>
                                            {type.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.type && <InputError message={errors.type} />}
                        </div>
                        {props.budgets.length > 0 && (
                            <div className="flex flex-col gap-y-2">
                                <Label htmlFor="budget_id" className="text-sm font-semibold">
                                    Sumber Pengeluaran <span className="text-red-500">*</span>
                                </Label>
                                <Select
                                    defaultValue={data.budget_id}
                                    onValueChange={(value) => setData('budget_id', value)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Pilih Sumber Pengeluaran" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {props.budgets.map((budget, index) => (
                                            <SelectItem key={index} value={budget.value}>
                                                {budget.label} - ({budget.month}/{budget.year})
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.budget_id && <InputError message={errors.budget_id} />}
                            </div>
                        )}
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="payment_id" className="text-sm font-semibold">
                                Metode Pembayaran <span className="text-red-500">*</span>
                            </Label>
                            <Select
                                defaultValue={data.payment_id}
                                onValueChange={(value) => setData('payment_id', value)}
                            >
                                <SelectTrigger>
                                    <SelectValue>
                                        {props.payments.find((payment) => payment.value == data.payment_id)?.label ??
                                            'Pilih Metode Pembayaran'}
                                    </SelectValue>
                                </SelectTrigger>
                                <SelectContent>
                                    {props.payments.map((payment, index) => (
                                        <SelectItem key={index} value={payment.value}>
                                            {payment.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.payment_id && <InputError message={errors.payment_id} />}
                        </div>
                        <div className="flex flex-col gap-y-2">
                            <Label htmlFor="date" className="text-sm font-semibold">
                                Tanggal <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                type="date"
                                name="date"
                                id="date"
                                placeholder="Masukkan Tanggal Pengeluaran"
                                value={data.date}
                                onChange={onHandleChange}
                            />
                            {errors.date && <InputError message={errors.date} />}
                        </div>
                        <div className="flex flex-col gap-y-2">
                            <Label htmlFor="description" className="text-sm font-semibold">
                                Deskripsi <span className="text-red-500">*</span>
                            </Label>
                            <Textarea
                                name="description"
                                id="description"
                                placeholder="Masukkan Deskripsi Pengeluaran"
                                onChange={onHandleChange}
                                value={data.description}
                            />
                            {errors.description && <InputError message={errors.description} />}
                        </div>
                        <div className="flex flex-col gap-y-2">
                            <Label htmlFor="nominal" className="text-sm font-semibold">
                                Nominal <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                type="number"
                                name="nominal"
                                id="nominal"
                                placeholder="Masukkan Nominal Pengeluaran"
                                value={data.nominal}
                                onChange={onHandleChange}
                                min={0}
                                onInput={(e) => {
                                    if (e.target.value < 0) {
                                        e.target.value = 0;
                                    }
                                }}
                            />
                            {errors.nominal && <InputError message={errors.nominal} />}
                        </div>
                        <div className="flex flex-col gap-y-2">
                            <Label htmlFor="notes" className="text-sm font-semibold">
                                Catatan
                            </Label>
                            <Textarea
                                name="notes"
                                id="notes"
                                placeholder="Masukkan Catatan Pengeluaran"
                                onChange={onHandleChange}
                                value={data.notes}
                            />
                            {errors.notes && <InputError message={errors.notes} />}
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="month" className="text-sm font-semibold">
                                Bulan <span className="text-red-500">*</span>
                            </Label>
                            <Select defaultValue={data.month} onValueChange={(value) => setData('month', value)}>
                                <SelectTrigger>
                                    <SelectValue>
                                        {props.months.find((month) => month.value == data.month)?.label ??
                                            'Pilih Bulan'}
                                    </SelectValue>
                                </SelectTrigger>
                                <SelectContent>
                                    {props.months.map((month, index) => (
                                        <SelectItem key={index} value={month.value}>
                                            {month.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.month && <InputError message={errors.month} />}
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="year" className="text-sm font-semibold">
                                Tahun <span className="text-red-500">*</span>
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
