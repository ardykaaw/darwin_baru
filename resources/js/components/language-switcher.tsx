import { Globe } from 'lucide-react';
import { useTranslation } from '@/lib/i18n';
import { cn } from '@/lib/utils';

interface LanguageSwitcherProps {
    className?: string;
    variant?: 'nav' | 'mobile';
}

export function LanguageSwitcher({ className, variant = 'nav' }: LanguageSwitcherProps) {
    const { locale, setLocale, t } = useTranslation();

    function toggle() {
        setLocale(locale === 'id' ? 'en' : 'id');
    }

    if (variant === 'mobile') {
        return (
            <button
                type="button"
                onClick={toggle}
                className={cn(
                    'flex w-full items-center gap-3 rounded-xl px-4 py-3 text-[15px] font-semibold text-brand-navy transition-colors hover:bg-slate-100',
                    className,
                )}
                aria-label={t('lang.label')}
            >
                <Globe className="h-4.5 w-4.5 text-brand-teal-dark" />
                <span className="flex-1 text-left">
                    {locale === 'id' ? 'English' : 'Bahasa Indonesia'}
                </span>
                <span className="rounded-md bg-brand-teal/10 px-2 py-0.5 text-xs font-bold text-brand-teal-dark">
                    {t('lang.current')}
                </span>
            </button>
        );
    }

    return (
        <button
            type="button"
            onClick={toggle}
            className={cn(
                'group relative inline-flex items-center gap-1.5 rounded-full border border-slate-200/80 bg-white/80 px-3 py-1.5 text-xs font-bold tracking-wide text-brand-navy shadow-sm backdrop-blur transition-all duration-300 hover:border-brand-teal/40 hover:shadow-md',
                className,
            )}
            aria-label={t('lang.label')}
        >
            <Globe className="h-3.5 w-3.5 text-brand-teal-dark transition-transform duration-300 group-hover:rotate-45" />
            <span className="relative flex h-5 items-center gap-1">
                <span
                    className={cn(
                        'inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-[4px] px-1 text-[10px] font-black uppercase transition-all duration-200',
                        locale === 'id'
                            ? 'bg-brand-teal text-white shadow-sm'
                            : 'text-brand-gray hover:text-brand-navy',
                    )}
                >
                    ID
                </span>
                <span className="text-slate-300">/</span>
                <span
                    className={cn(
                        'inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-[4px] px-1 text-[10px] font-black uppercase transition-all duration-200',
                        locale === 'en'
                            ? 'bg-brand-teal text-white shadow-sm'
                            : 'text-brand-gray hover:text-brand-navy',
                    )}
                >
                    EN
                </span>
            </span>
        </button>
    );
}
