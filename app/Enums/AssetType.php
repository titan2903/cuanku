<?php

namespace App\Enums;

enum AssetType: string
{
    case CASH = 'kas';
    case PERSONAL = 'Personal';
    case SHORTTERM = 'Investasi Jangka Pendek';
    case MIDTERM = 'Investasi Jangka Menengah';
    case LONGTERM = 'Investasi Jangka Panjang';

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
