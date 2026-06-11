"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Upload, ChevronLeft, ChevronRight } from "lucide-react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { teacherSidebarItems } from "@/lib/navigation";

const allTests = [
  { id: 1, title: "Full Mock Test #1", type: "full", questions: 200, duration: "2h", status: "Published", students: 89 },
  { id: 2, title: "Listening Practice Set A", type: "listening", questions: 50, duration: "45m", status: "Published", students: 124 },
  { id: 3, title: "Reading Mini Test", type: "reading", questions: 30, duration: "30m", status: "Draft", students: 0 },
  { id: 4, title: "Full Mock Test #2", type: "full", questions: 200, duration: "2h", status: "Published", students: 45 },
  { id: 5, title: "Vocabulary Challenge", type: "reading", questions: 40, duration: "40m", status: "Published", students: 210 },
  { id: 6, title: "Listening Part 3 & 4 Focus", type: "listening", questions: 60, duration: "50m", status: "Draft", students: 0 },
];

export default function TeacherTestsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const totalPages = Math.ceil(allTests.length / itemsPerPage);
  const tests = allTests.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <DashboardLayout sidebarItems={teacherSidebarItems} title="Test Management" sidebarTitle="Teacher Portal" >
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
              <Card key={t.id} className="rounded-xl border-border/60 shadow-sm">
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

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between pt-6">
              <span className="text-sm font-semibold text-slate-500">
                Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, allTests.length)} of {allTests.length} entries
              </span>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="h-9 w-9 p-0 rounded-lg"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(page)}
                    className={`h-9 w-9 p-0 rounded-lg font-bold ${currentPage === page ? 'bg-[#0b5ce5] hover:bg-[#0b5ce5]/90 text-white shadow-sm' : 'border-slate-200 text-slate-600'}`}
                  >
                    {page}
                  </Button>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="h-9 w-9 p-0 rounded-lg"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </TabsContent>
        {/* We can duplicate TabsContent for others or just use "all" for mockup */}
      </Tabs>
    </DashboardLayout>
  );
}
