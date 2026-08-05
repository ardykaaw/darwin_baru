<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Inertia\Response;

class UserController extends Controller
{
    public function index(Request $request): Response
    {
        $search = $request->string('search');

        $users = User::query()
            ->when($search, function ($query, $search) {
                $query->where('name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%");

                return $query;
            })
            ->orderBy('name', 'asc')
            ->paginate(10)
            ->withQueryString()
            ->through(fn (User $user): array => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->role,
                'created_at' => $user->created_at->format('d M Y'),
            ]);

        return Inertia::render('admin/users/index', [
            'users' => $users,
            'search' => $search,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
        ]);

        User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make('password'),
            'role' => 'admin',
        ]);

        return back()->with('success', 'Akun admin berhasil ditambahkan.');
    }

    public function update(Request $request, User $user): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,'.$user->id,
        ]);

        $user->update($validated);

        return back()->with('success', 'Akun admin berhasil diperbarui.');
    }

    public function resetPassword(User $user): RedirectResponse
    {
        $user->password = Hash::make('password');
        $user->save();

        return back()->with('success', 'Password berhasil direset ke default (password).');
    }

    public function destroy(User $user): RedirectResponse
    {
        if ($user->id === auth()->id()) {
            return back()->withErrors([
                'error' => 'Anda tidak dapat menghapus akun Anda sendiri.',
            ]);
        }

        $user->delete();

        return back()->with('success', 'Akun admin berhasil dihapus.');
    }
}
