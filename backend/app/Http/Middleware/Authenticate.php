<?php

namespace App\Http\Middleware;

use Illuminate\Auth\Middleware\Authenticate as Middleware;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\Request;

class Authenticate extends Middleware
{
    /**
     * Get the path the user should be redirected to when they are not authenticated.
     */
    protected function redirectTo($request)
    {
        // 🔒 For API-based apps, don't redirect — just return 401
        if (! $request->expectsJson()) {
            abort(401, 'Unauthenticated.');
        }
    }

    /**
     * Handle unauthenticated requests.
     */
    protected function unauthenticated($request, array $guards)
    {
        // ✅ Log detailed info about the unauthorized request
        Log::warning('Unauthorized request detected', [
            'path' => $request->path(),
            'ip' => $request->ip(),
            'headers' => $request->headers->all(),
            'method' => $request->method(),
            'user_agent' => $request->userAgent(),
        ]);

        // Instead of redirecting, return JSON response
        throw new \Illuminate\Auth\AuthenticationException(
            'Unauthenticated.',
            $guards,
            $this->redirectTo($request)
        );
    }
}
