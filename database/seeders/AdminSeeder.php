<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Create the default admin account for production.
     */
    public function run(): void
    {
        User::firstOrCreate(
            ['email' => config('admin.email')],
            [
                'name' => config('admin.name'),
                'email_verified_at' => now(),
                'password' => Hash::make(config('admin.password')),
                'role' => 'admin',
            ]
        );
    }
}
