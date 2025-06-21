import AlertAction from '@/Components/AlertAction';
import BreadcrumbHeader from '@/Components/BreadcrumbHeader';
import Filter from '@/Components/Datatable/Filter';
import PaginationTable from '@/Components/Datatable/PaginationTable';
import ShowFilter from '@/Components/Datatable/ShowFilter';
import EmptyState from '@/Components/EmptyState';
import HeaderTitle from '@/Components/HeaderTitle';
import { Badge } from '@/Components/ui/badge';
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/Components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/Components/ui/table';
import { useFilter } from '@/Hooks/use-filter';
import AppLayout from '@/Layouts/AppLayout';
import { deleteAction, formatDateIndo, formatToRupiah, MONTHTYPEVARIANTS } from '@/lib/utils';
import { Link } from '@inertiajs/react';
import { IconArrowDown, IconMoneybagMoveBack, IconPencil, IconPlus, IconTrash } from '@tabler/icons-react';
import { useState } from 'react';

export default function Index(props) {
    const { data: incomes, meta, links } = props.incomes;
    const [params, setParams] = useState(props.state);

    const onSortTable = (field) => {
        setParams({
            ...params,
            field: field,
            direction: params.direction === 'asc' ? 'desc' : 'asc',
        });
    };

    useFilter({
        route: route('incomes.index'),
        values: params,
        only: ['incomes'],
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
                            icon={IconMoneybagMoveBack}
                        />

                        <Button variant="emerald" size="xl" asChild>
                            <Link href={route('incomes.create')}>
                                <IconPlus className="size-4" />
                                Tambah Pemasukan
                            </Link>
                        </Button>
                    </div>
                    <Filter params={params} setParams={setParams} state={props.state} />
                    <ShowFilter params={params} />
                </CardHeader>
                <CardContent className="p-0 [&-td]:whitespace-nowrap [&-td]:px-6 [&-th]:px-6">
                    {incomes.length === 0 ? (
                        <EmptyState
                            icon={IconMoneybagMoveBack}
                            title="Belum ada pemasukan"
                            subtitle="Mulailah membuat pemasukan baru."
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
                                            onClick={() => onSortTable('date')}
                                        >
                                            Tanggal
                                            <span className="ml-2 flex-none rounded text-muted-foreground">
                                                <IconArrowDown className="size-4" />
                                            </span>
                                        </Button>
                                    </TableHead>
                                    <TableHead>
                                        <Button
                                            variant="ghost"
                                            className="group inline-flex"
                                            onClick={() => onSortTable('budget_id')}
                                        >
                                            Sumber
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
                                            onClick={() => onSortTable('notes')}
                                        >
                                            Catatan
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
                                {incomes.map((income, index) => (
                                    <TableRow key={index}>
                                        <TableCell>
                                            {index +
                                                1 +
                                                (Number(meta?.current ?? 1) - 1) * Number(meta?.per_page ?? 10)}
                                        </TableCell>
                                        <TableCell>{formatDateIndo(income.date)}</TableCell>
                                        <TableCell>
                                            {income.budget.detail} - {income.budget.type}
                                        </TableCell>
                                        <TableCell>{formatToRupiah(income.nominal)}</TableCell>
                                        <TableCell>
                                            <Badge variant={MONTHTYPEVARIANTS[income.month] ?? 'default'}>
                                                {income.month}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>{income.year}</TableCell>
                                        <TableCell>{income.notes}</TableCell>
                                        <TableCell>{formatDateIndo(income.created_at)}</TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-x-1">
                                                <Button variant="blue" size="sm" asChild>
                                                    <Link href={route('incomes.edit', [income])}>
                                                        <IconPencil className="size-4" />
                                                    </Link>
                                                </Button>
                                                <AlertAction
                                                    trigger={
                                                        <Button variant="red" size="sm">
                                                            <IconTrash className="size-4" />
                                                        </Button>
                                                    }
                                                    action={() => deleteAction(route('incomes.destroy', [income]))}
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
                        {meta.total} pemasukan
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
