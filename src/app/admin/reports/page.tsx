import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { adminSidebarItems } from "@/lib/navigation";

export default function AdminReportsPage() {
  const reports = [
    { title: "Monthly User Activity Report", date: "May 2024", type: "Users" },
    { title: "Revenue Summary Q2", date: "Q2 2024", type: "Finance" },
    { title: "Test Performance Analysis", date: "May 2024", type: "Tests" },
    { title: "Course Engagement Report", date: "May 2024", type: "Courses" },
  ];
  return (
    <DashboardLayout sidebarItems={adminSidebarItems} title="Reports" sidebarTitle="Admin Panel" userName="Admin">
      <div className="grid gap-4 md:grid-cols-2">
        {reports.map((r) => (
          <Card key={r.title} className="rounded-xl">
            <CardHeader><CardTitle className="text-base">{r.title}</CardTitle></CardHeader>
            <CardContent className="flex justify-between items-center">
              <div><p className="text-sm text-muted-foreground">{r.date}</p><p className="text-xs text-muted-foreground mt-1">Type: {r.type}</p></div>
              <Button variant="outline" className="rounded-xl">Download</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  );
}
