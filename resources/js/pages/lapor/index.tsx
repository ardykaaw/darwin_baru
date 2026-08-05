import { Head } from '@inertiajs/react';
import { useForm } from '@inertiajs/react';
import { CheckCircle2, Inbox, Phone, Send, ShieldCheck, User2 } from 'lucide-react';
import { useState } from 'react';
import { PublicPageHero } from '@/components/public-page-hero';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useFlashMessages } from '@/hooks/use-flash-messages';
import { cn } from '@/lib/utils';

interface LaporProps {
    flash?: { success?: string | null };
}

export default function Lapor({ flash }: LaporProps) {
    useFlashMessages();
    const [submitted, setSubmitted] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        title: '',
        description: '',
        category: '',
        is_anonymous: false,
        reporter_name: '',
        reporter_phone: '',
    });

    const successMessage = flash?.success;

    function submit(e: React.FormEvent) {
        e.preventDefault();
        post('/lapor', {
            preserveScroll: true,
            onSuccess: () => {
                setSubmitted(true);
                reset();
            },
        });
    }

    if (submitted) {
        return (
            <>
                <Head title="Lapor Darwin" />
                <section className="flex min-h-screen items-center justify-center bg-gradient-to-br from-brand-navy via-brand-navy to-brand-navy-dark px-5 pt-20">
                    <div className="w-full max-w-md rounded-3xl bg-white p-8 text-center shadow-2xl">
                        <span className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-full bg-brand-teal/10">
                            <CheckCircle2 className="h-9 w-9 text-brand-teal" />
                        </span>
                        <h1 className="mt-6 text-2xl font-bold text-brand-navy">Laporan Terkirim</h1>
                        <p className="mt-3 text-sm leading-relaxed text-brand-gray">
                            {successMessage || 'Terima kasih atas partisipasi Anda. Laporan akan segera kami tindak lanjuti.'}
                        </p>
                        <Button
                            className="mt-8 w-full rounded-full bg-brand-teal py-3 hover:bg-brand-teal-dark"
                            onClick={() => setSubmitted(false)}
                        >
                            Kirim Laporan Lain
                        </Button>
                    </div>
                </section>
            </>
        );
    }

    return (
        <>
            <Head title="Lapor Darwin" />

            <PublicPageHero
                badge="Lapor Darwin"
                title="Sampaikan aspirasi, laporan, dan masukan Anda."
                description="Suara Anda penting. Sampaikan secara terbuka atau anonim — kami akan menindaklanjuti dengan transparan."
            />

            <section className="py-16 lg:py-20">
                <div className="mx-auto grid max-w-[1400px] gap-10 px-5 lg:grid-cols-12 lg:px-8">
                    {/* Info */}
                    <div className="lg:col-span-4">
                        <div className="rounded-3xl border border-slate-200/80 bg-white p-8 shadow-sm lg:sticky lg:top-24">
                            <h2 className="text-xl font-bold text-brand-navy">Ketentuan Pelaporan</h2>
                            <ul className="mt-6 space-y-5">
                                <li className="flex gap-3.5">
                                    <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-teal/15 text-brand-teal-dark">
                                        <User2 className="h-4.5 w-4.5" />
                                    </span>
                                    <p className="text-sm leading-relaxed text-brand-gray">
                                        Anda dapat melapor <strong className="text-brand-navy">secara anonim</strong> atau
                                        menyertakan identitas untuk memudahkan tindak lanjut.
                                    </p>
                                </li>
                                <li className="flex gap-3.5">
                                    <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-orange/15 text-brand-orange-dark">
                                        <Inbox className="h-4.5 w-4.5" />
                                    </span>
                                    <p className="text-sm leading-relaxed text-brand-gray">
                                        Laporan akan diverifikasi dan diproses sesuai kategori serta skala prioritas.
                                    </p>
                                </li>
                                <li className="flex gap-3.5">
                                    <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-navy/10 text-brand-navy">
                                        <Phone className="h-4.5 w-4.5" />
                                    </span>
                                    <p className="text-sm leading-relaxed text-brand-gray">
                                        Butuh bantuan langsung? Hubungi kami di <b className="text-brand-navy">0860 733 3779</b>.
                                    </p>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="lg:col-span-8">
                        <form
                            onSubmit={submit}
                            className="rounded-3xl border border-slate-200/80 bg-white p-8 shadow-sm lg:p-10"
                        >
                            <div className="grid gap-6">
                                <div className="grid gap-2.5">
                                    <div className="flex items-center justify-between">
                                        <Label htmlFor="title">
                                            Judul Laporan <span className="text-red-500">*</span>
                                        </Label>
                                        <span
                                            className={cn(
                                                'text-xs font-semibold tabular-nums',
                                                data.title.length > 255 ? 'text-red-500' : 'text-brand-gray',
                                            )}
                                        >
                                            {data.title.length}/255
                                        </span>
                                    </div>
                                    <Input
                                        id="title"
                                        value={data.title}
                                        onChange={(e) => setData('title', e.target.value)}
                                        placeholder="Contoh: Perbaikan jalan di Desa X"
                                        maxLength={255}
                                        required
                                    />
                                    {errors.title && <p className="text-sm text-red-500">{errors.title}</p>}
                                </div>

                                <div className="grid gap-2.5">
                                    <Label htmlFor="category">Kategori</Label>
                                    <select
                                        id="category"
                                        value={data.category}
                                        onChange={(e) => setData('category', e.target.value)}
                                        className={cn(
                                            'flex h-11 w-full rounded-xl border border-input bg-transparent px-3 py-2 text-sm shadow-sm outline-none transition-colors focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
                                            !data.category && 'text-muted-foreground',
                                        )}
                                    >
                                        <option value="">Pilih kategori (opsional)</option>
                                        <option value="Infrastruktur">Infrastruktur</option>
                                        <option value="Pendidikan">Pendidikan</option>
                                        <option value="Kesehatan">Kesehatan</option>
                                        <option value="Pelayanan Publik">Pelayanan Publik</option>
                                        <option value="Lingkungan">Lingkungan</option>
                                        <option value="Lainnya">Lainnya</option>
                                    </select>
                                </div>

                                <div className="grid gap-2.5">
                                    <div className="flex items-center justify-between">
                                        <Label htmlFor="description">
                                            Deskripsi Laporan <span className="text-red-500">*</span>
                                        </Label>
                                        <span
                                            className={cn(
                                                'text-xs font-semibold tabular-nums',
                                                data.description.length < 10 && data.description.length > 0
                                                    ? 'text-brand-orange-dark'
                                                    : 'text-brand-gray',
                                            )}
                                        >
                                            {data.description.length < 10
                                                ? `minimal 10 karakter (${data.description.length})`
                                                : `${data.description.length} karakter`}
                                        </span>
                                    </div>
                                    <Textarea
                                        id="description"
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                        placeholder="Jelaskan secara detail kronologi, lokasi, dan harapan Anda..."
                                        rows={6}
                                        required
                                    />
                                    {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
                                </div>

                                {/* Anonymous toggle */}
                                <div className="flex items-start justify-between gap-4 rounded-2xl border border-brand-teal/10 bg-brand-teal/[0.04] p-5">
                                    <div className="flex items-start gap-3.5">
                                        <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-teal/15 text-brand-teal-dark">
                                            <ShieldCheck className="h-5 w-5" />
                                        </span>
                                        <div>
                                            <div className="text-sm font-bold text-brand-navy">Lapor secara anonim</div>
                                            <p className="mt-1 text-xs leading-relaxed text-brand-gray">
                                                Sembunyikan nama dan nomor telepon Anda dari laporan.
                                            </p>
                                        </div>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setData('is_anonymous', !data.is_anonymous)}
                                        className={cn(
                                            'relative h-7 w-12 shrink-0 rounded-full transition-colors',
                                            data.is_anonymous ? 'bg-brand-teal' : 'bg-slate-300',
                                        )}
                                        aria-label="Toggle anonim"
                                    >
                                        <span
                                            className={cn(
                                                'absolute top-1 h-5 w-5 rounded-full bg-white shadow transition-all',
                                                data.is_anonymous ? 'left-6' : 'left-1',
                                            )}
                                        />
                                    </button>
                                </div>

                                {!data.is_anonymous && (
                                    <div className="grid gap-6 sm:grid-cols-2">
                                        <div className="grid gap-2.5">
                                            <Label htmlFor="reporter_name">Nama Lengkap</Label>
                                            <Input
                                                id="reporter_name"
                                                value={data.reporter_name}
                                                onChange={(e) => setData('reporter_name', e.target.value)}
                                                placeholder="Nama Anda"
                                            />
                                            {errors.reporter_name && (
                                                <p className="text-sm text-red-500">{errors.reporter_name}</p>
                                            )}
                                        </div>
                                        <div className="grid gap-2.5">
                                            <Label htmlFor="reporter_phone">Nomor Telepon</Label>
                                            <Input
                                                id="reporter_phone"
                                                type="tel"
                                                value={data.reporter_phone}
                                                onChange={(e) => setData('reporter_phone', e.target.value)}
                                                placeholder="08xx xxxx xxxx"
                                            />
                                            {errors.reporter_phone && (
                                                <p className="text-sm text-red-500">{errors.reporter_phone}</p>
                                            )}
                                        </div>
                                    </div>
                                )}

                                <Button
                                    type="submit"
                                    disabled={processing}
                                    className="mt-2 rounded-full bg-brand-orange-dark py-6 text-base font-bold shadow-xl shadow-brand-orange-dark/25 transition-all hover:-translate-y-0.5 hover:bg-brand-orange"
                                >
                                    {processing ? (
                                        <span className="flex items-center gap-2">
                                            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                                            Mengirim...
                                        </span>
                                    ) : (
                                        <>
                                            <Send className="h-5 w-5" />
                                            Kirim Laporan
                                        </>
                                    )}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </>
    );
}