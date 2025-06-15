import AlertAction from '@/Components/AlertAction';
import Banner from '@/Components/Banner';
import BreadcrumbHeader from '@/Components/BreadcrumbHeader';
import Filter from '@/Components/Datatable/Filter';
import PaginationTable from '@/Components/Datatable/PaginationTable';
import ShowFilter from '@/Components/Datatable/ShowFilter';
import EmptyState from '@/Components/EmptyState';
import HeaderTitle from '@/Components/HeaderTitle';
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/Components/ui/card';
import { Progress } from '@/Components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/Components/ui/table';
import { useFilter } from '@/Hooks/use-filter';
import AppLayout from '@/Layouts/AppLayout';
import { formatDateIndo, formatToRupiah } from '@/lib/utils';
import { Link } from '@inertiajs/react';
import { IconArrowDown, IconMoneybag, IconPencil, IconPlus, IconTrash } from '@tabler/icons-react';
import { useState } from 'react';

export default function Index(props) {
    const { data, meta, links } = props.goals;
    const [params, setParams] = useState(props.state);
    console.log('props', props);

    const onSortTable = (field) => {
        setParams({
            ...params,
            field: field,
            direction: params.direction === 'asc' ? 'desc' : 'asc',
        });
    };

    useFilter({
        route: route('goals.index'),
        values: params,
        only: ['goals'],
    });

    return (
        <div className="flex w-full flex-col gap-y-6 pb-32">
            <BreadcrumbHeader items={props.items} />
            <Banner title={props.page_settings.banner.title} subtitle={props.page_settings.banner.subtitle} />
            <Card>
                <CardHeader className="p-0">
                    <div className="flex flex-col items-start justify-between gap-y-4 p-4 lg:flex-row lg:items-center">
                        <HeaderTitle
                            title={props.page_settings.title}
                            subtitle={props.page_settings.subtitle}
                            icon={IconMoneybag}
                        />

                        <Button variant="emerald" size="xl" asChild>
                            <Link href={route('goals.create')}>
                                <IconPlus className="size-4" />
                                Tambah Tujuan
                            </Link>
                        </Button>
                    </div>
                    <Filter params={params} setParams={setParams} />
                    <ShowFilter params={params} />
                </CardHeader>
                <CardContent className="p-0 [&-td]:whitespace-nowrap [&-td]:px-6 [&-th]:px-6">
                    {data.length === 0 ? (
                        <EmptyState
                            icon={IconMoneybag}
                            title="Belum ada tujuan"
                            subtitle="Mulailah menabung untuk mencapai tujuan keuangan Anda."
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
                                            onClick={() => onSortTable('name')}
                                        >
                                            Tujuan
                                            <span className="ml-2 flex-none rounded text-muted-foreground">
                                                <IconArrowDown className="size-4" />
                                            </span>
                                        </Button>
                                    </TableHead>
                                    <TableHead>
                                        <Button
                                            variant="ghost"
                                            className="group inline-flex"
                                            onClick={() => onSortTable('percentage')}
                                        >
                                            Persentase
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
                                            Nominal (Rp)
                                            <span className="ml-2 flex-none rounded text-muted-foreground">
                                                <IconArrowDown className="size-4" />
                                            </span>
                                        </Button>
                                    </TableHead>
                                    <TableHead>
                                        <Button
                                            variant="ghost"
                                            className="group inline-flex"
                                            onClick={() => onSortTable('monthly_saving')}
                                        >
                                            Tabungan / Bulan (Rp)
                                            <span className="ml-2 flex-none rounded text-muted-foreground">
                                                <IconArrowDown className="size-4" />
                                            </span>
                                        </Button>
                                    </TableHead>
                                    <TableHead>
                                        <Button
                                            variant="ghost"
                                            className="group inline-flex"
                                            onClick={() => onSortTable('deadline')}
                                        >
                                            Tenggat Waktu
                                            <span className="ml-2 flex-none rounded text-muted-foreground">
                                                <IconArrowDown className="size-4" />
                                            </span>
                                        </Button>
                                    </TableHead>
                                    <TableHead>
                                        <Button
                                            variant="ghost"
                                            className="group inline-flex"
                                            onClick={() => onSortTable('beginning_balance')}
                                        >
                                            Saldo Awal (Rp)
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
                                {data.map((goal, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{index + 1 + (meta.current - 1) * meta.per_page}</TableCell>
                                        <TableCell>
                                            <Progress value={goal.percentage} />
                                        </TableCell>
                                        <TableCell>{goal.name}</TableCell>
                                        <TableCell>{goal.percentage}</TableCell>
                                        <TableCell>{formatToRupiah(goal.nominal)}</TableCell>
                                        <TableCell>{formatToRupiah(goal.monthly_saving)}</TableCell>
                                        <TableCell>{formatDateIndo(goal.deadline)}</TableCell>
                                        <TableCell>{formatToRupiah(goal.beginning_balance)}</TableCell>
                                        <TableCell>{formatDateIndo(goal.created_at)}</TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-x-1">
                                                <Button variant="blue" size="sm" asChild>
                                                    <Link href={route('goals.edit', [goal])}>
                                                        <IconPencil className="size-4" />
                                                    </Link>
                                                </Button>
                                                <AlertAction
                                                    trigger={
                                                        <Button variant="red" size="sm">
                                                            <IconTrash />
                                                        </Button>
                                                    }
                                                    action={() => console.log('delete')}
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
                        {meta.total} tujuan
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
