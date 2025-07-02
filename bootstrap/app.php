<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Sentry\Laravel\Integration;
use Symfony\Component\HttpFoundation\Response;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        $middleware->trustProxies(at: '*');
    })
    ->withExceptions(function (Exceptions $exceptions) {
        Integration::handles($exceptions);
        $exceptions->respond(function (Response $response, Throwable $exception, Request $request) {
            // Log error terlebih dahulu
            if ($response->getStatusCode() >= 500) {
                Log::error($exception->getMessage(), ['exception' => $exception]);
            }

            try {
                if (! app()->environment(['local', 'testing']) &&
                    in_array($response->getStatusCode(), [500, 503, 404, 403, 401, 422, 400, 429])) {

                    // Return respons sederhana untuk mencegah recursive error
                    if ($request->expectsJson() || $request->wantsJson()) {
                        return response()->json([
                            'error' => 'Server error occurred',
                            'status' => $response->getStatusCode(),
                        ], $response->getStatusCode());
                    }

                    // Coba render view Inertia, tetapi dengan handling error tambahan
                    return inertia('ErrorHandling', [
                        'status' => $response->getStatusCode(),
                        'message' => app()->environment('production') ? 'An error occurred' : $exception->getMessage(),
                    ])->toResponse($request)->setStatusCode($response->getStatusCode());
                }
                // ...
            } catch (\Throwable $e) {
                // Fallback jika error handling juga error
                Log::error('Error dalam error handling: '.$e->getMessage());

                return response('Server Error', 500);
            }

            return $response;
        });
    })
    ->create();
