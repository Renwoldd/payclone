<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Cross-Origin Resource Sharing (CORS) Configuration
    |--------------------------------------------------------------------------
    |
    | This config allows your React frontend to securely communicate with
    | your Laravel backend during development and production.
    |
    */

    'paths' => [
        'api/*',
        'register',
        'login',
        'logout',
        'user',
        '2fa/setup',
        '2fa/verify',
        '2fa/disable',
        'sanctum/csrf-cookie',
    ],

    'allowed_methods' => ['*'],

    'allowed_origins' => [
        'http://localhost:3000',
        'http://127.0.0.1:3000',
        'http://localhost:5173',
        'http://127.0.0.1:5173',
    ],

    'allowed_origins_patterns' => [],

   'allowed_headers' => [
    'Content-Type',
    'X-Requested-With',
    'Authorization',
    'Accept',
    'Origin',
    'Referer',
    'User-Agent',
    'X-XSRF-TOKEN', // ✅ Add this line
],


    'exposed_headers' => [],

    'max_age' => 0,

    'supports_credentials' => true, // ✅ Keep false unless using cookies (e.g., Sanctum SPA mode)
];
