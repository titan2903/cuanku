<?php

namespace App\Enums;

enum BudgetType: string
{
    // --- PERBAIKAN DI SINI ---
    // Mengubah nilai agar cocok dengan data di database ("Penghasilan" dengan P besar)
    case INCOME = 'Penghasilan'; 
    case EXPENSE = 'expense';
    case SAVING = 'Tabungan dan Investasi';
    case SHOPPING = 'Belanja';
    case DEBT = 'Cicilan Utang';
    case BILL = 'Tagihan';

    /**
     * Mengambil semua case sebagai array untuk opsi di form.
     * Label dibuat lebih ramah pengguna.
     */
    public static function options(array $exclude = []): array
    {
        return collect(self::cases())
            ->filter(fn ($item) => ! in_array($item->name, $exclude))
            ->map(fn ($item) => [
                'value' => $item->value,
                'label' => match($item) {
                    self::INCOME => 'Penghasilan',
                    self::EXPENSE => 'Pengeluaran',
                    self::SAVING => 'Tabungan dan Investasi',
                    self::SHOPPING => 'Belanja',
                    self::DEBT => 'Cicilan Utang',
                    self::BILL => 'Tagihan',
                },
            ])->values()->toArray();
    }
}
