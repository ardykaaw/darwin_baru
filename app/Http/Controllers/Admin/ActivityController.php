<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Activity;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class ActivityController extends Controller
{
    public function index(Request $request): Response
    {
        $search = $request->string('search');

        $activities = Activity::query()
            ->when($search, function ($query, $search) {
                $query->where('title', 'like', "%{$search}%")
                    ->orWhere('content', 'like', "%{$search}%");

                return $query;
            })
            ->orderBy('date', 'desc')
            ->paginate(10)
            ->withQueryString()
            ->through(fn (Activity $activity): array => [
                'id' => $activity->id,
                'title' => $activity->title,
                'content' => $activity->content,
                'date' => $activity->date->format('Y-m-d'),
                'date_label' => $activity->date->format('d M Y'),
                'image' => $activity->image ? Storage::url($activity->image) : null,
                'created_at' => $activity->created_at->format('d M Y'),
            ]);

        return Inertia::render('admin/activities/index', [
            'activities' => $activities,
            'search' => $search,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/activities/form');
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'date' => 'required|date',
            'image' => 'nullable|image|max:4096',
        ]);

        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('activities', 'public');
        }

        Activity::create($validated);

        return redirect('/admin/activities')->with('success', 'Aktivitas berhasil ditambahkan.');
    }

    public function edit(Activity $activity): Response
    {
        return Inertia::render('admin/activities/form', [
            'activity' => [
                'id' => $activity->id,
                'title' => $activity->title,
                'content' => $activity->content,
                'date' => $activity->date->format('Y-m-d'),
                'image' => $activity->image ? Storage::url($activity->image) : null,
            ],
        ]);
    }

    public function update(Request $request, Activity $activity): RedirectResponse
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'date' => 'required|date',
            'image' => 'nullable|image|max:4096',
        ]);

        if ($request->hasFile('image')) {
            if ($activity->image) {
                Storage::disk('public')->delete($activity->image);
            }
            $validated['image'] = $request->file('image')->store('activities', 'public');
        }

        $activity->update($validated);

        return redirect('/admin/activities')->with('success', 'Aktivitas berhasil diperbarui.');
    }

    public function destroy(Activity $activity): RedirectResponse
    {
        if ($activity->image) {
            Storage::disk('public')->delete($activity->image);
        }
        $activity->delete();

        return back()->with('success', 'Aktivitas berhasil dihapus.');
    }
}
