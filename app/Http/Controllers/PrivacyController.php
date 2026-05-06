<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;

/**
 * @OA\Tag(
 *     name="Legal",
 *     description="API Endpoints for Legal Information"
 * )
 */
class PrivacyController extends Controller
{
    /**
     * @OA\Get(
     *     path="/privacy",
     *     summary="Get privacy policy",
     *     tags={"Legal"},
     *     @OA\Response(
     *         response=200,
     *         description="Successful operation"
     *     )
     * )
     */
    public function index(): Response
    {
        return Inertia::render('Privacy/Index', [
            'page_settings' => [
                'title' => 'Kebijakan Privasi CuanKu💲',
                'subtitle' => 'Halaman kebijakan privasi aplikasi CuanKu 💲.',
            ],
        ]);
    }
}
