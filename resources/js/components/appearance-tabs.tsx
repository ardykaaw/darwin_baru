import { AppearanceToggle } from '@/components/appearance-toggle';

export default function AppearanceTabs({ className = '' }: { className?: string }) {
    return <AppearanceToggle variant="tabs" className={className} />;
}
