import { Head, Link } from '@inertiajs/react';
import { ArrowRight, ArrowUpRight, Calendar, Flag } from 'lucide-react';
import Pagination from '@/components/pagination';
import { PublicPageHero } from '@/components/public-page-hero';
import { useFlashMessages } from '@/hooks/use-flash-messages';
import { useTranslation } from '@/lib/i18n';
import type { Paginated, ActivityItem } from '@/types';

interface ActivitiesIndexProps {
    activities: Paginated<ActivityItem>;
}

export default function ActivitiesIndex({ activities }: ActivitiesIndexProps) {
    useFlashMessages();
    const { t } = useTranslation();

    return (
        <>
            <Head title={t('activities_page.title')} />

            <PublicPageHero
                badge={t('activities_page.hero_badge')}
                title={t('activities_page.hero_title')}
                description={t('activities_page.hero_desc')}
            />

            {/* Activities grid */}
            <section className="py-16 lg:py-20">
                <div className="mx-auto max-w-[1400px] px-5 lg:px-8">
                    {activities.data.length === 0 ? (
                        <div className="rounded-3xl border border-dashed border-slate-300 bg-white py-20 text-center">
                            <span className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-teal/10 text-brand-teal-dark">
                                <Flag className="h-7 w-7" />
                            </span>
                            <p className="mt-5 text-lg font-semibold text-brand-navy">{t('activities_page.empty_title')}</p>
                            <p className="mt-2 text-sm text-brand-gray">{t('activities_page.empty_desc')}</p>
                        </div>
                    ) : (
                        <>
                            <div className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                                <div className="flex items-center gap-3">
                                    <span className="h-8 w-1 rounded-full bg-gradient-to-b from-brand-orange to-brand-teal" />
                                    <p className="text-sm font-semibold tracking-wide text-brand-gray uppercase">
                                        {t('activities_page.spotlight')}
                                    </p>
                                </div>
                                <p className="text-sm text-brand-gray">
                                    <span className="font-black text-brand-navy">{activities.total}</span> {t('activities_page.count_suffix')}
                                </p>
                            </div>

                            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                                {activities.data.map((activity, i) => (
                                    <Link
                                        key={activity.id}
                                        href={`/activities/${activity.id}`}
                                        className="group relative flex flex-col overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_24px_50px_rgba(15,23,42,0.14)]"
                                    >
                                        <div className="absolute inset-x-0 top-0 z-10 h-1 bg-gradient-to-r from-brand-teal via-brand-orange to-brand-teal opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                                        <div className="relative h-56 overflow-hidden">
                                            {activity.image ? (
                                                <img
                                                    src={activity.image}
                                                    alt={activity.title}
                                                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                                />
                                            ) : (
                                                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-brand-teal/15 to-brand-orange/15">
                                                    <Calendar className="h-12 w-12 text-brand-teal-dark/60" />
                                                </div>
                                            )}
                                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-slate-950/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                                            <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3.5 py-1.5 text-xs font-bold text-brand-navy shadow-md backdrop-blur">
                                                <Calendar className="h-3.5 w-3.5 text-brand-orange-dark" />
                                                {activity.date}
                                            </span>

                                            <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-all duration-300 group-hover:opacity-100">
                                                <span className="inline-flex items-center gap-2 rounded-full bg-white/20 px-5 py-2.5 text-sm font-bold text-white shadow-lg backdrop-blur-md">
                                                    {t('activities_page.read_more')}
                                                    <ArrowRight className="h-4 w-4" />
                                                </span>
                                            </div>

                                            <span className="absolute right-4 bottom-3 text-5xl font-black text-white/15 transition-colors duration-300 group-hover:text-brand-orange-light/40">
                                                {String(i + 1).padStart(2, '0')}
                                            </span>
                                        </div>

                                        <div className="flex flex-1 flex-col p-6">
                                            <h2 className="text-lg leading-snug font-bold text-brand-navy transition-colors group-hover:text-brand-teal-dark">
                                                {activity.title}
                                            </h2>
                                            <p className="mt-3 flex-1 text-sm leading-relaxed text-brand-gray">
                                                {activity.content.length > 140
                                                    ? `${activity.content.slice(0, 140)}...`
                                                    : activity.content}
                                            </p>
                                            <div className="mt-5 inline-flex items-center gap-2 border-t border-slate-100 pt-4 text-sm font-bold text-brand-teal-dark">
                                                {t('activities_page.read_more')}
                                                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-brand-teal/10 transition-all group-hover:bg-brand-teal group-hover:text-white">
                                                    <ArrowUpRight className="h-4 w-4" />
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </>
                    )}

                    <Pagination pagination={activities} className="mt-12" />
                </div>
            </section>
        </>
    );
}
