"use client";

import { useMemo, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
  type RevenuePeriod,
} from "@/lib/admin-revenue-data";

type Period = RevenuePeriod;

const SUMMARY_BY_PERIOD: Record<Period, { label: string; value: string }[]> = {
  day: [
    { label: "Today's Revenue", value: "$2,340" },
    { label: "This Week", value: "$17,550" },
    { label: "Active Subscriptions", value: "590" },
  ],
  month: [
    { label: "Monthly Revenue", value: "$69,000" },
    { label: "Total Revenue", value: "$284,500" },
    { label: "Active Subscriptions", value: "590" },
  ],
  year: [
    { label: "Yearly Revenue", value: "$312,000" },
    { label: "Total Revenue", value: "$1,261,500" },
    { label: "Active Subscriptions", value: "590" },
  ],
};

export default function AdminRevenuePage() {
  const [period, setPeriod] = useState<Period>("month");

  const chartData = REVENUE_BY_PERIOD[period];
  const summaryCards = SUMMARY_BY_PERIOD[period];

  const tooltipFormatter = useMemo(
    () => (value: number) => [`$${value.toLocaleString()}`, "Revenue"],
    []
  );

  return (
    <DashboardLayout sidebarItems={adminSidebarItems} title="Revenue" sidebarTitle="Admin Panel" userName="Admin">
      <div className="grid gap-4 sm:grid-cols-3 mb-6">
        {summaryCards.map((s) => (
          <Card key={s.label} className="rounded-xl">
            <CardContent className="pt-6 text-center">
              <p className="text-3xl font-bold text-primary">{s.value}</p>
              <p className="text-sm text-muted-foreground mt-1">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <Card className="rounded-xl mb-6">
        <CardHeader className="flex flex-row items-center justify-between gap-4 space-y-0">
          <CardTitle>Revenue Overview</CardTitle>
          <Select value={period} onValueChange={(v) => setPeriod(v as Period)}>
            <SelectTrigger className="w-[110px] h-9 rounded-xl text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {(Object.keys(REVENUE_PERIOD_LABELS) as Period[]).map((key) => (
                <SelectItem key={key} value={key}>
                  {REVENUE_PERIOD_LABELS[key]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="label" />
              <YAxis />
              <Tooltip formatter={tooltipFormatter} />
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
