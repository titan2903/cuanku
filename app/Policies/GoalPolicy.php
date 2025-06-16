<?php

namespace App\Policies;

use App\Models\Goal;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class GoalPolicy
{
    /**
     * Create a new policy instance.
     */
    public function __construct()
    {
        //
    }

    public function view(User $user, Goal $goal): Response
    {
        return $user->id === $goal->user_id
            ? Response::allow()
            : Response::deny('You do not own this goal.');
    }

    public function create(User $user, Goal $goal): Response
    {
        return $user->id === $goal->user_id
            ? Response::allow()
            : Response::deny('You do not own this goal.');
    }

    public function update(User $user, Goal $goal): Response
    {
        return $user->id === $goal->user_id
            ? Response::allow()
            : Response::deny('You do not own this goal.');
    }

    public function delete(User $user, Goal $goal): Response
    {
        return $user->id === $goal->user_id
            ? Response::allow()
            : Response::deny('You do not own this goal.');
    }
}
