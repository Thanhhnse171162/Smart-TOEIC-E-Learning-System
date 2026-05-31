import { Plus, Upload } from "lucide-react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { teacherSidebarItems } from "@/lib/navigation";

const tests = [
  { title: "Full Mock Test #1", questions: 200, duration: "2h", status: "Published", students: 89 },
  { title: "Listening Practice Set A", questions: 50, duration: "45m", status: "Published", students: 124 },
  { title: "Reading Mini Test", questions: 30, duration: "30m", status: "Draft", students: 0 },
];

export default function TeacherTestsPage() {
  return (
    <DashboardLayout sidebarItems={teacherSidebarItems} title="Test Management" sidebarTitle="Teacher Portal" userName="Tran Thi B">
      <div className="flex justify-between mb-6">
        <p className="text-muted-foreground">Create and manage TOEIC tests</p>
        <Button className="rounded-xl gap-2"><Plus className="h-4 w-4" />Create TOEIC Test</Button>
      </div>
      <div className="grid gap-4">
        {tests.map((t) => (
          <Card key={t.title} className="rounded-xl">
            <CardContent className="pt-6 flex flex-wrap items-center justify-between gap-4">
              <div>
                <h3 className="font-semibold">{t.title}</h3>
                <p className="text-sm text-muted-foreground">{t.questions} questions · {t.duration} · {t.students} students</p>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant={t.status === "Published" ? "default" : "secondary"}>{t.status}</Badge>
                <Button variant="outline" size="sm" className="rounded-xl">Edit</Button>
                <Button variant="outline" size="sm" className="rounded-xl gap-1"><Upload className="h-3 w-3" />Upload Audio</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  );
}
