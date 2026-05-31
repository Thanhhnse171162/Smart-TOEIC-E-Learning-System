"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { adminSidebarItems } from "@/lib/navigation";

const revenueData = [
  { month: "Jan", revenue: 32000, subscriptions: 280 }, { month: "Feb", revenue: 38500, subscriptions: 320 },
  { month: "Mar", revenue: 42000, subscriptions: 350 }, { month: "Apr", revenue: 48000, subscriptions: 410 },
  { month: "May", revenue: 55000, subscriptions: 480 }, { month: "Jun", revenue: 69000, subscriptions: 590 },
];

export default function AdminRevenuePage() {
  return (
    <DashboardLayout sidebarItems={adminSidebarItems} title="Revenue" sidebarTitle="Admin Panel" userName="Admin">
      <div className="grid gap-4 sm:grid-cols-3 mb-6">
        {[
          { label: "Monthly Revenue", value: "$69,000" },
          { label: "Total Revenue", value: "$284,500" },
          { label: "Active Subscriptions", value: "590" },
        ].map((s) => (
          <Card key={s.label} className="rounded-xl">
            <CardContent className="pt-6 text-center">
              <p className="text-3xl font-bold text-primary">{s.value}</p>
              <p className="text-sm text-muted-foreground mt-1">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <Card className="rounded-xl mb-6">
        <CardHeader><CardTitle>Revenue Overview</CardTitle></CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="month" /><YAxis /><Tooltip />
              <Bar dataKey="revenue" fill="#2563eb" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      <Card className="rounded-xl">
        <CardHeader><CardTitle>Recent Transactions</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {[
            { user: "Nguyen Van A", plan: "Pro Learner", amount: "$29", status: "Completed" },
            { user: "Tran Thi B", plan: "Pro Learner", amount: "$29", status: "Completed" },
            { user: "Le Van C", plan: "Team", amount: "$19", status: "Pending" },
          ].map((p) => (
            <div key={p.user} className="flex justify-between items-center rounded-xl border p-3 text-sm">
              <div><p className="font-medium">{p.user}</p><p className="text-xs text-muted-foreground">{p.plan}</p></div>
              <div className="flex items-center gap-3">
                <Badge variant={p.status === "Completed" ? "default" : "secondary"}>{p.status}</Badge>
                <span className="font-bold">{p.amount}</span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
