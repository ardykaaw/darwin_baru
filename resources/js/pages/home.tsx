import { Head, Link } from '@inertiajs/react';
import {
    ArrowRight,
    BarChart3,
    CheckCircle2,
    Expand,
    Handshake,
    Images,
    Lightbulb,
    Megaphone,
    MessageSquareHeart,
    Rocket,
    ShieldCheck,
    Sparkles,
    TrendingUp,
    UserRoundCheck,
    Zap,
} from 'lucide-react';
import type { ActivityItem, GalleryItem, NewsItem } from '@/types';

interface HomeProps {
    activities: ActivityItem[];
    latestNews: NewsItem[];
    latestGalleries: GalleryItem[];
}

const PILLARS = [
    {
        icon: Zap,
        label: 'Kecepatan',
        title: 'Respons Lebih Cepat',
        description:
            'Proses pelaporan dan informasi layanan dirancang untuk mencapai respons cepat dari perangkat pemerintahan.',
        color: 'bg-brand-teal/15 text-brand-teal-dark',
        ring: 'group-hover:ring-brand-teal/20',
    },
    {
        icon: ShieldCheck,
        label: 'Kejelasan',
        title: 'Transparansi Terukur',
        description:
            'Setiap program dan laporan dibuat agar mudah dipahami oleh warga dan pemangku kebijakan.',
        color: 'bg-brand-orange/15 text-brand-orange-dark',
        ring: 'group-hover:ring-brand-orange/20',
    },
    {
        icon: MessageSquareHeart,
        label: 'Kolaborasi',
        title: 'Suara untuk Semua',
        description:
            'Mendorong keterlibatan masyarakat melalui forum aspirasi, laporan, dan dialog publik berkelanjutan.',
        color: 'bg-brand-navy/10 text-brand-navy',
        ring: 'group-hover:ring-brand-navy/15',
    },
    {
        icon: TrendingUp,
        label: 'Dampak',
        title: 'Aksi Berkelanjutan',
        description:
            'Program-program yang dirancang hari ini dibangun agar berdampak nyata untuk generasi mendatang.',
        color: 'bg-brand-teal/15 text-brand-teal-dark',
        ring: 'group-hover:ring-brand-teal/20',
    },
];

const PROGRAMS = [
    {
        badge: 'Edukasi',
        badgeColor: 'bg-brand-teal/15 text-brand-teal-dark',
        title: 'Pendidikan Digital',
        description:
            'Membuka akses kelas digital dan pelatihan tenaga pendidik di seluruh kecamatan.',
        status: 'Dalam Rencana',
        icon: Lightbulb,
        points: ['Akses kelas digital', 'Pelatihan pendidik'],
    },
    {
        badge: 'Infrastruktur',
        badgeColor: 'bg-brand-orange/15 text-brand-orange-dark',
        title: 'Revitalisasi Publik',
        description:
            'Meningkatkan fasilitas umum dan infrastruktur lokal untuk memperkuat konektivitas antar desa.',
        status: 'Aktif',
        icon: Rocket,
        points: ['Fasilitas umum', 'Konektivitas desa'],
    },
    {
        badge: 'Partisipasi',
        badgeColor: 'bg-brand-navy/10 text-brand-navy',
        title: 'Forum Aspirasi',
        description:
            'Ruang dialog publik yang mengumpulkan aspirasi, rekomendasi, dan laporan warga secara langsung.',
        status: 'Dimulai',
        icon: Handshake,
        points: ['Dialog terbuka', 'Tindak lanjut berkelanjutan'],
    },
];

const TICKER_ITEMS = [
    'Membangun Muna Barat',
    'Transparansi Publik',
    'Inovasi Pelayanan',
    'Kolaborasi Warga',
    'Pembangunan Berkelanjutan',
    'Partisipasi Masyarakat',
    'Tata Kelola Modern',
];

const STATS = [
    { value: '4', label: 'Pilar Layanan' },
    { value: '100%', label: 'Transparansi' },
    { value: '7', label: 'Kecamatan Terjangkau' },
];

export default function Home({ latestNews, latestGalleries }: HomeProps) {
    const highlightNews = latestNews[0];
    const restNews = latestNews.slice(1);

    return (
        <>
            <Head title="Kepemimpinan Inovatif" />

            {/* ===== HERO ===== */}
            <section className="relative overflow-hidden">
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

                <div className="relative mx-auto flex min-h-screen w-full max-w-[1440px] flex-col px-5 pt-28 pb-16 lg:flex-row lg:items-center lg:px-8 lg:pt-0">
                    {/* Bupati image — bottom left on desktop, top on mobile */}
                    <div className="pointer-events-none relative order-1 flex h-[340px] items-end justify-center lg:order-none lg:h-[94vh] lg:w-[54%] lg:justify-start">
                        <div className="absolute bottom-0 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-brand-teal/25 blur-3xl lg:left-16 lg:translate-x-0" />
                        <div className="absolute bottom-24 left-1/2 hidden h-44 w-44 -translate-x-1/2 rounded-full border-2 border-dashed border-brand-teal/25 lg:left-24 lg:block" />
                        <img
                            src="/images/bupati.png"
                            alt="La Ode Darwin & Rhika Purwaningsih"
                            className="animate-fade-up relative max-h-full max-w-full [mask-image:linear-gradient(to_bottom,black_86%,transparent_100%)] object-contain object-bottom drop-shadow-[0_30px_50px_rgba(0,0,0,0.3)]"
                        />

                        {/* Caption chip on desktop */}
                        <div className="animate-float pointer-events-auto absolute bottom-32 left-0 hidden items-center gap-3 rounded-2xl border border-white/70 bg-white/85 px-4 py-3 shadow-xl shadow-black/10 backdrop-blur-xl lg:flex">
                            <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-teal to-brand-teal-dark text-white">
                                <Sparkles className="h-5 w-5" />
                            </span>
                            <div className="text-left">
                                <div className="text-sm font-black text-brand-navy">
                                    La Ode Darwin & Rhika P.
                                </div>
                                <div className="text-xs font-medium text-brand-gray">
                                    Kepemimpinan Muna Barat
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="relative z-10 order-2 mt-6 flex w-full flex-col items-center text-center lg:order-none lg:mt-0 lg:w-5/12 lg:items-end lg:pr-6 lg:text-right">
                        <div className="animate-fade-up inline-flex items-center gap-2 rounded-full border border-brand-teal/15 bg-white/85 px-4 py-1.5 text-sm font-semibold text-brand-teal-dark shadow-sm backdrop-blur-md">
                            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand-orange" />
                            Bersama Membangun Muna Barat
                        </div>

                        <h1 className="animate-fade-up dc-text-balance mt-6 text-4xl leading-[1.06] font-black tracking-tight text-brand-navy uppercase delay-100 md:text-5xl xl:text-[4.25rem]">
                            Meniti Jalan Inovasi,
                            <br />
                            <span className="bg-gradient-to-r from-brand-teal-dark via-brand-teal to-brand-orange-dark bg-clip-text text-transparent">
                                Menginspirasi Perubahan
                            </span>
                            <br />
                            Berkelanjutan
                        </h1>

                        <p className="animate-fade-up mt-7 max-w-xl text-base leading-relaxed font-medium text-brand-gray delay-200 md:text-lg">
                            Ruang dialektika, catatan pemikiran dan esensi
                            kepemimpinan dari{' '}
                            <strong className="text-brand-navy">
                                La Ode Darwin
                            </strong>{' '}
                            dan{' '}
                            <strong className="text-brand-navy">
                                Rhika Purwaningsih, SH.
                            </strong>{' '}
                            Mengulas gagasan modernisasi, tata kelola publik dan
                            strategi pembangunan berkelanjutan.
                        </p>

                        <div className="animate-fade-up mt-9 flex w-full flex-col gap-4 delay-300 sm:w-auto sm:flex-row lg:justify-start">
                            <Link
                                href="/activities"
                                className="group inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-brand-teal px-8 py-4 text-base font-bold text-white shadow-xl shadow-brand-teal/30 transition-all hover:-translate-y-1 hover:bg-brand-teal-dark sm:w-auto"
                            >
                                Kiprah dan Gagasan
                                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                            </Link>
                            <Link
                                href="/lapor"
                                className="inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-brand-orange-dark px-8 py-4 text-base font-bold text-white shadow-xl shadow-brand-orange-dark/30 transition-all hover:-translate-y-1 hover:bg-brand-orange sm:w-auto"
                            >
                                Sampaikan Aspirasi
                            </Link>
                        </div>

                        {/* Stats */}
                        <div className="animate-fade-up mt-12 grid w-full grid-cols-3 gap-6 border-t border-brand-navy/10 pt-8 delay-500">
                            {STATS.map((stat) => (
                                <div
                                    key={stat.label}
                                    className="text-center lg:text-right"
                                >
                                    <div className="text-2xl font-black text-brand-navy md:text-3xl">
                                        {stat.value}
                                    </div>
                                    <div className="mt-1 text-xs font-semibold tracking-wide text-brand-gray uppercase md:text-sm">
                                        {stat.label}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom fade */}
                <div className="pointer-events-none absolute right-0 bottom-0 left-0 h-24 bg-gradient-to-t from-[#f8fafc] to-transparent" />
            </section>

            {/* ===== MARQUEE BRAND STRIP ===== */}
            <section className="dc-marquee-mask dc-marquee-paused relative overflow-hidden border-y border-white/10 bg-gradient-to-r from-brand-navy via-brand-navy-dark to-brand-navy py-4">
                <div className="animate-marquee dc-marquee-track flex w-max items-center gap-10 whitespace-nowrap">
                    {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
                        <span
                            key={`${item}-${i}`}
                            className="inline-flex items-center gap-10 text-sm font-bold tracking-[0.22em] text-white/90 uppercase"
                        >
                            {item}
                            <span className="text-brand-orange-light">✦</span>
                        </span>
                    ))}
                </div>
            </section>

            {/* ===== FONDASI KINERJA ===== */}
            <section className="relative py-16 lg:py-24">
                <div className="mx-auto max-w-[1440px] px-5 lg:px-8">
                    <div className="grid items-center gap-12 lg:grid-cols-2">
                        <div>
                            <span className="inline-flex items-center gap-2 rounded-full bg-brand-teal/15 px-4 py-1.5 text-xs font-bold tracking-[0.2em] text-brand-teal-dark uppercase">
                                <Sparkles className="h-3.5 w-3.5" />
                                Fondasi Kinerja
                            </span>
                            <h2 className="dc-text-balance mt-6 text-3xl leading-tight font-black tracking-tight text-brand-navy lg:text-5xl">
                                Menghubungkan layanan publik dengan{' '}
                                <span className="bg-gradient-to-r from-brand-teal to-brand-orange bg-clip-text text-transparent">
                                    aspirasi warga
                                </span>{' '}
                                dalam satu platform.
                            </h2>
                            <p className="mt-6 text-base leading-relaxed text-brand-gray lg:text-lg">
                                Darwin Center hadir sebagai ruang digital untuk
                                melacak program, menyampaikan aspirasi, dan
                                memperkuat transparansi. Semua informasi
                                dirancang agar jelas, ringkas, dan bergerak
                                sejalan dengan kebutuhan masyarakat Muna Barat.
                            </p>

                            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
                                {[
                                    [
                                        'Digital',
                                        'Layanan online yang mudah diakses',
                                    ],
                                    ['Data', 'Terbuka dan akurat'],
                                    ['Partisipasi', 'Aspirasi warga teruji'],
                                    ['Inovasi', 'Program berkelanjutan'],
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
                                            Fokus utama
                                        </div>
                                        <div className="text-2xl font-bold text-brand-navy">
                                            Empat pilar layanan
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-8 grid grid-cols-2 gap-5">
                                    {[
                                        {
                                            icon: Zap,
                                            label: 'Digital',
                                            value: 'Layanan online',
                                        },
                                        {
                                            icon: ShieldCheck,
                                            label: 'Data',
                                            value: 'Terbuka & akurat',
                                        },
                                        {
                                            icon: MessageSquareHeart,
                                            label: 'Partisipasi',
                                            value: 'Aspirasi warga',
                                        },
                                        {
                                            icon: Rocket,
                                            label: 'Inovasi',
                                            value: 'Berkelanjutan',
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

            {/* ===== BERITA TERBARU ===== */}
            {latestNews.length > 0 && (
                <section className="bg-white py-16 lg:py-24">
                    <div className="mx-auto max-w-[1440px] px-5 lg:px-8">
                        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                            <div>
                                <span className="inline-flex items-center gap-2 rounded-full bg-brand-teal/15 px-4 py-1.5 text-xs font-bold tracking-[0.2em] text-brand-teal-dark uppercase">
                                    <Megaphone className="h-3.5 w-3.5" />
                                    Berita Terbaru
                                </span>
                                <h2 className="dc-text-balance mt-6 text-3xl font-black tracking-tight text-brand-navy lg:text-4xl">
                                    Sorotan berita paling baru dari Darwin
                                    Center.
                                </h2>
                            </div>
                            <Link
                                href="/news"
                                className="group inline-flex items-center gap-2 rounded-full border border-brand-teal-dark px-6 py-3 text-sm font-bold text-brand-teal-dark transition-colors hover:bg-brand-teal hover:text-white"
                            >
                                Lihat Semua Berita
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
                                            Berita Utama
                                        </span>
                                        <h3 className="dc-text-balance max-w-2xl text-2xl leading-snug font-bold lg:text-3xl">
                                            {highlightNews.title}
                                        </h3>
                                        <div className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-brand-orange-light">
                                            Baca Sekarang
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
                                                alt={item.title}
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
                                                {item.title}
                                            </h3>
                                        </div>
                                    </Link>
                                ))}
                                {restNews.length === 0 && (
                                    <div className="flex flex-1 items-center justify-center rounded-3xl border border-dashed border-slate-300 text-sm text-brand-gray">
                                        Berita lainnya segera hadir
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
                                    Galeri Terbaru
                                </span>
                                <h2 className="dc-text-balance mt-6 text-3xl font-black tracking-tight text-brand-navy lg:text-4xl">
                                    Dokumentasi visual terkini dari Darwin
                                    Center.
                                </h2>
                            </div>
                            <Link
                                href="/galleries"
                                className="group inline-flex items-center gap-2 rounded-full border border-brand-orange-dark px-6 py-3 text-sm font-bold text-brand-orange-dark transition-colors hover:bg-brand-orange hover:text-white"
                            >
                                Lihat Semua Galeri
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
                                                Lihat galeri
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
                            Inisiatif Unggulan
                        </span>
                        <h2 className="dc-text-balance mt-6 text-3xl font-black tracking-tight text-brand-navy lg:text-4xl">
                            Program yang mengubah arah pembangunan.
                        </h2>
                    </div>

                    <div className="grid gap-6 md:grid-cols-3">
                        {PROGRAMS.map((program) => (
                            <div
                                key={program.title}
                                className="group flex h-full flex-col rounded-[1.75rem] border border-slate-200/80 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_30px_60px_rgba(15,23,42,0.14)]"
                            >
                                <div className="mb-6 flex items-start justify-between">
                                    <span
                                        className={`rounded-full px-3.5 py-1.5 text-xs font-bold ${program.badgeColor}`}
                                    >
                                        {program.badge}
                                    </span>
                                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-brand-navy transition-colors group-hover:bg-brand-teal group-hover:text-white">
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
                                            <CheckCircle2 className="h-4 w-4 shrink-0 text-brand-teal-dark" />
                                            {point}
                                        </li>
                                    ))}
                                </ul>
                                <div className="mt-auto inline-flex items-center gap-2 pt-6 text-xs font-bold tracking-wide text-brand-teal-dark uppercase">
                                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand-teal" />
                                    Status: {program.status}
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
                                Terbuka untuk Semua
                            </span>
                            <h2 className="dc-text-balance mt-6 text-3xl leading-tight font-black text-white lg:text-[2.75rem]">
                                Dukung Perubahan, Sampaikan Aspirasi Anda
                            </h2>
                            <p className="mt-5 text-base leading-relaxed text-white/90 lg:text-lg">
                                Kajian, berita, dan laporan di sini dibuat untuk
                                memperkuat kepercayaan publik dan memastikan
                                suara Anda terdengar.
                            </p>
                            <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">
                                <Link
                                    href="/lapor"
                                    className="group inline-flex items-center justify-center gap-2 rounded-full bg-brand-orange-dark px-8 py-4 text-base font-bold text-white shadow-xl shadow-black/20 transition-all hover:-translate-y-1 hover:bg-brand-orange"
                                >
                                    Ajukan Laporan
                                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                                </Link>
                                <Link
                                    href="/activities"
                                    className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/30 px-8 py-4 text-base font-bold text-white transition-all hover:-translate-y-1 hover:border-white/60 hover:bg-white/10"
                                >
                                    Telusuri Aktivitas
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
