<?php

namespace App\Enums;

enum RoleType: string
{
    case ADMIN = 'admin';
    case USER = 'user';

    /**
     * Get all role values as array
     */
    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }

    /**
     * Get role options for forms/selects
     */
    public static function options(): array
    {
        return [
            self::ADMIN->value => 'Admin',
            self::USER->value => 'User',
        ];
    }

    /**
     * Get the label for display
     */
    public function label(): string
    {
        return match ($this) {
            self::ADMIN => 'Admin',
            self::USER => 'User',
        };
    }

    /**
     * Check if the role is admin
     */
    public function isAdmin(): bool
    {
        return $this === self::ADMIN;
    }

    /**
     * Check if the role is user
     */
    public function isUser(): bool
    {
        return $this === self::USER;
    }
}
