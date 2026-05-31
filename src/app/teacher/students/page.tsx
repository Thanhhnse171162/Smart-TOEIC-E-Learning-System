import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { teacherSidebarItems } from "@/lib/navigation";

const students = [
  { name: "Nguyen Van A", email: "student@toeic.com", score: 785, progress: 78, lastActive: "Today" },
  { name: "Le Van C", email: "lec@toeic.com", score: 720, progress: 55, lastActive: "Yesterday" },
  { name: "Pham Thi D", email: "phamd@toeic.com", score: 810, progress: 92, lastActive: "2 days ago" },
  { name: "Hoang Minh", email: "hoang@toeic.com", score: 690, progress: 45, lastActive: "3 days ago" },
];

export default function TeacherStudentsPage() {
  return (
    <DashboardLayout sidebarItems={teacherSidebarItems} title="Students" sidebarTitle="Teacher Portal" userName="Tran Thi B">
      <Card className="rounded-xl">
        <CardHeader><CardTitle>Student List</CardTitle></CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left text-muted-foreground">
                  <th className="pb-3 pr-4">Student</th>
                  <th className="pb-3 pr-4">Score</th>
                  <th className="pb-3 pr-4">Progress</th>
                  <th className="pb-3 pr-4">Last Active</th>
                  <th className="pb-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {students.map((s) => (
                  <tr key={s.email} className="border-b last:border-0">
                    <td className="py-4 pr-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${s.name}`} />
                          <AvatarFallback>{s.name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{s.name}</p>
                          <p className="text-xs text-muted-foreground">{s.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 pr-4"><Badge>{s.score}</Badge></td>
                    <td className="py-4 pr-4">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-20 rounded-full bg-muted"><div className="h-full rounded-full bg-primary" style={{ width: `${s.progress}%` }} /></div>
                        <span className="text-xs">{s.progress}%</span>
                      </div>
                    </td>
                    <td className="py-4 pr-4 text-muted-foreground">{s.lastActive}</td>
                    <td className="py-4"><Button variant="outline" size="sm" className="rounded-xl">View Results</Button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
