"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { teacherSidebarItems } from "@/lib/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Upload,
  Play,
  Pause,
  Volume2,
  Sparkles,
  Plus,
  MoreHorizontal,
  X,
  ChevronDown,
} from "lucide-react";

type SubQuestion = {
  id: number;
  questionText: string;
  options: string[];
  correctAnswer: number | null; // index of correct option
  explanation: string;
};

export default function ListeningQuestionForm() {
  const router = useRouter();
  const [partSelector, setPartSelector] = useState("3");
  const [difficulty, setDifficulty] = useState("Medium");
  const [topicTags, setTopicTags] = useState<string[]>(["Conversation", "Business"]);
  const [assignToTest, setAssignToTest] = useState("Weekly Practice #12");
  const [newTag, setNewTag] = useState("");

  // Audio state
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Sub-questions
  const [subQuestions, setSubQuestions] = useState<SubQuestion[]>([
    {
      id: 1,
      questionText: "What is the speaker implying in the photo?",
      options: ["Option A text", "Option B text", "Option C text", "Option D text"],
      correctAnswer: 1,
      explanation: "",
    },
    {
      id: 2,
      questionText: "What is the speaker implying nource in the photo?",
      options: ["Option A text", "Option B text", "Option C text", "Option D text"],
      correctAnswer: 1,
      explanation: "",
    },
    {
      id: 3,
      questionText: "What is the speaker implying in the photo?",
      options: ["Option A text", "Option B text", "Option C text", "Option D text"],
      correctAnswer: null,
      explanation: "",
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
        explanation: "",
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
    { value: "1", label: "Listening Section (Part 1: Photographs)" },
    { value: "2", label: "Listening Section (Part 2: Question-Response)" },
    { value: "3", label: "Listening Section (Part 3: Conversations)" },
    { value: "4", label: "Listening Section (Part 4: Talks)" },
  ];

  return (
    <DashboardLayout
      sidebarItems={teacherSidebarItems}
      title="Question Bank"
      subtitle="Add Listening Question"
      userName="Tran Thi B"
    >
      <div className="max-w-[1500px] mx-auto pb-10 px-4">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm font-medium text-slate-500 mb-2 pt-2">
          <button onClick={() => router.push("/teacher/questions")} className="hover:text-indigo-600 transition-colors">Question Bank</button>
          <span className="text-slate-300">/</span>
          <button onClick={() => router.push("/teacher/questions/add")} className="hover:text-indigo-600 transition-colors">Add New Question</button>
          <span className="text-slate-300">/</span>
          <span className="text-slate-800 font-semibold">Listening Task</span>
        </nav>

        {/* Page Title */}
        <div className="mb-6">
          <p className="text-[11px] font-bold text-indigo-600 uppercase tracking-widest mb-1">SaaS Blue</p>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Refined Part {partSelector} Group Listening Question Form
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

            {/* Content (Listening Task) */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <h2 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-4">Content (Listening Task)</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Audio Upload */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500">Audio Upload</label>
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-slate-300 rounded-xl cursor-pointer hover:border-indigo-400 hover:bg-indigo-50/30 transition-colors bg-slate-50">
                    <Upload className="w-6 h-6 text-slate-400 mb-2" />
                    <span className="text-sm font-medium text-slate-500">Drag-and-drop, click here</span>
                    <input
                      type="file"
                      accept="audio/*"
                      className="hidden"
                      onChange={(e) => setAudioFile(e.target.files?.[0] || null)}
                    />
                  </label>
                </div>

                {/* Audio Preview */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500">Audio Preview</label>
                  <div className="bg-slate-800 rounded-xl p-4 flex items-center gap-4 h-32">
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center shrink-0 transition-colors"
                    >
                      {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
                    </button>
                    <div className="flex-1 space-y-2">
                      <span className="text-xs text-slate-400 font-medium">00:00</span>
                      <div className="w-full h-2 bg-slate-600 rounded-full overflow-hidden">
                        <div className="w-0 h-full bg-green-400 rounded-full transition-all"></div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="text-white/60 hover:text-white transition-colors">
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Question Cards */}
            <div className="space-y-4">
              <h2 className="text-sm font-bold text-slate-700 uppercase tracking-wider">Question Cards</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {subQuestions.map((sq, idx) => (
                  <div key={sq.id} className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
                    {/* Card Header */}
                    <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 bg-slate-50">
                      <h3 className="text-sm font-bold text-slate-700">Card {idx + 1}</h3>
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
                        <label className="text-xs font-bold text-slate-500">Q{idx + 1}. Question Text</label>
                        <Input
                          value={sq.questionText}
                          onChange={(e) => updateSubQuestion(sq.id, "questionText", e.target.value)}
                          className="rounded-xl border-slate-200 text-sm font-medium"
                          placeholder="Enter question text..."
                        />
                      </div>

                      {/* Options */}
                      <div className="space-y-2">
                        {sq.options.map((opt, optIdx) => {
                          const letter = String.fromCharCode(65 + optIdx);
                          const isCorrect = sq.correctAnswer === optIdx;
                          return (
                            <div key={optIdx} className="flex items-center gap-2">
                              <span className={`w-6 h-6 rounded text-[11px] font-bold flex items-center justify-center shrink-0 ${isCorrect ? "bg-emerald-500 text-white" : "bg-slate-100 text-slate-500"}`}>
                                {letter}
                              </span>
                              <Input
                                value={opt}
                                onChange={(e) => updateOption(sq.id, optIdx, e.target.value)}
                                className={`flex-1 rounded-lg text-sm h-9 ${isCorrect ? "border-emerald-300 bg-emerald-50/50" : "border-slate-200"}`}
                                placeholder={`Option ${letter} text`}
                              />
                              <button
                                onClick={() => setCorrectAnswer(sq.id, optIdx)}
                                className={`text-[10px] font-bold px-2 py-1 rounded-md whitespace-nowrap transition-colors ${
                                  isCorrect
                                    ? "bg-emerald-100 text-emerald-700 border border-emerald-300"
                                    : "bg-slate-100 text-slate-500 border border-slate-200 hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-200"
                                }`}
                              >
                                {isCorrect ? "Correct ✓" : "Set Correct"}
                              </button>
                            </div>
                          );
                        })}
                      </div>

                      {/* Explanation */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500">Explanation</label>
                        <div className="flex items-start gap-2">
                          <textarea
                            value={sq.explanation}
                            onChange={(e) => updateSubQuestion(sq.id, "explanation", e.target.value)}
                            placeholder="AI-assisted text area"
                            className="flex-1 min-h-[60px] rounded-xl border border-slate-200 p-3 text-sm resize-none focus:ring-2 focus:ring-indigo-500 outline-none"
                          />
                          <Button variant="outline" size="sm" className="rounded-lg text-xs font-bold gap-1 shrink-0 border-slate-200 hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-200 mt-1">
                            <Sparkles className="w-3 h-3" /> AI Generate
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add Sub-question */}
              <button
                onClick={addSubQuestion}
                className="w-full max-w-xs mx-auto flex items-center justify-center gap-2 py-3 border-2 border-dashed border-slate-300 rounded-xl text-sm font-bold text-slate-500 hover:border-indigo-400 hover:text-indigo-600 hover:bg-indigo-50/30 transition-colors"
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
                  {/* Audio Player Preview */}
                  <div className="bg-slate-800 rounded-xl p-3 flex items-center gap-3">
                    <button className="w-8 h-8 rounded-full bg-white/20 text-white flex items-center justify-center shrink-0">
                      <Play className="w-4 h-4 ml-0.5" />
                    </button>
                    <span className="text-xs text-slate-400 font-medium">00:00</span>
                    <div className="flex-1 h-1.5 bg-slate-600 rounded-full">
                      <div className="w-0 h-full bg-green-400 rounded-full"></div>
                    </div>
                  </div>

                  {/* Preview Questions */}
                  <div className="space-y-5">
                    {subQuestions.map((sq, idx) => (
                      <div key={sq.id} className="space-y-2.5">
                        <p className="text-sm font-bold text-slate-800">
                          Q{idx + 1}. Question Text
                        </p>
                        <p className="text-[13px] text-slate-600 font-medium">
                          {sq.questionText || "Enter question text..."}
                        </p>
                        <div className="space-y-1.5">
                          {sq.options.map((opt, optIdx) => {
                            const letter = String.fromCharCode(65 + optIdx);
                            const isCorrect = sq.correctAnswer === optIdx;
                            return (
                              <div key={optIdx} className="flex items-center gap-2">
                                <span className={`w-5 h-5 rounded text-[10px] font-bold flex items-center justify-center shrink-0 ${isCorrect ? "bg-emerald-500 text-white" : "bg-slate-100 text-slate-500"}`}>
                                  {letter}
                                </span>
                                <span className={`text-[13px] font-medium flex-1 ${isCorrect ? "text-emerald-700" : "text-slate-600"}`}>
                                  {opt || `Option ${letter} text`}
                                </span>
                                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                                  isCorrect
                                    ? "bg-emerald-100 text-emerald-700"
                                    : "bg-slate-100 text-slate-400"
                                }`}>
                                  {isCorrect ? "Correct ✓" : "Set Correct"}
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
            className="rounded-xl font-bold h-11 px-6 border-slate-200 text-slate-600 hover:bg-slate-50"
          >
            Save Draft
          </Button>
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="rounded-xl font-bold h-11 px-6 border-slate-300 text-slate-700 hover:bg-slate-50 shadow-sm"
            >
              Save & Add Next
            </Button>
            <Button
              onClick={() => router.push("/teacher/questions")}
              className="rounded-xl bg-[#4f46e5] hover:bg-[#4338ca] text-white font-bold h-11 px-6 shadow-sm gap-2"
            >
              Save & Close ✓
            </Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
