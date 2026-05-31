"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Clock, Flag, Pause, Play } from "lucide-react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { studentSidebarItems } from "@/lib/navigation";

const questions = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  text: i < 3
    ? "Look at the picture and choose the statement that best describes what you see."
    : "The company announced that it _______ a new branch office next month.",
  options: i < 3
    ? ["The man is reading.", "The woman is on the phone.", "People are waiting.", "A truck is parked."]
    : ["open", "will open", "opened", "opening"],
}));

export default function MockTestPage() {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [timeLeft, setTimeLeft] = useState(7200);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft((t) => Math.max(0, t - 1)), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (s: number) => `${Math.floor(s / 3600)}:${String(Math.floor((s % 3600) / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
  const q = questions[current];
  const progress = (Object.keys(answers).length / questions.length) * 100;

  return (
    <DashboardLayout sidebarItems={studentSidebarItems} title="Full TOEIC Mock Test" subtitle="Test #1 — 200 Questions">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-4 rounded-xl border bg-card p-4">
        <div className="flex items-center gap-3">
          <Clock className="h-5 w-5 text-primary" />
          <span className="font-mono text-lg font-bold">{formatTime(timeLeft)}</span>
        </div>
        <Progress value={progress} className="flex-1 max-w-xs h-2" />
        <Badge variant="secondary">{Object.keys(answers).length}/{questions.length} answered</Badge>
        <Link href="/student/mock-test/result">
          <Button className="rounded-xl">Submit Test</Button>
        </Link>
      </div>

      <div className="grid gap-6 lg:grid-cols-4">
        <Card className="rounded-xl lg:col-span-1 order-2 lg:order-1">
          <CardHeader><CardTitle className="text-base">Question Navigator</CardTitle></CardHeader>
          <CardContent>
            <div className="grid grid-cols-5 gap-2">
              {questions.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-9 w-full rounded-lg text-xs font-medium transition-colors ${
                    current === i ? "bg-primary text-primary-foreground" :
                    answers[i] !== undefined ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" :
                    "bg-muted hover:bg-muted/80"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-xl lg:col-span-3 order-1 lg:order-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Question {current + 1}</CardTitle>
              <Button variant="ghost" size="sm" className="gap-1"><Flag className="h-4 w-4" /> Flag</Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <p>{q.text}</p>
            {current < 3 && (
              <div className="flex items-center gap-4 rounded-xl bg-muted p-4">
                <Button variant="outline" size="icon" className="rounded-full" onClick={() => setPlaying(!playing)}>
                  {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </Button>
                <div className="flex-1 h-2 rounded-full bg-background"><div className="h-full w-1/4 rounded-full bg-primary" /></div>
                <span className="text-xs text-muted-foreground">Audio</span>
              </div>
            )}
            <div className="space-y-3">
              {q.options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => setAnswers({ ...answers, [current]: i })}
                  className={`w-full text-left rounded-xl border p-4 text-sm transition-all ${answers[current] === i ? "border-primary bg-primary/5 ring-1 ring-primary" : "hover:border-primary/50"}`}
                >
                  {String.fromCharCode(65 + i)}. {opt}
                </button>
              ))}
            </div>
            <div className="flex justify-between">
              <Button variant="outline" className="rounded-xl" disabled={current === 0} onClick={() => setCurrent(current - 1)}>Previous</Button>
              <Button className="rounded-xl" disabled={current === questions.length - 1} onClick={() => setCurrent(current + 1)}>Next</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
