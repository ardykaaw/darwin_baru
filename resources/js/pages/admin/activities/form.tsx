import { Link } from '@inertiajs/react';
import { useForm } from '@inertiajs/react';
import { Activity, Calendar, FileQuestion, ImagePlus, Loader2, Save, X } from 'lucide-react';
import { useRef, useState } from 'react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import type { ActivityItem } from '@/types';

interface ActivityFormProps {
    activity?: ActivityItem;
}

export default function ActivityForm({ activity }: ActivityFormProps) {
    const isEdit = Boolean(activity);
    const [preview, setPreview] = useState<string | null>(activity?.image ?? null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const { data, setData, post, put, processing, errors, progress } = useForm({
        title: activity?.title ?? '',
        content: activity?.content ?? '',
        date: activity?.date ?? new Date().toISOString().slice(0, 10),
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
            setPreview(activity?.image ?? null);
        }
    }

    function clearImage() {
        setData('image', null);
        setPreview(null);

        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        if (isEdit) {
            put(`/admin/activities/${activity!.id}`, { forceFormData: true });
        } else {
            post('/admin/activities', { forceFormData: true });
        }
    }

    return (
        <>
            <div className="flex h-full flex-1 flex-col gap-6 p-4 lg:p-6">
                {/* Header */}
                <div className="flex items-center gap-4">
                    <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-orange to-brand-orange-dark text-white shadow-lg shadow-brand-orange/25">
                        <Activity className="h-6 w-6" />
                    </span>
                    <div>
                        <h1 className="text-2xl font-black tracking-tight">
                            {isEdit ? 'Edit Aktivitas' : 'Tambah Aktivitas'}
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            {isEdit
                                ? 'Perbarui detail aktivitas dan unggah gambar baru jika diperlukan.'
                                : 'Buat aktivitas baru untuk ditampilkan di halaman publik.'}
                        </p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="grid gap-6 lg:grid-cols-12">
                    <div className="grid content-start gap-6 lg:col-span-8">
                        <Card className="overflow-hidden rounded-2xl border-border/70 shadow-sm">
                            <CardHeader className="border-b border-border/60 bg-slate-50/60">
                                <CardTitle className="flex items-center gap-2">
                                    <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-brand-orange/10 text-brand-orange-dark">
                                        <Calendar className="h-4 w-4" />
                                    </span>
                                    Informasi Aktivitas
                                </CardTitle>
                                <CardDescription>
                                    Lengkapi detail aktivitas dengan benar.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="grid gap-6 pt-6">
                                <div className="grid gap-2">
                                    <div className="flex items-center justify-between">
                                        <Label htmlFor="title">
                                            Judul Aktivitas <span className="text-destructive">*</span>
                                        </Label>
                                        <span
                                            className={cn(
                                                'text-xs font-semibold tabular-nums',
                                                data.title.length > 255 ? 'text-destructive' : 'text-muted-foreground',
                                            )}
                                        >
                                            {data.title.length}/255
                                        </span>
                                    </div>
                                    <Input
                                        id="title"
                                        value={data.title}
                                        onChange={(e) => setData('title', e.target.value)}
                                        placeholder="Contoh: Kunjungan Kerja ke Desa X"
                                        maxLength={255}
                                        required
                                        className="h-11 rounded-xl border-border/70 shadow-sm"
                                    />
                                    <InputError message={errors.title} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="date">
                                        Tanggal <span className="text-destructive">*</span>
                                    </Label>
                                    <Input
                                        id="date"
                                        type="date"
                                        value={data.date}
                                        onChange={(e) => setData('date', e.target.value)}
                                        required
                                        className="h-11 rounded-xl border-border/70 shadow-sm"
                                    />
                                    <InputError message={errors.date} />
                                </div>

                                <div className="grid gap-2">
                                    <div className="flex items-center justify-between">
                                        <Label htmlFor="content">
                                            Deskripsi <span className="text-destructive">*</span>
                                        </Label>
                                        <span className="text-xs font-semibold text-muted-foreground tabular-nums">
                                            {data.content.length} karakter
                                        </span>
                                    </div>
                                    <Textarea
                                        id="content"
                                        rows={9}
                                        value={data.content}
                                        onChange={(e) => setData('content', e.target.value)}
                                        placeholder="Deskripsikan detail aktivitas, agenda, dan hasil yang dicapai..."
                                        required
                                        className="rounded-xl border-border/70 shadow-sm"
                                    />
                                    <InputError message={errors.content} />
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="grid content-start gap-6 lg:col-span-4">
                        <Card className="overflow-hidden rounded-2xl border-border/70 shadow-sm">
                            <CardHeader className="border-b border-border/60 bg-slate-50/60">
                                <CardTitle className="flex items-center gap-2">
                                    <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-brand-orange/10 text-brand-orange-dark">
                                        <ImagePlus className="h-4 w-4" />
                                    </span>
                                    Gambar Sampul
                                </CardTitle>
                                <CardDescription>
                                    Upload gambar (maks 4MB, format JPG/PNG/WebP).
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="grid gap-4 pt-6">
                                {preview ? (
                                    <div className="group relative overflow-hidden rounded-xl ring-1 ring-black/5">
                                        <img
                                            src={preview}
                                            alt="Preview"
                                            className="h-44 w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                                        <button
                                            type="button"
                                            onClick={clearImage}
                                            className="absolute top-2 right-2 inline-flex h-7 w-7 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur transition-colors hover:bg-red-600"
                                            aria-label="Hapus gambar"
                                        >
                                            <X className="h-3.5 w-3.5" />
                                        </button>
                                        <span className="absolute bottom-2 left-2 rounded-full bg-black/50 px-2.5 py-1 text-[10px] font-bold tracking-wide text-white uppercase backdrop-blur">
                                            Sampul
                                        </span>
                                    </div>
                                ) : (
                                    <button
                                        type="button"
                                        onClick={() => fileInputRef.current?.click()}
                                        className="flex h-44 flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border bg-slate-50/80 text-muted-foreground transition-colors hover:border-brand-teal/40 hover:bg-brand-teal/[0.04] hover:text-brand-teal-dark"
                                    >
                                        <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-sm">
                                            <FileQuestion className="h-6 w-6" />
                                        </span>
                                        <span className="text-sm font-bold">Klik untuk upload</span>
                                        <span className="text-xs">JPG, PNG, atau WebP</span>
                                    </button>
                                )}

                                <div className="grid gap-2">
                                    <Input
                                        id="image"
                                        ref={fileInputRef}
                                        type="file"
                                        accept="image/*"
                                        onChange={handleFile}
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

                                {/* Actions */}
                                <div className="flex flex-col gap-2.5 pt-2">
                                    <Button
                                        type="submit"
                                        disabled={processing}
                                        className="h-11 rounded-full bg-brand-teal text-sm font-bold shadow-lg shadow-brand-teal/25 transition-all hover:-translate-y-0.5 hover:bg-brand-teal-dark"
                                    >
                                        {processing ? (
                                            <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                Menyimpan...
                                            </>
                                        ) : (
                                            <>
                                                <Save className="mr-2 h-4 w-4" />
                                                {isEdit ? 'Perbarui Aktivitas' : 'Simpan Aktivitas'}
                                            </>
                                        )}
                                    </Button>
                                    <Button type="button" variant="outline" asChild className="h-11 rounded-full">
                                        <Link href="/admin/activities">Batal</Link>
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </form>
            </div>
        </>
    );
}

ActivityForm.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/admin' },
        { title: 'Aktivitas', href: '/admin/activities' },
    ],
};
