<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Gallery;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class GalleryController extends Controller
{
    public function index(): Response
    {
        $galleries = Gallery::latest()
            ->paginate(12)
            ->withQueryString()
            ->through(fn (Gallery $gallery) => [
                'id' => $gallery->id,
                'title' => $gallery->title,
                'image' => Storage::url($gallery->image_path),
                'created_at' => $gallery->created_at->format('d M Y'),
            ]);

        return Inertia::render('admin/galleries/index', compact('galleries'));
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'image' => 'required|image|max:4096',
        ]);

        $validated['image_path'] = $request->file('image')->store('galleries', 'public');

        Gallery::create($validated);

        return redirect('/admin/galleries')->with('success', 'Galeri berhasil ditambahkan.');
    }

    public function destroy(Gallery $gallery): RedirectResponse
    {
        if ($gallery->image_path) {
            Storage::disk('public')->delete($gallery->image_path);
        }
        $gallery->delete();

        return back()->with('success', 'Galeri berhasil dihapus.');
    }
}
