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
class TermAndConditionController extends Controller
{
    /**
     * @OA\Get(
     *     path="/terms-and-conditions",
     *     summary="Get terms and conditions",
     *     tags={"Legal"},
     *     @OA\Response(
     *         response=200,
     *         description="Successful operation"
     *     )
     * )
     */
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
