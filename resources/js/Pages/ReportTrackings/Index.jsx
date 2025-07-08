import BreadcrumbHeader from '@/Components/BreadcrumbHeader';
import CardStat from '@/Components/CardStat';
import EmptyState from '@/Components/EmptyState';
import HeaderTitle from '@/Components/HeaderTitle';
import { Badge } from '@/Components/ui/badge';
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/Components/ui/table';
import { useFilter } from '@/Hooks/use-filter';
import AppLayout from '@/Layouts/AppLayout';
import { BUDGETTYPEVARIANTS, formatDateIndo, formatToRupiah } from '@/lib/utils';
import {
    IconCash,
    IconDownload,
    IconInvoice,
    IconLogs,
    IconMoneybagMinus,
    IconMoneybagMove,
    IconMoneybagMoveBack,
    IconPigMoney,
    IconShoppingBag,
} from '@tabler/icons-react';
import { useState } from 'react';

export default function Index(props) {
    const overviews = props.overviews;
    const cashFlows = props.cashFlows;

    const budgetIncomes = props.reports.budgetIncomes.data;
    const budgetSavings = props.reports.budgetSavings.data;
    const budgetDebts = props.reports.budgetDebts.data;
    const budgetBills = props.reports.budgetBills.data;
    const budgetShoppings = props.reports.budgetShoppings.data;

    const incomeTrackers = props.incomeTrackers;
    const expenseTrackers = props.expenseTrackers;

    const [params, setParams] = useState(props.state);

    useFilter({
        route: route('report-trackings'),
        values: params,
        only: ['reports', 'incomeTrackers', 'expenseTrackers'],
    });

    const handleDownloadPdf = () => {
        const filterDate = `${params.year}-${params.month.toString().padStart(2, '0')}`;
        const url = route('report-trackings.download-pdf', { filter_date: filterDate });
        window.open(url, '_blank');
    };

    return (
        <div className="flex w-full flex-col gap-y-6 pb-32">
            <BreadcrumbHeader items={props.items} />
            <Card>
                <CardHeader className="p-0">
                    <div className="flex flex-col items-start justify-between gap-y-4 p-4 lg:flex-row lg:items-center">
                        <HeaderTitle
                            title={props.page_settings.title}
                            subtitle={props.page_settings.subtitle}
                            icon={IconLogs}
                        />

                        <div className="flex flex-row gap-x-4">
                            <Button
                                onClick={handleDownloadPdf}
                                variant="outline"
                                size="sm"
                                className="flex items-center gap-x-2 hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700 w-full sm:w-auto sm:min-w-[140px]"
                            >
                                <IconDownload className="h-4 w-4" />
                                Download PDF
                            </Button>
                            <Select
                                value={params.month}
                                onValueChange={(value) => setParams({ ...params, month: value })}
                            >
                                <SelectTrigger className="w-full sm:w-24">
                                    <SelectValue placeholder="Bulan" />
                                </SelectTrigger>
                                <SelectContent>
                                    {props.months.map((month, index) => (
                                        <SelectItem key={index} value={month.value}>
                                            {month.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <Select
                                value={params?.year.toString()}
                                onValueChange={(value) => setParams({ ...params, year: value.toString() })}
                            >
                                <SelectTrigger className="w-full sm:w-24">
                                    <SelectValue placeholder="Tahun" />
                                </SelectTrigger>
                                <SelectContent>
                                    {props.years.map((year, index) => (
                                        <SelectItem key={index} value={year.toString()}>
                                            {year}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </CardHeader>
            </Card>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-6">
                <CardStat
                    data={{
                        title: 'Penghasilan',
                        icon: IconCash,
                        background: 'text-white bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-500',
                    }}
                >
                    <div className="text-2xl font-bold">{formatToRupiah(props.reports.budgetIncomes.total.actual)}</div>
                </CardStat>
                <CardStat
                    data={{
                        title: 'Pengeluaran',
                        icon: IconMoneybagMove,
                        background: 'text-white bg-gradient-to-r from-rose-400 via-rose-500 to-rose-500',
                    }}
                >
                    <div className="text-2xl font-bold">
                        {formatToRupiah(props.reports.budgetExpenses.total.actual)}
                    </div>
                </CardStat>
                <CardStat
                    data={{
                        title: 'Tabungan dan Investasi',
                        icon: IconPigMoney,
                        background: 'text-white bg-gradient-to-r from-orange-400 via-orange-500 to-orange-500',
                    }}
                >
                    <div className="text-2xl font-bold">{formatToRupiah(props.reports.budgetSavings.total.actual)}</div>
                </CardStat>
                <CardStat
                    data={{
                        title: 'Cicilan dan Hutang',
                        icon: IconMoneybagMinus,
                        background: 'text-white bg-gradient-to-r from-red-400 via-red-500 to-red-500',
                    }}
                >
                    <div className="text-2xl font-bold">{formatToRupiah(props.reports.budgetDebts.total.actual)}</div>
                </CardStat>
                <CardStat
                    data={{
                        title: 'Tagihan',
                        icon: IconInvoice,
                        background: 'text-white bg-gradient-to-r from-sky-400 via-sky-500 to-sky-500',
                    }}
                >
                    <div className="text-2xl font-bold">{formatToRupiah(props.reports.budgetBills.total.actual)}</div>
                </CardStat>
                <CardStat
                    data={{
                        title: 'Belanja',
                        icon: IconShoppingBag,
                        background: 'text-white bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-500',
                    }}
                >
                    <div className="text-2xl font-bold">
                        {formatToRupiah(props.reports.budgetShoppings.total.actual)}
                    </div>
                </CardStat>
            </div>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                <div className="col-span-full">
                    <Card>
                        <CardHeader>
                            <CardTitle>Overviews</CardTitle>
                            <CardDescription>
                                Menyajikan dan memanjau ringkasan keuangan secara menyeluruh.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="p-0 [&-td]:whitespace-nowrap [&-td]:px-6 [&-th]:px-6">
                            <Table className="w-full">
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Kategori</TableHead>
                                        <TableHead>Rencana</TableHead>
                                        <TableHead>Aktual</TableHead>
                                        <TableHead>Perbedaan</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {Object.entries(overviews).map(([category, data]) => (
                                        <TableRow key={category}>
                                            <TableCell>
                                                <Badge variant={BUDGETTYPEVARIANTS[category]}>{category}</Badge>
                                            </TableCell>
                                            <TableCell>{formatToRupiah(data.plan)}</TableCell>
                                            <TableCell>{formatToRupiah(data.actual)}</TableCell>
                                            <TableCell>{formatToRupiah(data.difference)}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>

                <div className="col-span-full">
                    <Card>
                        <CardHeader>
                            <CardTitle>Arus Kas</CardTitle>
                            <CardDescription>
                                Melacak pergerakan uang masuk dan keluar dalam periode tertentu untuk memahami pola
                                keuangan Anda.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="p-0 [&-td]:whitespace-nowrap [&-td]:px-6 [&-th]:px-6">
                            <Table className="w-full">
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Arus kas</TableHead>
                                        <TableHead>Rencana</TableHead>
                                        <TableHead>Aktual</TableHead>
                                        <TableHead>Perbedaan</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {Object.entries(cashFlows).map(([category, data]) => (
                                        <TableRow key={category}>
                                            <TableCell>{category}</TableCell>
                                            <TableCell>{formatToRupiah(data.plan)}</TableCell>
                                            <TableCell>{formatToRupiah(data.actual)}</TableCell>
                                            <TableCell>
                                                {typeof data.difference === 'string'
                                                    ? data.difference
                                                    : formatToRupiah(data.difference)}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>

                <div className="col-span-full">
                    <Card>
                        <CardHeader>
                            <CardTitle>Penghasilan</CardTitle>
                            <CardDescription>
                                Menampilkan sumber dan total pemasukan Anda, baik dari gaji, bisnis dan pendapatan
                                lainnya.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="p-0 [&-td]:whitespace-nowrap [&-td]:px-6 [&-th]:px-6">
                            {budgetIncomes.length === 0 ? (
                                <EmptyState
                                    icon={IconCash}
                                    title="Belum ada data penghasilan"
                                    subtitle="Silakan tambahkan penghasilan terlebih dahulu."
                                />
                            ) : (
                                <Table className="w-full">
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>#</TableHead>
                                            <TableHead>Sumber</TableHead>
                                            <TableHead>Rencana</TableHead>
                                            <TableHead>Aktual</TableHead>
                                            <TableHead>Perbedaan</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {budgetIncomes.map((budgetIncome, index) => (
                                            <TableRow key={index}>
                                                <TableCell>{index + 1}</TableCell>
                                                <TableCell>{budgetIncome.detail}</TableCell>
                                                <TableCell>{formatToRupiah(budgetIncome.plan)}</TableCell>
                                                <TableCell>{formatToRupiah(budgetIncome.actual)}</TableCell>
                                                <TableCell>{formatToRupiah(budgetIncome.difference)}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>

                                    <TableFooter className="bg-emerald-500 font-bold text-white">
                                        <TableRow>
                                            <TableCell colSpan={2} className="text-left">
                                                Total
                                            </TableCell>
                                            <TableCell>
                                                {formatToRupiah(props.reports.budgetIncomes.total.plan)}
                                            </TableCell>
                                            <TableCell>
                                                {formatToRupiah(props.reports.budgetIncomes.total.actual)}
                                            </TableCell>
                                            <TableCell>
                                                {formatToRupiah(props.reports.budgetIncomes.total.difference)}
                                            </TableCell>
                                        </TableRow>
                                    </TableFooter>
                                </Table>
                            )}
                        </CardContent>
                    </Card>
                </div>
                <div className="col-span-full">
                    <Card>
                        <CardHeader>
                            <CardTitle>Cicilan Hutang</CardTitle>
                            <CardDescription>
                                Mengelola dan memantau status pembayaran cicilan hutang, termasuk jumlah yang telah
                                dibayar dan yang masih harus di lunaskan.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="p-0 [&-td]:whitespace-nowrap [&-td]:px-6 [&-th]:px-6">
                            {budgetDebts.length === 0 ? (
                                <EmptyState
                                    icon={IconMoneybagMinus}
                                    title="Belum ada data cicilan hutang"
                                    subtitle="Silakan tambahkan cicilan hutang terlebih dahulu."
                                />
                            ) : (
                                <Table className="w-full">
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>#</TableHead>
                                            <TableHead>Sumber</TableHead>
                                            <TableHead>Rencana</TableHead>
                                            <TableHead>Dibayar</TableHead>
                                            <TableHead>Perbedaan</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {budgetDebts.map((budgetDebt, index) => (
                                            <TableRow key={index}>
                                                <TableCell>{index + 1}</TableCell>
                                                <TableCell>{budgetDebt.detail}</TableCell>
                                                <TableCell>{formatToRupiah(budgetDebt.plan)}</TableCell>
                                                <TableCell>{formatToRupiah(budgetDebt.actual)}</TableCell>
                                                <TableCell>{formatToRupiah(budgetDebt.difference)}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>

                                    <TableFooter className="bg-emerald-500 font-bold text-white">
                                        <TableRow>
                                            <TableCell colSpan={2} className="text-left">
                                                Total
                                            </TableCell>
                                            <TableCell>
                                                {formatToRupiah(props.reports.budgetDebts.total.plan)}
                                            </TableCell>
                                            <TableCell>
                                                {formatToRupiah(props.reports.budgetDebts.total.actual)}
                                            </TableCell>
                                            <TableCell>
                                                {formatToRupiah(props.reports.budgetDebts.total.difference)}
                                            </TableCell>
                                        </TableRow>
                                    </TableFooter>
                                </Table>
                            )}
                        </CardContent>
                    </Card>
                </div>
                <div className="col-span-full">
                    <Card>
                        <CardHeader>
                            <CardTitle>Tabungan dan Investasi</CardTitle>
                            <CardDescription>
                                Memberikan gambaran mengenai jumlah tabungan Anda dan portofolio investasi yang sedang
                                berjalan.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="p-0 [&-td]:whitespace-nowrap [&-td]:px-6 [&-th]:px-6">
                            {budgetSavings.length === 0 ? (
                                <EmptyState
                                    icon={IconPigMoney}
                                    title="Belum ada data tabungan"
                                    subtitle="Silakan tambahkan data tabungan atau investasi terlebih dahulu."
                                />
                            ) : (
                                <Table className="w-full">
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>#</TableHead>
                                            <TableHead>Sumber</TableHead>
                                            <TableHead>Rencana</TableHead>
                                            <TableHead>Dibayar</TableHead>
                                            <TableHead>Perbedaan</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {budgetSavings.map((budgetSaving, index) => (
                                            <TableRow key={index}>
                                                <TableCell>{index + 1}</TableCell>
                                                <TableCell>{budgetSaving.detail}</TableCell>
                                                <TableCell>{formatToRupiah(budgetSaving.plan)}</TableCell>
                                                <TableCell>{formatToRupiah(budgetSaving.actual)}</TableCell>
                                                <TableCell>{formatToRupiah(budgetSaving.difference)}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>

                                    <TableFooter className="bg-emerald-500 font-bold text-white">
                                        <TableRow>
                                            <TableCell colSpan={2} className="text-left">
                                                Total
                                            </TableCell>
                                            <TableCell>
                                                {formatToRupiah(props.reports.budgetSavings.total.plan)}
                                            </TableCell>
                                            <TableCell>
                                                {formatToRupiah(props.reports.budgetSavings.total.actual)}
                                            </TableCell>
                                            <TableCell>
                                                {formatToRupiah(props.reports.budgetSavings.total.difference)}
                                            </TableCell>
                                        </TableRow>
                                    </TableFooter>
                                </Table>
                            )}
                        </CardContent>
                    </Card>
                </div>
                <div className="col-span-full">
                    <Card>
                        <CardHeader>
                            <CardTitle>Tagihan</CardTitle>
                            <CardDescription>
                                Mengelola dan memantau tagihan rutin seperti listrik, air, internet dan lainnya, serta
                                memberikan pengingat untuk pembayaran tagihan.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="p-0 [&-td]:whitespace-nowrap [&-td]:px-6 [&-th]:px-6">
                            {budgetBills.length === 0 ? (
                                <EmptyState
                                    icon={IconInvoice}
                                    title="Belum ada data tagihan"
                                    subtitle="Silakan tambahkan tagihan terlebih dahulu."
                                />
                            ) : (
                                <Table className="w-full">
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>#</TableHead>
                                            <TableHead>Sumber</TableHead>
                                            <TableHead>Rencana</TableHead>
                                            <TableHead>Dibayar</TableHead>
                                            <TableHead>Perbedaan</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {budgetBills.map((budgetDebt, index) => (
                                            <TableRow key={index}>
                                                <TableCell>{index + 1}</TableCell>
                                                <TableCell>{budgetDebt.detail}</TableCell>
                                                <TableCell>{formatToRupiah(budgetDebt.plan)}</TableCell>
                                                <TableCell>{formatToRupiah(budgetDebt.actual)}</TableCell>
                                                <TableCell>{formatToRupiah(budgetDebt.difference)}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>

                                    <TableFooter className="bg-emerald-500 font-bold text-white">
                                        <TableRow>
                                            <TableCell colSpan={2} className="text-left">
                                                Total
                                            </TableCell>
                                            <TableCell>
                                                {formatToRupiah(props.reports.budgetBills.total.plan)}
                                            </TableCell>
                                            <TableCell>
                                                {formatToRupiah(props.reports.budgetBills.total.actual)}
                                            </TableCell>
                                            <TableCell>
                                                {formatToRupiah(props.reports.budgetBills.total.difference)}
                                            </TableCell>
                                        </TableRow>
                                    </TableFooter>
                                </Table>
                            )}
                        </CardContent>
                    </Card>
                </div>
                <div className="col-span-full">
                    <Card>
                        <CardHeader>
                            <CardTitle>Belanja</CardTitle>
                            <CardDescription>
                                Mengelola dan memantau pengeluaran untuk kebutuhan sehari-hari, seperti makanan, pakaian
                                dan lainnya.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="p-0 [&-td]:whitespace-nowrap [&-td]:px-6 [&-th]:px-6">
                            {budgetShoppings.length === 0 ? (
                                <EmptyState
                                    icon={IconShoppingBag}
                                    title="Belum ada data belanja"
                                    subtitle="Silakan tambahkan belanja terlebih dahulu."
                                />
                            ) : (
                                <Table className="w-full">
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>#</TableHead>
                                            <TableHead>Sumber</TableHead>
                                            <TableHead>Rencana</TableHead>
                                            <TableHead>Dibayar</TableHead>
                                            <TableHead>Perbedaan</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {budgetShoppings.map((budgetShopping, index) => (
                                            <TableRow key={index}>
                                                <TableCell>{index + 1}</TableCell>
                                                <TableCell>{budgetShopping.detail}</TableCell>
                                                <TableCell>{formatToRupiah(budgetShopping.plan)}</TableCell>
                                                <TableCell>{formatToRupiah(budgetShopping.actual)}</TableCell>
                                                <TableCell>{formatToRupiah(budgetShopping.difference)}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>

                                    <TableFooter className="bg-emerald-500 font-bold text-white">
                                        <TableRow>
                                            <TableCell colSpan={2} className="text-left">
                                                Total
                                            </TableCell>
                                            <TableCell>
                                                {formatToRupiah(props.reports.budgetShoppings.total.plan)}
                                            </TableCell>
                                            <TableCell>
                                                {formatToRupiah(props.reports.budgetShoppings.total.actual)}
                                            </TableCell>
                                            <TableCell>
                                                {formatToRupiah(props.reports.budgetShoppings.total.difference)}
                                            </TableCell>
                                        </TableRow>
                                    </TableFooter>
                                </Table>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Lacak Pemasukan</CardTitle>

                    <CardDescription>
                        Memberikan detail setiap transaksi pemasukan untuk mengetahui sumber pendapatan secara rinci.
                    </CardDescription>
                </CardHeader>
                <CardContent className="p-0 [&-td]:whitespace-nowrap [&-td]:px-6 [&-th]:px-6">
                    {incomeTrackers.length === 0 ? (
                        <EmptyState
                            icon={IconMoneybagMoveBack}
                            title="Belum ada data pemasukan"
                            subtitle="Silakan tambahkan pemasukan terlebih dahulu."
                        />
                    ) : (
                        <Table className="w-full">
                            <TableHeader>
                                <TableRow>
                                    <TableHead>#</TableHead>
                                    <TableHead>Tanggal</TableHead>
                                    <TableHead>Sumber</TableHead>
                                    <TableHead>Nominal</TableHead>
                                    <TableHead>Catatan</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {incomeTrackers.map((incomeTracker, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>{formatDateIndo(incomeTracker.date)}</TableCell>
                                        <TableCell>{incomeTracker.budget.detail}</TableCell>
                                        <TableCell>{formatToRupiah(incomeTracker.nominal)}</TableCell>
                                        <TableCell>{incomeTracker.notes}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Lacak Pengeluaran</CardTitle>

                    <CardDescription>
                        Memantau semua transaksi pengeluaran Anda, untuk membantu mengelola pengeluaran secaran efisien.
                    </CardDescription>
                </CardHeader>
                <CardContent className="p-0 [&-td]:whitespace-nowrap [&-td]:px-6 [&-th]:px-6">
                    {expenseTrackers.length === 0 ? (
                        <EmptyState
                            icon={IconMoneybagMove}
                            title="Belum ada data pengeluaran"
                            subtitle="Silakan tambahkan pengeluaran terlebih dahulu."
                        />
                    ) : (
                        <Table className="w-full">
                            <TableHeader>
                                <TableRow>
                                    <TableHead>#</TableHead>
                                    <TableHead>Tanggal</TableHead>
                                    <TableHead>Deskripsi</TableHead>
                                    <TableHead>Nominal</TableHead>
                                    <TableHead>Tipe</TableHead>
                                    <TableHead>Detail</TableHead>
                                    <TableHead>Metode Pembayaran</TableHead>
                                    <TableHead>Catatan</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {expenseTrackers.map((expenseTracker, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>{formatDateIndo(expenseTracker.date)}</TableCell>
                                        <TableCell>{expenseTracker.description}</TableCell>
                                        <TableCell>{formatToRupiah(expenseTracker.nominal)}</TableCell>
                                        <TableCell>
                                            <Badge variant={BUDGETTYPEVARIANTS[expenseTracker.type]}>
                                                {expenseTracker.type}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>{expenseTracker.typeDetail.detail}</TableCell>
                                        <TableCell>{expenseTracker.payment.name}</TableCell>
                                        <TableCell>{expenseTracker.notes}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}

Index.layout = (page) => <AppLayout title={page.props.page_settings.title} children={page} />;
