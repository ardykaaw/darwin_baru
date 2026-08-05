<?php

namespace App\Http\Controllers;

use App\Models\News;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class NewsController extends Controller
{
    public function index(): Response
    {
        $news = News::where('is_published', true)
            ->orderBy('created_at', 'desc')
            ->paginate(9)
            ->withQueryString()
            ->through(fn (News $item) => [
                'id' => $item->id,
                'title' => $item->title,
                'slug' => $item->slug,
                'content' => $item->content,
                'image' => $item->image ? Storage::url($item->image) : null,
                'created_at' => $item->created_at->format('d M Y'),
            ]);

        return Inertia::render('news/index', compact('news'));
    }

    public function show(News $news): Response
    {
        return Inertia::render('news/show', [
            'news' => [
                'id' => $news->id,
                'title' => $news->title,
                'slug' => $news->slug,
                'content' => $news->content,
                'image' => $news->image ? Storage::url($news->image) : null,
                'created_at' => $news->created_at->format('d M Y'),
            ],
        ]);
    }
}
