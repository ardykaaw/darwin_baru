<?php

namespace App\Http\Controllers;

use App\Models\Activity;
use App\Models\Gallery;
use App\Models\News;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function index(): Response
    {
        $activities = Activity::orderBy('date', 'desc')->take(3)->get()->map(function (Activity $activity) {
            return [
                'id' => $activity->id,
                'title' => $activity->title,
                'content' => $activity->content,
                'date' => $activity->date->format('d M Y'),
                'image' => $activity->image ? Storage::url($activity->image) : null,
            ];
        });

        $latestNews = News::where('is_published', true)
            ->orderBy('created_at', 'desc')
            ->take(3)
            ->get()
            ->map(function (News $news) {
                return [
                    'id' => $news->id,
                    'title' => $news->title,
                    'slug' => $news->slug,
                    'content' => $news->content,
                    'image' => $news->image ? Storage::url($news->image) : null,
                    'created_at' => $news->created_at->format('d M Y'),
                ];
            });

        $latestGalleries = Gallery::orderBy('created_at', 'desc')->take(3)->get()->map(function (Gallery $gallery) {
            return [
                'id' => $gallery->id,
                'title' => $gallery->title,
                'image' => Storage::url($gallery->image_path),
            ];
        });

        return Inertia::render('home', compact('activities', 'latestNews', 'latestGalleries'));
    }
}
