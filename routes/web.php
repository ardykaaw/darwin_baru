<?php

use App\Http\Controllers\ActivityController;
use App\Http\Controllers\Admin\ActivityController as AdminActivityController;
use App\Http\Controllers\Admin\AuthController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\GalleryController as AdminGalleryController;
use App\Http\Controllers\Admin\NewsController as AdminNewsController;
use App\Http\Controllers\Admin\ReportController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\GalleryController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\LaporController;
use App\Http\Controllers\NewsController;
use Illuminate\Support\Facades\Route;

// --- PUBLIC ROUTES ---
Route::get('/', [HomeController::class, 'index'])->name('home');

// Aplikasi ini hanya memiliki akun admin — semua jalur auth publik
// diarahkan ke panel admin.
Route::redirect('/login', '/admin/login')->name('login');
Route::redirect('/register', '/admin/login');

Route::redirect('/berita', '/news');
Route::redirect('/galeri', '/galleries');

Route::get('/activities', [ActivityController::class, 'index'])->name('activities.index');
Route::get('/activities/{activity}', [ActivityController::class, 'show'])->name('activities.show');

Route::get('/news', [NewsController::class, 'index'])->name('news.index');
Route::get('/news/{news:slug}', [NewsController::class, 'show'])->name('news.show');

Route::get('/galleries', [GalleryController::class, 'index'])->name('galleries.index');

Route::get('/lapor', [LaporController::class, 'create'])->name('lapor.create');
Route::post('/lapor', [LaporController::class, 'store'])->name('lapor.store');

// --- ADMIN ROUTES ---
Route::prefix('admin')->group(function () {
    Route::get('/login', [AuthController::class, 'showLoginForm'])->name('admin.login');
    Route::post('/login', [AuthController::class, 'login']);

    Route::middleware(['role:admin'])->group(function () {
        Route::get('/', [DashboardController::class, 'index'])->name('admin.dashboard');
        Route::get('/dashboard', [DashboardController::class, 'index']);

        Route::get('/activities', [AdminActivityController::class, 'index'])->name('admin.activities.index');
        Route::get('/activities/create', [AdminActivityController::class, 'create'])->name('admin.activities.create');
        Route::post('/activities', [AdminActivityController::class, 'store'])->name('admin.activities.store');
        Route::get('/activities/{activity}/edit', [AdminActivityController::class, 'edit'])->name('admin.activities.edit');
        Route::put('/activities/{activity}', [AdminActivityController::class, 'update'])->name('admin.activities.update');
        Route::delete('/activities/{activity}', [AdminActivityController::class, 'destroy'])->name('admin.activities.destroy');

        Route::get('/news', [AdminNewsController::class, 'index'])->name('admin.news.index');
        Route::get('/news/create', [AdminNewsController::class, 'create'])->name('admin.news.create');
        Route::post('/news', [AdminNewsController::class, 'store'])->name('admin.news.store');
        Route::get('/news/{news}/edit', [AdminNewsController::class, 'edit'])->name('admin.news.edit');
        Route::put('/news/{news}', [AdminNewsController::class, 'update'])->name('admin.news.update');
        Route::delete('/news/{news}', [AdminNewsController::class, 'destroy'])->name('admin.news.destroy');

        Route::get('/galleries', [AdminGalleryController::class, 'index'])->name('admin.galleries.index');
        Route::post('/galleries', [AdminGalleryController::class, 'store'])->name('admin.galleries.store');
        Route::delete('/galleries/{gallery}', [AdminGalleryController::class, 'destroy'])->name('admin.galleries.destroy');

        Route::get('/reports', [ReportController::class, 'index'])->name('admin.reports.index');
        Route::get('/reports/{report}', [ReportController::class, 'show'])->name('admin.reports.show');
        Route::patch('/reports/{report}/status', [ReportController::class, 'updateStatus'])->name('admin.reports.status');
        Route::delete('/reports/{report}', [ReportController::class, 'destroy'])->name('admin.reports.destroy');

        Route::get('/users', [UserController::class, 'index'])->name('admin.users.index');
        Route::post('/users', [UserController::class, 'store'])->name('admin.users.store');
        Route::put('/users/{user}', [UserController::class, 'update'])->name('admin.users.update');
        Route::post('/users/{user}/reset-password', [UserController::class, 'resetPassword'])->name('admin.users.reset-password');
        Route::delete('/users/{user}', [UserController::class, 'destroy'])->name('admin.users.destroy');

        Route::post('/logout', [AuthController::class, 'logout'])->name('admin.logout');
    });
});

// --- DASHBOARD (hanya admin) ---
Route::get('/dashboard', fn () => redirect()->route('admin.dashboard'))->name('dashboard');
