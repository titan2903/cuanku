<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PrivacyController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Privacy/Index', [
            'page_settings' => [
                'title' => 'Kebijakan Privasi',
                'subtitle' => 'Halaman kebijakan privasi aplikasi CuanKu.'
            ]
        ]);
    }
}
