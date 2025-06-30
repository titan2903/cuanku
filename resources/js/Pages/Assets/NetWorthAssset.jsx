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
        // Validasi client-side
        const clientErrors = {};
        let hasError = false;
        if (!data.transaction_date) {
            clientErrors.transaction_date = 'Tanggal Transaksi harus diisi';
            hasError = true;
        }
        if (!data.nominal) {
            clientErrors.nominal = 'Nominal harus diisi';
            hasError = true;
        } else if (data.nominal <= 0) {
            clientErrors.nominal = 'Nominal tidak boleh kurang dari atau sama dengan 0';
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

        post(route('net-worth-asset', [asset.net_worth_id, asset.id]), {
            preserveScroll: true,
            preserveState: true,
            onSuccess: (success) => {
                const flash = flashMessage(success);
                if (flash) toast[flash.type](flash.message);

                toast.success('Aset kekayaan bersih berhasil ditambahkan', {
                    duration: 3000,
                    position: 'top-center',
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
