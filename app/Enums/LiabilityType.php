<?php

namespace App\Enums;

enum LiabilityType: string
{
    case SHORTTERMDEBT = 'Utang Jangka Pendek';
    case MIDTERMDEBT = 'Utang Jangka Menengah';
    case LONGTERMDEBT = 'Utang Jangka Panjang';

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
