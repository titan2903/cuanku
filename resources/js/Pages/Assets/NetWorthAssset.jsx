import InputError from '@/Components/InputError';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/Components/ui/sheet';
import { flashMessage } from '@/lib/utils';
import { useForm } from '@inertiajs/react';
import { IconCheck } from '@tabler/icons-react';
import { toast } from 'sonner';

export default function NetWorthAsset({ asset }) {
    const { data, setData, reset, errors, post, processing } = useForm({
        transaction_date: '',
        nominal: 0,
    });

    const onHandleChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    const onHandleSubmit = (e) => {
        e.preventDefault();
        post(route('net-worth-asset', [asset.net_worth_id, asset.id]), {
            preserveScroll: true,
            preserveState: true,
            onSuccess: (success) => {
                const flash = flashMessage(success);
                if (flash) toast[flash.type](flash.message);
            },
        });
    };

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="yellow" size="sm">
                    Aset Kekayaan Bersih
                </Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Aset Kekayaan Bersih</SheetTitle>
                    <SheetDescription>Tambah aset kekayaan bersih berdasarkan tanggal dimasukkannya.</SheetDescription>
                </SheetHeader>
                <form className="mt-4 space-y-4" onSubmit={onHandleSubmit}>
                    <div className="grid grid-cols-1 lg:grid-cols-2">
                        <div className="col-span-full">
                            <Label htmlFor="transaction_date">
                                Tanggal Transaksi <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                type="date"
                                name="transaction_date"
                                id="transaction_date"
                                value={data.transaction_date}
                                onChange={onHandleChange}
                                placeholder="Pilih Tanggal Transaksi"
                            />
                            {errors.transaction_date && <InputError message={errors.transaction_date} />}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2">
                        <div className="col-span-full">
                            <Label htmlFor="nominal">
                                Nominal <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                type="number"
                                name="nominal"
                                id="nominal"
                                value={data.nominal}
                                onChange={onHandleChange}
                                placeholder="Masukkan Nominal Aset"
                                min={0}
                                onInput={(e) => {
                                    if (e.target.value < 0) {
                                        e.target.value = 0;
                                    }
                                }}
                            />
                            {errors.nominal && <InputError message={errors.nominal} />}
                        </div>
                    </div>
                    <div className="mt-8 flex-col gap-2 lg:flex-row lg:justify-end">
                        <Button type="button" variant="ghost" size="xl" onClick={() => reset()}>
                            Reset
                        </Button>
                        <Button type="submit" variant="emerald" size="xl" disabled={processing}>
                            <IconCheck />
                            Submit
                        </Button>
                    </div>
                </form>
            </SheetContent>
        </Sheet>
    );
}
