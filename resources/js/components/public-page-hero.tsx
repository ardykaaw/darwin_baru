import { Link } from '@inertiajs/react';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { useTranslation } from '@/lib/i18n';

interface PublicPageHeroProps {
    badge: string;
    title: string;
    description?: string;
    backHref?: string;
    backLabel?: string;
}

export function PublicPageHero({ badge, title, description, backHref, backLabel }: PublicPageHeroProps) {
    const { t } = useTranslation();

    return (
        <section className="dc-grid-pattern relative overflow-hidden bg-gradient-to-br from-brand-navy via-brand-navy to-brand-navy-dark pt-32 text-white lg:pt-36">
            <div className="animate-drift absolute -right-24 -top-24 h-80 w-80 rounded-full bg-brand-orange/20 blur-3xl" />
            <div className="animate-drift absolute -bottom-24 left-1/4 h-64 w-64 rounded-full bg-brand-teal/25 blur-3xl [animation-delay:4s]" />
            <div className="animate-float absolute top-32 right-40 hidden h-28 w-28 rounded-full border-2 border-dashed border-brand-teal/25 lg:block" />
            <div className="animate-float absolute bottom-16 right-80 hidden h-14 w-14 rounded-full border-2 border-dashed border-brand-orange/30 lg:block [animation-delay:3s]" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-brand-navy to-transparent" />

            <div className="relative mx-auto max-w-[1400px] px-5 pb-16 lg:px-8 lg:pb-24">
                <div className="mx-auto max-w-3xl">
                    {backHref && (
                        <Link
                            href={backHref}
                            className="animate-fade-up inline-flex items-center gap-2 text-sm font-semibold text-white/90 transition-colors hover:text-white"
                        >
                            <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-white/25 bg-white/10 backdrop-blur transition-colors hover:bg-white/20">
                                <ArrowLeft className="h-3.5 w-3.5" />
                            </span>
                            {backLabel ?? t('hero_component.back')}
                        </Link>
                    )}
                    <span className="animate-fade-up mt-8 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/15 px-4 py-1.5 text-sm font-semibold backdrop-blur-md">
                        <Sparkles className="h-3.5 w-3.5 text-brand-orange-light" />
                        {badge}
                    </span>
                    <h1 className="animate-fade-up delay-100 dc-text-balance mt-5 text-4xl leading-[1.12] font-black tracking-tight md:text-5xl lg:text-[3.4rem]">
                        {title}
                    </h1>
                    <div className="animate-fade-up delay-150 mt-6 h-1.5 w-24 rounded-full bg-gradient-to-r from-brand-orange via-brand-orange-light to-brand-teal" />
                    {description && (
                        <p className="animate-fade-up delay-200 mt-5 max-w-2xl text-base leading-relaxed text-white/90 md:text-lg">
                            {description}
                        </p>
                    )}
                </div>
            </div>

            <div
                className="pointer-events-none absolute top-1/2 right-8 hidden -translate-y-1/2 text-[10px] font-bold tracking-[0.45em] text-white/20 uppercase [writing-mode:vertical-rl] lg:block"
            >
                {t('hero_component.district')}
            </div>
        </section>
    );
}
