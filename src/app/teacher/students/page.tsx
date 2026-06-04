"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { teacherSidebarItems } from "@/lib/navigation";
import {
  Users, Search, TrendingUp, MoreVertical, 
  UserCheck, Clock, BookOpen, ChevronLeft, ChevronRight, Eye, ChevronDown, Download, X, Ban, ExternalLink
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

// Mock Data
const MOCK_STUDENTS = [
  {
    id: "S1001",
    name: "Nguyen Van A",
    email: "nguyenvana@example.com",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    courses: ["TOEIC Listening Mastery", "Vocabulary Crash Course"],
    completionRate: 75,
    lastActive: "2 hours ago",
    status: "Active"
  },
  {
    id: "S1002",
    name: "Tran Thi My Linh",
    email: "mylinh.tran@example.com",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    courses: ["Advanced Reading Strategies"],
    completionRate: 100,
    lastActive: "1 day ago",
    status: "Completed"
  },
  {
    id: "S1003",
    name: "Le Hoang Anh",
    email: "hoanganh.le@example.com",
    avatar: "https://i.pravatar.cc/150?u=a04258114e29026702d",
    courses: ["TOEIC Listening Mastery", "Grammar Foundation", "Full Mock Tests"],
    completionRate: 30,
    lastActive: "2 weeks ago",
    status: "Inactive"
  },
  {
    id: "S1004",
    name: "Pham Minh Tuan",
    email: "tuanpm@example.com",
    avatar: "https://i.pravatar.cc/150?img=11",
    courses: ["Grammar Foundation"],
    completionRate: 15,
    lastActive: "5 mins ago",
    status: "Active"
  },
  {
    id: "S1005",
    name: "Hoang Quynh Nga",
    email: "ngahoang@example.com",
    avatar: "https://i.pravatar.cc/150?img=5",
    courses: ["Full Mock Tests", "Advanced Reading Strategies"],
    completionRate: 90,
    lastActive: "3 days ago",
    status: "Active"
  },
  {
    id: "S1006",
    name: "Vo Thanh Trung",
    email: "trungvt@example.com",
    avatar: "https://i.pravatar.cc/150?img=8",
    courses: ["TOEIC Listening Mastery"],
    completionRate: 5,
    lastActive: "1 month ago",
    status: "Inactive"
  }
];

export default function TeacherStudentsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCourse, setFilterCourse] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [selectedStudent, setSelectedStudent] = useState<typeof MOCK_STUDENTS[0] | null>(null);
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);

  const filteredStudents = MOCK_STUDENTS.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) || s.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCourse = filterCourse === "all" || s.courses.some(c => c.includes(filterCourse));
    const matchesStatus = filterStatus === "all" || s.status.toLowerCase() === filterStatus.toLowerCase();
    return matchesSearch && matchesCourse && matchesStatus;
  });

  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);
  const paginatedStudents = filteredStudents.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const stats = [
    { label: "Total Students", value: "1,250", icon: Users, color: "text-indigo-600", bg: "bg-indigo-50", trend: "+42 this month" },
    { label: "Active Learners", value: "840", icon: UserCheck, color: "text-emerald-600", bg: "bg-emerald-50", trend: "67% of total" },
    { label: "Avg. Completion", value: "65%", icon: TrendingUp, color: "text-amber-600", bg: "bg-amber-50", trend: "+5% vs last month" },
    { label: "Inactive Risk", value: "124", icon: Clock, color: "text-rose-600", bg: "bg-rose-50", trend: "Needs attention" },
  ];

  return (
    <DashboardLayout
      sidebarItems={teacherSidebarItems}
      title="Student Management (CRM)"
      subtitle="Track progress and manage relationships with all your enrolled students"
      userName="Tran Thi B"
    >
      <div className="w-full max-w-[1400px] mx-auto pb-10 space-y-6">
        
        {/* Top Analytics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.bg}`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <span className="text-[11px] font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded-md">{stat.trend}</span>
              </div>
              <div>
                <p className="text-3xl font-black text-slate-800">{stat.value}</p>
                <p className="text-sm font-semibold text-slate-500 mt-1 uppercase tracking-wider">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Toolbar: Search & Filters & Actions */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
            {/* Search */}
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input 
                placeholder="Search by name or email..." 
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="pl-9 h-11 rounded-xl bg-slate-50 border-slate-200 text-sm font-medium focus-visible:ring-indigo-500 w-full"
              />
            </div>

            {/* Filter by Course */}
            <div className="relative w-full sm:w-48">
              <BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <select 
                value={filterCourse}
                onChange={e => setFilterCourse(e.target.value)}
                className="w-full h-11 pl-9 pr-8 rounded-xl border border-slate-200 text-sm font-bold text-slate-600 bg-slate-50 appearance-none outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="all">All Courses</option>
                <option value="Listening">Listening Mastery</option>
                <option value="Reading">Reading Strategies</option>
                <option value="Grammar">Grammar Foundation</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
            </div>

            {/* Filter by Status */}
            <div className="relative w-full sm:w-40">
              <select 
                value={filterStatus}
                onChange={e => setFilterStatus(e.target.value)}
                className="w-full h-11 px-4 pr-8 rounded-xl border border-slate-200 text-sm font-bold text-slate-600 bg-slate-50 appearance-none outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="all">All Statuses</option>
                <option value="active">Active</option>
                <option value="completed">Completed</option>
                <option value="inactive">Inactive</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
            </div>
          </div>

          <div className="flex items-center gap-3 w-full lg:w-auto">
            <Button className="w-full lg:w-auto h-11 px-6 rounded-xl font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm gap-2">
              <Download className="w-4 h-4" /> Export Student Data
            </Button>
          </div>
        </div>

        {/* Student Data Table */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100 text-[11px] font-black text-slate-500 uppercase tracking-wider">
                  <th className="p-4 pl-6 whitespace-nowrap w-16">ID</th>
                  <th className="p-4 whitespace-nowrap min-w-[200px]">Student Info</th>
                  <th className="p-4 whitespace-nowrap min-w-[250px]">Enrolled Courses</th>
                  <th className="p-4 whitespace-nowrap w-48">Overall Progress</th>
                  <th className="p-4 whitespace-nowrap w-32">Last Active</th>
                  <th className="p-4 whitespace-nowrap w-24">Status</th>
                  <th className="p-4 pr-6 text-right whitespace-nowrap w-20">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {paginatedStudents.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="p-8 text-center">
                      <p className="text-slate-500 font-bold">No students found matching your filters.</p>
                    </td>
                  </tr>
                ) : paginatedStudents.map((student) => (
                  <tr key={student.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="p-4 pl-6">
                      <span className="text-[13px] font-bold text-slate-400">#{student.id}</span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={student.avatar} alt={student.name} className="w-10 h-10 rounded-full border border-slate-200 object-cover" />
                        <div>
                          <p className="font-bold text-[14px] text-slate-800">{student.name}</p>
                          <p className="text-[12px] font-semibold text-slate-500">{student.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex flex-wrap gap-1.5">
                        {student.courses.slice(0, 2).map((course, idx) => (
                          <Badge key={idx} className="bg-slate-100 text-slate-600 border-none px-2 py-0.5 rounded-md font-bold text-[11px] shadow-none hover:bg-slate-200">
                            {course}
                          </Badge>
                        ))}
                        {student.courses.length > 2 && (
                          <Badge className="bg-indigo-50 text-indigo-600 border-none px-2 py-0.5 rounded-md font-bold text-[11px] shadow-none">
                            +{student.courses.length - 2} more
                          </Badge>
                        )}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-3 w-full max-w-[150px]">
                        <Progress value={student.completionRate} className={`h-2 flex-1 ${student.completionRate === 100 ? '[&>div]:bg-emerald-500' : '[&>div]:bg-indigo-500'}`} />
                        <span className="text-[12px] font-bold text-slate-600 w-9 text-right">{student.completionRate}%</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="text-[13px] font-semibold text-slate-500">{student.lastActive}</span>
                    </td>
                    <td className="p-4">
                      <Badge className={`
                        border-none shadow-none px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider
                        ${student.status === 'Active' ? 'bg-emerald-50 text-emerald-700' : 
                          student.status === 'Completed' ? 'bg-indigo-50 text-indigo-700' : 
                          'bg-rose-50 text-rose-700'}
                      `}>
                        {student.status}
                      </Badge>
                    </td>
                    <td className="p-4 pr-6 text-right">
                      <div className="flex items-center justify-end gap-1 relative">
                        <Button onClick={() => setSelectedStudent(student)} variant="ghost" size="icon" className="h-8 w-8 text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50">
                          <Eye className="w-4 h-4" />
                        </Button>
                        
                        <div className="relative">
                          <Button 
                            onClick={() => setOpenDropdownId(openDropdownId === student.id ? null : student.id)} 
                            variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-slate-700 hover:bg-slate-100"
                          >
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                          
                          {openDropdownId === student.id && (
                            <div className="absolute right-0 top-full mt-1 w-40 bg-white rounded-xl shadow-lg border border-slate-100 z-10 overflow-hidden text-left animate-in fade-in slide-in-from-top-2">
                              <button onClick={() => { alert("Exporting data for " + student.name); setOpenDropdownId(null); }} className="w-full flex items-center gap-2 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors">
                                <Download className="w-4 h-4" /> Export Record
                              </button>
                              <div className="h-px bg-slate-100 my-1"></div>
                              <button onClick={() => { alert(student.name + " has been suspended."); setOpenDropdownId(null); }} className="w-full flex items-center gap-2 px-3 py-2 text-sm font-semibold text-rose-600 hover:bg-rose-50 transition-colors">
                                <Ban className="w-4 h-4" /> Suspend Student
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Pagination */}
          <div className="p-4 border-t border-slate-100 flex items-center justify-between text-[13px] font-bold text-slate-500 bg-slate-50/50">
            <span>Showing {(currentPage - 1) * itemsPerPage + 1}-{Math.min(currentPage * itemsPerPage, filteredStudents.length)} of {filteredStudents.length}</span>
            <div className="flex gap-1.5">
              <Button 
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))} 
                disabled={currentPage === 1}
                variant="outline" size="sm" className="h-8 px-3 rounded-lg border-slate-200 font-bold hover:bg-slate-100"
              >
                Previous
              </Button>
              {Array.from({length: totalPages}, (_, i) => i + 1).map(page => (
                <Button 
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  variant={currentPage === page ? "default" : "outline"} 
                  size="sm" 
                  className={`h-8 w-8 rounded-lg font-bold ${currentPage === page ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm' : 'border-slate-200 hover:bg-slate-100 text-slate-600'}`}
                >
                  {page}
                </Button>
              ))}
              <Button 
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))} 
                disabled={currentPage === totalPages || totalPages === 0}
                variant="outline" size="sm" className="h-8 px-3 rounded-lg border-slate-200 font-bold hover:bg-slate-100"
              >
                Next
              </Button>
            </div>
          </div>
        </div>

      </div>

      {/* Student Profile Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 bg-slate-900/40 z-50 flex items-center justify-center backdrop-blur-sm px-4">
          <div className="bg-white rounded-3xl shadow-xl w-full max-w-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="relative h-24 bg-gradient-to-r from-indigo-500 to-indigo-600">
              <Button variant="ghost" size="icon" onClick={() => setSelectedStudent(null)} className="absolute top-4 right-4 rounded-full text-white hover:bg-white/20">
                <X className="w-5 h-5" />
              </Button>
            </div>
            
            {/* Content */}
            <div className="px-8 pb-8 pt-0 relative">
              {/* Avatar & Basic Info */}
              <div className="flex flex-col sm:flex-row gap-5 items-start sm:items-end -mt-10 mb-6">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={selectedStudent.avatar} alt={selectedStudent.name} className="w-24 h-24 rounded-2xl border-4 border-white shadow-md object-cover bg-white" />
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h2 className="text-2xl font-black text-slate-900">{selectedStudent.name}</h2>
                    <Badge className={`border-none shadow-none px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${selectedStudent.status === 'Active' ? 'bg-emerald-50 text-emerald-700' : selectedStudent.status === 'Completed' ? 'bg-indigo-50 text-indigo-700' : 'bg-rose-50 text-rose-700'}`}>
                      {selectedStudent.status}
                    </Badge>
                  </div>
                  <p className="text-sm font-semibold text-slate-500">{selectedStudent.email} • ID: {selectedStudent.id}</p>
                </div>
                <Button className="w-full sm:w-auto font-bold rounded-xl h-10 px-5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 shadow-none gap-2">
                   <ExternalLink className="w-4 h-4" /> View Full Transcript
                </Button>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Enrolled Courses</p>
                  <p className="text-xl font-black text-slate-800">{selectedStudent.courses.length}</p>
                </div>
                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Avg. Progress</p>
                  <div className="flex items-center gap-2">
                    <p className="text-xl font-black text-slate-800">{selectedStudent.completionRate}%</p>
                  </div>
                </div>
                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Tests Taken</p>
                  <p className="text-xl font-black text-slate-800">12</p>
                </div>
                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Last Active</p>
                  <p className="text-sm font-black text-slate-800 mt-1">{selectedStudent.lastActive}</p>
                </div>
              </div>

              {/* Course Progress List */}
              <h3 className="font-extrabold text-slate-800 mb-4">Course Progress Details</h3>
              <div className="space-y-3">
                {selectedStudent.courses.map((course, idx) => {
                  // Fake progress per course for demo
                  const progress = Math.min(100, selectedStudent.completionRate + (idx * 15));
                  return (
                    <div key={idx} className="flex items-center justify-between p-4 bg-white border border-slate-100 rounded-xl hover:shadow-sm transition-shadow">
                      <div className="flex items-center gap-3 w-1/2">
                        <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center shrink-0">
                          <BookOpen className="w-5 h-5 text-indigo-600" />
                        </div>
                        <p className="font-bold text-sm text-slate-700 truncate">{course}</p>
                      </div>
                      <div className="w-1/3 flex items-center gap-3">
                        <Progress value={progress} className={`h-2 flex-1 ${progress === 100 ? '[&>div]:bg-emerald-500' : '[&>div]:bg-indigo-500'}`} />
                        <span className="text-[12px] font-bold text-slate-500 w-10 text-right">{progress}%</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
