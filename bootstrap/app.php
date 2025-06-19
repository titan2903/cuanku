<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        //
    })
    ->withExceptions(function (Exceptions $exceptions) {
        $exceptions->respond(function (Response $response, Throwable $exception, Request $request) {
            if (
                ! app()->environment(['local', 'testing']) &&
                in_array($response->getStatusCode(), [500, 503, 404, 403, 401, 422, 400, 429])
            ) {
                $response->setContent('An error occurred. Please try again later.');

                return inertia('ErrorHandling', [
                    'status' => $response->getStatusCode(),
                    'message' => $exception->getMessage(),
                ])
                    ->toResponse($request)
                    ->setStatusCode($response->getStatusCode());
            } elseif ($response->getStatusCode() === 419) {
                return back()->with([
                    'message' => 'Page expired. Please refresh and try again.',
                ]);
            }

            return $response;
        });
    })
    ->create();
