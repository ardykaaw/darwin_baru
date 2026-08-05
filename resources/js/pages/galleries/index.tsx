import { Head } from '@inertiajs/react';
import { Calendar, ChevronLeft, ChevronRight, Expand, X } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import Pagination from '@/components/pagination';
import { PublicPageHero } from '@/components/public-page-hero';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useFlashMessages } from '@/hooks/use-flash-messages';
import { cn } from '@/lib/utils';
import type { Paginated, GalleryItem } from '@/types';

interface GalleriesIndexProps {
    galleries: Paginated<GalleryItem>;
}

const ASPECTS = ['aspect-[4/5]', 'aspect-square', 'aspect-[4/3]', 'aspect-[3/4]'];

export default function GalleriesIndex({ galleries }: GalleriesIndexProps) {
    useFlashMessages();
    const [selected, setSelected] = useState<GalleryItem | null>(null);
    const items = galleries.data;

    const currentIndex = selected ? items.findIndex((item) => item.id === selected.id) : -1;

    const show = useCallback(
        (index: number) => {
            if (index >= 0 && index < items.length) {
                setSelected(items[index]);
            }
        },
        [items],
    );

    const next = useCallback(() => show(currentIndex + 1), [show, currentIndex]);
    const prev = useCallback(() => show(currentIndex - 1), [show, currentIndex]);

    useEffect(() => {
        if (!selected) {
            return;
        }

        function onKey(e: KeyboardEvent) {
            if (e.key === 'ArrowRight') {
next();
}

            if (e.key === 'ArrowLeft') {
prev();
}
        }

        window.addEventListener('keydown', onKey);

        return () => window.removeEventListener('keydown', onKey);
    }, [selected, next, prev]);

    return (
        <>
            <Head title="Galeri" />

            <PublicPageHero
                badge="Galeri"
                title="Dokumentasi visual kegiatan."
                description="Foto-foto terbaik dari kegiatan dan program yang sedang berjalan."
            />

            <section className="py-16 lg:py-20">
                <div className="mx-auto max-w-[1440px] px-5 lg:px-8">
                    {items.length === 0 ? (
                        <div className="rounded-3xl border border-dashed border-slate-300 bg-white py-20 text-center">
                            <p className="text-lg font-semibold text-brand-navy">Belum ada galeri</p>
                            <p className="mt-2 text-sm text-brand-gray">Dokumentasi akan segera ditambahkan.</p>
                        </div>
                    ) : (
                        <>
                            <div className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                                <div className="flex items-center gap-3">
                                    <span className="h-8 w-1 rounded-full bg-gradient-to-b from-brand-orange to-brand-teal" />
                                    <p className="text-sm font-semibold tracking-wide text-brand-gray uppercase">
                                        Koleksi dokumentasi kami
                                    </p>
                                </div>
                                <p className="text-sm text-brand-gray">
                                    <span className="font-black text-brand-navy">{galleries.total}</span> foto telah
                                    dipublikasikan
                                </p>
                            </div>

                            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                                {items.map((gallery, i) => (
                                    <button
                                        key={gallery.id}
                                        type="button"
                                        onClick={() => setSelected(gallery)}
                                        className={cn(
                                            'group relative block w-full overflow-hidden rounded-3xl shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal',
                                            ASPECTS[i % ASPECTS.length],
                                        )}
                                    >
                                        <img
                                            src={gallery.image}
                                            alt={gallery.title}
                                            loading="lazy"
                                            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-95" />
                                        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5 text-left text-white">
                                            <div>
                                                {gallery.created_at && (
                                                    <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-white/90">
                                                        <Calendar className="h-3.5 w-3.5 text-brand-orange-light" />
                                                        {gallery.created_at}
                                                    </div>
                                                )}
                                                <h3 className="mt-1.5 line-clamp-2 font-bold leading-snug drop-shadow">
                                                    {gallery.title}
                                                </h3>
                                            </div>
                                            <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/20 backdrop-blur transition-all group-hover:bg-brand-orange group-hover:shadow-lg">
                                                <Expand className="h-4.5 w-4.5" />
                                            </span>
                                        </div>
                                    </button>
                                ))}
                            </div>

                            <Pagination pagination={galleries} className="mt-12" />
                        </>
                    )}
                </div>
            </section>

            {/* Lightbox */}
            <Dialog open={selected !== null} onOpenChange={(open) => !open && setSelected(null)}>
                <DialogContent className="max-w-4xl border-0 bg-black/95 p-2 text-white sm:p-3">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setSelected(null)}
                        className="absolute right-3 top-3 z-10 text-white hover:bg-white/10 hover:text-white"
                        aria-label="Tutup"
                    >
                        <X className="h-5 w-5" />
                    </Button>

                    {items.length > 1 && (
                        <>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={prev}
                                disabled={currentIndex <= 0}
                                className="absolute left-3 top-1/2 z-10 -translate-y-1/2 text-white hover:bg-white/10 hover:text-white disabled:opacity-30"
                                aria-label="Sebelumnya"
                            >
                                <ChevronLeft className="h-7 w-7" />
                            </Button>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={next}
                                disabled={currentIndex >= items.length - 1}
                                className="absolute right-3 top-1/2 z-10 -translate-y-1/2 text-white hover:bg-white/10 hover:text-white disabled:opacity-30"
                                aria-label="Berikutnya"
                            >
                                <ChevronRight className="h-7 w-7" />
                            </Button>
                        </>
                    )}

                    {selected && (
                        <img src={selected.image} alt={selected.title} className="max-h-[80vh] w-full rounded-xl object-contain" />
                    )}
                    <div className="flex items-center justify-between gap-3 px-3 pb-2">
                        {selected ? (
                            <p className="line-clamp-1 text-sm font-bold text-white">{selected.title}</p>
                        ) : (
                            <span />
                        )}
                        {items.length > 1 && (
                            <span className="shrink-0 text-xs font-bold text-white/80">
                                {currentIndex + 1} / {items.length}
                            </span>
                        )}
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}