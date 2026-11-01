import * as React from 'react';
import { AlertTriangle, Trash2, HelpCircle, Loader2 } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export interface ConfirmDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    title: string;
    description: string;
    confirmText?: string;
    cancelText?: string;
    variant?: 'danger' | 'warning' | 'primary';
    icon?: 'trash' | 'warning' | 'info';
    isLoading?: boolean;
    onConfirm: () => void;
}

export function ConfirmDialog({
    open,
    onOpenChange,
    title,
    description,
    confirmText = 'Hapus',
    cancelText = 'Batal',
    variant = 'danger',
    icon = 'trash',
    isLoading = false,
    onConfirm,
}: ConfirmDialogProps) {
    const handleConfirm = () => {
        onConfirm();
    };

    return (
        <Dialog open={open} onOpenChange={isLoading ? undefined : onOpenChange}>
            <DialogContent className="sm:max-w-md rounded-3xl p-6 sm:p-7 shadow-2xl border-slate-200/80">
                <div className="flex flex-col items-center text-center sm:items-start sm:text-left gap-4">
                    {/* Icon indicator */}
                    <div
                        className={cn(
                            'flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl shadow-sm transition-transform',
                            variant === 'danger' && 'bg-red-50 text-red-600 ring-8 ring-red-50/60',
                            variant === 'warning' && 'bg-amber-50 text-amber-600 ring-8 ring-amber-50/60',
                            variant === 'primary' && 'bg-brand-teal/10 text-brand-teal-dark ring-8 ring-brand-teal/5',
                        )}
                    >
                        {icon === 'trash' ? (
                            <Trash2 className="h-6 w-6 stroke-[2.2]" />
                        ) : icon === 'warning' ? (
                            <AlertTriangle className="h-6 w-6 stroke-[2.2]" />
                        ) : (
                            <HelpCircle className="h-6 w-6 stroke-[2.2]" />
                        )}
                    </div>

                    <div className="space-y-2">
                        <DialogHeader className="p-0 text-left">
                            <DialogTitle className="text-xl font-black text-brand-navy tracking-tight">
                                {title}
                            </DialogTitle>
                            <DialogDescription className="text-sm text-slate-500 leading-relaxed pt-1">
                                {description}
                            </DialogDescription>
                        </DialogHeader>
                    </div>
                </div>

                <DialogFooter className="mt-6 flex flex-col-reverse sm:flex-row gap-2 sm:justify-end">
                    <Button
                        type="button"
                        variant="outline"
                        disabled={isLoading}
                        onClick={() => onOpenChange(false)}
                        className="rounded-full border-slate-300 font-semibold hover:bg-slate-50 h-10 px-5"
                    >
                        {cancelText}
                    </Button>
                    <Button
                        type="button"
                        disabled={isLoading}
                        onClick={handleConfirm}
                        className={cn(
                            'rounded-full font-bold h-10 px-6 shadow-md transition-all',
                            variant === 'danger' &&
                                'bg-red-600 hover:bg-red-700 text-white shadow-red-600/20 hover:shadow-red-600/30',
                            variant === 'warning' &&
                                'bg-amber-600 hover:bg-amber-700 text-white shadow-amber-600/20 hover:shadow-amber-600/30',
                            variant === 'primary' &&
                                'bg-brand-teal hover:bg-brand-teal-dark text-white shadow-brand-teal/20',
                        )}
                    >
                        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        {confirmText}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
