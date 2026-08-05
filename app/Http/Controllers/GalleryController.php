<?php

namespace App\Http\Controllers;

use App\Models\Gallery;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class GalleryController extends Controller
{
    public function index(): Response
    {
        $galleries = Gallery::orderBy('created_at', 'desc')
            ->paginate(12)
            ->withQueryString()
            ->through(fn (Gallery $gallery) => [
                'id' => $gallery->id,
                'title' => $gallery->title,
                'image' => Storage::url($gallery->image_path),
            ]);

        return Inertia::render('galleries/index', compact('galleries'));
    }
}
