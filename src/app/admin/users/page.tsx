import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { adminSidebarItems } from "@/lib/navigation";

const users = [
  { name: "Nguyen Van A", email: "student@toeic.com", role: "Student", status: "Active", joined: "2024-01-15" },
  { name: "Tran Thi B", email: "teacher@toeic.com", role: "Teacher", status: "Active", joined: "2024-01-10" },
  { name: "Admin User", email: "admin@toeic.com", role: "Admin", status: "Active", joined: "2024-01-01" },
  { name: "Le Van C", email: "lec@toeic.com", role: "Student", status: "Inactive", joined: "2024-02-20" },
];

export default function AdminUsersPage() {
  return (
     <DashboardLayout sidebarItems={adminSidebarItems} title="User Management" sidebarTitle="Admin Panel" userName="Admin">
    <div className="mb-6"><Input placeholder="Search users..." className="max-w-sm rounded-xl" /></div>
    <Card className="rounded-xl">
      <CardHeader><CardTitle>All Users</CardTitle></CardHeader>
      <CardContent>
        <table className="w-full text-sm">
          <thead><tr className="border-b text-left text-muted-foreground">
            <th className="pb-3">User</th><th className="pb-3">Role</th><th className="pb-3">Status</th><th className="pb-3">Joined</th><th className="pb-3">Actions</th>
          </tr></thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.email} className="border-b last:border-0">
                <td className="py-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8"><AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${u.name}`} /><AvatarFallback>{u.name[0]}</AvatarFallback></Avatar>
                    <div><p className="font-medium">{u.name}</p><p className="text-xs text-muted-foreground">{u.email}</p></div>
                  </div>
                </td>
                <td className="py-4"><Badge variant="outline">{u.role}</Badge></td>
                <td className="py-4"><Badge variant={u.status === "Active" ? "default" : "secondary"}>{u.status}</Badge></td>
                <td className="py-4 text-muted-foreground">{u.joined}</td>
                <td className="py-4"><Button variant="outline" size="sm" className="rounded-xl">Edit</Button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  </DashboardLayout>
  );
}
