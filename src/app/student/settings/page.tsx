"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ThemeToggle } from "@/components/theme-toggle";
import { studentSidebarItems } from "@/lib/navigation";

export default function SettingsPage() {
  return (
    <DashboardLayout sidebarItems={studentSidebarItems} title="Settings" subtitle="Customize your experience">
      <div className="max-w-2xl space-y-6">
        <Card className="rounded-xl">
          <CardHeader>
            <CardTitle>Appearance</CardTitle>
            <CardDescription>Toggle between light and dark mode</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-between">
            <Label>Dark Mode</Label>
            <ThemeToggle />
          </CardContent>
        </Card>

        <Card className="rounded-xl">
          <CardHeader><CardTitle>Notifications</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            {["Daily study reminders", "Mock test results", "New course updates", "AI assistant tips"].map((n) => (
              <div key={n} className="flex items-center gap-3">
                <Checkbox id={n} defaultChecked />
                <Label htmlFor={n} className="font-normal">{n}</Label>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="rounded-xl">
          <CardHeader><CardTitle>Study Preferences</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            {["Auto-play audio in practice", "Show explanations after answers", "Enable timer in practice mode"].map((p) => (
              <div key={p} className="flex items-center gap-3">
                <Checkbox id={p} defaultChecked={p !== "Enable timer in practice mode"} />
                <Label htmlFor={p} className="font-normal">{p}</Label>
              </div>
            ))}
            <Button className="rounded-xl mt-2">Save Preferences</Button>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
