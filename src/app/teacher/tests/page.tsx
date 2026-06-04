"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Plus, Search, FileText, Users, Clock, Target, MoreVertical, Edit2, Trash2, Eye, Copy,
  ChevronDown, ChevronLeft, ChevronRight, CheckCircle2, AlertCircle, Mic, BookOpen,
  BarChart3, Zap, Send, Archive, Filter, LayoutGrid, List, Calendar, Award, TrendingUp,
} from "lucide-react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { teacherSidebarItems } from "@/lib/navigation";

// --- Types ---
type TestStatus = "Published" | "Draft" | "Archived";
type TestType = "Full Test" | "Mini Test" | "Practice Set";

type Test = {
  id: string;
  title: string;
  type: TestType;
  parts: number[];
  totalQuestions: number;
  duration: string;
  status: TestStatus;
  students: number;
  avgScore: number;
  passRate: number;
  createdAt: string;
  lastUpdated: string;
  attempts: number;
};

// --- Mock Data ---
const MOCK_TESTS: Test[] = [
  {
    id: "T001",
    title: "Full Mock Test #1 — January 2026",
    type: "Full Test",
    parts: [1, 2, 3, 4, 5, 6, 7],
    totalQuestions: 200,
    duration: "2h 00m",
    status: "Published",
    students: 89,
    avgScore: 725,
    passRate: 72,
    createdAt: "Jan 15, 2026",
    lastUpdated: "2 days ago",
    attempts: 134,
  },
  {
    id: "T002",
    title: "Listening Practice Set A — Part 1 & 2",
    type: "Practice Set",
    parts: [1, 2],
    totalQuestions: 30,
    duration: "25m",
    status: "Published",
    students: 124,
    avgScore: 380,
    passRate: 81,
    createdAt: "Feb 3, 2026",
    lastUpdated: "5 days ago",
    attempts: 210,
  },
  {
    id: "T003",
    title: "Reading Mini Test — Part 5, 6, 7",
    type: "Mini Test",
    parts: [5, 6, 7],
    totalQuestions: 50,
    duration: "45m",
    status: "Draft",
    students: 0,
    avgScore: 0,
    passRate: 0,
    createdAt: "Mar 10, 2026",
    lastUpdated: "1 hour ago",
    attempts: 0,
  },
  {
    id: "T004",
    title: "Full Mock Test #2 — February 2026",
    type: "Full Test",
    parts: [1, 2, 3, 4, 5, 6, 7],
    totalQuestions: 200,
    duration: "2h 00m",
    status: "Published",
    students: 45,
    avgScore: 690,
    passRate: 64,
    createdAt: "Feb 20, 2026",
    lastUpdated: "1 week ago",
    attempts: 67,
  },
  {
    id: "T005",
    title: "Part 3 & 4 Conversation Focus",
    type: "Practice Set",
    parts: [3, 4],
    totalQuestions: 40,
    duration: "35m",
    status: "Published",
    students: 210,
    avgScore: 350,
    passRate: 76,
    createdAt: "Mar 1, 2026",
    lastUpdated: "3 days ago",
    attempts: 315,
  },
  {
    id: "T006",
    title: "Grammar & Vocabulary Quick Test",
    type: "Mini Test",
    parts: [5, 6],
    totalQuestions: 30,
    duration: "20m",
    status: "Draft",
    students: 0,
    avgScore: 0,
    passRate: 0,
    createdAt: "Mar 12, 2026",
    lastUpdated: "3 hours ago",
    attempts: 0,
  },
  {
    id: "T007",
    title: "Full Mock Test #3 — March 2026",
    type: "Full Test",
    parts: [1, 2, 3, 4, 5, 6, 7],
    totalQuestions: 200,
    duration: "2h 00m",
    status: "Archived",
    students: 156,
    avgScore: 742,
    passRate: 78,
    createdAt: "Dec 5, 2025",
    lastUpdated: "2 months ago",
    attempts: 289,
  },
];

const stats = [
  { label: "Total Tests", value: "24", icon: FileText, color: "indigo", sub: "7 Full Tests" },
  { label: "Published", value: "18", icon: CheckCircle2, color: "emerald", sub: "Active for students" },
  { label: "Total Attempts", value: "1,015", icon: BarChart3, color: "violet", sub: "+89 this week" },
  { label: "Avg. Pass Rate", value: "74%", icon: TrendingUp, color: "amber", sub: "Target: 70%" },
];

const colorMap: Record<string, { bg: string; iconBg: string; text: string }> = {
  indigo: { bg: "bg-indigo-50", iconBg: "bg-gradient-to-br from-indigo-500 to-indigo-600", text: "text-indigo-600" },
  emerald: { bg: "bg-emerald-50", iconBg: "bg-gradient-to-br from-emerald-500 to-emerald-600", text: "text-emerald-600" },
  violet: { bg: "bg-violet-50", iconBg: "bg-gradient-to-br from-violet-500 to-violet-600", text: "text-violet-600" },
  amber: { bg: "bg-amber-50", iconBg: "bg-gradient-to-br from-amber-500 to-amber-600", text: "text-amber-600" },
};

function getTypeStyle(type: TestType) {
  switch (type) {
    case "Full Test": return { bg: "bg-indigo-500", text: "text-white", badge: "bg-indigo-50 text-indigo-600 border-indigo-100", icon: FileText };
    case "Mini Test": return { bg: "bg-emerald-500", text: "text-white", badge: "bg-emerald-50 text-emerald-600 border-emerald-100", icon: Zap };
    case "Practice Set": return { bg: "bg-amber-500", text: "text-white", badge: "bg-amber-50 text-amber-600 border-amber-100", icon: Target };
  }
}

function getStatusStyle(status: TestStatus) {
  switch (status) {
    case "Published": return { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-100", icon: CheckCircle2 };
    case "Draft": return { bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-100", icon: AlertCircle };
    case "Archived": return { bg: "bg-slate-50", text: "text-slate-500", border: "border-slate-200", icon: Archive };
  }
}

export default function TeacherTestsPage() {
  const [tests] = useState<Test[]>(MOCK_TESTS);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [currentPage, setCurrentPage] = useState(1);
  const [menuOpenId, setMenuOpenId] = useState<string | null>(null);
  const itemsPerPage = 5;

  const filtered = tests.filter((t) => {
    if (filterType !== "all" && t.type !== filterType) return false;
    if (filterStatus !== "all" && t.status !== filterStatus) return false;
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      return t.title.toLowerCase().includes(term) || t.id.toLowerCase().includes(term);
    }
    return true;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / itemsPerPage));
  const paginated = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleAction = (action: string) => alert(`${action} — feature coming soon!`);

  return (
    <DashboardLayout sidebarItems={teacherSidebarItems} title="Test Management" subtitle="Create, manage, and assign TOEIC tests" userName="Tran Thi B">
      <div className="max-w-[1400px] mx-auto pb-10 space-y-6">

        {/* Stats */}
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
          {/* Search */}
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
              placeholder="Search tests by name or ID..."
              className="pl-9 h-11 rounded-xl border-slate-200 bg-white font-semibold text-sm shadow-sm"
            />
          </div>

          {/* Filters */}
          <div className="flex items-center gap-2">
            <div className="relative">
              <select
                value={filterType}
                onChange={(e) => { setFilterType(e.target.value); setCurrentPage(1); }}
                className="h-11 rounded-xl border border-slate-200 px-4 pr-9 appearance-none bg-white font-bold text-slate-700 text-sm focus:ring-2 focus:ring-indigo-500 outline-none shadow-sm"
              >
                <option value="all">All Types</option>
                <option value="Full Test">Full Test</option>
                <option value="Mini Test">Mini Test</option>
                <option value="Practice Set">Practice Set</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            </div>
            <div className="relative">
              <select
                value={filterStatus}
                onChange={(e) => { setFilterStatus(e.target.value); setCurrentPage(1); }}
                className="h-11 rounded-xl border border-slate-200 px-4 pr-9 appearance-none bg-white font-bold text-slate-700 text-sm focus:ring-2 focus:ring-indigo-500 outline-none shadow-sm"
              >
                <option value="all">All Status</option>
                <option value="Published">Published</option>
                <option value="Draft">Draft</option>
                <option value="Archived">Archived</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            </div>
          </div>

          {/* View Toggle & Create */}
          <div className="flex items-center gap-2 ml-auto">
            <div className="flex items-center gap-1 bg-slate-100 rounded-xl p-1">
              <button onClick={() => setViewMode("list")} className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${viewMode === "list" ? "bg-white shadow-sm text-indigo-600" : "text-slate-400 hover:text-slate-600"}`}>
                <List className="w-4 h-4" />
              </button>
              <button onClick={() => setViewMode("grid")} className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${viewMode === "grid" ? "bg-white shadow-sm text-indigo-600" : "text-slate-400 hover:text-slate-600"}`}>
                <LayoutGrid className="w-4 h-4" />
              </button>
            </div>
            <Link href="/teacher/tests/create">
              <Button className="bg-[#4f46e5] hover:bg-[#4338ca] text-white font-bold rounded-xl h-11 px-5 shadow-sm gap-2 text-[13px]">
                <Plus className="w-4 h-4 stroke-[2.5]" /> Create Test
              </Button>
            </Link>
          </div>
        </div>

        {/* Content */}
        {viewMode === "list" ? (
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
            {/* Table Header */}
            <div className="grid grid-cols-12 gap-4 items-center p-4 border-b border-slate-100 bg-slate-50 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              <div className="col-span-4">Test</div>
              <div className="col-span-1">Type</div>
              <div className="col-span-1">Questions</div>
              <div className="col-span-1">Duration</div>
              <div className="col-span-1">Students</div>
              <div className="col-span-1">Avg Score</div>
              <div className="col-span-1">Status</div>
              <div className="col-span-2 text-right pr-2">Actions</div>
            </div>

            {/* Table Body */}
            <div className="divide-y divide-slate-100">
              {paginated.map((test) => {
                const typeStyle = getTypeStyle(test.type);
                const statusStyle = getStatusStyle(test.status);
                const TypeIcon = typeStyle.icon;
                const StatusIcon = statusStyle.icon;

                return (
                  <div key={test.id} className="grid grid-cols-12 gap-4 items-center p-4 hover:bg-slate-50/80 transition-colors group">
                    {/* Test Info */}
                    <div className="col-span-4 flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl ${typeStyle.bg} flex items-center justify-center shrink-0 shadow-sm`}>
                        <TypeIcon className="w-5 h-5 text-white" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[13px] font-bold text-slate-800 truncate group-hover:text-indigo-600 transition-colors">{test.title}</p>
                        <div className="flex items-center gap-2 text-[11px] text-slate-400 font-medium mt-0.5">
                          <span>#{test.id}</span>
                          <span>·</span>
                          <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {test.lastUpdated}</span>
                        </div>
                      </div>
                    </div>

                    {/* Type */}
                    <div className="col-span-1">
                      <Badge className={`${typeStyle.badge} border rounded-lg px-2 py-0.5 text-[10px] font-bold shadow-none hover:opacity-90`}>{test.type}</Badge>
                    </div>

                    {/* Questions */}
                    <div className="col-span-1">
                      <span className="text-[13px] font-bold text-slate-700">{test.totalQuestions}</span>
                      <span className="text-[11px] text-slate-400 ml-1">Qs</span>
                    </div>

                    {/* Duration */}
                    <div className="col-span-1 flex items-center gap-1 text-slate-600">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span className="text-[13px] font-semibold">{test.duration}</span>
                    </div>

                    {/* Students */}
                    <div className="col-span-1 flex items-center gap-1 text-slate-600">
                      <Users className="w-3.5 h-3.5 text-slate-400" />
                      <span className="text-[13px] font-semibold">{test.students}</span>
                    </div>

                    {/* Avg Score */}
                    <div className="col-span-1">
                      {test.avgScore > 0 ? (
                        <div>
                          <span className="text-[13px] font-bold text-slate-700">{test.avgScore}</span>
                          <div className="h-1 bg-slate-100 rounded-full mt-1 overflow-hidden">
                            <div
                              className={`h-full rounded-full ${test.passRate >= 75 ? 'bg-emerald-500' : test.passRate >= 60 ? 'bg-amber-500' : 'bg-rose-500'}`}
                              style={{ width: `${test.passRate}%` }}
                            />
                          </div>
                        </div>
                      ) : (
                        <span className="text-[12px] text-slate-400 italic">—</span>
                      )}
                    </div>

                    {/* Status */}
                    <div className="col-span-1">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-bold ${statusStyle.bg} ${statusStyle.text} border ${statusStyle.border}`}>
                        <StatusIcon className="w-3 h-3" /> {test.status}
                      </span>
                    </div>

                    {/* Actions */}
                    <div className="col-span-2 flex items-center justify-end gap-1 pr-2">
                      <button onClick={() => handleAction('Preview')} className="p-2 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors" title="Preview">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleAction('Edit')} className="p-2 rounded-lg text-slate-400 hover:text-amber-600 hover:bg-amber-50 transition-colors" title="Edit">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      {test.status === "Draft" && (
                        <button onClick={() => handleAction('Publish')} className="p-2 rounded-lg text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 transition-colors" title="Publish">
                          <Send className="w-4 h-4" />
                        </button>
                      )}
                      <button onClick={() => handleAction('Duplicate')} className="p-2 rounded-lg text-slate-400 hover:text-violet-600 hover:bg-violet-50 transition-colors" title="Duplicate">
                        <Copy className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleAction('Delete')} className="p-2 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors" title="Delete">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Pagination */}
            <div className="p-4 border-t border-slate-200 flex items-center justify-between text-[13px] font-bold text-slate-500 bg-white">
              <span>Showing {(currentPage - 1) * itemsPerPage + 1}–{Math.min(currentPage * itemsPerPage, filtered.length)} of {filtered.length}</span>
              <div className="flex gap-1.5">
                <Button onClick={() => setCurrentPage(Math.max(1, currentPage - 1))} disabled={currentPage === 1} variant="outline" size="sm" className="h-8 px-3 rounded-lg border-slate-200 font-bold hover:bg-slate-50">Previous</Button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
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
          </div>
        ) : (
          /* Grid View */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {paginated.map((test) => {
              const typeStyle = getTypeStyle(test.type);
              const statusStyle = getStatusStyle(test.status);
              const TypeIcon = typeStyle.icon;
              const StatusIcon = statusStyle.icon;

              return (
                <div key={test.id} className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 group flex flex-col">
                  {/* Header */}
                  <div className={`p-4 ${typeStyle.bg} flex items-center justify-between`}>
                    <div className="flex items-center gap-2">
                      <TypeIcon className="w-5 h-5 text-white" />
                      <Badge className="bg-white/20 text-white border-white/30 text-[10px] font-bold shadow-none">{test.type}</Badge>
                    </div>
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-white/90 ${statusStyle.text}`}>
                      <StatusIcon className="w-3 h-3" /> {test.status}
                    </span>
                  </div>

                  {/* Body */}
                  <div className="p-4 flex-1 flex flex-col">
                    <p className="text-[14px] font-bold text-slate-800 mb-1 line-clamp-2 leading-snug group-hover:text-indigo-600 transition-colors">{test.title}</p>
                    <p className="text-[11px] text-slate-400 font-medium mb-4">#{test.id} · Updated {test.lastUpdated}</p>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="bg-slate-50 rounded-xl p-2.5 text-center">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Questions</p>
                        <p className="text-[16px] font-black text-slate-700">{test.totalQuestions}</p>
                      </div>
                      <div className="bg-slate-50 rounded-xl p-2.5 text-center">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Duration</p>
                        <p className="text-[16px] font-black text-slate-700">{test.duration}</p>
                      </div>
                      <div className="bg-slate-50 rounded-xl p-2.5 text-center">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Students</p>
                        <p className="text-[16px] font-black text-slate-700">{test.students}</p>
                      </div>
                      <div className="bg-slate-50 rounded-xl p-2.5 text-center">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Avg Score</p>
                        <p className="text-[16px] font-black text-slate-700">{test.avgScore || '—'}</p>
                      </div>
                    </div>

                    {/* Parts */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {test.parts.map((p) => (
                        <span key={p} className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${p <= 4 ? 'bg-indigo-50 text-indigo-600' : 'bg-emerald-50 text-emerald-600'}`}>
                          Part {p}
                        </span>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="mt-auto flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleAction('Edit')} className="flex-1 h-9 rounded-xl font-bold text-[12px] border-slate-200 hover:border-indigo-200 hover:text-indigo-600">
                        <Edit2 className="w-3.5 h-3.5 mr-1.5" /> Edit
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleAction('Preview')} className="flex-1 h-9 rounded-xl font-bold text-[12px] border-slate-200 hover:border-violet-200 hover:text-violet-600">
                        <Eye className="w-3.5 h-3.5 mr-1.5" /> Preview
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleAction('More')} className="h-9 w-9 p-0 rounded-xl border-slate-200">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
