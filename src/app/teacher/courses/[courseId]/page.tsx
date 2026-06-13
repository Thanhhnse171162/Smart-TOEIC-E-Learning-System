"use client";

import { useState, use, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { clearSession } from "@/lib/auth/session";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { teacherSidebarItems } from "@/lib/navigation";
import { getStoredUser } from "@/lib/auth/session";
import {
  ArrowLeft, Plus, PlayCircle, FileText, CheckCircle2,
  MoreVertical, Users, Settings, BookOpen, GripVertical, HelpCircle, X, Video, FileCheck2, Loader2, AlertCircle, Trash2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  apiGetTeacherCourseById, 
  apiGetCourseLessons, 
  apiCreateCourseLesson, 
  apiDeleteCourseLesson, 
  apiUpdateTeacherCourse,
  ApiTeacherCourse, 
  ApiCourseLesson 
} from "@/lib/teacher-courses-api";

export default function ManageCoursePage({ params }: { params: Promise<{ courseId: string }> }) {
  const router = useRouter();
  const { courseId } = use(params);
  const [activeTab, setActiveTab] = useState("curriculum");
  
  const [course, setCourse] = useState<ApiTeacherCourse | null>(null);
  const [lessons, setLessons] = useState<ApiCourseLesson[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const me = getStoredUser();

  // Modals state
  const [isSelectLessonTypeOpen, setIsSelectLessonTypeOpen] = useState(false);
  const [lessonFormType, setLessonFormType] = useState<"Video" | "Document" | "Quiz" | null>(null);
  const [newLessonData, setNewLessonData] = useState({ title: "", duration: "", videoUrl: "" });
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        const [courseData, lessonsData] = await Promise.all([
          apiGetTeacherCourseById(courseId),
          apiGetCourseLessons(courseId)
        ]);
        setCourse(courseData);
        setLessons(lessonsData);
      } catch (err: any) {
        if (err.message === "Unauthorized" || err.message.includes("401")) {
          clearSession();
          router.push("/login");
          return;
        }
        setError(err.message || "Failed to load course details");
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, [courseId, router]);

  // Add Lesson Handlers
  const handleOpenAddLesson = () => {
    setIsSelectLessonTypeOpen(true);
  };

  const handleSelectLessonType = (type: "Video" | "Document" | "Quiz") => {
    setIsSelectLessonTypeOpen(false);
    setLessonFormType(type);
    setNewLessonData({ title: "", duration: "", videoUrl: "" });
    setUploadedFiles([]);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setUploadedFiles(prev => [...prev, ...Array.from(e.target.files!)]);
    }
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleAddLessonSubmit = async () => {
    if (!newLessonData.title.trim() || !lessonFormType) return;
    setIsSubmitting(true);
    try {
      const descriptionText = newLessonData.duration 
        ? `${lessonFormType} - ${newLessonData.duration}`
        : `${lessonFormType} Lesson`;
        
      const newLesson = await apiCreateCourseLesson(courseId, {
        title: newLessonData.title,
        description: descriptionText,
        videoUrl: newLessonData.videoUrl || undefined
      });
      setLessons([...lessons, newLesson]);
      setLessonFormType(null);
      setUploadedFiles([]);
    } catch (err: any) {
      if (err.message === "Unauthorized" || err.message.includes("401")) {
        clearSession();
        router.push("/login");
        return;
      }
      alert("Failed to add lesson: " + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteLesson = async (lessonId: number) => {
    if (!confirm("Are you sure you want to delete this lesson?")) return;
    try {
      await apiDeleteCourseLesson(courseId, lessonId);
      setLessons(lessons.filter(l => l.lessonId !== lessonId));
    } catch (err: any) {
       if (err.message === "Unauthorized" || err.message.includes("401")) {
        clearSession();
        router.push("/login");
        return;
      }
      alert("Failed to delete lesson: " + err.message);
    }
  };

  const handleTogglePublish = async () => {
    if (!course) return;
    const newStatus = course.status === "Published" ? "Draft" : "Published";
    try {
      const updatedCourse = await apiUpdateTeacherCourse(courseId, { status: newStatus });
      setCourse(updatedCourse);
      alert(`Course ${newStatus === "Published" ? "published" : "un-published"} successfully!`);
    } catch (err: any) {
       if (err.message === "Unauthorized" || err.message.includes("401")) {
        clearSession();
        router.push("/login");
        return;
      }
      alert(`Failed to ${newStatus === "Published" ? "publish" : "un-publish"} course: ` + err.message);
    }
  };

  if (isLoading) {
    return (
      <DashboardLayout sidebarItems={teacherSidebarItems} title="Manage Course" sidebarTitle="Teacher">
        <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-indigo-500" /></div>
      </DashboardLayout>
    );
  }

  if (error || !course) {
    return (
      <DashboardLayout sidebarItems={teacherSidebarItems} title="Manage Course" sidebarTitle="Teacher">
        <div className="flex justify-center py-20 text-rose-500 font-bold bg-rose-50 border border-rose-200 m-6 rounded-xl p-6">
          <AlertCircle className="w-5 h-5 mr-2" /> {error || "Course not found"}
        </div>
      </DashboardLayout>
    );
  }

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
                <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 font-bold px-2 py-0.5 rounded-md shadow-none">{course.status || "Draft"}</Badge>
              </div>
              <p className="text-sm font-bold text-slate-500">ID: {courseId} • Level: {course.level}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button 
              onClick={handleTogglePublish}
              className={`${course.status === "Published" ? "bg-amber-500 hover:bg-amber-600" : "bg-[#4f46e5] hover:bg-[#4338ca]"} text-white font-bold rounded-xl h-10 px-6 shadow-sm`}
            >
              {course.status === "Published" ? "Unpublish Course" : "Publish Course"}
            </Button>
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
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
              {/* Module Header */}
              <div className="bg-slate-50 border-b border-slate-200 p-4 flex items-center justify-between group">
                <div className="flex items-center gap-3">
                  <div className="cursor-grab text-slate-300"><GripVertical className="w-5 h-5" /></div>
                  <div>
                    <h3 className="font-bold text-[15px] text-slate-800">Course Content</h3>
                    <p className="text-[12px] font-semibold text-slate-500">{lessons.length} lessons</p>
                  </div>
                </div>
              </div>

              {/* Lessons List */}
              <div className="divide-y divide-slate-100">
                {lessons.map((lesson, lIdx) => (
                  <div key={lesson.lessonId} className="p-4 pl-12 flex items-center justify-between hover:bg-slate-50/50 transition-colors group">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 bg-indigo-100 text-indigo-600">
                        <PlayCircle className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="font-semibold text-[14px] text-slate-700 flex items-center gap-2">
                          Lesson {lIdx + 1}: {lesson.title}
                        </p>
                        <p className="text-[11px] font-bold text-slate-400 mt-0.5">{lesson.description || "Lesson"}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button variant="outline" size="sm" className="h-8 font-bold text-xs border-slate-200">Edit</Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDeleteLesson(lesson.lessonId)} className="h-8 w-8 text-rose-400 hover:text-rose-600 hover:bg-rose-50"><Trash2 className="w-4 h-4" /></Button>
                    </div>
                  </div>
                ))}
                
                {lessons.length === 0 && (
                   <div className="p-10 text-center text-slate-500 font-semibold text-sm">
                     No lessons added yet. Click below to add your first lesson!
                   </div>
                )}
                
                {/* Add Lesson Button */}
                <div className="p-3 pl-12 bg-white">
                  <Button onClick={handleOpenAddLesson} variant="ghost" className="text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 font-bold text-sm h-9 px-3 border border-dashed border-transparent hover:border-indigo-200 w-full justify-start">
                    <Plus className="w-4 h-4 mr-2" /> Add New Lesson
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "students" && (
          <div className="bg-white border border-slate-200 rounded-2xl p-16 text-center shadow-sm">
             <Users className="w-12 h-12 text-slate-300 mx-auto mb-4" />
             <h3 className="text-lg font-bold text-slate-800 mb-1">Student Roster</h3>
             <p className="text-slate-500 font-medium mb-6">View and manage students enrolled in this course.</p>
             <Button variant="outline" className="font-bold border-slate-200">Export Student List</Button>
          </div>
        )}

        {activeTab === "settings" && (
          <div className="bg-white border border-slate-200 rounded-2xl p-16 text-center shadow-sm">
             <Settings className="w-12 h-12 text-slate-300 mx-auto mb-4" />
             <h3 className="text-lg font-bold text-slate-800 mb-1">Course Settings</h3>
             <p className="text-slate-500 font-medium mb-6">Update course title, thumbnail, pricing, and visibility.</p>
             <Button variant="outline" className="font-bold border-slate-200">Edit Settings</Button>
          </div>
        )}
      </div>

      {/* --- Overlays & Modals --- */}

      {/* Select Lesson Type Modal */}
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

      {/* Add Lesson Data Modal */}
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

              {lessonFormType === "Video" && (
                <div className="space-y-2 pt-2 border-t border-slate-100">
                   <Label className="text-sm font-bold text-slate-700">Video Link</Label>
                   <Input 
                     value={newLessonData.videoUrl}
                     onChange={e => setNewLessonData({ ...newLessonData, videoUrl: e.target.value })}
                     placeholder="https://youtube.com/..." 
                     className="h-11 rounded-xl bg-slate-50" 
                   />
                </div>
              )}
              {lessonFormType === "Document" && (
                <div className="space-y-3 pt-2 border-t border-slate-100">
                   <Label className="text-sm font-bold text-slate-700">Upload PDF / Document</Label>
                   <div className="border-2 border-dashed border-slate-200 rounded-xl h-24 flex items-center justify-center text-slate-400 font-bold text-xs bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer relative overflow-hidden group">
                     <span className="group-hover:text-indigo-500 transition-colors">Click to browse or drag file here</span>
                     <input type="file" accept=".pdf,.doc,.docx" multiple onChange={handleFileChange} className="absolute inset-0 opacity-0 cursor-pointer" />
                   </div>
                   
                   {uploadedFiles.length > 0 && (
                     <div className="space-y-2 mt-2">
                       {uploadedFiles.map((file, idx) => (
                         <div key={idx} className="flex items-center justify-between bg-white border border-slate-200 rounded-lg p-2.5 px-3">
                           <div className="flex items-center gap-2 overflow-hidden">
                             <FileCheck2 className="w-4 h-4 text-emerald-500 shrink-0" />
                             <span className="text-[13px] font-semibold text-slate-700 truncate">{file.name}</span>
                           </div>
                           <Button variant="ghost" size="icon" onClick={() => removeFile(idx)} className="w-6 h-6 rounded-full text-slate-400 hover:text-rose-500 hover:bg-rose-50 shrink-0">
                             <X className="w-3.5 h-3.5" />
                           </Button>
                         </div>
                       ))}
                     </div>
                   )}
                </div>
              )}
              {lessonFormType === "Quiz" && (
                <div className="space-y-2 pt-2 border-t border-slate-100">
                   <Label className="text-sm font-bold text-slate-700">Select Practice Test</Label>
                   <select className="w-full h-11 px-3 rounded-xl border border-slate-200 text-sm font-bold bg-slate-50 outline-none focus:border-indigo-500">
                     <option>Select a test from Test Bank...</option>
                     <option>Listening Mini-Test 1</option>
                     <option>Reading Practice Test</option>
                   </select>
                </div>
              )}
            </div>

            <div className="p-5 border-t border-slate-100 flex items-center justify-end gap-3 bg-slate-50">
              <Button variant="outline" onClick={() => setLessonFormType(null)} className="font-bold rounded-xl h-10 px-6 border-slate-200 text-slate-700">Cancel</Button>
              <Button onClick={handleAddLessonSubmit} disabled={!newLessonData.title.trim() || isSubmitting} className="bg-[#4f46e5] hover:bg-[#4338ca] text-white font-bold rounded-xl h-10 px-6 shadow-sm">
                {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : "Add Lesson"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
