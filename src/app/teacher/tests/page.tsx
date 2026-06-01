import Link from "next/link";
import { Plus, Upload } from "lucide-react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { teacherSidebarItems } from "@/lib/navigation";

const tests = [
  { title: "Full Mock Test #1", type: "full", questions: 200, duration: "2h", status: "Published", students: 89 },
  { title: "Listening Practice Set A", type: "listening", questions: 50, duration: "45m", status: "Published", students: 124 },
  { title: "Reading Mini Test", type: "reading", questions: 30, duration: "30m", status: "Draft", students: 0 },
];

export default function TeacherTestsPage() {
  return (
    <DashboardLayout sidebarItems={teacherSidebarItems} title="Test Management" sidebarTitle="Teacher Portal" userName="Tran Thi B">
      <div className="flex justify-between items-center mb-6">
        <p className="text-muted-foreground">Create and manage TOEIC tests</p>
        <Link href="/teacher/tests/create">
          <Button className="rounded-xl gap-2 bg-[#0b5ce5] hover:bg-[#0b5ce5]/90"><Plus className="h-4 w-4" />Create TOEIC Test</Button>
        </Link>
      </div>
      
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="bg-transparent border-b border-border w-full justify-start rounded-none h-12 p-0 mb-6 gap-6">
          <TabsTrigger value="all" className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-[#0b5ce5] data-[state=active]:text-[#0b5ce5] data-[state=active]:shadow-none rounded-none px-2 h-full font-semibold text-muted-foreground">
            All
          </TabsTrigger>
          <TabsTrigger value="listening" className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-[#0b5ce5] data-[state=active]:text-[#0b5ce5] data-[state=active]:shadow-none rounded-none px-2 h-full font-semibold text-muted-foreground">
            Listening
          </TabsTrigger>
          <TabsTrigger value="reading" className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-[#0b5ce5] data-[state=active]:text-[#0b5ce5] data-[state=active]:shadow-none rounded-none px-2 h-full font-semibold text-muted-foreground">
            Reading
          </TabsTrigger>
          <TabsTrigger value="full" className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-[#0b5ce5] data-[state=active]:text-[#0b5ce5] data-[state=active]:shadow-none rounded-none px-2 h-full font-semibold text-muted-foreground">
            Full Tests
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-0">
          <div className="grid gap-4">
            {tests.map((t) => (
              <Card key={t.title} className="rounded-xl border-border/60 shadow-sm">
                <CardContent className="pt-6 flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <h3 className="font-bold text-[15px]">{t.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{t.questions} questions · {t.duration} · {t.students} students</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant={t.status === "Published" ? "default" : "secondary"} className={t.status === "Published" ? "bg-[#0b5ce5] hover:bg-[#0b5ce5]/90" : ""}>{t.status}</Badge>
                    <Button variant="outline" size="sm" className="rounded-xl h-8 px-4 font-semibold">Edit</Button>
                    <Button variant="outline" size="sm" className="rounded-xl gap-2 h-8 px-4 font-semibold"><Upload className="h-3.5 w-3.5" />Upload Audio</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        {/* We can duplicate TabsContent for others or just use "all" for mockup */}
      </Tabs>
    </DashboardLayout>
  );
}
