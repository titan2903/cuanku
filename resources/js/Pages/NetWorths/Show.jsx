import BreadcrumbHeader from '@/Components/BreadcrumbHeader';
import HeaderTitle from '@/Components/HeaderTitle';
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardHeader } from '@/Components/ui/card';
import AppLayout from '@/Layouts/AppLayout';
import { formatDateIndo, formatToRupiah } from '@/lib/utils';
import { Link } from '@inertiajs/react';
import { IconArrowBack, IconPigMoney } from '@tabler/icons-react';

export default function Show(props) {
    const { netWorth } = props;

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
                    <div className="space-y-4">
                        <p className="text-sm font-semibold">Tujuan Kekayaan Bersih</p>
                        <p className="text-lg">{formatToRupiah(netWorth.net_worth_goal)}</p>
                        <p className="text-sm font-semibold">Transaksi per Bulan</p>
                        <p className="text-lg">{netWorth.transaction_per_month.toLocaleString()}</p>
                        <p className="text-sm font-semibold">Kekayaan Bersih Saat Ini</p>
                        <p className="text-lg">{formatToRupiah(netWorth.current_net_worth)}</p>
                        <p className="text-sm font-semibold">Tanggal Terakhir Diperbarui</p>
                        <p className="text-lg">{formatDateIndo(netWorth.updated_at)}</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

Show.layout = (page) => <AppLayout title={page.props.page_settings.title} children={page} />;
