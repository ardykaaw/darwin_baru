export interface ActivityItem {
    id: number;
    title: string;
    content: string;
    date: string;
    image: string | null;
}

export interface NewsItem {
    id: number;
    title: string;
    slug: string;
    content: string;
    image: string | null;
    created_at: string;
    is_published?: boolean;
}

export interface GalleryItem {
    id: number;
    title: string;
    image: string;
    created_at?: string;
}

export interface PaginationMeta {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    first_page_url: string | null;
    last_page_url: string | null;
    next_page_url: string | null;
    prev_page_url: string | null;
    from: number | null;
    to: number | null;
    links: Array<{
        url: string | null;
        label: string;
        active: boolean;
    }>;
}

export interface Paginated<T> {
    data: T[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    first_page_url: string | null;
    last_page_url: string | null;
    next_page_url: string | null;
    prev_page_url: string | null;
    from: number | null;
    to: number | null;
    links: Array<{
        url: string | null;
        label: string;
        active: boolean;
    }>;
}
