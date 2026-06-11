"use client";

import { useState, useMemo, useEffect } from "react";
import { Heart, RotateCcw, Search, Star, Volume2, ChevronLeft, ChevronRight, Loader2, Lock, BookOpen, Sparkles, CheckCircle2, XCircle } from "lucide-react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { ApiDataBadge } from "@/components/api-data-badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { studentSidebarItems } from "@/lib/navigation";
import { vocabularyTopics } from "@/layers/data/mock/data";
import { Badge } from "@/components/ui/badge";
import { useVocabularies } from "@/hooks/use-vocabularies";
import { getStoredUser } from "@/lib/auth/session";
import Link from "next/link";

const FREE_WORD_LIMIT = 10;

const vibrantBlue = "#0b5ce5";

export default function VocabularyPage() {
  const { words, loading, fromApi } = useVocabularies();
  const user = getStoredUser();
  const [selectedTopic, setSelectedTopic] = useState(vocabularyTopics[0]?.id || "business");
  const [flipped, setFlipped] = useState(false);
  const [current, setCurrent] = useState(0);
  
  // Quiz states
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [quizScore, setQuizScore] = useState(0);

  // TODO: Replace with real enrollment check from API
  const isEnrolled = false;

  const filteredWords = useMemo(() => {
    return words.filter(w => w.topic === selectedTopic);
  }, [words, selectedTopic]);

  const word = filteredWords[current];
  const isLocked = !isEnrolled && current >= FREE_WORD_LIMIT;
  const isQuizLocked = !isEnrolled && currentQuizIndex >= FREE_WORD_LIMIT;

  // Reset states when topic changes
  useEffect(() => {
    setCurrent(0);
    setFlipped(false);
    setCurrentQuizIndex(0);
    setSelectedAnswer(null);
    setIsAnswerChecked(false);
    setQuizScore(0);
  }, [selectedTopic]);

  const quizQuestions = useMemo(() => {
    return filteredWords.map(w => {
      const otherMeanings = words.filter(other => other.id !== w.id).map(other => other.meaning);
      const shuffledOthers = [...otherMeanings].sort(() => 0.5 - Math.random()).slice(0, 3);
      const options = [w.meaning, ...shuffledOthers].sort(() => 0.5 - Math.random());
      return {
        word: w.word,
        options,
        correctAnswer: w.meaning
      };
    });
  }, [filteredWords, words]);

  const handleNext = () => {
    setFlipped(false);
    setTimeout(() => {
      if (current < filteredWords.length - 1) setCurrent(c => c + 1);
    }, 150);
  };

  const handlePrev = () => {
    setFlipped(false);
    setTimeout(() => {
      if (current > 0) setCurrent(c => c - 1);
    }, 150);
  };

  if (loading) {
    return (
      <DashboardLayout sidebarItems={studentSidebarItems} title="Vocabulary Builder" userName={user?.fullName}>
        <div className="flex justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </DashboardLayout>
    );
  }

  if (!word) {
    return (
      <DashboardLayout sidebarItems={studentSidebarItems} title="Vocabulary Builder" userName={user?.fullName}>
        <ApiDataBadge fromApi={fromApi} />
        <Card className="rounded-xl p-8 text-center text-muted-foreground mt-4">
          No vocabulary in database. Add words via API or Teacher panel.
        </Card>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout sidebarItems={studentSidebarItems} title="Vocabulary Builder" subtitle={`${filteredWords.length} words in this topic`} userName={user?.fullName}>
      <div className="mb-4">
        <ApiDataBadge fromApi={fromApi} />
      </div>
      {/* Top Progress */}
      <div className="mb-8">
        <div className="flex justify-between text-[13px] font-bold text-slate-700 tracking-tight mb-3">
          <span>Learning Progress</span>
          <span>68%</span>
        </div>
        <div className="w-full bg-[#eef1f6] rounded-full h-[8px] overflow-hidden">
           <div className="h-full rounded-full transition-all duration-700" style={{ width: `68%`, backgroundColor: vibrantBlue }}></div>
        </div>
      </div>

      {/* Filter Tags */}
      <div className="flex flex-wrap gap-3 mb-8">
        {vocabularyTopics.map((t) => (
          <button 
            key={t.id} 
            onClick={() => setSelectedTopic(t.id)}
            className={`rounded-full border transition-colors px-5 py-1.5 text-[13px] font-bold shadow-sm ${
              selectedTopic === t.id 
                ? "bg-[#0b5ce5] border-[#0b5ce5] text-white" 
                : "border-slate-200 bg-white hover:border-slate-300 text-slate-700"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <Tabs defaultValue="flashcards">
        <TabsList className="bg-transparent space-x-2 mb-10 h-auto p-0">
          <TabsTrigger value="flashcards" className="rounded-full px-5 py-2.5 text-[14px] font-bold data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:border data-[state=active]:border-slate-200 text-slate-500 data-[state=active]:text-slate-800 transition-all border border-transparent">
            Flashcards
          </TabsTrigger>
          <TabsTrigger value="favorites" className="rounded-full px-5 py-2.5 text-[14px] font-bold data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:border data-[state=active]:border-slate-200 text-slate-500 data-[state=active]:text-slate-800 transition-all border border-transparent gap-2">
            <Heart className="h-4 w-4" /> Favorites
          </TabsTrigger>
          <TabsTrigger value="quiz" className="rounded-full px-5 py-2.5 text-[14px] font-bold data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:border data-[state=active]:border-slate-200 text-slate-500 data-[state=active]:text-slate-800 transition-all border border-transparent">
            Mini Quiz
          </TabsTrigger>
        </TabsList>

        <TabsContent value="flashcards">
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-10 relative">
            <Search className="w-5 h-5 text-slate-400 absolute left-5 top-1/2 -translate-y-1/2" />
            <Input 
              placeholder="Search vocabulary..." 
              className="w-full h-14 pl-14 pr-6 rounded-[14px] border-2 border-slate-200 outline-none focus:border-[#0b5ce5] focus:ring-2 focus:ring-[#0b5ce5]/20 transition-all text-slate-700 placeholder:text-slate-400 font-medium text-[15px] shadow-sm"
            />
          </div>

          {/* Flashcard Area */}
          <div className="max-w-3xl mx-auto relative group">
             {/* Navigation Arrows */}
            <button 
              onClick={handlePrev} 
              disabled={current === 0}
              className="absolute -left-16 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-white border border-slate-200 shadow-sm text-slate-400 hover:text-[#0b5ce5] hover:border-[#0b5ce5] disabled:opacity-30 disabled:hover:border-slate-200 disabled:hover:text-slate-400 transition-all z-10 hidden md:flex"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button 
              onClick={handleNext} 
              disabled={current === filteredWords.length - 1 || (!isEnrolled && current >= FREE_WORD_LIMIT - 1)}
              className="absolute -right-16 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-white border border-slate-200 shadow-sm text-slate-400 hover:text-[#0b5ce5] hover:border-[#0b5ce5] disabled:opacity-30 disabled:hover:border-slate-200 disabled:hover:text-slate-400 transition-all z-10 hidden md:flex"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* PAYWALL OVERLAY */}
            {isLocked ? (
              <div className="relative w-full aspect-[4/3] sm:aspect-[16/9]">
                <Card className="absolute inset-0 rounded-[24px] border-2 border-slate-200 shadow-lg flex flex-col items-center justify-center p-8 bg-gradient-to-br from-slate-50 via-white to-blue-50 overflow-hidden">
                  {/* Decorative blurred circles */}
                  <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-200/30 rounded-full blur-3xl" />
                  <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-indigo-200/20 rounded-full blur-3xl" />

                  <div className="relative z-10 flex flex-col items-center text-center max-w-sm">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#0b5ce5] to-[#6366f1] flex items-center justify-center mb-5 shadow-lg">
                      <Lock className="w-7 h-7 text-white" />
                    </div>

                    <h3 className="text-2xl font-extrabold text-slate-900 mb-2">Free Preview Ended</h3>
                    <p className="text-sm text-slate-500 leading-relaxed mb-1">
                      You&apos;ve explored <span className="font-bold text-[#0b5ce5]">{FREE_WORD_LIMIT} words</span> for free.
                      Enroll in a course to unlock <span className="font-bold text-slate-700">all {filteredWords.length} words</span> in this topic, flashcards, quizzes, and more!
                    </p>

                    <div className="flex flex-wrap items-center justify-center gap-3 my-5 text-xs font-semibold text-slate-500">
                      <span className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-full px-3 py-1 shadow-sm">
                        <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Unlimited Vocabulary
                      </span>
                      <span className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-full px-3 py-1 shadow-sm">
                        <BookOpen className="w-3.5 h-3.5 text-emerald-500" /> Full Course Access
                      </span>
                    </div>

                    <Link href="/student/courses">
                      <Button className="rounded-xl h-12 px-8 font-bold text-[15px] shadow-md" style={{ backgroundColor: vibrantBlue }}>
                        Browse Courses
                      </Button>
                    </Link>
                    <p className="text-[11px] text-slate-400 mt-3">Starting from <span className="font-bold text-slate-600">$19.00</span> / course</p>
                  </div>
                </Card>
              </div>
            ) : (
              /* Normal Flashcard */
              <div 
                className="relative w-full aspect-[4/3] sm:aspect-[16/9] cursor-pointer"
                style={{ perspective: "1000px" }}
                onClick={() => setFlipped(!flipped)}
              >
                <div 
                  className="relative w-full h-full transition-transform duration-500 ease-in-out"
                  style={{ transformStyle: "preserve-3d", transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)" }}
                >
                  {/* Front */}
                  <Card 
                    className="absolute inset-0 rounded-[24px] border-2 border-slate-100 shadow-[0_8px_30px_-4px_rgba(0,0,0,0.05)] flex flex-col items-center justify-center p-8 bg-white"
                    style={{ backfaceVisibility: "hidden" }}
                  >
                    <div className="absolute top-8 left-1/2 -translate-x-1/2">
                      <span className="bg-[#f0f4f8] text-[#334155] px-5 py-1.5 rounded-full text-[13px] font-bold tracking-wide capitalize">{word.topic}</span>
                    </div>
                    <h2 className="text-4xl sm:text-6xl font-black text-slate-900 mb-6 tracking-tight">{word.word}</h2>
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
                    className="absolute inset-0 rounded-[24px] border-2 border-slate-100 shadow-[0_8px_30px_-4px_rgba(0,0,0,0.05)] flex flex-col items-center justify-center p-8 bg-white"
                    style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                  >
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-6 text-center leading-tight">{word.meaning}</h2>
                    <p className="text-lg text-slate-500 italic font-medium text-center">&quot;{word.example}&quot;</p>
                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
                      <p className="text-[#64748b] text-[13px] font-medium">Click to see word</p>
                    </div>
                  </Card>
                </div>
              </div>
            )}

            {/* Bottom Controls */}
            <div className="mt-8 flex flex-col items-center justify-center gap-5">
              <div className="flex items-center justify-center gap-6">
                 <button className="w-[48px] h-[48px] rounded-full border-2 border-slate-100 bg-white flex items-center justify-center text-slate-500 hover:border-slate-200 hover:bg-slate-50 transition-colors shadow-sm">
                   <RotateCcw className="w-5 h-5" />
                 </button>
                 <button className="w-[56px] h-[56px] rounded-full flex items-center justify-center text-white shadow-md hover:opacity-90 transition-opacity" style={{ backgroundColor: vibrantBlue }}>
                   <Heart className="w-6 h-6 fill-current" />
                 </button>
                 <button className="w-[48px] h-[48px] rounded-full border-2 border-slate-100 bg-white flex items-center justify-center text-slate-500 hover:border-slate-200 hover:bg-slate-50 transition-colors shadow-sm">
                   <Star className="w-5 h-5" />
                 </button>
              </div>
              <p className="text-slate-500 font-bold text-[14px] tracking-widest">
                {current + 1} / {isEnrolled ? filteredWords.length : `${FREE_WORD_LIMIT} free`}
              </p>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="favorites">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
            {words.filter((w) => w.isFavorite).map((w) => (
              <Card key={w.word} className="rounded-2xl border-2 border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="font-extrabold text-xl text-slate-800 tracking-tight">{w.word}</p>
                      <Badge variant="secondary" className="mt-2 bg-[#f0f4f8] text-[#334155] capitalize">{w.topic}</Badge>
                    </div>
                    <Heart className="h-6 w-6 text-[#0b5ce5] fill-current" />
                  </div>
                  <p className="text-[15px] font-medium text-slate-600 leading-snug">{w.meaning}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="quiz">
          <div className="max-w-2xl mx-auto">
            {isQuizLocked ? (
              <Card className="rounded-[24px] border-2 border-slate-200 shadow-lg flex flex-col items-center justify-center p-8 bg-gradient-to-br from-slate-50 via-white to-blue-50 overflow-hidden relative min-h-[400px]">
                {/* Decorative blurred circles */}
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-200/30 rounded-full blur-3xl" />
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-indigo-200/20 rounded-full blur-3xl" />

                <div className="relative z-10 flex flex-col items-center text-center max-w-sm">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#0b5ce5] to-[#6366f1] flex items-center justify-center mb-5 shadow-lg">
                    <Lock className="w-7 h-7 text-white" />
                  </div>

                  <h3 className="text-2xl font-extrabold text-slate-900 mb-2">Free Quiz Limit Reached</h3>
                  <p className="text-sm text-slate-500 leading-relaxed mb-1">
                    You&apos;ve completed the free quiz preview of <span className="font-bold text-[#0b5ce5]">{FREE_WORD_LIMIT} questions</span>.
                    Enroll now to continue practicing and unlock full features.
                  </p>

                  <Link href="/student/courses" className="mt-6">
                    <Button className="rounded-xl h-12 px-8 font-bold text-[15px] shadow-md" style={{ backgroundColor: vibrantBlue }}>
                      Browse Courses
                    </Button>
                  </Link>
                </div>
              </Card>
            ) : currentQuizIndex >= filteredWords.length ? (
              <Card className="rounded-[24px] border-2 border-slate-100 shadow-sm p-10 text-center min-h-[400px] flex flex-col items-center justify-center">
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h2 className="text-3xl font-extrabold text-slate-800 mb-4">Quiz Completed!</h2>
                <p className="text-lg text-slate-500 mb-8">
                  You scored <span className="font-bold text-[#0b5ce5]">{quizScore}</span> out of {filteredWords.length} in this topic.
                </p>
                <Button 
                  onClick={() => {
                    setCurrentQuizIndex(0);
                    setQuizScore(0);
                    setSelectedAnswer(null);
                    setIsAnswerChecked(false);
                  }}
                  className="rounded-xl h-12 px-8 font-bold text-[15px]" style={{ backgroundColor: vibrantBlue }}
                >
                  <RotateCcw className="w-4 h-4 mr-2" /> Try Again
                </Button>
              </Card>
            ) : (
              <Card className="rounded-[24px] border-2 border-slate-100 shadow-sm p-8">
                <div className="text-center mb-8 flex items-center justify-between">
                  <span className="bg-[#f0f4f8] text-[#334155] px-4 py-1.5 rounded-full text-[13px] font-bold tracking-wide">
                    Question {currentQuizIndex + 1}/{isEnrolled ? filteredWords.length : FREE_WORD_LIMIT}
                  </span>
                  <span className="text-sm font-bold text-slate-500">Score: {quizScore}</span>
                </div>
                <h3 className="text-2xl font-extrabold text-slate-800 text-center mb-10">
                  What does <span className="text-[#0b5ce5]">&quot;{quizQuestions[currentQuizIndex]?.word}&quot;</span> mean?
                </h3>
                <div className="space-y-4">
                  {quizQuestions[currentQuizIndex]?.options.map((opt, i) => {
                    const isSelected = selectedAnswer === opt;
                    const isCorrect = opt === quizQuestions[currentQuizIndex].correctAnswer;
                    
                    let btnClass = "border-slate-100 text-slate-700 hover:border-[#0b5ce5] hover:bg-[#f0f5ff]";
                    let icon = null;

                    if (isAnswerChecked) {
                      if (isCorrect) {
                        btnClass = "border-emerald-500 bg-emerald-50 text-emerald-800";
                        icon = <CheckCircle2 className="w-5 h-5 text-emerald-500" />;
                      } else if (isSelected) {
                        btnClass = "border-red-500 bg-red-50 text-red-800";
                        icon = <XCircle className="w-5 h-5 text-red-500" />;
                      } else {
                        btnClass = "border-slate-100 text-slate-400 opacity-50";
                      }
                    } else if (isSelected) {
                      btnClass = "border-[#0b5ce5] bg-[#0b5ce5]/5 text-[#0b5ce5]";
                    }

                    return (
                      <button 
                        key={i} 
                        disabled={isAnswerChecked}
                        onClick={() => setSelectedAnswer(opt)}
                        className={`w-full text-left flex items-center justify-between rounded-[16px] border-2 p-5 text-[16px] font-bold transition-all ${btnClass}`}
                      >
                        <div>
                          <span className={isAnswerChecked && isCorrect ? "text-emerald-600 mr-3" : isAnswerChecked && isSelected ? "text-red-600 mr-3" : "text-slate-400 mr-3"}>
                            {String.fromCharCode(65 + i)}.
                          </span> 
                          {opt}
                        </div>
                        {icon}
                      </button>
                    );
                  })}
                </div>
                
                {!isAnswerChecked ? (
                  <Button 
                    disabled={!selectedAnswer}
                    onClick={() => {
                      setIsAnswerChecked(true);
                      if (selectedAnswer === quizQuestions[currentQuizIndex].correctAnswer) {
                        setQuizScore(s => s + 1);
                      }
                    }}
                    className="w-full rounded-[14px] h-14 mt-8 font-bold text-lg shadow-sm" style={{ backgroundColor: vibrantBlue }}
                  >
                    Check Answer
                  </Button>
                ) : (
                  <Button 
                    onClick={() => {
                      setSelectedAnswer(null);
                      setIsAnswerChecked(false);
                      setCurrentQuizIndex(i => i + 1);
                    }}
                    className="w-full rounded-[14px] h-14 mt-8 font-bold text-lg shadow-sm" style={{ backgroundColor: vibrantBlue }}
                  >
                    Next Question
                  </Button>
                )}
              </Card>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
}
