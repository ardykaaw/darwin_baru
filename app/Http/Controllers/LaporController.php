<?php

namespace App\Http\Controllers;

use App\Models\Report;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class LaporController extends Controller
{
    public function create(): Response
    {
        return Inertia::render('lapor/index');
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string|min:10',
            'category' => 'nullable|string|max:255',
            'is_anonymous' => 'required|boolean',
            'reporter_name' => 'nullable|string|max:255',
            'reporter_phone' => 'nullable|string|max:255',
        ]);

        if ($validated['is_anonymous']) {
            $validated['reporter_name'] = null;
            $validated['reporter_phone'] = null;
        }

        Report::create($validated);

        return redirect('/lapor')->with('success', 'Laporan Anda berhasil dikirim! Terima kasih atas partisipasi Anda.');
    }
}
