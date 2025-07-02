<?php

namespace App\Helpers;

if (! function_exists('App\Helpers\flashMessage')) {
    function flashMessage($message, $type = 'success')
    {
        session()->flash('message', $message);
        session()->flash('type', $type);
    }
}
