import AlertAction from '@/Components/AlertAction';
import BreadcrumbHeader from '@/Components/BreadcrumbHeader';
import CardStat from '@/Components/CardStat';
import Filter from '@/Components/Datatable/Filter';
import PaginationTable from '@/Components/Datatable/PaginationTable';
import ShowFilter from '@/Components/Datatable/ShowFilter';
import EmptyState from '@/Components/EmptyState';
import HeaderTitle from '@/Components/HeaderTitle';
import { Badge } from '@/Components/ui/badge';
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/Components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/Components/ui/table';
import { useFilter } from '@/Hooks/use-filter';
import AppLayout from '@/Layouts/AppLayout';
import { BUDGETTYPEVARIANTS, deleteAction, formatDateIndo, formatToRupiah, MONTHTYPE } from '@/lib/utils';
import { Link } from '@inertiajs/react';
import {
    IconArrowDown,
    IconCash,
    IconChartArrowsVertical,
    IconInvoice,
    IconMoneybagHeart,
    IconMoneybagMinus,
    IconPencil,
    IconPlus,
    IconShoppingBag,
    IconTrash,
} from '@tabler/icons-react';
import { useState } from 'react';

export default function Index(props) {
    const { data: budgets, meta, links } = props.budgets;
    const [params, setParams] = useState(props.state);

    console.log('Budgets:', budgets);

    const onSortTable = (field) => {
        setParams({
            ...params,
            field: field,
            direction: params.direction === 'asc' ? 'desc' : 'asc',
        });
    };

    useFilter({
        route: route('budgets.index'),
        values: params,
        only: ['budgets'],
    });

    return (
        <div className="flex w-full flex-col gap-y-6 pb-32">
            <BreadcrumbHeader items={props.items} />
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
                <CardStat
                    data={{
                        title: 'Penghasilan',
                        background: 'text-white bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-500',
                        icon: IconCash,
                        iconClassName: 'text-white',
                    }}
                >
                    <div className="text-2xl font-bold">{formatToRupiah(props.statistics.incomes)}</div>
                </CardStat>
                <CardStat
                    data={{
                        title: 'Tabungan dan Investasi',
                        background: 'text-white bg-gradient-to-r from-orange-400 via-orange-500 to-orange-500',
                        icon: IconMoneybagHeart,
                        iconClassName: 'text-white',
                    }}
                >
                    <div className="text-2xl font-bold">{formatToRupiah(props.statistics.savings)}</div>
                </CardStat>
                <CardStat
                    data={{
                        title: 'Cicilan Utang',
                        background: 'text-white bg-gradient-to-r from-red-400 via-red-500 to-red-500',
                        icon: IconMoneybagMinus,
                        iconClassName: 'text-white',
                    }}
                >
                    <div className="text-2xl font-bold">{formatToRupiah(props.statistics.debts)}</div>
                </CardStat>
                <CardStat
                    data={{
                        title: 'Tagihan',
                        background: 'text-white bg-gradient-to-r from-sky-400 via-sky-500 to-sky-500',
                        icon: IconInvoice,
                        iconClassName: 'text-white',
                    }}
                >
                    <div className="text-2xl font-bold">{formatToRupiah(props.statistics.bills)}</div>
                </CardStat>
                <CardStat
                    data={{
                        title: 'Belanja',
                        background: 'text-white bg-gradient-to-r from-purple-400 via-purple-500 to-purple-500',
                        icon: IconShoppingBag,
                        iconClassName: 'text-white',
                    }}
                >
                    <div className="text-2xl font-bold">{formatToRupiah(props.statistics.shoppings)}</div>
                </CardStat>
            </div>
            <Card>
                <CardHeader className="p-0">
                    <div className="flex flex-col items-start justify-between gap-y-4 p-4 lg:flex-row lg:items-center">
                        <HeaderTitle
                            title={props.page_settings.title}
                            subtitle={props.page_settings.subtitle}
                            icon={IconChartArrowsVertical}
                        />

                        <Button variant="emerald" size="xl" asChild>
                            <Link href={route('budgets.create')}>
                                <IconPlus className="size-4" />
                                Tambah Anggaran
                            </Link>
                        </Button>
                    </div>
                    <Filter params={params} setParams={setParams} state={props.state}>
                        <Select value={params?.type} onValueChange={(e) => setParams({ ...params, type: e })}>
                            <SelectTrigger className="w-full sm:w-24">
                                <SelectValue placeholder="Tipe" />
                            </SelectTrigger>
                            <SelectContent>
                                {props.types.map((type, index) => (
                                    <SelectItem key={index} value={type.value}>
                                        {type.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <Select value={params?.month} onValueChange={(e) => setParams({ ...params, month: e })}>
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
                            onValueChange={(e) => setParams({ ...params, year: e.toString() })}
                        >
                            <SelectTrigger className="w-full sm:w-24">
                                <SelectValue placeholder="Year" />
                            </SelectTrigger>
                            <SelectContent>
                                {props.years.map((year, index) => (
                                    <SelectItem key={index} value={year.toString()}>
                                        {year}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </Filter>
                    <ShowFilter params={params} />
                </CardHeader>
                <CardContent className="p-0 [&-td]:whitespace-nowrap [&-td]:px-6 [&-th]:px-6">
                    {budgets.length === 0 ? (
                        <EmptyState
                            icon={IconChartArrowsVertical}
                            title="Belum ada Anggaran"
                            subtitle="Mulailah dengan membuat anggaran baru."
                        />
                    ) : (
                        <Table className="w-full">
                            <TableHeader>
                                <TableRow>
                                    <TableHead>
                                        <Button
                                            variant="ghost"
                                            className="group inline-flex"
                                            onClick={() => onSortTable('id')}
                                        >
                                            ID
                                            <span className="ml-2 flex-none rounded text-muted-foreground">
                                                <IconArrowDown className="size-4" />
                                            </span>
                                        </Button>
                                    </TableHead>
                                    <TableHead>
                                        <Button
                                            variant="ghost"
                                            className="group inline-flex"
                                            onClick={() => onSortTable('type')}
                                        >
                                            Tipe
                                            <span className="ml-2 flex-none rounded text-muted-foreground">
                                                <IconArrowDown className="size-4" />
                                            </span>
                                        </Button>
                                    </TableHead>
                                    <TableHead>
                                        <Button
                                            variant="ghost"
                                            className="group inline-flex"
                                            onClick={() => onSortTable('detail')}
                                        >
                                            Rincian
                                            <span className="ml-2 flex-none rounded text-muted-foreground">
                                                <IconArrowDown className="size-4" />
                                            </span>
                                        </Button>
                                    </TableHead>
                                    <TableHead>
                                        <Button
                                            variant="ghost"
                                            className="group inline-flex"
                                            onClick={() => onSortTable('nominal')}
                                        >
                                            Nominal
                                            <span className="ml-2 flex-none rounded text-muted-foreground">
                                                <IconArrowDown className="size-4" />
                                            </span>
                                        </Button>
                                    </TableHead>
                                    <TableHead>
                                        <Button
                                            variant="ghost"
                                            className="group inline-flex"
                                            onClick={() => onSortTable('month')}
                                        >
                                            Bulan
                                            <span className="ml-2 flex-none rounded text-muted-foreground">
                                                <IconArrowDown className="size-4" />
                                            </span>
                                        </Button>
                                    </TableHead>
                                    <TableHead>
                                        <Button
                                            variant="ghost"
                                            className="group inline-flex"
                                            onClick={() => onSortTable('year')}
                                        >
                                            Tahun
                                            <span className="ml-2 flex-none rounded text-muted-foreground">
                                                <IconArrowDown className="size-4" />
                                            </span>
                                        </Button>
                                    </TableHead>
                                    <TableHead>
                                        <Button
                                            variant="ghost"
                                            className="group inline-flex"
                                            onClick={() => onSortTable('created_at')}
                                        >
                                            Dibuat Pada
                                            <span className="ml-2 flex-none rounded text-muted-foreground">
                                                <IconArrowDown className="size-4" />
                                            </span>
                                        </Button>
                                    </TableHead>
                                    <TableHead>Aksi</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {budgets.map((budget, index) => (
                                    <TableRow key={index}>
                                        <TableCell>
                                            {index +
                                                1 +
                                                (Number(meta?.current ?? 1) - 1) * Number(meta?.per_page ?? 10)}
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant={BUDGETTYPEVARIANTS[budget.type] ?? 'default'}>
                                                {budget.type}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>{budget.detail}</TableCell>
                                        <TableCell>{formatToRupiah(budget.nominal)}</TableCell>
                                        <TableCell>
                                            <Badge variant={MONTHTYPE[budget.month]?.variant ?? 'default'}>
                                                {budget.month}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>{budget.year}</TableCell>
                                        <TableCell>{formatDateIndo(budget.created_at)}</TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-x-1">
                                                <Button variant="blue" size="sm" asChild>
                                                    <Link href={route('budgets.edit', [budget])}>
                                                        <IconPencil className="size-4" />
                                                    </Link>
                                                </Button>
                                                <AlertAction
                                                    trigger={
                                                        <Button variant="red" size="sm">
                                                            <IconTrash className="size-4" />
                                                        </Button>
                                                    }
                                                    action={() => deleteAction(route('budgets.destroy', [budget]))}
                                                />
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </CardContent>
                <CardFooter className="flex w-full flex-col items-center justify-between gap-y-2 border-t py-3 lg:flex-row">
                    <p className="text-sm text-muted-foreground">
                        Menampilkan <span className="font-medium text-emerald-600">{meta.from ?? 0}</span> dari{' '}
                        {meta.total} anggaran
                    </p>
                    <div className="overflow-x-auto">
                        {meta.has_pages && <PaginationTable meta={meta} links={links} />}
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
}

Index.layout = (page) => <AppLayout title={page.props.page_settings.title} children={page} />;
