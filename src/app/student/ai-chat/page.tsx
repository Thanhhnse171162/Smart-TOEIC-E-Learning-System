"use client";

import { useState } from "react";
import { Bot, Plus, Send, User } from "lucide-react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { studentSidebarItems } from "@/lib/navigation";
import { cn } from "@/lib/utils";

const sessions = [
  { id: "1", title: "Grammar: Prepositions" },
  { id: "2", title: "TOEIC Part 5 Strategy" },
  { id: "3", title: "Vocabulary: Business Terms" },
];

const initialMessages = [
  { role: "user" as const, content: "Why is 'at' used here instead of 'in'?" },
  { role: "assistant" as const, content: "Great question! Use 'at' for specific points or locations (at the office, at 3 PM), while 'in' is used for enclosed spaces or larger areas (in the building, in Vietnam). In your sentence, 'at the meeting' refers to a specific event point." },
];

export default function AIChatPage() {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const [activeSession, setActiveSession] = useState("1");

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages([...messages, { role: "user", content: input }, {
      role: "assistant",
      content: `I understand your question about "${input.slice(0, 40)}...". In TOEIC context, focus on identifying key grammar patterns and eliminate wrong answers systematically. Would you like a detailed explanation or a mini quiz?`,
    }]);
    setInput("");
  };

  return (
    <DashboardLayout sidebarItems={studentSidebarItems} title="AI Learning Assistant" subtitle="Powered by AI">
      <div className="flex h-[calc(100vh-8rem)] gap-4">
        <Card className="hidden md:flex w-64 shrink-0 flex-col rounded-xl">
          <div className="p-4 border-b">
            <Button className="w-full rounded-xl gap-2" size="sm"><Plus className="h-4 w-4" />New Chat</Button>
          </div>
          <div className="flex-1 overflow-y-auto p-2 space-y-1">
            {sessions.map((s) => (
              <button
                key={s.id}
                onClick={() => setActiveSession(s.id)}
                className={cn(
                  "w-full text-left rounded-lg px-3 py-2 text-sm transition-colors truncate",
                  activeSession === s.id ? "bg-primary/10 text-primary font-medium" : "hover:bg-muted"
                )}
              >
                {s.title}
              </button>
            ))}
          </div>
        </Card>

        <Card className="flex flex-1 flex-col rounded-xl overflow-hidden">
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, i) => (
              <div key={i} className={cn("flex gap-3", msg.role === "user" ? "justify-end" : "justify-start")}>
                {msg.role === "assistant" && (
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <Bot className="h-4 w-4" />
                  </div>
                )}
                <div className={cn(
                  "max-w-[75%] rounded-2xl px-4 py-3 text-sm",
                  msg.role === "user" ? "bg-primary text-primary-foreground rounded-br-md" : "bg-muted rounded-bl-md"
                )}>
                  {msg.content}
                </div>
                {msg.role === "user" && (
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted">
                    <User className="h-4 w-4" />
                  </div>
                )}
              </div>
            ))}
          </div>
          <CardContent className="border-t p-4">
            <div className="flex gap-2">
              <Textarea
                placeholder="Ask about grammar, vocabulary, or TOEIC strategies..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && (e.preventDefault(), sendMessage())}
                className="min-h-[44px] max-h-32 rounded-xl resize-none"
                rows={1}
              />
              <Button size="icon" className="rounded-xl shrink-0 h-11 w-11" onClick={sendMessage}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
