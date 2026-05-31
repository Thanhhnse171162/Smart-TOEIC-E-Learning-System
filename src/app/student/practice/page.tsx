"use client";

import { useState } from "react";
import { ChevronRight, Headphones, Pause, Play, Volume2 } from "lucide-react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { studentSidebarItems } from "@/lib/navigation";
import { listeningParts, readingParts } from "@/layers/data/mock/data";

const sampleQuestion = {
  text: "Look at the picture and choose the statement that best describes what you see.",
  options: [
    "The man is reading a newspaper.",
    "The woman is talking on the phone.",
    "People are waiting at a bus stop.",
    "A delivery truck is parked outside.",
  ],
};

export default function PracticePage() {
  const [selected, setSelected] = useState<number | null>(null);
  const [playing, setPlaying] = useState(false);
  const [activePart, setActivePart] = useState("1");

  return (
    <DashboardLayout sidebarItems={studentSidebarItems} title="TOEIC Practice" subtitle="Practice by part">
      <Tabs defaultValue="listening" className="space-y-6">
        <TabsList className="rounded-xl">
          <TabsTrigger value="listening" className="rounded-lg gap-2"><Headphones className="h-4 w-4" />Listening</TabsTrigger>
          <TabsTrigger value="reading" className="rounded-lg">Reading</TabsTrigger>
        </TabsList>

        <TabsContent value="listening" className="space-y-6">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {listeningParts.map((p) => (
              <Card key={p.id} className={`rounded-xl cursor-pointer transition-all hover:shadow-md ${activePart === String(p.id) ? "border-primary ring-1 ring-primary" : ""}`} onClick={() => setActivePart(String(p.id))}>
                <CardContent className="pt-4 pb-4">
                  <p className="font-medium text-sm">{p.title}</p>
                  <p className="text-xs text-muted-foreground mt-1">{p.questions} questions</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="reading" className="space-y-6">
          <div className="grid gap-3 sm:grid-cols-3">
            {readingParts.map((p) => (
              <Card key={p.id} className="rounded-xl cursor-pointer hover:shadow-md transition-all" onClick={() => setActivePart(String(p.id))}>
                <CardContent className="pt-4 pb-4">
                  <p className="font-medium text-sm">{p.title}</p>
                  <p className="text-xs text-muted-foreground mt-1">{p.questions} questions</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <Card className="rounded-xl mt-6">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Question 1 of 6</CardTitle>
            <Badge>Part {activePart}</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-base leading-relaxed">{sampleQuestion.text}</p>

          <div className="flex items-center gap-4 rounded-xl bg-muted p-4">
            <Button variant="outline" size="icon" className="rounded-full" onClick={() => setPlaying(!playing)}>
              {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </Button>
            <div className="flex-1 h-2 rounded-full bg-background">
              <div className="h-full w-1/3 rounded-full bg-primary" />
            </div>
            <Volume2 className="h-4 w-4 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">0:12 / 0:35</span>
          </div>

          <div className="space-y-3">
            {sampleQuestion.options.map((opt, i) => (
              <button
                key={i}
                onClick={() => setSelected(i)}
                className={`w-full text-left rounded-xl border p-4 text-sm transition-all hover:border-primary ${selected === i ? "border-primary bg-primary/5 ring-1 ring-primary" : ""}`}
              >
                <span className="font-medium mr-2">{String.fromCharCode(65 + i)}.</span>{opt}
              </button>
            ))}
          </div>

          <div className="flex gap-3">
            <Button className="rounded-xl">Submit Answer</Button>
            <Button variant="outline" className="rounded-xl gap-2">Next Question <ChevronRight className="h-4 w-4" /></Button>
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
