import BreadcrumbHeader from '@/Components/BreadcrumbHeader';
import HeaderTitle from '@/Components/HeaderTitle';
import InputError from '@/Components/InputError';
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardHeader } from '@/Components/ui/card';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { Textarea } from '@/Components/ui/textarea';
import AppLayout from '@/Layouts/AppLayout';
import { flashMessage } from '@/lib/utils';
import { Link, useForm } from '@inertiajs/react';
import { IconArrowBack, IconChecks, IconDoorEnter } from '@tabler/icons-react';
import { toast } from 'sonner';

export default function Edit(props) {
    const { data, setData, errors, post, processing, reset } = useForm({
        budget_id: props.income.budget_id ?? null,
        date: props.income.date ?? '',
        nominal: props.income.nominal ?? '',
        notes: props.income.notes ?? '',
        month: props.income.month ?? null,
        year:   props.income.year ?? null,
        _method: props.page_settings.method,
    });

    const onHandleChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    const onHandleSubmit = (e) => {
        e.preventDefault();
        post(props.page_settings.action, {
            preserveScroll: true,
            preserveState: true,
            onSuccess: (success) => {
                const flash = flashMessage(success);
                if (flash) toast[flash.type](flash.message);
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
                            icon={IconDoorEnter}
                        />

                        <Button variant="emerald" size="xl" asChild>
                            <Link href={route('incomes.index')}>
                                <IconArrowBack className="size-4" />
                                Kembali
                            </Link>
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <form className="space-y-4" onSubmit={onHandleSubmit}>
                        <div className="flex flex-col gap-y-2">
                            <Label htmlFor="budget_id" className="text-sm font-semibold">
                                Sumber
                            </Label>
                            <Select defaultValue={data.budget_id} onValueChange={(value) => setData('budget_id', value)}>
                                <SelectTrigger>
                                    <SelectValue>
                                        {props.sources.find((type) => type.value == data.budget_id)?.label ?? 'Pilih Tipe'}
                                    </SelectValue>
                                </SelectTrigger>
                                <SelectContent>
                                    {props.sources.map((type, index) => (
                                        <SelectItem key={index} value={type.value}>
                                            {type.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.budget_id && <InputError message={errors.budget_id} />}
                        </div>
                        <div className="flex flex-col gap-y-2">
                            <Label htmlFor="date" className="text-sm font-semibold">
                                Tanggal
                            </Label>
                            <Input
                                type="date"
                                name="date"
                                id="date"
                                placeholder="Masukkan Tanggal Pemasukan"
                                value={data.date}
                                onChange={onHandleChange}
                            />
                            {errors.date && <InputError message={errors.date} />}
                        </div>
                        <div className="flex flex-col gap-y-2">
                            <Label htmlFor="nominal" className="text-sm font-semibold">
                                Nominal
                            </Label>
                            <Input
                                type="number"
                                name="nominal"
                                id="nominal"
                                placeholder="Masukkan Nominal Pemasukan"
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
                                placeholder="Masukkan Catatan Pemasukan"
                                onChange={onHandleChange}
                                value={data.notes}
                            />
                            {errors.notes && <InputError message={errors.notes} />}
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="month" className="text-sm font-semibold">
                                Bulan
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
                                Tahun
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

Edit.layout = (page) => <AppLayout title={page.props.page_settings.title} children={page} />;
