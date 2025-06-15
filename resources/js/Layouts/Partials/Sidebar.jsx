import ApplicationLogo from '@/Components/ApplicationLogo';
import NavLink from '@/Components/NavLink';
import { Avatar, AvatarFallback, AvatarImage } from '@/Components/ui/avatar';
import { Card, CardContent } from '@/Components/ui/card';
import { router } from '@inertiajs/react';
import {
    IconCalendarEvent,
    IconChartArrowsVertical,
    IconCreditCardPay,
    IconDoorEnter,
    IconDoorExit,
    IconLogout2,
    IconLogs,
    IconMoneybag,
    IconPigMoney,
} from '@tabler/icons-react';
export default function Sidebar({ auth, url }) {
    const handleLogout = () => {
        router.post(
            '/logout',
            {},
            {
                onSuccess: () => {
                    // Session akan otomatis dihapus oleh Laravel di server
                    console.log('Logged out successfully');
                },
            },
        );
    };

    return (
        <nav className="flex flex-1 flex-col gap-y-6">
            <ApplicationLogo url="#" />
            <Card>
                <CardContent className="flex items-center gap-x-3 p-3">
                    <Avatar>
                        <AvatarImage src={auth.avatar} />
                        <AvatarFallback>{auth.name.substring(0, 1)}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                        <span className="line-clamp-1 text-sm font-medium leading-relaxed tracking-tighter">
                            {auth.name}
                        </span>
                        <span className="line-clamp-1 text-xs font-light">{auth.id}</span>
                    </div>
                </CardContent>
            </Card>
            <ul role="list" className="flex flex-1 flex-col gap-y-2">
                <div className="px-3 py-2 text-sm font-medium text-muted-foreground">Master</div>
                <NavLink
                    url="#"
                    active={url.startsWith('/payments')}
                    title="Metode Pembayaran"
                    icon={IconCreditCardPay}
                />

                <div className="px-3 py-2 text-sm font-medium text-muted-foreground">Rencana</div>
                <NavLink
                    url={route('goals.index')}
                    active={url.startsWith('/goals')}
                    title="Tujuan"
                    icon={IconMoneybag}
                />

                <div className="px-3 py-2 text-sm font-medium text-muted-foreground">Pelacakan</div>
                <NavLink url="#" active={url.startsWith('/budgets')} title="Anggaran" icon={IconChartArrowsVertical} />

                <NavLink url="#" active={url.startsWith('/incomes')} title="Pemasukan" icon={IconDoorEnter} />

                <NavLink url="#" active={url.startsWith('/expenses')} title="Pengeluaran" icon={IconDoorExit} />

                <div className="px-3 py-2 text-sm font-medium text-muted-foreground">Aset dan Kewajiban</div>
                <NavLink url="#" active={url.startsWith('/net-worths')} title="Kekayaan Bersih" icon={IconPigMoney} />

                <div className="px-3 py-2 text-sm font-medium text-muted-foreground">Laporan</div>
                <NavLink
                    url="#"
                    active={url.startsWith('/report-tranckings')}
                    title="Laporan Pelacakan"
                    icon={IconLogs}
                />

                <NavLink
                    url="#"
                    active={url.startsWith('/annual-reports')}
                    title="Laporan Tahunan"
                    icon={IconCalendarEvent}
                />

                <div className="px-3 py-2 text-sm font-medium text-muted-foreground">Lainnya</div>
                <NavLink
                    url="/login"
                    active={url.startsWith('/logout')}
                    title="Logout"
                    icon={IconLogout2}
                    className="w-full"
                    onClick={handleLogout}
                />
            </ul>
        </nav>
    );
}
