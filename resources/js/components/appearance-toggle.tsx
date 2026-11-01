import { Check, Monitor, Moon, Sun } from 'lucide-react';
import React from 'react';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { type Appearance, useAppearance } from '@/hooks/use-appearance';
import { cn } from '@/lib/utils';

interface AppearanceToggleProps {
    className?: string;
    variant?: 'dropdown' | 'tabs' | 'mobile';
}

export function AppearanceToggle({
    className,
    variant = 'dropdown',
}: AppearanceToggleProps) {
    const { appearance, resolvedAppearance, updateAppearance } = useAppearance();

    if (variant === 'tabs') {
        const tabs: { value: Appearance; icon: typeof Sun; label: string }[] = [
            { value: 'light', icon: Sun, label: 'Terang' },
            { value: 'dark', icon: Moon, label: 'Gelap' },
            { value: 'system', icon: Monitor, label: 'Sistem' },
        ];

        return (
            <div
                className={cn(
                    'inline-flex gap-1 rounded-xl bg-slate-100 p-1 dark:bg-slate-800',
                    className,
                )}
            >
                {tabs.map(({ value, icon: Icon, label }) => (
                    <button
                        key={value}
                        type="button"
                        onClick={() => updateAppearance(value)}
                        className={cn(
                            'flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all',
                            appearance === value
                                ? 'bg-white text-slate-900 shadow-xs dark:bg-slate-700 dark:text-white'
                                : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white',
                        )}
                    >
                        <Icon className="h-3.5 w-3.5" />
                        <span>{label}</span>
                    </button>
                ))}
            </div>
        );
    }

    if (variant === 'mobile') {
        return (
            <div className={cn('flex flex-col gap-2 rounded-xl p-2', className)}>
                <span className="px-2 text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                    Mode Tampilan
                </span>
                <div className="grid grid-cols-3 gap-1 rounded-xl bg-slate-100 p-1 dark:bg-slate-800">
                    <button
                        type="button"
                        onClick={() => updateAppearance('light')}
                        className={cn(
                            'flex items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-semibold transition-all',
                            appearance === 'light'
                                ? 'bg-white text-slate-900 shadow-xs dark:bg-slate-700 dark:text-white'
                                : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white',
                        )}
                    >
                        <Sun className="h-3.5 w-3.5" />
                        <span>Terang</span>
                    </button>
                    <button
                        type="button"
                        onClick={() => updateAppearance('dark')}
                        className={cn(
                            'flex items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-semibold transition-all',
                            appearance === 'dark'
                                ? 'bg-white text-slate-900 shadow-xs dark:bg-slate-700 dark:text-white'
                                : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white',
                        )}
                    >
                        <Moon className="h-3.5 w-3.5" />
                        <span>Gelap</span>
                    </button>
                    <button
                        type="button"
                        onClick={() => updateAppearance('system')}
                        className={cn(
                            'flex items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-semibold transition-all',
                            appearance === 'system'
                                ? 'bg-white text-slate-900 shadow-xs dark:bg-slate-700 dark:text-white'
                                : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white',
                        )}
                    >
                        <Monitor className="h-3.5 w-3.5" />
                        <span>Sistem</span>
                    </button>
                </div>
            </div>
        );
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className={cn(
                        'h-9 w-9 rounded-full text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white',
                        className,
                    )}
                    aria-label="Ubah tema tampilan"
                >
                    {resolvedAppearance === 'dark' ? (
                        <Moon className="h-4 w-4 transition-transform" />
                    ) : (
                        <Sun className="h-4 w-4 transition-transform" />
                    )}
                    <span className="sr-only">Ubah tema tampilan</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-36">
                <DropdownMenuItem
                    onClick={() => updateAppearance('light')}
                    className="flex cursor-pointer items-center justify-between text-xs font-medium"
                >
                    <span className="flex items-center gap-2">
                        <Sun className="h-3.5 w-3.5" />
                        Terang
                    </span>
                    {appearance === 'light' && <Check className="h-3.5 w-3.5 text-brand-teal" />}
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() => updateAppearance('dark')}
                    className="flex cursor-pointer items-center justify-between text-xs font-medium"
                >
                    <span className="flex items-center gap-2">
                        <Moon className="h-3.5 w-3.5" />
                        Gelap
                    </span>
                    {appearance === 'dark' && <Check className="h-3.5 w-3.5 text-brand-teal" />}
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() => updateAppearance('system')}
                    className="flex cursor-pointer items-center justify-between text-xs font-medium"
                >
                    <span className="flex items-center gap-2">
                        <Monitor className="h-3.5 w-3.5" />
                        Sistem
                    </span>
                    {appearance === 'system' && <Check className="h-3.5 w-3.5 text-brand-teal" />}
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export default AppearanceToggle;
