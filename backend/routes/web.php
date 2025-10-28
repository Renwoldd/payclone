<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use App\Http\Controllers\AuthController;

// ✅ Public landing page
Route::get('/', function () {
    return view('welcome');
});

// ✅ Sanctum CSRF cookie route (served internally — no need to define manually)

// ✅ Login/logout must use web middleware for session + CSRF
Route::middleware(['web'])->group(function () {
    Route::post('/api/login', [AuthController::class, 'login'])->middleware('throttle:5,1');
    Route::post('/api/logout', [AuthController::class, 'logout']);
});
