"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/theme-toggle";
import { teacherSidebarItems } from "@/lib/navigation";
import { User, Pencil, Phone, Mail } from "lucide-react";

export default function TeacherSettingsPage() {
  return (
    <DashboardLayout sidebarItems={teacherSidebarItems} title="Settings" subtitle="Manage your teacher profile">
      <div className="max-w-3xl space-y-6">
        
        {/* Profile Settings */}
        <Card className="rounded-xl border-slate-200 dark:border-slate-800 shadow-sm">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                <User className="w-5 h-5 text-slate-600 dark:text-slate-400" />
              </div>
              <div>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Update your personal details and contact information.</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <Label>Full Name</Label>
                <div className="relative">
                  <Input defaultValue="Teacher Account" className="rounded-xl h-11 border-slate-200 pr-10 focus:border-[#4b6cb7]" />
                  <Pencil className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Phone Number</Label>
                <div className="relative">
                  <Input defaultValue="+84 123 456 789" className="rounded-xl h-11 border-slate-200 pr-10 focus:border-[#4b6cb7]" />
                  <Phone className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Email Address</Label>
              <div className="relative">
                <Input defaultValue="teacher@smarttoeic.com" readOnly className="rounded-xl h-11 border-slate-200 bg-slate-50 dark:bg-slate-800 text-slate-500 cursor-not-allowed pl-10" />
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              </div>
              <p className="text-xs text-slate-400">Email changes require admin verification.</p>
            </div>
            <div className="pt-2 flex justify-end">
              <Button className="rounded-xl bg-[#4b6cb7] hover:bg-[#3b5b9c] text-white font-bold h-10 px-6 shadow-md">
                Save Changes
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Appearance */}
        <Card className="rounded-xl border-slate-200 dark:border-slate-800 shadow-sm">
          <CardHeader>
            <CardTitle>Appearance</CardTitle>
            <CardDescription>Customize the look and feel of your dashboard.</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-between">
            <Label className="text-base font-medium">Dark Mode</Label>
            <ThemeToggle />
          </CardContent>
        </Card>

      </div>
    </DashboardLayout>
  );
}
