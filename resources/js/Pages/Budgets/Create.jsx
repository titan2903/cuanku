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
import { IconArrowBack, IconChartArrowsVertical, IconChecks } from '@tabler/icons-react';
import { toast } from 'sonner';

export default function Create(props) {
    const { data, setData, errors, post, processing, reset } = useForm({
        detail: '',
        nominal: 0,
        month: null,
        year: null,
        type: null,
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
                            icon={IconChartArrowsVertical}
                        />

                        <Button variant="emerald" size="xl" asChild>
                            <Link href={route('budgets.index')}>
                                <IconArrowBack className="size-4" />
                                Kembali
                            </Link>
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <form className="space-y-4" onSubmit={onHandleSubmit}>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="detail" className="text-sm font-semibold">
                                Rincian
                            </Label>
                            <Input
                                type="text"
                                name="detail"
                                id="detail"
                                placeholder="Masukkan Rincian Anggaran"
                                value={data.detail}
                                onChange={onHandleChange}
                            />
                            {errors.detail && <InputError message={errors.detail} />}
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="account_owner" className="text-sm font-semibold">
                                Nominal
                            </Label>
                            <Input
                                type="number"
                                name="nominal"
                                id="nominal"
                                placeholder="Masukkan Nominal Anggaran"
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
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="type" className="text-sm font-semibold">
                                Tipe
                            </Label>
                            <Select defaultValue={data.type} onValueChange={(value) => setData('type', value)}>
                                <SelectTrigger>
                                    <SelectValue>
                                        {props.types.find((type) => type.value == data.type)?.label ?? 'Pilih Tipe'}
                                    </SelectValue>
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

Create.layout = (page) => <AppLayout title={page.props.page_settings.title} children={page} />;
