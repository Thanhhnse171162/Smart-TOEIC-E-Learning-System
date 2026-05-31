"use client";

import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { BookOpen, ClipboardList, DollarSign, Users } from "lucide-react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { adminSidebarItems } from "@/lib/navigation";

const stats = [
  { label: "Total Users", value: "15,420", icon: Users },
  { label: "Active Students", value: "8,934", icon: BookOpen },
  { label: "Total Revenue", value: "$284,500", icon: DollarSign },
  { label: "Total Tests", value: "45,678", icon: ClipboardList },
];

const userGrowth = [
  { month: "Jan", users: 8500 }, { month: "Feb", users: 9200 }, { month: "Mar", users: 10500 },
  { month: "Apr", users: 12100 }, { month: "May", users: 13800 }, { month: "Jun", users: 15420 },
];

const revenueData = [
  { month: "Jan", revenue: 32000 }, { month: "Feb", revenue: 38500 }, { month: "Mar", revenue: 42000 },
  { month: "Apr", revenue: 48000 }, { month: "May", revenue: 55000 }, { month: "Jun", revenue: 69000 },
];

export default function AdminDashboardPage() {
  return (
    <DashboardLayout sidebarItems={adminSidebarItems} title="Admin Dashboard" subtitle="System Overview" sidebarTitle="Admin Panel" userName="Admin">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4 mb-6">
        {stats.map((s) => (
          <Card key={s.label} className="rounded-xl">
            <CardContent className="pt-6 flex items-center gap-4">
              <div className="rounded-xl bg-primary/10 p-3"><s.icon className="h-5 w-5 text-primary" /></div>
              <div>
                <p className="text-sm text-muted-foreground">{s.label}</p>
                <p className="text-2xl font-bold">{s.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2 mb-6">
        <Card className="rounded-xl">
          <CardHeader><CardTitle>User Growth</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={userGrowth}>
                <CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="month" /><YAxis /><Tooltip />
                <Line type="monotone" dataKey="users" stroke="#2563eb" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card className="rounded-xl">
          <CardHeader><CardTitle>Revenue Statistics</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="month" /><YAxis /><Tooltip />
                <Bar dataKey="revenue" fill="#2563eb" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="rounded-xl">
          <CardHeader><CardTitle>Recent Users</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {["Nguyen Van A", "Tran Thi B", "Le Van C"].map((name) => (
              <div key={name} className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`} />
                  <AvatarFallback>{name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1"><p className="text-sm font-medium">{name}</p><p className="text-xs text-muted-foreground">Joined recently</p></div>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card className="rounded-xl">
          <CardHeader><CardTitle>Recent Payments</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {[
              { user: "Nguyen Van A", amount: "$29", plan: "Pro" },
              { user: "Tran Thi B", amount: "$29", plan: "Pro" },
              { user: "Le Van C", amount: "$19", plan: "Team" },
            ].map((p) => (
              <div key={p.user} className="flex justify-between items-center text-sm">
                <span>{p.user}</span>
                <div className="flex items-center gap-2"><Badge variant="secondary">{p.plan}</Badge><span className="font-medium">{p.amount}</span></div>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card className="rounded-xl">
          <CardHeader><CardTitle>Popular Courses</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {[
              { title: "Business English", students: 2100 },
              { title: "Listening Mastery", students: 1250 },
              { title: "Reading Strategies", students: 980 },
            ].map((c) => (
              <div key={c.title} className="flex justify-between text-sm">
                <span>{c.title}</span>
                <Badge>{c.students} students</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
