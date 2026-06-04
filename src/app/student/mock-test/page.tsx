"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Clock, Flag, Pause, Play, BarChart3, ChevronLeft, ChevronRight } from "lucide-react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { studentSidebarItems } from "@/lib/navigation";

// Mock Data for Overview
const allMockTestsList = [
  { id: 5, title: "TOEIC Full Test #5", status: "new", time: "120m", questions: 200, difficulty: "Hard" },
  { id: 4, title: "TOEIC Full Test #4", status: "completed", time: "120m", questions: 200, difficulty: "Medium", score: 720 },
  { id: 3, title: "TOEIC Full Test #3", status: "completed", time: "120m", questions: 200, difficulty: "Medium", score: 690 },
  { id: 2, title: "TOEIC Full Test #2", status: "new", time: "120m", questions: 200, difficulty: "Hard" },
  { id: 1, title: "TOEIC Full Test #1", status: "in_progress", time: "120m", questions: 200, difficulty: "Easy" },
  { id: 6, title: "TOEIC Full Test #6", status: "new", time: "120m", questions: 200, difficulty: "Hard" },
];

const questions = Array.from({ length: 200 }, (_, i) => ({
  id: i + 1,
  text: i < 100
    ? "Listen to the audio and choose the statement that best describes what you hear or answers the question."
    : "Read the passage/sentence and choose the best answer to complete it.",
  options: i < 100
    ? ["The man is reading a book.", "The woman is on the phone.", "People are waiting in line.", "A truck is parked outside."]
    : ["open", "will open", "opened", "opening"],
}));

const themeBlue = "#3f4ebf"; 
const vibrantBlue = "#0b5ce5";

export default function MockTestPage() {
  const [activeTest, setActiveTest] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const totalPages = Math.ceil(allMockTestsList.length / itemsPerPage);
  const mockTestsList = allMockTestsList.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [timeLeft, setTimeLeft] = useState(7200);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (activeTest !== null) {
      const timer = setInterval(() => setTimeLeft((t) => Math.max(0, t - 1)), 1000);
      return () => clearInterval(timer);
    }
  }, [activeTest]);

  const formatTime = (s: number) => `${Math.floor(s / 3600)}:${String(Math.floor((s % 3600) / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
  const q = questions[current];
  const progress = (Object.keys(answers).length / questions.length) * 100;

  // ── 1. Overview UI ──
  if (activeTest === null) {
    return (
      <DashboardLayout sidebarItems={studentSidebarItems} title="Mock Tests" subtitle="Simulate the real TOEIC exam">
        <div className="space-y-6">
          {/* Results Banner */}
          <div className="flex items-center justify-between rounded-xl p-5" style={{ backgroundColor: "#efeffc" }}>
            <h3 className="font-bold text-[17px] text-slate-800">My Results</h3>
            <div className="flex items-center gap-6 text-[15px] font-semibold text-slate-700">
              <span>Best Score: <span className="font-bold text-slate-900">750</span></span>
              <span>Tests Taken: <span className="font-bold text-slate-900">12</span></span>
              <span>Avg Score: <span className="font-bold text-slate-900">680</span></span>
            </div>
          </div>

          {/* Tests Grid */}
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {mockTestsList.map((test) => (
              <Card key={test.id} className="rounded-[14px] border border-slate-200/80 shadow-sm flex flex-col hover:shadow-md transition-shadow">
                <CardContent className="p-6 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-bold text-[17px] text-slate-800 tracking-tight">{test.title}</h3>
                    {test.status === "new" && (
                       <Badge variant="secondary" className="bg-[#edf2fa] text-[#556987] hover:bg-[#edf2fa] border-0 font-semibold px-2.5 py-0.5">New</Badge>
                    )}
                    {test.status === "completed" && (
                       <Badge className="bg-[#e6f4ea] text-[#1e8e3e] hover:bg-[#e6f4ea] border-0 font-semibold px-2.5 py-0.5">Completed</Badge>
                    )}
                    {test.status === "in_progress" && (
                       <Badge className="bg-[#e4ecfa] text-[#0b5ce5] hover:bg-[#e4ecfa] border-0 font-semibold px-2.5 py-0.5">In Progress</Badge>
                    )}
                  </div>
                  
                  <div className="space-y-1 mb-5 flex-1">
                    <div className="flex items-center gap-1.5 text-[14px] text-slate-500 font-medium">
                      <Clock className="w-4 h-4" />
                      {test.time} • {test.questions}Q • {test.difficulty}
                    </div>
                    <div className="flex items-center gap-1.5 text-[14px] text-slate-500 font-medium">
                      <BarChart3 className="w-4 h-4" />
                      {test.time} • {test.questions}Q • {test.difficulty}
                    </div>
                    {test.status === "completed" && (
                      <div className="pt-3 font-bold text-[15px] text-slate-800">
                        Score: {test.score}/990
                      </div>
                    )}
                  </div>

                  <Button 
                    className="w-full text-white font-bold h-10 text-[14px] shadow-sm rounded-[10px] hover:opacity-90"
                    style={{ backgroundColor: themeBlue }}
                    onClick={() => setActiveTest(test.id)}
                  >
                    {test.status === "completed" ? "Review" : test.status === "in_progress" ? "Resume" : "Start test"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between pt-4">
              <span className="text-sm font-semibold text-slate-500">
                Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, allMockTestsList.length)} of {allMockTestsList.length} entries
              </span>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="h-9 w-9 p-0 rounded-lg"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(page)}
                    className={`h-9 w-9 p-0 rounded-lg font-bold ${currentPage === page ? 'bg-[#0b5ce5] hover:bg-[#0b5ce5]/90 text-white shadow-sm' : 'border-slate-200 text-slate-600'}`}
                  >
                    {page}
                  </Button>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="h-9 w-9 p-0 rounded-lg"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </DashboardLayout>
    );
  }

  // ── 2. Test Taking UI ──
  return (
    <div className="min-h-screen bg-[#f8f9fa] flex flex-col">
      {/* Top Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10 px-8 py-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-slate-600" />
          <span className="font-bold text-xl tracking-tight text-slate-800">{formatTime(timeLeft)}</span>
        </div>
        <div className="flex-1 max-w-2xl px-8 hidden md:flex items-center gap-6">
          <div className="flex-1 bg-slate-100 h-1.5 rounded-full overflow-hidden">
            <div className="h-full rounded-full transition-all duration-300" style={{ width: `${progress}%`, backgroundColor: vibrantBlue }} />
          </div>
          <span className="text-sm font-bold text-slate-600 whitespace-nowrap">{Object.keys(answers).length}/{questions.length} answered</span>
        </div>
        <Link href="/student/mock-test/result">
          <Button className="font-bold px-6 h-10 rounded-[10px]" style={{ backgroundColor: vibrantBlue }}>
            Submit Test
          </Button>
        </Link>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-[1400px] w-full mx-auto p-6 md:p-8 grid gap-8 lg:grid-cols-[320px_1fr] items-start">
        
        {/* Left Col - Navigator */}
        <Card className="rounded-[16px] border-slate-200/80 shadow-sm sticky top-[100px]">
          <CardHeader className="pb-4">
            <CardTitle className="text-[17px] font-extrabold text-slate-800">Question Navigator</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-5 gap-2.5">
              {questions.map((_, i) => {
                const isSelected = current === i;
                const isAnswered = answers[i] !== undefined;
                return (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={`h-11 w-full rounded-[10px] text-[15px] font-bold transition-all ${
                      isSelected 
                        ? "bg-[#0b5ce5] text-white shadow-sm" 
                        : isAnswered 
                          ? "bg-blue-50 text-[#0b5ce5] border border-blue-100" 
                          : "bg-slate-50 text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    {i + 1}
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Right Col - Question */}
        <Card className="rounded-[16px] border-slate-200/80 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-6 pt-8 px-8 border-b border-slate-100">
            <CardTitle className="text-xl font-extrabold text-slate-800 tracking-tight">Question {current + 1}</CardTitle>
            <Button variant="ghost" size="sm" className="gap-2 text-slate-500 font-semibold hover:text-slate-800 px-3">
              <Flag className="h-4 w-4" /> Flag
            </Button>
          </CardHeader>
          
          <CardContent className="p-8 space-y-8">
            <p className="text-[16px] text-slate-800 font-medium leading-relaxed">{q.text}</p>
            
            {/* Audio Player (for listening parts) */}
            {current < 100 && (
              <div className="flex items-center gap-5 rounded-2xl bg-[#f4f6f8] p-4 px-5">
                <Button variant="outline" size="icon" className="rounded-full bg-white h-10 w-10 border-slate-200 shadow-sm hover:text-[#0b5ce5]" onClick={() => setPlaying(!playing)}>
                  {playing ? <Pause className="h-4 w-4 fill-current" /> : <Play className="h-4 w-4 fill-current" />}
                </Button>
                <div className="flex-1 h-2 rounded-full bg-white relative">
                   <div className="absolute left-0 top-0 h-full w-1/3 rounded-full" style={{ backgroundColor: vibrantBlue }} />
                </div>
                <span className="text-[13px] font-bold text-slate-400 uppercase tracking-wider">Audio</span>
              </div>
            )}
            
            {/* Options */}
            <div className="space-y-4">
              {q.options.map((opt, i) => {
                const isSelected = answers[current] === i;
                return (
                  <button
                    key={i}
                    onClick={() => setAnswers({ ...answers, [current]: i })}
                    className={`w-full text-left rounded-2xl border-2 p-5 text-[15px] font-medium transition-all ${
                      isSelected 
                        ? "border-[#0b5ce5] bg-[#f0f5ff] text-slate-800" 
                        : "border-slate-100 text-slate-600 hover:border-slate-300 hover:bg-slate-50"
                    }`}
                  >
                    <span className="font-bold mr-3">{String.fromCharCode(65 + i)}.</span> {opt}
                  </button>
                );
              })}
            </div>
            
            {/* Navigation Footer */}
            <div className="flex justify-between pt-4 mt-8 border-t border-slate-100">
              <Button 
                variant="outline" 
                className="rounded-[10px] h-12 px-8 font-bold text-slate-600 border-2 hover:bg-slate-50" 
                disabled={current === 0} 
                onClick={() => setCurrent(current - 1)}
              >
                Previous
              </Button>
              <Button 
                className="rounded-[10px] h-12 px-10 font-bold text-white hover:opacity-90 transition-opacity border-0" 
                style={{ backgroundColor: vibrantBlue }}
                disabled={current === questions.length - 1} 
                onClick={() => setCurrent(current + 1)}
              >
                Next
              </Button>
            </div>
          </CardContent>
        </Card>
        
      </main>
    </div>
  );
}
