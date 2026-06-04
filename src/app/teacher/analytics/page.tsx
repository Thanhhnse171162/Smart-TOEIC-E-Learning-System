"use client";

import React, { useState } from "react";
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, RadialBarChart, RadialBar,
} from "recharts";
import {
  TrendingUp, Target, Users, Award, BarChart3, ArrowUpRight, ArrowDownRight,
  Mic, PenLine, BookOpen, AlertTriangle, CheckCircle2, Clock, Zap,
  FileText, HelpCircle, ChevronDown,
} from "lucide-react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { teacherSidebarItems } from "@/lib/navigation";

// --- Mock Data ---
const scoreTrendData = [
  { month: "Oct", avg: 660, listening: 325, reading: 335 },
  { month: "Nov", avg: 685, listening: 340, reading: 345 },
  { month: "Dec", avg: 700, listening: 348, reading: 352 },
  { month: "Jan", avg: 715, listening: 358, reading: 357 },
  { month: "Feb", avg: 730, listening: 368, reading: 362 },
  { month: "Mar", avg: 742, listening: 375, reading: 367 },
];

const partPerformance = [
  { part: "Part 1", accuracy: 85, attempts: 450, label: "Photos" },
  { part: "Part 2", accuracy: 72, attempts: 420, label: "Q&A" },
  { part: "Part 3", accuracy: 65, attempts: 390, label: "Conversations" },
  { part: "Part 4", accuracy: 68, attempts: 380, label: "Talks" },
  { part: "Part 5", accuracy: 78, attempts: 510, label: "Incomplete Sent." },
  { part: "Part 6", accuracy: 62, attempts: 340, label: "Text Completion" },
  { part: "Part 7", accuracy: 58, attempts: 420, label: "Reading Comp." },
];

const scoreDistribution = [
  { range: "900+", count: 8, color: "#10b981" },
  { range: "800-895", count: 22, color: "#34d399" },
  { range: "700-795", count: 45, color: "#6366f1" },
  { range: "600-695", count: 38, color: "#818cf8" },
  { range: "500-595", count: 28, color: "#f59e0b" },
  { range: "<500", count: 15, color: "#ef4444" },
];

const difficultQuestions = [
  { id: "Q1089", text: "Part 3 — Inference about speaker's intention", errorRate: 78, attempts: 134, part: 3 },
  { id: "Q1156", text: "Part 7 — Double passage cross-reference", errorRate: 72, attempts: 98, part: 7 },
  { id: "Q1023", text: "Part 6 — Sentence insertion (email context)", errorRate: 68, attempts: 156, part: 6 },
  { id: "Q0945", text: "Part 5 — Subjunctive mood in conditional", errorRate: 65, attempts: 210, part: 5 },
  { id: "Q1201", text: "Part 4 — Main topic of the announcement", errorRate: 61, attempts: 89, part: 4 },
];

const topStudents = [
  { name: "Nguyen Van A", score: 920, change: +30, avatar: "A" },
  { name: "Tran Thi C", score: 895, change: +45, avatar: "C" },
  { name: "Le Van D", score: 870, change: +15, avatar: "D" },
  { name: "Pham Thi E", score: 845, change: -10, avatar: "E" },
  { name: "Hoang Van F", score: 830, change: +20, avatar: "F" },
];

const testCompletionData = [
  { name: "Full Mock #1", completion: 89, total: 89 },
  { name: "Listening Set A", completion: 95, total: 124 },
  { name: "Full Mock #2", completion: 72, total: 45 },
  { name: "Part 3&4 Focus", completion: 85, total: 210 },
];

export default function TeacherAnalyticsPage() {
  const [period, setPeriod] = useState("6months");

  const stats = [
    { label: "Avg. TOEIC Score", value: "742", icon: Target, change: "+18", up: true, color: "indigo" },
    { label: "Active Students", value: "156", icon: Users, change: "+12", up: true, color: "emerald" },
    { label: "Completion Rate", value: "78%", icon: CheckCircle2, change: "+4%", up: true, color: "violet" },
    { label: "Tests Taken", value: "1,015", icon: BarChart3, change: "+89", up: true, color: "amber" },
  ];

  const colorMap: Record<string, { iconBg: string }> = {
    indigo: { iconBg: "bg-gradient-to-br from-indigo-500 to-indigo-600" },
    emerald: { iconBg: "bg-gradient-to-br from-emerald-500 to-emerald-600" },
    violet: { iconBg: "bg-gradient-to-br from-violet-500 to-violet-600" },
    amber: { iconBg: "bg-gradient-to-br from-amber-500 to-amber-600" },
  };

  return (
    <DashboardLayout sidebarItems={teacherSidebarItems} title="Analytics" subtitle="Student performance insights & question analysis" userName="Tran Thi B">
      <div className="max-w-[1400px] mx-auto pb-10 space-y-6">

        {/* Period Selector + Stats */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1 bg-slate-100 rounded-xl p-1">
            {[
              { key: "30days", label: "30 Days" },
              { key: "3months", label: "3 Months" },
              { key: "6months", label: "6 Months" },
              { key: "1year", label: "1 Year" },
            ].map((p) => (
              <button
                key={p.key}
                onClick={() => setPeriod(p.key)}
                className={`px-3.5 py-2 rounded-lg text-[12px] font-bold transition-all ${period === p.key ? "bg-white text-slate-800 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s) => {
            const c = colorMap[s.color];
            const Icon = s.icon;
            return (
              <div key={s.label} className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div className={`w-10 h-10 rounded-xl ${c.iconBg} flex items-center justify-center shadow-sm`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <span className={`inline-flex items-center gap-0.5 text-[11px] font-bold ${s.up ? 'text-emerald-600' : 'text-rose-500'}`}>
                    {s.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                    {s.change}
                  </span>
                </div>
                <p className="text-2xl font-black text-slate-800 mb-0.5">{s.value}</p>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{s.label}</p>
              </div>
            );
          })}
        </div>

        {/* Charts Row 1 */}
        <div className="grid gap-6 lg:grid-cols-5">
          {/* Score Trend */}
          <Card className="rounded-2xl border-slate-100 shadow-sm lg:col-span-3">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-[15px] font-extrabold text-slate-800">Score Trend</CardTitle>
                  <p className="text-xs font-medium text-slate-500 mt-0.5">Average TOEIC score progression</p>
                </div>
                <div className="flex items-center gap-4 text-xs font-bold">
                  <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-indigo-500"></span> Listening</span>
                  <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Reading</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={280}>
                <LineChart data={scoreTrendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="month" tick={{ fontSize: 12, fontWeight: 600, fill: '#94a3b8' }} />
                  <YAxis tick={{ fontSize: 12, fontWeight: 600, fill: '#94a3b8' }} domain={[300, 400]} />
                  <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.08)', fontSize: '13px', fontWeight: 600 }} />
                  <Line type="monotone" dataKey="listening" stroke="#6366f1" strokeWidth={2.5} dot={{ r: 4, fill: '#6366f1' }} />
                  <Line type="monotone" dataKey="reading" stroke="#10b981" strokeWidth={2.5} dot={{ r: 4, fill: '#10b981' }} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Score Distribution */}
          <Card className="rounded-2xl border-slate-100 shadow-sm lg:col-span-2">
            <CardHeader className="pb-2">
              <CardTitle className="text-[15px] font-extrabold text-slate-800">Score Distribution</CardTitle>
              <p className="text-xs font-medium text-slate-500">Students by score range</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {scoreDistribution.map((item) => {
                  const total = scoreDistribution.reduce((s, i) => s + i.count, 0);
                  const pct = Math.round((item.count / total) * 100);
                  return (
                    <div key={item.range} className="flex items-center gap-3">
                      <span className="text-[12px] font-bold text-slate-600 w-16 shrink-0">{item.range}</span>
                      <div className="flex-1 h-6 bg-slate-50 rounded-lg overflow-hidden border border-slate-100">
                        <div
                          className="h-full rounded-lg flex items-center justify-end pr-2 transition-all"
                          style={{ width: `${pct}%`, backgroundColor: item.color }}
                        >
                          {pct > 15 && <span className="text-[10px] font-bold text-white">{item.count}</span>}
                        </div>
                      </div>
                      <span className="text-[11px] font-bold text-slate-500 w-10 text-right">{pct}%</span>
                    </div>
                  );
                })}
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] font-semibold text-slate-400">Total: {scoreDistribution.reduce((s, i) => s + i.count, 0)} students</span>
                <span className="text-[11px] font-bold text-emerald-600 flex items-center gap-1">
                  <ArrowUpRight className="w-3 h-3" /> 19% scored 800+
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row 2 */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Part Performance */}
          <Card className="rounded-2xl border-slate-100 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-[15px] font-extrabold text-slate-800">Accuracy by Part</CardTitle>
              <p className="text-xs font-medium text-slate-500">Average correct rate per TOEIC part</p>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={partPerformance} layout="vertical" margin={{ left: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
                  <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 11, fontWeight: 600, fill: '#94a3b8' }} unit="%" />
                  <YAxis type="category" dataKey="part" tick={{ fontSize: 12, fontWeight: 700, fill: '#475569' }} width={55} />
                  <Tooltip
                    contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '13px', fontWeight: 600 }}
                    formatter={(value: number) => [`${value}%`, 'Accuracy']}
                  />
                  <Bar dataKey="accuracy" radius={[0, 8, 8, 0]} barSize={22}>
                    {partPerformance.map((entry, index) => (
                      <Cell
                        key={index}
                        fill={entry.accuracy >= 75 ? '#10b981' : entry.accuracy >= 60 ? '#f59e0b' : '#ef4444'}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
              <div className="flex items-center justify-center gap-5 mt-2 text-[11px] font-bold">
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> ≥75% Good</span>
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span> 60-74% Fair</span>
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span> &lt;60% Needs Focus</span>
              </div>
            </CardContent>
          </Card>

          {/* Most Difficult Questions */}
          <Card className="rounded-2xl border-slate-100 shadow-sm">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-[15px] font-extrabold text-slate-800">Most Difficult Questions</CardTitle>
                  <p className="text-xs font-medium text-slate-500">Questions with highest error rate</p>
                </div>
                <Badge className="bg-rose-50 text-rose-600 border border-rose-100 shadow-none text-[10px] font-bold">
                  <AlertTriangle className="w-3 h-3 mr-1" /> Needs Attention
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {difficultQuestions.map((q, i) => (
                <div key={q.id} className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 hover:border-rose-100 hover:bg-rose-50/30 transition-all">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-[12px] font-black shrink-0 ${
                    i === 0 ? 'bg-rose-500 text-white' : i === 1 ? 'bg-rose-400 text-white' : 'bg-rose-100 text-rose-600'
                  }`}>
                    {i + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-slate-400 bg-slate-50 border border-slate-100 px-1.5 py-0.5 rounded">#{q.id}</span>
                      <Badge className={`${q.part <= 4 ? 'bg-indigo-50 text-indigo-600 border-indigo-100' : 'bg-emerald-50 text-emerald-600 border-emerald-100'} border text-[9px] font-bold px-1.5 py-0 shadow-none`}>
                        Part {q.part}
                      </Badge>
                    </div>
                    <p className="text-[12px] font-semibold text-slate-700 mt-1 truncate">{q.text}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-[15px] font-black text-rose-600">{q.errorRate}%</p>
                    <p className="text-[10px] text-slate-400 font-medium">{q.attempts} attempts</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Bottom Row */}
        <div className="grid gap-6 lg:grid-cols-5">
          {/* Top Students */}
          <Card className="rounded-2xl border-slate-100 shadow-sm lg:col-span-2">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-[15px] font-extrabold text-slate-800">Top Performers</CardTitle>
                <Award className="w-5 h-5 text-amber-500" />
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              {topStudents.map((student, i) => (
                <div key={student.name} className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-[12px] font-black shrink-0 ${
                    i === 0 ? 'bg-amber-400 text-white' : i === 1 ? 'bg-slate-300 text-white' : i === 2 ? 'bg-amber-600 text-white' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {i + 1}
                  </div>
                  <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-[12px] font-bold text-indigo-600 shrink-0">
                    {student.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-bold text-slate-800 truncate">{student.name}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-[14px] font-black text-slate-800">{student.score}</p>
                    <span className={`text-[10px] font-bold flex items-center justify-end gap-0.5 ${student.change >= 0 ? 'text-emerald-600' : 'text-rose-500'}`}>
                      {student.change >= 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                      {Math.abs(student.change)}
                    </span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Test Completion Rates */}
          <Card className="rounded-2xl border-slate-100 shadow-sm lg:col-span-3">
            <CardHeader className="pb-3">
              <CardTitle className="text-[15px] font-extrabold text-slate-800">Test Completion Rates</CardTitle>
              <p className="text-xs font-medium text-slate-500">How many students finished each test</p>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={testCompletionData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="name" tick={{ fontSize: 11, fontWeight: 600, fill: '#94a3b8' }} />
                  <YAxis tick={{ fontSize: 11, fontWeight: 600, fill: '#94a3b8' }} unit="%" />
                  <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '13px', fontWeight: 600 }} />
                  <Bar dataKey="completion" fill="#6366f1" radius={[8, 8, 0, 0]} barSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

      </div>
    </DashboardLayout>
  );
}
