import { Head, Link, useForm } from '@inertiajs/react';
import {
    ArrowLeft,
    Check,
    Clock,
    Copy,
    ExternalLink,
    Globe,
    Image as ImageIcon,
    Info,
    Loader2,
    Save,
    Trash2,
    UploadCloud,
} from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import InputError from '@/components/input-error';
import { RichTextEditor } from '@/components/rich-text-editor';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { NewsItem } from '@/types';

interface NewsFormProps {
    news?: NewsItem;
}

export default function NewsForm({ news }: NewsFormProps) {
    const isEdit = Boolean(news);
    const [preview, setPreview] = useState<string | null>(news?.image ?? null);
    const [copiedSlug, setCopiedSlug] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const titleRef = useRef<HTMLTextAreaElement>(null);

    const { data, setData, post, put, processing, errors, progress } = useForm({
        title: news?.title ?? '',
        content: news?.content ?? '',
        image: null as File | null,
        is_published: news?.is_published ?? true,
    });

    // Auto-grow title textarea dynamically
    useEffect(() => {
        if (titleRef.current) {
            titleRef.current.style.height = 'auto';
            titleRef.current.style.height = `${Math.max(56, titleRef.current.scrollHeight)}px`;
        }
    }, [data.title]);

    // Keyboard shortcut (Cmd+S / Ctrl+S)
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 's') {
                e.preventDefault();
                handleSubmit();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [data, isEdit]);

    function processSelectedFile(file: File) {
        if (!file.type.startsWith('image/')) return;
        setData('image', file);
        const reader = new FileReader();
        reader.onload = () => setPreview(reader.result as string);
        reader.readAsDataURL(file);
    }

    function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0] ?? null;
        if (file) {
            processSelectedFile(file);
        } else {
            setData('image', null);
            setPreview(news?.image ?? null);
        }
    }

    function handleDragOver(e: React.DragEvent) {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    }

    function handleDragLeave(e: React.DragEvent) {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    }

    function handleDrop(e: React.DragEvent) {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
        const file = e.dataTransfer.files?.[0];
        if (file) {
            processSelectedFile(file);
        }
    }

    function clearImage() {
        setData('image', null);
        setPreview(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    }

    function handleSubmit(e?: React.FormEvent) {
        if (e) e.preventDefault();
        const method = isEdit ? put : post;
        const url = isEdit ? `/admin/news/${news!.id}` : '/admin/news';
        method(url, { forceFormData: true });
    }

    function slugify(value: string) {
        return value
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/[\s_-]+/g, '-')
            .replace(/^-+|-+$/g, '');
    }

    const currentSlug = slugify(data.title) || (isEdit ? news?.slug || '' : 'judul-berita');

    function copySlug() {
        if (!currentSlug) return;
        const fullUrl = `${window.location.origin}/news/${currentSlug}`;
        navigator.clipboard.writeText(fullUrl);
        setCopiedSlug(true);
        setTimeout(() => setCopiedSlug(false), 2000);
    }

    // Editorial text metrics
    const plainText = (data.content || '')
        .replace(/<[^>]*>/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
    const wordCount = plainText ? plainText.split(/\s+/).length : 0;
    const readingTime = Math.max(1, Math.ceil(wordCount / 200));
    const autoExcerpt = plainText.slice(0, 160);

    return (
        <div className="min-h-screen pb-16">
            <Head title={isEdit ? `Edit: ${data.title || 'Berita'}` : 'Tulis Berita Baru'} />

            {/* Sticky Sub-Header Bar */}
            <div className="sticky top-0 z-30 -mx-4 -mt-4 mb-6 border-b border-slate-200/80 bg-white/90 px-4 py-3 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/90 lg:-mx-6 lg:-mt-6 lg:px-8">
                <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
                    {/* Left: Back & Breadcrumb Meta */}
                    <div className="flex min-w-0 items-center gap-3">
                        <Link
                            href="/admin/news"
                            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                            title="Kembali ke Daftar Berita"
                        >
                            <ArrowLeft className="h-4 w-4" />
                        </Link>

                        <div className="flex min-w-0 items-center gap-2.5 truncate">
                            <span className="truncate text-sm font-semibold text-slate-900 dark:text-slate-100">
                                {isEdit ? 'Edit Berita' : 'Tulis Berita Baru'}
                            </span>
                            <span className="hidden text-slate-300 sm:inline dark:text-slate-700">•</span>
                            
                            {/* Minimalist Status Pill */}
                            <span
                                className={cn(
                                    'hidden sm:inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium',
                                    data.is_published
                                        ? 'border border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-800/60 dark:bg-emerald-950/40 dark:text-emerald-400'
                                        : 'border border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-800/60 dark:bg-amber-950/40 dark:text-amber-400',
                                )}
                            >
                                <span
                                    className={cn(
                                        'h-1.5 w-1.5 rounded-full',
                                        data.is_published ? 'bg-emerald-500' : 'bg-amber-500',
                                    )}
                                />
                                {data.is_published ? 'Siap Terbit' : 'Draf'}
                            </span>

                            <span className="hidden text-slate-300 md:inline dark:text-slate-700">•</span>
                            <span className="hidden text-xs text-slate-500 md:inline dark:text-slate-400">
                                {wordCount} kata · ~{readingTime} mnt baca
                            </span>
                        </div>
                    </div>

                    {/* Right: Actions */}
                    <div className="flex shrink-0 items-center gap-2.5">
                        <Button
                            type="button"
                            variant="ghost"
                            asChild
                            className="h-9 rounded-lg px-3.5 text-xs font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
                        >
                            <Link href="/admin/news">Batal</Link>
                        </Button>

                        <Button
                            onClick={handleSubmit}
                            disabled={processing}
                            className="h-9 rounded-lg bg-brand-navy px-4 text-xs font-semibold text-white shadow-xs transition-all hover:bg-brand-navy-dark dark:bg-brand-teal dark:hover:bg-brand-teal-dark"
                        >
                            {processing ? (
                                <>
                                    <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />
                                    Menyimpan...
                                </>
                            ) : (
                                <>
                                    <Save className="mr-1.5 h-3.5 w-3.5" />
                                    {isEdit
                                        ? 'Perbarui Berita'
                                        : data.is_published
                                          ? 'Terbitkan'
                                          : 'Simpan Draf'}
                                    <kbd className="ml-2 hidden rounded bg-white/20 px-1.5 py-0.5 font-mono text-[10px] font-normal opacity-80 sm:inline">
                                        ⌘S
                                    </kbd>
                                </>
                            )}
                        </Button>
                    </div>
                </div>
            </div>

            {/* Main Editorial Studio Canvas */}
            <form onSubmit={handleSubmit} className="mx-auto max-w-7xl">
                <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
                    {/* Primary Document Sheet (Left / Center) */}
                    <div className="min-w-0 flex-1 overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-xs dark:border-slate-800 dark:bg-slate-900">
                        {/* Cover Image Banner */}
                        {preview ? (
                            <div className="group relative max-h-[380px] w-full overflow-hidden bg-slate-950">
                                <img
                                    src={preview}
                                    alt="Sampul Berita"
                                    className="h-full max-h-[380px] w-full object-cover transition-transform duration-500 group-hover:scale-102"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 opacity-80 transition-opacity group-hover:opacity-100" />

                                <div className="absolute top-3.5 right-3.5 flex items-center gap-2">
                                    <button
                                        type="button"
                                        onClick={() => fileInputRef.current?.click()}
                                        className="inline-flex items-center gap-1.5 rounded-lg bg-white/90 px-3 py-1.5 text-xs font-medium text-slate-800 shadow-xs backdrop-blur-md transition-colors hover:bg-white hover:text-brand-navy"
                                    >
                                        <UploadCloud className="h-3.5 w-3.5" />
                                        Ganti Foto
                                    </button>
                                    <button
                                        type="button"
                                        onClick={clearImage}
                                        className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-black/60 text-white backdrop-blur-md transition-colors hover:bg-rose-600"
                                        title="Hapus foto sampul"
                                    >
                                        <Trash2 className="h-3.5 w-3.5" />
                                    </button>
                                </div>

                                <div className="absolute bottom-3.5 left-4 rounded-md bg-black/50 px-2.5 py-1 text-xs font-medium text-white/90 backdrop-blur-md">
                                    Foto Sampul Utama
                                </div>
                            </div>
                        ) : (
                            <div
                                onClick={() => fileInputRef.current?.click()}
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                onDrop={handleDrop}
                                className={cn(
                                    'group flex cursor-pointer flex-col items-center justify-center gap-2.5 border-b border-dashed p-8 text-center transition-colors',
                                    isDragging
                                        ? 'border-brand-teal bg-brand-teal/5'
                                        : 'border-slate-200 bg-slate-50/50 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900/50 dark:hover:bg-slate-800/40',
                                )}
                            >
                                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 shadow-2xs transition-transform group-hover:scale-105 group-hover:text-brand-teal dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400">
                                    <ImageIcon className="h-5 w-5" />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-slate-700 group-hover:text-brand-navy dark:text-slate-300 dark:group-hover:text-white">
                                        Pilih atau seret foto sampul artikel ke sini
                                    </p>
                                    <p className="mt-0.5 text-xs text-slate-400 dark:text-slate-500">
                                        Format JPG, PNG, atau WebP (maks. 4MB) · Rasio 16:9 disarankan
                                    </p>
                                </div>
                            </div>
                        )}

                        <input
                            id="image"
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="hidden"
                        />

                        {errors.image && (
                            <div className="px-6 pt-3 sm:px-8">
                                <InputError message={errors.image} />
                            </div>
                        )}

                        {progress && (
                            <div className="border-b border-slate-100 bg-slate-50/70 px-6 py-2.5 dark:border-slate-800 dark:bg-slate-800/50 sm:px-8">
                                <div className="mb-1 flex items-center justify-between text-xs text-slate-600 dark:text-slate-400">
                                    <span>Mengunggah foto sampul...</span>
                                    <span className="font-mono font-medium">{progress.percentage}%</span>
                                </div>
                                <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
                                    <div
                                        className="h-full bg-brand-teal transition-all duration-300"
                                        style={{ width: `${progress.percentage}%` }}
                                    />
                                </div>
                            </div>
                        )}

                        {/* Title & Slug Header */}
                        <div className="p-6 sm:p-8 lg:p-10 pb-4 sm:pb-6">
                            <div className="mb-3 flex items-center justify-between gap-3">
                                <label
                                    htmlFor="title"
                                    className="text-[11px] font-semibold tracking-wider text-slate-400 uppercase dark:text-slate-500"
                                >
                                    Judul Artikel <span className="text-rose-500">*</span>
                                </label>
                                <span
                                    className={cn(
                                        'font-mono text-xs tabular-nums',
                                        data.title.length > 255 ? 'text-rose-500' : 'text-slate-400',
                                    )}
                                >
                                    {data.title.length}/255
                                </span>
                            </div>

                            <textarea
                                ref={titleRef}
                                id="title"
                                rows={1}
                                value={data.title}
                                onChange={(e) => setData('title', e.target.value)}
                                placeholder="Tuliskan judul berita yang jelas dan informatif..."
                                maxLength={255}
                                required
                                className="w-full resize-none overflow-hidden bg-transparent text-2xl font-black leading-snug tracking-tight text-brand-navy placeholder:text-slate-300 focus:outline-none sm:text-3xl lg:text-4xl dark:text-white dark:placeholder:text-slate-700"
                            />
                            <InputError message={errors.title} className="mt-2" />

                            {/* Clean Permalink Bar */}
                            <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 pt-3 text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400">
                                <div className="flex min-w-0 items-center gap-1.5">
                                    <Globe className="h-3.5 w-3.5 shrink-0 text-slate-400" />
                                    <span className="truncate font-mono text-slate-600 dark:text-slate-300">
                                        /news/{currentSlug}
                                    </span>
                                </div>
                                <div className="flex shrink-0 items-center gap-2">
                                    <button
                                        type="button"
                                        onClick={copySlug}
                                        className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200"
                                    >
                                        {copiedSlug ? (
                                            <>
                                                <Check className="h-3 w-3 text-emerald-600" />
                                                <span className="text-emerald-600 font-semibold">Tersalin</span>
                                            </>
                                        ) : (
                                            <>
                                                <Copy className="h-3 w-3" />
                                                <span>Salin URL</span>
                                            </>
                                        )}
                                    </button>
                                    {isEdit && (
                                        <a
                                            href={`/news/${news?.slug}`}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-medium text-brand-teal transition-colors hover:underline"
                                        >
                                            <span>Buka Berita</span>
                                            <ExternalLink className="h-3 w-3" />
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Rich Text Editor */}
                        <div className="border-t border-slate-100 dark:border-slate-800">
                            <RichTextEditor
                                value={data.content}
                                onChange={(html) => setData('content', html)}
                                placeholder="Mulai menulis paragraf isi berita di sini... Gunakan format judul bab, kutipan, dan penomoran poin untuk kemudahan membaca."
                                minHeight="520px"
                                error={errors.content}
                                variant="seamless"
                                onSaveShortcut={handleSubmit}
                            />
                        </div>
                        {errors.content && (
                            <div className="border-t border-rose-100 bg-rose-50/50 p-4 dark:border-rose-900/30 dark:bg-rose-950/20">
                                <InputError message={errors.content} />
                            </div>
                        )}
                    </div>

                    {/* Publishing Sidebar Inspector (Right) */}
                    <div className="w-full shrink-0 space-y-4 lg:w-80">
                        {/* Status Publikasi */}
                        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
                            <h3 className="mb-3 text-[11px] font-semibold tracking-wider text-slate-400 uppercase dark:text-slate-500">
                                Status Publikasi
                            </h3>

                            <div className="grid grid-cols-2 gap-1 rounded-xl bg-slate-100 p-1 dark:bg-slate-800">
                                <button
                                    type="button"
                                    onClick={() => setData('is_published', false)}
                                    className={cn(
                                        'flex items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-semibold transition-all',
                                        !data.is_published
                                            ? 'bg-white text-slate-900 shadow-xs dark:bg-slate-700 dark:text-white'
                                            : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white',
                                    )}
                                >
                                    <span className="h-2 w-2 rounded-full bg-amber-500" />
                                    Draf
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setData('is_published', true)}
                                    className={cn(
                                        'flex items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-semibold transition-all',
                                        data.is_published
                                            ? 'bg-white text-slate-900 shadow-xs dark:bg-slate-700 dark:text-white'
                                            : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white',
                                    )}
                                >
                                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                                    Terbitkan
                                </button>
                            </div>

                            <p className="mt-3 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                                {data.is_published
                                    ? 'Artikel akan langsung dipublikasikan dan dapat dibaca oleh seluruh pengunjung portal berita.'
                                    : 'Artikel hanya disimpan sebagai draf internal dan tidak terlihat oleh pengunjung.'}
                            </p>

                            <div className="mt-4 border-t border-slate-100 pt-4 dark:border-slate-800">
                                <Button
                                    type="submit"
                                    disabled={processing}
                                    className="h-10 w-full rounded-xl bg-brand-teal text-xs font-semibold text-white shadow-xs transition-colors hover:bg-brand-teal-dark"
                                >
                                    {processing ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Menyimpan...
                                        </>
                                    ) : (
                                        <>
                                            <Save className="mr-2 h-4 w-4" />
                                            {isEdit
                                                ? 'Perbarui Berita'
                                                : data.is_published
                                                  ? 'Terbitkan Sekarang'
                                                  : 'Simpan Sebagai Draf'}
                                        </>
                                    )}
                                </Button>
                            </div>
                        </div>

                        {/* Metrik & Ringkasan Konten */}
                        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
                            <h3 className="mb-3 text-[11px] font-semibold tracking-wider text-slate-400 uppercase dark:text-slate-500">
                                Metrik Tulisan
                            </h3>

                            <div className="grid grid-cols-3 gap-2 border-b border-slate-100 pb-4 text-center dark:border-slate-800">
                                <div className="rounded-xl bg-slate-50 p-2.5 dark:bg-slate-800/60">
                                    <span className="block font-mono text-base font-bold text-slate-900 dark:text-white">
                                        {wordCount}
                                    </span>
                                    <span className="text-[11px] text-slate-400">Kata</span>
                                </div>
                                <div className="rounded-xl bg-slate-50 p-2.5 dark:bg-slate-800/60">
                                    <span className="block font-mono text-base font-bold text-slate-900 dark:text-white">
                                        ~{readingTime}m
                                    </span>
                                    <span className="text-[11px] text-slate-400">Baca</span>
                                </div>
                                <div className="rounded-xl bg-slate-50 p-2.5 dark:bg-slate-800/60">
                                    <span className="block font-mono text-base font-bold text-slate-900 dark:text-white">
                                        {plainText.length}
                                    </span>
                                    <span className="text-[11px] text-slate-400">Karakter</span>
                                </div>
                            </div>

                            <div className="mt-3.5">
                                <span className="mb-1.5 block text-[11px] font-medium text-slate-400 dark:text-slate-500">
                                    Ringkasan Cuplikan Otomatis
                                </span>
                                <p className="line-clamp-3 rounded-xl border border-slate-100 bg-slate-50/70 p-3 text-xs leading-relaxed text-slate-600 dark:border-slate-800 dark:bg-slate-800/40 dark:text-slate-300">
                                    {autoExcerpt || 'Cuplikan paragraf awal artikel akan muncul otomatis di sini...'}
                                </p>
                            </div>
                        </div>

                        {/* Panduan Redaksi */}
                        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
                            <h3 className="mb-3 flex items-center gap-1.5 text-[11px] font-semibold tracking-wider text-slate-400 uppercase dark:text-slate-500">
                                <Info className="h-3.5 w-3.5 text-brand-teal" />
                                Panduan Redaksi
                            </h3>
                            <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-300">
                                <li className="flex items-start gap-2">
                                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-300 dark:bg-slate-600" />
                                    <span>Gunakan judul yang lugas, informatif, dan mudah dipahami.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-300 dark:bg-slate-600" />
                                    <span>Sertakan foto dokumentasi asli yang tajam dengan rasio lanskap 16:9.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-300 dark:bg-slate-600" />
                                    <span>Gunakan subjudul bab dan penomoran poin untuk kenyamanan pembaca.</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

NewsForm.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/admin' },
        { title: 'Berita', href: '/admin/news' },
        { title: 'Form Berita', href: '/admin/news/create' },
    ],
};
