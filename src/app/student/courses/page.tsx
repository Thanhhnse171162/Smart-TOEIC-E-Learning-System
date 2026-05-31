import { BookOpen, Users } from "lucide-react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { studentSidebarItems } from "@/lib/navigation";

const courses = [
  { title: "TOEIC Listening Mastery", desc: "Master all 4 listening parts", level: "Intermediate", lessons: 24, students: 1250, progress: 65 },
  { title: "TOEIC Reading Strategies", desc: "Advanced reading techniques", level: "Advanced", lessons: 20, students: 980, progress: 40 },
  { title: "Business English for TOEIC", desc: "Essential business vocabulary", level: "Beginner", lessons: 16, students: 2100, progress: 80 },
];

export default function CoursesPage() {
  return (
    <DashboardLayout sidebarItems={studentSidebarItems} title="Courses" subtitle="Continue your learning">
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {courses.map((c) => (
          <Card key={c.title} className="rounded-xl hover:shadow-md transition-shadow">
            <div className="h-32 rounded-t-xl bg-gradient-to-br from-brand-100 to-brand-200 dark:from-brand-900/30 dark:to-brand-800/20 flex items-center justify-center">
              <BookOpen className="h-12 w-12 text-primary" />
            </div>
            <CardHeader>
              <div className="flex items-center justify-between">
                <Badge variant="secondary">{c.level}</Badge>
                <span className="text-xs text-muted-foreground flex items-center gap-1"><Users className="h-3 w-3" />{c.students}</span>
              </div>
              <CardTitle className="text-lg">{c.title}</CardTitle>
              <CardDescription>{c.desc}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <div className="flex justify-between text-xs mb-1"><span>{c.lessons} lessons</span><span>{c.progress}%</span></div>
                <Progress value={c.progress} className="h-2" />
              </div>
              <Button className="w-full rounded-xl">Continue Learning</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  );
}
