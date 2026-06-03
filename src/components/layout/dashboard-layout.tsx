import { DashboardHeader } from "@/components/layout/dashboard-header";
import { type SidebarItem } from "@/components/layout/dashboard-sidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
  sidebarItems?: SidebarItem[];
  title: string;
  subtitle?: string;
  sidebarTitle?: string;
  userName?: string;
  headerContent?: React.ReactNode;
}

export function DashboardLayout({ children, title, subtitle, userName, headerContent }: DashboardLayoutProps) {
  return (
    <>
      <DashboardHeader title={title} subtitle={subtitle} userName={userName}>
        {headerContent}
      </DashboardHeader>
      <main className="flex-1 p-4 lg:p-6">{children}</main>
    </>
  );
}
