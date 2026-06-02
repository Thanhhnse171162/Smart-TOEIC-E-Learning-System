"use client";

import { BookOpen, Users, PlayCircle, Trophy, Target, Search, Clock, Award } from "lucide-react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { studentSidebarItems } from "@/lib/navigation";
import Link from "next/link";

const courses = [
  { id: "c1", title: "TOEIC Listening Mastery", desc: "Master all 4 listening parts with realistic practice.", level: "Intermediate", lessons: 24, completedLessons: 16, progress: 66, instructor: "Tran Thi B", image: "bg-indigo-500", active: true },
  { id: "c2", title: "Business English for TOEIC", desc: "Essential business vocabulary for high scores.", level: "Beginner", lessons: 16, completedLessons: 16, progress: 100, instructor: "Nguyen Van A", image: "bg-emerald-500", active: false },
  { id: "c4", title: "Full Mock Test Walkthrough", desc: "Detailed breakdown of a full 200-question test.", level: "Advanced", lessons: 10, completedLessons: 2, progress: 20, instructor: "Tran Thi B", image: "bg-rose-500", active: true },
];

export default function CoursesPage() {
  return (
    <DashboardLayout 
      sidebarItems={studentSidebarItems} 
      title="My Learning" 
      subtitle="Pick up where you left off"
    >
      <div className="max-w-[1400px] mx-auto pb-10 space-y-8">
        
        {/* Learning Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-indigo-500 to-[#4f46e5] rounded-3xl p-6 text-white shadow-lg shadow-indigo-200 flex items-center gap-5">
            <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm shrink-0">
              <Target className="w-7 h-7 text-white" />
            </div>
            <div>
              <p className="text-indigo-100 font-semibold text-sm uppercase tracking-wider mb-1">In Progress</p>
              <p className="text-3xl font-black">2 Courses</p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-3xl p-6 text-white shadow-lg shadow-emerald-200 flex items-center gap-5">
            <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm shrink-0">
              <Trophy className="w-7 h-7 text-white" />
            </div>
            <div>
              <p className="text-emerald-100 font-semibold text-sm uppercase tracking-wider mb-1">Completed</p>
              <p className="text-3xl font-black">1 Course</p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-amber-400 to-amber-500 rounded-3xl p-6 text-white shadow-lg shadow-amber-200 flex items-center gap-5">
            <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm shrink-0">
              <Award className="w-7 h-7 text-white" />
            </div>
            <div>
              <p className="text-amber-100 font-semibold text-sm uppercase tracking-wider mb-1">Certificates</p>
              <p className="text-3xl font-black">1</p>
            </div>
          </div>
        </div>

        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-2 pl-4 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex gap-2">
            <Button variant="ghost" className="bg-slate-100 text-slate-800 font-bold rounded-xl shadow-none h-10 px-5 hover:bg-slate-200">Active (2)</Button>
            <Button variant="ghost" className="text-slate-500 font-bold rounded-xl h-10 px-5 hover:bg-slate-50">Completed (1)</Button>
          </div>
          <div className="relative w-full sm:w-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input placeholder="Search your courses..." className="pl-9 bg-slate-50 border-none rounded-xl font-medium sm:w-64 h-10 focus-visible:ring-1 focus-visible:ring-indigo-500" />
          </div>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div key={course.id} className="group bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col">
              
              {/* Image Banner */}
              <Link href={`/student/courses/${course.id}`} className="relative h-48 block overflow-hidden">
                <div className={`absolute inset-0 ${course.image} opacity-90 group-hover:scale-105 transition-transform duration-500`}></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                
                <div className="absolute top-4 left-4">
                  <Badge className="bg-white/20 backdrop-blur-md text-white border-none shadow-none font-bold px-3 py-1 rounded-lg text-xs uppercase tracking-wider hover:bg-white/30">
                    {course.level}
                  </Badge>
                </div>

                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="font-extrabold text-xl leading-tight line-clamp-2 mb-2 group-hover:text-indigo-200 transition-colors">{course.title}</h3>
                  <div className="flex items-center gap-2 text-xs font-medium text-slate-300">
                    <Users className="w-3.5 h-3.5" /> {course.instructor}
                  </div>
                </div>
              </Link>

              {/* Content */}
              <div className="p-6 flex-1 flex flex-col">
                <p className="text-sm font-medium text-slate-600 line-clamp-2 mb-6 h-10">
                  {course.desc}
                </p>

                <div className="mt-auto space-y-5">
                  {course.progress === 100 ? (
                    <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-3 flex items-center justify-center gap-2">
                      <Trophy className="w-5 h-5 text-emerald-500" />
                      <span className="text-sm font-bold text-emerald-700">Course Completed!</span>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs font-bold text-slate-500 uppercase tracking-wider">
                        <span>Progress</span>
                        <span className="text-[#4f46e5]">{course.progress}%</span>
                      </div>
                      <Progress value={course.progress} className="h-2.5 bg-slate-100" />
                      <p className="text-xs font-semibold text-slate-400 text-right">{course.completedLessons} of {course.lessons} lessons</p>
                    </div>
                  )}

                  <Link href={`/student/courses/${course.id}`} className="block">
                    <Button className={`w-full rounded-xl h-11 font-bold shadow-sm transition-all duration-200 ${
                      course.progress === 100 
                        ? 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200' 
                        : 'bg-[#4f46e5] hover:bg-[#4338ca] text-white gap-2 group-hover:shadow-md group-hover:shadow-indigo-200'
                    }`}>
                      {course.progress === 100 ? 'Review Material' : (
                        <>
                          Continue Learning <PlayCircle className="w-4 h-4" />
                        </>
                      )}
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
