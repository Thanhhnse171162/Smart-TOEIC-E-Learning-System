"use client";

import { useState } from "react";
import {
  Plus, Users, Star, BarChart3, Clock, BookOpen,
  MoreVertical, Edit, Trash2, LayoutGrid, List,
  ChevronLeft, ChevronRight, Search, Filter,
  TrendingUp, Eye, Copy, GraduationCap, Zap,
  CheckCircle, AlertCircle
} from "lucide-react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { teacherSidebarItems } from "@/lib/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import Link from "next/link";

const allCourses = [
  {
    id: "c1",
    title: "TOEIC Listening Mastery (Part 1-4)",
    students: 1250, rating: 4.8, status: "Published",
    lessons: 24, hours: 12, level: "B1",
    gradient: "linear-gradient(135deg, #6366f1 0%, #4f46e5 50%, #4338ca 100%)",
    progress: 100, revenue: "12,500,000₫", category: "Listening",
    lastUpdated: "2 days ago",
  },
  {
    id: "c2",
    title: "Advanced Reading Strategies (Part 7)",
    students: 840, rating: 4.9, status: "Published",
    lessons: 18, hours: 8, level: "B2",
    gradient: "linear-gradient(135deg, #10b981 0%, #059669 50%, #047857 100%)",
    progress: 100, revenue: "8,400,000₫", category: "Reading",
    lastUpdated: "5 days ago",
  },
  {
    id: "c3",
    title: "TOEIC Vocabulary Crash Course",
    students: 0, rating: 0, status: "Draft",
    lessons: 12, hours: 5, level: "A2",
    gradient: "linear-gradient(135deg, #f59e0b 0%, #f97316 50%, #ef4444 100%)",
    progress: 65, revenue: "—", category: "Vocabulary",
    lastUpdated: "1 hour ago",
  },
  {
    id: "c4",
    title: "Full Mock Test Walkthrough",
    students: 320, rating: 4.6, status: "Published",
    lessons: 10, hours: 20, level: "B1",
    gradient: "linear-gradient(135deg, #3b82f6 0%, #2563eb 50%, #1d4ed8 100%)",
    progress: 100, revenue: "3,200,000₫", category: "Mock Test",
    lastUpdated: "1 week ago",
  },
  {
    id: "c5",
    title: "Grammar Foundation for TOEIC",
    students: 500, rating: 4.5, status: "Published",
    lessons: 15, hours: 10, level: "A2",
    gradient: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 50%, #6d28d9 100%)",
    progress: 100, revenue: "5,000,000₫", category: "Grammar",
    lastUpdated: "3 days ago",
  },
  {
    id: "c6",
    title: "Speaking & Writing Basics",
    students: 120, rating: 4.2, status: "Draft",
    lessons: 8, hours: 4, level: "B2",
    gradient: "linear-gradient(135deg, #ec4899 0%, #db2777 50%, #be185d 100%)",
    progress: 40, revenue: "—", category: "Speaking",
    lastUpdated: "3 hours ago",
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`w-3 h-3 ${i <= Math.round(rating) ? "fill-amber-400 text-amber-400" : "text-slate-200"}`}
        />
      ))}
    </div>
  );
}

function CourseCardGrid({ course, onMenu }: { course: typeof allCourses[0]; onMenu: (id: string) => void }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_30px_rgba(79,70,229,0.12)] transition-all duration-300 flex flex-col hover:-translate-y-1 border border-slate-100/80">
      {/* Gradient Header */}
      <Link href={`/teacher/courses/${course.id}`} className="relative block overflow-hidden">
        <div
          className="h-[130px] w-full relative group-hover:scale-[1.03] transition-transform duration-500"
          style={{ background: course.gradient }}
        >
          <div className="absolute -top-6 -right-6 w-28 h-28 rounded-full bg-white/10" />
          <div className="absolute -bottom-8 -left-4 w-24 h-24 rounded-full bg-white/8" />
          <div className="absolute top-3 right-3">
            {course.status === "Published" ? (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/20 text-white border border-white/30 backdrop-blur-sm">
                <CheckCircle className="w-3 h-3" /> Published
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-400/90 text-amber-900 border border-amber-300/50">
                <AlertCircle className="w-3 h-3" /> Draft
              </span>
            )}
          </div>
          <div className="absolute bottom-3 left-3 flex items-center gap-2">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-black/25 text-white backdrop-blur-sm">
              {course.category}
            </span>
            {course.level && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-black/25 text-white backdrop-blur-sm">
                {course.level}
              </span>
            )}
          </div>
        </div>
      </Link>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col">
        <div className="flex items-start justify-between gap-2 mb-2">
          <Link href={`/teacher/courses/${course.id}`}>
            <h3 className="font-bold text-[14px] text-slate-800 leading-snug line-clamp-2 group-hover:text-indigo-700 transition-colors">
              {course.title}
            </h3>
          </Link>
          <div className="relative shrink-0">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
            >
              <MoreVertical className="w-4 h-4" />
            </button>
            {menuOpen && (
              <div className="absolute right-0 top-8 bg-white rounded-xl shadow-xl border border-slate-100 z-10 w-40 py-1 overflow-hidden">
                <button className="w-full flex items-center gap-2.5 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-indigo-50 hover:text-indigo-700 transition-colors">
                  <Edit className="w-3.5 h-3.5" /> Edit Course
                </button>
                <button className="w-full flex items-center gap-2.5 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
                  <Copy className="w-3.5 h-3.5" /> Duplicate
                </button>
                <button className="w-full flex items-center gap-2.5 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
                  <Eye className="w-3.5 h-3.5" /> Preview
                </button>
                <div className="h-px bg-slate-100 my-1" />
                <button className="w-full flex items-center gap-2.5 px-3 py-2 text-sm font-medium text-rose-500 hover:bg-rose-50 transition-colors">
                  <Trash2 className="w-3.5 h-3.5" /> Delete
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          {course.rating > 0 ? (
            <>
              <StarRating rating={course.rating} />
              <span className="text-xs font-bold text-slate-500">{course.rating}</span>
            </>
          ) : (
            <span className="text-xs text-slate-400 italic">No ratings yet</span>
          )}
        </div>

        {/* Draft progress */}
        {course.status === "Draft" && (
          <div className="mb-3 space-y-1">
            <div className="flex justify-between text-[10px] font-bold text-slate-500 uppercase tracking-wider">
              <span>Completion</span>
              <span className="text-indigo-600">{course.progress}%</span>
            </div>
            <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-indigo-500 to-indigo-400 rounded-full transition-all"
                style={{ width: `${course.progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Stats */}
        <div className="flex items-center gap-3 text-[12px] text-slate-500 mb-4">
          <div className="flex items-center gap-1">
            <Users className="w-3 h-3 text-slate-400" />
            <span className="font-semibold">{course.students.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-1">
            <BookOpen className="w-3 h-3 text-slate-400" />
            <span className="font-semibold">{course.lessons} lessons</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3 text-slate-400" />
            <span className="font-semibold">{course.hours}h</span>
          </div>
        </div>

        {/* Action */}
        <div className="mt-auto">
          <Link href={`/teacher/courses/${course.id}`} className="block">
            <Button className="w-full bg-slate-50 hover:bg-indigo-50 text-indigo-600 font-bold border border-slate-200 hover:border-indigo-200 rounded-xl h-9 shadow-none transition-all text-[12px]">
              {course.status === "Published" ? "Manage Course" : "Continue Editing"}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

function CourseRowList({ course }: { course: typeof allCourses[0] }) {
  return (
    <div className="group bg-white rounded-xl border border-slate-100 px-5 py-4 flex items-center gap-5 hover:shadow-md hover:border-indigo-100 transition-all duration-200">
      <div
        className="w-12 h-12 rounded-xl shrink-0"
        style={{ background: course.gradient }}
      />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <h3 className="font-bold text-[14px] text-slate-800 truncate group-hover:text-indigo-700 transition-colors">
            {course.title}
          </h3>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 shrink-0">{course.category}</span>
        </div>
        <div className="flex items-center gap-3 text-[12px] text-slate-500">
          <span>{course.lessons} lessons</span>
          <span>·</span>
          <span>{course.hours}h</span>
          <span>·</span>
          <span>Updated {course.lastUpdated}</span>
        </div>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        {course.rating > 0 && (
          <div className="flex items-center gap-1">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span className="text-sm font-bold text-slate-700">{course.rating}</span>
          </div>
        )}
      </div>
      <div className="flex items-center gap-1.5 shrink-0">
        <Users className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-sm font-semibold text-slate-700">{course.students.toLocaleString()}</span>
      </div>
      <div className="shrink-0">
        {course.status === "Published" ? (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-100">
            <CheckCircle className="w-3 h-3" /> Published
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-100">
            <AlertCircle className="w-3 h-3" /> Draft
          </span>
        )}
      </div>
      <div className="flex items-center gap-1 shrink-0">
        <Link href={`/teacher/courses/${course.id}`}>
          <Button size="sm" className="h-8 px-3 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-600 font-bold border-none shadow-none text-xs">
            Manage
          </Button>
        </Link>
        <button className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:bg-slate-100 transition-colors">
          <MoreVertical className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

export default function TeacherCoursesPage() {
  const [activeTab, setActiveTab] = useState<"all" | "published" | "draft">("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const published = allCourses.filter((c) => c.status === "Published");
  const drafts = allCourses.filter((c) => c.status === "Draft");

  const baseCourses =
    activeTab === "published" ? published :
    activeTab === "draft" ? drafts :
    allCourses;

  const filtered = baseCourses.filter((c) =>
    c.title.toLowerCase().includes(search.toLowerCase()) ||
    c.category.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginated = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const stats = [
    { label: "Total Courses", value: allCourses.length, icon: BookOpen, color: "indigo", sub: "+1 this month" },
    { label: "Active Students", value: "2,410", icon: Users, color: "emerald", sub: "+123 this week" },
    { label: "Avg. Rating", value: "4.8", icon: Star, color: "amber", sub: "Across all courses" },
    { label: "Completion Rate", value: "76%", icon: TrendingUp, color: "violet", sub: "+4% vs last month" },
  ];

  const colorMap: Record<string, { bg: string; text: string; icon: string }> = {
    indigo: { bg: "bg-indigo-50", text: "text-indigo-600", icon: "text-indigo-500" },
    emerald: { bg: "bg-emerald-50", text: "text-emerald-600", icon: "text-emerald-500" },
    amber: { bg: "bg-amber-50", text: "text-amber-600", icon: "text-amber-500" },
    violet: { bg: "bg-violet-50", text: "text-violet-600", icon: "text-violet-500" },
  };

  return (
    <DashboardLayout
      sidebarItems={teacherSidebarItems}
      title="My Courses"
      subtitle="Manage your curriculum and track student progress"
      userName="Tran Thi B"
    >
      <div className="max-w-[1400px] mx-auto pb-10 space-y-6">

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s) => {
            const c = colorMap[s.color];
            const Icon = s.icon;
            return (
              <div key={s.label} className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div className={`w-10 h-10 rounded-xl ${c.bg} flex items-center justify-center`}>
                    <Icon className={`w-5 h-5 ${c.icon}`} />
                  </div>
                  <span className="text-[10px] font-semibold text-slate-400 bg-slate-50 px-2 py-0.5 rounded-full border border-slate-100">
                    {s.sub}
                  </span>
                </div>
                <p className="text-2xl font-black text-slate-800 mb-0.5">{s.value}</p>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{s.label}</p>
              </div>
            );
          })}
        </div>

        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          {/* Tabs */}
          <div className="flex items-center gap-1 bg-slate-100/70 rounded-xl p-1">
            {[
              { key: "all", label: `All (${allCourses.length})` },
              { key: "published", label: `Published (${published.length})` },
              { key: "draft", label: `Drafts (${drafts.length})` },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => { setActiveTab(tab.key as typeof activeTab); setCurrentPage(1); }}
                className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                  activeTab === tab.key
                    ? "bg-white text-slate-800 shadow-sm"
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Search courses..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
              className="h-10 pl-9 rounded-xl border-slate-200 bg-white text-sm font-medium focus-visible:ring-indigo-500"
            />
          </div>

          <div className="flex items-center gap-2 ml-auto">
            {/* View Toggle */}
            <div className="flex items-center gap-1 bg-slate-100 rounded-xl p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${viewMode === "grid" ? "bg-white shadow-sm text-indigo-600" : "text-slate-400 hover:text-slate-600"}`}
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${viewMode === "list" ? "bg-white shadow-sm text-indigo-600" : "text-slate-400 hover:text-slate-600"}`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>

            {/* Create Button */}
            <Link href="/teacher/courses/create">
              <Button className="bg-[#4f46e5] hover:bg-[#4338ca] text-white font-bold rounded-xl h-10 px-5 shadow-sm gap-2 text-[13px]">
                <Plus className="w-4 h-4 stroke-[2.5]" /> Create Course
              </Button>
            </Link>
          </div>
        </div>

        {/* Content */}
        {paginated.length === 0 ? (
          <div className="text-center py-20">
            <GraduationCap className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-500 font-semibold">No courses found</p>
            <p className="text-slate-400 text-sm">Try adjusting your search or filters</p>
          </div>
        ) : viewMode === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {paginated.map((course) => (
              <CourseCardGrid key={course.id} course={course} onMenu={() => {}} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-2.5">
            {paginated.map((course) => (
              <CourseRowList key={course.id} course={course} />
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between pt-2">
            <span className="text-sm font-semibold text-slate-500">
              Showing {(currentPage - 1) * itemsPerPage + 1}–{Math.min(currentPage * itemsPerPage, filtered.length)} of {filtered.length}
            </span>
            <div className="flex items-center gap-1.5">
              <Button variant="outline" size="sm" onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="h-9 w-9 p-0 rounded-xl">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <Button
                  key={page}
                  size="sm"
                  onClick={() => setCurrentPage(page)}
                  className={`h-9 w-9 p-0 rounded-xl font-bold ${currentPage === page ? "bg-[#4f46e5] hover:bg-[#4338ca] text-white shadow-sm" : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"}`}
                >
                  {page}
                </Button>
              ))}
              <Button variant="outline" size="sm" onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="h-9 w-9 p-0 rounded-xl">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
