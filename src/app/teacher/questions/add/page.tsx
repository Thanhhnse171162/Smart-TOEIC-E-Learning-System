"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { teacherSidebarItems } from "@/lib/navigation";
import { Button } from "@/components/ui/button";
import { Volume2, BookOpen, CheckCircle2, ArrowRight } from "lucide-react";

type QuestionType = "listening" | "reading" | null;

export default function AddQuestionPage() {
  const router = useRouter();
  const [selectedType, setSelectedType] = useState<QuestionType>(null);

  const handleContinue = () => {
    if (selectedType === "listening") {
      router.push("/teacher/questions/add/listening");
    } else if (selectedType === "reading") {
      router.push("/teacher/questions/add/reading");
    }
  };

  return (
    <DashboardLayout
      sidebarItems={teacherSidebarItems}
      title="Question Bank"
      subtitle="Add New Question"
      userName="Tran Thi B"
    >
      <div className="min-h-[calc(100vh-120px)] flex flex-col">
        {/* Breadcrumb */}
        <div className="max-w-4xl mx-auto w-full px-6 pt-6 pb-2">
          <nav className="flex items-center gap-2 text-sm font-medium text-slate-500">
            <button
              onClick={() => router.push("/teacher/questions")}
              className="hover:text-indigo-600 transition-colors"
            >
              Question Bank
            </button>
            <span className="text-slate-300">/</span>
            <span className="text-slate-800 font-semibold">Add New Question</span>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col items-center justify-center px-6 pb-20 -mt-8">
          <div className="w-full max-w-2xl">
            <h1 className="text-3xl font-extrabold text-slate-900 mb-2 tracking-tight">
              Select Question Type
            </h1>
            <p className="text-[15px] text-slate-500 font-medium mb-10">
              Choose the type of TOEIC question you want to create
            </p>

            {/* Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
              {/* Listening Task Card */}
              <button
                onClick={() => setSelectedType("listening")}
                className={`group relative bg-white rounded-2xl border-2 p-8 text-left transition-all duration-200 hover:shadow-lg focus:outline-none ${
                  selectedType === "listening"
                    ? "border-indigo-500 shadow-lg shadow-indigo-100 ring-2 ring-indigo-100"
                    : "border-slate-200 hover:border-slate-300 shadow-sm"
                }`}
              >
                {/* Selected Indicator */}
                {selectedType === "listening" && (
                  <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-indigo-500 text-white flex items-center justify-center animate-in zoom-in-50 duration-200">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                )}

                {/* Icon */}
                <div
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-5 transition-colors ${
                    selectedType === "listening"
                      ? "bg-indigo-100"
                      : "bg-slate-100 group-hover:bg-indigo-50"
                  }`}
                >
                  <Volume2
                    className={`w-8 h-8 transition-colors ${
                      selectedType === "listening"
                        ? "text-indigo-600"
                        : "text-slate-400 group-hover:text-indigo-500"
                    }`}
                  />
                </div>

                <h3
                  className={`text-xl font-bold mb-2 transition-colors ${
                    selectedType === "listening"
                      ? "text-indigo-700"
                      : "text-slate-800"
                  }`}
                >
                  Listening Task
                </h3>
                <p className="text-[13px] text-slate-500 font-medium leading-relaxed">
                  Parts 1-4: Photographs, Question-Response, Conversations, Talks
                </p>
              </button>

              {/* Reading Task Card */}
              <button
                onClick={() => setSelectedType("reading")}
                className={`group relative bg-white rounded-2xl border-2 p-8 text-left transition-all duration-200 hover:shadow-lg focus:outline-none ${
                  selectedType === "reading"
                    ? "border-indigo-500 shadow-lg shadow-indigo-100 ring-2 ring-indigo-100"
                    : "border-slate-200 hover:border-slate-300 shadow-sm"
                }`}
              >
                {selectedType === "reading" && (
                  <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-indigo-500 text-white flex items-center justify-center animate-in zoom-in-50 duration-200">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                )}

                <div
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-5 transition-colors ${
                    selectedType === "reading"
                      ? "bg-indigo-100"
                      : "bg-slate-100 group-hover:bg-indigo-50"
                  }`}
                >
                  <BookOpen
                    className={`w-8 h-8 transition-colors ${
                      selectedType === "reading"
                        ? "text-indigo-600"
                        : "text-slate-400 group-hover:text-indigo-500"
                    }`}
                  />
                </div>

                <h3
                  className={`text-xl font-bold mb-2 transition-colors ${
                    selectedType === "reading"
                      ? "text-indigo-700"
                      : "text-slate-800"
                  }`}
                >
                  Reading Task
                </h3>
                <p className="text-[13px] text-slate-500 font-medium leading-relaxed">
                  Parts 5-7: Incomplete Sentences, Text Completion, Reading
                  Comprehension
                </p>
              </button>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-3">
              <Button
                variant="outline"
                onClick={() => router.push("/teacher/questions")}
                className="rounded-xl font-bold h-11 px-6 border-slate-200 text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </Button>
              <Button
                onClick={handleContinue}
                disabled={!selectedType}
                className="rounded-xl bg-[#3b3b6d] hover:bg-[#2d2d5e] text-white font-bold h-11 px-6 gap-2 shadow-sm disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                Continue
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
