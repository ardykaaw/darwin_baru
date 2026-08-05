<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Report;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ReportController extends Controller
{
    public function index(Request $request): Response
    {
        $reports = Report::query()
            ->when($request->input('search'), function ($query, $search) {
                $query->where('title', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%")
                    ->orWhere('category', 'like', "%{$search}%");
            })
            ->when($request->input('status'), function ($query, $status) {
                $query->where('status', $status);
            })
            ->latest()
            ->paginate(10)
            ->withQueryString()
            ->through(fn (Report $report) => $this->formatReport($report));

        return Inertia::render('admin/reports/index', [
            'reports' => $reports,
            'filters' => $request->only(['search', 'status']),
        ]);
    }

    public function show(Report $report): Response
    {
        return Inertia::render('admin/reports/show', [
            'report' => $this->formatReport($report),
        ]);
    }

    public function updateStatus(Request $request, Report $report): RedirectResponse
    {
        $validated = $request->validate([
            'status' => ['required', 'in:pending,processing,resolved,rejected'],
        ]);

        $report->update($validated);

        return back()->with('success', 'Status laporan berhasil diperbarui.');
    }

    public function destroy(Report $report): RedirectResponse
    {
        $report->delete();

        return back()->with('success', 'Laporan berhasil dihapus.');
    }

    /**
     * @return array<string, mixed>
     */
    private function formatReport(Report $report): array
    {
        return [
            'id' => $report->id,
            'title' => $report->title,
            'description' => $report->description,
            'category' => $report->category,
            'status' => $report->status,
            'is_anonymous' => $report->is_anonymous,
            'reporter_name' => $report->reporter_name,
            'reporter_phone' => $report->reporter_phone,
            'created_at' => $report->created_at->format('d M Y H:i'),
        ];
    }
}
