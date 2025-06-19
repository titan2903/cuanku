<?php

namespace App\Policies;

use App\Models\NetWorth;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class NetWorthPolicy
{
    public function create(User $user, NetWorth $netWorth): Response
    {
        return $user->id === $netWorth->user_id
            ? Response::allow()
            : Response::denyAsNotFound();
    }

    public function update(User $user, NetWorth $netWorth): Response
    {
        return $user->id === $netWorth->user_id
            ? Response::allow()
            : Response::denyAsNotFound();
    }

    public function viewAny(User $user, NetWorth $netWorth): Response
    {
        return $user->id === $netWorth->user_id
            ? Response::allow()
            : Response::denyAsNotFound();
    }

    public function view(User $user, NetWorth $netWorth): Response
    {
        return $user->id === $netWorth->user_id
            ? Response::allow()
            : Response::denyAsNotFound();
    }

    public function delete(User $user, NetWorth $netWorth): Response
    {
        return $user->id === $netWorth->user_id
            ? Response::allow()
            : Response::denyAsNotFound();
    }
}
