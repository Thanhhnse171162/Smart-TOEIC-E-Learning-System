"use client";

import Link from "next/link";
import { useState, useRef, useMemo } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { teacherSidebarItems } from "@/lib/navigation";
import {
  Search, ChevronDown, X, AlertTriangle, CheckCircle2, ArrowRight,
  UploadCloud, Eye, Check, Calendar, Clock, Edit3, Headphones, BookOpen,
  Rocket, Smile, BarChart2, TrendingUp, Filter, AlertCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

// TOEIC Constants
const TOEIC_PARTS = [
  { id: 1, name: "Part 1: Photographs", type: "Listening", required: 6 },
  { id: 2, name: "Part 2: Question-Response", type: "Listening", required: 25 },
  { id: 3, name: "Part 3: Conversations", type: "Listening", required: 39 },
  { id: 4, name: "Part 4: Short Talks", type: "Listening", required: 30 },
  { id: 5, name: "Part 5: Incomplete Sentences", type: "Reading", required: 30 },
  { id: 6, name: "Part 6: Text Completion", type: "Reading", required: 16 },
  { id: 7, name: "Part 7: Reading Comprehension", type: "Reading", required: 54 },
];

// Mock Question Bank (Simulating questions teacher has created)
const MOCK_QUESTION_BANK = [
  { id: "Q101", part: 1, text: "Look at the picture marked number 1 in your test book.", difficulty: "EASY", topic: "Daily Life", image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&q=80", options: ["A. They are sitting at a desk.", "B. They are looking at a laptop.", "C. They are leaving the office.", "D. They are drinking coffee."], correct: "B" },
  { id: "Q102", part: 1, text: "Look at the picture marked number 2 in your test book.", difficulty: "MEDIUM", topic: "Office", image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=400&q=80", options: ["A. The man is holding a phone.", "B. The man is writing on a board.", "C. The man is typing on a keyboard.", "D. The man is arranging papers."], correct: "C" },
  { id: "Q103", part: 1, text: "Look at the picture marked number 3 in your test book.", difficulty: "HARD", topic: "Travel", options: ["A. The bus is empty.", "B. They are boarding a plane.", "C. The luggage is on the carousel.", "D. The train is leaving."], correct: "A" },
  { id: "Q104", part: 1, text: "Look at the picture marked number 4 in your test book.", difficulty: "EASY", topic: "Dining", options: ["A", "B", "C", "D"], correct: "A" },
  { id: "Q105", part: 1, text: "Look at the picture marked number 5 in your test book.", difficulty: "MEDIUM", topic: "Traffic", options: ["A", "B", "C", "D"], correct: "A" },
  { id: "Q106", part: 1, text: "Look at the picture marked number 6 in your test book.", difficulty: "HARD", topic: "Construction", options: ["A", "B", "C", "D"], correct: "A" },
  { id: "Q107", part: 1, text: "Look at the picture marked number 7 in your test book.", difficulty: "EASY", topic: "Shopping", options: ["A", "B", "C", "D"], correct: "A" },
  
  { id: "Q201", part: 2, text: "Where is the nearest post office?", difficulty: "EASY", topic: "Directions", options: ["A. About two blocks away.", "B. At 5:00 PM.", "C. Yes, I can help you."], correct: "A" },
  { id: "Q202", part: 2, text: "Who is responsible for the new project?", difficulty: "MEDIUM", topic: "Business", options: ["A. It's on the second floor.", "B. Ms. Davis is the manager.", "C. Tomorrow morning."], correct: "B" },
  
  { id: "Q301", part: 3, text: "Conversation about office supplies (Questions 32-34)", difficulty: "MEDIUM", topic: "Office", isGroup: true, subCount: 3, passage: "[Man]: Hi Sarah, do you know if we have any printer paper left?\n[Woman]: I think we ran out yesterday. I can order some more.\n[Man]: That would be great. Please order two boxes this time.", subQuestions: [ { text: "What are the speakers discussing?", options: ["A. A new printer", "B. Office supplies", "C. A work schedule", "D. A meeting time"], correct: "B" } ] },
  { id: "Q401", part: 4, text: "Flight delay announcement (Questions 71-73)", difficulty: "HARD", topic: "Travel", isGroup: true, subCount: 3, passage: "Attention all passengers on Flight 4B to London. This flight has been delayed due to severe weather conditions..." },
  
  { id: "Q501", part: 5, text: "The board of directors _____ the new budget proposal.", difficulty: "MEDIUM", topic: "Grammar", options: ["A. approving", "B. was approved", "C. approved", "D. approve"], correct: "C" },
  { id: "Q502", part: 5, text: "Please submit your application _____ Friday at 5 PM.", difficulty: "EASY", topic: "Vocabulary", options: ["A. in", "B. by", "C. on", "D. at"], correct: "B" },
  
  { id: "Q601", part: 6, text: "Email regarding policy change (Questions 131-134)", difficulty: "HARD", topic: "Business", isGroup: true, subCount: 4, passage: "To all employees,\nStarting next month, we will implement a new remote work policy..." },
  { id: "Q701", part: 7, text: "Double passage: Advertisement and Email (176-180)", difficulty: "HARD", topic: "Shopping", isGroup: true, subCount: 5, passage: "[Advertisement] Grand opening of our new store!...\n\n[Email] Dear Manager, I saw your ad..." },
];

export default function CreateTestPage() {
  const [step, setStep] = useState(1);
  const [activePart, setActivePart] = useState(1); // Default to Part 1
  const [selectedQuestions, setSelectedQuestions] = useState<string[]>([]);
  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const [difficultyFilter, setDifficultyFilter] = useState("All");
  const [previewQuestion, setPreviewQuestion] = useState<any>(null);
  
  // Basic Info State
  const [testTitle, setTestTitle] = useState("");
  const [description, setDescription] = useState("");
  const [step1Error, setStep1Error] = useState("");
  const [testType, setTestType] = useState("Full Test");
  const [level, setLevel] = useState("Intermediate");
  const [testDuration, setTestDuration] = useState(120);
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Derived state for selection
  const displayedParts = useMemo(() => {
    if (testType === "Listening Only") return TOEIC_PARTS.filter(p => p.type === "Listening");
    if (testType === "Reading Only") return TOEIC_PARTS.filter(p => p.type === "Reading");
    return TOEIC_PARTS;
  }, [testType]);

  const targetTotal = testType === "Full Test" ? 200 : 100;

  const selectedCountsByPart = useMemo(() => {
    const counts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0 };
    selectedQuestions.forEach(qId => {
      const q = MOCK_QUESTION_BANK.find(x => x.id === qId);
      if (q && displayedParts.some(p => p.id === q.part)) {
        counts[q.part as keyof typeof counts] += (q.isGroup ? q.subCount : 1);
      }
    });
    return counts;
  }, [selectedQuestions, displayedParts]);

  const totalSelected = Object.values(selectedCountsByPart).reduce((a, b) => a + b, 0);
  const isFullySelected = displayedParts.every(p => selectedCountsByPart[p.id as keyof typeof selectedCountsByPart] === p.required);

  const handleToggleQuestion = (qId: string) => {
    setSelectedQuestions(prev => {
      if (prev.includes(qId)) {
        return prev.filter(id => id !== qId);
      } else {
        // Check constraints before adding
        const q = MOCK_QUESTION_BANK.find(x => x.id === qId);
        if (q) {
          const currentCount = selectedCountsByPart[q.part as keyof typeof selectedCountsByPart];
          const addingCount = q.isGroup ? q.subCount : 1;
          const required = TOEIC_PARTS.find(p => p.id === q.part)?.required || 0;
          
          if (currentCount + addingCount > required) {
            alert(`Cannot add. Part ${q.part} only requires ${required} questions (Currently have ${currentCount}).`);
            return prev;
          }
        }
        return [...prev, qId];
      }
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setCoverImage(URL.createObjectURL(file));
  };

  const triggerFileInput = () => fileInputRef.current?.click();
  const handleRemoveImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCoverImage(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const updateDuration = (val: number) => setTestDuration(prev => Math.max(10, prev + val));

  const handleNextToStep2 = () => {
    if (!testTitle.trim()) {
      setStep1Error("Please enter a Test Title to proceed.");
      return;
    }
    setStep1Error("");
    setStep(2);
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

  // --- STEP 1: Basic Info ---
  if (step === 1) {
    return (
      <DashboardLayout sidebarItems={teacherSidebarItems} title="" sidebarTitle="Teacher" headerContent={<StepperHeader />}>
        <div className="w-full max-w-[1400px] mx-auto pb-10 pt-2 px-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-6">
            <h1 className="text-2xl font-bold text-slate-900">Create New Test</h1>
          </div>
          <Card className="rounded-2xl border-slate-200 shadow-sm bg-white overflow-hidden p-8">
            <div className="flex flex-col xl:flex-row gap-12">
              <div className="flex-1 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                  <div className="md:col-span-8 space-y-2">
                    <Label className="text-sm font-bold text-slate-700">Test Title <span className="text-rose-500">*</span></Label>
                    <Input 
                      value={testTitle} 
                      onChange={e => {
                        setTestTitle(e.target.value);
                        if (e.target.value.trim()) setStep1Error("");
                      }} 
                      placeholder="e.g., Weekly Practice #12" 
                      className={`h-12 rounded-xl ${step1Error ? 'border-rose-300 focus-visible:ring-rose-500 bg-rose-50/50' : ''}`} 
                    />
                  </div>
                  <div className="md:col-span-4 space-y-2">
                    <Label className="text-sm font-bold text-slate-700">Test Type</Label>
                    <div className="relative">
                      <select value={testType} onChange={e => setTestType(e.target.value)} className="w-full h-12 rounded-xl border border-slate-200 px-3 appearance-none font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm">
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
                      {[
                        { id: "Beginner", icon: Smile },
                        { id: "Intermediate", icon: BarChart2 },
                        { id: "Advanced", icon: TrendingUp },
                      ].map((lvl) => {
                        const Icon = lvl.icon;
                        const isActive = level === lvl.id;
                        return (
                          <div
                            key={lvl.id}
                            onClick={() => setLevel(lvl.id)}
                            className={`rounded-xl p-3 flex flex-col items-center justify-center gap-2 cursor-pointer relative h-[90px] transition-all ${
                              isActive
                                ? 'border-2 border-indigo-600 bg-indigo-50/50'
                                : 'border border-slate-200 hover:bg-slate-50'
                            }`}
                          >
                            <input
                              type="radio"
                              name="level"
                              checked={isActive}
                              onChange={() => setLevel(lvl.id)}
                              className="w-4 h-4 text-indigo-600 border-slate-300 absolute left-3 top-3 focus:ring-indigo-500 cursor-pointer"
                            />
                            <div className={`mt-2 ${isActive ? 'text-indigo-600' : 'text-slate-400'}`}>
                              <Icon className="w-6 h-6" />
                            </div>
                            <span className={`text-[13px] font-bold ${isActive ? 'text-indigo-700' : 'text-slate-600'}`}>
                              {lvl.id}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label className="text-sm font-bold text-slate-700">Test Configuration</Label>
                    <div className="grid grid-cols-3 gap-3">
                      <div className="space-y-1.5">
                        <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Duration (min)</span>
                        <div className="flex items-center border border-slate-200 rounded-lg h-11 bg-white focus-within:ring-2 focus-within:ring-indigo-500">
                          <button onClick={() => updateDuration(-5)} className="px-3 h-full hover:bg-slate-50 text-slate-400 font-bold border-r border-slate-200">-</button>
                          <input type="text" value={testDuration} onChange={(e) => setTestDuration(Number(e.target.value) || 0)} className="w-full text-center font-bold text-slate-700 text-sm focus:outline-none" />
                          <button onClick={() => updateDuration(5)} className="px-3 h-full hover:bg-slate-50 text-slate-400 font-bold border-l border-slate-200">+</button>
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Questions</span>
                        <div className="flex items-center border border-slate-200 rounded-lg h-11 bg-slate-50 px-3">
                          <span className="w-full text-center font-bold text-slate-600 text-sm">{targetTotal} (Fixed)</span>
                        </div>
                      </div>
                    </div>
                    <div className="bg-indigo-50/50 text-indigo-700 text-[12px] font-semibold px-4 py-2.5 rounded-xl border border-indigo-100 flex items-center gap-2 mt-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0"></div> {testType === "Full Test" ? "Standard TOEIC requirement (200 questions)." : `Standard ${testType} requirement (${targetTotal} questions).`}
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-bold text-slate-700">Description</Label>
                  <Textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Enter teacher notes or instructions here..." className="rounded-xl border-slate-200 min-h-[100px] resize-none text-sm p-4 bg-slate-50" />
                </div>
              </div>

              <div className="w-full xl:w-[320px] shrink-0 space-y-6">
                <div className="space-y-2">
                  <Label className="text-sm font-bold text-slate-700">Cover Image</Label>
                  <input type="file" accept="image/*" className="hidden" ref={fileInputRef} onChange={handleImageUpload} />
                  {!coverImage ? (
                    <div onClick={triggerFileInput} className="border-2 border-dashed border-slate-200 rounded-2xl h-[200px] flex flex-col items-center justify-center text-slate-400 hover:bg-slate-50 cursor-pointer">
                      <UploadCloud className="w-6 h-6 text-indigo-500 mb-3" />
                      <span className="text-[13px] font-medium text-slate-500">Drop image or <span className="text-indigo-600 font-bold">browse</span></span>
                    </div>
                  ) : (
                    <div className="relative border border-slate-200 rounded-2xl h-[200px] overflow-hidden group">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={coverImage} alt="Cover Preview" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-3">
                        <Button size="sm" variant="secondary" onClick={triggerFileInput}>Change Image</Button>
                        <Button size="sm" variant="destructive" onClick={handleRemoveImage}>Remove</Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            {step1Error && (
              <div className="mt-6 bg-rose-50 border border-rose-200 text-rose-600 px-4 py-3 rounded-xl text-sm font-bold flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" /> {step1Error}
              </div>
            )}
            <div className="flex justify-between items-center mt-8 pt-5 border-t border-slate-100">
              <Link href="/teacher/tests">
                <Button variant="outline" className="rounded-xl px-6 h-11 font-bold">Cancel</Button>
              </Link>
              <Button onClick={handleNextToStep2} className="rounded-xl bg-[#4f46e5] hover:bg-[#4338ca] text-white px-8 h-11 font-bold">
                Next: Select Questions <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </Card>
        </div>
      </DashboardLayout>
    );
  }

  // --- STEP 2: Select Questions ---
  if (step === 2) {
    const safeActivePartId = displayedParts.find(p => p.id === activePart) ? activePart : displayedParts[0].id;
    const activePartInfo = TOEIC_PARTS.find(p => p.id === safeActivePartId)!;
    const questionsForActivePart = MOCK_QUESTION_BANK.filter(q => q.part === safeActivePartId && (difficultyFilter === "All" || q.difficulty === difficultyFilter));
    const activeSelectedCount = selectedCountsByPart[safeActivePartId as keyof typeof selectedCountsByPart];
    
    const totalPages = Math.max(1, Math.ceil(questionsForActivePart.length / itemsPerPage));
    const paginatedQuestions = questionsForActivePart.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
      <div className="min-h-screen bg-[#f8fafc] flex flex-col font-sans">
        <header className="h-[60px] bg-white border-b border-slate-200 flex items-center justify-between px-6 shrink-0 shadow-sm">
          <div className="text-[15px] font-bold text-[#1e293b]">Create New Test</div>
          <StepperHeader />
          <div className="h-8 w-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-sm shadow-sm">T</div>
        </header>

        <main className="flex-1 flex overflow-hidden p-4 gap-4 h-[calc(100vh-120px)]">
          
          {/* LEFT: PART SELECTION & QUOTA */}
          <div className="w-[300px] bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col overflow-hidden shrink-0">
            <div className="p-4 border-b border-slate-100 bg-slate-50/50">
              <h3 className="font-bold text-sm text-slate-800 flex justify-between">
                Total Progress
                <span className={`${totalSelected === targetTotal ? 'text-emerald-600' : 'text-indigo-600'}`}>{totalSelected} / {targetTotal}</span>
              </h3>
              <Progress value={(totalSelected/targetTotal)*100} className={`h-2 mt-2 ${totalSelected === targetTotal ? '[&>div]:bg-emerald-500' : '[&>div]:bg-indigo-600'}`} />
            </div>
            
            <div className="flex-1 overflow-y-auto p-2">
              <div className="space-y-1">
                {displayedParts.map(part => {
                  const current = selectedCountsByPart[part.id as keyof typeof selectedCountsByPart];
                  const isComplete = current === part.required;
                  const isActive = safeActivePartId === part.id;
                  
                  return (
                    <div 
                      key={part.id}
                      onClick={() => { setActivePart(part.id); setCurrentPage(1); }}
                      className={`p-3 rounded-xl cursor-pointer transition-all border ${
                        isActive ? 'bg-indigo-50 border-indigo-200 shadow-sm' : 'border-transparent hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex justify-between items-center mb-1.5">
                        <span className={`text-sm font-bold ${isActive ? 'text-indigo-700' : 'text-slate-700'}`}>Part {part.id}</span>
                        <span className={`text-xs font-bold ${isComplete ? 'text-emerald-600 flex items-center gap-1' : 'text-slate-500'}`}>
                          {current}/{part.required} {isComplete && <CheckCircle2 className="w-3.5 h-3.5" />}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-500 line-clamp-1">{part.name.split(': ')[1]}</div>
                      <Progress value={(current/part.required)*100} className={`h-1.5 mt-2 ${isComplete ? '[&>div]:bg-emerald-500' : '[&>div]:bg-slate-400'}`} />
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="p-4 border-t border-slate-100">
              <Button variant="outline" className="w-full text-xs font-bold gap-2">
                <Rocket className="w-4 h-4 text-indigo-600" /> Auto-fill Remaining (Smart Select)
              </Button>
            </div>
          </div>

          {/* MIDDLE: QUESTION BANK FOR ACTIVE PART */}
          <div className="flex-1 bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h2 className="font-bold text-lg text-slate-800 flex items-center gap-2">
                  {activePartInfo.type === 'Listening' ? <Headphones className="w-5 h-5 text-indigo-500" /> : <BookOpen className="w-5 h-5 text-emerald-500" />}
                  {activePartInfo.name}
                </h2>
                <p className="text-xs text-slate-500 mt-1 font-medium">Select {activePartInfo.required} questions to meet TOEIC standard for this part.</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input placeholder="Search question..." className="h-9 w-48 pl-9 rounded-lg border-slate-200 text-sm bg-slate-50" />
                </div>
                <div className="flex bg-slate-100 p-1 rounded-lg">
                  {["All", "EASY", "MEDIUM", "HARD"].map(d => (
                    <button 
                      key={d}
                      onClick={() => { setDifficultyFilter(d); setCurrentPage(1); }}
                      className={`px-2.5 py-1 text-[11px] uppercase tracking-wider font-bold rounded-md transition-colors ${difficultyFilter === d ? 'bg-white shadow-sm text-indigo-700' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-slate-50 p-2 flex justify-between items-center border-b border-slate-100 px-4">
              <span className="text-xs font-bold text-slate-500 uppercase">Available in Bank: {questionsForActivePart.length}</span>
              <span className={`text-xs font-bold px-2 py-1 rounded ${activeSelectedCount === activePartInfo.required ? 'bg-emerald-100 text-emerald-700' : 'bg-indigo-100 text-indigo-700'}`}>
                Selected: {activeSelectedCount} / {activePartInfo.required}
              </span>
            </div>

            <div className="flex-1 overflow-y-auto p-4 flex flex-col bg-slate-50/30">
              <div className="space-y-3 flex-1">
                {paginatedQuestions.length === 0 ? (
                  <div className="text-center py-10 text-slate-500">No questions found in bank for this part.</div>
                ) : (
                  paginatedQuestions.map(q => {
                  const isSelected = selectedQuestions.includes(q.id);
                  const isGroup = q.isGroup;
                  
                  return (
                    <div 
                      key={q.id} 
                      onClick={() => handleToggleQuestion(q.id)}
                      className={`border rounded-xl p-4 flex items-start gap-4 cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${
                        isSelected 
                          ? 'border-indigo-500 bg-indigo-50/40 shadow-sm ring-1 ring-indigo-100' 
                          : 'border-slate-200 bg-white'
                      }`}
                    >
                      <div className={`w-5 h-5 rounded flex items-center justify-center mt-0.5 shrink-0 transition-colors ${
                        isSelected ? 'bg-indigo-600 border-indigo-600 text-white' : 'border-2 border-slate-300'
                      }`}>
                        {isSelected && <Check className="w-3.5 h-3.5" />}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-4 mb-2">
                          <p className={`text-sm font-bold ${isSelected ? 'text-indigo-950' : 'text-slate-800'}`}>
                            {q.text}
                          </p>
                          <div className="flex gap-2 shrink-0">
                            <Badge variant="outline" className="text-[10px] font-bold bg-white text-slate-600">{q.topic}</Badge>
                            <Badge className={`text-[10px] font-bold shadow-none ${
                              q.difficulty === 'EASY' ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-100' :
                              q.difficulty === 'MEDIUM' ? 'bg-amber-100 text-amber-700 hover:bg-amber-100' :
                              'bg-rose-100 text-rose-700 hover:bg-rose-100'
                            }`}>{q.difficulty}</Badge>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">ID: #{q.id}</span>
                            {isGroup && (
                              <span className="text-xs font-bold text-amber-600 bg-amber-50 border border-amber-100 px-2 py-0.5 rounded flex items-center gap-1">
                                <BookOpen className="w-3 h-3" /> Group: {q.subCount} Questions
                              </span>
                            )}
                          </div>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-7 px-2 text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 font-bold text-xs shadow-none border border-indigo-100"
                            onClick={(e) => { e.stopPropagation(); setPreviewQuestion(q); }}
                          >
                            <Eye className="w-3.5 h-3.5 mr-1" /> View Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
              </div>
              
              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between pt-4 mt-4 border-t border-slate-200">
                  <span className="text-[11px] font-bold text-slate-500">
                    Showing {(currentPage - 1) * itemsPerPage + 1} - {Math.min(currentPage * itemsPerPage, questionsForActivePart.length)} of {questionsForActivePart.length}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                      disabled={currentPage === 1}
                      className="h-8 px-3 rounded-lg border-slate-200 font-bold hover:bg-slate-50 text-xs"
                    >
                      Prev
                    </Button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                      <Button
                        key={page}
                        variant={currentPage === page ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCurrentPage(page)}
                        className={`h-8 w-8 rounded-lg font-bold text-xs ${
                          currentPage === page 
                            ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm' 
                            : 'border-slate-200 hover:bg-slate-50 text-slate-600'
                        }`}
                      >
                        {page}
                      </Button>
                    ))}
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                      disabled={currentPage === totalPages}
                      className="h-8 px-3 rounded-lg border-slate-200 font-bold hover:bg-slate-50 text-xs"
                    >
                      Next
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>

        <footer className="h-[64px] bg-white border-t border-slate-200 flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            {!isFullySelected && (
              <div className="flex items-center gap-2 text-amber-600 bg-amber-50 px-3 py-1.5 rounded-lg text-sm font-bold border border-amber-200">
                <AlertCircle className="w-4 h-4" /> Please select exactly {targetTotal} questions to proceed
              </div>
            )}
            {isFullySelected && (
              <div className="flex items-center gap-2 text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-lg text-sm font-bold border border-emerald-200">
                <CheckCircle2 className="w-4 h-4" /> {targetTotal}/{targetTotal} Questions Selected - Ready to proceed
              </div>
            )}
          </div>
          <div className="flex items-center gap-3">
            <Button onClick={() => setStep(1)} variant="outline" className="font-bold rounded-xl h-10 px-6">Back</Button>
            <Button onClick={() => setStep(3)} disabled={!isFullySelected} className="bg-[#4f46e5] hover:bg-[#4338ca] text-white font-bold rounded-xl h-10 px-8">
              Review & Publish <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </footer>

        {/* PREVIEW MODAL */}
        {previewQuestion && (
          <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setPreviewQuestion(null)}>
            <div 
              className="bg-white rounded-2xl w-full max-w-2xl max-h-[85vh] overflow-hidden flex flex-col shadow-2xl animate-in fade-in zoom-in-95 duration-200"
              onClick={e => e.stopPropagation()}
            >
              <div className="p-4 px-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                <div className="flex items-center gap-3">
                  <Badge className="bg-indigo-100 text-indigo-700 shadow-none font-bold text-[11px]">Part {previewQuestion.part}</Badge>
                  <h3 className="font-bold text-slate-800 text-[15px]">Question Details</h3>
                </div>
                <button onClick={() => setPreviewQuestion(null)} className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#f8fafc]">
                {/* Media / Passage Area */}
                {(previewQuestion.image || previewQuestion.passage) && (
                  <div className="bg-white border border-slate-200 shadow-sm rounded-xl p-5">
                    <div className="flex items-center gap-2 mb-3 text-slate-500 text-xs font-bold uppercase tracking-wider">
                      {previewQuestion.image ? <Eye className="w-4 h-4"/> : <BookOpen className="w-4 h-4"/>}
                      {previewQuestion.image ? 'Image Source' : 'Context / Passage'}
                    </div>
                    {previewQuestion.image && (
                      <div className="rounded-lg overflow-hidden border border-slate-200 shadow-sm w-[300px]">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={previewQuestion.image} alt="Question media" className="w-full h-auto object-cover" />
                      </div>
                    )}
                    {previewQuestion.passage && (
                      <div className="text-[14px] text-slate-700 font-medium whitespace-pre-wrap leading-relaxed">
                        {previewQuestion.passage}
                      </div>
                    )}
                  </div>
                )}

                {/* Question Text & Options */}
                <div className="bg-white border border-slate-200 shadow-sm rounded-xl p-5">
                  <h4 className="text-[15px] font-bold text-slate-900 mb-4 leading-snug">
                    {previewQuestion.text}
                  </h4>
                  
                  {previewQuestion.isGroup && previewQuestion.subQuestions ? (
                    <div className="space-y-6 border-l-2 border-indigo-100 pl-4">
                      {previewQuestion.subQuestions.map((sq: any, i: number) => (
                        <div key={i} className="space-y-3">
                          <p className="font-semibold text-[14px] text-slate-800">{i+1}. {sq.text}</p>
                          <div className="space-y-2">
                            {sq.options?.map((opt: string, j: number) => {
                              const isCorrect = sq.correct === opt.charAt(0);
                              return (
                                <div key={j} className={`p-3 rounded-lg border text-[13px] font-semibold flex justify-between items-center ${isCorrect ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-slate-50 border-slate-200 text-slate-600'}`}>
                                  {opt}
                                  {isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {previewQuestion.options?.map((opt: string, j: number) => {
                        const isCorrect = previewQuestion.correct === opt.charAt(0);
                        return (
                          <div key={j} className={`p-3.5 rounded-lg border text-[13px] font-semibold flex justify-between items-center ${isCorrect ? 'bg-emerald-50 border-emerald-200 text-emerald-800 shadow-sm' : 'bg-slate-50 border-slate-200 text-slate-600'}`}>
                            {opt}
                            {isCorrect && <Badge className="bg-emerald-500 text-white shadow-none text-[10px]">CORRECT</Badge>}
                          </div>
                        );
                      })}
                      {!previewQuestion.options && (
                        <p className="text-slate-400 italic text-sm">No options provided in this preview.</p>
                      )}
                    </div>
                  )}
                </div>
              </div>
              
              <div className="p-4 px-6 border-t border-slate-100 bg-white flex justify-end">
                <Button onClick={() => setPreviewQuestion(null)} className="font-bold rounded-xl h-10 px-6">Close Preview</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // --- STEP 3: Review & Publish (Simplified for brevity) ---
  return (
    <DashboardLayout sidebarItems={teacherSidebarItems} title="" sidebarTitle="Teacher" headerContent={<StepperHeader />}>
      <div className="w-full max-w-[800px] mx-auto pb-10 pt-10 px-4 space-y-6">
        <h1 className="text-2xl font-bold text-slate-900 text-center">Review & Publish</h1>
        <Card className="p-8 space-y-6">
          <div className="flex justify-between border-b pb-4">
            <h2 className="text-xl font-bold">{testTitle || 'Untitled Test'}</h2>
            <Badge className="bg-emerald-100 text-emerald-700">Ready</Badge>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div><p className="text-sm text-slate-500">Duration</p><p className="font-bold">{testDuration} mins</p></div>
            <div><p className="text-sm text-slate-500">Questions</p><p className="font-bold">{targetTotal} items ({testType})</p></div>
          </div>
          <div className="flex justify-between pt-6">
            <Button variant="outline" onClick={() => setStep(2)}>Back to edit</Button>
            <Link href="/teacher/tests">
              <Button className="bg-[#4f46e5] text-white">Publish Test</Button>
            </Link>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
