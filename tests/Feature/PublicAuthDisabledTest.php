<?php

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

test('public login redirects to the admin login page', function () {
    $this->get('/login')->assertRedirect('/admin/login');
    $this->get(route('login'))->assertRedirect('/admin/login');
});

test('public registration is disabled', function () {
    $this->get('/register')->assertRedirect('/admin/login');
});

test('dashboard redirects to the admin panel', function () {
    $this->get(route('dashboard'))->assertRedirect(route('admin.dashboard'));
});

test('admin is redirected to the admin panel after logging in', function () {
    $admin = User::factory()->create(['role' => 'admin']);

    $this->actingAs($admin)
        ->get('/dashboard')
        ->assertRedirect(route('admin.dashboard'));
});
