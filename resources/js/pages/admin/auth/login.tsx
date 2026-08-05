import { Head } from '@inertiajs/react';
import { useForm, usePage } from '@inertiajs/react';
import { ArrowRight, Loader2, Lock, Mail } from 'lucide-react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function AdminLogin() {
    const { status } = usePage().props as { status?: string | null };
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
    });

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        post('/admin/login', {
            preserveScroll: true,
        });
    }

    return (
        <>
            <Head title="Login Admin" />

            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="grid gap-6">
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <div className="relative">
                            <Mail className="absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                id="email"
                                type="email"
                                name="email"
                                required
                                autoFocus
                                autoComplete="email"
                                placeholder="admin@example.com"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                className="h-12 rounded-xl border-border/70 pl-10 shadow-sm"
                            />
                        </div>
                        <InputError message={errors.email} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <div className="relative">
                            <Lock className="absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                id="password"
                                type="password"
                                name="password"
                                required
                                autoComplete="current-password"
                                placeholder="Password"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                className="h-12 rounded-xl border-border/70 pl-10 shadow-sm"
                            />
                        </div>
                        <InputError message={errors.password} />
                    </div>

                    <Button
                        type="submit"
                        className="mt-2 h-12 w-full rounded-full bg-brand-teal text-base font-bold shadow-lg shadow-brand-teal/25 transition-all hover:-translate-y-0.5 hover:bg-brand-teal-dark"
                        disabled={processing}
                        data-test="admin-login-button"
                    >
                        {processing ? (
                            <>
                                <Loader2 className="h-5 w-5 animate-spin" />
                                Memverifikasi...
                            </>
                        ) : (
                            <>
                                Masuk ke Panel Admin
                                <ArrowRight className="h-4 w-4" />
                            </>
                        )}
                    </Button>
                </div>

                {status && (
                    <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-center text-sm font-semibold text-emerald-700">
                        {status}
                    </div>
                )}

                <p className="text-center text-xs leading-relaxed text-muted-foreground">
                    Akses terbatas untuk administrator Darwin Center.
                </p>
            </form>
        </>
    );
}

AdminLogin.layout = {
    title: 'Panel Admin Darwin Center',
    description: 'Masuk menggunakan akun administrator untuk mengelola konten.',
};
