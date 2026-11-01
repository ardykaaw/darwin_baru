import { Head, Link } from '@inertiajs/react';
import {
    ArrowRight,
    BarChart3,
    CheckCircle2,
    Expand,
    FileText,
    Handshake,
    Images,
    Layers,
    Lightbulb,
    Lock,
    Megaphone,
    MessageSquareHeart,
    Phone,
    Rocket,
    Send,
    Shield,
    ShieldCheck,
    Sparkles,
    TrendingUp,
    UserRoundCheck,
    Zap,
} from 'lucide-react';
import { useListTranslation } from '@/hooks/use-content-translation';
import { useTranslation } from '@/lib/i18n';
import { cn } from '@/lib/utils';
import type { ActivityItem, GalleryItem, NewsItem } from '@/types';

interface HomeProps {
    activities: ActivityItem[];
    latestNews: NewsItem[];
    latestGalleries: GalleryItem[];
}

export default function Home({ latestNews, latestGalleries }: HomeProps) {
    const { t } = useTranslation();
    const { getTitle: getNewsTitle } = useListTranslation(latestNews);

    const highlightNews = latestNews[0];
    const restNews = latestNews.slice(1);

    const PILLARS = [
        {
            icon: Zap,
            label: t('pillar.speed_label'),
            title: t('pillar.speed_title'),
            description: t('pillar.speed_desc'),
            color: 'bg-brand-teal/15 text-brand-teal-dark',
            ring: 'group-hover:ring-brand-teal/20',
        },
        {
            icon: ShieldCheck,
            label: t('pillar.clarity_label'),
            title: t('pillar.clarity_title'),
            description: t('pillar.clarity_desc'),
            color: 'bg-brand-orange/15 text-brand-orange-dark',
            ring: 'group-hover:ring-brand-orange/20',
        },
        {
            icon: MessageSquareHeart,
            label: t('pillar.collab_label'),
            title: t('pillar.collab_title'),
            description: t('pillar.collab_desc'),
            color: 'bg-brand-navy/10 text-brand-navy',
            ring: 'group-hover:ring-brand-navy/15',
        },
        {
            icon: TrendingUp,
            label: t('pillar.impact_label'),
            title: t('pillar.impact_title'),
            description: t('pillar.impact_desc'),
            color: 'bg-brand-teal/15 text-brand-teal-dark',
            ring: 'group-hover:ring-brand-teal/20',
        },
    ];

    const PROGRAMS = [
        {
            badge: t('programs.edu_badge'),
            badgeColor: 'bg-brand-teal/15 text-brand-teal-dark',
            title: t('programs.edu_title'),
            description: t('programs.edu_desc'),
            status: t('programs.edu_status'),
            icon: Lightbulb,
            points: [t('programs.edu_point1'), t('programs.edu_point2')],
        },
        {
            badge: t('programs.infra_badge'),
            badgeColor: 'bg-brand-orange/15 text-brand-orange-dark',
            title: t('programs.infra_title'),
            description: t('programs.infra_desc'),
            status: t('programs.infra_status'),
            icon: Rocket,
            points: [t('programs.infra_point1'), t('programs.infra_point2')],
        },
        {
            badge: t('programs.part_badge'),
            badgeColor: 'bg-brand-orange text-white',
            title: t('programs.part_title'),
            description: t('programs.part_desc'),
            status: t('programs.part_status'),
            icon: Megaphone,
            points: [t('programs.part_point1'), t('programs.part_point2')],
            isHighlighted: true,
        },
    ];

    const TICKER_ITEMS = [
        t('marquee.1'),
        t('marquee.2'),
        t('marquee.3'),
        t('marquee.4'),
        t('marquee.5'),
        t('marquee.6'),
        t('marquee.7'),
    ];

    const STATS = [
        { value: '4', label: t('hero.stat_pillars') },
        { value: '100%', label: t('hero.stat_transparency') },
        { value: '7', label: t('hero.stat_districts') },
    ];

    return (
        <>
            <Head title={t('hero.page_title')} />

            {/* ===== HERO ===== */}
            <section className="relative flex min-h-screen flex-col justify-between overflow-hidden">
                <div className="absolute inset-0">
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{
                            backgroundImage: "url('/images/hero-bg.png')",
                        }}
                    />
                    <div className="dc-grid-pattern-navy absolute inset-0" />
                    <div className="absolute inset-0 bg-gradient-to-r from-white/98 via-white/85 to-white/60 lg:bg-gradient-to-l lg:from-white/97 lg:via-white/60 lg:to-transparent" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(56,189,248,0.12),transparent_42%)]" />
                </div>
                <div className="animate-drift absolute -top-32 -right-32 h-96 w-96 rounded-full bg-brand-orange/15 blur-3xl" />
                <div className="animate-drift absolute -bottom-40 left-1/4 h-96 w-96 rounded-full bg-brand-teal/15 blur-3xl [animation-delay:4s]" />

                <div className="relative mx-auto flex w-full max-w-[1440px] flex-1 flex-col px-5 pt-24 pb-4 lg:flex-row lg:items-center lg:px-8 lg:pt-24 xl:pt-20">
                    {/* Bupati image — bottom left on desktop, top on mobile */}
                    <div className="pointer-events-none relative order-1 flex h-[300px] items-end justify-center lg:order-none lg:h-[calc(100vh-170px)] lg:max-h-[640px] lg:w-[52%] lg:justify-start">
                        <div className="absolute bottom-0 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-brand-teal/25 blur-3xl lg:left-16 lg:translate-x-0" />
                        <div className="absolute bottom-16 left-1/2 hidden h-40 w-40 -translate-x-1/2 rounded-full border-2 border-dashed border-brand-teal/25 lg:left-24 lg:block" />
                        <img
                            src="/images/bupati.png"
                            alt="La Ode Darwin & Rhika Purwaningsih"
                            className="animate-fade-up relative max-h-full max-w-full [mask-image:linear-gradient(to_bottom,black_88%,transparent_100%)] object-contain object-bottom drop-shadow-[0_24px_45px_rgba(0,0,0,0.28)]"
                        />

                        {/* Caption chip on desktop */}
                        <div className="animate-float pointer-events-auto absolute bottom-16 left-0 hidden items-center gap-3 rounded-2xl border border-white/70 bg-white/85 px-4 py-2.5 shadow-xl shadow-black/10 backdrop-blur-xl lg:flex">
                            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-teal to-brand-teal-dark text-white">
                                <Sparkles className="h-4.5 w-4.5" />
                            </span>
                            <div className="text-left">
                                <div className="text-xs font-black text-brand-navy">
                                    {t('hero.caption_name')}
                                </div>
                                <div className="text-[11px] font-medium text-brand-gray">
                                    {t('hero.caption_role')}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="relative z-10 order-2 mt-4 flex w-full flex-col items-center text-center lg:order-none lg:mt-0 lg:w-5/12 lg:items-end lg:pr-4 lg:text-right">
                        <div className="animate-fade-up inline-flex items-center gap-2 rounded-full border border-brand-teal/15 bg-white/85 px-3.5 py-1 text-xs font-semibold text-brand-teal-dark shadow-sm backdrop-blur-md">
                            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand-orange" />
                            {t('hero.badge')}
                        </div>

                        <h1 className="animate-fade-up dc-text-balance mt-3 text-3xl font-black tracking-tight uppercase text-brand-navy delay-100 sm:text-4xl lg:text-[2.6rem] xl:text-[3.15rem] leading-[1.1]">
                            {t('hero.title_line1')}
                            <br />
                            <span className="bg-gradient-to-r from-brand-teal-dark via-brand-teal to-brand-orange-dark bg-clip-text text-transparent">
                                {t('hero.title_line2')}
                            </span>
                            <br />
                            {t('hero.title_line3')}
                        </h1>

                        <p className="animate-fade-up mt-3.5 max-w-lg text-sm font-medium leading-relaxed text-brand-gray delay-200 lg:text-[15px]">
                            {t('hero.desc_prefix')}{' '}
                            <strong className="text-brand-navy">
                                La Ode Darwin
                            </strong>{' '}
                            {t('hero.desc_and')}{' '}
                            <strong className="text-brand-navy">
                                Rhika Purwaningsih, SH.
                            </strong>{' '}
                            {t('hero.desc_suffix')}
                        </p>

                        <div className="animate-fade-up mt-5 flex w-full flex-col gap-3.5 delay-300 sm:w-auto sm:flex-row lg:justify-start">
                            <Link
                                href="/lapor"
                                className="group relative inline-flex w-full items-center justify-center gap-2.5 overflow-hidden rounded-full bg-gradient-to-r from-brand-orange via-amber-500 to-brand-orange-dark px-7 py-3.5 text-sm font-black tracking-wide text-white shadow-[0_10px_30px_rgba(249,115,22,0.4)] ring-2 ring-brand-orange/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(249,115,22,0.6)] hover:ring-brand-orange sm:w-auto"
                            >
                                <span className="relative flex h-2.5 w-2.5">
                                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
                                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-white" />
                                </span>
                                <span>{t('hero.cta_aspirasi')}</span>
                                <span className="rounded-full bg-white/25 px-2 py-0.5 text-[10px] font-black uppercase tracking-wider text-white">
                                    Unggulan
                                </span>
                                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </Link>
                            <Link
                                href="/activities"
                                className="group inline-flex w-full items-center justify-center gap-2 rounded-full border border-slate-200/90 bg-white/90 px-6 py-3.5 text-sm font-bold text-brand-navy shadow-sm backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:border-brand-teal/50 hover:bg-white hover:text-brand-teal-dark sm:w-auto"
                            >
                                {t('hero.cta_kiprah')}
                                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </Link>
                        </div>

                        {/* Stats */}
                        <div className="animate-fade-up mt-6 grid w-full grid-cols-3 gap-4 border-t border-brand-navy/10 pt-4 delay-500">
                            {STATS.map((stat) => (
                                <div
                                    key={stat.label}
                                    className="text-center lg:text-right"
                                >
                                    <div className="text-xl font-black text-brand-navy lg:text-2xl">
                                        {stat.value}
                                    </div>
                                    <div className="mt-0.5 text-[11px] font-semibold tracking-wide uppercase text-brand-gray lg:text-xs">
                                        {stat.label}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Marquee brand strip docked at bottom of the hero viewport */}
                <div className="dc-marquee-mask dc-marquee-paused relative z-20 w-full overflow-hidden border-y border-white/10 bg-gradient-to-r from-brand-navy via-brand-navy-dark to-brand-navy py-3">
                    <div className="animate-marquee dc-marquee-track flex w-max items-center gap-8 whitespace-nowrap">
                        {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
                            <span
                                key={`${item}-${i}`}
                                className="inline-flex items-center gap-8 text-xs font-bold tracking-[0.2em] uppercase text-white/90 md:text-sm"
                            >
                                {item}
                                <span className="text-brand-orange-light">✦</span>
                            </span>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== FONDASI KINERJA ===== */}
            <section className="relative py-16 lg:py-24">
                <div className="mx-auto max-w-[1440px] px-5 lg:px-8">
                    <div className="grid items-center gap-12 lg:grid-cols-2">
                        <div>
                            <span className="inline-flex items-center gap-2 rounded-full bg-brand-teal/15 px-4 py-1.5 text-xs font-bold tracking-[0.2em] text-brand-teal-dark uppercase">
                                <Sparkles className="h-3.5 w-3.5" />
                                {t('fondasi.badge')}
                            </span>
                            <h2 className="dc-text-balance mt-6 text-3xl leading-tight font-black tracking-tight text-brand-navy lg:text-5xl">
                                {t('fondasi.title_prefix')}{' '}
                                <span className="bg-gradient-to-r from-brand-teal to-brand-orange bg-clip-text text-transparent">
                                    {t('fondasi.title_highlight')}
                                </span>{' '}
                                {t('fondasi.title_suffix')}
                            </h2>
                            <p className="mt-6 text-base leading-relaxed text-brand-gray lg:text-lg">
                                {t('fondasi.desc')}
                            </p>

                            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
                                {[
                                    [t('fondasi.checklist.digital'), t('fondasi.checklist.digital_desc')],
                                    [t('fondasi.checklist.data'), t('fondasi.checklist.data_desc')],
                                    [t('fondasi.checklist.participation'), t('fondasi.checklist.participation_desc')],
                                    [t('fondasi.checklist.innovation'), t('fondasi.checklist.innovation_desc')],
                                ].map(([label, value]) => (
                                    <li
                                        key={label}
                                        className="flex items-start gap-3"
                                    >
                                        <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-teal/15 text-brand-teal-dark">
                                            <CheckCircle2 className="h-4 w-4" />
                                        </span>
                                        <div>
                                            <div className="font-bold text-brand-navy">
                                                {label}
                                            </div>
                                            <div className="text-sm text-brand-gray">
                                                {value}
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Feature card */}
                        <div className="relative">
                            <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-brand-teal/10 to-brand-orange/10 blur-2xl" />
                            <div className="dc-grid-pattern-navy relative rounded-[2rem] border border-brand-teal/15 bg-white p-8 shadow-[0_30px_80px_rgba(15,23,42,0.12)] lg:p-10">
                                <div className="flex items-center gap-4">
                                    <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-teal to-brand-teal-dark text-white shadow-lg shadow-brand-teal/30">
                                        <BarChart3 className="h-7 w-7" />
                                    </span>
                                    <div>
                                        <div className="text-xs font-semibold tracking-wide text-brand-gray uppercase">
                                            {t('fondasi.card_overline')}
                                        </div>
                                        <div className="text-2xl font-bold text-brand-navy">
                                            {t('fondasi.card_title')}
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-8 grid grid-cols-2 gap-5">
                                    {[
                                        {
                                            icon: Zap,
                                            label: t('fondasi.card.digital'),
                                            value: t('fondasi.card.digital_val'),
                                        },
                                        {
                                            icon: ShieldCheck,
                                            label: t('fondasi.card.data'),
                                            value: t('fondasi.card.data_val'),
                                        },
                                        {
                                            icon: MessageSquareHeart,
                                            label: t('fondasi.card.participation'),
                                            value: t('fondasi.card.participation_val'),
                                        },
                                        {
                                            icon: Rocket,
                                            label: t('fondasi.card.innovation'),
                                            value: t('fondasi.card.innovation_val'),
                                        },
                                    ].map(({ icon: Icon, label, value }) => (
                                        <div
                                            key={label}
                                            className="group rounded-2xl bg-slate-50 p-5 transition-colors hover:bg-slate-100"
                                        >
                                            <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white text-brand-teal shadow-sm">
                                                <Icon className="h-5 w-5" />
                                            </span>
                                            <div className="mt-3 text-xs font-bold tracking-wider text-brand-gray uppercase">
                                                {label}
                                            </div>
                                            <div className="mt-0.5 font-bold text-brand-navy">
                                                {value}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Pillars */}
                    <div className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                        {PILLARS.map((pillar) => (
                            <div
                                key={pillar.title}
                                className={`group relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-7 shadow-sm ring-1 ring-transparent transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_30px_60px_rgba(15,23,42,0.14)] ${pillar.ring}`}
                            >
                                <div
                                    className={`absolute -top-6 -right-6 h-24 w-24 rounded-full blur-2xl ${pillar.color}`}
                                />
                                <div
                                    className={`relative mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl ${pillar.color}`}
                                >
                                    <pillar.icon className="h-6 w-6" />
                                </div>
                                <div className="relative text-xs font-semibold tracking-wider text-brand-gray uppercase">
                                    {pillar.label}
                                </div>
                                <h3 className="relative mt-1.5 text-lg font-bold text-brand-navy">
                                    {pillar.title}
                                </h3>
                                <p className="relative mt-3 text-sm leading-relaxed text-brand-gray">
                                    {pillar.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== LAPOR DARWIN — FITUR UNGGULAN SPOTLIGHT ===== */}
            <section className="relative py-12 lg:py-16">
                <div className="mx-auto max-w-[1440px] px-5 lg:px-8">
                    <div className="dc-grid-pattern relative overflow-hidden rounded-[2.5rem] border-2 border-brand-orange/40 bg-gradient-to-br from-brand-navy via-[#0c1f33] to-brand-navy-dark p-8 md:p-12 lg:p-16 text-white shadow-[0_30px_90px_rgba(15,23,42,0.3)]">
                        {/* Shimmering Ambient Glow Orbs */}
                        <div className="animate-drift absolute -top-24 -right-24 h-96 w-96 rounded-full bg-brand-orange/25 blur-3xl" />
                        <div className="animate-drift absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-brand-teal/25 blur-3xl [animation-delay:4s]" />
                        <div className="pointer-events-none absolute top-1/2 left-1/2 h-[450px] w-[450px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-500/10 blur-[120px]" />

                        <div className="relative grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
                            {/* Left Column: Headline, Description & Badges */}
                            <div className="lg:col-span-7">
                                <div className="inline-flex items-center gap-2 rounded-full border border-brand-orange/50 bg-brand-orange/15 px-4 py-1.5 text-xs font-black tracking-[0.2em] text-brand-orange-light uppercase backdrop-blur-md">
                                    <Sparkles className="h-3.5 w-3.5 animate-pulse text-brand-orange-light" />
                                    {t('lapor_spotlight.badge')}
                                </div>

                                <h2 className="dc-text-balance mt-6 text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-[2.75rem] xl:text-[3.15rem] leading-[1.12]">
                                    {t('lapor_spotlight.title_prefix')}{' '}
                                    <span className="bg-gradient-to-r from-amber-300 via-brand-orange-light to-brand-orange bg-clip-text text-transparent">
                                        {t('lapor_spotlight.title_highlight')}
                                    </span>{' '}
                                    {t('lapor_spotlight.title_suffix')}
                                </h2>

                                <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/85 lg:text-lg">
                                    {t('lapor_spotlight.desc')}
                                </p>

                                {/* 3 Feature Value Props */}
                                <div className="mt-8 grid gap-4 sm:grid-cols-3">
                                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4.5 backdrop-blur-md transition-colors hover:border-brand-orange/40 hover:bg-white/10">
                                        <div className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-brand-orange/20 text-brand-orange-light">
                                            <Shield className="h-4.5 w-4.5" />
                                        </div>
                                        <div className="mt-3 text-sm font-bold text-white">
                                            {t('lapor_spotlight.benefit_anon_title')}
                                        </div>
                                        <div className="mt-1 text-xs leading-relaxed text-white/70">
                                            {t('lapor_spotlight.benefit_anon_desc')}
                                        </div>
                                    </div>

                                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4.5 backdrop-blur-md transition-colors hover:border-brand-teal/40 hover:bg-white/10">
                                        <div className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-brand-teal/20 text-brand-teal">
                                            <Zap className="h-4.5 w-4.5" />
                                        </div>
                                        <div className="mt-3 text-sm font-bold text-white">
                                            {t('lapor_spotlight.benefit_speed_title')}
                                        </div>
                                        <div className="mt-1 text-xs leading-relaxed text-white/70">
                                            {t('lapor_spotlight.benefit_speed_desc')}
                                        </div>
                                    </div>

                                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4.5 backdrop-blur-md transition-colors hover:border-amber-400/40 hover:bg-white/10">
                                        <div className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-amber-400/20 text-amber-300">
                                            <Layers className="h-4.5 w-4.5" />
                                        </div>
                                        <div className="mt-3 text-sm font-bold text-white">
                                            {t('lapor_spotlight.benefit_sector_title')}
                                        </div>
                                        <div className="mt-1 text-xs leading-relaxed text-white/70">
                                            {t('lapor_spotlight.benefit_sector_desc')}
                                        </div>
                                    </div>
                                </div>

                                {/* Call to action buttons */}
                                <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
                                    <Link
                                        href="/lapor"
                                        className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-brand-orange via-amber-500 to-brand-orange-dark px-8 py-4 text-base font-black text-white shadow-xl shadow-brand-orange-dark/40 ring-2 ring-brand-orange/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-brand-orange-dark/60 hover:ring-brand-orange"
                                    >
                                        <Megaphone className="h-5 w-5 transition-transform group-hover:scale-110" />
                                        <span>{t('lapor_spotlight.cta_button')}</span>
                                        <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                                    </Link>

                                    <a
                                        href="tel:08607333779"
                                        className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-4 text-sm font-bold text-white backdrop-blur-md transition-all hover:border-white/40 hover:bg-white/15"
                                    >
                                        <Phone className="h-4 w-4 text-brand-orange-light" />
                                        <span>Hotline: 0860 733 3779</span>
                                    </a>
                                </div>
                            </div>

                            {/* Right Column: Interactive Quick Simulator Card */}
                            <div className="lg:col-span-5">
                                <div className="relative rounded-3xl border border-white/15 bg-white/10 p-6 md:p-8 backdrop-blur-xl shadow-2xl">
                                    {/* Live beacon status bar */}
                                    <div className="flex items-center justify-between border-b border-white/10 pb-4">
                                        <div className="flex items-center gap-2">
                                            <span className="relative flex h-2.5 w-2.5">
                                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                                                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
                                            </span>
                                            <span className="text-xs font-semibold text-emerald-300">
                                                {t('lapor_spotlight.active_status')}
                                            </span>
                                        </div>
                                        <span className="rounded-full bg-brand-orange/20 px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider text-brand-orange-light">
                                            Resmi
                                        </span>
                                    </div>

                                    <div className="mt-5">
                                        <h3 className="text-lg font-black text-white">
                                            {t('lapor_spotlight.preview_title')}
                                        </h3>
                                        <p className="mt-1 text-xs text-white/70">
                                            {t('lapor_spotlight.preview_subtitle')}
                                        </p>
                                    </div>

                                    {/* Steps list */}
                                    <div className="mt-5 space-y-3">
                                        {[
                                            { icon: FileText, text: t('lapor_spotlight.preview_step1'), color: 'text-amber-400 bg-amber-400/15' },
                                            { icon: Layers, text: t('lapor_spotlight.preview_step2'), color: 'text-brand-teal bg-brand-teal/15' },
                                            { icon: Lock, text: t('lapor_spotlight.preview_step3'), color: 'text-emerald-400 bg-emerald-400/15' },
                                            { icon: CheckCircle2, text: t('lapor_spotlight.preview_step4'), color: 'text-brand-orange-light bg-brand-orange/15' },
                                        ].map((step, idx) => (
                                            <div
                                                key={idx}
                                                className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/5 p-3 text-xs text-white/90"
                                            >
                                                <span className={`inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${step.color}`}>
                                                    <step.icon className="h-3.5 w-3.5" />
                                                </span>
                                                <span className="font-medium leading-snug">{step.text}</span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Clickable Quick Action to Form */}
                                    <Link
                                        href="/lapor"
                                        className="group mt-6 flex w-full items-center justify-between rounded-2xl border border-brand-orange/40 bg-gradient-to-r from-brand-orange/20 to-amber-500/20 p-4 text-xs font-bold text-white transition-all hover:border-brand-orange hover:bg-brand-orange/30"
                                    >
                                        <div className="flex items-center gap-2">
                                            <Send className="h-4 w-4 text-brand-orange-light transition-transform group-hover:scale-110" />
                                            <span>Buka Formulir Pengaduan Online</span>
                                        </div>
                                        <ArrowRight className="h-4 w-4 text-brand-orange-light transition-transform group-hover:translate-x-1" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== BERITA TERBARU ===== */}
            {latestNews.length > 0 && (
                <section className="bg-white py-16 lg:py-24">
                    <div className="mx-auto max-w-[1440px] px-5 lg:px-8">
                        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                            <div>
                                <span className="inline-flex items-center gap-2 rounded-full bg-brand-teal/15 px-4 py-1.5 text-xs font-bold tracking-[0.2em] text-brand-teal-dark uppercase">
                                    <Megaphone className="h-3.5 w-3.5" />
                                    {t('news_section.badge')}
                                </span>
                                <h2 className="dc-text-balance mt-6 text-3xl font-black tracking-tight text-brand-navy lg:text-4xl">
                                    {t('news_section.title')}
                                </h2>
                            </div>
                            <Link
                                href="/news"
                                className="group inline-flex items-center gap-2 rounded-full border border-brand-teal-dark px-6 py-3 text-sm font-bold text-brand-teal-dark transition-colors hover:bg-brand-teal hover:text-white"
                            >
                                {t('news_section.view_all')}
                                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </Link>
                        </div>

                        <div className="grid gap-6 lg:grid-cols-12">
                            {highlightNews && (
                                <Link
                                    href={`/news/${highlightNews.slug}`}
                                    className="group relative overflow-hidden rounded-[1.75rem] shadow-lg lg:col-span-7"
                                >
                                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_60%)]" />
                                    {highlightNews.image ? (
                                        <img
                                            src={highlightNews.image}
                                            alt={highlightNews.title}
                                            className="h-[380px] w-full object-cover transition-transform duration-700 group-hover:scale-105 lg:h-full lg:min-h-[480px]"
                                        />
                                    ) : (
                                        <div className="h-[380px] w-full bg-slate-100 lg:h-full lg:min-h-[480px]" />
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/25 to-transparent" />
                                    <div className="absolute inset-x-0 bottom-0 p-7 text-white lg:p-9">
                                        <span className="mb-3 inline-block rounded-full bg-white px-3 py-1 text-xs font-bold text-slate-900">
                                            {t('news_section.headline_badge')}
                                        </span>
                                        <h3 className="dc-text-balance max-w-2xl text-2xl leading-snug font-bold lg:text-3xl">
                                            {getNewsTitle(highlightNews)}
                                        </h3>
                                        <div className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-brand-orange-light">
                                            {t('news_section.read_now')}
                                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                        </div>
                                    </div>
                                </Link>
                            )}

                            <div className="flex flex-col gap-6 lg:col-span-5">
                                {restNews.map((item) => (
                                    <Link
                                        key={item.id}
                                        href={`/news/${item.slug}`}
                                        className="group flex flex-1 items-center gap-5 rounded-3xl border border-slate-200/80 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-teal/30 hover:shadow-lg"
                                    >
                                        {item.image ? (
                                            <img
                                                src={item.image}
                                                alt={getNewsTitle(item)}
                                                className="h-28 w-28 shrink-0 rounded-2xl object-cover lg:h-32 lg:w-36"
                                            />
                                        ) : (
                                            <div className="h-28 w-28 shrink-0 rounded-2xl bg-slate-100 lg:h-32 lg:w-36" />
                                        )}
                                        <div>
                                            <div className="text-xs font-semibold tracking-wide text-brand-gray uppercase">
                                                {item.created_at}
                                            </div>
                                            <h3 className="mt-1.5 line-clamp-2 leading-snug font-bold text-brand-navy group-hover:text-brand-teal-dark">
                                                {getNewsTitle(item)}
                                            </h3>
                                        </div>
                                    </Link>
                                ))}
                                {restNews.length === 0 && (
                                    <div className="flex flex-1 items-center justify-center rounded-3xl border border-dashed border-slate-300 text-sm text-brand-gray">
                                        {t('news_section.coming_soon')}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* ===== GALERI TERBARU ===== */}
            {latestGalleries.length > 0 && (
                <section className="py-16 lg:py-24">
                    <div className="mx-auto max-w-[1440px] px-5 lg:px-8">
                        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                            <div>
                                <span className="inline-flex items-center gap-2 rounded-full bg-brand-orange/15 px-4 py-1.5 text-xs font-bold tracking-[0.2em] text-brand-orange-dark uppercase">
                                    <Images className="h-3.5 w-3.5" />
                                    {t('gallery_section.badge')}
                                </span>
                                <h2 className="dc-text-balance mt-6 text-3xl font-black tracking-tight text-brand-navy lg:text-4xl">
                                    {t('gallery_section.title')}
                                </h2>
                            </div>
                            <Link
                                href="/galleries"
                                className="group inline-flex items-center gap-2 rounded-full border border-brand-orange-dark px-6 py-3 text-sm font-bold text-brand-orange-dark transition-colors hover:bg-brand-orange hover:text-white"
                            >
                                {t('gallery_section.view_all')}
                                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </Link>
                        </div>

                        <div className="grid gap-5 md:grid-cols-3">
                            {latestGalleries.map((gallery) => (
                                <Link
                                    key={gallery.id}
                                    href="/galleries"
                                    className="group relative overflow-hidden rounded-3xl shadow-sm"
                                >
                                    <img
                                        src={gallery.image}
                                        alt={gallery.title}
                                        className="h-72 w-full object-cover transition-transform duration-700 group-hover:scale-105 lg:h-80"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                                    <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5 text-white">
                                        <div>
                                            <h3 className="leading-snug font-bold">
                                                {gallery.title}
                                            </h3>
                                            <div className="mt-1 inline-flex items-center gap-1.5 text-xs font-semibold text-white/80">
                                                <Expand className="h-3.5 w-3.5" />
                                                {t('gallery_section.view_gallery')}
                                            </div>
                                        </div>
                                        <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/15 backdrop-blur transition-all group-hover:bg-brand-orange">
                                            <ArrowRight className="h-4.5 w-4.5" />
                                        </span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ===== PROGRAM UNGGULAN ===== */}
            <section className="dc-grid-pattern-navy relative overflow-hidden bg-gradient-to-b from-white to-[#f0faf9] py-16 lg:py-24">
                <div className="relative mx-auto max-w-[1440px] px-5 lg:px-8">
                    <div className="mx-auto mb-12 max-w-2xl text-center">
                        <span className="inline-flex items-center gap-2 rounded-full bg-brand-teal/15 px-4 py-1.5 text-xs font-bold tracking-[0.2em] text-brand-teal-dark uppercase">
                            <Rocket className="h-3.5 w-3.5" />
                            {t('programs.badge')}
                        </span>
                        <h2 className="dc-text-balance mt-6 text-3xl font-black tracking-tight text-brand-navy lg:text-4xl">
                            {t('programs.title')}
                        </h2>
                    </div>

                    <div className="grid gap-6 md:grid-cols-3">
                        {PROGRAMS.map((program) => (
                            <div
                                key={program.title}
                                className={cn(
                                    'group flex h-full flex-col rounded-[1.75rem] bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2',
                                    (program as any).isHighlighted
                                        ? 'relative overflow-hidden border-2 border-brand-orange shadow-[0_20px_50px_rgba(249,115,22,0.18)] ring-4 ring-brand-orange/15 hover:shadow-[0_30px_70px_rgba(249,115,22,0.3)]'
                                        : 'border border-slate-200/80 hover:shadow-[0_30px_60px_rgba(15,23,42,0.14)]',
                                )}
                            >
                                {(program as any).isHighlighted && (
                                    <div className="absolute top-0 right-0 rounded-bl-2xl bg-gradient-to-l from-brand-orange to-amber-500 px-4 py-1 text-[11px] font-black uppercase tracking-wider text-white shadow-sm">
                                        ★ {t('programs.part_badge')}
                                    </div>
                                )}
                                <div className="mb-6 flex items-start justify-between">
                                    <span
                                        className={`rounded-full px-3.5 py-1.5 text-xs font-bold ${program.badgeColor}`}
                                    >
                                        {program.badge}
                                    </span>
                                    <span
                                        className={cn(
                                            'inline-flex h-12 w-12 items-center justify-center rounded-2xl transition-colors',
                                            (program as any).isHighlighted
                                                ? 'bg-brand-orange text-white shadow-md shadow-brand-orange/30'
                                                : 'bg-slate-100 text-brand-navy group-hover:bg-brand-teal group-hover:text-white',
                                        )}
                                    >
                                        <program.icon className="h-6 w-6" />
                                    </span>
                                </div>
                                <h3 className="text-xl font-bold text-brand-navy">
                                    {program.title}
                                </h3>
                                <p className="mt-3 text-sm leading-relaxed text-brand-gray">
                                    {program.description}
                                </p>
                                <ul className="mt-5 space-y-2">
                                    {program.points.map((point) => (
                                        <li
                                            key={point}
                                            className="flex items-center gap-2 text-sm font-medium text-brand-gray"
                                        >
                                            <CheckCircle2
                                                className={cn(
                                                    'h-4 w-4 shrink-0',
                                                    (program as any).isHighlighted
                                                        ? 'text-brand-orange'
                                                        : 'text-brand-teal-dark',
                                                )}
                                            />
                                            {point}
                                        </li>
                                    ))}
                                </ul>
                                <div className="mt-auto flex items-center justify-between pt-6">
                                    <div className="inline-flex items-center gap-2 text-xs font-bold tracking-wide text-brand-teal-dark uppercase">
                                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand-teal" />
                                        {t('programs.status_prefix')} {program.status}
                                    </div>
                                    {(program as any).isHighlighted && (
                                        <Link
                                            href="/lapor"
                                            className="inline-flex items-center gap-1.5 text-xs font-black text-brand-orange-dark transition-colors hover:text-brand-orange"
                                        >
                                            <span>Buka Form</span>
                                            <ArrowRight className="h-3.5 w-3.5" />
                                        </Link>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== KOMITMEN / CTA ===== */}
            <section className="relative py-16 lg:py-24">
                <div className="mx-auto max-w-[1440px] px-5 lg:px-8">
                    <div className="dc-grid-pattern relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-brand-navy via-brand-navy to-brand-navy-dark px-8 py-16 text-center shadow-2xl lg:px-16 lg:py-20">
                        <div className="animate-drift absolute -top-20 -left-20 h-72 w-72 rounded-full bg-brand-teal/25 blur-3xl" />
                        <div className="animate-drift absolute -right-16 -bottom-24 h-72 w-72 rounded-full bg-brand-orange/25 blur-3xl [animation-delay:5s]" />
                        <div className="animate-drift absolute top-10 -right-20 h-24 w-24 rounded-full bg-brand-teal/15 blur-2xl [animation-delay:8s]" />
                        <div className="relative mx-auto max-w-2xl">
                            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-sm font-semibold text-white backdrop-blur-md">
                                <UserRoundCheck className="h-4 w-4 text-brand-orange-light" />
                                {t('cta.badge')}
                            </span>
                            <h2 className="dc-text-balance mt-6 text-3xl leading-tight font-black text-white lg:text-[2.75rem]">
                                {t('cta.title')}
                            </h2>
                            <p className="mt-5 text-base leading-relaxed text-white/90 lg:text-lg">
                                {t('cta.desc')}
                            </p>
                            <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">
                                <Link
                                    href="/lapor"
                                    className="group inline-flex items-center justify-center gap-2 rounded-full bg-brand-orange-dark px-8 py-4 text-base font-bold text-white shadow-xl shadow-black/20 transition-all hover:-translate-y-1 hover:bg-brand-orange"
                                >
                                    {t('cta.submit')}
                                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                                </Link>
                                <Link
                                    href="/activities"
                                    className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/30 px-8 py-4 text-base font-bold text-white transition-all hover:-translate-y-1 hover:border-white/60 hover:bg-white/10"
                                >
                                    {t('cta.browse')}
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
