"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { clearSession } from "@/lib/auth/session";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { teacherSidebarItems } from "@/lib/navigation";
import {
  ArrowLeft, UploadCloud, Target, Clock, BookOpen,
  DollarSign, CheckCircle2, AlertTriangle, BookMarked,
  Image as ImageIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { apiCreateTeacherCourse } from "@/lib/teacher-courses-api";

export default function CreateCoursePage() {
  const router = useRouter();
  
  const [title, setTitle] = useState("");
  const [targetScore, setTargetScore] = useState("");
  const [duration, setDuration] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setCoverImage(URL.createObjectURL(file));
  };

  const handleCreate = async () => {
    if (!title.trim() || !targetScore || !duration) {
      setError("Please fill in all required fields (Title, Target Score, Duration).");
      return;
    }
    setError("");
    setIsSubmitting(true);
    
    try {
      await apiCreateTeacherCourse({
        title: title.trim(),
        description: description.trim(),
        level: targetScore, // mapping targetScore to level
        price: price ? parseFloat(price) : 0,
      });
      alert("Course Created Successfully!");
      router.push("/teacher/courses");
    } catch (err: any) {
      if (err.message === "Unauthorized" || err.message.includes("401")) {
        clearSession();
        router.push("/login");
        return;
      }
      setError(err.message || "Failed to create course. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <DashboardLayout
      sidebarItems={teacherSidebarItems}
      title=""
      sidebarTitle="Teacher"
    >
      <div className="w-full max-w-[1000px] mx-auto pb-10 pt-4 px-4">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/teacher/courses">
            <Button variant="outline" size="icon" className="w-10 h-10 rounded-xl border-slate-200">
              <ArrowLeft className="w-4 h-4 text-slate-600" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900">Create New Course</h1>
            <p className="text-sm font-bold text-slate-500">Set up a new learning path for your students</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-4">
                <BookMarked className="w-5 h-5 text-indigo-600" />
                <h2 className="text-[15px] font-bold text-slate-800">Basic Information</h2>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-sm font-bold text-slate-700">Course Title <span className="text-rose-500">*</span></Label>
                  <Input 
                    value={title} 
                    onChange={e => { setTitle(e.target.value); setError(""); }} 
                    placeholder="e.g., TOEIC 800+ Masterclass: Intensive Reading" 
                    className={`h-12 rounded-xl font-medium ${error && !title ? 'border-rose-300 bg-rose-50/50' : 'border-slate-200'}`}
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-bold text-slate-700">Course Description</Label>
                  <Textarea 
                    value={description} 
                    onChange={e => setDescription(e.target.value)} 
                    placeholder="What will students learn in this course? What are the prerequisites?" 
                    className="min-h-[120px] rounded-xl border-slate-200 font-medium resize-none bg-slate-50"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-4">
                <Target className="w-5 h-5 text-indigo-600" />
                <h2 className="text-[15px] font-bold text-slate-800">Course Metrics</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label className="text-sm font-bold text-slate-700">Target TOEIC Score <span className="text-rose-500">*</span></Label>
                  <div className="relative">
                    <Target className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <select 
                      value={targetScore} 
                      onChange={e => { setTargetScore(e.target.value); setError(""); }}
                      className={`w-full h-11 pl-9 rounded-xl border text-sm font-bold appearance-none outline-none ${error && !targetScore ? 'border-rose-300 bg-rose-50/50 text-rose-700' : 'border-slate-200 bg-white text-slate-700 focus:ring-2 focus:ring-indigo-500'}`}
                    >
                      <option value="">Select target...</option>
                      <option value="450+">Beginner (450+)</option>
                      <option value="600+">Intermediate (600+)</option>
                      <option value="800+">Advanced (800+)</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-bold text-slate-700">Estimated Duration <span className="text-rose-500">*</span></Label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input 
                      value={duration} 
                      onChange={e => { setDuration(e.target.value); setError(""); }} 
                      placeholder="e.g., 8 Weeks" 
                      className={`h-11 pl-9 rounded-xl font-medium text-sm ${error && !duration ? 'border-rose-300 bg-rose-50/50' : 'border-slate-200'}`}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-bold text-slate-700">Pricing (VND)</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input 
                      type="number"
                      value={price} 
                      onChange={e => setPrice(e.target.value)} 
                      placeholder="Leave empty for free" 
                      className="h-11 pl-9 rounded-xl border-slate-200 font-medium text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar / Cover Image */}
          <div className="space-y-6">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-4">
                <ImageIcon className="w-5 h-5 text-indigo-600" />
                <h2 className="text-[15px] font-bold text-slate-800">Cover Image</h2>
              </div>
              
              <input type="file" accept="image/*" className="hidden" ref={fileInputRef} onChange={handleImageUpload} />
              
              {!coverImage ? (
                <div onClick={() => fileInputRef.current?.click()} className="border-2 border-dashed border-slate-200 rounded-xl h-[180px] flex flex-col items-center justify-center text-slate-400 hover:bg-slate-50 hover:border-indigo-300 transition-colors cursor-pointer">
                  <UploadCloud className="w-8 h-8 text-indigo-500 mb-3" />
                  <span className="text-[13px] font-bold text-slate-600">Upload Cover Image</span>
                  <span className="text-[11px] font-semibold text-slate-400 mt-1">1920x1080px recommended</span>
                </div>
              ) : (
                <div className="relative border border-slate-200 rounded-xl h-[180px] overflow-hidden group">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={coverImage} alt="Cover Preview" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-3 backdrop-blur-sm">
                    <Button size="sm" variant="secondary" onClick={() => fileInputRef.current?.click()} className="font-bold">Change</Button>
                    <Button size="sm" variant="destructive" onClick={() => setCoverImage(null)} className="font-bold">Remove</Button>
                  </div>
                </div>
              )}
            </div>

            <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-2xl p-6 shadow-md text-white">
              <h3 className="font-extrabold text-lg mb-2 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" /> What&apos;s next?
              </h3>
              <p className="text-indigo-100 text-[13px] font-medium leading-relaxed mb-4">
                After creating the base course, you&apos;ll be redirected to the Course Dashboard where you can:
              </p>
              <ul className="space-y-2 text-[13px] font-bold text-white/90">
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-white rounded-full"/> Add Modules & Lessons</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-white rounded-full"/> Attach Practice Tests</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-white rounded-full"/> Invite Students</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 px-6 rounded-2xl border border-slate-200 shadow-sm">
          {error ? (
             <div className="flex items-center gap-2 text-rose-600 bg-rose-50 px-3 py-1.5 rounded-lg text-sm font-bold border border-rose-200">
              <AlertTriangle className="w-4 h-4" /> {error}
            </div>
          ) : (
            <span className="text-sm font-bold text-slate-500">Draft will be automatically saved.</span>
          )}
          
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Link href="/teacher/courses" className="w-full sm:w-auto">
              <Button variant="outline" className="w-full sm:w-auto font-bold rounded-xl h-11 px-6 border-slate-200 text-slate-700">Cancel</Button>
            </Link>
            <Button onClick={handleCreate} disabled={isSubmitting} className="w-full sm:w-auto bg-[#4f46e5] hover:bg-[#4338ca] text-white font-bold rounded-xl h-11 px-8 shadow-sm">
              {isSubmitting ? "Creating..." : "Create Course"}
            </Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
