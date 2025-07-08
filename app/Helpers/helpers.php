<?php

namespace App\Helpers;

if (! function_exists('App\Helpers\flashMessage')) {
    function flashMessage($message, $type = 'success')
    {
        session()->flash('message', $message);
        session()->flash('type', $type);
    }
}

if (! function_exists('App\Helpers\formatIndonesianDate')) {
    function formatIndonesianDate($date = null, $format = 'd F Y, H:i')
    {
        $carbonDate = $date ? \Carbon\Carbon::parse($date) : \Carbon\Carbon::now();

        return $carbonDate->locale('id')->translatedFormat($format);
    }
}

if (! function_exists('App\Helpers\nowIndonesia')) {
    function nowIndonesia($format = 'd F Y, H:i')
    {
        return \Carbon\Carbon::now('Asia/Jakarta')->locale('id')->translatedFormat($format);
    }
}
