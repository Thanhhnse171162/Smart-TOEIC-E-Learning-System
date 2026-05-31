import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { adminSidebarItems } from "@/lib/navigation";

export default function AdminTestsPage() {
  const tests = [
    { title: "Full Mock Test #1", attempts: 1250, avgScore: 742, status: "Active" },
    { title: "Listening Practice Set A", attempts: 890, avgScore: 680, status: "Active" },
    { title: "Reading Mini Test", attempts: 456, avgScore: 710, status: "Active" },
  ];
  return (
    <DashboardLayout sidebarItems={adminSidebarItems} title="Test Management" sidebarTitle="Admin Panel" userName="Admin">
      <div className="space-y-4">
        {tests.map((t) => (
          <Card key={t.title} className="rounded-xl">
            <CardContent className="pt-6 flex flex-wrap justify-between items-center gap-4">
              <div>
                <h3 className="font-semibold">{t.title}</h3>
                <p className="text-sm text-muted-foreground">{t.attempts} attempts · Avg score: {t.avgScore}</p>
              </div>
              <Badge>{t.status}</Badge>
            </CardContent>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  );
}
