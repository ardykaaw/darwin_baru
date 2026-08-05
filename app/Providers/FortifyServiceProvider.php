<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Laravel\Fortify\Fortify;

class FortifyServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        // Aplikasi ini hanya menggunakan autentikasi admin (kustom),
        // jadi seluruh rute Fortify (login publik, registrasi, reset
        // password, two-factor, passkeys) tidak didaftarkan sama sekali.
        Fortify::ignoreRoutes();
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
