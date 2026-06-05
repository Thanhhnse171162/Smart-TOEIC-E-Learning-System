"use client";

import { useState } from "react";
import { Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { ApiDataBadge } from "@/components/api-data-badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { adminSidebarItems } from "@/lib/navigation";
import { useAdminCourses, type AdminCourse } from "@/hooks/use-admin-courses";
import { getStoredUser } from "@/lib/auth/session";

export default function AdminCoursesPage() {
  const { courses: allCourses, loading, fromApi, updateCourse } = useAdminCourses();
  const me = getStoredUser();

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [managing, setManaging] = useState<AdminCourse | null>(null);
  const [form, setForm] = useState({
    title: "",
    description: "",
    level: "intermediate",
    price: "",
    status: "Active" as "Active" | "Inactive",
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const itemsPerPage = 5;
  const filtered = allCourses.filter(
    (c) =>
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.description.toLowerCase().includes(search.toLowerCase())
  );
  const totalPages = Math.max(1, Math.ceil(filtered.length / itemsPerPage));
  const courses = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const openManage = (course: AdminCourse) => {
    setManaging(course);
    setForm({
      title: course.title,
      description: course.description,
      level: course.level,
      price: String(course.price),
      status: course.status,
    });
    setError(null);
  };

  const handleSave = async () => {
    if (!managing) return;
    setSaving(true);
    setError(null);
    try {
      await updateCourse(managing.id, {
        title: form.title,
        description: form.description,
        level: form.level,
        price: Number(form.price) || 0,
        status: form.status,
      });
      setManaging(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to update course");
    } finally {
      setSaving(false);
    }
  };

  const formatRevenue = (students: number, price: number) =>
    `$${(students * price).toLocaleString()}`;

  return (
    <DashboardLayout
      sidebarItems={adminSidebarItems}
      title="Course Management"
      sidebarTitle="Admin Panel"
      userName={me?.fullName ?? "Admin"}
    >
      <div className="mb-6 flex items-center gap-3">
        <Input
          placeholder="Search courses..."
          className="max-w-sm rounded-xl"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
        />
        <ApiDataBadge fromApi={fromApi} />
      </div>

      <Card className="rounded-xl">
        <CardHeader>
          <CardTitle>All Courses ({filtered.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : filtered.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">No courses found.</p>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b text-left text-muted-foreground">
                      <th className="pb-3 pr-4">Course</th>
                      <th className="pb-3 pr-4">Level</th>
                      <th className="pb-3 pr-4">Students</th>
                      <th className="pb-3 pr-4">Price</th>
                      <th className="pb-3 pr-4">Revenue</th>
                      <th className="pb-3 pr-4">Status</th>
                      <th className="pb-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {courses.map((c) => (
                      <tr key={c.id} className="border-b last:border-0">
                        <td className="py-4 pr-4">
                          <p className="font-medium">{c.title}</p>
                          <p className="text-xs text-muted-foreground line-clamp-1">{c.description}</p>
                        </td>
                        <td className="py-4 pr-4">
                          <Badge variant="outline" className="capitalize">{c.level}</Badge>
                        </td>
                        <td className="py-4 pr-4">{c.studentsCount.toLocaleString()}</td>
                        <td className="py-4 pr-4">${c.price}</td>
                        <td className="py-4 pr-4 font-medium">
                          {formatRevenue(c.studentsCount, c.price)}
                        </td>
                        <td className="py-4 pr-4">
                          <Badge variant={c.status === "Active" ? "default" : "secondary"}>
                            {c.status}
                          </Badge>
                        </td>
                        <td className="py-4">
                          <Button
                            variant="outline"
                            size="sm"
                            className="rounded-xl"
                            onClick={() => openManage(c)}
                          >
                            Manage
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {totalPages > 1 && (
                <div className="flex items-center justify-between pt-6 border-t mt-4">
                  <span className="text-sm text-muted-foreground">
                    Showing {(currentPage - 1) * itemsPerPage + 1}–
                    {Math.min(currentPage * itemsPerPage, filtered.length)} of {filtered.length}
                  </span>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 rounded-lg"
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage((p) => p - 1)}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <Button
                        key={page}
                        variant={currentPage === page ? "default" : "outline"}
                        size="sm"
                        className="h-8 w-8 rounded-lg"
                        onClick={() => setCurrentPage(page)}
                      >
                        {page}
                      </Button>
                    ))}
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 rounded-lg"
                      disabled={currentPage === totalPages}
                      onClick={() => setCurrentPage((p) => p + 1)}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>

      <Dialog open={!!managing} onOpenChange={(open) => !open && setManaging(null)}>
        <DialogContent className="max-w-lg rounded-2xl">
          <DialogHeader>
            <DialogTitle>Manage Course</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Title</Label>
              <Input
                className="rounded-xl"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea
                className="rounded-xl"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Level</Label>
                <Select value={form.level} onValueChange={(v) => setForm({ ...form, level: v })}>
                  <SelectTrigger className="rounded-xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Price ($)</Label>
                <Input
                  type="number"
                  className="rounded-xl"
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Status</Label>
              <Select
                value={form.status}
                onValueChange={(v) => setForm({ ...form, status: v as "Active" | "Inactive" })}
              >
                <SelectTrigger className="rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
          </div>
          <DialogFooter>
            <Button variant="outline" className="rounded-xl" onClick={() => setManaging(null)}>
              Cancel
            </Button>
            <Button className="rounded-xl" onClick={handleSave} disabled={saving}>
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save Changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
