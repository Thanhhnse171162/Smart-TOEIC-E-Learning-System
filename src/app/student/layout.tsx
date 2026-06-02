import { DashboardSidebar } from "@/components/layout/dashboard-sidebar";
import { studentSidebarItems } from "@/lib/navigation";

export default function StudentLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-muted/30">
      <DashboardSidebar items={studentSidebarItems} />
      <div className="flex flex-1 flex-col lg:ml-0">
        {children}
      </div>
    </div>
  );
}
