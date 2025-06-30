import AlertAction from '@/Components/AlertAction';
import BreadcrumbHeader from '@/Components/BreadcrumbHeader';
import CardStat from '@/Components/CardStat';
import FilterWithoutInput from '@/Components/Datatable/FilterWithoutInput';
import PaginationTable from '@/Components/Datatable/PaginationTable';
import ShowFilter from '@/Components/Datatable/ShowFilter';
import EmptyState from '@/Components/EmptyState';
import HeaderTitle from '@/Components/HeaderTitle';
import { Alert, AlertDescription, AlertTitle } from '@/Components/ui/alert';
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/Components/ui/card';
import { Progress } from '@/Components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/Components/ui/table';
import { useFilter } from '@/Hooks/use-filter';
import AppLayout from '@/Layouts/AppLayout';
import { deleteAction, formatDateIndo, formatToRupiah } from '@/lib/utils';
import { Link } from '@inertiajs/react';
import {
    IconArrowDown,
    IconCash,
    IconMoneybag,
    IconPlus,
    IconReportMoney,
    IconTimeline,
    IconTrash,
} from '@tabler/icons-react';
import { useState } from 'react';

export default function Index(props) {
    const { data: balances, meta, links } = props.balances;
    const [params, setParams] = useState(props.state);

    const onSortTable = (field) => {
        setParams({
            ...params,
            field: field,
            direction: params.direction === 'asc' ? 'desc' : 'asc',
        });
    };

    useFilter({
        route: route('balances.index', props.goal),
        values: params,
        only: ['balances'],
    });

    return (
        <div className="flex w-full flex-col gap-y-6 pb-32">
            <BreadcrumbHeader items={props.items} />
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
                <CardStat
                    data={{
                        title: 'Saldo Awal',
                        background: 'text-white bg-gradient-to-r from-red-400 via-red-500 to-red-500',
                        icon: IconCash,
                        iconClassName: 'text-white',
                    }}
                >
                    <div className="text-2xl font-bold">{formatToRupiah(props.goal.beginning_balance)}</div>
                </CardStat>
                <CardStat
                    data={{
                        title: 'Sudah Ditabung',
                        background: 'text-white bg-gradient-to-r from-orange-400 via-orange-500 to-orange-500',
                        icon: IconPlus,
                        iconClassName: 'text-white',
                    }}
                >
                    <div className="text-2xl font-bold">{formatToRupiah(props.goal.balances_sum_amount)}</div>
                </CardStat>
                <CardStat
                    data={{
                        title: 'Total Tabungan (Saldo Awal + Sudah Ditabung)',
                        background: 'text-white bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-500',
                        icon: IconReportMoney,
                        iconClassName: 'text-white',
                    }}
                >
                    <div className="text-2xl font-bold">
                        {formatToRupiah(Number(props.goal.balances_sum_amount) + Number(props.goal.beginning_balance))}
                    </div>
                </CardStat>
                <CardStat
                    data={{
                        title: 'Realisasi (Tabungan yang dicapai tersisa)',
                        background: 'text-white bg-gradient-to-r from-blue-400 via-blue-500 to-blue-500',
                        icon: IconTimeline,
                        iconClassName: 'text-white',
                    }}
                >
                    <div className="text-2xl font-bold">
                        {formatToRupiah(
                            Math.max(
                                0,
                                Number(props.goal.nominal) -
                                    (Number(props.goal.balances_sum_amount) + Number(props.goal.beginning_balance)),
                            ),
                        )}
                    </div>
                </CardStat>
            </div>

            <Alert variant={props.goal.balances_sum_amount >= props.goal.monthly_saving ? 'success' : 'destructive'}>
                <AlertTitle>
                    {props.goal.balances_sum_amount >= props.goal.monthly_saving ? 'Yay!' : 'Oops!'}
                </AlertTitle>
                <AlertDescription>
                    {props.goal.balances_sum_amount >= props.goal.monthly_saving
                        ? 'Anda telah mencapai target tabungan bulan ini!'
                        : 'Anda belum mencapai target tabungan bulan ini.'}
                </AlertDescription>
            </Alert>
            <div className="grid w-full grid-cols-1 gap-y-4 lg:grid-cols-3 lg:gap-x-6">
                <div className="col-span-1 space-y-4">
                    <Card>
                        <CardHeader>
                            <HeaderTitle
                                title="Tujuan Menabung"
                                subtitle="Menampilkan detail tujuan menabung Anda"
                                icon={IconMoneybag}
                            />
                        </CardHeader>
                        <CardContent>
                            <dl className="-my-3 divide-y divide-gray-100 text-sm leading-6">
                                <div className="flex justify-between gap-x-4 py-3">
                                    <dt className="text-foreground">Tujuan</dt>
                                    <dd className="font-medium text-foreground">{props.goal.name}</dd>
                                </div>
                                <div className="flex justify-between gap-x-4 py-3">
                                    <dt className="text-foreground">Progress</dt>
                                    <dd className="font-medium text-foreground">
                                        <Progress value={props.goal.percentage} />
                                        {props.goal.percentage} %
                                    </dd>
                                </div>
                                <div className="flex justify-between gap-x-4 py-3">
                                    <dt className="text-foreground">Nominal</dt>
                                    <dd className="font-medium text-foreground">
                                        {formatToRupiah(props.goal.nominal)}
                                    </dd>
                                </div>
                                <div className="flex justify-between gap-x-4 py-3">
                                    <dt className="text-foreground">Tabungan per Bulan</dt>
                                    <dd className="font-medium text-foreground">
                                        {formatToRupiah(props.goal.monthly_saving)}
                                    </dd>
                                </div>
                                <div className="flex justify-between gap-x-4 py-3">
                                    <dt className="text-foreground">Saldo Awal</dt>
                                    <dd className="font-medium text-foreground">
                                        {formatToRupiah(props.goal.beginning_balance)}
                                    </dd>
                                </div>
                                <div className="flex justify-between gap-x-4 py-3">
                                    <dt className="text-foreground">Deadline</dt>
                                    <dd className="font-medium text-foreground">
                                        {formatDateIndo(props.goal.deadline)}
                                    </dd>
                                </div>
                            </dl>
                        </CardContent>
                    </Card>
                </div>
                <div className="col-span-2 space-y-4">
                    <Card>
                        <CardHeader className="p-0">
                            <div className="flex flex-col items-start justify-between gap-y-4 p-4 lg:flex-row lg:items-center">
                                <HeaderTitle
                                    title={props.page_settings.title}
                                    subtitle={props.page_settings.subtitle}
                                    icon={IconMoneybag}
                                />
                                <Button variant="emerald" size="xl" asChild>
                                    <Link href={route('balances.create', props.goal)}>
                                        <IconPlus className="size-4" />
                                        Tambah
                                    </Link>
                                </Button>
                            </div>
                            <FilterWithoutInput params={params} setParams={setParams} state={props.state} />
                            <ShowFilter params={params} />
                        </CardHeader>
                        <CardContent className="p-0 [&-td]:whitespace-nowrap [&-td]:px-6 [&-th]:px-6">
                            {balances.length === 0 ? (
                                <EmptyState
                                    icon={IconMoneybag}
                                    title="Belum ada saldo"
                                    subtitle="Mulailah dengan menambahkan saldo."
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
                                                    onClick={() => onSortTable('amount')}
                                                >
                                                    Jumlah (Rp)
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
                                                    Tanggal Menabung
                                                    <span className="ml-2 flex-none rounded text-muted-foreground">
                                                        <IconArrowDown className="size-4" />
                                                    </span>
                                                </Button>
                                            </TableHead>
                                            <TableHead>Aksi</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {balances.map((balance, index) => (
                                            <TableRow key={index}>
                                                <TableCell>
                                                    {index +
                                                        1 +
                                                        (Number(meta?.current ?? 1) - 1) * Number(meta?.per_page ?? 10)}
                                                </TableCell>

                                                <TableCell>{formatToRupiah(balance.amount)}</TableCell>

                                                <TableCell>{formatDateIndo(balance.created_at)}</TableCell>

                                                <TableCell>
                                                    <div className="flex items-center gap-x-1">
                                                        <AlertAction
                                                            trigger={
                                                                <Button variant="red" size="sm">
                                                                    <IconTrash className="size-4" />
                                                                </Button>
                                                            }
                                                            action={() =>
                                                                deleteAction(
                                                                    route('balances.destroy', [props.goal, balance]),
                                                                )
                                                            }
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
                                {meta.total} saldo
                            </p>
                            <div className="overflow-x-auto">
                                {meta.has_pages && <PaginationTable meta={meta} links={links} />}
                            </div>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    );
}

Index.layout = (page) => <AppLayout title={page.props.page_settings.title} children={page} />;
