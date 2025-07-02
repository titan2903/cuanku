<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;

class TermAndConditionController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('TermAndCondition/Index', [
            'page_settings' => [
                'title' => 'Syarat dan Ketentuan CuanKu💲',
                'subtitle' => 'Halaman syarat dan ketentuan aplikasi CuanKu 💲.',
            ],
        ]);
    }
}
