<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\News;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class NewsController extends Controller
{
    public function index(Request $request): Response
    {
        $search = $request->string('search');

        $news = News::query()
            ->when($search, function ($query, $search) {
                $query->where('title', 'like', "%{$search}%")
                    ->orWhere('content', 'like', "%{$search}%");

                return $query;
            })
            ->latest()
            ->paginate(10)
            ->withQueryString()
            ->through(fn (News $item): array => $this->formatNews($item));

        return Inertia::render('admin/news/index', [
            'news' => $news,
            'search' => $search,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/news/form');
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'image' => 'nullable|image|max:4096',
            'is_published' => 'boolean',
        ]);

        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('news', 'public');
        }

        $validated['is_published'] = $request->boolean('is_published', true);
        $validated['slug'] = $this->generateUniqueSlug($validated['title']);

        News::create($validated);

        return redirect('/admin/news')->with('success', 'Berita berhasil ditambahkan.');
    }

    public function edit(News $news): Response
    {
        return Inertia::render('admin/news/form', [
            'news' => $this->formatNews($news),
        ]);
    }

    public function update(Request $request, News $news): RedirectResponse
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'image' => 'nullable|image|max:4096',
            'is_published' => 'boolean',
        ]);

        if ($request->hasFile('image')) {
            if ($news->image) {
                Storage::disk('public')->delete($news->image);
            }
            $validated['image'] = $request->file('image')->store('news', 'public');
        }

        $validated['is_published'] = $request->boolean('is_published', true);
        $validated['slug'] = $this->generateUniqueSlug($validated['title'], $news->id);

        $news->update($validated);

        return redirect('/admin/news')->with('success', 'Berita berhasil diperbarui.');
    }

    public function destroy(News $news): RedirectResponse
    {
        if ($news->image) {
            Storage::disk('public')->delete($news->image);
        }
        $news->delete();

        return back()->with('success', 'Berita berhasil dihapus.');
    }

    /**
     * @return array<string, mixed>
     */
    private function formatNews(News $item): array
    {
        return [
            'id' => $item->id,
            'title' => $item->title,
            'slug' => $item->slug,
            'content' => $item->content,
            'image' => $item->image ? Storage::url($item->image) : null,
            'is_published' => $item->is_published,
            'created_at' => $item->created_at->format('d M Y'),
        ];
    }

    private function generateUniqueSlug(string $title, ?int $ignoreId = null): string
    {
        $baseSlug = Str::slug($title);
        $slug = $baseSlug;
        $count = 1;

        while (News::where('slug', $slug)
            ->when($ignoreId, fn ($query) => $query->where('id', '!=', $ignoreId))
            ->exists()) {
            $slug = $baseSlug.'-'.$count++;
        }

        return $slug;
    }
}
