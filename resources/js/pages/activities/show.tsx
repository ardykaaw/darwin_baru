import { Head, Link } from '@inertiajs/react';
import { ArrowRight, ArrowUpRight, Calendar, Check, Copy, Flag } from 'lucide-react';
import { useState } from 'react';
import { PublicPageHero } from '@/components/public-page-hero';
import { AutoTranslateBanner, useContentTranslation } from '@/hooks/use-content-translation';
import { useTranslation } from '@/lib/i18n';
import type { ActivityItem } from '@/types';

interface ActivityShowProps {
    activity: ActivityItem;
    otherActivities: Array<Pick<ActivityItem, 'id' | 'title' | 'date' | 'image'>>;
}

export default function ActivityShow({ activity, otherActivities }: ActivityShowProps) {
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
        id: activity.id,
        title: activity.title,
        content: activity.content,
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
                badge={activity.date}
                title={displayTitle}
                backHref="/activities"
                backLabel={t('activities_show.back')}
            />

            <section className="py-16 lg:py-20">
                <div className="mx-auto max-w-[1400px] px-5 lg:px-8">
                    <div className="grid gap-10 lg:grid-cols-12">
                        {/* Content */}
                        <div className="lg:col-span-8">
                            <AutoTranslateBanner
                                isTranslating={isTranslating}
                                isTranslated={isTranslated}
                                showOriginal={showOriginal}
                                onToggleOriginal={toggleOriginal}
                            />
                            {activity.image && (
                                <div className="group relative overflow-hidden rounded-3xl shadow-lg">
                                    <img
                                        src={activity.image}
                                        alt={activity.title}
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
                                        {activity.date}
                                    </span>
                                    <span className="inline-flex items-center gap-2 rounded-full bg-brand-orange/10 px-4 py-2 text-sm font-bold text-brand-orange-dark">
                                        <Flag className="h-4 w-4" />
                                        {t('activities_show.badge')}
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
                                            {t('activities_show.copied')}
                                        </>
                                    ) : (
                                        <>
                                            <Copy className="h-4 w-4" />
                                            {t('activities_show.share')}
                                        </>
                                    )}
                                </button>
                            </div>

                            <article className="prose prose-slate mt-8 max-w-none">
                                <div className="text-base leading-relaxed whitespace-pre-wrap text-brand-gray first-letter:float-left first-letter:mr-3 first-letter:text-6xl first-letter:leading-none first-letter:font-black first-letter:text-brand-teal-dark lg:text-lg">
                                    {displayContent}
                                </div>
                            </article>

                            {/* CTA */}
                            <div className="dc-grid-pattern-navy relative mt-12 overflow-hidden rounded-3xl bg-gradient-to-br from-brand-navy to-brand-navy-dark p-8 text-white lg:p-10">
                                <div className="animate-drift absolute -top-16 -right-16 h-48 w-48 rounded-full bg-brand-orange/25 blur-3xl" />
                                <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                                    <div>
                                        <h3 className="text-xl font-black">{t('activities_show.cta_title')}</h3>
                                        <p className="mt-2 max-w-md text-sm leading-relaxed text-white/85">
                                            {t('activities_show.cta_desc')}
                                        </p>
                                    </div>
                                    <Link
                                        href="/activities"
                                        className="inline-flex shrink-0 items-center gap-2 rounded-full bg-brand-orange-dark px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-black/20 transition-all hover:-translate-y-0.5 hover:bg-brand-orange"
                                    >
                                        {t('activities_show.cta_button')}
                                        <ArrowRight className="h-4 w-4" />
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* Sidebar - other activities */}
                        {otherActivities.length > 0 && (
                            <aside className="lg:col-span-4">
                                <div className="rounded-3xl border border-slate-200/80 bg-white p-7 shadow-sm lg:sticky lg:top-24">
                                    <div className="flex items-center gap-2">
                                        <span className="h-6 w-1 rounded-full bg-gradient-to-b from-brand-orange to-brand-teal" />
                                        <h3 className="text-lg font-bold text-brand-navy">{t('activities_show.sidebar_title')}</h3>
                                    </div>
                                    <div className="mt-5 space-y-4">
                                        {otherActivities.map((item) => (
                                            <Link
                                                key={item.id}
                                                href={`/activities/${item.id}`}
                                                className="group flex gap-4 rounded-2xl p-2 transition-colors hover:bg-slate-50"
                                            >
                                                {item.image ? (
                                                    <img
                                                        src={item.image}
                                                        alt={item.title}
                                                        className="h-16 w-16 shrink-0 rounded-xl object-cover"
                                                    />
                                                ) : (
                                                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-teal/15 to-brand-orange/15">
                                                        <Flag className="h-5 w-5 text-brand-teal-dark/60" />
                                                    </div>
                                                )}
                                                <div>
                                                    <div className="text-xs font-semibold text-brand-gray">{item.date}</div>
                                                    <h4 className="mt-1 text-sm font-bold leading-snug text-brand-navy group-hover:text-brand-teal-dark">
                                                        {item.title}
                                                    </h4>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                    <Link
                                        href="/activities"
                                        className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-brand-teal-dark"
                                    >
                                        {t('activities_show.view_all')}
                                        <ArrowUpRight className="h-4 w-4" />
                                    </Link>
                                </div>
                            </aside>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
}
