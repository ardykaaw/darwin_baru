import { Link, router } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';
import {
    ExternalLink,
    FolderOpen,
    Images,
    LayoutGrid,
    LogOut,
    Newspaper,
    PanelLeft,
    Users,
} from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { AppearanceToggle } from '@/components/appearance-toggle';
import { UserInfo } from '@/components/user-info';
import { useCurrentUrl } from '@/hooks/use-current-url';
import type { NavItem, User } from '@/types';

const mainNavItems: NavItem[] = [
    { title: 'Dashboard', href: '/admin', icon: LayoutGrid },
    { title: 'Aktivitas', href: '/admin/activities', icon: FolderOpen },
    { title: 'Berita', href: '/admin/news', icon: Newspaper },
    { title: 'Galeri', href: '/admin/galleries', icon: Images },
    { title: 'Laporan', href: '/admin/reports', icon: PanelLeft },
    { title: 'Akun Admin', href: '/admin/users', icon: Users },
];

export function AdminSidebar() {
    const { auth } = usePage().props as { auth: { user?: User } };
    const { isCurrentOrParentUrl } = useCurrentUrl();

    function handleLogout() {
        router.post('/admin/logout');
    }

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/admin" prefetch>
                                <span className="flex aspect-square size-12 items-center justify-center overflow-hidden rounded-xl bg-brand-teal/10">
                                    <img
                                        src="/images/dc-logo.png"
                                        alt="Darwin Center"
                                        className="size-11 object-contain"
                                    />
                                </span>
                                <span className="flex flex-col leading-none">
                                    <span className="text-lg font-black tracking-tight text-brand-navy dark:text-white">
                                        Darwin
                                        <span className="font-light text-brand-gray dark:text-slate-400">Center</span>
                                    </span>
                                    <span className="mt-1 text-[9px] font-bold uppercase tracking-[0.25em] text-brand-teal-dark">
                                        Admin Panel
                                    </span>
                                </span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <SidebarGroup className="px-2 py-0">
                    <SidebarGroupLabel>Administrasi</SidebarGroupLabel>
                    <SidebarMenu>
                        {mainNavItems.map((item) => (
                            <SidebarMenuItem key={item.title}>
                                <SidebarMenuButton
                                    asChild
                                    isActive={isCurrentOrParentUrl(item.href)}
                                    tooltip={{ children: item.title }}
                                    className="[&[data-active='true']]:bg-brand-teal/10 [&[data-active='true']]:text-brand-teal-dark dark:[&[data-active='true']]:bg-brand-teal/20 dark:[&[data-active='true']]:text-brand-teal-light"
                                >
                                    <Link href={item.href} prefetch>
                                        {item.icon && <item.icon />}
                                        <span>{item.title}</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroup>

                <SidebarGroup className="px-2 py-0">
                    <SidebarGroupLabel>Situs Publik</SidebarGroupLabel>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton asChild tooltip={{ children: 'Lihat Situs' }}>
                                <Link href="/" target="_blank">
                                    <ExternalLink />
                                    <span>Lihat Situs</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton
                                    size="lg"
                                    className="group text-sidebar-accent-foreground data-[state=open]:bg-sidebar-accent"
                                >
                                    {auth.user && <UserInfo user={auth.user} />}
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg" align="end">
                                <DropdownMenuLabel className="p-0 font-normal">
                                    <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                        {auth.user && <UserInfo user={auth.user} showEmail />}
                                    </div>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <div className="px-2 py-1.5">
                                    <div className="mb-1.5 text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                                        Tema Tampilan
                                    </div>
                                    <AppearanceToggle variant="tabs" className="w-full justify-between" />
                                </div>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={handleLogout} data-test="logout-button">
                                    <LogOut className="mr-2" />
                                    Keluar
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    );
}
