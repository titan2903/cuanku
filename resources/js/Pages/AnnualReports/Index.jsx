import BreadcrumbHeader from '@/Components/BreadcrumbHeader';
import EmptyState from '@/Components/EmptyState';
import HeaderTitle from '@/Components/HeaderTitle';
import { Badge } from '@/Components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/Components/ui/table';
import { useFilter } from '@/Hooks/use-filter';
import AppLayout from '@/Layouts/AppLayout';
import { BUDGETTYPEVARIANTS, formatToRupiah, MONTHTYPEVARIANTS } from '@/lib/utils';
import {
    IconCashBanknote,
    IconCashBanknoteMinus,
    IconCashBanknotePlus,
    IconInvoice,
    IconLogs,
    IconShoppingBag,
} from '@tabler/icons-react';
import { useState } from 'react';

export default function Index(props) {
    const [params, setParams] = useState(props.state);

    const annualIncomes = props.annuals.annualIncomes.data;
    const annualSavings = props.annuals.annualSavings.data;
    const annualDebts = props.annuals.annualDebts.data;
    const annualBills = props.annuals.annualBills.data;
    const annualShoppings = props.annuals.annualShoppings.data;

    const annualMonths = props.annuals.annualMonths;

    useFilter({
        route: route('annual-reports'),
        values: params,
        only: ['annuals'],
    });

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

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                <div className="col-span-1">
                    <Card>
                        <CardHeader>
                            <CardTitle>Penghasilan</CardTitle>
                            <CardDescription>
                                Menyajikan total ringkasan penghasilan selama satu tahun beserta rincian perbulan untuk
                                setiap sumber penghasilan.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="p-0 [&-td]:whitespace-nowrap [&-td]:px-6 [&-th]:px-6">
                            {annualIncomes.length === 0 ? (
                                <EmptyState
                                    icon={IconCashBanknote}
                                    title="Belum ada data penghasilan"
                                    subtitle="Silakan tambahkan penghasilan terlebih dahulu."
                                />
                            ) : (
                                <Table className="w-full">
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>#</TableHead>
                                            <TableHead>Bulan</TableHead>
                                            <TableHead>Rencana</TableHead>
                                            <TableHead>Aktual</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {annualIncomes.map((annualIncome, index) => (
                                            <TableRow key={index}>
                                                <TableCell>{index + 1}</TableCell>
                                                <TableCell>
                                                    <Badge variant={MONTHTYPEVARIANTS[annualIncome.month]}>
                                                        {annualIncome.month}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell>{formatToRupiah(annualIncome.plan)}</TableCell>
                                                <TableCell>{formatToRupiah(annualIncome.actual)}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>

                                    <TableFooter className="bg-emerald-500 font-bold text-white">
                                        <TableRow>
                                            <TableCell colSpan={2} className="text-left">
                                                Total
                                            </TableCell>
                                            <TableCell>
                                                {formatToRupiah(props.annuals.annualIncomes.total.plan)}
                                            </TableCell>
                                            <TableCell>
                                                {formatToRupiah(props.annuals.annualIncomes.total.actual)}
                                            </TableCell>
                                        </TableRow>
                                    </TableFooter>
                                </Table>
                            )}
                        </CardContent>
                    </Card>
                </div>

                <div className="col-span-1">
                    <Card>
                        <CardHeader>
                            <CardTitle>Tabungan dan Investasi</CardTitle>
                            <CardDescription>
                                Menyajikan perkembangan tabungan dan nilai investasi Anda sepanjang tahun, termasuk
                                pertumbuhan dan perubahan signifikan setiap bulan.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="p-0 [&-td]:whitespace-nowrap [&-td]:px-6 [&-th]:px-6">
                            {annualSavings.length === 0 ? (
                                <EmptyState
                                    icon={IconCashBanknotePlus}
                                    title="Belum ada data tabungan dan investasi"
                                    subtitle="Silakan tambahkan tabungan dan investasi terlebih dahulu."
                                />
                            ) : (
                                <Table className="w-full">
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>#</TableHead>
                                            <TableHead>Bulan</TableHead>
                                            <TableHead>Rencana</TableHead>
                                            <TableHead>Aktual</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {annualSavings.map((annualSaving, index) => (
                                            <TableRow key={index}>
                                                <TableCell>{index + 1}</TableCell>
                                                <TableCell>
                                                    <Badge variant={MONTHTYPEVARIANTS[annualSaving.month]}>
                                                        {annualSaving.month}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell>{formatToRupiah(annualSaving.plan)}</TableCell>
                                                <TableCell>{formatToRupiah(annualSaving.actual)}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>

                                    <TableFooter className="bg-emerald-500 font-bold text-white">
                                        <TableRow>
                                            <TableCell colSpan={2} className="text-left">
                                                Total
                                            </TableCell>
                                            <TableCell>
                                                {formatToRupiah(props.annuals.annualSavings.total.plan)}
                                            </TableCell>
                                            <TableCell>
                                                {formatToRupiah(props.annuals.annualSavings.total.actual)}
                                            </TableCell>
                                        </TableRow>
                                    </TableFooter>
                                </Table>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                <div className="col-span-1">
                    <Card>
                        <CardHeader>
                            <CardTitle>Cicilan Hitang</CardTitle>
                            <CardDescription>
                                Memberikan laporan terkait pembayaran cicilan hutang tahunan, meliputi jumlah yang telah
                                dibayar dan sisa cicilan.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="p-0 [&-td]:whitespace-nowrap [&-td]:px-6 [&-th]:px-6">
                            {annualDebts.length === 0 ? (
                                <EmptyState
                                    icon={IconCashBanknoteMinus}
                                    title="Belum ada data cicilan hutang"
                                    subtitle="Silakan tambahkan cicilan hutang terlebih dahulu."
                                />
                            ) : (
                                <Table className="w-full">
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>#</TableHead>
                                            <TableHead>Bulan</TableHead>
                                            <TableHead>Rencana</TableHead>
                                            <TableHead>Aktual</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {annualDebts.map((annualDebt, index) => (
                                            <TableRow key={index}>
                                                <TableCell>{index + 1}</TableCell>
                                                <TableCell>
                                                    <Badge variant={MONTHTYPEVARIANTS[annualDebt.month]}>
                                                        {annualDebt.month}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell>{formatToRupiah(annualDebt.plan)}</TableCell>
                                                <TableCell>{formatToRupiah(annualDebt.actual)}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>

                                    <TableFooter className="bg-emerald-500 font-bold text-white">
                                        <TableRow>
                                            <TableCell colSpan={2} className="text-left">
                                                Total
                                            </TableCell>
                                            <TableCell>
                                                {formatToRupiah(props.annuals.annualDebts.total.plan)}
                                            </TableCell>
                                            <TableCell>
                                                {formatToRupiah(props.annuals.annualDebts.total.actual)}
                                            </TableCell>
                                        </TableRow>
                                    </TableFooter>
                                </Table>
                            )}
                        </CardContent>
                    </Card>
                </div>

                <div className="col-span-1">
                    <Card>
                        <CardHeader>
                            <CardTitle>Tagihan</CardTitle>
                            <CardDescription>
                                Menyajikan rekapitulasi tagihan bulanan seperti listrik, air, internat dan lainnya.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="p-0 [&-td]:whitespace-nowrap [&-td]:px-6 [&-th]:px-6">
                            {annualBills.length === 0 ? (
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
                                            <TableHead>Bulan</TableHead>
                                            <TableHead>Rencana</TableHead>
                                            <TableHead>Aktual</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {annualBills.map((annualBill, index) => (
                                            <TableRow key={index}>
                                                <TableCell>{index + 1}</TableCell>
                                                <TableCell>
                                                    <Badge variant={MONTHTYPEVARIANTS[annualBill.month]}>
                                                        {annualBill.month}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell>{formatToRupiah(annualBill.plan)}</TableCell>
                                                <TableCell>{formatToRupiah(annualBill.actual)}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>

                                    <TableFooter className="bg-emerald-500 font-bold text-white">
                                        <TableRow>
                                            <TableCell colSpan={2} className="text-left">
                                                Total
                                            </TableCell>
                                            <TableCell>
                                                {formatToRupiah(props.annuals.annualBills.total.plan)}
                                            </TableCell>
                                            <TableCell>
                                                {formatToRupiah(props.annuals.annualBills.total.actual)}
                                            </TableCell>
                                        </TableRow>
                                    </TableFooter>
                                </Table>
                            )}
                        </CardContent>
                    </Card>
                </div>

                <div className="col-span-1">
                    <Card>
                        <CardHeader>
                            <CardTitle>Belanja</CardTitle>
                            <CardDescription>
                                Menyajikan total pengeluaran untuk belanja kebutuhan sehari-hari, termasuk makanan,
                                pakaian, dan barang lainnya.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="p-0 [&-td]:whitespace-nowrap [&-td]:px-6 [&-th]:px-6">
                            {annualShoppings.length === 0 ? (
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
                                            <TableHead>Bulan</TableHead>
                                            <TableHead>Rencana</TableHead>
                                            <TableHead>Aktual</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {annualShoppings.map((annualShopping, index) => (
                                            <TableRow key={index}>
                                                <TableCell>{index + 1}</TableCell>
                                                <TableCell>
                                                    <Badge variant={MONTHTYPEVARIANTS[annualShopping.month]}>
                                                        {annualShopping.month}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell>{formatToRupiah(annualShopping.plan)}</TableCell>
                                                <TableCell>{formatToRupiah(annualShopping.actual)}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>

                                    <TableFooter className="bg-emerald-500 font-bold text-white">
                                        <TableRow>
                                            <TableCell colSpan={2} className="text-left">
                                                Total
                                            </TableCell>
                                            <TableCell>
                                                {formatToRupiah(props.annuals.annualShoppings.total.plan)}
                                            </TableCell>
                                            <TableCell>
                                                {formatToRupiah(props.annuals.annualShoppings.total.actual)}
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
                    <CardTitle>Laporan Setiap Kateogri Per Bulan</CardTitle>
                    <CardDescription>
                        Menyajikan laporan bulanan yang terperinci untuk setiap kategori keuangan seperti penghasilan,
                        tabungan, hutang, tagihan, dan belanja.
                    </CardDescription>
                </CardHeader>
            </Card>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                {Object.entries(annualMonths).map(([month, data]) => (
                    <div className="col-span-1" key={month}>
                        <Card>
                            <CardHeader>
                                <CardTitle>{month}</CardTitle>
                                <CardDescription>Menampilkan laporan keuangan untuk bulan {month}.</CardDescription>
                            </CardHeader>
                            <CardContent className="p-0 [&-td]:whitespace-nowrap [&-td]:px-6 [&-th]:px-6">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Kategori</TableHead>
                                            <TableHead>Rencana</TableHead>
                                            <TableHead>Aktual</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {Object.entries(data.categories).map(([category, values]) => (
                                            <TableRow key={category}>
                                                <TableCell>
                                                    <Badge variant={BUDGETTYPEVARIANTS[category]}>
                                                        {category.charAt(0).toUpperCase() + category.slice(1)}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell>{formatToRupiah(values.plan)}</TableCell>
                                                <TableCell>{formatToRupiah(values.actual)}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>

                                    <TableFooter className="bg-gradient-to-br from-emerald-500 via-emerald-600 to-emerald-700 font-bold text-white">
                                        <TableRow>
                                            <TableCell>Total</TableCell>
                                            <TableCell>{formatToRupiah(data.total.plan)}</TableCell>
                                            <TableCell>{formatToRupiah(data.total.actual)}</TableCell>
                                        </TableRow>
                                    </TableFooter>
                                </Table>
                            </CardContent>
                        </Card>
                    </div>
                ))}
            </div>
        </div>
    );
}

Index.layout = (page) => <AppLayout title={page.props.page_settings.title} children={page} />;
