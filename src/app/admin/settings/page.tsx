"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ThemeToggle } from "@/components/theme-toggle";
import { adminSidebarItems } from "@/lib/navigation";

export default function AdminSettingsPage() {
  return (
    <DashboardLayout sidebarItems={adminSidebarItems} title="Settings" sidebarTitle="Admin Panel" userName="Admin">
      <div className="max-w-2xl space-y-6">
        <Card className="rounded-xl">
          <CardHeader><CardTitle>General Settings</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2"><Label>Platform Name</Label><Input defaultValue="SmartTOEIC" className="rounded-xl" /></div>
            <div className="space-y-2"><Label>Support Email</Label><Input defaultValue="support@toeicmaster.com" className="rounded-xl" /></div>
            <Button className="rounded-xl">Save</Button>
          </CardContent>
        </Card>
        <Card className="rounded-xl">
          <CardHeader><CardTitle>Appearance</CardTitle><CardDescription>Toggle dark mode</CardDescription></CardHeader>
          <CardContent className="flex justify-between items-center"><Label>Dark Mode</Label><ThemeToggle /></CardContent>
        </Card>
        <Card className="rounded-xl">
          <CardHeader><CardTitle>System</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            {["Enable user registration", "Require email verification", "Enable maintenance mode"].map((s) => (
              <div key={s} className="flex items-center gap-3"><Checkbox id={s} defaultChecked={s !== "Enable maintenance mode"} /><Label htmlFor={s} className="font-normal">{s}</Label></div>
            ))}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
