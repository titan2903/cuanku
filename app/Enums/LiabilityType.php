<?php

namespace App\Enums;

enum LiabilityType: string
{
    case SHORTTERMDEBT = 'Hutang Jangka Pendek';
    case MIDTERMDEBT = 'Hutang Jangka Menengah';
    case LONGTERMDEBT = 'Hutang Jangka Panjang';

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
