<?php

namespace App\Http\Controllers;

/**
 * @OA\Info(
 *     title="Cuanku API Documentation",
 *     version="1.0.0",
 *     description="API documentation for Cuanku Financial Management App",
 *     @OA\Contact(
 *         email="admin@cuanku.web.id"
 *     )
 * )
 * @OA\Server(
 *     url="http://localhost:8000",
 *     description="Local Server"
 * )
 *
 * @OA\Schema(
 *     schema="ValidationError",
 *     title="Validation Error",
 *     description="Validation error response",
 *     @OA\Property(property="message", type="string", example="The given data was invalid."),
 *     @OA\Property(
 *         property="errors",
 *         type="object",
 *         additionalProperties={
 *             "type":"array",
 *             "items":{"type":"string"}
 *         },
 *         example={
 *             "field_name": {"The field_name is required."}
 *         }
 *     )
 * )
 *
 * @OA\Schema(
 *     schema="Unauthorized",
 *     title="Unauthorized",
 *     description="Unauthorized error response",
 *     @OA\Property(property="message", type="string", example="Unauthenticated.")
 * )
 *
 * @OA\Schema(
 *     schema="NotFound",
 *     title="Not Found",
 *     description="Resource not found response",
 *     @OA\Property(property="message", type="string", example="No query results for model.")
 * )
 *
 * @OA\Schema(
 *     schema="Forbidden",
 *     title="Forbidden",
 *     description="Forbidden error response",
 *     @OA\Property(property="message", type="string", example="This action is unauthorized.")
 * )
 *
 * @OA\Schema(
 *     schema="Success",
 *     title="Success",
 *     @OA\Property(property="status", type="string", example="success"),
 *     @OA\Property(property="message", type="string", example="Operation completed successfully.")
 * )
 *
 * @OA\Schema(
 *     schema="RegisterRequest",
 *     required={"name", "email", "password", "password_confirmation", "phone_number"},
 *     @OA\Property(property="name", type="string", example="John Doe"),
 *     @OA\Property(property="email", type="string", format="email", example="john@example.com"),
 *     @OA\Property(property="password", type="string", format="password", example="password"),
 *     @OA\Property(property="password_confirmation", type="string", format="password", example="password"),
 *     @OA\Property(property="phone_number", type="string", example="08123456789")
 * )
 */
abstract class Controller
{
    //
}
