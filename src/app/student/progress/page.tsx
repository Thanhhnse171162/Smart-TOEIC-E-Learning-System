"use client";

import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Award, BookOpen, Clock, Flame, Star, Trophy } from "lucide-react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { studentSidebarItems } from "@/lib/navigation";

const scoreHistory = [
  { month: "Jan", score: 620 }, { month: "Feb", score: 680 }, { month: "Mar", score: 710 },
  { month: "Apr", score: 745 }, { month: "May", score: 770 }, { month: "Jun", score: 785 },
];

const studyHours = [
  { day: "Mon", hours: 2.5 }, { day: "Tue", hours: 1.8 }, { day: "Wed", hours: 3.2 },
  { day: "Thu", hours: 2.0 }, { day: "Fri", hours: 1.5 }, { day: "Sat", hours: 4.0 }, { day: "Sun", hours: 2.5 },
];

const skillDistribution = [
  { name: "Listening", value: 45, color: "#2563eb" },
  { name: "Reading", value: 35, color: "#16a34a" },
  { name: "Vocabulary", value: 12, color: "#9333ea" },
  { name: "Grammar", value: 8, color: "#ea580c" },
];

const achievements = [
  { title: "7-Day Streak", icon: Flame, unlocked: true },
  { title: "100 Vocabulary", icon: BookOpen, unlocked: true },
  { title: "First Mock Test", icon: Trophy, unlocked: true },
  { title: "TOEIC 700+", icon: Star, unlocked: true },
  { title: "TOEIC 850+", icon: Award, unlocked: false },
];

const leaderboard = [
  { rank: 1, name: "Minh Tran", score: 945 },
  { rank: 2, name: "Lan Nguyen", score: 920 },
  { rank: 3, name: "Hoang Le", score: 905 },
  { rank: 4, name: "Nguyen Van A", score: 785, you: true },
  { rank: 5, name: "Thu Pham", score: 770 },
];

export default function ProgressPage() {
  return (
    <DashboardLayout sidebarItems={studentSidebarItems} title="Progress Tracking" subtitle="Your learning journey">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
        {[
          { label: "Current Score", value: "785", icon: Star },
          { label: "Learning Streak", value: "14 days", icon: Flame },
          { label: "Study Hours", value: "48 hrs", icon: Clock },
          { label: "Vocabulary", value: "342", icon: BookOpen },
        ].map((s) => (
          <Card key={s.label} className="rounded-xl">
            <CardContent className="pt-6 flex items-center gap-4">
              <div className="rounded-xl bg-primary/10 p-3"><s.icon className="h-5 w-5 text-primary" /></div>
              <div>
                <p className="text-sm text-muted-foreground">{s.label}</p>
                <p className="text-xl font-bold">{s.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3 mb-6">
        <Card className="rounded-xl lg:col-span-2">
          <CardHeader><CardTitle>TOEIC Score History</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={scoreHistory}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" /><YAxis domain={[500, 990]} /><Tooltip />
                <Line type="monotone" dataKey="score" stroke="#2563eb" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card className="rounded-xl">
          <CardHeader><CardTitle>Skill Distribution</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={skillDistribution} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                  {skillDistribution.map((e) => <Cell key={e.name} fill={e.color} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card className="rounded-xl mb-6">
        <CardHeader><CardTitle>Weekly Study Hours</CardTitle></CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={studyHours}>
              <CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="day" /><YAxis /><Tooltip />
              <Bar dataKey="hours" fill="#2563eb" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="rounded-xl">
          <CardHeader><CardTitle>Achievement Badges</CardTitle></CardHeader>
          <CardContent className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {achievements.map((a) => (
              <div key={a.title} className={`flex flex-col items-center rounded-xl border p-4 text-center ${a.unlocked ? "" : "opacity-40 grayscale"}`}>
                <div className={`rounded-full p-3 mb-2 ${a.unlocked ? "bg-primary/10" : "bg-muted"}`}>
                  <a.icon className={`h-6 w-6 ${a.unlocked ? "text-primary" : "text-muted-foreground"}`} />
                </div>
                <p className="text-xs font-medium">{a.title}</p>
                {a.unlocked && <Badge variant="success" className="mt-2 text-xs">Unlocked</Badge>}
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="rounded-xl">
          <CardHeader><CardTitle>Leaderboard</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {leaderboard.map((e) => (
              <div key={e.rank} className={`flex items-center gap-3 rounded-xl p-3 ${e.you ? "bg-primary/5 border border-primary/20" : ""}`}>
                <span className="font-bold text-lg w-8 text-center text-muted-foreground">#{e.rank}</span>
                <Avatar className="h-8 w-8">
                  <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${e.name}`} />
                  <AvatarFallback>{e.name[0]}</AvatarFallback>
                </Avatar>
                <span className="flex-1 font-medium text-sm">{e.name}{e.you && " (You)"}</span>
                <Badge>{e.score}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
