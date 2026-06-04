"use client";

import React, { useState } from "react";
import {
  Search, Users, TrendingUp, Award, Target, ChevronDown, Eye, BarChart3,
  Mail, Clock, ArrowUpRight, ArrowDownRight, Star, BookOpen, CheckCircle2,
  Mic, PenLine, Filter,
} from "lucide-react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { teacherSidebarItems } from "@/lib/navigation";
import { useUsers } from "@/hooks/use-users";
import { getStoredUser } from "@/lib/auth/session";

// Mock student performance data
const studentPerformance: Record<string, {
  latestScore: number;
  prevScore: number;
  listening: number;
  reading: number;
  testsCompleted: number;
  lastActive: string;
  level: string;
  streak: number;
}> = {
  default: { latestScore: 650, prevScore: 620, listening: 320, reading: 330, testsCompleted: 8, lastActive: "2 hours ago", level: "B1", streak: 5 },
};

const getPerformance = (name: string) => {
  // Generate deterministic mock data based on name
  const hash = name.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  return {
    latestScore: 500 + (hash % 400),
    prevScore: 480 + (hash % 380),
    listening: 250 + (hash % 200),
    reading: 250 + (hash % 200),
    testsCompleted: 3 + (hash % 20),
    lastActive: ["2 hours ago", "1 day ago", "3 hours ago", "Just now", "5 hours ago"][hash % 5],
    level: ["A2", "B1", "B2", "B1", "A2"][hash % 5],
    streak: hash % 15,
  };
};

function ScoreBadge({ score }: { score: number }) {
  const color = score >= 800 ? "bg-emerald-50 text-emerald-700 border-emerald-100" :
                score >= 600 ? "bg-indigo-50 text-indigo-700 border-indigo-100" :
                score >= 400 ? "bg-amber-50 text-amber-700 border-amber-100" :
                "bg-rose-50 text-rose-700 border-rose-100";
  return <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-[13px] font-black border ${color}`}>{score}</span>;
}

export default function TeacherStudentsPage() {
  const me = getStoredUser();
  const { users: allUsers, loading, fromApi } = useUsers("Student");

  const [searchTerm, setSearchTerm] = useState("");
  const [filterLevel, setFilterLevel] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("name");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const filtered = allUsers.filter((u) => {
    const perf = getPerformance(u.name);
    if (filterLevel !== "all" && perf.level !== filterLevel) return false;
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      return u.name.toLowerCase().includes(term) || u.email.toLowerCase().includes(term);
    }
    return true;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "score") return getPerformance(b.name).latestScore - getPerformance(a.name).latestScore;
    if (sortBy === "tests") return getPerformance(b.name).testsCompleted - getPerformance(a.name).testsCompleted;
    return a.name.localeCompare(b.name);
  });

  const totalPages = Math.max(1, Math.ceil(sorted.length / itemsPerPage));
  const paginated = sorted.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Calculate aggregate stats
  const allPerfs = allUsers.map((u) => getPerformance(u.name));
  const avgScore = allPerfs.length > 0 ? Math.round(allPerfs.reduce((s, p) => s + p.latestScore, 0) / allPerfs.length) : 0;
  const topScorer = allPerfs.length > 0 ? Math.max(...allPerfs.map(p => p.latestScore)) : 0;
  const avgTests = allPerfs.length > 0 ? Math.round(allPerfs.reduce((s, p) => s + p.testsCompleted, 0) / allPerfs.length) : 0;

  const statsCards = [
    { label: "Total Students", value: allUsers.length.toString(), icon: Users, color: "indigo", sub: `${allUsers.length} enrolled` },
    { label: "Avg. Score", value: avgScore.toString(), icon: Target, color: "emerald", sub: "Across all students" },
    { label: "Top Score", value: topScorer.toString(), icon: Award, color: "amber", sub: "Highest achievement" },
    { label: "Avg. Tests/Student", value: avgTests.toString(), icon: BarChart3, color: "violet", sub: "Tests completed" },
  ];

  const colorMap: Record<string, { iconBg: string }> = {
    indigo: { iconBg: "bg-gradient-to-br from-indigo-500 to-indigo-600" },
    emerald: { iconBg: "bg-gradient-to-br from-emerald-500 to-emerald-600" },
    amber: { iconBg: "bg-gradient-to-br from-amber-500 to-amber-600" },
    violet: { iconBg: "bg-gradient-to-br from-violet-500 to-violet-600" },
  };

  return (
    <DashboardLayout sidebarItems={teacherSidebarItems} title="Students" subtitle="Monitor student progress and performance" userName={me?.fullName ?? "Teacher"}>
      <div className="max-w-[1400px] mx-auto pb-10 space-y-6">

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {statsCards.map((s) => {
            const c = colorMap[s.color];
            const Icon = s.icon;
            return (
              <div key={s.label} className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div className={`w-10 h-10 rounded-xl ${c.iconBg} flex items-center justify-center shadow-sm`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-[10px] font-semibold text-slate-400 bg-slate-50 px-2 py-0.5 rounded-full border border-slate-100">{s.sub}</span>
                </div>
                <p className="text-2xl font-black text-slate-800 mb-0.5">{s.value}</p>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{s.label}</p>
              </div>
            );
          })}
        </div>

        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
              placeholder="Search by name or email..."
              className="pl-9 h-11 rounded-xl border-slate-200 bg-white font-semibold text-sm shadow-sm"
            />
          </div>

          <div className="flex items-center gap-2 ml-auto">
            <div className="relative">
              <select
                value={filterLevel}
                onChange={(e) => { setFilterLevel(e.target.value); setCurrentPage(1); }}
                className="h-11 rounded-xl border border-slate-200 px-4 pr-9 appearance-none bg-white font-bold text-slate-700 text-sm focus:ring-2 focus:ring-indigo-500 outline-none shadow-sm"
              >
                <option value="all">All Levels</option>
                <option value="A2">A2 – Elementary</option>
                <option value="B1">B1 – Intermediate</option>
                <option value="B2">B2 – Upper Int.</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            </div>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="h-11 rounded-xl border border-slate-200 px-4 pr-9 appearance-none bg-white font-bold text-slate-700 text-sm focus:ring-2 focus:ring-indigo-500 outline-none shadow-sm"
              >
                <option value="name">Sort by Name</option>
                <option value="score">Sort by Score</option>
                <option value="tests">Sort by Tests</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Student Table */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          {/* Header */}
          <div className="grid grid-cols-12 gap-4 items-center p-4 border-b border-slate-100 bg-slate-50 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
            <div className="col-span-3">Student</div>
            <div className="col-span-1 text-center">Level</div>
            <div className="col-span-2 text-center">TOEIC Score</div>
            <div className="col-span-2 text-center">L / R Breakdown</div>
            <div className="col-span-1 text-center">Tests</div>
            <div className="col-span-1 text-center">Last Active</div>
            <div className="col-span-2 text-right pr-4">Actions</div>
          </div>

          {/* Body */}
          {loading ? (
            <div className="flex justify-center py-16">
              <div className="w-8 h-8 border-3 border-indigo-200 border-t-indigo-500 rounded-full animate-spin"></div>
            </div>
          ) : paginated.length === 0 ? (
            <div className="text-center py-16">
              <Users className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <p className="text-slate-500 font-semibold">No students found</p>
              <p className="text-slate-400 text-sm">Try adjusting your search or filters</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {paginated.map((student) => {
                const perf = getPerformance(student.name);
                const scoreChange = perf.latestScore - perf.prevScore;
                const isUp = scoreChange >= 0;

                return (
                  <div key={student.id} className="grid grid-cols-12 gap-4 items-center p-4 hover:bg-slate-50/80 transition-colors group">
                    {/* Student */}
                    <div className="col-span-3 flex items-center gap-3">
                      <Avatar className="h-10 w-10 border-2 border-slate-100 shadow-sm">
                        <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${student.name}`} />
                        <AvatarFallback className="bg-indigo-100 text-indigo-600 font-bold text-sm">{student.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="min-w-0">
                        <p className="text-[13px] font-bold text-slate-800 truncate">{student.name}</p>
                        <p className="text-[11px] text-slate-400 font-medium truncate flex items-center gap-1">
                          <Mail className="w-3 h-3 shrink-0" /> {student.email}
                        </p>
                      </div>
                    </div>

                    {/* Level */}
                    <div className="col-span-1 flex justify-center">
                      <Badge className={`rounded-lg px-2 py-0.5 text-[11px] font-bold shadow-none border ${
                        perf.level === 'B2' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                        perf.level === 'B1' ? 'bg-indigo-50 text-indigo-700 border-indigo-100' :
                        'bg-amber-50 text-amber-700 border-amber-100'
                      }`}>{perf.level}</Badge>
                    </div>

                    {/* Score */}
                    <div className="col-span-2 flex items-center justify-center gap-2">
                      <ScoreBadge score={perf.latestScore} />
                      <span className={`inline-flex items-center gap-0.5 text-[11px] font-bold ${isUp ? 'text-emerald-600' : 'text-rose-500'}`}>
                        {isUp ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                        {Math.abs(scoreChange)}
                      </span>
                    </div>

                    {/* L / R Breakdown */}
                    <div className="col-span-2 flex items-center justify-center gap-3">
                      <div className="flex items-center gap-1.5">
                        <div className="w-5 h-5 rounded bg-indigo-100 flex items-center justify-center">
                          <Mic className="w-3 h-3 text-indigo-600" />
                        </div>
                        <span className="text-[12px] font-bold text-slate-700">{perf.listening}</span>
                      </div>
                      <span className="text-slate-300">/</span>
                      <div className="flex items-center gap-1.5">
                        <div className="w-5 h-5 rounded bg-emerald-100 flex items-center justify-center">
                          <PenLine className="w-3 h-3 text-emerald-600" />
                        </div>
                        <span className="text-[12px] font-bold text-slate-700">{perf.reading}</span>
                      </div>
                    </div>

                    {/* Tests */}
                    <div className="col-span-1 text-center">
                      <span className="text-[13px] font-bold text-slate-700">{perf.testsCompleted}</span>
                    </div>

                    {/* Last Active */}
                    <div className="col-span-1 text-center">
                      <span className="text-[11px] font-medium text-slate-500 flex items-center justify-center gap-1">
                        <Clock className="w-3 h-3" /> {perf.lastActive}
                      </span>
                    </div>

                    {/* Actions */}
                    <div className="col-span-2 flex items-center justify-end gap-1 pr-2">
                      <Button variant="outline" size="sm" className="h-8 px-3 rounded-lg font-bold text-[11px] border-slate-200 hover:border-indigo-200 hover:text-indigo-600 hover:bg-indigo-50">
                        <Eye className="w-3.5 h-3.5 mr-1" /> View Details
                      </Button>
                      <Button variant="outline" size="sm" className="h-8 px-3 rounded-lg font-bold text-[11px] border-slate-200 hover:border-violet-200 hover:text-violet-600 hover:bg-violet-50">
                        <BarChart3 className="w-3.5 h-3.5 mr-1" /> Analytics
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Pagination */}
          {!loading && totalPages > 1 && (
            <div className="p-4 border-t border-slate-200 flex items-center justify-between text-[13px] font-bold text-slate-500 bg-white">
              <span>Showing {(currentPage - 1) * itemsPerPage + 1}–{Math.min(currentPage * itemsPerPage, sorted.length)} of {sorted.length}</span>
              <div className="flex gap-1.5">
                <Button onClick={() => setCurrentPage(Math.max(1, currentPage - 1))} disabled={currentPage === 1} variant="outline" size="sm" className="h-8 px-3 rounded-lg border-slate-200 font-bold hover:bg-slate-50">Previous</Button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).slice(0, 5).map(page => (
                  <Button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    variant={currentPage === page ? "default" : "outline"}
                    size="sm"
                    className={`h-8 w-8 rounded-lg font-bold ${currentPage === page ? 'bg-[#4f46e5] hover:bg-[#4338ca] text-white shadow-sm' : 'border-slate-200 hover:bg-slate-50 text-slate-600'}`}
                  >
                    {page}
                  </Button>
                ))}
                <Button onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))} disabled={currentPage === totalPages} variant="outline" size="sm" className="h-8 px-3 rounded-lg border-slate-200 font-bold hover:bg-slate-50">Next</Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
