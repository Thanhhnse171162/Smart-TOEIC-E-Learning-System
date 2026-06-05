"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { ArrowRight, BookOpen, ClipboardList, DollarSign, Users } from "lucide-react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { adminSidebarItems } from "@/lib/navigation";
import {
  REVENUE_BY_PERIOD,
  REVENUE_PERIOD_LABELS,
  USER_GROWTH_BY_PERIOD,
  type RevenuePeriod,
} from "@/lib/admin-revenue-data";

const stats = [
  { label: "Total Users", value: "15,420", icon: Users, href: "/admin/users" },
  { label: "Active Students", value: "8,934", icon: BookOpen, href: "/admin/users" },
  { label: "Total Revenue", value: "$284,500", icon: DollarSign, href: "/admin/revenue" },
  { label: "Total Tests", value: "45,678", icon: ClipboardList, href: "/admin/tests" },
];

const quickNavClass =
  "rounded-xl cursor-pointer transition-all hover:border-primary/40 hover:bg-muted/40 hover:shadow-sm group";

export default function AdminDashboardPage() {
  const router = useRouter();
  const [userPeriod, setUserPeriod] = useState<RevenuePeriod>("month");
  const [revenuePeriod, setRevenuePeriod] = useState<RevenuePeriod>("month");
  const userGrowthData = USER_GROWTH_BY_PERIOD[userPeriod];
  const revenueData = REVENUE_BY_PERIOD[revenuePeriod];

  const revenueTooltipFormatter = useMemo(
    () => (value: number) => [`$${value.toLocaleString()}`, "Revenue"],
    []
  );

  const userTooltipFormatter = useMemo(
    () => (value: number) => [value.toLocaleString(), "Users"],
    []
  );

  return (
    <DashboardLayout sidebarItems={adminSidebarItems} title="Admin Dashboard" subtitle="System Overview" sidebarTitle="Admin Panel" userName="Admin">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4 mb-6">
        {stats.map((s) => (
          <Card
            key={s.label}
            className={quickNavClass}
            onClick={() => router.push(s.href)}
            role="link"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && router.push(s.href)}
          >
            <CardContent className="pt-6 flex items-center gap-4">
              <div className="rounded-xl bg-primary/10 p-3">
                <s.icon className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">{s.label}</p>
                <p className="text-2xl font-bold">{s.value}</p>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2 mb-6">
        <Card
          className={quickNavClass}
          onClick={() => router.push("/admin/reports")}
          role="link"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && router.push("/admin/reports")}
        >
          <CardHeader className="flex flex-row items-center justify-between gap-4 space-y-0">
            <CardTitle className="flex items-center gap-2">
              User Growth
              <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
            </CardTitle>
            <div onClick={(e) => e.stopPropagation()} onKeyDown={(e) => e.stopPropagation()}>
            <Select value={userPeriod} onValueChange={(v) => setUserPeriod(v as RevenuePeriod)}>
              <SelectTrigger className="w-[110px] h-9 rounded-xl text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {(Object.keys(REVENUE_PERIOD_LABELS) as RevenuePeriod[]).map((key) => (
                  <SelectItem key={key} value={key}>
                    {REVENUE_PERIOD_LABELS[key]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={userGrowthData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="label" />
                <YAxis />
                <Tooltip formatter={userTooltipFormatter} />
                <Line type="monotone" dataKey="users" stroke="#2563eb" strokeWidth={2} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card
          className={quickNavClass}
          onClick={() => router.push("/admin/revenue")}
          role="link"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && router.push("/admin/revenue")}
        >
          <CardHeader className="flex flex-row items-center justify-between gap-4 space-y-0">
            <CardTitle className="flex items-center gap-2">
              Revenue Statistics
              <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
            </CardTitle>
            <div onClick={(e) => e.stopPropagation()} onKeyDown={(e) => e.stopPropagation()}>
            <Select value={revenuePeriod} onValueChange={(v) => setRevenuePeriod(v as RevenuePeriod)}>
              <SelectTrigger className="w-[110px] h-9 rounded-xl text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {(Object.keys(REVENUE_PERIOD_LABELS) as RevenuePeriod[]).map((key) => (
                  <SelectItem key={key} value={key}>
                    {REVENUE_PERIOD_LABELS[key]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="label" />
                <YAxis />
                <Tooltip formatter={revenueTooltipFormatter} />
                <Bar dataKey="revenue" fill="#2563eb" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card
          className={quickNavClass}
          onClick={() => router.push("/admin/users")}
          role="link"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && router.push("/admin/users")}
        >
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Recent Users
              <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
            </CardTitle>
          </CardHeader>
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
        <Card
          className={quickNavClass}
          onClick={() => router.push("/admin/revenue")}
          role="link"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && router.push("/admin/revenue")}
        >
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Recent Payments
              <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
            </CardTitle>
          </CardHeader>
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
        <Card
          className={quickNavClass}
          onClick={() => router.push("/admin/courses")}
          role="link"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && router.push("/admin/courses")}
        >
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Popular Courses
              <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
            </CardTitle>
          </CardHeader>
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
