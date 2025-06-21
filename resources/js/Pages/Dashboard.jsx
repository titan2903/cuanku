import CardStatTwo from '@/Components/CardStatTwo';
import { BarChartCustom } from '@/Components/Chart/BarChartCustom';
import { PieChartCustom } from '@/Components/Chart/PieChartCustom';
import EmptyState from '@/Components/EmptyState';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/Components/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/Components/ui/avatar';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/Components/ui/breadcrumb';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card';
import { Progress } from '@/Components/ui/progress';
import AppLayout from '@/Layouts/AppLayout';
import { formatToRupiah } from '@/lib/utils';
import { usePage } from '@inertiajs/react';
import { IconCashBanknote, IconMoneybagMove, IconMoneybagMoveBack, IconPigMoney } from '@tabler/icons-react';

export default function Dashboard(props) {
    const auth = usePage().props.auth.user;
    const { budgets, chartConfigBudget } = props.budgetChart;

    return (
        <div className="flex w-full flex-col gap-y-4 pb-32">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href={route('dashboard')} className="text-emerald-500 hover:text-emerald-600">
                            CuanKu💲
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Dashboard</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <div className="flex flex-row items-center justify-between gap-2 rounded-xl bg-gradient-to-br from-emerald-500 via-emerald-500 to-yellow-100 p-6 text-white">
                <div className="flex flex-col">
                    <h2 className="text-2xl font-semibold leading-relaxed">Hi, {auth.name}</h2>
                    <p className="text-sm">
                        Selamat datang di <span className="font-bold">CuanKu💲</span>, platform keuangan pribadi Anda
                        untuk membantu mengelola keuangan dengan lebih cerdas dan terencana.
                    </p>
                </div>
                <Avatar>
                    <AvatarImage src={auth.avatar} />
                    <AvatarFallback className="bg-black">{auth.name.substring(0, 1)}</AvatarFallback>
                </Avatar>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
                <div className="col-span-full space-y-6 lg:col-span-8">
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                        <div className="col-span-1">
                            <CardStatTwo
                                data={{
                                    title: 'Pemasukan',
                                    description: 'Total pemasukan Anda pada tahun ini',
                                    icon: IconMoneybagMoveBack,
                                    background: 'bg-gradient-to-r from-blue-500 to-purple-600 text-white',
                                    iconClassName: 'text-white',
                                }}
                            >
                                <div className="text-3xl font-bold tracking-tight text-white">
                                    {formatToRupiah(props.sum.incomeSum)}
                                </div>
                            </CardStatTwo>
                        </div>
                        <div className="col-span-1">
                            <CardStatTwo
                                data={{
                                    title: 'Pengeluaran',
                                    description: 'Total pengeluaran Anda pada tahun ini',
                                    icon: IconMoneybagMove,
                                    background: 'bg-gradient-to-r from-red-400 to-red-500 via-red-500 text-white',
                                    iconClassName: 'text-white',
                                }}
                            >
                                <div className="text-3xl font-bold tracking-tight text-white">
                                    {formatToRupiah(props.sum.expenseSum)}
                                </div>
                            </CardStatTwo>
                        </div>
                        <div className="col-span-1">
                            <CardStatTwo
                                data={{
                                    title: 'Tabungan',
                                    description: 'Total tabungan Anda pada tahun ini',
                                    icon: IconCashBanknote,
                                    background: 'bg-gradient-to-r from-sky-400 to-sky-500 via-sky-500 text-white',
                                    iconClassName: 'text-white',
                                }}
                            >
                                <div className="text-3xl font-bold tracking-tight text-white">
                                    {formatToRupiah(props.sum.balanceSum)}
                                </div>
                            </CardStatTwo>
                        </div>
                        <div className="col-span-1">
                            <CardStatTwo
                                data={{
                                    title: 'Kekayaan Bersih',
                                    description: 'Total kekayaan bersih Anda pada tahun ini',
                                    icon: IconPigMoney,
                                    background:
                                        'bg-gradient-to-r from-emerald-500 to-emerald-600 via-emerald-700 text-white',
                                    iconClassName: 'text-white',
                                }}
                            >
                                <div className="text-3xl font-bold tracking-tight text-white">
                                    {formatToRupiah(props.sum.netWorthSum)}
                                    <span className="text-sm font-light"> (Aset - Kewajiban)</span>
                                </div>
                            </CardStatTwo>
                        </div>
                    </div>

                    <BarChartCustom
                        title="Pemasukan vs Pengeluaran"
                        year={props.year}
                        chartData={props.incomeExpenseChart}
                    />
                </div>
                {/* tabs dan pie chart */}
                <div className="col-span-full space-y-6 lg:col-span-4">
                    {/* tabs */}
                    <Tabs defaultValue="goal">
                        <TabsList>
                            <TabsTrigger value="goal">Tujuan</TabsTrigger>
                            <TabsTrigger value="income">Pemasukan</TabsTrigger>
                            <TabsTrigger value="expense">Pengeluaran</TabsTrigger>
                        </TabsList>
                        <TabsContent value="goal">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Tujuan Keuangan</CardTitle>
                                    <CardDescription>
                                        Kelola tujuan keuangan Anda dengan lebih baik. Tetapkan target dan pantau
                                        progres Anda.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    {props.goals.length === 0 ? (
                                        <EmptyState
                                            icon={IconPigMoney}
                                            title="Belum ada tujuan keuangan"
                                            subtitle="Tetapkan tujuan keuangan Anda untuk memulai perjalanan keuangan yang lebih baik."
                                        />
                                    ) : (
                                        <div>
                                            {props.goals.map((goal, index) => (
                                                <div
                                                    key={index}
                                                    className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
                                                >
                                                    <span className="flex h-2 w-2 translate-y-2 rounded-full bg-emerald-500" />
                                                    <div className="space-y-1">
                                                        <p className="text-sm font-medium leading-none">{goal.name}</p>
                                                        <p className="text-xs font-medium text-muted-foreground">{`${goal.percentage}%`}</p>
                                                        <p className="text-sm font-medium text-emerald-500">
                                                            {formatToRupiah(
                                                                Number(goal.balances_sum_amount) +
                                                                    Number(goal.beginning_balance),
                                                            )}
                                                            <span className="text-muted-foreground">
                                                                / {formatToRupiah(goal.nominal)}
                                                            </span>
                                                        </p>
                                                        <Progress value={goal.percentage} />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </TabsContent>
                        <TabsContent value="income">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Pemasukan</CardTitle>
                                    <CardDescription>Pemasukan terakhir Anda.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    {props.incomes.length === 0 ? (
                                        <EmptyState
                                            icon={IconMoneybagMoveBack}
                                            title="Belum ada pemasukan"
                                            subtitle="Mulailah untuk membuat pemasukan baru."
                                        />
                                    ) : (
                                        <div>
                                            {props.incomes.map((income, index) => (
                                                <div
                                                    key={index}
                                                    className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
                                                >
                                                    <span className="flex h-2 w-2 translate-y-2 rounded-full bg-emerald-500" />
                                                    <div className="space-y-1">
                                                        <p className="text-sm font-medium leading-none">
                                                            {income.budget.detail} - {income.budget.type}
                                                        </p>
                                                        <p className="text-sm font-medium text-emerald-500">
                                                            {formatToRupiah(income.nominal)}
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </TabsContent>
                        <TabsContent value="expense">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Pengeluaran</CardTitle>
                                    <CardDescription>Pengeluaran terakhir Anda.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    {props.expenses.length === 0 ? (
                                        <EmptyState
                                            icon={IconMoneybagMove}
                                            title="Belum ada pengeluaran"
                                            subtitle="Mulailah untuk membuat pengeluaran baru."
                                        />
                                    ) : (
                                        <div>
                                            {props.expenses.map((expense, index) => (
                                                <div
                                                    key={index}
                                                    className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
                                                >
                                                    <span className="flex h-2 w-2 translate-y-2 rounded-full bg-emerald-500" />
                                                    <div className="space-y-1">
                                                        <p className="text-sm font-medium leading-none">
                                                            {expense.description} - {expense.type}
                                                        </p>
                                                        <p className="text-sm font-medium text-emerald-500">
                                                            {formatToRupiah(expense.nominal)}
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                    {/* Pie Chart */}
                    <PieChartCustom
                        title="Anggaran"
                        year={props.year}
                        budgets={budgets}
                        chartConfig={chartConfigBudget}
                    />
                </div>
            </div>
        </div>
    );
}

Dashboard.layout = (page) => <AppLayout title="Dashboard" children={page} />;
