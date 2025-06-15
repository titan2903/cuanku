<?php

namespace App\Enums;

enum BudgetType: string
{
    case INCOME = 'penghasilan';
    case EXPENSE = 'expense';
    case SAVING = 'Tabungan dan Investasi';
    case SHOPPING = 'Belanja';
    case DEBT = 'Cicilan Utang';
    case BILL = 'Tagihan';

    public static function options(array $exclude = []): array
    {
        return collect(self::cases())
            ->filter(fn ($item) => ! in_array($item->name, $exclude))
            ->map(fn ($item) => [
                'value' => $item->value,
                'label' => $item->value,
            ])->values()->toArray();
    }
}
