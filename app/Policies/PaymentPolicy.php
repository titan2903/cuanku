<?php

namespace App\Policies;

use App\Models\Payment;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class PaymentPolicy
{
    public function update(User $user, Payment $payment): Response
    {
        return $user->id === $payment->user_id
            ? Response::allow()
            : Response::denyAsNotFound();
    }

    public function delete(User $user, Payment $payment): Response
    {
        return $user->id === $payment->user_id
            ? Response::allow()
            : Response::denyAsNotFound();
    }
}
