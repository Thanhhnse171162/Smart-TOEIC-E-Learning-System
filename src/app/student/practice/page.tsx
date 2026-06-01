"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import {
  Headphones,
  BookOpen,
  Languages,
  Camera,
  MessageSquare,
  Users,
  Mic,
  FileText,
  AlignLeft,
  BookOpenText,
  Clock,
  CheckCircle2,
  ListChecks,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Search,
  SlidersHorizontal,
  Volume2,
  Pause,
  Play,
  Lightbulb,
  BookMarked,
  Heart,
  RotateCcw,
  Star,
} from "lucide-react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { studentSidebarItems } from "@/lib/navigation";
import {
  listeningParts,
  readingParts,
  practiceQuestionsData,
} from "@/layers/data/mock/data";

/* ================================================================
   ICON MAP
   ================================================================ */
const iconMap: Record<string, React.ElementType> = {
  camera: Camera,
  messageSquare: MessageSquare,
  users: Users,
  mic: Mic,
  fileText: FileText,
  alignLeft: AlignLeft,
  bookOpen: BookOpenText,
};

/* ================================================================
   CIRCULAR PROGRESS RING
   ================================================================ */
function CircularProgress({
  value,
  size = 48,
}: {
  value: number;
  size?: number;
}) {
  const strokeWidth = 4;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <svg width={size} height={size} className="transform -rotate-90">
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="hsl(var(--muted))"
        strokeWidth={strokeWidth}
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="hsl(var(--primary))"
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        className="transition-all duration-700 ease-out"
      />
      <text
        x={size / 2}
        y={size / 2}
        textAnchor="middle"
        dominantBaseline="central"
        className="fill-foreground rotate-90 origin-center"
        style={{ fontSize: size * 0.24, fontWeight: 600 }}
      >
        {value}%
      </text>
    </svg>
  );
}

/* ================================================================
   PRACTICE PART CARD (overview grid)
   ================================================================ */
function PracticePartCard({
  part,
  onPractice,
}: {
  part: {
    id: number;
    title: string;
    questions: number;
    description: string;
    icon: string;
    progress: number;
    successRate: number;
  };
  onPractice: (partId: number) => void;
}) {
  const percent = part.progress;
  const themeBlue = "#0b5ce5";
  const size = 76;
  const strokeWidth = 7;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;

  return (
    <Card className="rounded-[14px] border-2 border-slate-200/80 bg-white shadow-sm hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <h3 className="font-extrabold text-[17px] mb-6 text-slate-800 tracking-tight">{part.title}</h3>
        <div className="flex items-center gap-5 mb-8">
          <div className="relative flex items-center justify-center shrink-0 w-[76px] h-[76px]">
            <svg width={size} height={size} className="transform -rotate-90 absolute">
              <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="#eef1f6" strokeWidth={strokeWidth} />
              <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke={themeBlue} strokeWidth={strokeWidth} strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round" className="transition-all duration-700 ease-out" />
            </svg>
            <div className="relative z-10 flex items-baseline gap-[1px] mt-1">
               <span className="text-[26px] font-black text-slate-800 tracking-tighter leading-none">{percent}</span>
               <span className="text-sm font-bold text-slate-500 leading-none">%</span>
            </div>
          </div>
          <div className="flex-1 space-y-1.5 pt-1">
             <div className="flex justify-between items-center">
                <span className="text-[13px] font-bold text-slate-700 tracking-tight">Progress ring</span>
             </div>
             <div className="w-full bg-[#eef1f6] rounded-full h-[6px] overflow-hidden">
                <div className="h-full rounded-full transition-all duration-700" style={{ width: `${percent}%`, backgroundColor: themeBlue }}></div>
             </div>
             <p className="text-[12px] font-semibold text-slate-600 tracking-tight pt-0.5">Overall progress</p>
          </div>
        </div>
        <Button 
          className="w-full text-white hover:opacity-90 rounded-[10px] font-bold h-[42px] text-[15px] shadow-sm border-0 transition-opacity" 
          style={{ backgroundColor: themeBlue }}
          onClick={() => onPractice(part.id)}
        >
          Practice Now
        </Button>
      </CardContent>
    </Card>
  );
}

/* ================================================================
   RECOMMENDED HERO BANNER
   ================================================================ */
function RecommendedBanner() {
  const recommended = readingParts[0];
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary via-primary/90 to-primary/70 p-6 md:p-8 text-primary-foreground shadow-lg">
      <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
      <div className="absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-white/5 blur-xl" />
      <div className="relative z-10">
        <Badge className="bg-white/20 text-white border-white/30 text-xs mb-3 backdrop-blur-sm">
          Recommended for you
        </Badge>
        <h2 className="text-xl md:text-2xl font-bold mb-2">
          {recommended.title}
        </h2>
        <p className="text-sm text-primary-foreground/80 max-w-lg leading-relaxed">
          Improve your grammar accuracy. Based on your recent mock test, this
          area needs the most attention to reach your 800+ goal.
        </p>
        <div className="flex items-center gap-3 mt-5">
          <Button
            variant="outline"
            className="rounded-xl border-white/40 text-white hover:bg-white/20 bg-white/10 backdrop-blur-sm font-medium"
          >
            Resume Practice
          </Button>
          <span className="flex items-center gap-1.5 text-sm text-primary-foreground/70">
            <Clock className="h-4 w-4" />
            15 mins left
          </span>
        </div>
      </div>
    </div>
  );
}

/* ================================================================
   AUDIO WAVEFORM VISUALIZER (decorative)
   ================================================================ */
function AudioWaveform() {
  const bars = Array.from({ length: 60 }, () =>
    Math.max(8, Math.floor(Math.random() * 100))
  );
  return (
    <div className="flex items-center gap-[2px] h-8">
      {bars.map((h, i) => (
        <div
          key={i}
          className="w-[3px] rounded-full bg-primary/60"
          style={{ height: `${h}%` }}
        />
      ))}
    </div>
  );
}

/* ================================================================
   PRACTICE QUESTION VIEW  (Image 2 reference)
   ================================================================ */
function PracticeQuestionView({
  partId,
  category,
  partTitle,
  onBack,
}: {
  partId: number;
  category: "listening" | "reading";
  partTitle: string;
  onBack: () => void;
}) {
  const partData = practiceQuestionsData.find((p) => p.partId === partId);
  const questions = partData?.questions ?? [];

  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [difficultyOpen, setDifficultyOpen] = useState(false);
  const [selectedDifficulty, setSelectedDifficulty] = useState("Easy, Medium, Hard");
  const maxTime = category === "listening" ? 60 * 60 : 20 * 60;
  const [timeLeft, setTimeLeft] = useState(maxTime);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const q = questions[currentIdx];
  if (!q) return null;

  const optionLabels = ["A", "B", "C", "D"];

  const handleSubmit = () => {
    if (selectedOption !== null && !submitted) {
      setSubmitted(true);
    } else if (submitted) {
      if (currentIdx < questions.length - 1) {
        setCurrentIdx((prev) => prev + 1);
        setSelectedOption(null);
        setSubmitted(false);
      }
    }
  };

  const progressPercent =
    questions.length > 0
      ? Math.round(((currentIdx + 1) / questions.length) * 100)
      : 0;

  return (
    <div className="space-y-6">
      {/* ── Header Bar ── */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Button
          variant="ghost"
          className="rounded-xl gap-2 text-muted-foreground hover:text-foreground w-fit px-2"
          onClick={onBack}
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Practice
        </Button>

        <div className="flex items-center gap-3">
          <div className="relative">
            <button
              className="flex items-center justify-between gap-3 px-3 py-1 h-10 rounded-xl border border-border/60 bg-card hover:bg-muted/50 transition-colors text-left min-w-[160px]"
              onClick={() => setDifficultyOpen(!difficultyOpen)}
            >
              <div className="flex flex-col justify-center">
                <span className="text-[10px] font-semibold text-muted-foreground leading-tight">Difficulty</span>
                <span className="text-xs font-medium leading-tight">{selectedDifficulty}</span>
              </div>
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </button>
            
            {difficultyOpen && (
              <div className="absolute right-0 top-full mt-1.5 w-48 rounded-xl border border-border bg-card p-1 shadow-lg z-50">
                {["Easy, Medium, Hard", "Easy", "Medium", "Hard"].map(level => (
                  <button
                    key={level}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${selectedDifficulty === level ? 'bg-primary/10 text-primary font-medium' : 'hover:bg-muted text-foreground'}`}
                    onClick={() => {
                      setSelectedDifficulty(level);
                      setDifficultyOpen(false);
                    }}
                  >
                    {level}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        {/* LEFT COLUMN: Main Question & Explanation */}
        <div className="space-y-6">
          {/* Main Card */}
          <Card className="rounded-2xl border-border/60 shadow-sm overflow-hidden bg-white dark:bg-card">
            <CardContent className="p-6 sm:p-8">
              <div className="flex justify-between items-start mb-2">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-slate-100">
                  {category === "listening" ? "Listening" : "Reading"}: Part {partId}
                </h2>
                <Badge className="bg-indigo-100 text-indigo-700 hover:bg-indigo-200 border-0 rounded-full px-3 py-1">
                  {partTitle}
                </Badge>
              </div>
              <p className="text-sm text-slate-500 font-medium mb-4">
                Question {currentIdx + 1}/{questions.length}
              </p>
              
              <Progress value={progressPercent} className="h-2.5 rounded-full bg-slate-100 dark:bg-slate-800 mb-8 [&>div]:bg-indigo-600" />
              
              {/* Question Image/Audio/Text */}
              <div className="mb-8">
                {q.imageUrl && (
                  <div className="relative w-full aspect-[21/9] bg-slate-100 rounded-xl overflow-hidden mb-6">
                    <Image src={q.imageUrl} alt="Question image" fill className="object-cover" />
                  </div>
                )}
                {category === "listening" && (
                  <div className="flex items-center gap-4 bg-slate-50 dark:bg-slate-900 rounded-xl p-4 mb-6 border border-slate-100 dark:border-slate-800">
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full h-12 w-12 shrink-0 border-indigo-200 hover:bg-indigo-50 dark:border-indigo-900 dark:hover:bg-indigo-950/50"
                      onClick={() => setPlaying(!playing)}
                    >
                      {playing ? <Pause className="h-5 w-5 text-indigo-600" /> : <Play className="h-5 w-5 text-indigo-600" />}
                    </Button>
                    <span className="text-xs font-medium text-slate-500 shrink-0">0:00</span>
                    <div className="flex-1 overflow-hidden opacity-70">
                      <AudioWaveform />
                    </div>
                    <span className="text-xs font-medium text-slate-500 shrink-0">0:45</span>
                  </div>
                )}
                <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-300">
                  {q.text}
                </p>
              </div>

              {/* Options Grid */}
              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                {q.options.map((opt, i) => {
                  const isSelected = selectedOption === i;
                  const isCorrect = submitted && i === q.correctAnswer;
                  const isWrong = submitted && isSelected && i !== q.correctAnswer;

                  let boxStyle = "border-slate-200 text-slate-600 hover:border-indigo-300 dark:border-slate-700 dark:text-slate-400";
                  let circleIcon = null;

                  if (isSelected && !submitted) {
                    boxStyle = "border-indigo-600 bg-indigo-50/50 text-indigo-700 dark:border-indigo-500 dark:bg-indigo-950/30 dark:text-indigo-300 ring-1 ring-indigo-600";
                    circleIcon = <div className="h-5 w-5 rounded-full bg-indigo-600 text-white flex items-center justify-center"><CheckCircle2 className="h-3 w-3" /></div>;
                  } else if (isCorrect) {
                    boxStyle = "border-emerald-500 bg-emerald-50/50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-300 ring-1 ring-emerald-500";
                    circleIcon = <div className="h-5 w-5 rounded-full bg-emerald-500 text-white flex items-center justify-center"><CheckCircle2 className="h-3 w-3" /></div>;
                  } else if (isWrong) {
                    boxStyle = "border-rose-500 bg-rose-50/50 text-rose-700 dark:bg-rose-950/30 dark:text-rose-300 ring-1 ring-rose-500";
                  }

                  return (
                    <button
                      key={i}
                      onClick={() => !submitted && setSelectedOption(i)}
                      className={`flex items-center justify-between px-5 py-4 rounded-xl border-2 transition-all text-left ${boxStyle}`}
                    >
                      <span className="font-medium text-[15px]">
                        {optionLabels[i]}. {opt}
                      </span>
                      {circleIcon}
                    </button>
                  );
                })}
              </div>

              {/* Action Button */}
              <Button
                className={`w-full h-14 rounded-xl text-base font-semibold transition-all ${
                  submitted 
                    ? "bg-slate-800 hover:bg-slate-900 text-white dark:bg-slate-700 dark:hover:bg-slate-600" 
                    : "bg-indigo-600 hover:bg-indigo-700 text-white"
                }`}
                onClick={handleSubmit}
                disabled={selectedOption === null && !submitted}
              >
                {submitted ? "Next Question" : "Check Answer"}
                {submitted ? <ChevronRight className="ml-2 h-5 w-5" /> : <CheckCircle2 className="ml-2 h-5 w-5 opacity-80" />}
              </Button>
            </CardContent>
          </Card>

          {/* Explanation Card */}
          {submitted && q.explanation && (
            <Card className="rounded-2xl border-0 border-l-[6px] border-l-indigo-600 bg-indigo-50/40 dark:bg-indigo-950/20 shadow-sm overflow-hidden">
              <CardContent className="p-6 sm:p-8">
                <h3 className="flex items-center gap-2 text-indigo-700 dark:text-indigo-400 font-bold text-[13px] tracking-widest uppercase mb-4">
                  <Lightbulb className="h-4 w-4" />
                  EXPLANATION
                </h3>
                <p className="text-[15px] text-slate-700 dark:text-slate-300 leading-relaxed">
                  {q.explanation}
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* RIGHT COLUMN: Sidebar */}
        <div className="space-y-6">
          {/* Timer Card */}
          <Card className="rounded-2xl shadow-sm border-border/60">
            <CardContent className="p-6 flex flex-col items-center">
              <h3 className="w-full text-left text-xs font-bold text-slate-500 uppercase tracking-widest mb-8">
                Timer
              </h3>
              
              <div className="relative flex items-center justify-center w-36 h-36 mb-8">
                {/* SVG Progress Ring */}
                <svg width="144" height="144" className="absolute transform -rotate-90">
                  <circle cx="72" cy="72" r="67" fill="none" stroke="#e0e7ff" strokeWidth="10" />
                  <circle 
                    cx="72" cy="72" r="67" fill="none" stroke="#4f46e5" strokeWidth="10" 
                    strokeDasharray={2 * Math.PI * 67} 
                    strokeDashoffset={(2 * Math.PI * 67) - ((timeLeft / maxTime) * (2 * Math.PI * 67))} 
                    strokeLinecap="round" 
                    className="transition-all duration-1000 ease-linear" 
                  />
                </svg>
                
                <div className="relative z-10 flex flex-col items-center">
                  <span className="text-3xl font-bold text-indigo-700 dark:text-indigo-400 tracking-tight">{formatTime(timeLeft)}</span>
                  <span className="text-[10px] font-bold text-slate-400 tracking-wider mt-0.5">REMAINING</span>
                </div>
              </div>
              
              <p className="text-sm text-center text-slate-500 dark:text-slate-400 leading-relaxed px-2">
                Keep a steady pace to finish all questions within the time limit.
              </p>
            </CardContent>
          </Card>

          {/* Question Navigator */}
          <Card className="rounded-2xl shadow-sm border-border/60 overflow-hidden">
            <div className="bg-slate-50 dark:bg-slate-900/50 px-6 py-4 border-b border-border/60">
              <h3 className="font-bold text-[15px] text-slate-700 dark:text-slate-200">Question Navigator</h3>
            </div>
            <CardContent className="p-6">
              <div className="grid grid-cols-5 gap-2.5 mb-6">
                {questions.map((_, i) => {
                  const isActive = i === currentIdx;
                  return (
                    <button
                      key={i}
                      onClick={() => {
                        setCurrentIdx(i);
                        setSelectedOption(null);
                        setSubmitted(false);
                      }}
                      className={`h-10 w-full rounded-lg text-sm font-semibold transition-all ${
                        isActive
                          ? "bg-indigo-600 text-white shadow-md shadow-indigo-200 dark:shadow-none"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700"
                      }`}
                    >
                      {i + 1}
                    </button>
                  );
                })}
              </div>
              <div className="border-t border-border/60 pt-6">
                <Button variant="outline" className="w-full rounded-xl h-11 text-indigo-700 border-indigo-200 hover:bg-indigo-50 hover:text-indigo-800 dark:text-indigo-400 dark:border-indigo-800/60 dark:hover:bg-indigo-950/50">
                  <BookMarked className="mr-2 h-4 w-4" />
                  Save for review
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

/* ================================================================
   VOCABULARY PART CARD
   ================================================================ */
function VocabularyPartCard({ title, learned, total, onFlashcard }: { title: string; learned: number; total: number; onFlashcard: () => void }) {
  const percent = total > 0 ? Math.round((learned / total) * 100) : 0;
  
  const size = 76;
  const strokeWidth = 7;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;
  const themeBlue = "#0b5ce5";

  return (
    <Card className="rounded-[14px] border-2 border-slate-200/80 bg-white shadow-sm hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <h3 className="font-extrabold text-[17px] mb-6 text-slate-800 tracking-tight">{title}</h3>
        <div className="flex items-center gap-5 mb-8">
          <div className="relative flex items-center justify-center shrink-0 w-[76px] h-[76px]">
            <svg width={size} height={size} className="transform -rotate-90 absolute">
              <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="#eef1f6" strokeWidth={strokeWidth} />
              <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke={themeBlue} strokeWidth={strokeWidth} strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round" className="transition-all duration-700 ease-out" />
            </svg>
            <div className="relative z-10 flex items-baseline gap-[1px] mt-1">
               <span className="text-[26px] font-black text-slate-800 tracking-tighter leading-none">{learned}</span>
               <span className="text-sm font-bold text-slate-500 leading-none">/{total}</span>
            </div>
          </div>
          <div className="flex-1 space-y-1.5 pt-1">
             <div className="flex justify-between items-center">
                <span className="text-[13px] font-bold text-slate-700 tracking-tight">Progress ring</span>
             </div>
             <div className="w-full bg-[#eef1f6] rounded-full h-[6px] overflow-hidden">
                <div className="h-full rounded-full transition-all duration-700" style={{ width: `${percent}%`, backgroundColor: themeBlue }}></div>
             </div>
             <p className="text-[12px] font-semibold text-slate-600 tracking-tight pt-0.5">Words learned</p>
          </div>
        </div>
        <Button 
          className="w-full text-white hover:opacity-90 rounded-[10px] font-bold h-[42px] text-[15px] shadow-sm border-0 transition-opacity" 
          style={{ backgroundColor: themeBlue }}
          onClick={onFlashcard}
        >
          Flashcards
        </Button>
      </CardContent>
    </Card>
  );
}

/* ================================================================
   FLASHCARD VIEW
   ================================================================ */
function FlashcardView({ title, onBack }: { title: string; onBack: () => void }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [activeTab, setActiveTab] = useState("Flashcards");
  
  const words = [
    { en: "negotiate", vi: "đàm phán, thương lượng", type: "(v)", tag: "Business" },
    { en: "revenue", vi: "doanh thu", type: "(n)", tag: "Finance" },
    { en: "implement", vi: "thực hiện, áp dụng", type: "(v)", tag: "Management" },
    { en: "colleague", vi: "đồng nghiệp", type: "(n)", tag: "Workplace" },
    { en: "strategy", vi: "chiến lược", type: "(n)", tag: "Business" },
    { en: "determine", vi: "xác định, quyết định", type: "(v)", tag: "General" },
  ];
  
  const currentWord = words[currentIdx];
  const vibrantBlue = "#0b5ce5";

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setIsFlipped(false);
    setTimeout(() => {
      if (currentIdx < words.length - 1) setCurrentIdx(prev => prev + 1);
    }, 150);
  };

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setIsFlipped(false);
    setTimeout(() => {
      if (currentIdx > 0) setCurrentIdx(prev => prev - 1);
    }, 150);
  };

  return (
    <div className="max-w-4xl mx-auto py-2">
      {/* Header Tabs & Back */}
      <div className="flex items-center gap-6 mb-8">
        <Button variant="ghost" onClick={onBack} className="p-0 hover:bg-transparent text-slate-500 hover:text-slate-800">
          <ArrowLeft className="w-5 h-5 mr-2" /> Back
        </Button>
        <div className="flex gap-2 bg-white rounded-full p-1 shadow-sm border border-slate-100">
           <button onClick={() => setActiveTab("Flashcards")} className={`px-5 py-2 rounded-full text-sm font-bold transition-colors ${activeTab === "Flashcards" ? "bg-slate-100 text-slate-800" : "text-slate-500 hover:text-slate-700"}`}>Flashcards</button>
           <button onClick={() => setActiveTab("Favorites")} className={`px-5 py-2 rounded-full text-sm font-bold flex items-center gap-1.5 transition-colors ${activeTab === "Favorites" ? "bg-slate-100 text-slate-800" : "text-slate-500 hover:text-slate-700"}`}><Heart className="w-4 h-4" /> Favorites</button>
           <button onClick={() => setActiveTab("Mini Quiz")} className={`px-5 py-2 rounded-full text-sm font-bold transition-colors ${activeTab === "Mini Quiz" ? "bg-slate-100 text-slate-800" : "text-slate-500 hover:text-slate-700"}`}>Mini Quiz</button>
        </div>
      </div>
      
      {/* Search Bar */}
      <div className="max-w-xl mx-auto mb-10 relative">
        <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
        <input 
          type="text" 
          placeholder="Search vocabulary..." 
          className="w-full h-12 pl-12 pr-4 rounded-[12px] border border-slate-200 outline-none focus:border-[#0b5ce5] focus:ring-1 focus:ring-[#0b5ce5] transition-all text-slate-700 placeholder:text-slate-400 font-medium"
        />
      </div>
      
      {/* Flashcard */}
      <div className="max-w-3xl mx-auto relative group">
        {/* Navigation Arrows */}
        <button 
          onClick={handlePrev} 
          disabled={currentIdx === 0}
          className="absolute -left-16 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-white border border-slate-200 shadow-sm text-slate-400 hover:text-[#0b5ce5] hover:border-[#0b5ce5] disabled:opacity-30 disabled:hover:border-slate-200 disabled:hover:text-slate-400 transition-all z-10 hidden sm:flex"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button 
          onClick={handleNext} 
          disabled={currentIdx === words.length - 1}
          className="absolute -right-16 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-white border border-slate-200 shadow-sm text-slate-400 hover:text-[#0b5ce5] hover:border-[#0b5ce5] disabled:opacity-30 disabled:hover:border-slate-200 disabled:hover:text-slate-400 transition-all z-10 hidden sm:flex"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        <div 
          className="relative w-full aspect-[4/3] sm:aspect-[16/9] cursor-pointer"
          style={{ perspective: "1000px" }}
          onClick={() => setIsFlipped(!isFlipped)}
        >
          <div 
            className="relative w-full h-full transition-transform duration-500 ease-in-out"
            style={{ transformStyle: "preserve-3d", transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)" }}
          >
            {/* Front */}
            <Card 
              className="absolute inset-0 rounded-[20px] border-2 border-slate-100 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.05)] flex flex-col items-center justify-center p-8 bg-white"
              style={{ backfaceVisibility: "hidden" }}
            >
              <div className="absolute top-8 left-1/2 -translate-x-1/2">
                <span className="bg-[#f0f4f8] text-[#334155] px-4 py-1.5 rounded-full text-[13px] font-bold tracking-wide">{currentWord.tag}</span>
              </div>
              
              <h2 className="text-4xl sm:text-6xl font-black text-slate-900 mb-6 tracking-tight">{currentWord.en}</h2>
              
              <button className="flex items-center gap-2 text-slate-600 hover:text-[#0b5ce5] font-semibold text-[15px] transition-colors mb-12" onClick={(e) => e.stopPropagation()}>
                <Volume2 className="w-5 h-5" />
                Pronunciation
              </button>
              
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
                <p className="text-[#64748b] text-[13px] font-medium">Click to reveal meaning</p>
              </div>
            </Card>
            
            {/* Back */}
            <Card 
              className="absolute inset-0 rounded-[20px] border-2 border-slate-100 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.05)] flex flex-col items-center justify-center p-8 bg-white"
              style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
            >
              <h2 className="text-3xl sm:text-5xl font-black text-slate-900 mb-4 text-center">{currentWord.vi}</h2>
              <p className="text-xl text-slate-500 italic font-medium">{currentWord.type}</p>
              
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
                <p className="text-[#64748b] text-[13px] font-medium">Click to see word</p>
              </div>
            </Card>
          </div>
        </div>

        {/* Bottom Controls */}
        <div className="mt-8 flex flex-col items-center justify-center gap-4">
          <div className="flex items-center justify-center gap-5">
             <button className="w-[42px] h-[42px] rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50 transition-colors">
               <RotateCcw className="w-[18px] h-[18px]" />
             </button>
             <button className="w-14 h-14 rounded-full flex items-center justify-center text-white shadow-md hover:opacity-90 transition-opacity" style={{ backgroundColor: vibrantBlue }}>
               <Heart className="w-6 h-6 fill-current" />
             </button>
             <button className="w-[42px] h-[42px] rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50 transition-colors">
               <Star className="w-5 h-5" />
             </button>
          </div>
          <p className="text-slate-500 font-bold text-[13px] tracking-widest">{currentIdx + 1} / {words.length}</p>
        </div>
      </div>
    </div>
  );
}

/* ================================================================
   MAIN PAGE
   ================================================================ */
export default function PracticePage() {
  const [activePart, setActivePart] = useState<{
    id: number;
    category: "listening" | "reading";
    title: string;
  } | null>(null);

  const [activeFlashcard, setActiveFlashcard] = useState<string | null>(null);

  const handlePractice = useCallback(
    (partId: number, category: "listening" | "reading") => {
      const allParts = [...listeningParts, ...readingParts];
      const part = allParts.find((p) => p.id === partId);
      if (part) {
        setActivePart({ id: partId, category, title: part.title });
      }
    },
    []
  );

  /* ── Question view ── */
  if (activePart) {
    return (
      <DashboardLayout
        sidebarItems={studentSidebarItems}
        title="TOEIC Practice"
        subtitle={activePart.title}
      >
        <PracticeQuestionView
          partId={activePart.id}
          category={activePart.category}
          partTitle={activePart.title}
          onBack={() => setActivePart(null)}
        />
      </DashboardLayout>
    );
  }

  /* ── Flashcard view ── */
  if (activeFlashcard) {
    return (
      <DashboardLayout
        sidebarItems={studentSidebarItems}
        title="Vocabulary Practice"
        subtitle="Flashcards"
      >
        <FlashcardView
          title={activeFlashcard}
          onBack={() => setActiveFlashcard(null)}
        />
      </DashboardLayout>
    );
  }

  /* ── Overview (cards) view ── */
  return (
    <DashboardLayout
      sidebarItems={studentSidebarItems}
      title="TOEIC Practice"
      subtitle="Practice by part"
    >
      <Tabs defaultValue="listening" className="space-y-6">
        <TabsList className="rounded-xl bg-muted/60 backdrop-blur-sm h-11 p-1 gap-1">
          <TabsTrigger
            value="listening"
            className="rounded-lg gap-2 px-4 data-[state=active]:shadow-md"
          >
            <Headphones className="h-4 w-4" />
            Listening
          </TabsTrigger>
          <TabsTrigger
            value="reading"
            className="rounded-lg gap-2 px-4 data-[state=active]:shadow-md"
          >
            <BookOpen className="h-4 w-4" />
            Reading
          </TabsTrigger>
          <TabsTrigger
            value="vocabulary"
            className="rounded-lg gap-2 px-4 data-[state=active]:shadow-md"
          >
            <BookOpenText className="h-4 w-4" />
            Vocabulary
          </TabsTrigger>
        </TabsList>

        {/* ── Listening ── */}
        <TabsContent value="listening" className="space-y-6">
          <RecommendedBanner />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {listeningParts.map((p) => (
              <PracticePartCard
                key={p.id}
                part={p}
                onPractice={(id) => handlePractice(id, "listening")}
              />
            ))}
          </div>
        </TabsContent>

        {/* ── Reading ── */}
        <TabsContent value="reading" className="space-y-6">
          <RecommendedBanner />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {readingParts.map((p) => (
              <PracticePartCard
                key={p.id}
                part={p}
                onPractice={(id) => handlePractice(id, "reading")}
              />
            ))}
          </div>
        </TabsContent>

        {/* ── Vocabulary ── */}
        <TabsContent value="vocabulary" className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
            <VocabularyPartCard title="Part 1: Office & Workplace" learned={45} total={100} onFlashcard={() => setActiveFlashcard("Part 1: Office & Workplace")} />
            <VocabularyPartCard title="Part 2: Finance & Budget" learned={72} total={100} onFlashcard={() => setActiveFlashcard("Part 2: Finance & Budget")} />
            <VocabularyPartCard title="Part 3: Travel & Transport" learned={30} total={100} onFlashcard={() => setActiveFlashcard("Part 3: Travel & Transport")} />
            <VocabularyPartCard title="Part 4: Marketing" learned={58} total={100} onFlashcard={() => setActiveFlashcard("Part 4: Marketing")} />
            <VocabularyPartCard title="Part 5: IT & Technology" learned={15} total={100} onFlashcard={() => setActiveFlashcard("Part 5: IT & Technology")} />
            <VocabularyPartCard title="Part 6: Health & Medicine" learned={88} total={100} onFlashcard={() => setActiveFlashcard("Part 6: Health & Medicine")} />
          </div>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
}
