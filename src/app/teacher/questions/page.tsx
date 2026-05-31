import { Plus, Search } from "lucide-react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { teacherSidebarItems } from "@/lib/navigation";

const questions = [
  { id: "Q001", part: "Part 1", type: "Listening", text: "Photograph description question...", difficulty: "Easy" },
  { id: "Q002", part: "Part 5", type: "Reading", text: "The company announced that it _______ a new branch...", difficulty: "Medium" },
  { id: "Q003", part: "Part 3", type: "Listening", text: "Conversation about project deadline...", difficulty: "Hard" },
  { id: "Q004", part: "Part 7", type: "Reading", text: "Double passage about company merger...", difficulty: "Hard" },
];

export default function TeacherQuestionsPage() {
  return (
    <DashboardLayout sidebarItems={teacherSidebarItems} title="Question Bank" sidebarTitle="Teacher Portal" userName="Tran Thi B">
      <div className="flex flex-wrap gap-4 justify-between mb-6">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search questions..." className="pl-9 rounded-xl" />
        </div>
        <Button className="rounded-xl gap-2"><Plus className="h-4 w-4" />Add Question</Button>
      </div>
      <div className="space-y-3">
        {questions.map((q) => (
          <Card key={q.id} className="rounded-xl">
            <CardContent className="pt-4 pb-4 flex flex-wrap items-center justify-between gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="outline">{q.id}</Badge>
                  <Badge variant="secondary">{q.part}</Badge>
                  <Badge>{q.type}</Badge>
                </div>
                <p className="text-sm truncate">{q.text}</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={q.difficulty === "Hard" ? "destructive" : q.difficulty === "Medium" ? "default" : "secondary"}>{q.difficulty}</Badge>
                <Button variant="outline" size="sm" className="rounded-xl">Edit</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  );
}
