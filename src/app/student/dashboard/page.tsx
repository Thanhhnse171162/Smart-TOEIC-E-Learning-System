"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { BookOpen, Clock, Star, Target } from "lucide-react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { studentSidebarItems } from "@/lib/navigation";

const stats = [
  { label: "Current TOEIC Score", value: "785", icon: Star, color: "text-primary" },
  { label: "Weekly Study Time", value: "12.5 hrs", icon: Clock, color: "text-orange-500" },
  { label: "Completed Lessons", value: "48", icon: BookOpen, color: "text-green-500" },
  { label: "Vocabulary Learned", value: "342", icon: Target, color: "text-purple-500" },
];

const scoreHistory = [
  { month: "Jan", score: 620 }, { month: "Feb", score: 680 }, { month: "Mar", score: 710 },
  { month: "Apr", score: 745 }, { month: "May", score: 770 }, { month: "Jun", score: 785 },
];

const performance = [{ skill: "Listening", score: 395 }, { skill: "Reading", score: 390 }];

const activities = [
  { title: "Completed Part 3 Practice", desc: "Scored 85% on Conversations", time: "2 hours ago" },
  { title: "Learned 15 new words", desc: "Business vocabulary topic", time: "5 hours ago" },
  { title: "Mock Test #5 Completed", desc: "Score: 780", time: "1 day ago" },
];

const goals = [
  { title: "Complete Mock Test #6", progress: 0, date: "Jun 5" },
  { title: "Learn 50 Business Vocabulary", progress: 68, date: "Jun 10" },
  { title: "Achieve 800+ TOEIC Score", progress: 78, date: "Jun 30" },
];

export default function StudentDashboardPage() {
  return (
    <DashboardLayout sidebarItems={studentSidebarItems} title="Dashboard" subtitle="Welcome back, Nguyen Van A!" userName="Nguyen Van A">
      <div className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((s) => (
            <Card key={s.label} className="rounded-xl">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{s.label}</p>
                    <p className="text-2xl font-bold mt-1">{s.value}</p>
                  </div>
                  <div className={`rounded-xl bg-muted p-3 ${s.color}`}>
                    <s.icon className="h-5 w-5" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="rounded-xl">
            <CardHeader><CardTitle>TOEIC Score Progress</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={scoreHistory}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="month" className="text-xs" />
                  <YAxis domain={[500, 990]} className="text-xs" />
                  <Tooltip />
                  <Line type="monotone" dataKey="score" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ fill: "hsl(var(--primary))" }} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="rounded-xl">
            <CardHeader><CardTitle>Listening vs Reading</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={performance}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="skill" />
                  <YAxis domain={[0, 495]} />
                  <Tooltip />
                  <Bar dataKey="score" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="rounded-xl">
            <CardHeader><CardTitle>Recent Activities</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              {activities.map((a) => (
                <div key={a.title} className="flex items-start gap-3 rounded-xl border p-3">
                  <div className="mt-0.5 h-2 w-2 rounded-full bg-primary shrink-0" />
                  <div className="flex-1">
                    <p className="font-medium text-sm">{a.title}</p>
                    <p className="text-xs text-muted-foreground">{a.desc}</p>
                  </div>
                  <Badge variant="secondary" className="text-xs shrink-0">{a.time}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="rounded-xl">
            <CardHeader><CardTitle>Upcoming Learning Goals</CardTitle></CardHeader>
            <CardContent className="space-y-5">
              {goals.map((g) => (
                <div key={g.title}>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium">{g.title}</span>
                    <span className="text-muted-foreground">{g.date}</span>
                  </div>
                  <Progress value={g.progress} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
