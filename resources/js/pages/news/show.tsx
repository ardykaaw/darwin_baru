import { Head, Link } from '@inertiajs/react';
import { ArrowRight, Calendar, Check, Copy, Newspaper } from 'lucide-react';
import { useState } from 'react';
import { PublicPageHero } from '@/components/public-page-hero';
import type { NewsItem } from '@/types';

interface NewsShowProps {
    news: NewsItem;
}

export default function NewsShow({ news }: NewsShowProps) {
    const [copied, setCopied] = useState(false);

    async function copyLink() {
        try {
            await navigator.clipboard.writeText(window.location.href);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            // clipboard tidak tersedia
        }
    }

    return (
        <>
            <Head title={news.title} />

            <PublicPageHero
                badge={news.created_at}
                title={news.title}
                backHref="/news"
                backLabel="Kembali ke Berita"
            />

            <section className="py-16 lg:py-20">
                <div className="mx-auto max-w-[900px] px-5 lg:px-8">
                    {news.image && (
                        <div className="group relative overflow-hidden rounded-3xl shadow-lg">
                            <img
                                src={news.image}
                                alt={news.title}
                                className="w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                        </div>
                    )}

                    {/* Meta bar */}
                    <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
                        <div className="flex flex-wrap items-center gap-3">
                            <span className="inline-flex items-center gap-2 rounded-full bg-brand-teal/10 px-4 py-2 text-sm font-bold text-brand-teal-dark">
                                <Calendar className="h-4 w-4" />
                                {news.created_at}
                            </span>
                            <span className="inline-flex items-center gap-2 rounded-full bg-brand-orange/10 px-4 py-2 text-sm font-bold text-brand-orange-dark">
                                <Newspaper className="h-4 w-4" />
                                Berita
                            </span>
                        </div>
                        <button
                            type="button"
                            onClick={copyLink}
                            className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-brand-gray transition-colors hover:border-brand-teal/40 hover:text-brand-teal-dark"
                        >
                            {copied ? (
                                <>
                                    <Check className="h-4 w-4 text-brand-teal" />
                                    Tersalin
                                </>
                            ) : (
                                <>
                                    <Copy className="h-4 w-4" />
                                    Bagikan
                                </>
                            )}
                        </button>
                    </div>

                    <article className="prose prose-slate mt-8 max-w-none">
                        <div className="text-base leading-relaxed whitespace-pre-wrap text-brand-gray first-letter:float-left first-letter:mr-3 first-letter:text-6xl first-letter:leading-none first-letter:font-black first-letter:text-brand-teal-dark lg:text-lg">
                            {news.content.replace(/<[^>]*>/g, '')}
                        </div>
                    </article>

                    {/* CTA */}
                    <div className="dc-grid-pattern-navy relative mt-12 overflow-hidden rounded-3xl bg-gradient-to-br from-brand-navy to-brand-navy-dark p-8 text-white lg:p-10">
                        <div className="animate-drift absolute -top-16 -right-16 h-48 w-48 rounded-full bg-brand-teal/30 blur-3xl" />
                        <div className="relative flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
                            <div>
                                <h3 className="text-xl font-black">Dapatkan informasi terbaru lainnya?</h3>
                                <p className="mt-2 max-w-md text-sm leading-relaxed text-white/85">
                                    Ikuti terus kabar dan agenda Darwin Center melalui halaman berita.
                                </p>
                            </div>
                            <Link
                                href="/news"
                                className="inline-flex shrink-0 items-center gap-2 rounded-full bg-brand-teal px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-black/20 transition-all hover:-translate-y-0.5 hover:bg-brand-teal-dark"
                            >
                                Kunjungi Halaman Berita
                                <ArrowRight className="h-4 w-4" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
