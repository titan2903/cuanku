import BreadcrumbHeader from '@/Components/BreadcrumbHeader';
import CardStat from '@/Components/CardStat';
import EmptyState from '@/Components/EmptyState';
import HeaderTitle from '@/Components/HeaderTitle';
import { Alert, AlertDescription, AlertTitle } from '@/Components/ui/alert';
import { Badge } from '@/Components/ui/badge';
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card';
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/Components/ui/table';
import AppLayout from '@/Layouts/AppLayout';
import {
    ASSETDESCRIPTION,
    ASSETTYPEVARIANTS,
    formatDateIndo,
    formatToRupiah,
    LIABILITYDESCRIPTION,
    LIABILITYTYPEVARIANT,
} from '@/lib/utils';
import { Link } from '@inertiajs/react';
import {
    IconArrowBack,
    IconCash,
    IconCashHeart,
    IconInfoCircle,
    IconMoneybagMinus,
    IconPigMoney,
    IconX,
} from '@tabler/icons-react';

export default function Show(props) {
    const { netWorth } = props;
    
    const netWorthAssets = props.netWorthAssets;
    const netWorthLiabilities = props.netWorthLiabilities;

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
            </Card>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                <CardStat
                    data={{
                        title: 'Tujuan Kekayaan Bersih',
                        icon: IconPigMoney,
                        background: 'text-white bg-gradient-to-r from-orange-400 via-orange-500 to-orange-500',
                    }}
                >
                    <div className="text-2xl font-bold">{formatToRupiah(netWorth.net_worth_goal)}</div>
                </CardStat>
                <CardStat
                    data={{
                        title: 'Kekayaan Bersih Saat Ini',
                        icon: IconCash,
                        background: 'text-white bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-500',
                    }}
                >
                    <div className="text-2xl font-bold">{formatToRupiah(netWorth.current_net_worth)}</div>
                </CardStat>
                <CardStat
                    data={{
                        title: 'Jumlah Yang Tersisa',
                        icon: IconCashHeart,
                        background: 'text-white bg-gradient-to-r from-red-400 via-red-500 to-red-500',
                    }}
                >
                    <div className="text-2xl font-bold">{formatToRupiah(netWorth.amount_left)}</div>
                </CardStat>
            </div>

            <Alert variant="info" className="mt-4">
                <IconInfoCircle className="size-6" />
                <AlertTitle>Aset</AlertTitle>
                <AlertDescription>
                    Aset adalah sesuatu yang dimiliki oleh individu atau entitas yang memiliki nilai ekonomi. Aset dapat
                    berupa uang tunai, properti, investasi, atau barang berharga lainnya. Dalam konteks kekayaan bersih,
                    aset adalah komponen penting yang berkontribusi pada total kekayaan bersih seseorang.
                </AlertDescription>
            </Alert>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
                <CardStat
                    data={{
                        title: 'Total Kas',
                        icon: IconCash,
                        background: 'text-white bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-500',
                    }}
                >
                    <div className="text-2xl font-bold">{formatToRupiah(props.assetSum.assetCashNominalSum)}</div>
                </CardStat>
                <CardStat
                    data={{
                        title: 'Total Personal',
                        icon: IconCash,
                        background: 'text-white bg-gradient-to-r from-orange-400 via-orange-500 to-orange-500',
                    }}
                >
                    <div className="text-2xl font-bold">{formatToRupiah(props.assetSum.assetPersonalNominalSum)}</div>
                </CardStat>
                <CardStat
                    data={{
                        title: 'Total Investasi Jangka Pendek',
                        icon: IconCash,
                        background: 'text-white bg-gradient-to-r from-red-400 via-red-500 to-red-500',
                    }}
                >
                    <div className="text-2xl font-bold">{formatToRupiah(props.assetSum.assetShortTermNominalSum)}</div>
                </CardStat>
                <CardStat
                    data={{
                        title: 'Total Investasi Jangka Menengah',
                        icon: IconCash,
                        background: 'text-white bg-gradient-to-r from-sky-400 via-sky-500 to-sky-500',
                    }}
                >
                    <div className="text-2xl font-bold">{formatToRupiah(props.assetSum.assetMidTermNominalSum)}</div>
                </CardStat>
                <CardStat
                    data={{
                        title: 'Total Investasi Jangka Panjang',
                        icon: IconCash,
                        background: 'text-white bg-gradient-to-r from-purple-400 via-purple-500 to-purple-500',
                    }}
                >
                    <div className="text-2xl font-bold">{formatToRupiah(props.assetSum.assetLongTermNominalSum)}</div>
                </CardStat>
            </div>

            {Object.keys(netWorthAssets).map((assetTypeKey, index) => {
                const assetsInCategory = netWorthAssets[assetTypeKey];
                const allTransactions = assetsInCategory.flatMap((asset) => asset.transactions);

                const uniqueSortedDates = [
                    ...new Set(allTransactions.map((t) => t.transaction_date).filter(Boolean)),
                ].sort((a, b) => new Date(a) - new Date(b));

                return (
                    <Card key={index}>
                        <CardHeader>
                            <CardTitle>
                                <Badge variant={ASSETTYPEVARIANTS[assetTypeKey]}>{assetTypeKey}</Badge>
                            </CardTitle>
                            <CardDescription>
                                {ASSETDESCRIPTION[assetTypeKey] ?? 'Tidak ada deskripsi tersedia untuk aset ini.'}
                            </CardDescription>
                        </CardHeader>
                        {assetsInCategory.length === 0 ? (
                            <EmptyState
                                icon={IconPigMoney}
                                title={`Tidak ada aset yang ditemukan (${assetTypeKey})`}
                                subtitle={`Mulailah dengan membuat aset (${assetTypeKey}) baru`}
                            />
                        ) : (
                            <CardContent className="p-0 [&-td]:whitespace-nowrap [&-td]:px-6 [&-th]:px-6">
                                <Table className="w-full">
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="border">#</TableHead>
                                            <TableHead className="border">Detail</TableHead>
                                            <TableHead className="border">Tujuan</TableHead>
                                            {uniqueSortedDates.map((date, idx) => (
                                                <TableHead key={idx} className="border text-center text-xs">
                                                    {formatDateIndo(date)}
                                                </TableHead>
                                            ))}
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {assetsInCategory.map((asset, assetIndex) => (
                                            <TableRow key={assetIndex}>
                                                <TableCell>{assetIndex + 1}</TableCell>
                                                <TableCell>{asset.detail}</TableCell>
                                                <TableCell>{asset.goal}</TableCell>
                                                {uniqueSortedDates.map((date, dateIndex) => {
                                                    const transaction = asset.transactions.find(
                                                        (t) => t.transaction_date === date,
                                                    );
                                                    return (
                                                        <TableCell key={dateIndex}>
                                                            {transaction ? (
                                                                formatToRupiah(transaction.nominal)
                                                            ) : (
                                                                <IconX className="mx-auto size-4 text-red-500" />
                                                            )}
                                                        </TableCell>
                                                    );
                                                })}
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                    <TableFooter className="bg-gradient-to-br from-emerald-500 via-emerald-500 to-yellow-200 font-bold text-white">
                                        <TableRow>
                                            <TableCell colSpan={3} className="border">
                                                Total
                                            </TableCell>
                                            {uniqueSortedDates.map((date, dateIndex) => (
                                                <TableCell key={`total-${dateIndex}`} className="border">
                                                    {formatToRupiah(
                                                        assetsInCategory.reduce((acc, asset) => {
                                                            const transaction = asset.transactions.find(
                                                                (t) => t.transaction_date === date,
                                                            );
                                                            return acc + (transaction?.nominal || 0);
                                                        }, 0),
                                                    )}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    </TableFooter>
                                </Table>
                            </CardContent>
                        )}
                    </Card>
                );
            })}

            <Alert variant="info" className="mt-4">
                <IconInfoCircle className="size-6" />
                <AlertTitle>Liabilitas</AlertTitle>
                <AlertDescription>
                    Liabilitas adalah kewajiban finansial yang dimiliki oleh individu atau entitas, seperti utang,
                    pinjaman, atau kewajiban lainnya. Dalam konteks kekayaan bersih, liabilitas adalah komponen penting
                    yang harus diperhitungkan untuk menentukan total kekayaan bersih seseorang.
                </AlertDescription>
            </Alert>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                <CardStat
                    data={{
                        title: 'Total Hutang Jangka Pendek',
                        icon: IconMoneybagMinus,
                        background: 'text-white bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-500',
                    }}
                >
                    <div className="text-2xl font-bold">
                        {formatToRupiah(props.liabilitySum.liabilityShortTermDebtNominalSum)}
                    </div>
                </CardStat>
                <CardStat
                    data={{
                        title: 'Total Hutang Jangka Menengah',
                        icon: IconMoneybagMinus,
                        background: 'text-white bg-gradient-to-r from-rose-400 via-rose-500 to-rose-500',
                    }}
                >
                    <div className="text-2xl font-bold">
                        {formatToRupiah(props.liabilitySum.liabilityMidtTermDebtNominalSum)}
                    </div>
                </CardStat>
                <CardStat
                    data={{
                        title: 'Total Hutang Jangka Panjang',
                        icon: IconMoneybagMinus,
                        background: 'text-white bg-gradient-to-r from-red-400 via-red-500 to-red-500',
                    }}
                >
                    <div className="text-2xl font-bold">
                        {formatToRupiah(props.liabilitySum.liabilityLongTermDebtNominalSum)}
                    </div>
                </CardStat>
            </div>

            {Object.keys(netWorthLiabilities).map((liabilityTypeKey, index) => {
                const liabilitiesInCategory = netWorthLiabilities[liabilityTypeKey];
                const allTransactions = liabilitiesInCategory.flatMap((liability) => liability.transactions);

                const uniqueSortedDates = [
                    ...new Set(allTransactions.map((t) => t.transaction_date).filter(Boolean)),
                ].sort((a, b) => new Date(a) - new Date(b));

                return (
                    <Card key={index}>
                        <CardHeader>
                            <CardTitle>
                                <Badge variant={LIABILITYTYPEVARIANT[liabilityTypeKey]}>{liabilityTypeKey}</Badge>
                            </CardTitle>
                            <CardDescription>
                                {LIABILITYDESCRIPTION[liabilityTypeKey] ??
                                    'Tidak ada deskripsi tersedia untuk liabilitas ini.'}
                            </CardDescription>
                        </CardHeader>
                        {liabilitiesInCategory.length === 0 ? (
                            <EmptyState
                                icon={IconMoneybagMinus}
                                title={`Tidak ada liabilitas yang ditemukan (${liabilityTypeKey})`}
                                subtitle={`Mulailah dengan membuat liabilitas (${liabilityTypeKey}) baru`}
                            />
                        ) : (
                            <CardContent className="p-0 [&-td]:whitespace-nowrap [&-td]:px-6 [&-th]:px-6">
                                <Table className="w-full">
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="border">#</TableHead>
                                            <TableHead className="border">Detail</TableHead>
                                            <TableHead className="border">Tujuan</TableHead>
                                            {uniqueSortedDates.map((date, idx) => (
                                                <TableHead key={idx} className="border text-center text-xs">
                                                    {formatDateIndo(date)}
                                                </TableHead>
                                            ))}
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {liabilitiesInCategory.map((liability, liabilityIndex) => (
                                            <TableRow key={liabilityIndex}>
                                                <TableCell>{liabilityIndex + 1}</TableCell>
                                                <TableCell>{liability.detail}</TableCell>
                                                <TableCell>{liability.goal}</TableCell>
                                                {uniqueSortedDates.map((date, dateIndex) => {
                                                    const transaction = liability.transactions.find(
                                                        (t) => t.transaction_date === date,
                                                    );
                                                    return (
                                                        <TableCell key={dateIndex}>
                                                            {transaction ? (
                                                                formatToRupiah(transaction.nominal)
                                                            ) : (
                                                                <IconX className="mx-auto size-4 text-red-500" />
                                                            )}
                                                        </TableCell>
                                                    );
                                                })}
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                    <TableFooter className="bg-gradient-to-br from-emerald-500 via-emerald-500 to-yellow-200 font-bold text-white">
                                        <TableRow>
                                            <TableCell colSpan={3} className="border">
                                                Total
                                            </TableCell>
                                            {uniqueSortedDates.map((date, dateIndex) => (
                                                <TableCell key={`total-${dateIndex}`} className="border">
                                                    {formatToRupiah(
                                                        liabilitiesInCategory.reduce((acc, liability) => {
                                                            const transaction = liability.transactions.find(
                                                                (t) => t.transaction_date === date,
                                                            );
                                                            return acc + (transaction?.nominal || 0);
                                                        }, 0),
                                                    )}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    </TableFooter>
                                </Table>
                            </CardContent>
                        )}
                    </Card>
                );
            })}
        </div>
    );
}

Show.layout = (page) => <AppLayout title={page.props.page_settings.title} children={page} />;
