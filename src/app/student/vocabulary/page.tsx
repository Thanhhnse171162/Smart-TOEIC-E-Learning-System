"use client";

import { useState } from "react";
import { Heart, RotateCcw, Search, Star, Volume2, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
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

const vibrantBlue = "#0b5ce5";

export default function VocabularyPage() {
  const { words, loading, fromApi } = useVocabularies();
  const user = getStoredUser();
  const [flipped, setFlipped] = useState(false);
  const [current, setCurrent] = useState(0);
  const word = words[current];

  const handleNext = () => {
    setFlipped(false);
    setTimeout(() => {
      if (current < words.length - 1) setCurrent(c => c + 1);
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
    <DashboardLayout sidebarItems={studentSidebarItems} title="Vocabulary Builder" subtitle={`${words.length} words`} userName={user?.fullName}>
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
          <button key={t.id} className="rounded-full border border-slate-200 bg-white hover:border-slate-300 transition-colors px-5 py-1.5 text-[13px] font-bold text-slate-700 shadow-sm">
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
              disabled={current === words.length - 1}
              className="absolute -right-16 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-white border border-slate-200 shadow-sm text-slate-400 hover:text-[#0b5ce5] hover:border-[#0b5ce5] disabled:opacity-30 disabled:hover:border-slate-200 disabled:hover:text-slate-400 transition-all z-10 hidden md:flex"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

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
              <p className="text-slate-500 font-bold text-[14px] tracking-widest">{current + 1} / {words.length}</p>
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
          <Card className="rounded-[24px] max-w-2xl mx-auto border-2 border-slate-100 shadow-sm p-8">
            <div className="text-center mb-8">
               <span className="bg-[#f0f4f8] text-[#334155] px-4 py-1.5 rounded-full text-[13px] font-bold tracking-wide">Question 1/10</span>
            </div>
            <h3 className="text-2xl font-extrabold text-slate-800 text-center mb-10">What does <span className="text-[#0b5ce5]">&quot;negotiate&quot;</span> mean?</h3>
            <div className="space-y-4">
              {["To argue with someone", "To discuss formally to reach an agreement", "To cancel a meeting", "To postpone a project"].map((opt, i) => (
                <button key={i} className="w-full text-left rounded-[16px] border-2 border-slate-100 p-5 text-[16px] font-bold text-slate-700 hover:border-[#0b5ce5] hover:bg-[#f0f5ff] transition-all">
                   <span className="mr-3 text-slate-400">{String.fromCharCode(65 + i)}.</span> {opt}
                </button>
              ))}
            </div>
            <Button className="w-full rounded-[14px] h-14 mt-8 font-bold text-lg shadow-sm" style={{ backgroundColor: vibrantBlue }}>
              Check Answer
            </Button>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
}
