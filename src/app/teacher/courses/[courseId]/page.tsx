"use client";

import { useState, use } from "react";
import Link from "next/link";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { teacherSidebarItems } from "@/lib/navigation";
import { getStoredUser } from "@/lib/auth/session";
import {
  ArrowLeft, Plus, PlayCircle, FileText, CheckCircle2,
  MoreVertical, Users, Settings, BookOpen, GripVertical, HelpCircle, X, Video, FileCheck2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Mock data
const MOCK_COURSE = {
  id: "c1",
  title: "TOEIC Listening Mastery (Part 1-4)",
  status: "Published",
  students: 1250,
  modules: [
    {
      id: "m1",
      title: "Module 1: Part 1 - Photographs",
      lessons: [
        { id: "l1", title: "Introduction to Part 1", type: "Video", duration: "15:00" },
        { id: "l2", title: "Common Vocabulary & Traps", type: "Document", duration: "10 mins read" },
        { id: "l3", title: "Practice Mini-Test 1", type: "Quiz", duration: "20 Qs" },
      ]
    },
    {
      id: "m2",
      title: "Module 2: Part 2 - Question & Response",
      lessons: [
        { id: "l4", title: "Identifying Question Types (WH- Questions)", type: "Video", duration: "25:00" },
        { id: "l5", title: "Distractor Analysis", type: "Video", duration: "18:00" },
        { id: "l6", title: "Practice Mini-Test 2", type: "Quiz", duration: "30 Qs" },
      ]
    }
  ]
};

export default function ManageCoursePage({ params }: { params: Promise<{ courseId: string }> }) {
  const { courseId } = use(params);
  const [activeTab, setActiveTab] = useState("curriculum");
  const [course, setCourse] = useState(MOCK_COURSE);
  const me = getStoredUser();

  // Modals state
  const [isAddModuleOpen, setIsAddModuleOpen] = useState(false);
  const [newModuleTitle, setNewModuleTitle] = useState("");

  const [isSelectLessonTypeOpen, setIsSelectLessonTypeOpen] = useState(false);
  const [targetModuleId, setTargetModuleId] = useState<string | null>(null);
  
  const [lessonFormType, setLessonFormType] = useState<"Video" | "Document" | "Quiz" | null>(null);
  const [newLessonData, setNewLessonData] = useState({ title: "", duration: "" });

  // Add Module handler
  const handleAddModule = () => {
    if (!newModuleTitle.trim()) return;
    const newModule = {
      id: "m" + Date.now(),
      title: newModuleTitle,
      lessons: []
    };
    setCourse({ ...course, modules: [...course.modules, newModule] });
    setNewModuleTitle("");
    setIsAddModuleOpen(false);
  };

  // Add Lesson Handlers
  const handleOpenAddLesson = (moduleId: string) => {
    setTargetModuleId(moduleId);
    setIsSelectLessonTypeOpen(true);
  };

  const handleSelectLessonType = (type: "Video" | "Document" | "Quiz") => {
    setIsSelectLessonTypeOpen(false);
    setLessonFormType(type);
    setNewLessonData({ title: "", duration: "" });
  };

  const handleAddLessonSubmit = () => {
    if (!newLessonData.title.trim() || !targetModuleId || !lessonFormType) return;
    
    const newLesson = {
      id: "l" + Date.now(),
      title: newLessonData.title,
      type: lessonFormType,
      duration: newLessonData.duration || (lessonFormType === "Video" ? "10:00" : lessonFormType === "Quiz" ? "20 Qs" : "5 mins read")
    };

    setCourse({
      ...course,
      modules: course.modules.map(m => 
        m.id === targetModuleId ? { ...m, lessons: [...m.lessons, newLesson] } : m
      )
    });
    setLessonFormType(null);
    setTargetModuleId(null);
  };

  return (
    <DashboardLayout
      sidebarItems={teacherSidebarItems}
      title="Manage Course"
      sidebarTitle="Teacher"
      userName={me?.fullName ?? "Teacher"}
    >
      <div className="w-full max-w-[1200px] mx-auto pb-10 pt-4 px-4">
        {/* Header Section */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 mb-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link href="/teacher/courses">
              <Button variant="outline" size="icon" className="w-10 h-10 rounded-xl border-slate-200 shrink-0">
                <ArrowLeft className="w-4 h-4 text-slate-600" />
              </Button>
            </Link>
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h1 className="text-xl font-extrabold text-slate-900">{course.title}</h1>
                <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 font-bold px-2 py-0.5 rounded-md shadow-none">{course.status}</Badge>
              </div>
              <p className="text-sm font-bold text-slate-500">ID: {courseId} • {course.students} enrolled students</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="font-bold rounded-xl h-10 px-6 border-slate-200 shadow-sm text-slate-700">Preview Course</Button>
            <Button className="bg-[#4f46e5] hover:bg-[#4338ca] text-white font-bold rounded-xl h-10 px-6 shadow-sm">Save Changes</Button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 mb-6 border-b border-slate-200 pb-px">
          {[
            { id: "curriculum", label: "Curriculum", icon: BookOpen },
            { id: "students", label: "Students", icon: Users },
            { id: "settings", label: "Settings", icon: Settings },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-3 text-sm font-bold border-b-2 transition-colors ${activeTab === tab.id ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'}`}
            >
              <tab.icon className="w-4 h-4" /> {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === "curriculum" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-extrabold text-slate-800">Course Syllabus</h2>
              <Button onClick={() => setIsAddModuleOpen(true)} className="bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold rounded-xl shadow-none border-none">
                <Plus className="w-4 h-4 mr-2" /> Add Module
              </Button>
            </div>

            <div className="space-y-4">
              {course.modules.map((module, mIdx) => (
                <div key={module.id} className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
                  {/* Module Header */}
                  <div className="bg-slate-50 border-b border-slate-200 p-4 flex items-center justify-between group">
                    <div className="flex items-center gap-3">
                      <div className="cursor-grab text-slate-300 hover:text-slate-500"><GripVertical className="w-5 h-5" /></div>
                      <div>
                        <h3 className="font-bold text-[15px] text-slate-800">{module.title}</h3>
                        <p className="text-[12px] font-semibold text-slate-500">{module.lessons.length} lessons</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" className="text-slate-400 hover:text-slate-700"><MoreVertical className="w-4 h-4" /></Button>
                    </div>
                  </div>

                  {/* Lessons List */}
                  <div className="divide-y divide-slate-100">
                    {module.lessons.map((lesson, lIdx) => (
                      <div key={lesson.id} className="p-4 pl-12 flex items-center justify-between hover:bg-slate-50/50 transition-colors group">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${lesson.type === 'Video' ? 'bg-indigo-100 text-indigo-600' : lesson.type === 'Quiz' ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'}`}>
                            {lesson.type === 'Video' ? <PlayCircle className="w-4 h-4" /> : lesson.type === 'Quiz' ? <HelpCircle className="w-4 h-4" /> : <FileText className="w-4 h-4" />}
                          </div>
                          <div>
                            <p className="font-semibold text-[14px] text-slate-700 flex items-center gap-2">
                              Lesson {mIdx + 1}.{lIdx + 1}: {lesson.title}
                              {lesson.type === 'Quiz' && <Badge className="bg-emerald-50 text-emerald-600 border-none px-1.5 py-0 uppercase tracking-wider text-[9px] font-bold">Quiz</Badge>}
                            </p>
                            <p className="text-[11px] font-bold text-slate-400 mt-0.5">{lesson.type} • {lesson.duration}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button variant="outline" size="sm" className="h-8 font-bold text-xs border-slate-200">Edit</Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400"><MoreVertical className="w-4 h-4" /></Button>
                        </div>
                      </div>
                    ))}
                    
                    {/* Add Lesson Button */}
                    <div className="p-3 pl-12 bg-white">
                      <Button onClick={() => handleOpenAddLesson(module.id)} variant="ghost" className="text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 font-bold text-sm h-9 px-3 border border-dashed border-transparent hover:border-indigo-200 w-full justify-start">
                        <Plus className="w-4 h-4 mr-2" /> Add Lesson to {module.title}
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "students" && (
          <div className="bg-white border border-slate-200 rounded-2xl p-16 text-center shadow-sm">
             <Users className="w-12 h-12 text-slate-300 mx-auto mb-4" />
             <h3 className="text-lg font-bold text-slate-800 mb-1">Student Roster</h3>
             <p className="text-slate-500 font-medium mb-6">View and manage all 1,250 students enrolled in this course.</p>
             <Button variant="outline" className="font-bold border-slate-200">Export Student List</Button>
          </div>
        )}

        {activeTab === "settings" && (
          <div className="bg-white border border-slate-200 rounded-2xl p-16 text-center shadow-sm">
             <Settings className="w-12 h-12 text-slate-300 mx-auto mb-4" />
             <h3 className="text-lg font-bold text-slate-800 mb-1">Course Settings</h3>
             <p className="text-slate-500 font-medium mb-6">Update course title, thumbnail, pricing, and visibility.</p>
             <Link href="/teacher/courses/create"><Button variant="outline" className="font-bold border-slate-200">Go to Course Editor</Button></Link>
          </div>
        )}
      </div>

      {/* --- Overlays & Modals --- */}
      
      {/* 1. Add Module Modal */}
      {isAddModuleOpen && (
        <div className="fixed inset-0 bg-slate-900/40 z-50 flex items-center justify-center backdrop-blur-sm px-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-5 border-b border-slate-100 bg-slate-50/50">
              <h3 className="font-extrabold text-lg text-slate-800">Add New Module</h3>
              <Button variant="ghost" size="icon" onClick={() => setIsAddModuleOpen(false)} className="rounded-full text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </Button>
            </div>
            <div className="p-5 space-y-4">
              <div className="space-y-2">
                <Label className="text-sm font-bold text-slate-700">Module Title</Label>
                <Input 
                  value={newModuleTitle} 
                  onChange={e => setNewModuleTitle(e.target.value)} 
                  placeholder="e.g., Module 3: Part 3 - Conversations" 
                  className="h-11 rounded-xl"
                  autoFocus
                />
              </div>
            </div>
            <div className="p-5 border-t border-slate-100 flex items-center justify-end gap-3 bg-slate-50">
              <Button variant="outline" onClick={() => setIsAddModuleOpen(false)} className="font-bold rounded-xl h-10 px-6 border-slate-200 text-slate-700">Cancel</Button>
              <Button onClick={handleAddModule} disabled={!newModuleTitle.trim()} className="bg-[#4f46e5] hover:bg-[#4338ca] text-white font-bold rounded-xl h-10 px-6 shadow-sm">Save Module</Button>
            </div>
          </div>
        </div>
      )}

      {/* 2. Select Lesson Type Modal */}
      {isSelectLessonTypeOpen && (
        <div className="fixed inset-0 bg-slate-900/40 z-50 flex items-center justify-center backdrop-blur-sm px-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-slate-50/50">
              <div>
                <h3 className="font-extrabold text-lg text-slate-800">Select Lesson Type</h3>
                <p className="text-xs font-bold text-slate-500 mt-1">What kind of content do you want to add?</p>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setIsSelectLessonTypeOpen(false)} className="rounded-full text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </Button>
            </div>
            <div className="p-6 grid grid-cols-1 sm:grid-cols-3 gap-4 bg-slate-50">
              <button onClick={() => handleSelectLessonType("Video")} className="bg-white border-2 border-slate-100 hover:border-indigo-400 rounded-2xl p-5 text-left flex flex-col gap-3 transition-all hover:shadow-md group">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Video className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-[14px]">Video Lesson</h4>
                  <p className="text-[11px] font-semibold text-slate-500 mt-1 leading-relaxed">Upload video or paste a URL for students to watch.</p>
                </div>
              </button>
              
              <button onClick={() => handleSelectLessonType("Document")} className="bg-white border-2 border-slate-100 hover:border-amber-400 rounded-2xl p-5 text-left flex flex-col gap-3 transition-all hover:shadow-md group">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <FileCheck2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-[14px]">Document</h4>
                  <p className="text-[11px] font-semibold text-slate-500 mt-1 leading-relaxed">Reading materials, vocabulary lists, or grammar rules.</p>
                </div>
              </button>
              
              <button onClick={() => handleSelectLessonType("Quiz")} className="bg-white border-2 border-slate-100 hover:border-emerald-400 rounded-2xl p-5 text-left flex flex-col gap-3 transition-all hover:shadow-md group">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <HelpCircle className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-[14px]">Quiz / Mini-Test</h4>
                  <p className="text-[11px] font-semibold text-slate-500 mt-1 leading-relaxed">Attach questions from your bank to test their knowledge.</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. Add Lesson Data Modal */}
      {lessonFormType && (
        <div className="fixed inset-0 bg-slate-900/40 z-50 flex items-center justify-center backdrop-blur-sm px-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-5 border-b border-slate-100 bg-slate-50/50">
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${lessonFormType === 'Video' ? 'bg-indigo-100 text-indigo-600' : lessonFormType === 'Quiz' ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'}`}>
                  {lessonFormType === 'Video' ? <Video className="w-4 h-4" /> : lessonFormType === 'Quiz' ? <HelpCircle className="w-4 h-4" /> : <FileCheck2 className="w-4 h-4" />}
                </div>
                <h3 className="font-extrabold text-lg text-slate-800">Add {lessonFormType}</h3>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setLessonFormType(null)} className="rounded-full text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </Button>
            </div>
            
            <div className="p-5 space-y-4">
              <div className="space-y-2">
                <Label className="text-sm font-bold text-slate-700">Lesson Title</Label>
                <Input 
                  value={newLessonData.title} 
                  onChange={e => setNewLessonData({ ...newLessonData, title: e.target.value })} 
                  placeholder={lessonFormType === "Video" ? "e.g., Intro to Part 1" : lessonFormType === "Quiz" ? "e.g., Weekly Mini-Test" : "e.g., Vocabulary List"} 
                  className="h-11 rounded-xl"
                  autoFocus
                />
              </div>
              
              <div className="space-y-2">
                <Label className="text-sm font-bold text-slate-700">{lessonFormType === "Video" ? "Duration (e.g., 15:00)" : lessonFormType === "Quiz" ? "Number of Questions" : "Reading Time"}</Label>
                <Input 
                  value={newLessonData.duration} 
                  onChange={e => setNewLessonData({ ...newLessonData, duration: e.target.value })} 
                  placeholder={lessonFormType === "Video" ? "15:00" : lessonFormType === "Quiz" ? "20 Qs" : "10 mins"} 
                  className="h-11 rounded-xl"
                />
              </div>

              {/* Placeholder for specific fields based on type */}
              {lessonFormType === "Video" && (
                <div className="space-y-2 pt-2 border-t border-slate-100">
                   <Label className="text-sm font-bold text-slate-700">Video Link / Upload</Label>
                   <Input placeholder="https://youtube.com/..." className="h-11 rounded-xl bg-slate-50" />
                </div>
              )}
              {lessonFormType === "Document" && (
                <div className="space-y-2 pt-2 border-t border-slate-100">
                   <Label className="text-sm font-bold text-slate-700">Upload PDF</Label>
                   <div className="border-2 border-dashed border-slate-200 rounded-xl h-24 flex items-center justify-center text-slate-400 font-bold text-xs bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer">
                     Click to upload document
                   </div>
                </div>
              )}
              {lessonFormType === "Quiz" && (
                <div className="space-y-2 pt-2 border-t border-slate-100">
                   <Label className="text-sm font-bold text-slate-700">Select Test Data</Label>
                   <select className="w-full h-11 px-3 rounded-xl border border-slate-200 text-sm font-bold bg-slate-50">
                     <option>Select a test from Test Bank...</option>
                     <option>Weekly Mini-Test #12</option>
                     <option>Full Practice Test 1</option>
                   </select>
                </div>
              )}
            </div>

            <div className="p-5 border-t border-slate-100 flex items-center justify-end gap-3 bg-slate-50">
              <Button variant="outline" onClick={() => setLessonFormType(null)} className="font-bold rounded-xl h-10 px-6 border-slate-200 text-slate-700">Cancel</Button>
              <Button onClick={handleAddLessonSubmit} disabled={!newLessonData.title.trim()} className="bg-[#4f46e5] hover:bg-[#4338ca] text-white font-bold rounded-xl h-10 px-6 shadow-sm">Add Lesson</Button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
