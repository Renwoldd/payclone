<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Illuminate\Validation\Rules\Password;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'phone' => 'required|string|max:20',
            'password' => [
    'required',
    'confirmed',
    Password::min(8)
        ->mixedCase()
        ->letters()
        ->numbers()
        ->symbols()
        ->uncompromised(), 
 // checks against known data breaches Minimum 8 characters

//At least one uppercase and lowercase letter

//At least one number

//At least one symbol

//Not found in known data breaches
],
        ]);

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'phone' => $validated['phone'],
            'password' => Hash::make($validated['password']),
        ]);

        return response()->json([
            'user' => $user,
            'message' => 'Registration successful',
        ], 201);
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $user = User::where('email', $request->email)->first();

        if (! $user || ! Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['Invalid credentials.'],
            ]);
        }

        // 🔐 Check if 2FA is enabled
        if ($user->two_factor_enabled && $user->two_factor_secret) {
            return response()->json(['requires_2fa' => true]);
        }

        // 🔐 Log the user in using session-based auth
// 🔐 Log the user in using session-based auth
auth()->login($user);
$request->session()->regenerate();

return response()->json([
    'user' => $user,
    'message' => 'Login successful',
]);

    }

    public function logout(Request $request)
    {
        auth()->logout();

        return response()->json(['message' => 'Logged out']);
    }
}
