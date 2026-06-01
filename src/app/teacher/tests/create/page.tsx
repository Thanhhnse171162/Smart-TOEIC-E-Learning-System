"use client";

import Link from "next/link";
import { useState } from "react";
import { 
  Search, 
  ChevronDown, 
  X, 
  Settings2, 
  AlertTriangle,
  Play,
  Pause,
  Volume2,
  CheckCircle2,
  ArrowRight,
  Shuffle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";

export default function CreateTestPage() {
  const [smartSelect, setSmartSelect] = useState(true);

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col font-sans">
      {/* Top Navigation */}
      <header className="h-14 bg-white border-b border-slate-200 flex items-center justify-between px-6 shrink-0 z-10">
        <div className="flex items-center text-[15px] font-semibold text-slate-800">
          Dynamic Teacher - Create Test <span className="mx-2 text-slate-400">|</span> Step 2: Question Selection
        </div>
        <div className="h-8 w-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-sm">
          T
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex overflow-hidden p-4 gap-4">
        
        {/* LEFT PANEL: Filters & Quota */}
        <div className="w-[300px] flex flex-col gap-4 shrink-0 overflow-y-auto pb-20">
          <Card className="rounded-xl border-slate-200 shadow-sm bg-white overflow-hidden">
            <div className="flex border-b border-slate-100">
              <button className="flex-1 py-3 text-sm font-bold text-slate-800 border-b-2 border-slate-800 text-center">Filter Questions</button>
              <button className="flex-1 py-3 text-sm font-semibold text-slate-400 text-center hover:text-slate-600">Part Quota Tracker</button>
            </div>
            <CardContent className="p-5 space-y-6">
              
              {/* Quota Progress */}
              <div className="space-y-5">
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center text-[13px] font-bold text-slate-700">
                    <span>Part 1: Photographs</span>
                    <span className="text-emerald-600">6/6</span>
                  </div>
                  <Progress value={100} className="h-2 bg-slate-100 [&>div]:bg-emerald-500" />
                </div>
                
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center text-[13px] font-bold text-slate-700">
                    <span>Part 2: Question-Response</span>
                    <span className="text-amber-500 flex items-center gap-1">0/25 <AlertTriangle className="h-3 w-3" /></span>
                  </div>
                  <Progress value={0} className="h-2 bg-slate-100 [&>div]:bg-amber-400" />
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between items-center text-[13px] font-bold text-slate-700">
                    <span>Part 3: Conversations</span>
                    <span className="text-amber-500 flex items-center gap-1">0/20 <AlertTriangle className="h-3 w-3" /></span>
                  </div>
                  <Progress value={0} className="h-2 bg-slate-100 [&>div]:bg-amber-400" />
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between items-center text-[13px] font-bold text-slate-700">
                    <span>Part 4: Talks</span>
                    <span className="text-amber-500 flex items-center gap-1">0/20 <AlertTriangle className="h-3 w-3" /></span>
                  </div>
                  <Progress value={0} className="h-2 bg-slate-100 [&>div]:bg-amber-400" />
                </div>
              </div>

              {/* Topics */}
              <div className="pt-4 border-t border-slate-100">
                <h4 className="text-[13px] font-bold text-slate-700 mb-3">Topic</h4>
                <div className="flex flex-wrap gap-2">
                  {["Business", "Travel", "Finance", "Office", "Education", "Health"].map(topic => (
                    <Badge key={topic} className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-full px-3 py-1 text-xs cursor-pointer shadow-sm">
                      {topic}
                    </Badge>
                  ))}
                  <Badge variant="outline" className="border-slate-200 text-slate-500 rounded-full px-3 py-1 text-xs cursor-pointer hover:bg-slate-50">
                    <ChevronDown className="h-3 w-3" />
                  </Badge>
                </div>
              </div>

              {/* Smart Select */}
              <div className="pt-4 border-t border-slate-100 flex items-start justify-between">
                <div>
                  <h4 className="text-[14px] font-bold text-slate-800">Smart Select</h4>
                  <p className="text-[11px] text-slate-500 mt-1 max-w-[180px] leading-relaxed">
                    AI-powered question picking based on balanced difficulty and topic coverage.
                  </p>
                </div>
                <Switch checked={smartSelect} onCheckedChange={setSmartSelect} className="data-[state=checked]:bg-indigo-600" />
              </div>

            </CardContent>
          </Card>
        </div>

        {/* MIDDLE PANEL: Question Bank & Preview */}
        <div className="flex-1 flex flex-col gap-4 min-w-[500px] overflow-hidden">
          <Card className="rounded-xl border-slate-200 shadow-sm bg-white flex-1 flex flex-col overflow-hidden">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <h2 className="font-bold text-[16px] text-slate-800">Question Bank</h2>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input placeholder="Search..." className="h-9 w-48 pl-9 rounded-lg border-slate-200 bg-white text-sm" />
                </div>
                <div className="flex items-center gap-2 text-sm font-medium text-slate-600 cursor-pointer hover:text-slate-900">
                  Sort by <ChevronDown className="h-4 w-4" />
                </div>
              </div>
            </div>

            <div className="flex-1 flex overflow-hidden">
              {/* Question List */}
              <div className="w-1/2 border-r border-slate-100 overflow-y-auto p-4 space-y-6">
                
                {/* Listening Section */}
                <div>
                  <h3 className="font-bold text-slate-800 bg-slate-100/80 px-4 py-2 rounded-lg flex justify-between items-center mb-3">
                    Listening Section
                    <ChevronDown className="h-4 w-4 text-slate-500" />
                  </h3>
                  
                  <div className="space-y-3">
                    {/* Active Item */}
                    <div className="bg-indigo-50/50 border border-indigo-100 rounded-xl p-3 cursor-pointer">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-[13px] text-slate-800">Conversation (Part 3)</span>
                        <div className="flex gap-2">
                          <Badge variant="secondary" className="bg-indigo-100 text-indigo-700 text-[10px] font-bold">Part 3</Badge>
                          <Badge variant="secondary" className="bg-amber-100 text-amber-700 text-[10px] font-bold">Medium Difficulty</Badge>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <label className="flex items-center gap-2 text-[12px] font-medium text-slate-600 cursor-pointer">
                          <div className="w-4 h-4 rounded border border-slate-300 bg-white flex items-center justify-center"></div>
                          Conversation
                        </label>
                        <div className="flex gap-2">
                          <Badge variant="secondary" className="bg-emerald-100 text-emerald-700 text-[10px] font-bold">Easy</Badge>
                          <div className="flex gap-1 text-slate-400">
                            <Shuffle className="h-3.5 w-3.5" />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Inactive Item */}
                    <div className="border border-slate-100 rounded-xl p-3 hover:border-slate-200 cursor-pointer transition-colors">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-[13px] text-slate-700">Conversation (Part 4)</span>
                        <div className="flex gap-2">
                          <Badge variant="secondary" className="bg-indigo-50 text-indigo-600 text-[10px] font-bold">Part 4</Badge>
                          <Badge variant="secondary" className="bg-amber-50 text-amber-600 text-[10px] font-bold">Medium Difficulty</Badge>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-2 opacity-70">
                        <label className="flex items-center gap-2 text-[12px] font-medium text-slate-600">
                          <div className="w-4 h-4 rounded border border-slate-300 bg-white"></div>
                          Conversation
                        </label>
                        <Badge variant="secondary" className="bg-emerald-50 text-emerald-600 text-[10px] font-bold">Easy</Badge>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Reading Section */}
                <div>
                  <h3 className="font-bold text-slate-800 bg-slate-100/80 px-4 py-2 rounded-lg flex justify-between items-center mb-3">
                    Reading Section
                  </h3>
                  <div className="space-y-3">
                    <div className="border border-slate-100 rounded-xl p-3 cursor-pointer">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-[13px] text-slate-700">Question: (Part 7)</span>
                        <div className="flex gap-2">
                          <Badge variant="secondary" className="bg-indigo-50 text-indigo-600 text-[10px] font-bold">Part 7</Badge>
                          <Badge variant="secondary" className="bg-rose-50 text-rose-600 text-[10px] font-bold">Hard</Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
              </div>

              {/* Question Preview */}
              <div className="w-1/2 p-5 bg-white overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold text-slate-800">Question</h3>
                  <X className="h-4 w-4 text-slate-400 cursor-pointer" />
                </div>
                <div className="space-y-4">
                  <p className="text-[13px] text-slate-700 leading-relaxed font-medium">
                    Conversation (Part 3) - Medium. Talk about to discuss with readium, conclartions this uews sitor, sreakirwhen you unrespendent abrolation about too the renowatory specifec sonse repoated by the luke repeat for the program.
                  </p>
                  <div className="space-y-3 pl-4">
                    <p className="text-[13px] text-slate-700"><span className="font-bold mr-2">A.</span>The rvolt for conventtion speaking axamorce.</p>
                    <p className="text-[13px] text-slate-700"><span className="font-bold mr-2">B.</span>The apptocs is heaking trmtarment.</p>
                    <p className="text-[13px] text-slate-700"><span className="font-bold mr-2">C.</span>The runatot and the world will be conversation camera.</p>
                    <p className="text-[13px] text-slate-700"><span className="font-bold mr-2">D.</span>The devious arn-oklama parts.</p>
                  </div>
                  
                  {/* Audio Player Fake */}
                  <div className="mt-8 bg-slate-50 rounded-xl p-3 flex items-center gap-3 border border-slate-100">
                    <div className="h-8 w-8 rounded-full bg-indigo-600 text-white flex items-center justify-center cursor-pointer">
                      <Pause className="h-4 w-4 fill-current" />
                    </div>
                    <div className="flex-1 flex gap-0.5 items-center h-6 opacity-70">
                       {/* Fake waveform */}
                       {Array.from({length: 30}).map((_, i) => (
                         <div key={i} className="w-1 bg-indigo-400 rounded-full" style={{ height: `${Math.max(20, Math.random() * 100)}%` }}></div>
                       ))}
                    </div>
                    <Volume2 className="h-4 w-4 text-slate-500" />
                  </div>
                </div>
              </div>

            </div>
          </Card>
        </div>

        {/* RIGHT PANEL: Selected Questions */}
        <div className="w-[300px] shrink-0 overflow-hidden pb-20">
          <Card className="rounded-xl border-slate-200 shadow-sm bg-white h-full flex flex-col">
            <div className="p-4 border-b border-slate-100 bg-slate-50/50">
              <h2 className="font-bold text-[15px] text-slate-800">Selected Questions</h2>
            </div>
            <div className="flex-1 overflow-y-auto p-2">
              <div className="space-y-1">
                {Array.from({length: 12}).map((_, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 group transition-colors">
                    <span className="text-[13px] font-semibold text-slate-700">Question {i + 1}</span>
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-[11px] font-bold text-rose-500 cursor-pointer">Remove</span>
                      <X className="h-3 w-3 text-rose-500 cursor-pointer" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Tooltip hint mimicking the image */}
            <div className="absolute right-[320px] bottom-[80px] bg-slate-900 text-white text-xs font-semibold px-4 py-2.5 rounded-lg shadow-xl z-50 pointer-events-none">
              Select a total of 200 questions<br/>to proceed.
              <div className="absolute -right-1 bottom-[-4px] w-3 h-3 bg-slate-900 transform rotate-45"></div>
            </div>
          </Card>
        </div>

      </main>

      {/* BOTTOM FOOTER (Fixed) */}
      <footer className="fixed bottom-0 left-0 right-0 h-[72px] bg-white border-t border-slate-200 z-50 flex items-center justify-between px-8 shadow-[0_-4px_20px_rgba(0,0,0,0.03)]">
        <div className="flex items-center gap-8">
          <div className="text-[15px]">
            <span className="font-bold text-slate-800">Total Questions Selected: </span>
            <span className="font-bold text-indigo-600">45/200</span>
          </div>
          <div className="text-[15px]">
            <span className="font-bold text-slate-800">Estimated Time: </span>
            <span className="font-semibold text-slate-600">2 hours 15 mins</span>
          </div>
        </div>
        <Button disabled className="bg-slate-300 text-slate-500 font-bold rounded-xl h-11 px-6 opacity-80 cursor-not-allowed">
          Next: Review & Publish
        </Button>
      </footer>

    </div>
  );
}
