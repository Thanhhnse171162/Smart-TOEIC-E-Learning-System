"use client";

import { useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Download } from "lucide-react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
  getCourseEngagementData,
  getMonthLabel,
  getRevenueData,
  getTestPerformanceData,
  getUserActivityData,
  REPORT_MONTHS,
  REPORT_YEARS,
} from "@/lib/admin-reports-data";

function PeriodSelectors({
  month,
  year,
  onMonthChange,
  onYearChange,
}: {
  month: number;
  year: number;
  onMonthChange: (m: number) => void;
  onYearChange: (y: number) => void;
}) {
  return (
    <div className="flex items-center gap-2">
      <Select value={String(month)} onValueChange={(v) => onMonthChange(Number(v))}>
        <SelectTrigger className="w-[120px] h-8 rounded-lg text-xs">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {REPORT_MONTHS.map((m) => (
            <SelectItem key={m.value} value={String(m.value)}>
              {m.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select value={String(year)} onValueChange={(v) => onYearChange(Number(v))}>
        <SelectTrigger className="w-[88px] h-8 rounded-lg text-xs">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {REPORT_YEARS.map((y) => (
            <SelectItem key={y} value={String(y)}>
              {y}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export default function AdminReportsPage() {
  const [month, setMonth] = useState(5);
  const [year, setYear] = useState(2024);

  const periodLabel = `${getMonthLabel(month)} ${year}`;

  const userActivityData = useMemo(() => getUserActivityData(year, month), [year, month]);
  const revenueData = useMemo(() => getRevenueData(year, month), [year, month]);
  const testPerformanceData = useMemo(() => getTestPerformanceData(year, month), [year, month]);
  const courseEngagementData = useMemo(() => getCourseEngagementData(year, month), [year, month]);

  const periodProps = { month, year, onMonthChange: setMonth, onYearChange: setYear };

  return (
    <DashboardLayout
      sidebarItems={adminSidebarItems}
      title="Reports"
      sidebarTitle="Admin Panel"
      userName="Admin"
    >
      <div className="grid gap-6 md:grid-cols-2 pb-8">
        {/* Line chart — User Activity */}
        <Card className="rounded-xl">
          <CardHeader className="flex flex-col gap-3 space-y-0">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <CardTitle className="text-base">Monthly User Activity</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">{periodLabel}</p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <PeriodSelectors {...periodProps} />
                <Badge variant="outline">Users</Badge>
                <Button variant="outline" size="sm" className="rounded-xl gap-1.5">
                  <Download className="h-3.5 w-3.5" /> PDF
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={userActivityData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="active"
                  name="Active Users"
                  stroke="#2563eb"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="newUsers"
                  name="New Signups"
                  stroke="#7c3aed"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Bar chart — Revenue */}
        <Card className="rounded-xl">
          <CardHeader className="flex flex-col gap-3 space-y-0">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <CardTitle className="text-base">Revenue Summary</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">{periodLabel} · Weekly breakdown</p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <PeriodSelectors {...periodProps} />
                <Badge variant="outline">Finance</Badge>
                <Button variant="outline" size="sm" className="rounded-xl gap-1.5">
                  <Download className="h-3.5 w-3.5" /> PDF
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip
                  formatter={(v: number, name: string) =>
                    name === "revenue" ? [`$${v.toLocaleString()}`, "Revenue"] : [v, "Subscriptions"]
                  }
                />
                <Legend />
                <Bar dataKey="revenue" name="Revenue ($)" fill="#2563eb" radius={[6, 6, 0, 0]} />
                <Bar dataKey="subscriptions" name="Subscriptions" fill="#0891b2" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Pie chart — Test Performance */}
        <Card className="rounded-xl">
          <CardHeader className="flex flex-col gap-3 space-y-0">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <CardTitle className="text-base">Test Performance Analysis</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">{periodLabel} · Score distribution</p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <PeriodSelectors {...periodProps} />
                <Badge variant="outline">Tests</Badge>
                <Button variant="outline" size="sm" className="rounded-xl gap-1.5">
                  <Download className="h-3.5 w-3.5" /> PDF
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={240}>
              <PieChart margin={{ top: 8, right: 8, bottom: 8, left: 8 }}>
                <Pie
                  data={testPerformanceData}
                  dataKey="value"
                  nameKey="name"
                  cx="38%"
                  cy="50%"
                  innerRadius={48}
                  outerRadius={72}
                  paddingAngle={3}
                >
                  {testPerformanceData.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(v: number) => [`${v}%`, "Share"]} />
                <Legend
                  layout="vertical"
                  align="right"
                  verticalAlign="middle"
                  iconType="circle"
                  iconSize={8}
                  formatter={(value) => {
                    const item = testPerformanceData.find((d) => d.name === value);
                    return `${value} — ${item?.value}%`;
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Bar chart — Course Engagement */}
        <Card className="rounded-xl">
          <CardHeader className="flex flex-col gap-3 space-y-0">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <CardTitle className="text-base">Course Engagement Report</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">{periodLabel} · Completion rate (%)</p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <PeriodSelectors {...periodProps} />
                <Badge variant="outline">Courses</Badge>
                <Button variant="outline" size="sm" className="rounded-xl gap-1.5">
                  <Download className="h-3.5 w-3.5" /> PDF
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={courseEngagementData} layout="vertical" margin={{ left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis type="number" domain={[0, 100]} unit="%" />
                <YAxis type="category" dataKey="course" width={120} tick={{ fontSize: 11 }} />
                <Tooltip
                  formatter={(v: number, name: string) =>
                    name === "completion" ? [`${v}%`, "Completion"] : [v.toLocaleString(), "Enrollments"]
                  }
                />
                <Legend />
                <Bar dataKey="completion" name="Completion %" fill="#059669" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
