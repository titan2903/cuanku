import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/Components/ui/tooltip';
// --- SOLUSI 1: Impor 'cn' dari file utils Anda ---
import { cn, formatDateIndo } from '@/lib/utils';

export default function Productivity({ transactions }) {
    // Fungsi untuk menentukan warna background berdasarkan jumlah kontribusi
    const backgroundProductivity = (count) => {
        if (count === 0) {
            return 'bg-gray-200 dark:bg-gray-800/50 border-transparent';
        } else if (count > 0 && count <= 3) {
            return 'bg-emerald-300';
        } else if (count > 3 && count <= 10) {
            return 'bg-emerald-500';
        } else if (count > 10) {
            return 'bg-emerald-700';
        }
        return 'bg-background';
    };

    // Pengecekan untuk memastikan transactions adalah array yang valid sebelum diproses
    if (!Array.isArray(transactions) || transactions.length === 0) {
        return (
            <div className="flex items-center justify-center rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
                <p className="text-gray-500 dark:text-gray-400">Belum ada data kontribusi.</p>
            </div>
        );
    }

    const columns = [];
    let currentColumn = [];

    transactions.forEach((transaction, index) => {
        currentColumn.push(
            <TooltipProvider key={index}>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <div
                            className={cn(
                                'h-6 w-6 rounded-full border-input shadow-none',
                                backgroundProductivity(transaction.count),
                            )}
                            size="sm"
                        />
                    </TooltipTrigger>
                    <TooltipContent>
                        <p className="text-sm">
                            {transaction.count > 0 ? `${transaction.count} kontribusi` : 'Tidak ada kontribusi'} pada{' '}
                            {formatDateIndo(transaction.transaction_date)}
                        </p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>,
        );

        if (currentColumn.length === 7 || index === transactions.length - 1) {
            columns.push(currentColumn);
            currentColumn = [];
        }
    });

    if (currentColumn.length > 0) {
        columns.push(currentColumn);
    }

    return (
        <div className="flex flex-wrap gap-1.5">
            {columns.map((column, index) => (
                <div key={index} className="flex flex-col gap-1.5">
                    {column}
                </div>
            ))}
        </div>
    );
}
