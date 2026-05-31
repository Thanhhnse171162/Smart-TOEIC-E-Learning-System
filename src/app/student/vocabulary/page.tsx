"use client";

import { useState } from "react";
import { Heart, RotateCcw, Search, Star, Volume2 } from "lucide-react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { studentSidebarItems } from "@/lib/navigation";
import { vocabularyTopics } from "@/layers/data/mock/data";

const words = [
  { word: "negotiate", meaning: "to discuss formally to reach an agreement", example: "We need to negotiate the terms of the contract.", topic: "business", favorite: true },
  { word: "revenue", meaning: "income from business operations", example: "Revenue increased by 15% this quarter.", topic: "finance", favorite: false },
  { word: "campaign", meaning: "planned activities to achieve a goal", example: "The marketing campaign was successful.", topic: "marketing", favorite: false },
  { word: "deadline", meaning: "latest time to complete something", example: "We must meet the project deadline.", topic: "office", favorite: true },
];

export default function VocabularyPage() {
  const [flipped, setFlipped] = useState(false);
  const [current, setCurrent] = useState(0);
  const word = words[current];

  return (
    <DashboardLayout sidebarItems={studentSidebarItems} title="Vocabulary Builder" subtitle="342 words learned">
      <div className="mb-6">
        <div className="flex justify-between text-sm mb-2">
          <span>Learning Progress</span>
          <span className="font-medium">68%</span>
        </div>
        <Progress value={68} className="h-2" />
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {vocabularyTopics.map((t) => (
          <Badge key={t.id} variant="outline" className="rounded-full cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors px-4 py-1">
            {t.label}
          </Badge>
        ))}
      </div>

      <Tabs defaultValue="flashcards">
        <TabsList className="rounded-xl mb-6">
          <TabsTrigger value="flashcards" className="rounded-lg">Flashcards</TabsTrigger>
          <TabsTrigger value="favorites" className="rounded-lg gap-1"><Heart className="h-4 w-4" />Favorites</TabsTrigger>
          <TabsTrigger value="quiz" className="rounded-lg">Mini Quiz</TabsTrigger>
        </TabsList>

        <TabsContent value="flashcards">
          <div className="max-w-lg mx-auto">
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search vocabulary..." className="pl-9 rounded-xl" />
            </div>

            <Card
              className="rounded-2xl min-h-[280px] cursor-pointer shadow-md hover:shadow-lg transition-shadow"
              onClick={() => setFlipped(!flipped)}
            >
              <CardContent className="flex flex-col items-center justify-center pt-12 pb-12 text-center">
                {!flipped ? (
                  <>
                    <Badge variant="secondary" className="mb-4 capitalize">{word.topic}</Badge>
                    <h2 className="text-3xl font-bold mb-4">{word.word}</h2>
                    <Button variant="ghost" size="sm" className="gap-2"><Volume2 className="h-4 w-4" />Pronunciation</Button>
                    <p className="text-xs text-muted-foreground mt-6">Click to reveal meaning</p>
                  </>
                ) : (
                  <>
                    <p className="text-lg font-medium mb-4">{word.meaning}</p>
                    <p className="text-sm text-muted-foreground italic">&quot;{word.example}&quot;</p>
                  </>
                )}
              </CardContent>
            </Card>

            <div className="flex justify-center gap-3 mt-6">
              <Button variant="outline" size="icon" className="rounded-full" onClick={() => { setCurrent(Math.max(0, current - 1)); setFlipped(false); }}>
                <RotateCcw className="h-4 w-4" />
              </Button>
              <Button variant={word.favorite ? "default" : "outline"} size="icon" className="rounded-full">
                <Heart className={`h-4 w-4 ${word.favorite ? "fill-current" : ""}`} />
              </Button>
              <Button variant="outline" size="icon" className="rounded-full" onClick={() => { setCurrent(Math.min(words.length - 1, current + 1)); setFlipped(false); }}>
                <Star className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-center text-sm text-muted-foreground mt-4">{current + 1} / {words.length}</p>
          </div>
        </TabsContent>

        <TabsContent value="favorites">
          <div className="grid gap-4 sm:grid-cols-2">
            {words.filter((w) => w.favorite).map((w) => (
              <Card key={w.word} className="rounded-xl">
                <CardContent className="pt-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-bold">{w.word}</p>
                      <p className="text-sm text-muted-foreground">{w.meaning}</p>
                    </div>
                    <Heart className="h-4 w-4 text-primary fill-primary" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="quiz">
          <Card className="rounded-xl max-w-lg mx-auto">
            <CardContent className="pt-6 space-y-4">
              <p className="font-medium">What does &quot;negotiate&quot; mean?</p>
              {["To argue", "To discuss to reach agreement", "To cancel", "To postpone"].map((opt, i) => (
                <button key={i} className="w-full text-left rounded-xl border p-3 text-sm hover:border-primary transition-colors">{String.fromCharCode(65 + i)}. {opt}</button>
              ))}
              <Button className="w-full rounded-xl">Check Answer</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
}
