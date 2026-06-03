import { DashboardSidebar } from "@/components/layout/dashboard-sidebar";
import { adminSidebarItems } from "@/lib/navigation";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-muted/30">
      <DashboardSidebar items={adminSidebarItems} />
      <div className="flex flex-1 flex-col lg:ml-0">
        {children}
      </div>
    </div>
  );
}
