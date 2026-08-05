import { Head, Link } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';
import {
    Activity,
    ArrowUpRight,
    FileWarning,
    Images,
    Newspaper,
    PenLine,
    ShieldCheck,
    Users,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { useFlashMessages } from '@/hooks/use-flash-messages';

interface LatestReport {
    id: number;
    title: string;
    category: string | null;
    status: string;
    is_anonymous: boolean;
    reporter_name: string | null;
    created_at: string;
}

interface DashboardProps {
    stats: {
        reports: number;
        reportsPending: number;
        news: number;
        activities: number;
        galleries: number;
        users: number;
    };
    latestReports: LatestReport[];
}

const STATUS_LABELS: Record<string, { label: string; className: string }> = {
    pending: { label: 'Pending', className: 'bg-amber-100 text-amber-700' },
    processing: { label: 'Diproses', className: 'bg-blue-100 text-blue-700' },
    resolved: {
        label: 'Selesai',
        className: 'bg-emerald-100 text-emerald-700',
    },
    rejected: { label: 'Ditolak', className: 'bg-red-100 text-red-700' },
};

const QUICK_ACTIONS = [
    {
        label: 'Tulis Berita',
        description: 'Publikasikan informasi terbaru',
        href: '/admin/news/create',
        icon: PenLine,
        color: 'bg-brand-teal/15 text-brand-teal-dark',
    },
    {
        label: 'Tambah Aktivitas',
        description: 'Catat jejak kiprah baru',
        href: '/admin/activities/create',
        icon: Activity,
        color: 'bg-brand-orange/15 text-brand-orange-dark',
    },
    {
        label: 'Unggah Foto',
        description: 'Perbarui dokumentasi galeri',
        href: '/admin/galleries',
        icon: Images,
        color: 'bg-brand-navy/10 text-brand-navy',
    },
    {
        label: 'Kelola Laporan',
        description: 'Tindak lanjuti aspirasi warga',
        href: '/admin/reports',
        icon: FileWarning,
        color: 'bg-amber-100 text-amber-700',
    },
];

export default function AdminDashboard({
    stats,
    latestReports,
}: DashboardProps) {
    useFlashMessages();
    const { auth } = usePage().props as { auth?: { user?: { name?: string } } };
    const name = auth?.user?.name?.split(' ')[0] ?? 'Admin';
    const today = new Date().toLocaleDateString('id-ID', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });

    const cards = [
        {
            label: 'Total Laporan',
            value: stats.reports,
            icon: FileWarning,
            color: 'bg-brand-orange/15 text-brand-orange-dark',
            href: '/admin/reports',
        },
        {
            label: 'Laporan Pending',
            value: stats.reportsPending,
            icon: ShieldCheck,
            color: 'bg-amber-100 text-amber-600',
            href: '/admin/reports?status=pending',
        },
        {
            label: 'Berita Terbit',
            value: stats.news,
            icon: Newspaper,
            color: 'bg-brand-teal/15 text-brand-teal-dark',
            href: '/admin/news',
        },
        {
            label: 'Aktivitas',
            value: stats.activities,
            icon: Activity,
            color: 'bg-blue-100 text-blue-600',
            href: '/admin/activities',
        },
        {
            label: 'Galeri',
            value: stats.galleries,
            icon: Images,
            color: 'bg-purple-100 text-purple-600',
            href: '/admin/galleries',
        },
        {
            label: 'Akun Admin',
            value: stats.users,
            icon: Users,
            color: 'bg-brand-navy/10 text-brand-navy',
            href: '/admin/users',
        },
    ];

    return (
        <>
            <Head title="Dashboard" />

            <div className="flex h-full flex-1 flex-col gap-6 p-4 lg:p-6">
                {/* Welcome banner */}
                <div className="dc-grid-pattern relative overflow-hidden rounded-2xl bg-gradient-to-r from-brand-navy via-brand-navy to-brand-navy-dark p-6 text-white shadow-lg lg:p-8">
                    <div className="animate-drift absolute -top-16 -right-16 h-56 w-56 rounded-full bg-brand-teal/25 blur-3xl" />
                    <div className="animate-drift absolute right-1/3 -bottom-20 h-56 w-56 rounded-full bg-brand-orange/20 blur-3xl [animation-delay:5s]" />
                    <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                        <div>
                            <div className="text-xs font-bold tracking-[0.2em] text-brand-orange-light uppercase">
                                {today}
                            </div>
                            <h1 className="mt-2 text-2xl font-black tracking-tight lg:text-3xl">
                                Selamat datang, {name} 👋
                            </h1>
                            <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/85">
                                Ini ringkasan aktivitas Darwin Center hari ini.
                                Kelola konten dan tindak lanjuti laporan warga
                                dari panel ini.
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-3">
                            <Link
                                href="/admin/reports"
                                className="inline-flex items-center gap-2 rounded-full bg-brand-orange-dark px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-black/20 transition-all hover:-translate-y-0.5 hover:bg-brand-orange"
                            >
                                Laporan Pending ({stats.reportsPending})
                            </Link>
                            <Link
                                href="/admin/news/create"
                                className="inline-flex items-center gap-2 rounded-full border border-white/25 px-5 py-2.5 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-white/10"
                            >
                                Tulis Berita
                                <ArrowUpRight className="h-4 w-4" />
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Quick actions */}
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    {QUICK_ACTIONS.map((action) => (
                        <Link
                            key={action.label}
                            href={action.href}
                            className="group flex items-center gap-4 rounded-2xl border border-border/70 bg-card p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:border-brand-teal/30 hover:shadow-md"
                        >
                            <span
                                className={`inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${action.color}`}
                            >
                                <action.icon className="h-5 w-5" />
                            </span>
                            <span className="min-w-0 flex-1">
                                <span className="block truncate text-sm font-bold">
                                    {action.label}
                                </span>
                                <span className="block truncate text-xs text-muted-foreground">
                                    {action.description}
                                </span>
                            </span>
                            <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-brand-teal-dark" />
                        </Link>
                    ))}
                </div>

                {/* Stats */}
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
                    {cards.map((card) => (
                        <Link
                            key={card.label}
                            href={card.href}
                            className="group block"
                        >
                            <Card className="border-border/70 shadow-none transition-all group-hover:-translate-y-0.5 group-hover:border-brand-teal/20 group-hover:shadow-md">
                                <CardHeader className="pb-3">
                                    <CardDescription className="text-xs font-semibold tracking-wide uppercase">
                                        {card.label}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="flex items-center justify-between">
                                    <CardTitle className="text-3xl font-black">
                                        {card.value}
                                    </CardTitle>
                                    <span
                                        className={`inline-flex h-11 w-11 items-center justify-center rounded-xl shadow-sm transition-transform group-hover:scale-110 ${card.color}`}
                                    >
                                        <card.icon className="h-5 w-5" />
                                    </span>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>

                {/* Latest reports */}
                <Card className="border-border/70 shadow-none">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                            <CardTitle>Laporan Terbaru</CardTitle>
                            <CardDescription>
                                Lima laporan terakhir yang masuk dari
                                masyarakat.
                            </CardDescription>
                        </div>
                        <Link
                            href="/admin/reports"
                            className="rounded-full border border-input px-4 py-1.5 text-sm font-semibold transition-colors hover:bg-accent"
                        >
                            Lihat Semua
                        </Link>
                    </CardHeader>
                    <CardContent>
                        {latestReports.length === 0 ? (
                            <div className="rounded-xl border border-dashed py-12 text-center text-sm text-muted-foreground">
                                Belum ada laporan masuk.
                            </div>
                        ) : (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Judul</TableHead>
                                        <TableHead>Kategori</TableHead>
                                        <TableHead>Pelapor</TableHead>
                                        <TableHead>Tanggal</TableHead>
                                        <TableHead className="text-right">
                                            Status
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {latestReports.map((report) => (
                                        <TableRow key={report.id}>
                                            <TableCell className="max-w-64 truncate font-medium">
                                                <Link
                                                    href={`/admin/reports/${report.id}`}
                                                    className="hover:text-primary"
                                                >
                                                    {report.title}
                                                </Link>
                                            </TableCell>
                                            <TableCell>
                                                {report.category ?? '—'}
                                            </TableCell>
                                            <TableCell>
                                                {report.is_anonymous ? (
                                                    <span className="text-muted-foreground">
                                                        Anonim
                                                    </span>
                                                ) : (
                                                    (report.reporter_name ??
                                                    '—')
                                                )}
                                            </TableCell>
                                            <TableCell className="text-muted-foreground">
                                                {report.created_at}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <Badge
                                                    className={
                                                        STATUS_LABELS[
                                                            report.status
                                                        ]?.className ??
                                                        'bg-slate-100 text-slate-600'
                                                    }
                                                >
                                                    {STATUS_LABELS[
                                                        report.status
                                                    ]?.label ?? report.status}
                                                </Badge>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        )}
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

AdminDashboard.layout = {
    breadcrumbs: [{ title: 'Dashboard', href: '/admin' }],
};
