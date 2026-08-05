import { Link } from '@inertiajs/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Paginated } from '@/types';

interface PaginationProps<T> {
    pagination: Paginated<T>;
    className?: string;
}

export default function Pagination<T>({ pagination, className }: PaginationProps<T>) {
    if (pagination.last_page <= 1) {
        return null;
    }

    const linkClass = (active: boolean) =>
        cn(
            'inline-flex h-10 min-w-10 items-center justify-center rounded-xl px-3 text-sm font-semibold transition-colors',
            active
                ? 'bg-brand-teal text-white shadow-md shadow-brand-teal/25'
                : 'border border-slate-200 bg-white text-brand-gray hover:border-brand-teal hover:text-brand-teal',
        );

    return (
        <nav className={cn('flex items-center justify-center gap-1.5', className)} aria-label="Pagination">
            {pagination.prev_page_url && (
                <Link href={pagination.prev_page_url} className={linkClass(false)} aria-label="Halaman sebelumnya">
                    <ChevronLeft className="h-4 w-4" />
                </Link>
            )}
            {pagination.links
                .filter((link) => link.label !== '&laquo; Previous' && link.label !== 'Next &raquo;')
                .map((link, index) => (
                    <Link
                        key={index}
                        href={link.url ?? '#'}
                        preserveScroll
                        className={linkClass(link.active)}
                        dangerouslySetInnerHTML={
                            ['&laquo; Previous', '&lsaquo;', '&rsaquo;', 'Next &raquo;'].includes(link.label)
                                ? undefined
                                : undefined
                        }
                    >
                        <span dangerouslySetInnerHTML={{ __html: link.label }} />
                    </Link>
                ))}
            {pagination.next_page_url && (
                <Link href={pagination.next_page_url} className={linkClass(false)} aria-label="Halaman berikutnya">
                    <ChevronRight className="h-4 w-4" />
                </Link>
            )}
        </nav>
    );
}
