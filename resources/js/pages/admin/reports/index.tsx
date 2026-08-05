import { Link } from '@inertiajs/react';
import { router } from '@inertiajs/react';
import { Eye, Inbox, ShieldCheck, Trash2 } from 'lucide-react';
import Pagination from '@/components/pagination';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { useFlashMessages } from '@/hooks/use-flash-messages';
import { cn } from '@/lib/utils';
import type { Paginated } from '@/types';

interface ReportItem {
    id: number;
    title: string;
    description: string;
    category: string | null;
    status: string;
    is_anonymous: boolean;
    reporter_name: string | null;
    reporter_phone: string | null;
    created_at: string;
}

interface AdminReportsProps {
    reports: Paginated<ReportItem>;
    filters: { search?: string; status?: string };
}

const STATUS_LABELS: Record<string, { label: string; dot: string; className: string }> = {
    pending: {
        label: 'Pending',
        dot: 'animate-pulse bg-amber-500',
        className: 'bg-amber-100 text-amber-700',
    },
    processing: {
        label: 'Diproses',
        dot: 'bg-blue-500',
        className: 'bg-blue-100 text-blue-700',
    },
    resolved: {
        label: 'Selesai',
        dot: 'bg-emerald-500',
        className: 'bg-emerald-100 text-emerald-700',
    },
    rejected: {
        label: 'Ditolak',
        dot: 'bg-red-500',
        className: 'bg-red-100 text-red-700',
    },
};

const STATUS_TABS = [
    { value: '', label: 'Semua' },
    { value: 'pending', label: 'Pending' },
    { value: 'processing', label: 'Diproses' },
    { value: 'resolved', label: 'Selesai' },
    { value: 'rejected', label: 'Ditolak' },
];

export default function AdminReportsIndex({
    reports,
    filters,
}: AdminReportsProps) {
    useFlashMessages();

    function handleSearch(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        const params = new URLSearchParams(window.location.search);

        if (form.get('search')) {
            params.set('search', String(form.get('search')));
        } else {
            params.delete('search');
        }

        router.get('/admin/reports', Object.fromEntries(params));
    }

    function handleStatusFilter(status: string) {
        const params = new URLSearchParams(window.location.search);

        if (status) {
            params.set('status', status);
        } else {
            params.delete('status');
        }

        router.get('/admin/reports', Object.fromEntries(params), {
            preserveScroll: true,
        });
    }

    function handleDelete(report: ReportItem) {
        if (window.confirm(`Hapus laporan "${report.title}"?`)) {
            router.delete(`/admin/reports/${report.id}`);
        }
    }

    return (
        <>
            <div className="flex h-full flex-1 flex-col gap-6 p-4 lg:p-6">
                {/* Header */}
                <div className="flex items-center gap-4">
                    <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-orange to-brand-orange-dark text-white shadow-lg shadow-brand-orange/25">
                        <Inbox className="h-6 w-6" />
                    </span>
                    <div>
                        <h1 className="text-2xl font-black tracking-tight">Laporan</h1>
                        <p className="text-sm text-muted-foreground">
                            Kelola laporan dan aspirasi masyarakat.
                        </p>
                    </div>
                </div>

                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <form onSubmit={handleSearch} className="flex w-full max-w-sm gap-2">
                            <Input
                                name="search"
                                defaultValue={filters.search ?? ''}
                                placeholder="Cari judul, deskripsi, kategori..."
                                className="h-10 rounded-full border-border/70 pl-4 shadow-sm"
                            />
                            <Button type="submit" variant="outline" className="h-10 shrink-0 rounded-full">
                                Cari
                            </Button>
                        </form>
                        <span className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-card px-4 py-1.5 text-xs font-semibold text-muted-foreground shadow-sm">
                            {reports.total > 0
                                ? `Menampilkan ${reports.from ?? 0}–${reports.to ?? 0} dari ${reports.total} laporan`
                                : 'Belum ada data'}
                        </span>
                    </div>

                    {/* Status tabs */}
                    <div className="flex flex-wrap gap-1.5 rounded-2xl border border-border/70 bg-card p-1.5 shadow-sm">
                        {STATUS_TABS.map((tab) => {
                            const active = (filters.status ?? '') === tab.value;
                            const info = STATUS_LABELS[tab.value];

                            return (
                                <button
                                    key={tab.value}
                                    type="button"
                                    onClick={() => handleStatusFilter(tab.value)}
                                    className={cn(
                                        'inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition-all',
                                        active
                                            ? 'bg-brand-teal text-white shadow-md shadow-brand-teal/25'
                                            : 'text-muted-foreground hover:bg-slate-50 hover:text-foreground',
                                    )}
                                >
                                    {info && (
                                        <span className={cn('h-1.5 w-1.5 rounded-full', info.dot)} />
                                    )}
                                    {tab.label}
                                </button>
                            );
                        })}
                    </div>
                </div>

                <Card className="overflow-hidden rounded-2xl border-border/70 shadow-sm">
                    <CardContent className="p-0">
                        {reports.data.length === 0 ? (
                            <div className="flex flex-col items-center gap-3 px-6 py-16 text-center">
                                <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-orange/10 text-brand-orange-dark">
                                    <Inbox className="h-7 w-7" />
                                </span>
                                <div>
                                    <p className="text-sm font-bold">Tidak ada laporan</p>
                                    <p className="mt-1 text-sm text-muted-foreground">
                                        {filters.search || filters.status
                                            ? 'Tidak ada laporan yang cocok dengan filter saat ini.'
                                            : 'Laporan dari warga akan muncul di sini.'}
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-slate-50/80 hover:bg-slate-50/80">
                                        <TableHead className="pl-6 text-xs font-bold tracking-wider text-muted-foreground uppercase">
                                            Judul
                                        </TableHead>
                                        <TableHead className="text-xs font-bold tracking-wider text-muted-foreground uppercase">
                                            Kategori
                                        </TableHead>
                                        <TableHead className="text-xs font-bold tracking-wider text-muted-foreground uppercase">
                                            Pelapor
                                        </TableHead>
                                        <TableHead className="text-xs font-bold tracking-wider text-muted-foreground uppercase">
                                            Tanggal
                                        </TableHead>
                                        <TableHead className="text-xs font-bold tracking-wider text-muted-foreground uppercase">
                                            Status
                                        </TableHead>
                                        <TableHead className="pr-6 text-right text-xs font-bold tracking-wider text-muted-foreground uppercase">
                                            Aksi
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {reports.data.map((report) => {
                                        const statusInfo =
                                            STATUS_LABELS[report.status] ?? {
                                                label: report.status,
                                                dot: 'bg-slate-400',
                                                className: 'bg-slate-100 text-slate-600',
                                            };

                                        return (
                                            <TableRow
                                                key={report.id}
                                                className="group border-border/60 transition-colors hover:bg-brand-teal/[0.03]"
                                            >
                                                <TableCell className="max-w-64 pl-6">
                                                    <Link
                                                        href={`/admin/reports/${report.id}`}
                                                        className="block truncate font-bold text-brand-navy hover:text-brand-teal-dark"
                                                    >
                                                        {report.title}
                                                    </Link>
                                                    <div className="mt-0.5 line-clamp-1 max-w-64 text-xs text-muted-foreground">
                                                        {report.description}
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    {report.category ? (
                                                        <span className="inline-flex rounded-full bg-brand-navy/5 px-3 py-1 text-xs font-bold text-brand-navy">
                                                            {report.category}
                                                        </span>
                                                    ) : (
                                                        <span className="text-muted-foreground">—</span>
                                                    )}
                                                </TableCell>
                                                <TableCell>
                                                    {report.is_anonymous ? (
                                                        <span className="inline-flex items-center gap-1.5 text-muted-foreground">
                                                            <ShieldCheck className="h-3.5 w-3.5 text-brand-teal-dark" />
                                                            <span className="font-semibold">Anonim</span>
                                                        </span>
                                                    ) : (
                                                        (report.reporter_name ?? (
                                                            <span className="text-muted-foreground">—</span>
                                                        ))
                                                    )}
                                                </TableCell>
                                                <TableCell className="text-muted-foreground">
                                                    {report.created_at}
                                                </TableCell>
                                                <TableCell>
                                                    <Badge
                                                        className={cn(
                                                            'inline-flex items-center gap-1.5 rounded-full px-3 py-1',
                                                            statusInfo.className,
                                                        )}
                                                    >
                                                        <span className={cn('h-1.5 w-1.5 rounded-full', statusInfo.dot)} />
                                                        {statusInfo.label}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="pr-6">
                                                    <div className="flex justify-end gap-1.5">
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            title="Lihat detail"
                                                            className="h-8 w-8 rounded-full text-muted-foreground hover:bg-brand-teal/10 hover:text-brand-teal-dark"
                                                            asChild
                                                        >
                                                            <Link href={`/admin/reports/${report.id}`}>
                                                                <Eye className="h-4 w-4" />
                                                                <span className="sr-only">Detail</span>
                                                            </Link>
                                                        </Button>
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            title="Hapus laporan"
                                                            className="h-8 w-8 rounded-full text-muted-foreground hover:bg-red-50 hover:text-red-600"
                                                            onClick={() => handleDelete(report)}
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                            <span className="sr-only">Hapus</span>
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        )}
                    </CardContent>
                    {reports.data.length > 0 && (
                        <CardFooter className="border-t border-border/60 py-4">
                            <Pagination pagination={reports} className="w-full justify-center" />
                        </CardFooter>
                    )}
                </Card>
            </div>
        </>
    );
}

AdminReportsIndex.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/admin' },
        { title: 'Laporan', href: '/admin/reports' },
    ],
};
