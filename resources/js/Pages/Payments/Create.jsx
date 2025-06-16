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
import { IconArrowBack, IconChecks, IconCreditCardPay } from '@tabler/icons-react';
import { toast } from 'sonner';

export default function Create(props) {
    const { data, setData, errors, post, processing, reset } = useForm({
        name: '',
        type: '',
        account_number: '',
        account_owner: '',
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
                            icon={IconCreditCardPay}
                        />

                        <Button variant="emerald" size="xl" asChild>
                            <Link href={route('payments.index')}>
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
                                Nama
                            </Label>
                            <Input
                                type="text"
                                name="name"
                                id="name"
                                placeholder="Masukkan Nama Pembayaran"
                                value={data.name}
                                onChange={onHandleChange}
                            />
                            {errors.name && <InputError message={errors.name} className="mt-2" />}
                        </div>
                        <div className="flex flex-col gap-y-2">
                            <Label htmlFor="type" className="text-sm font-semibold">
                                Tipe
                            </Label>
                            <Select defaultValue={data.type} onValueChange={(value) => setData('type', value)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Pilih Tipe Pembayaran" />
                                </SelectTrigger>
                                <SelectContent>
                                    {props.payment_types.map((type, index) => (
                                        <SelectItem key={index} value={type.value}>
                                            {type.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.type && <InputError message={errors.type} className="mt-2" />}
                        </div>
                        <div className="flex flex-col gap-y-2">
                            <Label htmlFor="account_number" className="text-sm font-semibold">
                                No. Rekening
                            </Label>
                            <Input
                                type="text"
                                name="account_number"
                                id="account_number"
                                placeholder="Masukkan No. Rekening"
                                value={data.account_number}
                                onChange={onHandleChange}
                            />
                            {errors.account_number && <InputError message={errors.account_number} className="mt-2" />}
                        </div>
                        <div className="flex flex-col gap-y-2">
                            <Label htmlFor="account_owner" className="text-sm font-semibold">
                                Nama Pemilik Rekening
                            </Label>
                            <Input
                                type="text"
                                name="account_owner"
                                id="account_owner"
                                placeholder="Masukkan Nama Pemilik Rekening"
                                value={data.account_owner}
                                onChange={onHandleChange}
                            />
                            {errors.account_owner && <InputError message={errors.account_owner} className="mt-2" />}
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
