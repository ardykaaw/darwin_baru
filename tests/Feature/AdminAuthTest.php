<?php

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

test('guests are redirected to the admin login page', function () {
    $this->get(route('admin.dashboard'))->assertRedirect(route('admin.login'));

    $this->get(route('admin.activities.index'))->assertRedirect(route('admin.login'));
});

test('non-admin users cannot access the admin panel', function () {
    $user = User::factory()->create(['role' => 'user']);
    $this->actingAs($user);

    $this->get(route('admin.dashboard'))->assertForbidden();
});

test('admin users can access the admin dashboard', function () {
    $admin = User::factory()->create(['role' => 'admin']);
    $this->actingAs($admin);

    $this->get(route('admin.dashboard'))->assertOk();
});

test('admin can log in with valid credentials', function () {
    User::factory()->create([
        'email' => 'admin@example.com',
        'role' => 'admin',
    ]);

    $this->post('/admin/login', [
        'email' => 'admin@example.com',
        'password' => 'password',
    ])->assertRedirect(route('admin.dashboard'));

    $this->assertAuthenticated();
});

test('admin login ignores a previously intended url', function () {
    User::factory()->create([
        'email' => 'admin@example.com',
        'role' => 'admin',
    ]);

    $this
        ->withSession(['url.intended' => route('dashboard')])
        ->post('/admin/login', [
            'email' => 'admin@example.com',
            'password' => 'password',
        ])->assertRedirect(route('admin.dashboard'));
});

test('admin login rejects regular users', function () {
    User::factory()->create([
        'email' => 'user@example.com',
        'role' => 'user',
    ]);

    $this->post('/admin/login', [
        'email' => 'user@example.com',
        'password' => 'password',
    ])->assertSessionHasErrors('email');

    $this->assertGuest();
});

test('admin login rejects invalid credentials', function () {
    $this->post('/admin/login', [
        'email' => 'admin@example.com',
        'password' => 'wrong-password',
    ])->assertSessionHasErrors('email');

    $this->assertGuest();
});

test('admin can log out', function () {
    $admin = User::factory()->create(['role' => 'admin']);
    $this->actingAs($admin);

    $this->post(route('admin.logout'))->assertRedirect('/admin/login');

    $this->assertGuest();
});
