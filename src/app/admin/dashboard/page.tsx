"use client";

import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";
import { DollarSign, Users, ArrowUpRight, Building2, CreditCard, Activity, ArrowDownRight, MoreVertical } from "lucide-react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { adminSidebarItems } from "@/lib/navigation";
import { Button } from "@/components/ui/button";

// Mock Data
const stats = [
  { label: "Total Revenue", value: "$284,500", icon: DollarSign, trend: "+12.5%", up: true, bg: "bg-gradient-to-br from-slate-900 to-slate-800", text: "text-white", iconBg: "bg-white/20" },
  { label: "Total Users", value: "15,420", icon: Users, trend: "+8.2%", up: true, bg: "bg-white", text: "text-slate-800", iconBg: "bg-indigo-50 text-indigo-600" },
  { label: "Active Subscriptions", value: "8,934", icon: CreditCard, trend: "-2.1%", up: false, bg: "bg-white", text: "text-slate-800", iconBg: "bg-rose-50 text-rose-600" },
  { label: "Partner Centers", value: "45", icon: Building2, trend: "+5", up: true, bg: "bg-white", text: "text-slate-800", iconBg: "bg-emerald-50 text-emerald-600" },
];

const chartData = [
  { month: "Jan", revenue: 32000, users: 8500 }, { month: "Feb", revenue: 38500, users: 9200 }, { month: "Mar", revenue: 42000, users: 10500 },
  { month: "Apr", revenue: 48000, users: 12100 }, { month: "May", revenue: 55000, users: 13800 }, { month: "Jun", revenue: 69000, users: 15420 },
];

const recentTransactions = [
  { id: "TRX-001", user: "Nguyen Van A", email: "nguyenvana@gmail.com", amount: "$199", date: "2 mins ago", status: "Completed" },
  { id: "TRX-002", user: "Tran Thi B", email: "tranthib@gmail.com", amount: "$49", date: "15 mins ago", status: "Completed" },
  { id: "TRX-003", user: "Le Hoang C", email: "lehoangc@gmail.com", amount: "$99", date: "1 hour ago", status: "Failed" },
  { id: "TRX-004", user: "Language Center XYZ", email: "contact@xyz.edu", amount: "$1,499", date: "3 hours ago", status: "Completed" },
];

export default function AdminDashboardPage() {
  return (
    <DashboardLayout sidebarItems={adminSidebarItems} title="System Overview" subtitle="High-level metrics and platform management" sidebarTitle="Admin Center" userName="Super Admin">
      <div className="max-w-[1400px] mx-auto pb-10 space-y-6">
        
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={idx} className={`${stat.bg} rounded-3xl p-6 border ${stat.bg === 'bg-white' ? 'border-slate-100 shadow-sm' : 'border-transparent shadow-md'}`}>
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.iconBg}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className={`inline-flex items-center gap-1 text-[12px] font-bold px-2.5 py-1 rounded-full ${stat.bg === 'bg-white' ? (stat.up ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600') : 'bg-white/20 text-white'}`}>
                    {stat.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                    {stat.trend}
                  </span>
                </div>
                <div>
                  <p className={`text-3xl font-black ${stat.text} tracking-tight`}>{stat.value}</p>
                  <p className={`text-sm font-semibold mt-1 ${stat.bg === 'bg-white' ? 'text-slate-500' : 'text-slate-300'} uppercase tracking-wider`}>{stat.label}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Charts Section */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Revenue Chart */}
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm lg:col-span-2 overflow-hidden flex flex-col">
            <div className="p-6 border-b border-slate-50 flex items-center justify-between">
              <div>
                <h3 className="font-extrabold text-lg text-slate-800">Revenue Growth</h3>
                <p className="text-xs font-semibold text-slate-500 mt-0.5">Monthly revenue for the last 6 months</p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" className="h-8 px-3 rounded-lg text-xs font-bold border-slate-200">Export Report</Button>
              </div>
            </div>
            <div className="p-6 flex-1 min-h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#94a3b8', fontWeight: 600 }} axisLine={false} tickLine={false} dy={10} />
                  <YAxis tick={{ fontSize: 12, fill: '#94a3b8', fontWeight: 600 }} axisLine={false} tickLine={false} tickFormatter={(value) => `$${value/1000}k`} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)', fontWeight: 600 }} 
                    formatter={(value: number) => [`$${value.toLocaleString()}`, 'Revenue']}
                  />
                  <Area type="monotone" dataKey="revenue" stroke="#4f46e5" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* User Acquisition Bar Chart */}
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm flex flex-col">
            <div className="p-6 border-b border-slate-50">
              <h3 className="font-extrabold text-lg text-slate-800">User Acquisition</h3>
              <p className="text-xs font-semibold text-slate-500 mt-0.5">New users registered per month</p>
            </div>
            <div className="p-6 flex-1 min-h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#94a3b8', fontWeight: 600 }} axisLine={false} tickLine={false} dy={10} />
                  <YAxis tick={{ fontSize: 12, fill: '#94a3b8', fontWeight: 600 }} axisLine={false} tickLine={false} tickFormatter={(value) => `${value/1000}k`} />
                  <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)', fontWeight: 600 }} />
                  <Bar dataKey="users" fill="#0ea5e9" radius={[6, 6, 0, 0]} barSize={24} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Recent Transactions Table */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-50 flex items-center justify-between bg-slate-50/50">
            <div>
              <h3 className="font-extrabold text-lg text-slate-800">Recent Transactions</h3>
              <p className="text-xs font-semibold text-slate-500 mt-0.5">Real-time payment logs</p>
            </div>
            <Button variant="ghost" className="text-indigo-600 font-bold hover:bg-indigo-50">View All</Button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-100 text-[11px] font-black text-slate-500 uppercase tracking-wider">
                  <th className="p-4 pl-6 font-semibold">Transaction ID</th>
                  <th className="p-4 font-semibold">Customer</th>
                  <th className="p-4 font-semibold">Amount</th>
                  <th className="p-4 font-semibold">Date</th>
                  <th className="p-4 font-semibold">Status</th>
                  <th className="p-4 pr-6 text-right font-semibold">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {recentTransactions.map((trx) => (
                  <tr key={trx.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="p-4 pl-6">
                      <span className="text-[13px] font-bold text-slate-700">{trx.id}</span>
                    </td>
                    <td className="p-4">
                      <p className="font-bold text-[14px] text-slate-800">{trx.user}</p>
                      <p className="text-[12px] font-semibold text-slate-500">{trx.email}</p>
                    </td>
                    <td className="p-4">
                      <span className="text-[14px] font-black text-slate-800">{trx.amount}</span>
                    </td>
                    <td className="p-4">
                      <span className="text-[13px] font-semibold text-slate-500">{trx.date}</span>
                    </td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider ${trx.status === 'Completed' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                        {trx.status}
                      </span>
                    </td>
                    <td className="p-4 pr-6 text-right">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-slate-700">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}
