import { DashboardSidebar } from "@/components/layout/dashboard-sidebar";
import { teacherSidebarItems } from "@/lib/navigation";

export default function TeacherLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-muted/30">
      <DashboardSidebar items={teacherSidebarItems} />
      <div className="flex flex-1 flex-col lg:ml-0">
        {children}
      </div>
    </div>
  );
}
