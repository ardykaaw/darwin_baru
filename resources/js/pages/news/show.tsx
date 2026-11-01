import { Head, Link } from '@inertiajs/react';
import { ArrowRight, Calendar, Check, Copy, Newspaper } from 'lucide-react';
import { useState } from 'react';
import { PublicPageHero } from '@/components/public-page-hero';
import { AutoTranslateBanner, useContentTranslation } from '@/hooks/use-content-translation';
import { useTranslation } from '@/lib/i18n';
import type { NewsItem } from '@/types';

interface NewsShowProps {
    news: NewsItem;
}

export default function NewsShow({ news }: NewsShowProps) {
    const { t } = useTranslation();
    const [copied, setCopied] = useState(false);

    const {
        title: displayTitle,
        content: displayContent,
        isTranslating,
        isTranslated,
        showOriginal,
        toggleOriginal,
    } = useContentTranslation({
        id: news.id,
        title: news.title,
        content: news.content,
    });

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
            <Head title={displayTitle} />

            <PublicPageHero
                badge={news.created_at}
                title={displayTitle}
                backHref="/news"
                backLabel={t('news_show.back')}
            />

            <section className="py-16 lg:py-20">
                <div className="mx-auto max-w-[900px] px-5 lg:px-8">
                    {/* Auto Translation Banner for English mode */}
                    <AutoTranslateBanner
                        isTranslating={isTranslating}
                        isTranslated={isTranslated}
                        showOriginal={showOriginal}
                        onToggleOriginal={toggleOriginal}
                    />

                    {news.image && (
                        <div className="group relative overflow-hidden rounded-3xl shadow-lg">
                            <img
                                src={news.image}
                                alt={displayTitle}
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
                                {t('news_show.badge_berita')}
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
                                    {t('news_show.copied')}
                                </>
                            ) : (
                                <>
                                    <Copy className="h-4 w-4" />
                                    {t('news_show.share')}
                                </>
                            )}
                        </button>
                    </div>

                    <article className="prose prose-slate mt-8 max-w-none">
                        <div
                            className="text-base leading-relaxed text-brand-gray lg:text-lg [&_h2]:mt-8 [&_h2]:mb-4 [&_h2]:text-2xl [&_h2]:font-black [&_h2]:text-brand-navy [&_h3]:mt-6 [&_h3]:mb-3 [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-brand-navy [&_p]:mb-4 [&_p]:leading-relaxed [&_blockquote]:my-6 [&_blockquote]:border-l-4 [&_blockquote]:border-brand-teal [&_blockquote]:bg-brand-teal/[0.04] [&_blockquote]:py-3 [&_blockquote]:pr-6 [&_blockquote]:pl-6 [&_blockquote]:italic [&_blockquote]:text-brand-navy [&_ul]:my-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:my-4 [&_ol]:list-decimal [&_ol]:pl-6 [&_li]:mb-2 [&_hr]:my-8 [&_hr]:border-slate-200 [&_a]:font-bold [&_a]:text-brand-teal-dark [&_a]:underline"
                            dangerouslySetInnerHTML={{ __html: displayContent }}
                        />
                    </article>

                    {/* CTA */}
                    <div className="dc-grid-pattern-navy relative mt-12 overflow-hidden rounded-3xl bg-gradient-to-br from-brand-navy to-brand-navy-dark p-8 text-white lg:p-10">
                        <div className="animate-drift absolute -top-16 -right-16 h-48 w-48 rounded-full bg-brand-teal/30 blur-3xl" />
                        <div className="relative flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
                            <div>
                                <h3 className="text-xl font-black">{t('news_show.cta_title')}</h3>
                                <p className="mt-2 max-w-md text-sm leading-relaxed text-white/85">
                                    {t('news_show.cta_desc')}
                                </p>
                            </div>
                            <Link
                                href="/news"
                                className="inline-flex shrink-0 items-center gap-2 rounded-full bg-brand-teal px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-black/20 transition-all hover:-translate-y-0.5 hover:bg-brand-teal-dark"
                            >
                                {t('news_show.cta_button')}
                                <ArrowRight className="h-4 w-4" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
