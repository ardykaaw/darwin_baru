import { useState } from 'react';
import { Link, router } from '@inertiajs/react';
import { ArrowLeft, FileText, Inbox, Loader2, Phone, ShieldCheck, Trash2, User2 } from 'lucide-react';
import { ConfirmDialog } from '@/components/confirm-dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useFlashMessages } from '@/hooks/use-flash-messages';
import { cn } from '@/lib/utils';

interface ReportDetail {
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

interface AdminReportShowProps {
    report: ReportDetail;
}

const STATUS_OPTIONS = [
    { value: 'pending', label: 'Pending', icon: 'bg-amber-100 text-amber-700', dot: 'animate-pulse bg-amber-500' },
    { value: 'processing', label: 'Diproses', icon: 'bg-blue-100 text-blue-700', dot: 'bg-blue-500' },
    { value: 'resolved', label: 'Selesai', icon: 'bg-emerald-100 text-emerald-700', dot: 'bg-emerald-500' },
    { value: 'rejected', label: 'Ditolak', icon: 'bg-red-100 text-red-700', dot: 'bg-red-500' },
];

export default function AdminReportShow({ report }: AdminReportShowProps) {
    useFlashMessages();
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [updatingStatus, setUpdatingStatus] = useState<string | null>(null);

    function handleStatusChange(status: string) {
        if (status === report.status || updatingStatus !== null) {
            return;
        }

        setUpdatingStatus(status);
        router.patch(`/admin/reports/${report.id}/status`, { status }, {
            preserveScroll: true,
            onFinish: () => {
                setUpdatingStatus(null);
            },
        });
    }

    function handleDelete() {
        setShowDeleteConfirm(true);
    }

    function confirmDelete() {
        setIsDeleting(true);
        router.delete(`/admin/reports/${report.id}`, {
            onFinish: () => {
                setIsDeleting(false);
                setShowDeleteConfirm(false);
            },
        });
    }

    const statusInfo = STATUS_OPTIONS.find((s) => s.value === report.status) ?? STATUS_OPTIONS[0];

    return (
        <>
            <div className="flex h-full flex-1 flex-col gap-6 p-4 lg:p-6">
                {/* Back + header */}
                <div>
                    <Link
                        href="/admin/reports"
                        className="mb-4 inline-flex items-center gap-2 rounded-full border border-border/70 bg-card px-4 py-1.5 text-sm font-semibold text-muted-foreground shadow-sm transition-colors hover:border-brand-teal/40 hover:text-brand-teal-dark"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Kembali ke Laporan
                    </Link>
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                        <div className="flex items-start gap-4">
                            <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-orange to-brand-orange-dark text-white shadow-lg shadow-brand-orange/25">
                                <Inbox className="h-6 w-6" />
                            </span>
                            <div>
                                <h1 className="text-2xl font-black tracking-tight">{report.title}</h1>
                                <div className="mt-2 flex flex-wrap items-center gap-2">
                                    {report.category && (
                                        <Badge variant="outline" className="rounded-full px-3 py-1">
                                            {report.category}
                                        </Badge>
                                    )}
                                    <Badge className={cn('inline-flex items-center gap-1.5 rounded-full px-3 py-1', statusInfo.icon)}>
                                        <span className={cn('h-1.5 w-1.5 rounded-full', statusInfo.dot)} />
                                        {statusInfo.label}
                                    </Badge>
                                    <span className="text-xs font-semibold text-muted-foreground">
                                        Dikirim {report.created_at}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <Button
                            variant="outline"
                            className="h-10 rounded-full text-destructive transition-all hover:border-red-200 hover:bg-red-50"
                            onClick={handleDelete}
                        >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Hapus Laporan
                        </Button>
                    </div>
                </div>

                <div className="grid gap-6 lg:grid-cols-12">
                    <div className="grid content-start gap-6 lg:col-span-8">
                        <Card className="overflow-hidden rounded-2xl border-border/70 shadow-sm">
                            <CardHeader className="border-b border-border/60 bg-slate-50/60">
                                <CardTitle className="flex items-center gap-2">
                                    <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-brand-orange/10 text-brand-orange-dark">
                                        <FileText className="h-4 w-4" />
                                    </span>
                                    Isi Laporan
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="pt-6">
                                <p className="rounded-xl bg-slate-50/80 p-5 leading-relaxed whitespace-pre-wrap text-muted-foreground">
                                    {report.description}
                                </p>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="grid content-start gap-6 lg:col-span-4">
                        <Card className="overflow-hidden rounded-2xl border-border/70 shadow-sm">
                            <CardHeader className="border-b border-border/60 bg-slate-50/60">
                                <CardTitle className="flex items-center gap-2">
                                    <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-brand-teal/10 text-brand-teal-dark">
                                        <User2 className="h-4 w-4" />
                                    </span>
                                    Informasi Pelapor
                                </CardTitle>
                                <CardDescription>Detail identitas pelapor laporan.</CardDescription>
                            </CardHeader>
                            <CardContent className="grid gap-4 pt-6">
                                <div className="flex items-center gap-3 rounded-xl border border-border/60 bg-slate-50/60 p-3.5">
                                    <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm">
                                        {report.is_anonymous ? (
                                            <ShieldCheck className="h-5 w-5 text-brand-teal" />
                                        ) : (
                                            <User2 className="h-5 w-5 text-muted-foreground" />
                                        )}
                                    </span>
                                    <div className="min-w-0">
                                        <div className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                                            Identitas
                                        </div>
                                        <div className="truncate text-sm font-bold text-brand-navy">
                                            {report.is_anonymous ? 'Anonim' : report.reporter_name ?? 'Tidak diketahui'}
                                        </div>
                                    </div>
                                </div>
                                {!report.is_anonymous && (
                                    <div className="flex items-center gap-3 rounded-xl border border-border/60 bg-slate-50/60 p-3.5">
                                        <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm">
                                            <Phone className="h-5 w-5 text-muted-foreground" />
                                        </span>
                                        <div className="min-w-0">
                                            <div className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                                                Telepon
                                            </div>
                                            <div className="truncate text-sm font-bold text-brand-navy">
                                                {report.reporter_phone ?? '—'}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        <Card className="overflow-hidden rounded-2xl border-border/70 shadow-sm">
                            <CardHeader className="border-b border-border/60 bg-slate-50/60">
                                <CardTitle className="flex items-center gap-2">
                                    <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-amber-500/10 text-amber-600">
                                        <ShieldCheck className="h-4 w-4" />
                                    </span>
                                    Perbarui Status
                                </CardTitle>
                                <CardDescription>Pantau proses penanganan laporan.</CardDescription>
                            </CardHeader>
                            <CardContent className="grid gap-3 pt-6">
                                <div className="grid grid-cols-2 gap-2.5">
                                    {STATUS_OPTIONS.map((option) => {
                                        const active = report.status === option.value;
                                        const isLoading = updatingStatus === option.value;

                                        return (
                                            <button
                                                key={option.value}
                                                type="button"
                                                disabled={updatingStatus !== null}
                                                onClick={() => handleStatusChange(option.value)}
                                                className={cn(
                                                    'inline-flex items-center justify-center gap-2 rounded-xl border px-3 py-2.5 text-sm font-bold transition-all',
                                                    active
                                                        ? 'border-brand-teal bg-brand-teal text-white shadow-md shadow-brand-teal/25'
                                                        : 'border-border/70 bg-card text-muted-foreground hover:border-brand-teal/40 hover:text-brand-navy',
                                                    updatingStatus !== null && !isLoading && 'opacity-60 cursor-not-allowed',
                                                )}
                                            >
                                                {isLoading ? (
                                                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                                                ) : (
                                                    <span className={cn('h-1.5 w-1.5 rounded-full', option.dot)} />
                                                )}
                                                {option.label}
                                            </button>
                                        );
                                    })}
                                </div>
                                <p className="text-center text-xs font-semibold text-muted-foreground">
                                    {updatingStatus !== null ? 'Menyimpan status...' : 'Perubahan status otomatis tersimpan.'}
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>

            <ConfirmDialog
                open={showDeleteConfirm}
                onOpenChange={setShowDeleteConfirm}
                title="Hapus Laporan Pengaduan?"
                description={`Apakah Anda yakin ingin menghapus laporan "${report.title}"? Tindakan ini bersifat permanen dan tidak dapat dibatalkan.`}
                confirmText="Hapus Laporan"
                cancelText="Batal"
                variant="danger"
                icon="trash"
                isLoading={isDeleting}
                onConfirm={confirmDelete}
            />
        </>
    );
}

AdminReportShow.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/admin' },
        { title: 'Laporan', href: '/admin/reports' },
    ],
};
