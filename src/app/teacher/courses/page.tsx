"use client";

import { Plus, Users, Star, BarChart3, Clock, BookOpen, MoreVertical, Edit, Copy, Trash2, LayoutGrid } from "lucide-react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { teacherSidebarItems } from "@/lib/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

const courses = [
  { id: "c1", title: "TOEIC Listening Mastery (Part 1-4)", students: 1250, rating: 4.8, status: "Published", lessons: 24, hours: 12, image: "bg-indigo-500", progress: 100 },
  { id: "c2", title: "Advanced Reading Strategies (Part 7)", students: 840, rating: 4.9, status: "Published", lessons: 18, hours: 8, image: "bg-emerald-500", progress: 100 },
  { id: "c3", title: "TOEIC Vocabulary Crash Course", students: 0, rating: 0, status: "Draft", lessons: 12, hours: 5, image: "bg-amber-500", progress: 65 },
  { id: "c4", title: "Full Mock Test Walkthrough", students: 320, rating: 4.6, status: "Published", lessons: 10, hours: 20, image: "bg-rose-500", progress: 100 },
];

export default function TeacherCoursesPage() {
  return (
    <DashboardLayout 
      sidebarItems={teacherSidebarItems} 
      title="My Courses" 
      subtitle="Manage your curriculum and track student progress"
      userName="Tran Thi B"
      headerContent={
        <div className="flex gap-3 ml-auto">
          <Button className="bg-[#4f46e5] hover:bg-[#4338ca] text-white font-bold rounded-xl h-10 px-5 shadow-sm transition-colors gap-2">
            <Plus className="w-4 h-4 stroke-[3]"/> Create New Course
          </Button>
        </div>
      }
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
          <div className="flex gap-2">
            <Button variant="outline" className="bg-white border-slate-200 text-slate-800 font-bold rounded-xl shadow-sm h-9 px-4">All Courses</Button>
            <Button variant="ghost" className="text-slate-500 font-bold rounded-xl h-9 px-4">Published (3)</Button>
            <Button variant="ghost" className="text-slate-500 font-bold rounded-xl h-9 px-4">Drafts (1)</Button>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" className="h-9 w-9 rounded-xl bg-slate-100 text-slate-700 border-none"><LayoutGrid className="w-4 h-4" /></Button>
            <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl text-slate-400"><BookOpen className="w-4 h-4" /></Button>
          </div>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {courses.map((course) => (
            <div key={course.id} className="group bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col hover:-translate-y-1">
              {/* Image Banner */}
              <Link href={`/teacher/courses/${course.id}`} className="relative h-44 block overflow-hidden">
                <div className={`absolute inset-0 ${course.image} opacity-90 group-hover:scale-105 transition-transform duration-500`}></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                
                <div className="absolute top-4 left-4">
                  {course.status === 'Published' ? (
                    <Badge className="bg-emerald-500 hover:bg-emerald-600 text-white border-none shadow-sm font-bold px-2.5 py-0.5 rounded-lg text-[11px] uppercase tracking-wider">Published</Badge>
                  ) : (
                    <Badge className="bg-amber-400 hover:bg-amber-500 text-amber-950 border-none shadow-sm font-bold px-2.5 py-0.5 rounded-lg text-[11px] uppercase tracking-wider">Draft</Badge>
                  )}
                </div>
                <div className="absolute top-4 right-4">
                  <Button size="icon" variant="secondary" className="w-8 h-8 rounded-full bg-white/20 hover:bg-white backdrop-blur-sm text-white hover:text-slate-900 transition-colors shadow-sm opacity-0 group-hover:opacity-100">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </div>

                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="font-extrabold text-lg leading-tight line-clamp-2">{course.title}</h3>
                </div>
              </Link>

              {/* Content */}
              <div className="p-5 flex-1 flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1.5">
                    <Star className={`w-4 h-4 ${course.rating > 0 ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}`} />
                    <span className="text-sm font-bold text-slate-700">{course.rating > 0 ? course.rating : 'N/A'}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-slate-400" />
                    <span className="text-sm font-bold text-slate-700">{course.students.toLocaleString()}</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-[13px] font-semibold text-slate-500 mb-6">
                  <div className="flex items-center gap-1.5 bg-slate-50 px-2 py-1 rounded-md border border-slate-100">
                    <BookOpen className="w-3.5 h-3.5 text-indigo-500" /> {course.lessons} Lessons
                  </div>
                  <div className="flex items-center gap-1.5 bg-slate-50 px-2 py-1 rounded-md border border-slate-100">
                    <Clock className="w-3.5 h-3.5 text-emerald-500" /> {course.hours}h
                  </div>
                </div>

                {course.status === 'Draft' && (
                  <div className="mb-6 space-y-2">
                    <div className="flex justify-between text-[11px] font-bold uppercase text-slate-500">
                      <span>Curriculum Progress</span>
                      <span className="text-indigo-600">{course.progress}%</span>
                    </div>
                    <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${course.progress}%` }}></div>
                    </div>
                  </div>
                )}

                <div className="mt-auto grid grid-cols-2 gap-2">
                  <Link href={`/teacher/courses/${course.id}`} className="col-span-2">
                    <Button className="w-full bg-slate-50 hover:bg-indigo-50 text-indigo-700 font-bold border border-slate-200 hover:border-indigo-200 rounded-xl h-10 shadow-none transition-colors">
                      {course.status === 'Published' ? 'Manage Course' : 'Continue Editing'}
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
