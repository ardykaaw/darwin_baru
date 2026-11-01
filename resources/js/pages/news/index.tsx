import { Head, Link } from '@inertiajs/react';
import { ArrowRight, ArrowUpRight, Calendar, Newspaper } from 'lucide-react';
import Pagination from '@/components/pagination';
import { PublicPageHero } from '@/components/public-page-hero';
import { useListTranslation } from '@/hooks/use-content-translation';
import { useFlashMessages } from '@/hooks/use-flash-messages';
import { useTranslation } from '@/lib/i18n';
import type { Paginated, NewsItem } from '@/types';

interface NewsIndexProps {
    news: Paginated<NewsItem>;
}

export default function NewsIndex({ news }: NewsIndexProps) {
    useFlashMessages();
    const { t } = useTranslation();
    const { getTitle, getExcerpt } = useListTranslation(news.data);
    const [highlight, ...rest] = news.data;

    return (
        <>
            <Head title={t('news_page.title')} />

            <PublicPageHero
                badge={t('news_page.hero_badge')}
                title={t('news_page.hero_title')}
                description={t('news_page.hero_desc')}
            />

            <section className="py-16 lg:py-20">
                <div className="mx-auto max-w-[1440px] px-5 lg:px-8">
                    {news.data.length === 0 ? (
                        <div className="rounded-3xl border border-dashed border-slate-300 bg-white py-20 text-center">
                            <span className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-teal/10 text-brand-teal-dark">
                                <Newspaper className="h-7 w-7" />
                            </span>
                            <p className="mt-5 text-lg font-semibold text-brand-navy">{t('news_page.empty_title')}</p>
                            <p className="mt-2 text-sm text-brand-gray">{t('news_page.empty_desc')}</p>
                        </div>
                    ) : (
                        <>
                            <div className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                                <div className="flex items-center gap-3">
                                    <span className="h-8 w-1 rounded-full bg-gradient-to-b from-brand-orange to-brand-teal" />
                                    <p className="text-sm font-semibold tracking-wide text-brand-gray uppercase">
                                        {t('news_page.spotlight')}
                                    </p>
                                </div>
                                <p className="text-sm text-brand-gray">
                                    <span className="font-black text-brand-navy">{news.total}</span> {t('news_page.published_count')}
                                </p>
                            </div>

                            {/* Highlight news */}
                            {highlight && (
                                <Link
                                    href={`/news/${highlight.slug}`}
                                    className="group relative mb-12 block overflow-hidden rounded-[1.75rem] shadow-lg"
                                >
                                    <div className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06),transparent_60%)]" />
                                    {highlight.image ? (
                                        <img
                                            src={highlight.image}
                                            alt={highlight.title}
                                            className="h-[340px] w-full object-cover transition-transform duration-700 group-hover:scale-105 lg:h-[460px]"
                                        />
                                    ) : (
                                        <div className="h-[340px] w-full bg-slate-100 lg:h-[460px]" />
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/35 to-slate-950/10" />

                                    <span className="absolute top-6 left-6 inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-xs font-bold tracking-wide text-brand-navy uppercase shadow-lg">
                                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand-orange" />
                                        {t('news_page.latest_badge')}
                                    </span>

                                    <div className="absolute inset-x-0 bottom-0 p-7 text-white lg:p-10">
                                        <div className="flex flex-wrap items-center gap-4 text-sm font-bold text-white/90">
                                            <span className="inline-flex items-center gap-2">
                                                <Calendar className="h-4 w-4 text-brand-orange-light" />
                                                {highlight.created_at}
                                            </span>
                                            <span className="hidden h-1 w-1 rounded-full bg-white/40 sm:block" />
                                            <span className="hidden text-xs font-bold tracking-widest text-white/60 uppercase sm:block">
                                                {t('news_page.dc_news')}
                                            </span>
                                        </div>
                                        <h2 className="dc-text-balance mt-3 max-w-3xl text-2xl font-black leading-snug lg:text-4xl">
                                            {getTitle(highlight)}
                                        </h2>
                                        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/90 lg:text-base">
                                            {getExcerpt(highlight, highlight.content.replace(/<[^>]*>/g, '').slice(0, 180))}...
                                        </p>
                                        <div className="mt-6 inline-flex items-center gap-3 rounded-full bg-brand-orange-dark px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-black/20 transition-all group-hover:gap-4 group-hover:bg-brand-orange">
                                            {t('news_page.read_now')}
                                            <ArrowRight className="h-4 w-4" />
                                        </div>
                                    </div>
                                </Link>
                            )}

                            {/* Rest of news grid */}
                            {rest.length > 0 && (
                                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                                    {rest.map((item, i) => (
                                        <Link
                                            key={item.id}
                                            href={`/news/${item.slug}`}
                                            className="group relative flex flex-col overflow-hidden rounded-[1.5rem] border border-slate-200/80 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-brand-teal/30 hover:shadow-[0_24px_50px_rgba(15,23,42,0.14)]"
                                        >
                                            <div className="absolute inset-x-0 top-0 z-10 h-1 bg-gradient-to-r from-brand-teal via-brand-orange to-brand-teal opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                                            <div className="relative h-52 overflow-hidden">
                                                {item.image ? (
                                                    <img
                                                        src={item.image}
                                                        alt={getTitle(item)}
                                                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                                    />
                                                ) : (
                                                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-brand-teal/15 to-brand-orange/15">
                                                        <Newspaper className="h-10 w-10 text-brand-teal-dark/60" />
                                                    </div>
                                                )}
                                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                                                <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-brand-navy shadow-md backdrop-blur">
                                                    <Calendar className="h-3.5 w-3.5 text-brand-orange-dark" />
                                                    {item.created_at}
                                                </span>
                                                <span className="absolute right-4 bottom-2 text-4xl font-black text-white/15 transition-colors duration-300 group-hover:text-brand-orange-light/40">
                                                    {String(i + 1).padStart(2, '0')}
                                                </span>
                                            </div>
                                            <div className="flex flex-1 flex-col p-6">
                                                <h2 className="line-clamp-2 text-lg font-bold leading-snug text-brand-navy transition-colors group-hover:text-brand-teal-dark">
                                                    {getTitle(item)}
                                                </h2>
                                                <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-brand-gray">
                                                    {getExcerpt(item, item.content.replace(/<[^>]*>/g, '').slice(0, 160))}
                                                </p>
                                                <div className="mt-5 inline-flex items-center gap-2 border-t border-slate-100 pt-4 text-sm font-bold text-brand-teal-dark">
                                                    {t('news_page.read_more')}
                                                    <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-brand-teal/10 transition-all group-hover:bg-brand-teal group-hover:text-white">
                                                        <ArrowUpRight className="h-4 w-4" />
                                                    </span>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            )}

                            <Pagination pagination={news} className="mt-12" />
                        </>
                    )}
                </div>
            </section>
        </>
    );
}
