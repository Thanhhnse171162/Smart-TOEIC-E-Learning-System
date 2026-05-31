import { BookOpen } from "lucide-react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { adminSidebarItems } from "@/lib/navigation";

export default function AdminCoursesPage() {
  const courses = [
    { title: "TOEIC Listening Mastery", students: 1250, revenue: "$12,500", status: "Active" },
    { title: "TOEIC Reading Strategies", students: 980, revenue: "$9,800", status: "Active" },
    { title: "Business English for TOEIC", students: 2100, revenue: "$21,000", status: "Active" },
  ];
  return (
    <DashboardLayout sidebarItems={adminSidebarItems} title="Course Management" sidebarTitle="Admin Panel" userName="Admin">
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {courses.map((c) => (
          <Card key={c.title} className="rounded-xl">
            <div className="h-24 rounded-t-xl bg-gradient-to-br from-brand-100 to-brand-200 dark:from-brand-900/30 flex items-center justify-center">
              <BookOpen className="h-10 w-10 text-primary" />
            </div>
            <CardHeader>
              <CardTitle className="text-base">{c.title}</CardTitle>
              <CardDescription>{c.students} students · {c.revenue} revenue</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-between items-center">
              <Badge>{c.status}</Badge>
              <Button variant="outline" size="sm" className="rounded-xl">Manage</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  );
}
