<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Activity;
use App\Models\Gallery;
use App\Models\News;
use App\Models\Report;
use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(): Response
    {
        $stats = [
            'reports' => Report::count(),
            'reportsPending' => Report::where('status', 'pending')->count(),
            'news' => News::where('is_published', true)->count(),
            'activities' => Activity::count(),
            'galleries' => Gallery::count(),
            'users' => User::count(),
        ];

        $latestReports = Report::latest()->take(5)->get()->map(function (Report $report) {
            return [
                'id' => $report->id,
                'title' => $report->title,
                'category' => $report->category,
                'status' => $report->status,
                'is_anonymous' => $report->is_anonymous,
                'reporter_name' => $report->reporter_name,
                'created_at' => $report->created_at->format('d M Y'),
            ];
        });

        return Inertia::render('admin/dashboard', compact('stats', 'latestReports'));
    }
}
