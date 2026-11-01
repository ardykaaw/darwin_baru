import { router } from '@inertiajs/react';
import { useForm } from '@inertiajs/react';
import { Eye, Images, ImagePlus, Loader2, Plus, Trash2, Upload } from 'lucide-react';
import { useRef, useState } from 'react';
import { ConfirmDialog } from '@/components/confirm-dialog';
import InputError from '@/components/input-error';
import Pagination from '@/components/pagination';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useFlashMessages } from '@/hooks/use-flash-messages';
import type { GalleryItem, Paginated } from '@/types';

interface AdminGalleriesProps {
    galleries: Paginated<GalleryItem>;
}

export default function AdminGalleriesIndex({
    galleries,
}: AdminGalleriesProps) {
    useFlashMessages();
    const [dialogOpen, setDialogOpen] = useState(false);
    const [preview, setPreview] = useState<string | null>(null);
    const [lightbox, setLightbox] = useState<GalleryItem | null>(null);
    const [itemToDelete, setItemToDelete] = useState<GalleryItem | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const { data, setData, post, processing, errors, reset, progress } =
        useForm({
            title: '',
            image: null as File | null,
        });

    function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0] ?? null;
        setData('image', file);

        if (file) {
            const reader = new FileReader();
            reader.onload = () => setPreview(reader.result as string);
            reader.readAsDataURL(file);
        } else {
            setPreview(null);
        }
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        post('/admin/galleries', {
            forceFormData: true,
            onSuccess: () => {
                setDialogOpen(false);
                setPreview(null);
                reset();
            },
        });
    }

    function handleDelete(gallery: GalleryItem) {
        setItemToDelete(gallery);
    }

    function confirmDelete() {
        if (!itemToDelete) return;
        setIsDeleting(true);
        router.delete(`/admin/galleries/${itemToDelete.id}`, {
            onFinish: () => {
                setIsDeleting(false);
                setItemToDelete(null);
            },
        });
    }

    return (
        <>
            <div className="flex h-full flex-1 flex-col gap-6 p-4 lg:p-6">
                {/* Header */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-4">
                        <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-navy to-brand-navy-dark text-white shadow-lg shadow-brand-navy/25">
                            <Images className="h-6 w-6" />
                        </span>
                        <div>
                            <h1 className="text-2xl font-black tracking-tight">Galeri</h1>
                            <p className="text-sm text-muted-foreground">
                                Kelola dokumentasi foto kegiatan.
                            </p>
                        </div>
                    </div>
                    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                        <DialogTrigger asChild>
                            <Button className="rounded-full bg-brand-teal px-5 shadow-lg shadow-brand-teal/25 transition-all hover:-translate-y-0.5 hover:bg-brand-teal-dark">
                                <Plus className="mr-2" />
                                Tambah Foto
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="rounded-3xl sm:max-w-lg">
                            <DialogHeader>
                                <DialogTitle className="text-lg font-black">Tambah Foto Galeri</DialogTitle>
                                <DialogDescription>
                                    Unggah foto kegiatan untuk ditampilkan di halaman galeri.
                                </DialogDescription>
                            </DialogHeader>
                            <form onSubmit={handleSubmit} className="grid gap-5">
                                <div className="grid gap-2">
                                    <Label htmlFor="title">
                                        Judul Foto <span className="text-destructive">*</span>
                                    </Label>
                                    <Input
                                        id="title"
                                        value={data.title}
                                        onChange={(e) => setData('title', e.target.value)}
                                        placeholder="Contoh: Pelantikan Pengurus X"
                                        maxLength={255}
                                        required
                                        className="h-11 rounded-xl border-border/70 shadow-sm"
                                    />
                                    <InputError message={errors.title} />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="image">
                                        File Gambar <span className="text-destructive">*</span>
                                    </Label>
                                    {preview ? (
                                        <div className="group relative overflow-hidden rounded-xl ring-1 ring-black/5">
                                            <img
                                                src={preview}
                                                alt="Pratinjau"
                                                className="h-44 w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setPreview(null);
                                                    setData('image', null);

                                                    if (fileInputRef.current) {
                                                        fileInputRef.current.value = '';
                                                    }
                                                }}
                                                className="absolute top-2 right-2 inline-flex h-7 w-7 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur transition-colors hover:bg-red-600"
                                                aria-label="Hapus gambar"
                                            >
                                                <Trash2 className="h-3.5 w-3.5" />
                                            </button>
                                        </div>
                                    ) : (
                                        <button
                                            type="button"
                                            onClick={() => fileInputRef.current?.click()}
                                            className="flex h-44 flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border bg-slate-50/80 text-muted-foreground transition-colors hover:border-brand-teal/40 hover:bg-brand-teal/[0.04] hover:text-brand-teal-dark"
                                        >
                                            <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-sm">
                                                <ImagePlus className="h-6 w-6" />
                                            </span>
                                            <span className="text-sm font-bold">Klik untuk pilih foto</span>
                                            <span className="text-xs">JPG, PNG, atau WebP — maks 4MB</span>
                                        </button>
                                    )}
                                    <Input
                                        id="image"
                                        ref={fileInputRef}
                                        type="file"
                                        accept="image/*"
                                        onChange={handleFile}
                                        required
                                        className="hidden"
                                    />
                                    <InputError message={errors.image} />
                                    {progress && (
                                        <div className="grid gap-1.5">
                                            <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                                                <div
                                                    className="h-full rounded-full bg-gradient-to-r from-brand-teal to-brand-orange transition-all duration-300"
                                                    style={{ width: `${progress.percentage}%` }}
                                                />
                                            </div>
                                            <p className="text-xs font-semibold text-muted-foreground">
                                                Mengunggah {progress.percentage}%...
                                            </p>
                                        </div>
                                    )}
                                </div>
                                <DialogFooter>
                                    <Button
                                        type="submit"
                                        disabled={processing}
                                        className="h-11 w-full rounded-full bg-brand-teal font-bold shadow-lg shadow-brand-teal/25 transition-all hover:-translate-y-0.5 hover:bg-brand-teal-dark"
                                    >
                                        {processing ? (
                                            <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                Mengunggah...
                                            </>
                                        ) : (
                                            <>
                                                <Upload className="mr-2 h-4 w-4" />
                                                Unggah Foto
                                            </>
                                        )}
                                    </Button>
                                </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>

                {/* Toolbar */}
                <div className="flex flex-wrap items-center justify-between gap-3">
                    <p className="text-sm text-muted-foreground">
                        Klik foto untuk melihat pratinjau.
                    </p>
                    <span className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-card px-4 py-1.5 text-xs font-semibold text-muted-foreground shadow-sm">
                        {galleries.total > 0
                            ? `${galleries.total} foto dalam galeri`
                            : 'Belum ada data'}
                    </span>
                </div>

                <Card className="overflow-hidden rounded-2xl border-border/70 shadow-sm">
                    <CardContent className="p-6">
                        {galleries.data.length === 0 ? (
                            <div className="flex flex-col items-center gap-3 py-16 text-center">
                                <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-teal/10 text-brand-teal-dark">
                                    <Images className="h-7 w-7" />
                                </span>
                                <div>
                                    <p className="text-sm font-bold">Belum ada foto galeri</p>
                                    <p className="mt-1 text-sm text-muted-foreground">
                                        Klik "Tambah Foto" untuk mengunggah dokumentasi pertama Anda.
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                {galleries.data.map((gallery) => (
                                    <div
                                        key={gallery.id}
                                        className="group relative overflow-hidden rounded-2xl bg-slate-50 shadow-sm ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                                    >
                                        <button
                                            type="button"
                                            onClick={() => setLightbox(gallery)}
                                            className="block w-full"
                                            aria-label={`Lihat ${gallery.title}`}
                                        >
                                            <img
                                                src={gallery.image}
                                                alt={gallery.title}
                                                loading="lazy"
                                                className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                            />
                                        </button>
                                        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3.5 py-1.5 text-xs font-bold text-brand-navy shadow-lg backdrop-blur">
                                                <Eye className="h-3.5 w-3.5" />
                                                Lihat Foto
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between gap-2 border-t border-border/50 bg-white/90 px-3.5 py-2.5 backdrop-blur">
                                            <span className="line-clamp-1 text-xs font-bold text-brand-navy">
                                                {gallery.title}
                                            </span>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-7 w-7 shrink-0 rounded-full text-muted-foreground hover:bg-red-50 hover:text-red-600"
                                                onClick={() => handleDelete(gallery)}
                                                aria-label="Hapus foto"
                                            >
                                                <Trash2 className="h-3.5 w-3.5" />
                                            </Button>
                                        </div>
                                        <span className="pointer-events-none absolute top-3 left-3 rounded-full bg-black/50 px-2.5 py-1 text-[10px] font-bold tracking-wide text-white uppercase backdrop-blur">
                                            {gallery.created_at}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                    {galleries.data.length > 0 && (
                        <CardFooter className="border-t border-border/60 py-4">
                            <Pagination pagination={galleries} className="w-full justify-center" />
                        </CardFooter>
                    )}
                </Card>
            </div>

            {/* Lightbox */}
            <Dialog open={lightbox !== null} onOpenChange={(open) => !open && setLightbox(null)}>
                <DialogContent className="border-0 bg-black/95 p-2 text-white sm:p-3">
                    {lightbox && (
                        <img
                            src={lightbox.image}
                            alt={lightbox.title}
                            className="max-h-[80vh] w-full rounded-xl object-contain"
                        />
                    )}
                    {lightbox && (
                        <div className="flex items-center justify-between gap-3 px-3 pb-2">
                            <p className="line-clamp-1 text-sm font-bold">{lightbox.title}</p>
                            <span className="shrink-0 text-xs font-bold text-white/80">
                                {lightbox.created_at}
                            </span>
                        </div>
                    )}
                </DialogContent>
            </Dialog>

            <ConfirmDialog
                open={!!itemToDelete}
                onOpenChange={(open) => !open && setItemToDelete(null)}
                title="Hapus Foto Galeri?"
                description={`Apakah Anda yakin ingin menghapus foto "${itemToDelete?.title}"? Foto yang dihapus tidak dapat dipulihkan kembali.`}
                confirmText="Hapus Foto"
                cancelText="Batal"
                variant="danger"
                icon="trash"
                isLoading={isDeleting}
                onConfirm={confirmDelete}
            />
        </>
    );
}

AdminGalleriesIndex.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/admin' },
        { title: 'Galeri', href: '/admin/galleries' },
    ],
};
