"use client";

import { Loader2 } from "lucide-react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { ApiDataBadge } from "@/components/api-data-badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { adminSidebarItems } from "@/lib/navigation";
import { useUsers } from "@/hooks/use-users";
import { getStoredUser } from "@/lib/auth/session";

export default function AdminUsersPage() {
  const { users, loading, fromApi } = useUsers();
  const me = getStoredUser();

  return (
    <DashboardLayout
      sidebarItems={adminSidebarItems}
      title="User Management"
      sidebarTitle="Admin Panel"
      userName={me?.fullName ?? "Admin"}
    >
      <div className="mb-6 flex items-center gap-3">
        <Input placeholder="Search users..." className="max-w-sm rounded-xl" />
        <ApiDataBadge fromApi={fromApi} />
      </div>
      <Card className="rounded-xl">
        <CardHeader>
          <CardTitle>All Users ({users.length})</CardTitle>
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
                      <Badge>Active</Badge>
                    </td>
                    <td className="py-4 text-muted-foreground">
                      {new Date(u.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-4">
                      <Button variant="outline" size="sm" className="rounded-xl">
                        Edit
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
