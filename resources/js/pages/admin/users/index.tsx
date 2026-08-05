import { router } from '@inertiajs/react';
import { useForm } from '@inertiajs/react';
import { KeyRound, Loader2, Pencil, Plus, Search, Trash2, UserCog, Users } from 'lucide-react';
import { useState } from 'react';
import InputError from '@/components/input-error';
import Pagination from '@/components/pagination';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { useFlashMessages } from '@/hooks/use-flash-messages';
import { cn } from '@/lib/utils';
import type { Paginated } from '@/types';

interface UserItem {
    id: number;
    name: string;
    email: string;
    role: 'admin' | 'user';
    created_at: string;
}

interface AdminUsersProps {
    users: Paginated<UserItem>;
    search: string | null;
}

export default function AdminUsersIndex({ users, search }: AdminUsersProps) {
    useFlashMessages();
    const [dialogOpen, setDialogOpen] = useState(false);
    const [editing, setEditing] = useState<UserItem | null>(null);

    const { data, setData, post, put, processing, errors, reset } = useForm({
        name: '',
        email: '',
    });

    function openCreate() {
        setEditing(null);
        reset();
        setDialogOpen(true);
    }

    function openEdit(user: UserItem) {
        setEditing(user);
        setData({
            name: user.name,
            email: user.email,
        });
        setDialogOpen(true);
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        if (editing) {
            put(`/admin/users/${editing.id}`, {
                preserveScroll: true,
                onSuccess: () => {
                    setDialogOpen(false);
                    reset();
                },
            });
        } else {
            post('/admin/users', {
                preserveScroll: true,
                onSuccess: () => {
                    setDialogOpen(false);
                    reset();
                },
            });
        }
    }

    function handleResetPassword(user: UserItem) {
        if (window.confirm(`Reset password "${user.name}" ke default (password)?`)) {
            router.post(`/admin/users/${user.id}/reset-password`);
        }
    }

    function handleDelete(user: UserItem) {
        if (window.confirm(`Hapus user "${user.name}"?`)) {
            router.delete(`/admin/users/${user.id}`);
        }
    }

    function handleSearch(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        const value = form.get('search') ? String(form.get('search')) : undefined;
        router.get('/admin/users', value ? { search: value } : {});
    }

    function getInitials(name: string) {
        return name
            .split(' ')
            .filter(Boolean)
            .slice(0, 2)
            .map((part) => part[0])
            .join('')
            .toUpperCase();
    }

    return (
        <>
            <div className="flex h-full flex-1 flex-col gap-6 p-4 lg:p-6">
                {/* Header */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-4">
                        <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-navy to-brand-navy-dark text-white shadow-lg shadow-brand-navy/25">
                            <Users className="h-6 w-6" />
                        </span>
                        <div>
                            <h1 className="text-2xl font-black tracking-tight">Akun Admin</h1>
                            <p className="text-sm text-muted-foreground">
                                Kelola akun administrator panel.
                            </p>
                        </div>
                    </div>
                    <Button
                        onClick={openCreate}
                        className="rounded-full bg-brand-teal px-5 shadow-lg shadow-brand-teal/25 transition-all hover:-translate-y-0.5 hover:bg-brand-teal-dark"
                    >
                        <Plus className="mr-2" />
                        Tambah Admin
                    </Button>
                </div>

                {/* Toolbar */}
                <div className="flex flex-wrap items-center justify-between gap-3">
                    <form onSubmit={handleSearch} className="flex w-full max-w-sm gap-2">
                        <div className="relative flex-1">
                            <Search className="absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                name="search"
                                defaultValue={search ?? ''}
                                placeholder="Cari nama, email..."
                                className="h-10 rounded-full border-border/70 pl-10 shadow-sm"
                            />
                        </div>
                        <Button type="submit" variant="outline" className="h-10 rounded-full">
                            Cari
                        </Button>
                    </form>
                    <span className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-card px-4 py-1.5 text-xs font-semibold text-muted-foreground shadow-sm">
                        {users.total > 0
                            ? `Menampilkan ${users.from ?? 0}–${users.to ?? 0} dari ${users.total} akun`
                            : 'Belum ada data'}
                    </span>
                </div>

                <Card className="overflow-hidden rounded-2xl border-border/70 shadow-sm">
                    <CardContent className="p-0">
                        {users.data.length === 0 ? (
                            <div className="flex flex-col items-center gap-3 px-6 py-16 text-center">
                                <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-navy/10 text-brand-navy">
                                    <Users className="h-7 w-7" />
                                </span>
                                <div>
                                    <p className="text-sm font-bold">Tidak ada akun admin</p>
                                    <p className="mt-1 text-sm text-muted-foreground">
                                        {search
                                            ? 'Tidak ada akun yang cocok dengan pencarian Anda.'
                                            : 'Klik "Tambah Admin" untuk membuat akun baru.'}
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-slate-50/80 hover:bg-slate-50/80">
                                        <TableHead className="pl-6 text-xs font-bold tracking-wider text-muted-foreground uppercase">
                                            Nama
                                        </TableHead>
                                        <TableHead className="text-xs font-bold tracking-wider text-muted-foreground uppercase">
                                            Email
                                        </TableHead>
                                        <TableHead className="text-xs font-bold tracking-wider text-muted-foreground uppercase">
                                            Role
                                        </TableHead>
                                        <TableHead className="text-xs font-bold tracking-wider text-muted-foreground uppercase">
                                            Bergabung
                                        </TableHead>
                                        <TableHead className="pr-6 text-right text-xs font-bold tracking-wider text-muted-foreground uppercase">
                                            Aksi
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {users.data.map((user) => (
                                        <TableRow
                                            key={user.id}
                                            className="group border-border/60 transition-colors hover:bg-brand-teal/[0.03]"
                                        >
                                            <TableCell className="pl-6">
                                                <div className="flex items-center gap-3">
                                                    <span
                                                        className={cn(
                                                            'inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-black ring-2 ring-offset-1',
                                                            user.role === 'admin'
                                                                ? 'bg-gradient-to-br from-brand-teal to-brand-teal-dark text-white ring-brand-teal/20'
                                                                : 'bg-slate-100 text-brand-navy ring-slate-200/60',
                                                        )}
                                                    >
                                                        {getInitials(user.name)}
                                                    </span>
                                                    <div>
                                                        <div className="flex items-center gap-1.5 font-bold text-brand-navy">
                                                            {user.name}
                                                            {user.role === 'admin' && (
                                                                <UserCog className="h-3.5 w-3.5 text-brand-teal-dark" />
                                                            )}
                                                        </div>
                                                        <div className="text-xs text-muted-foreground">
                                                            ID {user.id}
                                                        </div>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-muted-foreground">
                                                {user.email}
                                            </TableCell>
                                            <TableCell>
                                                {user.role === 'admin' ? (
                                                    <Badge className="inline-flex items-center gap-1.5 rounded-full bg-brand-teal/15 px-3 py-1 text-brand-teal-dark">
                                                        <span className="h-1.5 w-1.5 rounded-full bg-brand-teal" />
                                                        Admin
                                                    </Badge>
                                                ) : (
                                                    <Badge className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-slate-600">
                                                        <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
                                                        User
                                                    </Badge>
                                                )}
                                            </TableCell>
                                            <TableCell className="text-muted-foreground">
                                                {user.created_at}
                                            </TableCell>
                                            <TableCell className="pr-6">
                                                <div className="flex justify-end gap-1.5">
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        title="Edit akun"
                                                        className="h-8 w-8 rounded-full text-muted-foreground hover:bg-brand-teal/10 hover:text-brand-teal-dark"
                                                        onClick={() => openEdit(user)}
                                                    >
                                                        <Pencil className="h-4 w-4" />
                                                        <span className="sr-only">Edit</span>
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        title="Reset password"
                                                        className="h-8 w-8 rounded-full text-muted-foreground hover:bg-amber-50 hover:text-amber-600"
                                                        onClick={() => handleResetPassword(user)}
                                                    >
                                                        <KeyRound className="h-4 w-4" />
                                                        <span className="sr-only">Reset password</span>
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        title="Hapus akun"
                                                        className="h-8 w-8 rounded-full text-muted-foreground hover:bg-red-50 hover:text-red-600"
                                                        onClick={() => handleDelete(user)}
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                        <span className="sr-only">Hapus</span>
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        )}
                    </CardContent>
                    {users.data.length > 0 && (
                        <CardFooter className="border-t border-border/60 py-4">
                            <Pagination pagination={users} className="w-full justify-center" />
                        </CardFooter>
                    )}
                </Card>
            </div>

            {/* Create / Edit dialog */}
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogContent className="rounded-3xl sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle className="text-lg font-black">
                            {editing ? 'Edit Akun Admin' : 'Tambah Akun Admin'}
                        </DialogTitle>
                        <DialogDescription>
                            {editing
                                ? 'Perbarui informasi akun admin.'
                                : 'Password awal default: password. Semua akun yang dibuat otomatis berperan sebagai admin.'}
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="grid gap-5">
                        <div className="grid gap-2">
                            <Label htmlFor="name">
                                Nama Lengkap <span className="text-destructive">*</span>
                            </Label>
                            <Input
                                id="name"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                placeholder="Nama lengkap"
                                required
                                className="h-11 rounded-xl border-border/70 shadow-sm"
                            />
                            <InputError message={errors.name} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="email">
                                Email <span className="text-destructive">*</span>
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                placeholder="email@example.com"
                                required
                                className="h-11 rounded-xl border-border/70 shadow-sm"
                            />
                            <InputError message={errors.email} />
                        </div>
                        <DialogFooter>
                            <Button
                                type="submit"
                                disabled={processing}
                                className="h-11 w-full rounded-full bg-brand-teal font-bold shadow-lg shadow-brand-teal/25 transition-all hover:-translate-y-0.5 hover:bg-brand-teal-dark"
                            >
                                {processing ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Menyimpan...
                                    </>
                                ) : editing ? (
                                    'Perbarui'
                                ) : (
                                    'Simpan'
                                )}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
}

AdminUsersIndex.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/admin' },
        { title: 'Akun Admin', href: '/admin/users' },
    ],
};
