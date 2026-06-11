"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { teacherSidebarItems } from "@/lib/navigation";

const completionData = [
  { course: "Listening", rate: 85 }, { course: "Reading", rate: 72 },
  { course: "Business", rate: 90 }, { course: "Grammar", rate: 68 },
];

const difficultQuestions = [
  { text: "Part 5: Subjunctive mood question", errorRate: 72 },
  { text: "Part 3: Inference question", errorRate: 65 },
  { text: "Part 7: Double passage question", errorRate: 58 },
];

export default function TeacherAnalyticsPage() {
  return (
    <DashboardLayout sidebarItems={teacherSidebarItems} title="Analytics" sidebarTitle="Teacher Portal" >
      <div className="grid gap-4 sm:grid-cols-3 mb-6">
        {[
          { label: "Average Score", value: "742" },
          { label: "Completion Rate", value: "78%" },
          { label: "Active Students", value: "156" },
        ].map((s) => (
          <Card key={s.label} className="rounded-xl">
            <CardContent className="pt-6 text-center">
              <p className="text-3xl font-bold text-primary">{s.value}</p>
              <p className="text-sm text-muted-foreground mt-1">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="rounded-xl">
          <CardHeader><CardTitle>Completion Rate by Course</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={completionData}>
                <CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="course" /><YAxis /><Tooltip />
                <Bar dataKey="rate" fill="#2563eb" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="rounded-xl">
          <CardHeader><CardTitle>Most Difficult Questions</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            {difficultQuestions.map((q) => (
              <div key={q.text}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="flex-1 mr-4">{q.text}</span>
                  <Badge variant="destructive">{q.errorRate}% errors</Badge>
                </div>
                <div className="h-2 rounded-full bg-muted">
                  <div className="h-full rounded-full bg-red-500" style={{ width: `${q.errorRate}%` }} />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
