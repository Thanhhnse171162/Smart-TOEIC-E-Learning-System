"use client";

import { useState } from "react";
import { Plus, Users, Star, BarChart3, Clock, BookOpen, MoreVertical, Edit, Copy, Trash2, LayoutGrid, ChevronLeft, ChevronRight } from "lucide-react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { teacherSidebarItems } from "@/lib/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

const allCourses = [
  { id: "c1", title: "TOEIC Listening Mastery (Part 1-4)", students: 1250, rating: 4.8, status: "Published", lessons: 24, hours: 12, level: "B1", gradient: "linear-gradient(135deg, #22c55e 0%, #059669 50%, #047857 100%)", progress: 100 },
  { id: "c2", title: "Advanced Reading Strategies (Part 7)", students: 840, rating: 4.9, status: "Published", lessons: 18, hours: 8, level: null, gradient: "linear-gradient(135deg, #10b981 0%, #0d9488 50%, #0891b2 100%)", progress: 100 },
  { id: "c3", title: "TOEIC Vocabulary Crash Course", students: 0, rating: 0, status: "Draft", lessons: 12, hours: 5, level: null, gradient: "linear-gradient(135deg, #f59e0b 0%, #f97316 50%, #ef4444 100%)", progress: 65 },
  { id: "c4", title: "Full Mock Test Walkthrough", students: 320, rating: 4.6, status: "Published", lessons: 10, hours: 20, level: null, gradient: "linear-gradient(135deg, #22c55e 0%, #16a34a 50%, #15803d 100%)", progress: 100 },
  { id: "c5", title: "Grammar Foundation for TOEIC", students: 500, rating: 4.5, status: "Published", lessons: 15, hours: 10, level: "A2", gradient: "linear-gradient(135deg, #3b82f6 0%, #2563eb 50%, #1d4ed8 100%)", progress: 100 },
  { id: "c6", title: "Speaking & Writing Basics", students: 120, rating: 4.2, status: "Draft", lessons: 8, hours: 4, level: "B2", gradient: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 50%, #6d28d9 100%)", progress: 40 },
];

function StarRating({ rating }: { rating: number }) {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(rating)) {
      stars.push(<Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />);
    } else if (i === Math.ceil(rating) && rating % 1 !== 0) {
      stars.push(
        <div key={i} className="relative w-3.5 h-3.5">
          <Star className="w-3.5 h-3.5 text-slate-200 absolute" />
          <div className="overflow-hidden absolute" style={{ width: `${(rating % 1) * 100}%` }}>
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          </div>
        </div>
      );
    } else {
      stars.push(<Star key={i} className="w-3.5 h-3.5 text-slate-200" />);
    }
  }
  return <div className="flex items-center gap-0.5">{stars}</div>;
}

export default function TeacherCoursesPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const totalPages = Math.ceil(allCourses.length / itemsPerPage);
  const courses = allCourses.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <DashboardLayout 
      sidebarItems={teacherSidebarItems} 
      title="My Courses" 
      subtitle="Manage your curriculum and track student progress"
      userName="Tran Thi B"
    >

      <div className="max-w-[1400px] mx-auto pb-10 space-y-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Courses</p>
              <p className="text-2xl font-black text-slate-800">4</p>
            </div>
          </div>
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Active Students</p>
              <p className="text-2xl font-black text-slate-800">2,410</p>
            </div>
          </div>
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center shrink-0">
              <Star className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Avg. Rating</p>
              <p className="text-2xl font-black text-slate-800">4.8</p>
            </div>
          </div>
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-500 flex items-center justify-center shrink-0">
              <BarChart3 className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Completion Rate</p>
              <p className="text-2xl font-black text-slate-800">76%</p>
            </div>
          </div>
        </div>

        {/* Toolbar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="outline" className="bg-white border-slate-200 text-slate-800 font-bold rounded-xl shadow-sm h-9 px-4">All Courses</Button>
            <Button variant="ghost" className="text-slate-500 font-bold rounded-xl h-9 px-4">Published (3)</Button>
            <Button variant="ghost" className="text-slate-500 font-bold rounded-xl h-9 px-4">Drafts (1)</Button>
          </div>
          <div className="flex items-center gap-3">
            <Button className="bg-[#4f46e5] hover:bg-[#4338ca] text-white font-bold rounded-xl h-9 px-5 shadow-sm transition-colors gap-2 text-[13px]">
              <Plus className="w-4 h-4 stroke-[3]"/> Create New Course
            </Button>
            <div className="flex items-center gap-1">
              <Button variant="outline" size="icon" className="h-9 w-9 rounded-xl bg-slate-100 text-slate-700 border-none"><LayoutGrid className="w-4 h-4" /></Button>
              <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl text-slate-400"><BookOpen className="w-4 h-4" /></Button>
            </div>
          </div>
        </div>

        {/* Course Grid - Image 1 Style */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {courses.map((course) => (
            <div
              key={course.id}
              className="group bg-white rounded-2xl overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-all duration-300 flex flex-col hover:-translate-y-1 border border-slate-100"
            >
              {/* Gradient Header */}
              <Link href={`/teacher/courses/${course.id}`} className="relative block overflow-hidden">
                <div
                  className="h-[140px] w-full relative group-hover:scale-[1.02] transition-transform duration-500"
                  style={{ background: course.gradient }}
                >
                  {/* Decorative circles */}
                  <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-white/10" />
                  <div className="absolute -bottom-8 -left-4 w-20 h-20 rounded-full bg-white/8" />
                  <div className="absolute top-1/2 right-1/4 w-10 h-10 rounded-full bg-white/5" />

                  {/* Status Badge - top right */}
                  <div className="absolute top-4 right-4">
                    {course.status === "Published" ? (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider bg-emerald-400 text-white shadow-md border border-emerald-300/50">
                        Published
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider bg-amber-400 text-amber-900 shadow-md border border-amber-300/50">
                        Draft
                      </span>
                    )}
                  </div>

                  {/* Level Badge - bottom left */}
                  {course.level && (
                    <div className="absolute bottom-4 left-4">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-[11px] font-extrabold uppercase tracking-wider bg-slate-800/70 text-white backdrop-blur-sm shadow-sm">
                        Level {course.level}
                      </span>
                    </div>
                  )}
                </div>
              </Link>

              {/* White Content Area */}
              <div className="p-5 flex-1 flex flex-col">
                {/* Title */}
                <Link href={`/teacher/courses/${course.id}`}>
                  <h3 className="font-bold text-[15px] text-slate-800 leading-snug line-clamp-2 mb-3 group-hover:text-indigo-700 transition-colors min-h-[42px]">
                    {course.title}
                  </h3>
                </Link>

                {/* Star Rating */}
                <div className="flex items-center gap-2 mb-4">
                  {course.rating > 0 ? (
                    <>
                      <StarRating rating={course.rating} />
                      <span className="text-sm font-semibold text-slate-500">({course.rating})</span>
                    </>
                  ) : (
                    <span className="text-sm text-slate-400 italic">No ratings yet</span>
                  )}
                </div>

                {/* Draft - Curriculum Progress */}
                {course.status === "Draft" && (
                  <div className="mb-4 space-y-1.5">
                    <div className="flex justify-between text-[11px] font-bold uppercase tracking-wider text-slate-500">
                      <span>Curriculum Progress</span>
                      <span className="text-indigo-600">{course.progress}%</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-indigo-500 to-indigo-400 rounded-full transition-all duration-500"
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* Stats Row */}
                <div className="flex items-center gap-4 text-[13px] text-slate-500 mb-5">
                  <div className="flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-slate-400" />
                    <span className="font-semibold">{course.students.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-slate-400" />
                    <span className="font-semibold">{course.lessons} Lessons</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span className="font-semibold">{course.hours}h</span>
                  </div>
                </div>

                {/* Action Button */}
                <div className="mt-auto pt-1">
                  <Link href={`/teacher/courses/${course.id}`} className="block">
                    <Button className="w-full bg-white hover:bg-indigo-50 text-indigo-600 font-bold border-2 border-indigo-100 hover:border-indigo-300 rounded-xl h-11 shadow-none transition-all duration-200 text-[13px]">
                      {course.status === "Published" ? "Manage Course" : "Continue Editing"}
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between pt-4">
            <span className="text-sm font-semibold text-slate-500">
              Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, allCourses.length)} of {allCourses.length} entries
            </span>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="h-9 w-9 p-0 rounded-lg"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentPage(page)}
                  className={`h-9 w-9 p-0 rounded-lg font-bold ${currentPage === page ? 'bg-[#4f46e5] hover:bg-[#4338ca] text-white shadow-sm' : 'border-slate-200 text-slate-600'}`}
                >
                  {page}
                </Button>
              ))}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="h-9 w-9 p-0 rounded-lg"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

