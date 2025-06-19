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
import { IconArrowBack, IconChecks, IconDiamond } from '@tabler/icons-react';
import { toast } from 'sonner';

export default function Create(props) {
    const { data, setData, errors, post, processing, reset } = useForm({
        detail: '',
        goal: '',
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
                            icon={IconDiamond}
                        />

                        <Button variant="emerald" size="xl" asChild>
                            <Link href={route('assets.index', [props.netWorth])}>
                                <IconArrowBack className="size-4" />
                                Kembali
                            </Link>
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <form className="space-y-4" onSubmit={onHandleSubmit}>
                        <div className="flex flex-col gap-y-2">
                            <Label htmlFor="detail" className="text-sm font-semibold">
                                Detail
                            </Label>
                            <Input
                                type="text"
                                name="detail"
                                id="detail"
                                placeholder="Masukkan Detail Aset"
                                value={data.detail}
                                onChange={onHandleChange}
                            />
                            {errors.detail && <InputError message={errors.detail} />}
                        </div>
                        <div className="flex flex-col gap-y-2">
                            <Label htmlFor="goal" className="text-sm font-semibold">
                                Tujuan
                            </Label>
                            <Input
                                type="text"
                                name="goal"
                                id="goal"
                                placeholder="Masukkan Tujuan"
                                value={data.goal}
                                onChange={onHandleChange}
                            />
                            {errors.goal && <InputError message={errors.goal} />}
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="type" className="text-sm font-semibold">
                                Tipe
                            </Label>
                            <Select defaultValue={data.type} onValueChange={(value) => setData('type', value)}>
                                <SelectTrigger>
                                    <SelectValue>
                                        {props.assetTypes.find((type) => type.value == data.type)?.label ??
                                            'Pilih Tipe Aset'}
                                    </SelectValue>
                                </SelectTrigger>
                                <SelectContent>
                                    {props.assetTypes.map((type, index) => (
                                        <SelectItem key={index} value={type.value}>
                                            {type.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.type && <InputError message={errors.type} />}
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
