import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { studentSidebarItems } from "@/lib/navigation";

export default function ProfilePage() {
  return (
    <DashboardLayout sidebarItems={studentSidebarItems} title="Profile" subtitle="Manage your account">
      <div className="max-w-2xl space-y-6">
        <Card className="rounded-xl">
          <CardContent className="pt-6 flex items-center gap-6">
            <Avatar className="h-20 w-20">
              <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=student" />
              <AvatarFallback>NA</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-xl font-bold">Nguyen Van A</h2>
              <p className="text-muted-foreground">student@toeic.com</p>
              <Badge className="mt-2">Pro Learner</Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-xl">
          <CardHeader><CardTitle>Personal Information</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2"><Label>Full Name</Label><Input defaultValue="Nguyen Van A" className="rounded-xl" /></div>
              <div className="space-y-2"><Label>Email</Label><Input defaultValue="student@toeic.com" className="rounded-xl" /></div>
              <div className="space-y-2"><Label>Target Score</Label><Input defaultValue="850" className="rounded-xl" /></div>
              <div className="space-y-2"><Label>Exam Date</Label><Input type="date" defaultValue="2024-08-15" className="rounded-xl" /></div>
            </div>
            <Button className="rounded-xl">Save Changes</Button>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
