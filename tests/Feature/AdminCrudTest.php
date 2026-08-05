<?php

use App\Models\Activity;
use App\Models\Gallery;
use App\Models\News;
use App\Models\Report;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;

uses(RefreshDatabase::class);

beforeEach(function () {
    $this->actingAs(User::factory()->create(['role' => 'admin']));
});

test('admin can view the activities index page', function () {
    Activity::create([
        'title' => 'Kegiatan Sains',
        'content' => 'Deskripsi kegiatan.',
        'date' => now()->addDay(),
    ]);

    $this->get(route('admin.activities.index'))
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('admin/activities/index')
            ->has('activities.data', 1)
        );
});

test('admin can create an activity', function () {
    $this->get(route('admin.activities.create'))->assertOk();

    $this->post(route('admin.activities.store'), [
        'title' => 'Kegiatan Baru',
        'content' => 'Deskripsi kegiatan baru.',
        'date' => '2026-08-20',
    ])->assertRedirect('/admin/activities');

    $this->assertDatabaseHas('activities', ['title' => 'Kegiatan Baru']);
});

test('activity creation requires a valid date', function () {
    $this->post(route('admin.activities.store'), [
        'title' => 'Kegiatan Baru',
        'content' => 'Deskripsi kegiatan baru.',
        'date' => 'bukan-tanggal',
    ])->assertSessionHasErrors('date');

    $this->assertDatabaseCount('activities', 0);
});

test('admin can edit an activity', function () {
    $activity = Activity::create([
        'title' => 'Kegiatan Lama',
        'content' => 'Deskripsi kegiatan lama.',
        'date' => now()->addDay(),
    ]);

    $this->get(route('admin.activities.edit', $activity))->assertOk();

    $this->put(route('admin.activities.update', $activity), [
        'title' => 'Kegiatan Diperbarui',
        'content' => 'Deskripsi kegiatan diperbarui.',
        'date' => '2026-09-01',
    ])->assertRedirect('/admin/activities');

    $this->assertDatabaseHas('activities', ['title' => 'Kegiatan Diperbarui']);
});

test('admin can delete an activity', function () {
    $activity = Activity::create([
        'title' => 'Kegiatan Dihapus',
        'content' => 'Deskripsi kegiatan.',
        'date' => now()->addDay(),
    ]);

    $this->delete(route('admin.activities.destroy', $activity))->assertRedirect();

    $this->assertDatabaseMissing('activities', ['id' => $activity->id]);
});

test('admin can create news with an auto generated slug', function () {
    $this->post(route('admin.news.store'), [
        'title' => 'Berita Baru Darwin Center',
        'content' => 'Isi berita baru.',
    ])->assertRedirect('/admin/news');

    $this->assertDatabaseHas('news', [
        'title' => 'Berita Baru Darwin Center',
        'slug' => 'berita-baru-darwin-center',
    ]);
});

test('admin can update news', function () {
    $news = News::create([
        'title' => 'Berita Lama',
        'slug' => 'berita-lama',
        'content' => 'Isi berita lama.',
        'is_published' => true,
    ]);

    $this->put(route('admin.news.update', $news), [
        'title' => 'Berita Baru',
        'content' => 'Isi berita baru.',
        'is_published' => false,
    ])->assertRedirect('/admin/news');

    $this->assertDatabaseHas('news', [
        'title' => 'Berita Baru',
        'slug' => 'berita-baru',
        'is_published' => false,
    ]);
});

test('admin can delete news', function () {
    $news = News::create([
        'title' => 'Berita Dihapus',
        'slug' => 'berita-dihapus',
        'content' => 'Isi berita.',
        'is_published' => true,
    ]);

    $this->delete(route('admin.news.destroy', $news))->assertRedirect();

    $this->assertDatabaseMissing('news', ['id' => $news->id]);
});

test('admin can upload a gallery image', function () {
    Storage::fake('public');

    $this->post(route('admin.galleries.store'), [
        'title' => 'Foto Kegiatan',
        'image' => UploadedFile::fake()->image('kegiatan.jpg', 800, 600),
    ])->assertRedirect('/admin/galleries');

    $this->assertDatabaseHas('galleries', ['title' => 'Foto Kegiatan']);

    $gallery = Gallery::first();
    $this->assertNotNull($gallery);
    $this->assertStringStartsWith('galleries/', $gallery->image_path);
    Storage::disk('public')->assertExists($gallery->image_path);
});

test('admin can delete a gallery image', function () {
    Storage::fake('public');

    $gallery = Gallery::create([
        'title' => 'Foto Lama',
        'image_path' => 'galleries/lama.jpg',
    ]);

    Storage::disk('public')->put('galleries/lama.jpg', 'fake-content');

    $this->delete(route('admin.galleries.destroy', $gallery))->assertRedirect();

    $this->assertDatabaseMissing('galleries', ['id' => $gallery->id]);
    Storage::disk('public')->assertMissing('galleries/lama.jpg');
});

test('admin can view and update a report status', function () {
    $report = Report::create([
        'title' => 'Jalan berlubang',
        'description' => 'Terdapat lubang besar di jalan utama.',
        'category' => 'Infrastruktur',
        'status' => 'pending',
    ]);

    $this->get(route('admin.reports.show', $report))->assertOk();

    $this->patch(route('admin.reports.status', $report), [
        'status' => 'resolved',
    ])->assertRedirect();

    $this->assertDatabaseHas('reports', [
        'id' => $report->id,
        'status' => 'resolved',
    ]);
});

test('report status must be a valid value', function () {
    $report = Report::create([
        'title' => 'Jalan berlubang',
        'description' => 'Terdapat lubang besar di jalan utama.',
        'status' => 'pending',
    ]);

    $this->patch(route('admin.reports.status', $report), [
        'status' => 'invalid-status',
    ])->assertSessionHasErrors('status');

    $this->assertDatabaseHas('reports', ['id' => $report->id, 'status' => 'pending']);
});

test('admin can delete a report', function () {
    $report = Report::create([
        'title' => 'Jalan berlubang',
        'description' => 'Terdapat lubang besar di jalan utama.',
        'status' => 'pending',
    ]);

    $this->delete(route('admin.reports.destroy', $report))->assertRedirect();

    $this->assertDatabaseMissing('reports', ['id' => $report->id]);
});

test('admin can create an admin account', function () {
    $this->post(route('admin.users.store'), [
        'name' => 'Admin Baru',
        'email' => 'adminbaru@example.com',
    ])->assertRedirect();

    $this->assertDatabaseHas('users', [
        'email' => 'adminbaru@example.com',
        'role' => 'admin',
    ]);
});

test('admin cannot create an account with a duplicate email', function () {
    User::factory()->create(['email' => 'adminbaru@example.com']);

    $this->post(route('admin.users.store'), [
        'name' => 'Admin Baru',
        'email' => 'adminbaru@example.com',
    ])->assertSessionHasErrors('email');
});

test('account role cannot be changed when creating an account', function () {
    $this->post(route('admin.users.store'), [
        'name' => 'User Baru',
        'email' => 'userbaru@example.com',
        'role' => 'user',
    ])->assertRedirect();

    $this->assertDatabaseHas('users', [
        'email' => 'userbaru@example.com',
        'role' => 'admin',
    ]);
});

test('admin can update an account', function () {
    $user = User::factory()->create(['role' => 'admin']);

    $this->put(route('admin.users.update', $user), [
        'name' => 'Nama Baru',
        'email' => $user->email,
    ])->assertRedirect();

    $this->assertDatabaseHas('users', ['id' => $user->id, 'name' => 'Nama Baru', 'role' => 'admin']);
});

test('admin can reset a user password', function () {
    $user = User::factory()->create(['role' => 'admin']);

    $this->post(route('admin.users.reset-password', $user))->assertRedirect();

    $this->assertTrue(Hash::check('password', $user->fresh()->password));
});

test('admin can delete an account', function () {
    $user = User::factory()->create(['role' => 'admin']);

    $this->delete(route('admin.users.destroy', $user))->assertRedirect();

    $this->assertDatabaseMissing('users', ['id' => $user->id]);
});

test('admin cannot delete their own account', function () {
    $admin = User::factory()->create(['role' => 'admin']);
    $this->actingAs($admin);

    $this->delete(route('admin.users.destroy', $admin))->assertSessionHasErrors('error');

    $this->assertDatabaseHas('users', ['id' => $admin->id]);
});
