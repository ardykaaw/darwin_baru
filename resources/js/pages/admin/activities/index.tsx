import { useState } from 'react';
import { Link, router } from '@inertiajs/react';
import { Activity, Calendar, CalendarX2, Pencil, Plus, Search, Trash2 } from 'lucide-react';
import { ConfirmDialog } from '@/components/confirm-dialog';
import Pagination from '@/components/pagination';
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
import type { Paginated, ActivityItem } from '@/types';

interface AdminActivitiesProps {
    activities: Paginated<ActivityItem>;
    search: string | null;
}

export default function AdminActivitiesIndex({
    activities,
    search,
}: AdminActivitiesProps) {
    useFlashMessages();
    const [itemToDelete, setItemToDelete] = useState<ActivityItem | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    function handleDelete(activity: ActivityItem) {
        setItemToDelete(activity);
    }

    function confirmDelete() {
        if (!itemToDelete) return;
        setIsDeleting(true);
        router.delete(`/admin/activities/${itemToDelete.id}`, {
            onFinish: () => {
                setIsDeleting(false);
                setItemToDelete(null);
            },
        });
    }

    function handleSearch(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        const value = form.get('search') ? String(form.get('search')) : undefined;
        router.get('/admin/activities', value ? { search: value } : {});
    }

    return (
        <>
            <div className="flex h-full flex-1 flex-col gap-6 p-4 lg:p-6">
                {/* Header */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-4">
                        <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-orange to-brand-orange-dark text-white shadow-lg shadow-brand-orange/25">
                            <Activity className="h-6 w-6" />
                        </span>
                        <div>
                            <h1 className="text-2xl font-black tracking-tight">Aktivitas</h1>
                            <p className="text-sm text-muted-foreground">
                                Kelola jejak kiprah dan kegiatan.
                            </p>
                        </div>
                    </div>
                    <Button
                        asChild
                        className="rounded-full bg-brand-teal px-5 shadow-lg shadow-brand-teal/25 transition-all hover:-translate-y-0.5 hover:bg-brand-teal-dark"
                    >
                        <Link href="/admin/activities/create">
                            <Plus className="mr-2" />
                            Tambah Aktivitas
                        </Link>
                    </Button>
                </div>

                {/* Toolbar */}
                <div className="flex flex-wrap items-center justify-between gap-3">
                    <form onSubmit={handleSearch} className="flex w-full max-w-sm gap-2">
                        <div className="relative flex-1">
                            <Search className="absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                name="search"
                                defaultValue={search ?? ''}
                                placeholder="Cari judul atau deskripsi..."
                                className="h-10 rounded-full border-border/70 pl-10 shadow-sm"
                            />
                        </div>
                        <Button type="submit" variant="outline" className="h-10 rounded-full">
                            Cari
                        </Button>
                    </form>
                    <span className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-card px-4 py-1.5 text-xs font-semibold text-muted-foreground shadow-sm">
                        {activities.total > 0
                            ? `Menampilkan ${activities.from ?? 0}–${activities.to ?? 0} dari ${activities.total} aktivitas`
                            : 'Belum ada data'}
                    </span>
                </div>

                <Card className="overflow-hidden rounded-2xl border-border/70 shadow-sm">
                    <CardContent className="p-0">
                        {activities.data.length === 0 ? (
                            <div className="flex flex-col items-center gap-3 px-6 py-16 text-center">
                                <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-orange/10 text-brand-orange-dark">
                                    <CalendarX2 className="h-7 w-7" />
                                </span>
                                <div>
                                    <p className="text-sm font-bold">Belum ada aktivitas</p>
                                    <p className="mt-1 text-sm text-muted-foreground">
                                        {search
                                            ? 'Tidak ada aktivitas yang cocok dengan pencarian Anda.'
                                            : 'Klik "Tambah Aktivitas" untuk membuat yang baru.'}
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-slate-50/80 hover:bg-slate-50/80">
                                        <TableHead className="w-20 pl-6 text-xs font-bold tracking-wider text-muted-foreground uppercase">
                                            Gambar
                                        </TableHead>
                                        <TableHead className="text-xs font-bold tracking-wider text-muted-foreground uppercase">
                                            Judul
                                        </TableHead>
                                        <TableHead className="w-44 whitespace-nowrap text-xs font-bold tracking-wider text-muted-foreground uppercase">
                                            Tanggal
                                        </TableHead>
                                        <TableHead className="w-28 pr-6 text-right text-xs font-bold tracking-wider text-muted-foreground uppercase">
                                            Aksi
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {activities.data.map((activity) => (
                                        <TableRow
                                            key={activity.id}
                                            className="group border-border/60 transition-colors hover:bg-brand-teal/[0.03]"
                                        >
                                            <TableCell className="w-20 py-3 pl-6">
                                                {activity.image ? (
                                                    <img
                                                        src={activity.image}
                                                        alt={activity.title}
                                                        className="h-12 w-16 rounded-xl object-cover shadow-sm ring-1 ring-black/5 transition-transform duration-300 group-hover:scale-[1.03]"
                                                    />
                                                ) : (
                                                    <div className="flex h-12 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-brand-orange/10 to-brand-teal/10 ring-1 ring-black/5">
                                                        <Calendar className="h-5 w-5 text-brand-orange-dark/70" />
                                                    </div>
                                                )}
                                            </TableCell>
                                            <TableCell className="min-w-0 max-w-sm md:max-w-md py-3">
                                                <div className="line-clamp-2 font-bold text-brand-navy leading-snug" title={activity.title}>
                                                    {activity.title}
                                                </div>
                                            </TableCell>
                                            <TableCell className="w-44 whitespace-nowrap">
                                                <span className="inline-flex items-center gap-2 rounded-full bg-brand-orange/10 px-3 py-1 text-xs font-bold text-brand-orange-dark">
                                                    <Calendar className="h-3.5 w-3.5" />
                                                    {activity.date}
                                                </span>
                                            </TableCell>
                                            <TableCell className="w-28 pr-6 whitespace-nowrap text-right">
                                                <div className="flex justify-end gap-1.5">
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        title="Edit aktivitas"
                                                        className="h-8 w-8 rounded-full text-muted-foreground hover:bg-brand-teal/10 hover:text-brand-teal-dark"
                                                        asChild
                                                    >
                                                        <Link href={`/admin/activities/${activity.id}/edit`}>
                                                            <Pencil className="h-4 w-4" />
                                                            <span className="sr-only">Edit</span>
                                                        </Link>
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        title="Hapus aktivitas"
                                                        className="h-8 w-8 rounded-full text-muted-foreground hover:bg-red-50 hover:text-red-600"
                                                        onClick={() => handleDelete(activity)}
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                        <span className="sr-only">Hapus</span>
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        )}
                    </CardContent>
                    {activities.data.length > 0 && (
                        <CardFooter className="border-t border-border/60 py-4">
                            <Pagination pagination={activities} className="w-full justify-center" />
                        </CardFooter>
                    )}
                </Card>
            </div>

            <ConfirmDialog
                open={!!itemToDelete}
                onOpenChange={(open) => !open && setItemToDelete(null)}
                title="Hapus Aktivitas?"
                description={`Apakah Anda yakin ingin menghapus aktivitas "${itemToDelete?.title}"? Tindakan ini tidak dapat dibatalkan.`}
                confirmText="Hapus Aktivitas"
                cancelText="Batal"
                variant="danger"
                icon="trash"
                isLoading={isDeleting}
                onConfirm={confirmDelete}
            />
        </>
    );
}

AdminActivitiesIndex.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/admin' },
        { title: 'Aktivitas', href: '/admin/activities' },
    ],
};
