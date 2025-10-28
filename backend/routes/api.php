<?php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\TwoFactorController;

// ✅ Public routes (no auth)
Route::post('/register', [AuthController::class, 'register']);
Route::post('/2fa/verify-login', [TwoFactorController::class, 'verifyLogin'])
    ->middleware(['web', 'throttle:5,1']); // must have 'web' for session/cookie

// ✅ Authenticated (session-based)
Route::middleware(['web', 'auth:sanctum'])->group(function () {
    Route::get('/user', fn(Request $request) => response()->json($request->user()));
    Route::post('/2fa/setup', [TwoFactorController::class, 'setup']);
    Route::post('/2fa/verify', [TwoFactorController::class, 'verify']);
    Route::post('/2fa/disable', [TwoFactorController::class, 'disable']);
});