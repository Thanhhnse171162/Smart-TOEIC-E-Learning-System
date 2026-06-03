"use client";

import { Loader2 } from "lucide-react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { ApiDataBadge } from "@/components/api-data-badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { teacherSidebarItems } from "@/lib/navigation";
import { useUsers } from "@/hooks/use-users";
import { getStoredUser } from "@/lib/auth/session";

export default function TeacherStudentsPage() {
  const { users, loading, fromApi } = useUsers("Student");
  const me = getStoredUser();

  return (
    <DashboardLayout
      sidebarItems={teacherSidebarItems}
      title="Students"
      sidebarTitle="Teacher Portal"
      userName={me?.fullName ?? "Teacher"}
    >
      <div className="mb-4">
        <ApiDataBadge fromApi={fromApi} />
      </div>
      <Card className="rounded-xl">
        <CardHeader>
          <CardTitle>Student List ({users.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-left text-muted-foreground">
                    <th className="pb-3 pr-4">Student</th>
                    <th className="pb-3 pr-4">Email</th>
                    <th className="pb-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((s) => (
                    <tr key={s.id} className="border-b last:border-0">
                      <td className="py-4 pr-4">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${s.name}`} />
                            <AvatarFallback>{s.name[0]}</AvatarFallback>
                          </Avatar>
                          <p className="font-medium">{s.name}</p>
                        </div>
                      </td>
                      <td className="py-4 pr-4 text-muted-foreground">{s.email}</td>
                      <td className="py-4">
                        <Button variant="outline" size="sm" className="rounded-xl">
                          View Results
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
