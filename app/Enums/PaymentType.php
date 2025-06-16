<?php

namespace App\Enums;

enum PaymentType: string
{
    case CASH = 'Kas';
    case DEBIT = 'Kartu Debit';
    case CREDIT = 'Kartu Kredit';
    case EWALLET = 'Dompet Elektronik';

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
