"use client";

import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { BookOpen, ClipboardList, TrendingUp, Users } from "lucide-react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { teacherSidebarItems } from "@/lib/navigation";

const stats = [
  { label: "Total Students", value: "156", icon: Users },
  { label: "Active Courses", value: "8", icon: BookOpen },
  { label: "Tests Created", value: "24", icon: ClipboardList },
  { label: "Avg. Score", value: "742", icon: TrendingUp },
];

const scoreData = [
  { month: "Jan", score: 680 }, { month: "Feb", score: 700 }, { month: "Mar", score: 715 },
  { month: "Apr", score: 730 }, { month: "May", score: 738 }, { month: "Jun", score: 742 },
];

export default function TeacherDashboardPage() {
  return (
    <DashboardLayout sidebarItems={teacherSidebarItems} title="Teacher Dashboard" subtitle="Overview" sidebarTitle="Teacher Portal" userName="Tran Thi B">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4 mb-6">
        {stats.map((s) => (
          <Card key={s.label} className="rounded-xl">
            <CardContent className="pt-6 flex items-center gap-4">
              <div className="rounded-xl bg-primary/10 p-3"><s.icon className="h-5 w-5 text-primary" /></div>
              <div>
                <p className="text-sm text-muted-foreground">{s.label}</p>
                <p className="text-2xl font-bold">{s.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="rounded-xl">
          <CardHeader><CardTitle>Average Student Score Trend</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={scoreData}>
                <CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="month" /><YAxis /><Tooltip />
                <Line type="monotone" dataKey="score" stroke="#2563eb" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="rounded-xl">
          <CardHeader><CardTitle>Recent Activity</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {[
              "Student Nguyen Van A completed Mock Test #5 — Score: 780",
              "New question added to Part 5 bank",
              "Course 'Listening Mastery' updated",
              "15 students completed today's practice",
            ].map((a, i) => (
              <div key={i} className="flex items-start gap-3 rounded-xl border p-3 text-sm">
                <div className="mt-1.5 h-2 w-2 rounded-full bg-primary shrink-0" />
                {a}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
