import { Globe, Loader2, Sparkles } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useTranslation } from '@/lib/i18n';

interface UseContentTranslationOptions {
    id?: number | string;
    title: string;
    content?: string;
}

export function useContentTranslation({ id, title, content }: UseContentTranslationOptions) {
    const { locale, t } = useTranslation();
    const [translatedTitle, setTranslatedTitle] = useState<string>(title);
    const [translatedContent, setTranslatedContent] = useState<string>(content || '');
    const [isTranslating, setIsTranslating] = useState(false);
    const [showOriginal, setShowOriginal] = useState(false);

    // Simple hash function for client storage key
    function getCacheKey(type: 'title' | 'content', raw: string) {
        let hash = 0;
        for (let i = 0; i < raw.length; i++) {
            hash = (hash << 5) - hash + raw.charCodeAt(i);
            hash |= 0;
        }
        return `dc_tr_v2_${id ?? 'item'}_${type}_${Math.abs(hash)}`;
    }

    useEffect(() => {
        // If current language is Indonesian, no translation is needed
        if (locale === 'id') {
            setIsTranslating(false);
            return;
        }

        // When in English mode, check cache or fetch translation
        const titleKey = getCacheKey('title', title);
        const contentKey = content ? getCacheKey('content', content) : null;

        const cachedTitle = sessionStorage.getItem(titleKey) || localStorage.getItem(titleKey);
        const cachedContent = contentKey
            ? sessionStorage.getItem(contentKey) || localStorage.getItem(contentKey)
            : null;

        if (cachedTitle && (!content || cachedContent)) {
            setTranslatedTitle(cachedTitle);
            if (cachedContent) setTranslatedContent(cachedContent);
            setIsTranslating(false);
            return;
        }

        // Fetch from /api/translate
        let isMounted = true;
        setIsTranslating(true);

        fetch('/api/translate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify({
                title,
                content,
                from: 'id',
                to: 'en',
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (!isMounted) return;

                if (data.title) {
                    setTranslatedTitle(data.title);
                    try {
                        sessionStorage.setItem(titleKey, data.title);
                        localStorage.setItem(titleKey, data.title);
                    } catch {}
                }

                if (data.content) {
                    setTranslatedContent(data.content);
                    if (contentKey) {
                        try {
                            sessionStorage.setItem(contentKey, data.content);
                            localStorage.setItem(contentKey, data.content);
                        } catch {}
                    }
                }
            })
            .catch(() => {
                // If translation fails, gracefully fallback to original
            })
            .finally(() => {
                if (isMounted) setIsTranslating(false);
            });

        return () => {
            isMounted = false;
        };
    }, [locale, title, content, id]);

    // Active display values
    const isEn = locale === 'en';
    const isTranslated = isEn && !showOriginal && (translatedTitle !== title || translatedContent !== content);

    const displayTitle = isEn && !showOriginal ? translatedTitle : title;
    const displayContent = isEn && !showOriginal ? translatedContent : content || '';

    return {
        title: displayTitle,
        content: displayContent,
        isTranslating,
        isTranslated,
        showOriginal,
        toggleOriginal: () => setShowOriginal((prev) => !prev),
    };
}

interface AutoTranslateBannerProps {
    isTranslating: boolean;
    isTranslated: boolean;
    showOriginal: boolean;
    onToggleOriginal: () => void;
}

export function AutoTranslateBanner({
    isTranslating,
    isTranslated,
    showOriginal,
    onToggleOriginal,
}: AutoTranslateBannerProps) {
    const { locale, t } = useTranslation();

    if (locale !== 'en') return null;

    if (isTranslating) {
        return (
            <div className="animate-fade-in my-6 flex items-center gap-3 rounded-2xl border border-brand-teal/20 bg-brand-teal/[0.04] p-4 text-xs font-semibold text-brand-navy">
                <Loader2 className="h-4 w-4 animate-spin text-brand-teal" />
                <span>{t('translation.translating')}</span>
            </div>
        );
    }

    if (!isTranslated && !showOriginal) return null;

    return (
        <div className="animate-fade-in my-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-brand-teal/20 bg-gradient-to-r from-brand-teal/[0.06] via-white to-brand-teal/[0.03] p-4 text-xs shadow-xs">
            <div className="flex items-center gap-2.5 text-brand-navy">
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-xl bg-brand-teal/15 text-brand-teal-dark">
                    <Globe className="h-4 w-4" />
                </span>
                <div>
                    <span className="font-bold">
                        {showOriginal
                            ? t('translation.view_original')
                            : t('translation.auto_translated')}
                    </span>
                    <span className="hidden text-slate-400 sm:inline">
                        {' '}
                        • {t('translation.machine_note')}
                    </span>
                </div>
            </div>
            <button
                type="button"
                onClick={onToggleOriginal}
                className="inline-flex items-center gap-1.5 rounded-full border border-brand-teal/30 bg-white px-3.5 py-1.5 text-xs font-bold text-brand-teal-dark shadow-2xs transition-all hover:bg-brand-teal hover:text-white"
            >
                <Sparkles className="h-3.5 w-3.5" />
                <span>
                    {showOriginal
                        ? t('translation.view_translated')
                        : t('translation.view_original')}
                </span>
            </button>
        </div>
    );
}

interface ListItem {
    id: number | string;
    title: string;
    content?: string;
    [key: string]: any;
}

export function useListTranslation<T extends ListItem>(items: T[]) {
    const { locale } = useTranslation();
    const [translatedMap, setTranslatedMap] = useState<Record<string, { title: string; excerpt?: string }>>({});

    useEffect(() => {
        if (locale !== 'en' || !items || items.length === 0) return;

        const missingTitles: Record<string, string> = {};
        const missingExcerpts: Record<string, string> = {};
        const initialMap: Record<string, { title: string; excerpt?: string }> = {};

        for (const item of items) {
            const titleKey = `dc_tr_v2_title_${item.id}`;
            const excerptKey = `dc_tr_v2_excerpt_${item.id}`;

            const cachedTitle = sessionStorage.getItem(titleKey) || localStorage.getItem(titleKey);
            const cachedExcerpt = sessionStorage.getItem(excerptKey) || localStorage.getItem(excerptKey);

            if (cachedTitle) {
                initialMap[item.id] = {
                    title: cachedTitle,
                    excerpt: cachedExcerpt || undefined,
                };
            } else {
                missingTitles[`t_${item.id}`] = item.title;
                if (item.content) {
                    const cleanExcerpt = item.content.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 160);
                    if (cleanExcerpt) {
                        missingExcerpts[`e_${item.id}`] = cleanExcerpt;
                    }
                }
            }
        }

        setTranslatedMap((prev) => ({ ...prev, ...initialMap }));

        if (Object.keys(missingTitles).length === 0) return;

        let isMounted = true;
        fetch('/api/translate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify({
                titles: missingTitles,
                texts: missingExcerpts,
                from: 'id',
                to: 'en',
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (!isMounted) return;

                const newMap: Record<string, { title: string; excerpt?: string }> = {};
                for (const item of items) {
                    const transTitle = data.titles?.[`t_${item.id}`];
                    const transExcerpt = data.texts?.[`e_${item.id}`];

                    if (transTitle) {
                        newMap[item.id] = {
                            title: transTitle,
                            excerpt: transExcerpt || undefined,
                        };
                        try {
                            sessionStorage.setItem(`dc_tr_v2_title_${item.id}`, transTitle);
                            localStorage.setItem(`dc_tr_v2_title_${item.id}`, transTitle);
                            if (transExcerpt) {
                                sessionStorage.setItem(`dc_tr_v2_excerpt_${item.id}`, transExcerpt);
                                localStorage.setItem(`dc_tr_v2_excerpt_${item.id}`, transExcerpt);
                            }
                        } catch {}
                    }
                }

                setTranslatedMap((prev) => ({ ...prev, ...newMap }));
            })
            .catch(() => {});

        return () => {
            isMounted = false;
        };
    }, [locale, items]);

    const getTitle = (item: T): string => {
        if (locale !== 'en') return item.title;
        return translatedMap[item.id]?.title ?? item.title;
    };

    const getExcerpt = (item: T, fallbackExcerpt?: string): string => {
        if (locale !== 'en') return fallbackExcerpt ?? '';
        return translatedMap[item.id]?.excerpt ?? fallbackExcerpt ?? '';
    };

    return {
        getTitle,
        getExcerpt,
        isEn: locale === 'en',
    };
}

