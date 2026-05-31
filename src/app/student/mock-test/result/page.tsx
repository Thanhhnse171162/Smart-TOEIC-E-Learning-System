import Link from "next/link";
import { CheckCircle, XCircle, BarChart3 } from "lucide-react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { studentSidebarItems } from "@/lib/navigation";

export default function MockTestResultPage() {
  return (
    <DashboardLayout sidebarItems={studentSidebarItems} title="Test Results" subtitle="Mock Test #1">
      <div className="max-w-4xl mx-auto space-y-6">
        <Card className="rounded-xl text-center">
          <CardContent className="pt-8 pb-8">
            <Badge className="mb-4">Test Completed</Badge>
            <p className="text-6xl font-bold text-primary mb-2">780</p>
            <p className="text-muted-foreground">Total TOEIC Score</p>
          </CardContent>
        </Card>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Listening", value: "390", color: "text-blue-600" },
            { label: "Reading", value: "390", color: "text-green-600" },
            { label: "Correct", value: "156", icon: CheckCircle, color: "text-green-600" },
            { label: "Incorrect", value: "44", icon: XCircle, color: "text-red-500" },
          ].map((s) => (
            <Card key={s.label} className="rounded-xl">
              <CardContent className="pt-6 text-center">
                {s.icon && <s.icon className={`h-6 w-6 mx-auto mb-2 ${s.color}`} />}
                <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
                <p className="text-sm text-muted-foreground">{s.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="rounded-xl">
          <CardHeader><CardTitle className="flex items-center gap-2"><BarChart3 className="h-5 w-5" />Performance Analysis</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            {[
              { part: "Part 1: Photographs", score: 85 },
              { part: "Part 2: Question Response", score: 72 },
              { part: "Part 5: Incomplete Sentences", score: 90 },
              { part: "Part 7: Reading Comprehension", score: 68 },
            ].map((p) => (
              <div key={p.part}>
                <div className="flex justify-between text-sm mb-1">
                  <span>{p.part}</span>
                  <span className="font-medium">{p.score}%</span>
                </div>
                <div className="h-2 rounded-full bg-muted">
                  <div className="h-full rounded-full bg-primary" style={{ width: `${p.score}%` }} />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="flex gap-4 justify-center">
          <Link href="/student/mock-test"><Button variant="outline" className="rounded-xl">Retake Test</Button></Link>
          <Button className="rounded-xl">Review Answers</Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
