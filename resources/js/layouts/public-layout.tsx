import { Link, usePage } from '@inertiajs/react';
import { ArrowRight, Menu, Phone, Mail, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Sheet, SheetContent, SheetDescription, SheetTitle } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

const NAV_ITEMS = [
    { label: 'Beranda', href: '/' },
    { label: 'Jejak Kiprah', href: '/activities' },
    { label: 'Berita', href: '/news' },
    { label: 'Galeri', href: '/galleries' },
    { label: 'Lapor Darwin', href: '/lapor' },
];

function isActive(href: string, pathname: string): boolean {
    if (href === '/') {
        return pathname === '/';
    }

    return pathname.startsWith(href);
}

export default function PublicLayout({ children }: { children: React.ReactNode }) {
    const { url } = usePage();
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });

        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => {
        document.body.style.overflow = menuOpen ? 'hidden' : '';

        return () => {
            document.body.style.overflow = '';
        };
    }, [menuOpen]);

    return (
        <div className="flex min-h-screen flex-col overflow-x-clip bg-[#f8fafc]">
            {/* ===== Navigation ===== */}
            <header
                className={cn(
                    'fixed inset-x-0 top-0 z-50 transition-all duration-300',
                    scrolled
                        ? 'border-b border-slate-900/10 bg-white/85 shadow-[0_4px_24px_rgba(15,23,42,0.06)] backdrop-blur-xl'
                        : 'border-b border-transparent bg-white/60 backdrop-blur-lg',
                )}
            >
                <nav className="mx-auto flex h-20 max-w-[1400px] items-center justify-between px-5 lg:h-24 lg:px-8">
                    <Link href="/" className="group flex items-center gap-3">
                        <img
                            src="/images/dc-logo.png"
                            alt="Darwin Center logo"
                            className="h-14 w-auto object-contain drop-shadow-sm transition-transform duration-300 group-hover:scale-105 lg:h-[4.25rem]"
                        />
                        <span className="flex flex-col leading-none">
                            <span className="text-2xl font-black tracking-tight text-brand-navy lg:text-[28px]">
                                Darwin<span className="font-light text-brand-gray">Center</span>
                            </span>
                            <span className="mt-1.5 text-[10px] font-bold uppercase tracking-[0.28em] text-brand-teal-dark lg:text-[11px]">
                                Kabupaten Muna Barat
                            </span>
                        </span>
                    </Link>

                    {/* Desktop nav */}
                    <div className="hidden items-center gap-7 lg:flex">
                        {NAV_ITEMS.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    'relative text-[15px] font-semibold transition-colors',
                                    isActive(item.href, url)
                                        ? 'text-brand-teal-dark after:absolute after:-bottom-1.5 after:left-0 after:h-0.5 after:w-full after:rounded-full after:bg-brand-teal'
                                        : 'text-brand-navy hover:text-brand-teal-dark',
                                )}
                            >
                                {item.label}
                            </Link>
                        ))}
                        <Link
                            href="/lapor"
                            className="rounded-full bg-brand-orange-dark px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-brand-orange-dark/25 transition-all hover:-translate-y-0.5 hover:bg-brand-orange"
                        >
                            Sampaikan Aspirasi
                        </Link>
                    </div>

                    {/* Mobile hamburger */}
                    <button
                        type="button"
                        onClick={() => setMenuOpen(true)}
                        className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-brand-navy lg:hidden"
                        aria-label="Buka menu"
                    >
                        <Menu className="h-5 w-5" />
                    </button>
                </nav>
            </header>

            {/* ===== Mobile drawer ===== */}
            <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
                <SheetContent side="right" className="flex w-[300px] flex-col bg-white p-0">
                    <SheetTitle className="sr-only">Menu Navigasi</SheetTitle>
                    <SheetDescription className="sr-only">Menu navigasi Darwin Center</SheetDescription>
                    <div className="flex items-center justify-between border-b border-slate-100 p-5">
                        <div className="flex items-center gap-3">
                            <img src="/images/dc-logo.png" alt="Darwin Center logo" className="h-12 w-auto object-contain" />
                            <span className="flex flex-col leading-none">
                                <span className="text-xl font-black tracking-tight text-brand-navy">
                                    Darwin<span className="font-light text-brand-gray">Center</span>
                                </span>
                                <span className="mt-1 text-[9px] font-bold uppercase tracking-[0.22em] text-brand-teal-dark">
                                    Muna Barat
                                </span>
                            </span>
                        </div>
                        <button
                            type="button"
                            onClick={() => setMenuOpen(false)}
                            className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-brand-gray hover:bg-slate-100"
                            aria-label="Tutup menu"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>
                    <nav className="flex flex-1 flex-col gap-1 overflow-y-auto p-4">
                        {NAV_ITEMS.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setMenuOpen(false)}
                                className={cn(
                                    'rounded-xl px-4 py-3 text-[15px] font-semibold transition-colors',
                                    isActive(item.href, url)
                                        ? 'bg-brand-teal/15 text-brand-teal-dark'
                                        : 'text-brand-navy hover:bg-slate-100',
                                )}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </nav>
                    <div className="border-t border-slate-100 p-4">
                        <Link
                            href="/lapor"
                            onClick={() => setMenuOpen(false)}
                            className="flex w-full items-center justify-center rounded-full bg-brand-orange-dark px-5 py-3 text-sm font-bold text-white shadow-lg shadow-brand-orange-dark/25"
                        >
                            Sampaikan Aspirasi
                        </Link>
                    </div>
                </SheetContent>
            </Sheet>

            {/* ===== Content ===== */}
            <main className="flex-1">{children}</main>

            {/* ===== Footer ===== */}
            <footer className="dc-grid-pattern relative overflow-hidden bg-gradient-to-br from-brand-navy via-brand-navy to-brand-navy-dark text-white">
                <div className="animate-drift absolute -right-32 -top-32 h-96 w-96 rounded-full bg-brand-teal/15 blur-3xl" />
                <div className="animate-drift absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-brand-orange/15 blur-3xl [animation-delay:5s]" />
                <div className="relative mx-auto max-w-[1400px] px-5 pb-10 pt-20 lg:px-8">
                    <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-12">
                        <div className="lg:col-span-5">
                            <div className="flex items-center gap-3.5">
                                <img
                                    src="/images/dc-logo.png"
                                    alt="Darwin Center logo"
                                    className="h-16 w-auto object-contain drop-shadow-md"
                                />
                                <span className="flex flex-col leading-none">
                                    <span className="text-2xl font-black tracking-tight lg:text-3xl">
                                        Darwin<span className="font-light text-white/90">Center</span>
                                    </span>
                                    <span className="mt-1.5 text-[10px] font-bold uppercase tracking-[0.28em] text-brand-orange-light">
                                        Kabupaten Muna Barat
                                    </span>
                                </span>
                            </div>
                            <p className="mt-6 max-w-md text-sm leading-relaxed text-white/85">
                                Ruang dialektika dan catatan pemikiran tentang tata kelola publik, inovasi, dan
                                pembangunan berkelanjutan Muna Barat.
                            </p>
                            <div className="mt-8 flex flex-col gap-3 text-sm font-medium text-white/80 sm:flex-row sm:gap-6">
                                <span className="inline-flex items-center gap-2.5">
                                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-brand-teal/20 text-brand-orange-light">
                                        <Phone className="h-4 w-4" />
                                    </span>
                                    0860 733 3779
                                </span>
                                <span className="inline-flex items-center gap-2.5">
                                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-brand-teal/20 text-brand-orange-light">
                                        <Mail className="h-4 w-4" />
                                    </span>
                                    info@darwincenter.com
                                </span>
                            </div>
                        </div>

                        <div className="lg:col-span-2">
                            <h4 className="text-sm font-bold uppercase tracking-wider text-brand-orange-light">Navigasi</h4>
                            <ul className="mt-5 space-y-3.5 text-sm font-medium text-white/85">
                                <li><Link href="/" className="transition-colors hover:text-white">Beranda</Link></li>
                                <li><Link href="/activities" className="transition-colors hover:text-white">Jejak Kiprah</Link></li>
                                <li><Link href="/galleries" className="transition-colors hover:text-white">Galeri</Link></li>
                            </ul>
                        </div>

                        <div className="lg:col-span-2">
                            <h4 className="text-sm font-bold uppercase tracking-wider text-brand-orange-light">Informasi</h4>
                            <ul className="mt-5 space-y-3.5 text-sm font-medium text-white/85">
                                <li><Link href="/news" className="transition-colors hover:text-white">Berita Terkini</Link></li>
                                <li><Link href="/lapor" className="transition-colors hover:text-white">Lapor Darwin</Link></li>
                            </ul>
                        </div>

                        <div className="lg:col-span-3">
                            <h4 className="text-sm font-bold uppercase tracking-wider text-brand-orange-light">Sampaikan Aspirasi</h4>
                            <p className="mt-5 text-sm leading-relaxed text-white/85">
                                Suara Anda menentukan arah pembangunan. Laporkan langsung ke Darwin Center.
                            </p>
                            <Link
                                href="/lapor"
                                className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand-orange-dark px-6 py-3 text-sm font-bold text-white shadow-lg shadow-black/20 transition-all hover:-translate-y-0.5 hover:bg-brand-orange"
                            >
                                Ajukan Laporan
                                <ArrowRight className="h-4 w-4" />
                            </Link>
                        </div>
                    </div>

                    <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 md:flex-row">
                        <p className="text-sm font-medium text-white/90">
                            © {new Date().getFullYear()} Darwin Center — Kabupaten Muna Barat. All rights reserved.
                        </p>
                        <Link
                            href="/admin/login"
                            className="rounded-full border border-white/15 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white/75 transition-colors hover:border-white/40 hover:text-white"
                        >
                            Admin Login
                        </Link>
                    </div>
                </div>
            </footer>
        </div>
    );
}