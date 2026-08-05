import { Link } from '@inertiajs/react';
import { BarChart3, Newspaper, ShieldCheck, Users } from 'lucide-react';
import { home } from '@/routes';
import type { AuthLayoutProps } from '@/types';

const FEATURES = [
    {
        icon: Newspaper,
        label: 'Kelola Berita & Aktivitas',
        desc: 'Publikasikan konten terbaru untuk warga.',
    },
    {
        icon: BarChart3,
        label: 'Pantau Laporan',
        desc: 'Proses dan lacak laporan masuk secara transparan.',
    },
    {
        icon: Users,
        label: 'Atur Pengguna',
        desc: 'Kelola akun dan akses panel secara aman.',
    },
];

export default function AuthSimpleLayout({
    children,
    title,
    description,
}: AuthLayoutProps) {
    return (
        <div className="relative flex min-h-svh bg-background">
            {/* Brand panel */}
            <div className="dc-grid-pattern relative hidden w-1/2 flex-col justify-between overflow-hidden bg-gradient-to-br from-brand-navy via-brand-navy to-brand-navy-dark p-12 text-white lg:flex">
                <div className="animate-drift absolute -top-24 -right-24 h-96 w-96 rounded-full bg-brand-teal/20 blur-3xl" />
                <div className="animate-drift absolute -bottom-32 -left-20 h-96 w-96 rounded-full bg-brand-orange/20 blur-3xl [animation-delay:5s]" />
                <div className="animate-drift absolute top-1/3 right-1/4 h-40 w-40 rounded-full bg-brand-teal/15 blur-2xl [animation-delay:8s]" />

                <Link
                    href={home()}
                    className="relative inline-flex items-center gap-3.5"
                >
                    <img
                        src="/images/dc-logo.png"
                        alt="Darwin Center"
                        className="h-16 w-auto object-contain drop-shadow-md"
                    />
                    <span className="flex flex-col leading-none">
                        <span className="text-3xl font-black tracking-tight">
                            Darwin
                            <span className="font-light text-white/90">
                                Center
                            </span>
                        </span>
                        <span className="mt-1.5 text-[10px] font-bold tracking-[0.3em] text-brand-orange-light uppercase">
                            Kabupaten Muna Barat
                        </span>
                    </span>
                </Link>

                <div className="relative">
                    <h1 className="dc-text-balance text-4xl leading-tight font-black xl:text-5xl">
                        Panel Pengelolaan
                        <br />
                        <span className="bg-gradient-to-r from-brand-teal-light via-teal-300 to-brand-orange-light bg-clip-text text-transparent">
                            Darwin Center
                        </span>
                    </h1>
                    <p className="mt-5 max-w-md text-base leading-relaxed text-white/85">
                        Kelola konten, laporan warga, dan program pembangunan
                        Muna Barat dalam satu panel yang aman dan terpercaya.
                    </p>

                    <ul className="mt-10 space-y-5">
                        {FEATURES.map(({ icon: Icon, label, desc }) => (
                            <li key={label} className="flex items-start gap-4">
                                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/10 text-brand-orange-light backdrop-blur">
                                    <Icon className="h-5 w-5" />
                                </span>
                                <div>
                                    <div className="font-bold">{label}</div>
                                    <div className="mt-0.5 text-sm text-white/90">
                                        {desc}
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                <p className="relative flex items-center gap-2 text-sm text-white/90">
                    <ShieldCheck className="h-4 w-4 text-brand-teal-light" />
                    Akses terbatas untuk administrator Darwin Center.
                </p>
            </div>

            {/* Form panel */}
            <div className="relative flex flex-1 flex-col items-center justify-center p-6 md:p-10">
                <div className="pointer-events-none absolute inset-0 overflow-hidden">
                    <div className="absolute -top-32 right-0 h-96 w-96 rounded-full bg-brand-teal/10 blur-3xl" />
                    <div className="absolute -bottom-32 left-0 h-96 w-96 rounded-full bg-brand-orange/10 blur-3xl" />
                </div>

                <div className="relative w-full max-w-sm">
                    <div className="flex flex-col items-center gap-4 lg:hidden">
                        <Link
                            href={home()}
                            className="flex flex-col items-center gap-2"
                        >
                            <img
                                src="/images/dc-logo.png"
                                alt="Darwin Center"
                                className="h-16 w-auto object-contain"
                            />
                            <span className="text-xl font-black tracking-tight text-brand-navy dark:text-white">
                                Darwin
                                <span className="font-light text-brand-gray dark:text-slate-400">
                                    Center
                                </span>
                            </span>
                        </Link>
                    </div>

                    <div className="flex flex-col gap-8">
                        <div className="space-y-2 text-center">
                            <h2 className="text-2xl font-black tracking-tight text-brand-navy dark:text-white">
                                {title}
                            </h2>
                            <p className="text-sm text-muted-foreground">
                                {description}
                            </p>
                        </div>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
