"use client";

import React from "react";
import Link from "next/link";
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell,
} from "recharts";
import {
  BookOpen, ClipboardList, TrendingUp, Users, HelpCircle, FileText, Plus,
  ArrowUpRight, ArrowDownRight, Mic, PenLine, Clock, CheckCircle2, AlertCircle,
  Zap, Target, Award, Calendar,
} from "lucide-react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { teacherSidebarItems } from "@/lib/navigation";

// --- Mock Data ---
const stats = [
  { label: "Total Questions", value: "1,250", icon: HelpCircle, change: "+48 this week", up: true, color: "indigo", gradient: "from-indigo-500 to-indigo-600" },
  { label: "Total Tests", value: "24", icon: ClipboardList, change: "+3 this month", up: true, color: "emerald", gradient: "from-emerald-500 to-emerald-600" },
  { label: "Active Students", value: "156", icon: Users, change: "+12 this week", up: true, color: "violet", gradient: "from-violet-500 to-violet-600" },
  { label: "Avg. Score", value: "742", icon: Target, change: "+18 vs last month", up: true, color: "amber", gradient: "from-amber-500 to-amber-600" },
];

const scoreTrend = [
  { month: "Jan", listening: 340, reading: 340 },
  { month: "Feb", listening: 355, reading: 345 },
  { month: "Mar", listening: 360, reading: 355 },
  { month: "Apr", listening: 370, reading: 360 },
  { month: "May", listening: 375, reading: 363 },
  { month: "Jun", listening: 380, reading: 362 },
];

const questionDistribution = [
  { name: "Part 1", value: 150, color: "#6366f1" },
  { name: "Part 2", value: 150, color: "#818cf8" },
  { name: "Part 3", value: 150, color: "#a5b4fc" },
  { name: "Part 4", value: 150, color: "#c7d2fe" },
  { name: "Part 5", value: 200, color: "#10b981" },
  { name: "Part 6", value: 200, color: "#34d399" },
  { name: "Part 7", value: 250, color: "#6ee7b7" },
];

const recentTests = [
  { id: 1, title: "Full Mock Test #5", type: "Full Test", status: "Published", students: 45, avgScore: 725, date: "2 hours ago" },
  { id: 2, title: "Listening Practice Set B", type: "Mini Test", status: "Published", students: 89, avgScore: 380, date: "1 day ago" },
  { id: 3, title: "Reading Part 7 Focus", type: "Practice", status: "Draft", students: 0, avgScore: 0, date: "3 days ago" },
];

const recentActivities = [
  { icon: CheckCircle2, text: "Nguyen Van A completed Full Mock Test #5", detail: "Score: 780", time: "15 min ago", color: "text-emerald-500" },
  { icon: Plus, text: "Added 12 new questions to Part 5 bank", detail: "Grammar category", time: "1 hour ago", color: "text-indigo-500" },
  { icon: Users, text: "3 new students enrolled in Listening Mastery", detail: "Total: 1,253 students", time: "2 hours ago", color: "text-violet-500" },
  { icon: AlertCircle, text: "Part 3 Question #Q1089 has 78% error rate", detail: "Consider reviewing", time: "5 hours ago", color: "text-amber-500" },
  { icon: Award, text: "Tran Thi C achieved 900+ score", detail: "Highest in class", time: "1 day ago", color: "text-rose-500" },
];

const colorMap: Record<string, { bg: string; iconBg: string; text: string }> = {
  indigo: { bg: "bg-indigo-50", iconBg: "bg-gradient-to-br from-indigo-500 to-indigo-600", text: "text-indigo-600" },
  emerald: { bg: "bg-emerald-50", iconBg: "bg-gradient-to-br from-emerald-500 to-emerald-600", text: "text-emerald-600" },
  violet: { bg: "bg-violet-50", iconBg: "bg-gradient-to-br from-violet-500 to-violet-600", text: "text-violet-600" },
  amber: { bg: "bg-amber-50", iconBg: "bg-gradient-to-br from-amber-500 to-amber-600", text: "text-amber-600" },
};

export default function TeacherDashboardPage() {
  return (
    <DashboardLayout sidebarItems={teacherSidebarItems} title="Dashboard" subtitle="Welcome back, Teacher!" userName="Tran Thi B">
      <div className="max-w-[1400px] mx-auto pb-10 space-y-6">

        {/* Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s) => {
            const c = colorMap[s.color];
            const Icon = s.icon;
            return (
              <div key={s.label} className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm hover:shadow-md transition-all duration-200 group">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-11 h-11 rounded-xl ${c.iconBg} flex items-center justify-center shadow-sm`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <span className={`inline-flex items-center gap-1 text-[11px] font-bold ${s.up ? 'text-emerald-600' : 'text-rose-500'}`}>
                    {s.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                    {s.change}
                  </span>
                </div>
                <p className="text-2xl font-black text-slate-800 mb-0.5">{s.value}</p>
                <p className="text-xs font-semibold text-slate-500">{s.label}</p>
              </div>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { label: "Create Test", icon: ClipboardList, href: "/teacher/tests/create", color: "bg-indigo-500 hover:bg-indigo-600" },
            { label: "Add Question", icon: Plus, href: "/teacher/questions/add", color: "bg-emerald-500 hover:bg-emerald-600" },
            { label: "View Students", icon: Users, href: "/teacher/students", color: "bg-violet-500 hover:bg-violet-600" },
            { label: "Analytics", icon: TrendingUp, href: "/teacher/analytics", color: "bg-amber-500 hover:bg-amber-600" },
          ].map((action) => (
            <Link key={action.label} href={action.href}>
              <button className={`w-full ${action.color} text-white rounded-xl p-3.5 flex items-center gap-3 transition-all shadow-sm hover:shadow-md group`}>
                <div className="w-9 h-9 rounded-lg bg-white/20 flex items-center justify-center">
                  <action.icon className="w-4.5 h-4.5" />
                </div>
                <span className="font-bold text-[13px]">{action.label}</span>
                <ArrowUpRight className="w-4 h-4 ml-auto opacity-60 group-hover:opacity-100 transition-opacity" />
              </button>
            </Link>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid gap-6 lg:grid-cols-5">
          {/* Score Trend */}
          <Card className="rounded-2xl border-slate-100 shadow-sm lg:col-span-3">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-[15px] font-extrabold text-slate-800">Student Score Trend</CardTitle>
                  <p className="text-xs font-medium text-slate-500 mt-0.5">Average Listening & Reading scores over 6 months</p>
                </div>
                <div className="flex items-center gap-4 text-xs font-bold">
                  <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-indigo-500"></span> Listening</span>
                  <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Reading</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={260}>
                <LineChart data={scoreTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="month" tick={{ fontSize: 12, fontWeight: 600, fill: '#94a3b8' }} />
                  <YAxis tick={{ fontSize: 12, fontWeight: 600, fill: '#94a3b8' }} domain={[300, 400]} />
                  <Tooltip
                    contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.08)', fontSize: '13px', fontWeight: 600 }}
                  />
                  <Line type="monotone" dataKey="listening" stroke="#6366f1" strokeWidth={2.5} dot={{ r: 4, fill: '#6366f1' }} />
                  <Line type="monotone" dataKey="reading" stroke="#10b981" strokeWidth={2.5} dot={{ r: 4, fill: '#10b981' }} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Question Distribution */}
          <Card className="rounded-2xl border-slate-100 shadow-sm lg:col-span-2">
            <CardHeader className="pb-2">
              <CardTitle className="text-[15px] font-extrabold text-slate-800">Question Bank</CardTitle>
              <p className="text-xs font-medium text-slate-500">Distribution by Part</p>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center">
                <ResponsiveContainer width="100%" height={180}>
                  <PieChart>
                    <Pie data={questionDistribution} cx="50%" cy="50%" innerRadius={50} outerRadius={75} paddingAngle={2} dataKey="value">
                      {questionDistribution.map((entry, index) => (
                        <Cell key={index} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '12px', fontWeight: 600 }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 mt-2">
                {questionDistribution.map((item) => (
                  <div key={item.name} className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }}></span>
                    <span className="text-[11px] font-semibold text-slate-600">{item.name}</span>
                    <span className="text-[11px] font-bold text-slate-400 ml-auto">{item.value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bottom Row */}
        <div className="grid gap-6 lg:grid-cols-5">
          {/* Recent Tests */}
          <Card className="rounded-2xl border-slate-100 shadow-sm lg:col-span-3">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-[15px] font-extrabold text-slate-800">Recent Tests</CardTitle>
                <Link href="/teacher/tests">
                  <Button variant="ghost" size="sm" className="text-xs font-bold text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 rounded-lg">
                    View All →
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentTests.map((test) => (
                <div key={test.id} className="flex items-center gap-4 p-3.5 rounded-xl border border-slate-100 hover:border-indigo-100 hover:bg-slate-50/50 transition-all group">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-sm ${test.type === 'Full Test' ? 'bg-indigo-500' : test.type === 'Mini Test' ? 'bg-emerald-500' : 'bg-amber-500'} text-white`}>
                    <FileText className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <p className="text-[13px] font-bold text-slate-800 truncate">{test.title}</p>
                      {test.status === "Published" ? (
                        <Badge className="bg-emerald-50 text-emerald-700 border border-emerald-100 hover:bg-emerald-50 shadow-none text-[10px] px-1.5 py-0 font-bold">Published</Badge>
                      ) : (
                        <Badge className="bg-amber-50 text-amber-700 border border-amber-100 hover:bg-amber-50 shadow-none text-[10px] px-1.5 py-0 font-bold">Draft</Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-3 text-[11px] text-slate-500 font-medium">
                      <span className="flex items-center gap-1"><Users className="w-3 h-3" /> {test.students} students</span>
                      {test.avgScore > 0 && <span className="flex items-center gap-1"><Target className="w-3 h-3" /> Avg: {test.avgScore}</span>}
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {test.date}</span>
                    </div>
                  </div>
                  <Badge className={`shrink-0 rounded-lg px-2 py-0.5 text-[10px] font-bold shadow-none border ${
                    test.type === 'Full Test' ? 'bg-indigo-50 text-indigo-600 border-indigo-100' :
                    test.type === 'Mini Test' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                    'bg-amber-50 text-amber-600 border-amber-100'
                  }`}>{test.type}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="rounded-2xl border-slate-100 shadow-sm lg:col-span-2">
            <CardHeader className="pb-3">
              <CardTitle className="text-[15px] font-extrabold text-slate-800">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                {recentActivities.map((activity, i) => {
                  const Icon = activity.icon;
                  return (
                    <div key={i} className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors">
                      <div className={`w-8 h-8 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0 mt-0.5`}>
                        <Icon className={`w-4 h-4 ${activity.color}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[12px] font-semibold text-slate-700 leading-snug">{activity.text}</p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-[11px] font-medium text-slate-400">{activity.detail}</span>
                          <span className="text-[10px] text-slate-300">·</span>
                          <span className="text-[10px] font-medium text-slate-400">{activity.time}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

      </div>
    </DashboardLayout>
  );
}
