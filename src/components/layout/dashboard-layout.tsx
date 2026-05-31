import { DashboardHeader } from "@/components/layout/dashboard-header";
import { DashboardSidebar, type SidebarItem } from "@/components/layout/dashboard-sidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
  sidebarItems: SidebarItem[];
  title: string;
  subtitle?: string;
  sidebarTitle?: string;
  userName?: string;
}

export function DashboardLayout({ children, sidebarItems, title, subtitle, sidebarTitle, userName }: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen bg-muted/30">
      <DashboardSidebar items={sidebarItems} title={sidebarTitle} />
      <div className="flex flex-1 flex-col lg:ml-0">
        <DashboardHeader title={title} subtitle={subtitle} userName={userName} />
        <main className="flex-1 p-4 lg:p-6">{children}</main>
      </div>
    </div>
  );
}
