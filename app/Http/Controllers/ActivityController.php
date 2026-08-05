<?php

namespace App\Http\Controllers;

use App\Models\Activity;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class ActivityController extends Controller
{
    public function index(): Response
    {
        $activities = Activity::orderBy('date', 'desc')
            ->paginate(9)
            ->withQueryString()
            ->through(fn (Activity $activity): array => [
                'id' => $activity->id,
                'title' => $activity->title,
                'content' => $activity->content,
                'date' => $activity->date->format('d M Y'),
                'image' => $activity->image ? Storage::url($activity->image) : null,
            ]);

        return Inertia::render('activities/index', compact('activities'));
    }

    public function show(Activity $activity): Response
    {
        $otherActivities = Activity::where('id', '!=', $activity->id)
            ->orderBy('date', 'desc')
            ->take(3)
            ->get()
            ->map(fn (Activity $item): array => [
                'id' => $item->id,
                'title' => $item->title,
                'date' => $item->date->format('d M Y'),
                'image' => $item->image ? Storage::url($item->image) : null,
            ]);

        return Inertia::render('activities/show', [
            'activity' => [
                'id' => $activity->id,
                'title' => $activity->title,
                'content' => $activity->content,
                'date' => $activity->date->format('d M Y'),
                'image' => $activity->image ? Storage::url($activity->image) : null,
            ],
            'otherActivities' => $otherActivities,
        ]);
    }
}
