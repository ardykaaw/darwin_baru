<?php

use App\Models\Activity;
use App\Models\Gallery;
use App\Models\News;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

test('home page returns a successful response', function () {
    $this->get(route('home'))->assertOk();
});

test('activities index page lists activities', function () {
    Activity::create([
        'title' => 'Kegiatan Sains',
        'content' => 'Deskripsi kegiatan.',
        'date' => now()->addDay(),
    ]);

    $this->get(route('activities.index'))
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('activities/index')
            ->has('activities.data', 1)
        );
});

test('activities show page renders the activity', function () {
    $activity = Activity::create([
        'title' => 'Kegiatan Sains',
        'content' => 'Deskripsi kegiatan.',
        'date' => now()->addDay(),
    ]);

    $this->get(route('activities.show', $activity))
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('activities/show')
            ->where('activity.title', 'Kegiatan Sains')
        );
});

test('news index page lists published news', function () {
    News::create([
        'title' => 'Berita Darwin Center',
        'slug' => 'berita-darwin-center',
        'content' => 'Isi berita.',
        'is_published' => true,
    ]);

    $this->get(route('news.index'))
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('news/index')
            ->has('news.data', 1)
        );
});

test('news show page renders the news by slug', function () {
    $news = News::create([
        'title' => 'Berita Darwin Center',
        'slug' => 'berita-darwin-center',
        'content' => 'Isi berita.',
        'is_published' => true,
    ]);

    $this->get(route('news.show', $news))
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('news/show')
            ->where('news.title', 'Berita Darwin Center')
        );
});

test('galleries index page returns a successful response', function () {
    Gallery::create([
        'title' => 'Foto Kegiatan',
        'image_path' => 'galleries/foto.jpg',
    ]);

    $this->get(route('galleries.index'))->assertOk();
});

test('lapor page returns a successful response', function () {
    $this->get(route('lapor.create'))->assertOk();
});

test('visitors can submit a report anonymously', function () {
    $this->post(route('lapor.store'), [
        'title' => 'Jalan berlubang',
        'description' => 'Terdapat lubang besar di depan sekolah.',
        'category' => 'Infrastruktur',
        'is_anonymous' => true,
    ])->assertRedirect('/lapor');

    $this->assertDatabaseHas('reports', [
        'title' => 'Jalan berlubang',
        'is_anonymous' => true,
        'reporter_name' => null,
    ]);
});
