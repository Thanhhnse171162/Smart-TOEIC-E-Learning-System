"use client";

import { useState } from "react";
import { Loader2, ChevronLeft, ChevronRight, Plus, Trash2 } from "lucide-react";
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
import { useAdminTests, type AdminTest } from "@/hooks/use-admin-tests";
import { getStoredUser } from "@/lib/auth/session";

const EMPTY_FORM = {
  title: "",
  description: "",
  duration: "120",
  totalQuestions: "200",
  testType: "Full",
  status: "Active" as "Active" | "Inactive",
};

export default function AdminTestsPage() {
  const { tests: allTests, loading, fromApi, updateTest, createTest, deleteTest } = useAdminTests();
  const me = getStoredUser();

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [managing, setManaging] = useState<AdminTest | null>(null);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const itemsPerPage = 5;
  const filtered = allTests.filter(
    (t) =>
      t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.testType.toLowerCase().includes(search.toLowerCase())
  );
  const totalPages = Math.max(1, Math.ceil(filtered.length / itemsPerPage));
  const tests = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const openManage = (test: AdminTest) => {
    setManaging(test);
    setForm({
      title: test.title,
      description: test.description,
      duration: String(test.duration),
      totalQuestions: String(test.totalQuestions),
      testType: test.testType,
      status: test.status,
    });
    setError(null);
  };

  const openCreate = () => {
    setCreating(true);
    setForm(EMPTY_FORM);
    setError(null);
  };

  const handleSave = async () => {
    if (!managing) return;
    setSaving(true);
    setError(null);
    try {
      await updateTest(managing.id, {
        title: form.title,
        description: form.description,
        duration: Number(form.duration) || 0,
        totalQuestions: Number(form.totalQuestions) || 0,
        testType: form.testType,
        status: form.status,
      });
      setManaging(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to update test");
    } finally {
      setSaving(false);
    }
  };

  const handleCreate = async () => {
    if (!form.title.trim()) {
      setError("Title is required");
      return;
    }
    setSaving(true);
    setError(null);
    try {
      await createTest(
        {
          title: form.title,
          description: form.description,
          duration: Number(form.duration) || 0,
          totalQuestions: Number(form.totalQuestions) || 0,
          testType: form.testType,
        },
        me?.userId ?? 1
      );
      setCreating(false);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to create test");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (test: AdminTest) => {
    if (!confirm(`Delete "${test.title}"? This cannot be undone.`)) return;
    try {
      await deleteTest(test.id);
      setManaging(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to delete test");
    }
  };

  const TestForm = () => (
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
          <Label>Test Type</Label>
          <Select value={form.testType} onValueChange={(v) => setForm({ ...form, testType: v })}>
            <SelectTrigger className="rounded-xl">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Full">Full</SelectItem>
              <SelectItem value="Listening">Listening</SelectItem>
              <SelectItem value="Reading">Reading</SelectItem>
            </SelectContent>
          </Select>
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
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Duration (minutes)</Label>
          <Input
            type="number"
            className="rounded-xl"
            value={form.duration}
            onChange={(e) => setForm({ ...form, duration: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label>Total Questions</Label>
          <Input
            type="number"
            className="rounded-xl"
            value={form.totalQuestions}
            onChange={(e) => setForm({ ...form, totalQuestions: e.target.value })}
          />
        </div>
      </div>
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );

  return (
    <DashboardLayout
      sidebarItems={adminSidebarItems}
      title="Test Management"
      sidebarTitle="Admin Panel"
      userName={me?.fullName ?? "Admin"}
    >
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Input
            placeholder="Search tests..."
            className="max-w-sm rounded-xl"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
          />
          <ApiDataBadge fromApi={fromApi} />
        </div>
        <Button className="rounded-xl gap-2" onClick={openCreate}>
          <Plus className="h-4 w-4" /> Add Test
        </Button>
      </div>

      <Card className="rounded-xl">
        <CardHeader>
          <CardTitle>All Tests ({filtered.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : filtered.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">No tests found.</p>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b text-left text-muted-foreground">
                      <th className="pb-3 pr-4">Test</th>
                      <th className="pb-3 pr-4">Type</th>
                      <th className="pb-3 pr-4">Duration</th>
                      <th className="pb-3 pr-4">Questions</th>
                      <th className="pb-3 pr-4">Attempts</th>
                      <th className="pb-3 pr-4">Avg Score</th>
                      <th className="pb-3 pr-4">Status</th>
                      <th className="pb-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tests.map((t) => (
                      <tr key={t.id} className="border-b last:border-0">
                        <td className="py-4 pr-4">
                          <p className="font-medium">{t.title}</p>
                          <p className="text-xs text-muted-foreground line-clamp-1">{t.description}</p>
                        </td>
                        <td className="py-4 pr-4">
                          <Badge variant="outline">{t.testType}</Badge>
                        </td>
                        <td className="py-4 pr-4">{t.duration} min</td>
                        <td className="py-4 pr-4">{t.totalQuestions}</td>
                        <td className="py-4 pr-4">{t.attempts.toLocaleString()}</td>
                        <td className="py-4 pr-4">
                          {t.avgScore > 0 ? t.avgScore : "—"}
                        </td>
                        <td className="py-4 pr-4">
                          <Badge variant={t.status === "Active" ? "default" : "secondary"}>
                            {t.status}
                          </Badge>
                        </td>
                        <td className="py-4">
                          <Button
                            variant="outline"
                            size="sm"
                            className="rounded-xl"
                            onClick={() => openManage(t)}
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
            <DialogTitle>Manage Test</DialogTitle>
          </DialogHeader>
          <TestForm />
          <DialogFooter className="flex-col sm:flex-row gap-2">
            <Button
              variant="outline"
              className="rounded-xl text-destructive border-destructive/30 hover:bg-destructive/10 mr-auto"
              onClick={() => managing && handleDelete(managing)}
            >
              <Trash2 className="h-4 w-4 mr-1" /> Delete
            </Button>
            <Button variant="outline" className="rounded-xl" onClick={() => setManaging(null)}>
              Cancel
            </Button>
            <Button className="rounded-xl" onClick={handleSave} disabled={saving}>
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save Changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={creating} onOpenChange={(open) => !open && setCreating(false)}>
        <DialogContent className="max-w-lg rounded-2xl">
          <DialogHeader>
            <DialogTitle>Add New Test</DialogTitle>
          </DialogHeader>
          <TestForm />
          <DialogFooter>
            <Button variant="outline" className="rounded-xl" onClick={() => setCreating(false)}>
              Cancel
            </Button>
            <Button className="rounded-xl" onClick={handleCreate} disabled={saving}>
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : "Create Test"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
