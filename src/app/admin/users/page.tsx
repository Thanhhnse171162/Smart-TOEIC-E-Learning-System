"use client";

import { useState } from "react";
import { Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { ApiDataBadge } from "@/components/api-data-badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { useUsers } from "@/hooks/use-users";
import { getStoredUser } from "@/lib/auth/session";
import type { User } from "@/layers/domain/types";

export default function AdminUsersPage() {
  const { users: allUsers, loading, fromApi, updateStatus } = useUsers({ excludeAdmin: true });
  const me = getStoredUser();

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [editStatus, setEditStatus] = useState<"active" | "inactive">("active");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const itemsPerPage = 5;
  const filtered = allUsers.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );
  const totalPages = Math.max(1, Math.ceil(filtered.length / itemsPerPage));
  const users = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const openEdit = (user: User) => {
    setEditingUser(user);
    setEditStatus(user.isActive !== false ? "active" : "inactive");
    setError(null);
  };

  const handleSave = async () => {
    if (!editingUser) return;
    setSaving(true);
    setError(null);
    try {
      await updateStatus(editingUser.id, editStatus === "active");
      setEditingUser(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to update status");
    } finally {
      setSaving(false);
    }
  };

  return (
    <DashboardLayout
      sidebarItems={adminSidebarItems}
      title="User Management"
      sidebarTitle="Admin Panel"
      userName={me?.fullName ?? "Admin"}
    >
      <div className="mb-6 flex items-center gap-3">
        <Input
          placeholder="Search users..."
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
          <CardTitle>All Users ({filtered.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left text-muted-foreground">
                  <th className="pb-3">User</th>
                  <th className="pb-3">Role</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3">Joined</th>
                  <th className="pb-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id} className="border-b last:border-0">
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={u.avatar ?? `https://api.dicebear.com/7.x/avataaars/svg?seed=${u.name}`} />
                          <AvatarFallback>{u.name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{u.name}</p>
                          <p className="text-xs text-muted-foreground">{u.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4">
                      <Badge variant="outline" className="capitalize">{u.role}</Badge>
                    </td>
                    <td className="py-4">
                      <Badge variant={u.isActive !== false ? "default" : "secondary"}>
                        {u.isActive !== false ? "Active" : "Inactive"}
                      </Badge>
                    </td>
                    <td className="py-4 text-muted-foreground">
                      {new Date(u.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-4">
                      <Button
                        variant="outline"
                        size="sm"
                        className="rounded-xl"
                        onClick={() => openEdit(u)}
                      >
                        Edit
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {!loading && totalPages > 1 && (
            <div className="flex items-center justify-between pt-6 border-t mt-4">
              <span className="text-sm font-semibold text-slate-500">
                Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
                {Math.min(currentPage * itemsPerPage, filtered.length)} of {filtered.length} entries
              </span>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="h-9 w-9 p-0 rounded-lg"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(page)}
                    className="h-9 w-9 p-0 rounded-lg"
                  >
                    {page}
                  </Button>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
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

      <Dialog open={!!editingUser} onOpenChange={(open) => !open && setEditingUser(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit User Status</DialogTitle>
          </DialogHeader>
          {editingUser && (
            <div className="space-y-4">
              <div className="rounded-xl bg-muted p-3 text-sm">
                <p className="font-medium">{editingUser.name}</p>
                <p className="text-muted-foreground">{editingUser.email}</p>
              </div>
              <div className="space-y-2">
                <Label>Status</Label>
                <Select value={editStatus} onValueChange={(v) => setEditStatus(v as "active" | "inactive")}>
                  <SelectTrigger className="rounded-xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {error && <p className="text-sm text-destructive">{error}</p>}
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" className="rounded-xl" onClick={() => setEditingUser(null)}>
              Cancel
            </Button>
            <Button className="rounded-xl" onClick={handleSave} disabled={saving}>
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
