"use client";

import { useState } from "react";
import { BookOpen, Loader2, Users, PlayCircle, Trophy, Target, Search, Award, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { ApiDataBadge } from "@/components/api-data-badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { studentSidebarItems } from "@/lib/navigation";
import { useCourses } from "@/hooks/use-courses";
import { getStoredUser } from "@/lib/auth/session";

export default function CoursesPage() {
  const { courses: allCourses, loading, fromApi } = useCourses();
  const user = getStoredUser();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const totalPages = Math.ceil(allCourses.length / itemsPerPage);
  const courses = allCourses.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <DashboardLayout
      sidebarItems={studentSidebarItems}
      title="Courses"
      subtitle="Continue your learning"
      userName={user?.fullName ?? "Student"}
    >
      <div className="mb-4 flex items-center gap-2">
        <ApiDataBadge fromApi={fromApi} />
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : courses.length === 0 ? (
        <Card className="rounded-xl p-8 text-center text-muted-foreground">
          No courses in database yet. Add courses via Teacher/Admin API.
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {courses.map((c) => (
            <Card key={c.id} className="rounded-xl hover:shadow-md transition-shadow">
              <div className="h-32 rounded-t-xl bg-gradient-to-br from-brand-100 to-brand-200 dark:from-brand-900/30 dark:to-brand-800/20 flex items-center justify-center">
                <BookOpen className="h-12 w-12 text-primary" />
              </div>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge variant="secondary" className="capitalize">{c.level}</Badge>
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    {c.studentsCount}
                  </span>
                </div>
                <CardTitle className="text-lg">{c.title}</CardTitle>
                <CardDescription>{c.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <div className="flex justify-between text-xs mb-1">
                    <span>{c.lessonsCount} lessons</span>
                    <span>0%</span>
                  </div>
                  <Progress value={0} className="h-2" />
                </div>
                <Button className="w-full rounded-xl">Continue Learning</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Pagination */}
      {!loading && totalPages > 1 && (
        <div className="flex items-center justify-between pt-8">
          <span className="text-sm font-semibold text-slate-500">
            Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, allCourses.length)} of {allCourses.length} entries
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
    </DashboardLayout>
  );
}
