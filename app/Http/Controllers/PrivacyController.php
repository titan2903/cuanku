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
     *         description="Privacy policy retrieved successfully",
     *         @OA\JsonContent(
     *             @OA\Property(property="status", type="string", example="success"),
     *             @OA\Property(property="message", type="string", example="Privacy policy retrieved successfully.")
     *         )
     *     ),
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
