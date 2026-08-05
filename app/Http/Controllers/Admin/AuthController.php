<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class AuthController extends Controller
{
    public function showLoginForm(): Response
    {
        return Inertia::render('admin/auth/login', [
            'status' => session('status'),
        ]);
    }

    public function login(Request $request): RedirectResponse
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        $throttleKey = Str::lower($request->input('email')).'|'.$request->ip();

        if (RateLimiter::tooManyAttempts($throttleKey, 5)) {
            return back()->withErrors([
                'email' => 'Terlalu banyak percobaan login. Silakan coba lagi beberapa menit kemudian.',
            ])->onlyInput('email');
        }

        if (Auth::attempt($credentials)) {
            if (Auth::user()->role !== 'admin') {
                Auth::logout();

                return back()->withErrors([
                    'email' => 'Akses admin dibatasi untuk pengguna tertentu.',
                ])->onlyInput('email');
            }

            RateLimiter::clear($throttleKey);
            $request->session()->regenerate();
            $request->session()->forget('url.intended');

            return redirect()->route('admin.dashboard');
        }

        RateLimiter::hit($throttleKey, 60);

        return back()->withErrors([
            'email' => 'Email atau password tidak sesuai.',
        ])->onlyInput('email');
    }

    public function logout(Request $request): RedirectResponse
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/admin/login');
    }
}
