import { BookOpen, Plus } from "lucide-react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { teacherSidebarItems } from "@/lib/navigation";

const courses = [
  { title: "TOEIC Listening Mastery", lessons: 24, students: 1250, status: "Active" },
  { title: "TOEIC Reading Strategies", lessons: 20, students: 980, status: "Active" },
  { title: "Business English for TOEIC", lessons: 16, students: 2100, status: "Active" },
];

export default function TeacherCoursesPage() {
  return (
    <DashboardLayout sidebarItems={teacherSidebarItems} title="Courses" sidebarTitle="Teacher Portal" userName="Tran Thi B">
      <div className="flex justify-end mb-6">
        <Button className="rounded-xl gap-2"><Plus className="h-4 w-4" />Create Lesson</Button>
      </div>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {courses.map((c) => (
          <Card key={c.title} className="rounded-xl">
            <div className="h-24 rounded-t-xl bg-gradient-to-br from-brand-100 to-brand-200 dark:from-brand-900/30 flex items-center justify-center">
              <BookOpen className="h-10 w-10 text-primary" />
            </div>
            <CardHeader>
              <div className="flex justify-between"><CardTitle className="text-base">{c.title}</CardTitle><Badge>{c.status}</Badge></div>
              <CardDescription>{c.lessons} lessons · {c.students} students</CardDescription>
            </CardHeader>
            <CardContent><Button variant="outline" className="w-full rounded-xl">Manage Course</Button></CardContent>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  );
}
