import { Link, router } from '@inertiajs/react';
import {
    Calendar,
    FileX2,
    Newspaper,
    Pencil,
    Plus,
    Search,
    Trash2,
} from 'lucide-react';
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
import type { NewsItem, Paginated } from '@/types';

interface AdminNewsProps {
    news: Paginated<NewsItem>;
    search: string | null;
}

export default function AdminNewsIndex({ news, search }: AdminNewsProps) {
    useFlashMessages();

    function handleDelete(item: NewsItem) {
        if (window.confirm(`Hapus berita "${item.title}"?`)) {
            router.delete(`/admin/news/${item.id}`);
        }
    }

    function handleSearch(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        const value = form.get('search') ? String(form.get('search')) : undefined;
        router.get('/admin/news', value ? { search: value } : {});
    }

    return (
        <>
            <div className="flex h-full flex-1 flex-col gap-6 p-4 lg:p-6">
                {/* Header */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-4">
                        <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-teal to-brand-teal-dark text-white shadow-lg shadow-brand-teal/25">
                            <Newspaper className="h-6 w-6" />
                        </span>
                        <div>
                            <h1 className="text-2xl font-black tracking-tight">Berita</h1>
                            <p className="text-sm text-muted-foreground">
                                Kelola berita dan informasi terbaru.
                            </p>
                        </div>
                    </div>
                    <Button
                        asChild
                        className="rounded-full bg-brand-teal px-5 shadow-lg shadow-brand-teal/25 transition-all hover:-translate-y-0.5 hover:bg-brand-teal-dark"
                    >
                        <Link href="/admin/news/create">
                            <Plus className="mr-2" />
                            Tambah Berita
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
                                placeholder="Cari judul berita..."
                                className="h-10 rounded-full border-border/70 pl-10 shadow-sm"
                            />
                        </div>
                        <Button type="submit" variant="outline" className="h-10 rounded-full">
                            Cari
                        </Button>
                    </form>
                    <span className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-card px-4 py-1.5 text-xs font-semibold text-muted-foreground shadow-sm">
                        {news.total > 0
                            ? `Menampilkan ${news.from ?? 0}–${news.to ?? 0} dari ${news.total} berita`
                            : 'Belum ada data'}
                    </span>
                </div>

                <Card className="overflow-hidden rounded-2xl border-border/70 shadow-sm">
                    <CardContent className="p-0">
                        {news.data.length === 0 ? (
                            <div className="flex flex-col items-center gap-3 px-6 py-16 text-center">
                                <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-teal/10 text-brand-teal-dark">
                                    <FileX2 className="h-7 w-7" />
                                </span>
                                <div>
                                    <p className="text-sm font-bold">Belum ada berita</p>
                                    <p className="mt-1 text-sm text-muted-foreground">
                                        {search
                                            ? 'Tidak ada berita yang cocok dengan pencarian Anda.'
                                            : 'Klik "Tambah Berita" untuk membuat yang baru.'}
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-slate-50/80 hover:bg-slate-50/80">
                                        <TableHead className="pl-6 text-xs font-bold tracking-wider text-muted-foreground uppercase">
                                            Gambar
                                        </TableHead>
                                        <TableHead className="text-xs font-bold tracking-wider text-muted-foreground uppercase">
                                            Judul
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
                                    {news.data.map((item) => (
                                        <TableRow
                                            key={item.id}
                                            className="group border-border/60 transition-colors hover:bg-brand-teal/[0.03]"
                                        >
                                            <TableCell className="py-3 pl-6">
                                                {item.image ? (
                                                    <img
                                                        src={item.image}
                                                        alt={item.title}
                                                        className="h-14 w-20 rounded-xl object-cover shadow-sm ring-1 ring-black/5 transition-transform duration-300 group-hover:scale-[1.03]"
                                                    />
                                                ) : (
                                                    <div className="flex h-14 w-20 items-center justify-center rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 ring-1 ring-black/5">
                                                        <Newspaper className="h-5 w-5 text-muted-foreground/70" />
                                                    </div>
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                <div className="max-w-72 truncate font-bold text-brand-navy">
                                                    {item.title}
                                                </div>
                                                <div className="mt-0.5 truncate font-mono text-xs text-muted-foreground">
                                                    /{item.slug}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                                                    <Calendar className="h-3.5 w-3.5 text-brand-teal-dark/70" />
                                                    {item.created_at}
                                                </span>
                                            </TableCell>
                                            <TableCell>
                                                {item.is_published ? (
                                                    <Badge className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-emerald-700">
                                                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
                                                        Terbit
                                                    </Badge>
                                                ) : (
                                                    <Badge className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-slate-600">
                                                        <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
                                                        Draft
                                                    </Badge>
                                                )}
                                            </TableCell>
                                            <TableCell className="pr-6">
                                                <div className="flex justify-end gap-1.5">
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        title="Edit berita"
                                                        className="h-8 w-8 rounded-full text-muted-foreground hover:bg-brand-teal/10 hover:text-brand-teal-dark"
                                                        asChild
                                                    >
                                                        <Link href={`/admin/news/${item.id}/edit`}>
                                                            <Pencil className="h-4 w-4" />
                                                            <span className="sr-only">Edit</span>
                                                        </Link>
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        title="Hapus berita"
                                                        className="h-8 w-8 rounded-full text-muted-foreground hover:bg-red-50 hover:text-red-600"
                                                        onClick={() => handleDelete(item)}
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
                    {news.data.length > 0 && (
                        <CardFooter className="border-t border-border/60 py-4">
                            <Pagination pagination={news} className="w-full justify-center" />
                        </CardFooter>
                    )}
                </Card>
            </div>
        </>
    );
}

AdminNewsIndex.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/admin' },
        { title: 'Berita', href: '/admin/news' },
    ],
};
