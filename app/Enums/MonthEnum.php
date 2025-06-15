<?php

namespace App\Enums;

use InvalidArgumentException;

enum MonthEnum: string
{
    case JANUARY = 'Januari';
    case FEBRUARY = 'Februari';
    case MARCH = 'Maret';
    case APRIL = 'April';
    case MAY = 'Mei';
    case JUNE = 'Juni';
    case JULY = 'Juli';
    case AUGUST = 'Agustus';
    case SEPTEMBER = 'September';
    case OCTOBER = 'Oktober';
    case NOVEMBER = 'November';
    case DECEMBER = 'Desember';

    public static function options(array $exclude = []): array
    {
        return collect(self::cases())
            ->filter(fn ($item) => ! in_array($item->name, $exclude))
            ->map(fn ($item) => [
                'value' => $item->value,
                'label' => $item->value,
            ])->values()->toArray();
    }

    public static function month(int $month): self
    {
        return match ($month) {
            1 => self::JANUARY,
            2 => self::FEBRUARY,
            3 => self::MARCH,
            4 => self::APRIL,
            5 => self::MAY,
            6 => self::JUNE,
            7 => self::JULY,
            8 => self::AUGUST,
            9 => self::SEPTEMBER,
            10 => self::OCTOBER,
            11 => self::NOVEMBER,
            12 => self::DECEMBER,
            default => throw new InvalidArgumentException("Invalid month: {$month}"),
        };
    }
}
