"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { teacherSidebarItems } from "@/lib/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Sparkles,
  Upload,
  Plus,
  MoreHorizontal,
  X,
  ChevronDown,
  CheckCircle2,
  FileText,
  File,
  Trash2,
  Loader2,
  Wand2,
  ScanLine,
  AlertCircle,
} from "lucide-react";
import { apiCreateTeacherQuestion } from "@/layers/data/api/resources.api";

type SubQuestion = {
  id: number;
  questionText: string;
  options: string[];
  correctAnswer: number | null;
};

const AI_TOPIC_SUGGESTIONS = [
  "Business", "Travel", "Medical", "Education", "Technology", "Finance",
  "Environment", "Marketing", "HR", "Legal"
];

export default function ReadingQuestionForm() {
  const router = useRouter();
  const [partSelector, setPartSelector] = useState("7");
  const [difficulty, setDifficulty] = useState("Medium");
  const [topicTags, setTopicTags] = useState<string[]>(["Business", "Marketing"]);
  const [assignToTest, setAssignToTest] = useState("Weekly Practice #12");
  const [newTag, setNewTag] = useState("");
  const [passageText, setPassageText] = useState("");

  // AI Generate Modal
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
  const [aiPrompt, setAiPrompt] = useState("");
  const [aiSelectedTopics, setAiSelectedTopics] = useState<string[]>([]);
  const [aiIsGenerating, setAiIsGenerating] = useState(false);
  const [aiProgress, setAiProgress] = useState(0);
  const [aiProgressStage, setAiProgressStage] = useState("");

  // Upload File Modal
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isSaving, setIsSaving] = useState(false);

  // AI Generate handlers
  const toggleAiTopic = (topic: string) => {
    setAiSelectedTopics(prev =>
      prev.includes(topic) ? prev.filter(t => t !== topic) : [...prev, topic]
    );
  };

  const handleAIGenerate = () => {
    if (!aiPrompt.trim()) return;
    setAiIsGenerating(true);
    setAiProgress(0);
    setAiProgressStage("Analyzing prompt...");

    const stages = [
      { progress: 25, stage: "Analyzing prompt..." },
      { progress: 50, stage: "Generating passage content..." },
      { progress: 75, stage: "Creating questions & options..." },
      { progress: 100, stage: "Finalizing output..." },
    ];
    let i = 0;
    const interval = setInterval(() => {
      if (i < stages.length) {
        setAiProgress(stages[i].progress);
        setAiProgressStage(stages[i].stage);
        i++;
      } else {
        clearInterval(interval);
        // Simulate AI result
        setPassageText(`Dear Team,\n\nI am writing to inform you about the upcoming changes to our ${aiSelectedTopics[0] || 'business'} operations. As part of our strategic initiative, we will be implementing new procedures starting next quarter.\n\nPlease review the attached documents and provide your feedback by the end of this week. Your input is valuable in ensuring a smooth transition.\n\nBest regards,\nManagement`);
        setAiIsGenerating(false);
        setAiProgress(0);
        setIsAIModalOpen(false);
        setAiPrompt("");
        setAiSelectedTopics([]);
      }
    }, 800);
  };

  const closeAIModal = () => {
    if (aiIsGenerating) return;
    setIsAIModalOpen(false);
    setAiPrompt("");
    setAiSelectedTopics([]);
    setAiProgress(0);
  };

  // Upload File handlers
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) setUploadedFile(file);
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setUploadedFile(file);
  };

  const handleScanFile = () => {
    if (!uploadedFile) return;
    setIsScanning(true);
    setScanProgress(0);
    const interval = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsScanning(false);
          setPassageText(`[Extracted from: ${uploadedFile.name}]\n\nDear Mr. Kim,\n\nI am writing to inquire about the latest software update for our enterprise license. We noticed several issues in the reporting module that need attention before our quarterly review next month.\n\nPlease arrange a meeting with our technical team at your earliest convenience to discuss the resolution timeline.\n\nBest regards,\nSarah Johnson\nIT Director`);
          setIsUploadModalOpen(false);
          setUploadedFile(null);
          return 0;
        }
        return prev + 5;
      });
    }, 120);
  };

  const closeUploadModal = () => {
    if (isScanning) return;
    setIsUploadModalOpen(false);
    setUploadedFile(null);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  const handleSave = async () => {
    if (subQuestions.some(q => !q.questionText)) {
      alert("Please fill in all question texts.");
      return;
    }
    if (subQuestions.some(q => q.correctAnswer === null)) {
      alert("Please set a correct answer for all questions.");
      return;
    }

    setIsSaving(true);
    try {
      for (const sq of subQuestions) {
        const opts: Record<string, string> = {
          "A": sq.options[0],
          "B": sq.options[1],
          "C": sq.options[2],
          "D": sq.options[3]
        };
        const letter = ["A", "B", "C", "D"][sq.correctAnswer!];
        opts["CorrectAnswer"] = letter;

        // Note: For reading comprehension, the shared passage text could be sent if the API supported it.
        // Currently, we attach the passage text to the question text, or just send the question text.
        // For simplicity, we prepend the passage if it's the first question, or just use question text.
        const combinedText = passageText ? `[Passage]:\n${passageText}\n\n[Question]:\n${sq.questionText}` : sq.questionText;

        await apiCreateTeacherQuestion({
          part: Number(partSelector),
          type: "reading",
          difficulty: difficulty,
          text: combinedText,
          options: opts,
        });
      }
      alert("Questions created successfully!");
      router.push("/teacher/questions");
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : "Save failed");
    } finally {
      setIsSaving(false);
    }
  };

  // Sub-questions
  const [subQuestions, setSubQuestions] = useState<SubQuestion[]>([
    {
      id: 1,
      questionText: "What is the main purpose of the email?",
      options: [
        "To announce a company merger",
        "To inform employees about an office move",
        "To request employee feedback",
        "To schedule a team meeting",
      ],
      correctAnswer: 1,
    },
    {
      id: 2,
      questionText: "When will the relocation take place?",
      options: [
        "Friday, October 13th",
        "Next week",
        "The weekend of October 14th-15th",
        "Next month",
      ],
      correctAnswer: 2,
    },
  ]);

  const addSubQuestion = () => {
    setSubQuestions((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        questionText: "",
        options: ["", "", "", ""],
        correctAnswer: null,
      },
    ]);
  };

  const removeSubQuestion = (id: number) => {
    setSubQuestions((prev) => prev.filter((q) => q.id !== id));
  };

  const updateSubQuestion = (id: number, field: string, value: any) => {
    setSubQuestions((prev) =>
      prev.map((q) => (q.id === id ? { ...q, [field]: value } : q))
    );
  };

  const updateOption = (qId: number, optIndex: number, value: string) => {
    setSubQuestions((prev) =>
      prev.map((q) =>
        q.id === qId
          ? { ...q, options: q.options.map((o, i) => (i === optIndex ? value : o)) }
          : q
      )
    );
  };

  const setCorrectAnswer = (qId: number, optIndex: number) => {
    setSubQuestions((prev) =>
      prev.map((q) => (q.id === qId ? { ...q, correctAnswer: optIndex } : q))
    );
  };

  const removeTag = (tag: string) => {
    setTopicTags((prev) => prev.filter((t) => t !== tag));
  };

  const addTag = () => {
    if (newTag.trim() && !topicTags.includes(newTag.trim())) {
      setTopicTags((prev) => [...prev, newTag.trim()]);
      setNewTag("");
    }
  };

  const partOptions = [
    { value: "5", label: "Part 5: Incomplete Sentences" },
    { value: "6", label: "Part 6: Text Completion" },
    { value: "7", label: "Part 7: Reading Comprehension" },
  ];

  // Sample passage for live preview
  const samplePassage = passageText || `Read the following passage and answer the questions that follow.

## Email
From: J. Chen <jchen@techsolutions.com>
To: All Employees
Subject: Upcoming Office Relocation

Dear Team,

As you are aware, our company has been growing steadily over the past few years, and we have outgrown our current office space. I am pleased to announce that we will be relocating to a larger, more modern facility in the downtown area next month. The new office will provide us with more workspace, better meeting rooms, and improved amenities.

We anticipate that the move will take place over the weekend of October 14th-15th. Please ensure that your personal items and important files are packed and labeled by Friday, October 13th. Detailed instructions on the packing process and the new office layout will be provided next week.

Thank you for your cooperation and continued hard work.

Sincerely,
J. Chen
CEO, Tech Solutions`;

  return (
    <DashboardLayout
      sidebarItems={teacherSidebarItems}
      title="Question Bank"
      subtitle="Add Reading Question"
      
    >
      <div className="max-w-[1500px] mx-auto pb-10 px-4">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm font-medium text-slate-500 mb-2 pt-2">
          <button onClick={() => router.push("/teacher/questions")} className="hover:text-indigo-600 transition-colors">Question Bank</button>
          <span className="text-slate-300">/</span>
          <button onClick={() => router.push("/teacher/questions/add")} className="hover:text-indigo-600 transition-colors">Add New Question</button>
          <span className="text-slate-300">/</span>
          <span className="text-slate-800 font-semibold">Reading Task</span>
        </nav>

        {/* Page Title */}
        <div className="mb-6">
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Teacher - AI-Powered Group Question Form (Part {partSelector})
          </h1>
        </div>

        {/* Main Layout: Form + Live Preview */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Left: Form */}
          <div className="xl:col-span-2 space-y-6">
            {/* Meta Section */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <h2 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-4">Meta</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Part Selector */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500">Part Selector</label>
                  <div className="relative">
                    <select
                      value={partSelector}
                      onChange={(e) => setPartSelector(e.target.value)}
                      className="w-full h-10 rounded-xl border border-slate-200 px-3 text-sm font-semibold bg-white appearance-none focus:ring-2 focus:ring-indigo-500 outline-none"
                    >
                      {partOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                  </div>
                </div>

                {/* Difficulty */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500">Difficulty</label>
                  <div className="relative">
                    <select
                      value={difficulty}
                      onChange={(e) => setDifficulty(e.target.value)}
                      className="w-full h-10 rounded-xl border border-slate-200 px-3 text-sm font-semibold bg-white appearance-none focus:ring-2 focus:ring-indigo-500 outline-none"
                    >
                      <option value="Easy">Easy</option>
                      <option value="Medium">Medium</option>
                      <option value="Hard">Hard</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                  </div>
                </div>

                {/* Topic Tags */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500">Topic Tags</label>
                  <div className="flex items-center gap-1 flex-wrap min-h-[40px] rounded-xl border border-slate-200 px-2 py-1.5 bg-white">
                    {topicTags.map((tag) => (
                      <span key={tag} className="inline-flex items-center gap-1 bg-indigo-100 text-indigo-700 text-xs font-bold px-2 py-0.5 rounded-md">
                        {tag}
                        <button onClick={() => removeTag(tag)} className="hover:text-indigo-900 transition-colors">
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                    <input
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && addTag()}
                      placeholder="Add..."
                      className="flex-1 min-w-[40px] text-sm border-none outline-none bg-transparent"
                    />
                  </div>
                </div>

                {/* Assign to Test */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500">Assign to Test</label>
                  <div className="relative">
                    <select
                      value={assignToTest}
                      onChange={(e) => setAssignToTest(e.target.value)}
                      className="w-full h-10 rounded-xl border border-slate-200 px-3 text-sm font-semibold bg-white appearance-none focus:ring-2 focus:ring-indigo-500 outline-none"
                    >
                      <option>Weekly Practice #12</option>
                      <option>Full Test #3</option>
                      <option>Mini Test #5</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                  </div>
                </div>
              </div>
            </div>

            {/* Shared Content */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-sm font-bold text-slate-700 uppercase tracking-wider">Shared Content</h2>
                  <p className="text-xs text-slate-400 font-medium mt-0.5">Markdown Editor</p>
                </div>
                <div className="flex gap-2">
                  <Button onClick={() => setIsAIModalOpen(true)} className="rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs h-9 px-4 gap-1.5 shadow-sm">
                    <Sparkles className="w-3.5 h-3.5" /> AI Generate
                  </Button>
                  <Button onClick={() => setIsUploadModalOpen(true)} variant="outline" className="rounded-xl font-bold text-xs h-9 px-4 gap-1.5 border-slate-300 hover:bg-slate-50 shadow-sm">
                    <Upload className="w-3.5 h-3.5" /> Upload File to Scan
                  </Button>
                </div>
              </div>
              <textarea
                value={passageText}
                onChange={(e) => setPassageText(e.target.value)}
                placeholder="Your passage/article"
                className="w-full min-h-[200px] rounded-xl border border-slate-200 p-4 text-sm font-medium resize-y focus:ring-2 focus:ring-indigo-500 outline-none leading-relaxed"
              />
            </div>

            {/* Sub-Questions Stack */}
            <div className="space-y-4">
              <h2 className="text-sm font-bold text-slate-700 uppercase tracking-wider">Sub-Questions Stack</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {subQuestions.map((sq, idx) => (
                  <div key={sq.id} className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
                    {/* Card Header */}
                    <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 bg-slate-50">
                      <h3 className="text-sm font-bold text-slate-700">Q{idx + 1}</h3>
                      <button
                        onClick={() => removeSubQuestion(sq.id)}
                        className="text-slate-400 hover:text-rose-500 transition-colors p-1"
                      >
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="p-4 space-y-4">
                      {/* Question Text */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500">Question Text</label>
                        <Input
                          value={sq.questionText}
                          onChange={(e) => updateSubQuestion(sq.id, "questionText", e.target.value)}
                          className="rounded-xl border-slate-200 text-sm font-medium"
                          placeholder="Enter question text..."
                        />
                      </div>

                      {/* Options */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500">Options</label>
                        <div className="space-y-2">
                          {sq.options.map((opt, optIdx) => {
                            const letter = String.fromCharCode(65 + optIdx);
                            const isCorrect = sq.correctAnswer === optIdx;
                            return (
                              <div
                                key={optIdx}
                                className={`flex items-center gap-2 p-2 rounded-xl border transition-colors ${
                                  isCorrect
                                    ? "bg-emerald-50 border-emerald-200"
                                    : "bg-white border-slate-200"
                                }`}
                              >
                                <span className={`w-6 h-6 rounded text-[11px] font-bold flex items-center justify-center shrink-0 ${isCorrect ? "bg-emerald-500 text-white" : "bg-slate-100 text-slate-500"}`}>
                                  {letter}.
                                </span>
                                <Input
                                  value={opt}
                                  onChange={(e) => updateOption(sq.id, optIdx, e.target.value)}
                                  className="flex-1 border-none bg-transparent shadow-none focus-visible:ring-0 text-sm h-8 px-1"
                                  placeholder={`Option ${letter}`}
                                />
                                <button
                                  onClick={() => setCorrectAnswer(sq.id, optIdx)}
                                  className={`text-[10px] font-bold px-2 py-1 rounded-md whitespace-nowrap transition-colors ${
                                    isCorrect
                                      ? "bg-emerald-100 text-emerald-700 border border-emerald-300"
                                      : "bg-slate-100 text-slate-500 border border-slate-200 hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-200"
                                  }`}
                                >
                                  {isCorrect ? "✓ Correct" : "Set Correct"}
                                </button>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add Sub-question */}
              <button
                onClick={addSubQuestion}
                className="w-full flex items-center justify-center gap-2 py-3 border-2 border-dashed border-slate-300 rounded-xl text-sm font-bold text-slate-500 hover:border-indigo-400 hover:text-indigo-600 hover:bg-indigo-50/30 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add Sub-question
              </button>
            </div>
          </div>

          {/* Right: Live Preview */}
          <div className="xl:col-span-1">
            <div className="sticky top-24">
              <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
                <div className="px-5 py-4 border-b border-slate-100 bg-slate-50">
                  <h3 className="text-sm font-bold text-slate-700">Live Preview</h3>
                </div>

                <div className="p-5 space-y-5 max-h-[calc(100vh-200px)] overflow-y-auto custom-scrollbar">
                  {/* Passage Preview */}
                  <div className="bg-amber-50/60 border border-amber-100 rounded-xl p-4">
                    <p className="text-xs font-bold text-amber-700 uppercase tracking-wider mb-3">Reading Passage</p>
                    <div className="text-[13px] text-slate-700 leading-relaxed font-medium whitespace-pre-wrap">
                      {samplePassage}
                    </div>
                  </div>

                  {/* Preview Questions */}
                  <div className="space-y-4 pt-2">
                    {subQuestions.map((sq, idx) => (
                      <div key={sq.id} className="space-y-2">
                        <p className="text-sm font-bold text-slate-800">
                          Q{idx + 1}: {sq.questionText || "Enter question text..."}
                        </p>
                        <div className="space-y-1.5 pl-2">
                          {sq.options.map((opt, optIdx) => {
                            const letter = String.fromCharCode(65 + optIdx);
                            const isCorrect = sq.correctAnswer === optIdx;
                            return (
                              <div key={optIdx} className="flex items-center gap-2">
                                <span className={`text-xs font-bold ${isCorrect ? "text-emerald-600" : "text-slate-500"}`}>
                                  {letter}.
                                </span>
                                <span className={`text-[13px] font-medium ${isCorrect ? "text-emerald-700 font-semibold" : "text-slate-600"}`}>
                                  {opt || `Option ${letter}`}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Action Bar */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-200">
          <Button
            variant="outline"
            onClick={() => router.push("/teacher/questions")}
            className="rounded-xl font-bold h-11 px-6 border-indigo-200 text-indigo-700 bg-indigo-50 hover:bg-indigo-100 shadow-sm"
          >
            Save Draft
          </Button>
          <div className="flex gap-3">
            <Button
              onClick={handleSave}
              disabled={isSaving}
              className="rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-bold h-11 px-6 shadow-sm gap-2"
            >
              {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save & Close"}
            </Button>
          </div>
        </div>
      </div>

      {/* ===== AI Question Assistant Modal ===== */}
      {isAIModalOpen && (
        <>
          <div className="fixed inset-0 bg-slate-900/50 z-50 backdrop-blur-sm animate-in fade-in duration-200" onClick={closeAIModal} />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={closeAIModal}>
            <div
              className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-4 duration-300"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="px-6 pt-6 pb-4 border-b border-slate-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-200">
                      <Sparkles className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h2 className="text-lg font-extrabold text-slate-900">AI Question Assistant</h2>
                      <p className="text-xs text-slate-500 font-medium">Generate reading passages & questions with AI</p>
                    </div>
                  </div>
                  <button onClick={closeAIModal} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors">
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Modal Body */}
              <div className="px-6 py-5 space-y-5">
                {/* Prompt Input */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">Describe your content</label>
                  <textarea
                    value={aiPrompt}
                    onChange={(e) => setAiPrompt(e.target.value)}
                    placeholder="Write an email about rescheduling a meeting, a notice about office closure, or an article about business trends..."
                    className="w-full min-h-[120px] rounded-xl border border-slate-200 p-4 text-sm font-medium resize-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none leading-relaxed placeholder:text-slate-400 transition-shadow"
                    disabled={aiIsGenerating}
                  />
                </div>

                {/* Topic Tags */}
                <div className="space-y-2.5">
                  <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">Suggested Topics</label>
                  <div className="flex flex-wrap gap-2">
                    {AI_TOPIC_SUGGESTIONS.map((topic) => (
                      <button
                        key={topic}
                        onClick={() => toggleAiTopic(topic)}
                        disabled={aiIsGenerating}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-150 border ${
                          aiSelectedTopics.includes(topic)
                            ? "bg-indigo-600 text-white border-indigo-600 shadow-sm shadow-indigo-200"
                            : "bg-white text-slate-600 border-slate-200 hover:border-indigo-300 hover:text-indigo-600 hover:bg-indigo-50"
                        } disabled:opacity-50`}
                      >
                        {topic}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Progress Bars (visible when generating) */}
                {aiIsGenerating && (
                  <div className="space-y-3 pt-1 animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <div className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 text-indigo-600 animate-spin" />
                      <span className="text-xs font-semibold text-indigo-600">{aiProgressStage}</span>
                    </div>
                    {[0, 1, 2].map((i) => {
                      const barTarget = Math.min(100, Math.max(0, aiProgress - i * 15));
                      return (
                        <div key={i} className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-700 ease-out"
                            style={{
                              width: `${barTarget}%`,
                              background: `linear-gradient(90deg, #6366f1 0%, #8b5cf6 ${50 + i * 10}%, #a78bfa 100%)`,
                            }}
                          />
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-3">
                <Button
                  variant="outline"
                  onClick={closeAIModal}
                  disabled={aiIsGenerating}
                  className="rounded-xl font-bold h-10 px-5 border-slate-200 text-slate-600 hover:bg-white disabled:opacity-50"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleAIGenerate}
                  disabled={!aiPrompt.trim() || aiIsGenerating}
                  className="rounded-xl bg-[#3b3b6d] hover:bg-[#2d2d5e] text-white font-bold h-10 px-5 gap-2 shadow-sm disabled:opacity-40 transition-all"
                >
                  {aiIsGenerating ? (
                    <><Loader2 className="w-4 h-4 animate-spin" /> Generating...</>
                  ) : (
                    <><Wand2 className="w-4 h-4" /> Generate</>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* ===== Upload File to Scan Modal ===== */}
      {isUploadModalOpen && (
        <>
          <div className="fixed inset-0 bg-slate-900/50 z-50 backdrop-blur-sm animate-in fade-in duration-200" onClick={closeUploadModal} />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={closeUploadModal}>
            <div
              className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-4 duration-300"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="px-6 pt-6 pb-4 border-b border-slate-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-200">
                      <ScanLine className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h2 className="text-lg font-extrabold text-slate-900">Upload File to Scan</h2>
                      <p className="text-xs text-slate-500 font-medium">Extract passage content from documents</p>
                    </div>
                  </div>
                  <button onClick={closeUploadModal} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors">
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Modal Body */}
              <div className="px-6 py-5 space-y-5">
                {/* Drag & Drop Zone */}
                {!uploadedFile ? (
                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className={`relative flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-2xl cursor-pointer transition-all duration-200 ${
                      isDragging
                        ? "border-emerald-400 bg-emerald-50 scale-[1.01]"
                        : "border-slate-300 bg-slate-50/50 hover:border-emerald-400 hover:bg-emerald-50/30"
                    }`}
                  >
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-3 transition-colors ${
                      isDragging ? "bg-emerald-100" : "bg-slate-100"
                    }`}>
                      <Upload className={`w-6 h-6 transition-colors ${isDragging ? "text-emerald-600" : "text-slate-400"}`} />
                    </div>
                    <p className="text-sm font-bold text-slate-700 mb-1">Drop your file here or click to browse</p>
                    <p className="text-xs text-slate-400 font-medium">Supports PDF, DOCX, TXT, images (max 10MB)</p>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".pdf,.docx,.doc,.txt,.png,.jpg,.jpeg"
                      className="hidden"
                      onChange={handleFileSelect}
                    />
                  </div>
                ) : (
                  /* File Preview */
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-200">
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center shrink-0">
                        <FileText className="w-6 h-6 text-emerald-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-slate-800 truncate">{uploadedFile.name}</p>
                        <p className="text-xs text-slate-500 font-medium mt-0.5">{formatFileSize(uploadedFile.size)}</p>
                      </div>
                      {!isScanning && (
                        <button
                          onClick={() => setUploadedFile(null)}
                          className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-400 hover:text-rose-500 transition-colors shrink-0"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>

                    {/* Scan Progress */}
                    {isScanning && (
                      <div className="space-y-2 animate-in fade-in duration-200">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Loader2 className="w-3.5 h-3.5 text-emerald-600 animate-spin" />
                            <span className="text-xs font-semibold text-emerald-700">Scanning document...</span>
                          </div>
                          <span className="text-xs font-bold text-slate-500">{scanProgress}%</span>
                        </div>
                        <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-200 bg-gradient-to-r from-emerald-500 to-teal-500"
                            style={{ width: `${scanProgress}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Info Note */}
                <div className="flex items-start gap-2.5 p-3 bg-blue-50 border border-blue-100 rounded-xl">
                  <AlertCircle className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
                  <p className="text-xs text-blue-700 font-medium leading-relaxed">
                    The scanner will extract text content from your document and auto-fill the passage editor. You can edit the result afterwards.
                  </p>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-3">
                <Button
                  variant="outline"
                  onClick={closeUploadModal}
                  disabled={isScanning}
                  className="rounded-xl font-bold h-10 px-5 border-slate-200 text-slate-600 hover:bg-white disabled:opacity-50"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleScanFile}
                  disabled={!uploadedFile || isScanning}
                  className="rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold h-10 px-5 gap-2 shadow-sm disabled:opacity-40 transition-all"
                >
                  {isScanning ? (
                    <><Loader2 className="w-4 h-4 animate-spin" /> Scanning...</>
                  ) : (
                    <><ScanLine className="w-4 h-4" /> Scan & Extract</>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </DashboardLayout>
  );
}
