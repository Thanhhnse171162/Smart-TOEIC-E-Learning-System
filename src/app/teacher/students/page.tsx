"use client";

import { useState } from "react";
import { Loader2, ChevronLeft, ChevronRight } from "lucide-react";
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
  const { users: allUsers, loading, fromApi } = useUsers({ role: "Student" });
  const me = getStoredUser();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(allUsers.length / itemsPerPage);
  const users = allUsers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

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
          <CardTitle>Student List ({allUsers.length})</CardTitle>
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

          {/* Pagination */}
          {!loading && totalPages > 1 && (
            <div className="flex items-center justify-between pt-6 border-t mt-4">
              <span className="text-sm font-semibold text-slate-500">
                Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, allUsers.length)} of {allUsers.length} entries
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
                    className={`h-9 w-9 p-0 rounded-lg font-bold ${currentPage === page ? 'bg-primary text-primary-foreground shadow-sm' : 'border-slate-200 text-slate-600'}`}
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
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
