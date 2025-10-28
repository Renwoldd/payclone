<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use PragmaRX\Google2FA\Google2FA;

class TwoFactorController extends Controller
{
    public function setup(Request $request)
    {
        $user = $request->user();
        $google2fa = new Google2FA();

        $secret = $google2fa->generateSecretKey();
        $user->update([
            'two_factor_secret' => $secret,
        ]);

      
        $issuer = 'SecurePayApp';
        $email = $user->email;
        $otpAuth = "otpauth://totp/{$issuer}:{$email}?secret={$secret}&issuer={$issuer}";

      
        $qr = "https://quickchart.io/qr?text=" . urlencode($otpAuth);


        \Log::info('Generated QR URL: ' . $qr);


        return response()->json([
            'qr' => $qr,
            'secret' => $secret,
        ]);
    }

    public function verify(Request $request)
    {
        $request->validate([
            'code' => 'required|digits:6',
        ]);

        $user = $request->user();
        $google2fa = new Google2FA();

        $valid = $google2fa->verifyKey($user->two_factor_secret, $request->code);

        if (! $valid) {
            return response()->json(['message' => 'Invalid code'], 422);
        }

        $user->update([
            'two_factor_enabled' => true,
        ]);

        return response()->json(['message' => '2FA enabled']);
    }

    public function disable(Request $request)
    {
        $request->validate([
            'password' => 'required',
        ]);

        $user = $request->user();

        if (! Hash::check($request->password, $user->password)) {
            return response()->json(['message' => 'Invalid password'], 403);
        }

        $user->update([
            'two_factor_enabled' => false,
            'two_factor_secret' => null,
        ]);

        return response()->json(['message' => '2FA disabled']);
    }

   public function verifyLogin(Request $request)
{
    $request->validate([
        'email' => 'required|email',
        'password' => 'required',
        'code' => 'required|digits:6',
    ]);

    $user = \App\Models\User::where('email', $request->email)->first();

    if (! $user || ! Hash::check($request->password, $user->password)) {
        return response()->json(['message' => 'Invalid credentials'], 401);
    }

    if (! $user->two_factor_enabled || ! $user->two_factor_secret) {
        return response()->json(['message' => '2FA not enabled'], 403);
    }

    $google2fa = new Google2FA();
    $valid = $google2fa->verifyKey($user->two_factor_secret, $request->code);

    if (! $valid) {
        return response()->json(['message' => 'Invalid code'], 422);
    }

    // ✅ Start session-based login
    Auth::login($user);

    $user->update([
        'last_login_at' => now(),
        'last_login_ip' => $request->ip(),
        'last_login_user_agent' => $request->header('User-Agent'),
    ]);

    return response()->json(['message' => '2FA verified']);
}
}