"use client";

import Link from "next/link";
import { useState, useRef } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { teacherSidebarItems } from "@/lib/navigation";
import { 
  Search, 
  ChevronDown, 
  X, 
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  UploadCloud,
  Eye,
  Check,
  Calendar,
  Clock,
  Edit3,
  Headphones,
  BookOpen,
  Rocket,
  BarChart,
  Smile,
  BarChart2,
  TrendingUp
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function CreateTestPage() {
  const [step, setStep] = useState(1);
  const [smartSelect, setSmartSelect] = useState(true);

  const [testDuration, setTestDuration] = useState(120);
  const [testQuestions, setTestQuestions] = useState(200);

  const updateDuration = (val: number) => setTestDuration(prev => Math.max(10, prev + val));
  const updateQuestions = (val: number) => setTestQuestions(prev => Math.max(10, prev + val));

  // Image Upload State
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setCoverImage(imageUrl);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCoverImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const StepperHeader = () => (
    <div className="flex items-center gap-4 text-sm font-semibold ml-4">
      <div className={`flex items-center gap-2 ${step >= 1 ? 'text-[#4f46e5] font-bold' : 'text-slate-400'}`}>
        <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[15px] ${step >= 1 ? 'bg-[#4f46e5] text-white' : 'border-2 border-slate-200 text-slate-400'}`}>1</div> Basic Info
      </div>
      <ArrowRight className="w-4 h-4 text-slate-300 mx-1" />
      <div className={`flex items-center gap-2 ${step >= 2 ? 'text-[#4f46e5] font-bold' : 'text-slate-400'}`}>
        <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[15px] ${step >= 2 ? 'bg-[#4f46e5] text-white' : 'border-2 border-slate-200 text-slate-400'}`}>2</div> Select Questions
      </div>
      <ArrowRight className="w-4 h-4 text-slate-300 mx-1" />
      <div className={`flex items-center gap-2 ${step >= 3 ? 'text-[#4f46e5] font-bold' : 'text-slate-400'}`}>
        <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[15px] ${step >= 3 ? 'bg-[#4f46e5] text-white' : 'border-2 border-slate-200 text-slate-400'}`}>3</div> Review & Publish
      </div>
    </div>
  );

  if (step === 1) {
    return (
      <DashboardLayout sidebarItems={teacherSidebarItems} title="" sidebarTitle="Teacher" headerContent={<StepperHeader />}>
        <div className="w-full max-w-[1400px] mx-auto pb-10 pt-2 px-4">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-6">
            <h1 className="text-2xl font-bold text-slate-900">Create New Test</h1>
          </div>

          {/* Form Card */}
          <Card className="rounded-2xl border-slate-200 shadow-sm bg-white overflow-hidden">
            <div className="p-8">
              <div className="flex flex-col xl:flex-row gap-12">
                
                {/* Left Column */}
                <div className="flex-1 space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                    <div className="md:col-span-8 space-y-2">
                      <Label className="text-sm font-bold text-slate-700">Test Title <span className="text-rose-500">*</span></Label>
                      <Input placeholder="e.g., Weekly Practice #12" className="h-12 rounded-xl border-slate-200 bg-white" />
                    </div>
                    
                    <div className="md:col-span-4 space-y-2">
                      <Label className="text-sm font-bold text-slate-700">Test Type</Label>
                      <div className="relative">
                        <select className="w-full h-12 rounded-xl border border-slate-200 px-3 appearance-none bg-white font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm">
                          <option>Full Test</option>
                          <option>Listening Only</option>
                          <option>Reading Only</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <Label className="text-sm font-bold text-slate-700">Level</Label>
                      <div className="grid grid-cols-3 gap-3">
                        <div className="border border-slate-200 rounded-xl p-3 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-slate-50 transition-colors relative h-[90px]">
                          <input type="radio" name="level" className="w-4 h-4 text-indigo-600 border-slate-300 absolute left-3 top-3" />
                          <div className="text-slate-400 mt-2"><Smile className="w-6 h-6"/></div>
                          <span className="text-[13px] font-bold text-slate-600">Beginner</span>
                        </div>
                        <div className="border-2 border-indigo-600 bg-indigo-50/50 rounded-xl p-3 flex flex-col items-center justify-center gap-2 cursor-pointer relative overflow-hidden h-[90px]">
                          <input type="radio" name="level" defaultChecked className="w-4 h-4 text-indigo-600 border-slate-300 absolute left-3 top-3 focus:ring-indigo-500" />
                          <div className="text-indigo-600 mt-2"><BarChart2 className="w-6 h-6"/></div>
                          <span className="text-[13px] font-bold text-indigo-700">Intermediate</span>
                        </div>
                        <div className="border border-slate-200 rounded-xl p-3 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-slate-50 transition-colors relative h-[90px]">
                          <input type="radio" name="level" className="w-4 h-4 text-indigo-600 border-slate-300 absolute left-3 top-3" />
                          <div className="text-slate-400 mt-2"><TrendingUp className="w-6 h-6"/></div>
                          <span className="text-[13px] font-bold text-slate-600">Advanced</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Label className="text-sm font-bold text-slate-700">Test Configuration</Label>
                      <div className="grid grid-cols-3 gap-3">
                        <div className="space-y-1.5">
                          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Duration (min)</span>
                          <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden h-11 bg-white focus-within:ring-2 focus-within:ring-indigo-500">
                            <button onClick={() => updateDuration(-5)} className="px-3 h-full hover:bg-slate-50 text-slate-400 hover:text-indigo-600 font-bold border-r border-slate-200 transition-colors">-</button>
                            <input type="text" value={testDuration} onChange={(e) => setTestDuration(Number(e.target.value) || 0)} className="w-full text-center font-bold text-slate-700 text-sm focus:outline-none" />
                            <button onClick={() => updateDuration(5)} className="px-3 h-full hover:bg-slate-50 text-slate-400 hover:text-indigo-600 font-bold border-l border-slate-200 transition-colors">+</button>
                          </div>
                        </div>
                        <div className="space-y-1.5">
                          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Questions</span>
                          <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden h-11 bg-white focus-within:ring-2 focus-within:ring-indigo-500">
                            <button onClick={() => updateQuestions(-5)} className="px-3 h-full hover:bg-slate-50 text-slate-400 hover:text-indigo-600 font-bold border-r border-slate-200 transition-colors">-</button>
                            <input type="text" value={testQuestions} onChange={(e) => setTestQuestions(Number(e.target.value) || 0)} className="w-full text-center font-bold text-slate-700 text-sm focus:outline-none" />
                            <button onClick={() => updateQuestions(5)} className="px-3 h-full hover:bg-slate-50 text-slate-400 hover:text-indigo-600 font-bold border-l border-slate-200 transition-colors">+</button>
                          </div>
                        </div>
                        <div className="space-y-1.5">
                          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Est. time</span>
                          <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden h-11 bg-slate-50 px-3">
                            <span className="w-full text-center font-bold text-slate-600 text-sm">{Math.floor(testDuration/60)}h {String(testDuration%60).padStart(2, '0')}m</span>
                          </div>
                        </div>
                      </div>
                      <div className="bg-indigo-50/50 text-indigo-700 text-[12px] font-semibold px-4 py-2.5 rounded-xl border border-indigo-100 flex items-center gap-2 mt-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0"></div> Standard counts for a Full TOEIC test. Auto-filled.
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <Label className="text-sm font-bold text-slate-700">Part Distribution Preview</Label>
                      <span className="text-xs font-bold text-indigo-600 cursor-pointer hover:underline">Customize distribution</span>
                    </div>
                    <div className="flex flex-col bg-slate-50 border border-slate-100 rounded-2xl p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-5">
                        <div className="space-y-5">
                          <h4 className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2"><Headphones className="w-3.5 h-3.5"/> Listening Section</h4>
                          <div className="space-y-3.5">
                            {[
                              { name: "P1: Photographs", count: 6, percent: 100 },
                              { name: "P2: Question-Response", count: 25, percent: 100 },
                              { name: "P3: Conversations", count: 39, percent: 100 },
                              { name: "P4: Short Talks", count: 30, percent: 100 },
                            ].map((p, i) => (
                              <div key={i} className="flex items-center gap-3 text-[13px] font-semibold text-slate-600">
                                <span className="w-[140px] truncate">{p.name}</span>
                                <div className="flex-1 bg-slate-200 h-2 rounded-full overflow-hidden flex">
                                  <div className="h-full bg-blue-500 rounded-full" style={{ width: `${(p.count/39)*100}%` }}></div>
                                </div>
                                <span className="w-14 text-right font-bold text-slate-700">{p.count}q</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div className="space-y-5 relative">
                          {/* Divider for desktop */}
                          <div className="hidden md:block absolute -left-3 top-0 bottom-0 w-px bg-slate-200"></div>
                          <h4 className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2"><BookOpen className="w-3.5 h-3.5"/> Reading Section</h4>
                          <div className="space-y-3.5">
                            {[
                              { name: "P5: Incomplete Sentences", count: 30, percent: 100 },
                              { name: "P6: Text Completion", count: 16, percent: 100 },
                              { name: "P7: Reading Comprehension", count: 54, percent: 100 },
                            ].map((p, i) => (
                              <div key={i} className="flex items-center gap-3 text-[13px] font-semibold text-slate-600">
                                <span className="w-[160px] truncate">{p.name}</span>
                                <div className="flex-1 bg-slate-200 h-2 rounded-full overflow-hidden flex">
                                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${(p.count/54)*100}%` }}></div>
                                </div>
                                <span className="w-14 text-right font-bold text-slate-700">{p.count}q</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      <div className="border-t border-[#E0E7FF] pt-4 mt-1 text-center text-[13px] text-slate-500 font-medium">
                        <span className="font-bold text-slate-700">Total:</span> {testQuestions} questions &nbsp;&nbsp;|&nbsp;&nbsp; <span className="font-bold text-slate-700">Listening:</span> {Math.floor(testQuestions/2)} &nbsp;&nbsp;|&nbsp;&nbsp; <span className="font-bold text-slate-700">Reading:</span> {Math.ceil(testQuestions/2)}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-bold text-slate-700">Description</Label>
                    <Textarea placeholder="Enter teacher notes or student instructions here..." className="rounded-xl border-slate-200 min-h-[100px] resize-none text-sm p-4 bg-slate-50 focus:bg-white transition-colors" />
                  </div>
                </div>

                {/* Right Column */}
                <div className="w-full xl:w-[320px] shrink-0 space-y-6">
                  <div className="space-y-2">
                    <Label className="text-sm font-bold text-slate-700">Cover Image</Label>
                    <input type="file" accept="image/*" className="hidden" ref={fileInputRef} onChange={handleImageUpload} />
                    {!coverImage ? (
                      <div onClick={triggerFileInput} className="border-2 border-dashed border-slate-200 rounded-2xl h-[200px] flex flex-col items-center justify-center text-slate-400 hover:bg-slate-50 hover:border-slate-300 cursor-pointer transition-all bg-white group">
                        <div className="w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                          <UploadCloud className="w-6 h-6 text-indigo-500" />
                        </div>
                        <span className="text-[13px] font-medium text-slate-500">Drop image here or <span className="text-indigo-600 font-bold">browse</span></span>
                      </div>
                    ) : (
                      <div className="relative border border-slate-200 rounded-2xl h-[200px] overflow-hidden group shadow-sm">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={coverImage} alt="Cover Preview" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-3">
                          <Button size="sm" variant="secondary" onClick={triggerFileInput} className="h-9 px-4 rounded-xl text-xs font-bold shadow-sm">Change Image</Button>
                          <Button size="sm" variant="destructive" onClick={handleRemoveImage} className="h-9 px-4 rounded-xl text-xs font-bold shadow-sm">Remove</Button>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 space-y-5">
                    <h3 className="text-[15px] font-bold text-slate-800">Test Summary</h3>
                    <div className="space-y-3.5 text-[13px]">
                      <div className="flex justify-between items-center font-medium">
                        <span className="text-slate-500">Type</span><span className="text-slate-800 font-bold bg-white px-2.5 py-1 rounded-md border border-slate-200 shadow-sm">Full Test</span>
                      </div>
                      <div className="flex justify-between items-center font-medium">
                        <span className="text-slate-500">Duration</span><span className="text-slate-800 font-bold bg-white px-2.5 py-1 rounded-md border border-slate-200 shadow-sm">120 min</span>
                      </div>
                      <div className="flex justify-between items-center font-medium">
                        <span className="text-slate-500">Questions</span><span className="text-slate-800 font-bold bg-white px-2.5 py-1 rounded-md border border-slate-200 shadow-sm">200</span>
                      </div>
                      <div className="h-px bg-slate-200 my-4"></div>
                      <div className="flex justify-between items-center font-medium">
                        <span className="text-slate-500">Level</span>
                        <div className="flex items-center gap-1.5 text-indigo-700 font-bold bg-indigo-50 px-2.5 py-1 rounded-md border border-indigo-100">
                          <BarChart2 className="w-3.5 h-3.5"/> Intermediate
                        </div>
                      </div>
                      <div className="flex justify-between items-center font-medium">
                        <span className="text-slate-500">L/R Split</span><span className="text-slate-800 font-bold">100L / 100R</span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            <div className="flex justify-between items-center px-8 py-5 border-t border-slate-100 bg-slate-50/50">
              <Link href="/teacher/tests">
                <Button variant="outline" className="rounded-xl px-6 h-11 text-slate-600 font-bold border-slate-200 hover:bg-white hover:text-slate-900 bg-white">
                  Cancel
                </Button>
              </Link>
              <Button onClick={() => setStep(2)} className="rounded-xl bg-[#4f46e5] hover:bg-[#4338ca] text-white px-8 h-11 gap-2 font-bold shadow-sm">
                Next: Select Questions <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </Card>
        </div>
      </DashboardLayout>
    );
  }

  if (step === 3) {
    return (
      <div className="min-h-screen bg-[#f8fafc] flex flex-col font-sans">
        {/* Header */}
        <header className="h-[60px] bg-white border-b border-slate-200 flex items-center justify-between px-6 shrink-0 z-10 shadow-sm">
          <div className="flex items-center text-[15px] font-bold text-[#1e293b]">
            <span className="text-indigo-600 mr-3">SmartTOEIC</span>
            <span className="text-slate-300 font-normal mr-3">|</span> 
            Create New Test
          </div>
          
          {/* Top Stepper */}
          <div className="flex items-center gap-4 text-xs font-bold">
            <div className="flex items-center gap-2 text-[#10b981]">
              <CheckCircle2 className="w-5 h-5 fill-[#10b981] text-white" />
              Test Info
            </div>
            <div className="w-16 h-px bg-[#10b981]"></div>
            <div className="flex items-center gap-2 text-[#10b981]">
              <CheckCircle2 className="w-5 h-5 fill-[#10b981] text-white" />
              Question Selection
            </div>
            <div className="w-16 h-px bg-slate-200"></div>
            <div className="flex items-center gap-2 text-[#4f46e5]">
              <div className="w-5 h-5 rounded-full bg-[#4f46e5] text-white flex items-center justify-center">3</div>
              Review & Publish
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#10b981]">
              <div className="w-1.5 h-1.5 rounded-full bg-[#10b981]"></div>
              Auto-saved
            </div>
            <div className="h-8 w-8 rounded-full bg-slate-800 text-white flex items-center justify-center font-bold text-sm shadow-sm">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-slate-50/50 p-6 md:p-8">
          <div className="mx-auto max-w-[1400px]">
            {/* Page Header */}
            <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <h1 className="text-[32px] font-extrabold text-slate-900 tracking-tight mb-2">Review & Publish</h1>
                <p className="text-slate-500 font-medium text-[15px]">Verify your test details and structure before making it available to students.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
              
              {/* Left Column (Spans 8) */}
              <div className="xl:col-span-8 space-y-8">
                
                {/* Info Card */}
                <Card className="rounded-2xl border-slate-200 shadow-sm bg-white overflow-hidden transition-all duration-200 hover:shadow-md">
                  <div className="p-8">
                    <div className="flex justify-between items-start mb-8">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <Badge className="bg-indigo-100 text-indigo-700 hover:bg-indigo-100 border-none shadow-none rounded-md px-2.5 py-0.5 text-xs font-bold">MOCK TEST</Badge>
                          <span className="text-sm font-semibold text-slate-400">Created today</span>
                        </div>
                        <h2 className="text-2xl font-bold text-slate-800">Summer Mock Test 2024</h2>
                      </div>
                      <Button onClick={() => setStep(1)} variant="outline" className="flex items-center gap-2 text-sm font-bold text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 border-indigo-100 rounded-xl h-10 px-5 transition-colors">
                        <Edit3 className="w-4 h-4" /> Edit Info
                      </Button>
                    </div>
                    
                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                      <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 flex flex-col justify-center items-start group hover:border-indigo-100 transition-colors">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="p-1.5 bg-white rounded-md shadow-sm border border-slate-100 text-indigo-500 group-hover:text-indigo-600">
                            <Clock className="w-4 h-4" />
                          </div>
                          <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Duration</p>
                        </div>
                        <p className="text-lg font-bold text-slate-800">120 mins</p>
                      </div>
                      
                      <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 flex flex-col justify-center items-start group hover:border-indigo-100 transition-colors">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="p-1.5 bg-white rounded-md shadow-sm border border-slate-100 text-indigo-500 group-hover:text-indigo-600">
                            <BookOpen className="w-4 h-4" />
                          </div>
                          <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Total Items</p>
                        </div>
                        <p className="text-lg font-bold text-slate-800">200 items</p>
                      </div>

                      <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 flex flex-col justify-center items-start group hover:border-indigo-100 transition-colors">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="p-1.5 bg-white rounded-md shadow-sm border border-slate-100 text-indigo-500 group-hover:text-indigo-600">
                            <BarChart className="w-4 h-4" />
                          </div>
                          <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Level</p>
                        </div>
                        <p className="text-lg font-bold text-slate-800">Intermediate</p>
                      </div>

                      <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 flex flex-col justify-center items-start group hover:border-indigo-100 transition-colors">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="p-1.5 bg-white rounded-md shadow-sm border border-slate-100 text-indigo-500 group-hover:text-indigo-600">
                            <Headphones className="w-4 h-4" />
                          </div>
                          <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">L/R Split</p>
                        </div>
                        <p className="text-lg font-bold text-slate-800">100 <span className="text-slate-400 font-medium text-sm mx-1">/</span> 100</p>
                      </div>
                    </div>
                    
                    <div className="bg-slate-50/50 p-5 rounded-xl border border-slate-100">
                      <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">DESCRIPTION</p>
                      <p className="text-[14px] text-slate-600 leading-relaxed font-medium">
                        Standard TOEIC mock test for final semester evaluation. This test covers all parts from Listening to Reading, following the latest ETS format guidelines for 2024. Make sure students have a quiet environment before starting. <span className="text-indigo-600 font-bold cursor-pointer hover:underline ml-1">Show less</span>
                      </p>
                    </div>
                  </div>
                </Card>

                {/* Structure Card */}
                <Card className="rounded-2xl border-slate-200 shadow-sm bg-white overflow-hidden transition-all duration-200 hover:shadow-md">
                  <div className="p-8">
                    <div className="flex justify-between items-center mb-8 pb-4 border-b border-slate-100">
                      <div>
                        <h2 className="text-xl font-bold text-slate-800 mb-1">Test Structure</h2>
                        <p className="text-sm text-slate-500 font-medium">Detailed breakdown of the 200 questions</p>
                      </div>
                      <Button onClick={() => setStep(2)} variant="outline" className="flex items-center gap-2 text-sm font-bold text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 border-indigo-100 rounded-xl h-10 px-5 transition-colors">
                        Edit Questions <Edit3 className="w-4 h-4" />
                      </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                      {/* Listening */}
                      <div className="space-y-6">
                        <div className="flex items-center gap-3 text-sm font-bold text-[#4f46e5] uppercase tracking-wider mb-6 bg-indigo-50 w-max px-4 py-2 rounded-lg border border-indigo-100">
                          <Headphones className="w-4 h-4" /> Listening Section (100)
                        </div>
                        <div className="space-y-5">
                          {[
                            { name: "Part 1: Photographs", count: 6, percent: 6, color: "bg-[#4f46e5]" },
                            { name: "Part 2: Question-Response", count: 25, percent: 25, color: "bg-[#6366f1]" },
                            { name: "Part 3: Conversations", count: 39, percent: 39, color: "bg-[#818cf8]" },
                            { name: "Part 4: Short Talks", count: 30, percent: 30, color: "bg-[#a5b4fc]" }
                          ].map((part, i) => (
                            <div key={i} className="group">
                              <div className="flex items-center justify-between mb-2">
                                <p className="text-sm font-semibold text-slate-700 group-hover:text-slate-900 transition-colors">{part.name}</p>
                                <span className="text-sm font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded-md">{part.count} Qs</span>
                              </div>
                              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden flex">
                                <div className={`h-full rounded-full ${part.color} transition-all duration-500`} style={{ width: `${part.percent}%` }}></div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Reading */}
                      <div className="space-y-6">
                        <div className="flex items-center gap-3 text-sm font-bold text-[#10b981] uppercase tracking-wider mb-6 bg-emerald-50 w-max px-4 py-2 rounded-lg border border-emerald-100">
                          <BookOpen className="w-4 h-4" /> Reading Section (100)
                        </div>
                        <div className="space-y-5">
                          {[
                            { name: "Part 5: Incomplete Sentences", count: 30, percent: 30, color: "bg-[#10b981]" },
                            { name: "Part 6: Text Completion", count: 16, percent: 16, color: "bg-[#34d399]" },
                            { name: "Part 7: Reading Comprehension", count: 54, percent: 54, color: "bg-[#6ee7b7]" }
                          ].map((part, i) => (
                            <div key={i} className="group">
                              <div className="flex items-center justify-between mb-2">
                                <p className="text-sm font-semibold text-slate-700 group-hover:text-slate-900 transition-colors">{part.name}</p>
                                <span className="text-sm font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded-md">{part.count} Qs</span>
                              </div>
                              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden flex">
                                <div className={`h-full rounded-full ${part.color} transition-all duration-500`} style={{ width: `${part.percent}%` }}></div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Right Column */}
              <div className="xl:col-span-4 space-y-8">
                
                {/* Publish Settings */}
                <Card className="rounded-2xl border-slate-200 shadow-sm bg-white overflow-hidden">
                  <div className="p-7 space-y-7">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-1 h-4 bg-indigo-600 rounded-full"></div>
                      <h2 className="text-[13px] font-bold text-slate-800 uppercase tracking-wider">Publish Settings</h2>
                    </div>
                    
                    <div className="space-y-3">
                      <Label className="text-sm font-bold text-slate-700">Access Control</Label>
                      <div className="relative">
                        <select className="w-full h-11 rounded-xl border border-slate-200 px-4 appearance-none bg-slate-50 hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm font-semibold text-slate-700">
                          <option>Class Only</option>
                          <option>Public</option>
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
                      </div>
                      <div className="flex gap-2 pt-1">
                        <Badge className="bg-indigo-600 text-white hover:bg-indigo-700 px-3 py-1.5 text-[11px] shadow-sm rounded-lg flex gap-1.5 items-center"><Check className="w-3 h-3"/> Class A</Badge>
                        <Badge className="bg-white text-indigo-600 hover:bg-indigo-50 px-3 py-1.5 text-[11px] shadow-none border border-indigo-200 rounded-lg">Class B</Badge>
                      </div>
                    </div>

                    <div className="w-full h-px bg-slate-100"></div>

                    <div className="space-y-4">
                      <Label className="text-sm font-bold text-slate-700">Scheduling</Label>
                      <div className="space-y-3">
                        <label className="flex items-center gap-3 cursor-pointer group bg-slate-50 p-3 rounded-xl border border-slate-100 hover:border-slate-200 transition-colors">
                          <input type="radio" name="schedule" className="w-4 h-4 text-indigo-600 border-slate-300 focus:ring-indigo-500" />
                          <span className="text-sm font-semibold text-slate-600 group-hover:text-slate-800">Publish Immediately</span>
                        </label>
                        <div className="border border-indigo-200 bg-indigo-50/30 rounded-xl overflow-hidden transition-colors">
                          <label className="flex items-center gap-3 cursor-pointer p-3 pb-2">
                            <input type="radio" name="schedule" defaultChecked className="w-4 h-4 text-indigo-600 border-slate-300 focus:ring-indigo-500" />
                            <span className="text-sm font-bold text-indigo-700">Schedule for later</span>
                          </label>
                          <div className="p-3 pt-0 flex gap-2">
                            <div className="relative flex-1">
                              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-indigo-400" />
                              <Input defaultValue="Oct 26, 2024" className="h-10 pl-9 rounded-lg border-indigo-100 bg-white text-[13px] font-semibold text-slate-700 shadow-sm" />
                            </div>
                            <div className="relative w-28">
                              <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-indigo-400" />
                              <Input defaultValue="09:00 AM" className="h-10 pl-9 rounded-lg border-indigo-100 bg-white text-[13px] font-semibold text-slate-700 shadow-sm px-2" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="w-full h-px bg-slate-100"></div>

                    <div className="space-y-2">
                      <Label className="text-sm font-bold text-slate-700">Results Visibility</Label>
                      <div className="flex items-center justify-between p-3 bg-slate-50 border border-slate-100 rounded-xl">
                        <div>
                          <span className="text-sm font-semibold text-slate-700 block mb-0.5">Show results instantly</span>
                          <span className="text-[11px] text-slate-500">Students see scores right away</span>
                        </div>
                        <Switch defaultChecked className="data-[state=checked]:bg-indigo-600" />
                      </div>
                    </div>

                  </div>
                </Card>

                {/* Final Checks */}
                <Card className="rounded-2xl border-emerald-100 shadow-sm bg-gradient-to-b from-emerald-50/50 to-white overflow-hidden">
                  <div className="p-7">
                    <div className="flex items-center gap-2 mb-5">
                      <div className="w-1 h-4 bg-emerald-500 rounded-full"></div>
                      <h2 className="text-[13px] font-bold text-slate-800 uppercase tracking-wider">System Checks</h2>
                    </div>
                    
                    <ul className="space-y-4">
                      {[
                        "200/200 questions selected",
                        "69 audio files attached and verified",
                        "200/200 answers validated",
                        "7/7 part distribution complete"
                      ].map((text, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 mt-0.5">
                            <Check className="w-3 h-3 text-emerald-600 stroke-[3]" />
                          </div>
                          <span className="text-[13px] font-semibold text-slate-700 leading-snug">{text}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Card>

              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="h-[72px] bg-white border-t border-slate-200 z-20 flex items-center justify-between px-6 md:px-10 shrink-0 shadow-[0_-2px_10px_rgba(0,0,0,0.02)]">
          <div className="flex items-center gap-3">
            <div className="bg-emerald-50 border border-emerald-100 text-emerald-600 text-[11px] font-bold px-3 py-1.5 rounded-lg flex items-center gap-2 shadow-sm uppercase tracking-wider">
              <div className="w-2 h-2 rounded-full bg-emerald-500"></div> READY TO PUBLISH
            </div>
            <span className="text-[13px] font-medium text-slate-500 italic hidden sm:block">All systems verified</span>
          </div>
          <div className="flex items-center gap-3">
            <Button onClick={() => setStep(2)} variant="outline" className="font-bold rounded-xl h-11 px-6 border-slate-200 text-slate-700">
              Back to Selection
            </Button>
            <Button variant="outline" className="font-bold rounded-xl h-11 px-6 border-slate-200 text-slate-700 gap-2 hidden sm:flex">
              <Eye className="w-4 h-4" /> Preview as Student
            </Button>
            <Link href="/teacher/tests">
              <Button className="bg-[#4f46e5] hover:bg-[#4338ca] text-white font-bold rounded-xl h-11 px-6 shadow-sm gap-2">
                Confirm & Publish Test <Rocket className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </footer>
      </div>
    );
  }

  // STEP 2: QUESTION SELECTION

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col font-sans">
      {/* Header */}
      <header className="h-[60px] bg-white border-b border-slate-200 flex items-center justify-between px-6 shrink-0 z-10 shadow-sm">
        <div className="flex items-center text-[15px] font-bold text-[#1e293b]">
          <span className="text-indigo-600 mr-3">SmartTOEIC</span>
          <span className="text-slate-300 font-normal mr-3">|</span> 
          Create New Test
        </div>
        
        {/* Top Stepper */}
        <div className="flex items-center gap-4 text-xs font-bold">
          <div className="flex items-center gap-2 text-[#10b981]">
            <CheckCircle2 className="w-5 h-5 fill-[#10b981] text-white" />
            Test Info
          </div>
          <div className="w-16 h-px bg-slate-200"></div>
          <div className="flex items-center gap-2 text-[#4f46e5]">
            <div className="w-5 h-5 rounded-full bg-[#4f46e5] text-white flex items-center justify-center">2</div>
            Question Selection
          </div>
          <div className="flex items-center gap-1 text-slate-300">
            <span className="tracking-widest">------</span>
          </div>
          <div className="flex items-center gap-2 text-slate-400">
            <div className="w-5 h-5 rounded-full border-2 border-slate-200 text-slate-400 flex items-center justify-center">3</div>
            Review & Publish
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#10b981]">
            <div className="w-1.5 h-1.5 rounded-full bg-[#10b981]"></div>
            Auto-saved 1 min ago
          </div>
          <div className="h-8 w-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-sm shadow-sm">
            T
          </div>
        </div>
      </header>

      {/* Main Layout */}
      <main className="flex-1 flex overflow-hidden p-4 gap-4 h-[calc(100vh-120px)]">
        
        {/* LEFT PANEL */}
        <div className="w-[280px] bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col overflow-hidden shrink-0">
          <div className="p-5 flex flex-col gap-6 overflow-y-auto">
            {/* Quota */}
            <div>
              <div className="flex justify-between items-end mb-3">
                <h3 className="font-bold text-sm text-slate-800">Part Quota</h3>
                <span className="font-bold text-lg text-indigo-600">45/200</span>
              </div>
              <div className="space-y-3">
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-slate-500">P1 PHOTOGRAPHS</span>
                    <span className="text-[#10b981] flex items-center gap-1">6/6 <Check className="w-3 h-3"/></span>
                  </div>
                  <Progress value={100} className="h-1.5 bg-slate-100 [&>div]:bg-[#10b981]" />
                </div>
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-slate-500">P3 CONVERSATIONS</span>
                    <span className="text-rose-500">0/39</span>
                  </div>
                  <Progress value={0} className="h-1.5 bg-slate-100" />
                </div>
                <Progress value={22.5} className="h-2 mt-4 bg-slate-100 [&>div]:bg-indigo-600" />
              </div>
            </div>

            <div className="h-px bg-slate-100"></div>

            {/* Filter by Part */}
            <div>
              <h3 className="font-bold text-xs text-slate-500 mb-3 uppercase tracking-wider">Filter by Part</h3>
              <div className="space-y-3">
                <label className="flex items-center justify-between cursor-pointer group">
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded bg-indigo-600 text-white flex items-center justify-center">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-sm font-semibold text-slate-700 group-hover:text-slate-900">Part 1</span>
                  </div>
                  <span className="text-xs text-slate-400 font-semibold">42</span>
                </label>
                <label className="flex items-center justify-between cursor-pointer group">
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded border-2 border-slate-200 bg-white group-hover:border-slate-300"></div>
                    <span className="text-sm font-semibold text-slate-700 group-hover:text-slate-900">Part 2</span>
                  </div>
                  <span className="text-xs text-slate-400 font-semibold">128</span>
                </label>
              </div>
            </div>

            {/* Topic */}
            <div>
              <h3 className="font-bold text-xs text-slate-500 mb-3 uppercase tracking-wider">Topic</h3>
              <div className="relative mb-3">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                <Input placeholder="Search topics..." className="h-9 pl-9 rounded-lg border-slate-200 text-sm bg-slate-50" />
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-full px-3 py-1 cursor-pointer">Business</Badge>
                <Badge variant="outline" className="border-slate-200 text-slate-600 font-semibold rounded-full px-3 py-1 cursor-pointer hover:bg-slate-50">Travel</Badge>
                <Badge variant="outline" className="border-slate-200 text-slate-600 font-semibold rounded-full px-3 py-1 cursor-pointer hover:bg-slate-50">Office</Badge>
              </div>
            </div>

            {/* Difficulty */}
            <div>
              <h3 className="font-bold text-xs text-slate-500 mb-3 uppercase tracking-wider">Difficulty</h3>
              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className="w-4 h-4 rounded-full border-2 border-slate-200 group-hover:border-slate-300"></div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#10b981]"></div>
                    <span className="text-sm font-semibold text-slate-700">Easy</span>
                  </div>
                </label>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className="w-4 h-4 rounded-full border-[5px] border-indigo-600"></div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-amber-400"></div>
                    <span className="text-sm font-semibold text-slate-700">Medium</span>
                  </div>
                </label>
              </div>
            </div>

            {/* Smart Select Card */}
            <div className="mt-auto pt-4">
              <div className="bg-indigo-50/50 border border-indigo-100 rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2 text-indigo-700 font-bold text-sm">
                    <span className="text-xl">🤖</span> Smart Select
                  </div>
                  <Switch checked={smartSelect} onCheckedChange={setSmartSelect} className="data-[state=checked]:bg-indigo-600 shadow-sm" />
                </div>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-start gap-2 text-[11px] text-slate-600 leading-tight">
                    <div className="w-1 h-1 rounded-full bg-indigo-400 mt-1.5 shrink-0"></div>
                    Matches your historical class performance
                  </li>
                  <li className="flex items-start gap-2 text-[11px] text-slate-600 leading-tight">
                    <div className="w-1 h-1 rounded-full bg-indigo-400 mt-1.5 shrink-0"></div>
                    Balances all 7 TOEIC parts automatically
                  </li>
                  <li className="flex items-start gap-2 text-[11px] text-slate-600 leading-tight">
                    <div className="w-1 h-1 rounded-full bg-indigo-400 mt-1.5 shrink-0"></div>
                    Prioritizes unlearned vocabulary
                  </li>
                </ul>
                <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg h-9 text-xs shadow-sm">
                  Apply Smart Select
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* MIDDLE PANEL */}
        <div className="flex-1 bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col overflow-hidden min-w-[500px]">
          {/* Top Search bar */}
          <div className="p-4 border-b border-slate-100 flex items-center justify-between shrink-0">
            <div>
              <h2 className="font-bold text-[15px] text-slate-800">Question Bank</h2>
              <p className="text-xs text-slate-500 mt-0.5">420 results found for your filters</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input placeholder="Search keywords..." className="h-10 w-64 pl-9 rounded-lg border-slate-200 bg-slate-50 text-sm font-medium focus-visible:ring-indigo-500" />
              </div>
              <Button variant="outline" className="h-10 rounded-lg border-slate-200 text-slate-700 font-semibold gap-2">
                Sort by: Part order <ChevronDown className="h-4 w-4 text-slate-400" />
              </Button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            
            {/* Listening Section */}
            <div>
              <div className="flex items-center gap-2 text-indigo-600 font-bold text-sm mb-4 bg-indigo-50/50 py-2 px-3 rounded-lg border border-indigo-100/50">
                <span className="text-lg">🎧</span> LISTENING (PART 1 - 4)
              </div>
              
              <div className="space-y-3">
                {/* Question Item Unchecked */}
                <div className="border border-slate-200 rounded-xl p-4 flex items-start gap-4 hover:border-slate-300 transition-colors cursor-pointer group bg-white shadow-sm">
                  <div className="w-5 h-5 rounded border-2 border-slate-200 mt-1 shrink-0 group-hover:border-indigo-400"></div>
                  <div className="flex-1">
                    <p className="text-[14px] font-semibold text-slate-800 mb-2">Look at the picture marked number 1 in your test book...</p>
                    <div className="flex gap-2 items-center">
                      <Badge variant="secondary" className="bg-indigo-100 text-indigo-700 font-bold text-[10px] rounded-md px-2">PART 1</Badge>
                      <Badge variant="secondary" className="bg-emerald-100 text-emerald-700 font-bold text-[10px] rounded-md px-2">EASY</Badge>
                      <span className="text-xs text-slate-400 font-semibold flex items-center gap-1">⏱ 15s</span>
                    </div>
                  </div>
                  <div className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-slate-50 hover:text-slate-600 shrink-0">
                    <Eye className="w-4 h-4" />
                  </div>
                </div>

                {/* Question Item Checked */}
                <div className="border-2 border-indigo-600 rounded-xl p-4 flex items-start gap-4 bg-indigo-50/30 cursor-pointer shadow-sm relative overflow-hidden">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-600"></div>
                  <div className="w-5 h-5 rounded bg-indigo-600 text-white flex items-center justify-center mt-1 shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <div className="flex-1">
                    <p className="text-[14px] font-bold text-slate-900 mb-2">Which of the following is most likely occurring in the photo?</p>
                    <div className="flex gap-2 items-center">
                      <Badge variant="secondary" className="bg-indigo-100 text-indigo-700 font-bold text-[10px] rounded-md px-2">PART 1</Badge>
                      <Badge variant="secondary" className="bg-amber-100 text-amber-700 font-bold text-[10px] rounded-md px-2">MEDIUM</Badge>
                    </div>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 shrink-0">
                    <Eye className="w-4 h-4" />
                  </div>
                </div>

                {/* Question Group */}
                <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm">
                  <div className="p-4 flex items-start gap-4 border-b border-slate-100">
                    <div className="w-5 h-5 rounded border-2 border-slate-200 mt-1 shrink-0"></div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="font-bold text-[14px] text-slate-800">Conversation: Office Renovation Discussion</span>
                        <Badge variant="secondary" className="bg-indigo-100 text-indigo-700 font-bold text-[10px] rounded-md px-2">PART 3</Badge>
                      </div>
                      <div className="flex items-center gap-1.5 text-amber-600 text-xs font-bold">
                        <AlertTriangle className="w-3.5 h-3.5" />
                        Complete group selection recommended
                      </div>
                    </div>
                    <ChevronDown className="w-5 h-5 text-slate-400 mt-1" />
                  </div>
                  <div className="bg-slate-50/50 p-3 space-y-1">
                    <div className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-100 cursor-pointer">
                      <span className="text-[13px] font-semibold text-slate-700">32. Where most likely are the speakers?</span>
                      <Eye className="w-4 h-4 text-slate-400" />
                    </div>
                    <div className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-100 cursor-pointer">
                      <span className="text-[13px] font-semibold text-slate-700">33. What problem does the woman mention?</span>
                      <Eye className="w-4 h-4 text-slate-400" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Reading Section */}
            <div className="pt-4">
              <div className="flex items-center gap-2 text-indigo-600 font-bold text-sm mb-4 bg-indigo-50/50 py-2 px-3 rounded-lg border border-indigo-100/50">
                <span className="text-lg">📖</span> READING (PART 5 - 7)
              </div>
              <div className="h-32 border-2 border-dashed border-slate-200 rounded-xl flex items-center justify-center text-slate-400 font-semibold text-sm bg-slate-50/50">
                Scroll to load more reading questions
              </div>
            </div>

          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="w-[300px] bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col overflow-hidden shrink-0">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <h2 className="font-bold text-[15px] text-slate-800 flex items-center gap-2">
              Selected
              <span className="bg-indigo-600 text-white text-[11px] px-2 py-0.5 rounded-full">45</span>
            </h2>
            <button className="text-[12px] font-bold text-rose-500 hover:text-rose-600">Clear all</button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4">
            <h3 className="text-xs font-bold text-slate-500 mb-3 tracking-wider">LISTENING (22)</h3>
            <div className="space-y-2">
              <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100 group">
                <Badge variant="secondary" className="bg-indigo-100 text-indigo-700 font-bold text-[10px] shrink-0">P1</Badge>
                <p className="text-[12px] font-semibold text-slate-700 leading-snug flex-1 line-clamp-2">
                  Look at the picture marked number 1 in your test book...
                </p>
                <X className="w-4 h-4 text-slate-400 cursor-pointer hover:text-rose-500 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100 group">
                <Badge variant="secondary" className="bg-indigo-100 text-indigo-700 font-bold text-[10px] shrink-0">P3</Badge>
                <p className="text-[12px] font-semibold text-slate-700 leading-snug flex-1 line-clamp-2">
                  Conference schedule changes conversation...
                </p>
                <X className="w-4 h-4 text-slate-400 cursor-pointer hover:text-rose-500 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          </div>
        </div>

      </main>

      {/* FOOTER */}
      <footer className="h-[60px] bg-white border-t border-slate-200 z-20 flex items-center justify-between px-6 shrink-0 shadow-[0_-2px_10px_rgba(0,0,0,0.02)]">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <span className="font-bold text-slate-800 text-[15px]">Total: 45/200</span>
            <div className="w-32 h-2.5 bg-slate-100 rounded-full overflow-hidden flex">
              <div className="w-[11%] bg-[#4f46e5] h-full"></div>
              <div className="w-[11.5%] bg-[#10b981] h-full"></div>
            </div>
          </div>
          <div className="text-xs font-bold text-slate-500 flex items-center gap-3">
            <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-[#4f46e5]"></div> L: 22</span>
            <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-[#10b981]"></div> R: 23</span>
          </div>
          <div className="bg-amber-50 border border-amber-200 text-amber-700 text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-2 shadow-sm">
            <AlertTriangle className="w-3.5 h-3.5" /> P2, P3, P4, P7 still incomplete
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button onClick={() => setStep(1)} variant="outline" className="font-bold rounded-xl h-10 px-6 border-slate-200 text-slate-700">
            Back
          </Button>
          <Button onClick={() => setStep(3)} className="bg-[#4f46e5] hover:bg-[#4338ca] text-white font-bold rounded-xl h-10 px-8">
            Next
          </Button>
        </div>
      </footer>

    </div>
  );
}

