"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { studentSidebarItems } from "@/lib/navigation";
import {
  User, Mail, Phone, Pencil, BookOpen, Trophy, CheckCircle2,
  ChevronRight, Shield, CreditCard, Lock, AlertTriangle,
  X, Upload, Award, Camera, Flame, Info
} from "lucide-react";

/* ================================================================
   APPLY TO BE TEACHER MODAL
   ================================================================ */
function ApplyTeacherModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [frontFile, setFrontFile] = useState<File | null>(null);
  const [backFile, setBackFile] = useState<File | null>(null);
  const [credFile, setCredFile] = useState<File | null>(null);
  const frontRef = useRef<HTMLInputElement>(null);
  const backRef = useRef<HTMLInputElement>(null);
  const credRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 transition-opacity" onClick={onClose} />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-[480px] max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200">
          
          {/* Header */}
          <div className="flex items-start justify-between p-6 pb-4">
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Apply to be a Teacher</h2>
              <p className="text-sm text-slate-500 mt-1">Share your expertise and start teaching on SmartTOEIC.</p>
            </div>
            <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors p-1 rounded-lg hover:bg-slate-100">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="border-t border-slate-100 dark:border-slate-800" />

          {/* Form */}
          <div className="p-6 space-y-5">
            {/* Full Name */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Full Name</label>
              <Input
                defaultValue="Minh"
                className="rounded-xl h-12 border-slate-200 bg-slate-50 dark:bg-slate-800 focus:border-[#4b6cb7] focus:ring-[#4b6cb7] font-medium"
              />
            </div>

            {/* Phone Number */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Phone Number</label>
              <Input
                defaultValue="+84 901 234 567"
                className="rounded-xl h-12 border-slate-200 bg-slate-50 dark:bg-slate-800 focus:border-[#4b6cb7] focus:ring-[#4b6cb7] font-medium"
              />
            </div>

            {/* Identity Verification (CCCD) */}
            <div className="space-y-3">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Identity Verification (CCCD)</label>
              <div className="grid grid-cols-2 gap-3">
                {/* Front Side */}
                <div
                  onClick={() => frontRef.current?.click()}
                  className="border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl p-4 flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-[#4b6cb7] hover:bg-[#4b6cb7]/5 transition-all min-h-[120px]"
                >
                  <input ref={frontRef} type="file" accept=".pdf,.jpg,.png" className="hidden" onChange={(e) => setFrontFile(e.target.files?.[0] || null)} />
                  <div className="flex items-center gap-1.5 text-[#4b6cb7] font-semibold text-sm">
                    <CreditCard className="w-4 h-4" />
                    Front Side
                  </div>
                  {frontFile ? (
                    <span className="text-xs text-emerald-600 font-medium truncate max-w-full px-2">{frontFile.name}</span>
                  ) : (
                    <>
                      <Upload className="w-6 h-6 text-slate-300" />
                      <p className="text-[11px] text-slate-400 text-center leading-tight">Click to upload or drag<br />and drop<br />(PDF, JPG, PNG)</p>
                    </>
                  )}
                </div>

                {/* Back Side */}
                <div
                  onClick={() => backRef.current?.click()}
                  className="border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl p-4 flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-[#4b6cb7] hover:bg-[#4b6cb7]/5 transition-all min-h-[120px]"
                >
                  <input ref={backRef} type="file" accept=".pdf,.jpg,.png" className="hidden" onChange={(e) => setBackFile(e.target.files?.[0] || null)} />
                  <div className="flex items-center gap-1.5 text-[#4b6cb7] font-semibold text-sm">
                    <CreditCard className="w-4 h-4" />
                    Back Side
                  </div>
                  {backFile ? (
                    <span className="text-xs text-emerald-600 font-medium truncate max-w-full px-2">{backFile.name}</span>
                  ) : (
                    <>
                      <Upload className="w-6 h-6 text-slate-300" />
                      <p className="text-[11px] text-slate-400 text-center leading-tight">Click to upload or drag<br />and drop<br />(PDF, JPG, PNG)</p>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Expert Credentials */}
            <div className="space-y-3">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Expert Credentials (TOEIC Certificate, Degree, etc.)</label>
              <div
                onClick={() => credRef.current?.click()}
                className="border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl p-6 flex flex-col items-center justify-center gap-2.5 cursor-pointer hover:border-[#4b6cb7] hover:bg-[#4b6cb7]/5 transition-all"
              >
                <input ref={credRef} type="file" accept=".pdf,.jpg,.png" className="hidden" onChange={(e) => setCredFile(e.target.files?.[0] || null)} />
                {credFile ? (
                  <div className="flex items-center gap-2 text-emerald-600">
                    <CheckCircle2 className="w-5 h-5" />
                    <span className="text-sm font-medium">{credFile.name}</span>
                  </div>
                ) : (
                  <>
                    <Upload className="w-7 h-7 text-slate-300" />
                    <p className="text-sm text-slate-500 font-medium">Click to upload or drag and drop</p>
                  </>
                )}
              </div>
              <p className="text-xs text-slate-400">Upload your relevant certificates or degrees in PDF, JPG, or PNG format.</p>
            </div>

            {/* Submit */}
            <Button className="w-full h-12 rounded-xl bg-[#4b6cb7] hover:bg-[#3b5b9c] text-white font-bold text-[15px] shadow-md mt-2">
              Submit Application
            </Button>

            {/* Info Note */}
            <div className="flex items-start gap-2.5 text-xs text-slate-500 bg-slate-50 dark:bg-slate-800 rounded-xl p-3">
              <Info className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
              <span>Your profile will remain a Student account while our Admin team reviews your credentials within 24 hours.</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const MOCK_TRANSACTIONS = [
  { id: 1, title: "TOEIC Intensive Reading", desc: "Online Course", date: "Oct 12, 2023", amount: "$49.00", status: "Success" },
  { id: 2, title: "Full Mock Test Package", desc: "10 Exams", date: "Sep 05, 2023", amount: "$29.00", status: "Success" },
  { id: 3, title: "Business Vocabulary Pack", desc: "E-book & Flashcards", date: "Aug 20, 2023", amount: "$15.00", status: "Success" },
  { id: 4, title: "TOEIC Listening Master", desc: "Online Course", date: "Jul 15, 2023", amount: "$39.00", status: "Success" },
  { id: 5, title: "Grammar Crash Course", desc: "Video Series", date: "Jun 02, 2023", amount: "$25.00", status: "Success" },
  { id: 6, title: "Speaking Practice 1-on-1", desc: "Live Session", date: "May 10, 2023", amount: "$50.00", status: "Success" },
  { id: 7, title: "Advanced Writing Patterns", desc: "E-book", date: "Apr 22, 2023", amount: "$12.00", status: "Success" },
];

/* ================================================================
   PROFILE PAGE
   ================================================================ */
export default function ProfilePage() {
  const [showTeacherModal, setShowTeacherModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [downloadingId, setDownloadingId] = useState<number | null>(null);
  const itemsPerPage = 3;
  
  const totalPages = Math.ceil(MOCK_TRANSACTIONS.length / itemsPerPage);
  const currentTransactions = MOCK_TRANSACTIONS.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleDownloadInvoice = (tx: any) => {
    setDownloadingId(tx.id);
    // Simulate API call to generate and download PDF
    setTimeout(() => {
      setDownloadingId(null);
      alert(`Đã tải xuống thành công Biên lai/Hóa đơn cho khóa học: ${tx.title}`);
    }, 1500);
  };

  return (
    <DashboardLayout sidebarItems={studentSidebarItems} title="Settings" subtitle="Manage your account" userName="Minh">
      <div className="max-w-[1100px] mx-auto pb-10 space-y-6">

        {/* ── Profile Header Card ── */}
        <div className="bg-white dark:bg-card border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm">
          <div className="p-6 sm:p-8 flex flex-col sm:flex-row items-center sm:items-start gap-6">
            {/* Avatar */}
            <div className="relative shrink-0">
              <Avatar className="h-24 w-24 border-4 border-white shadow-lg">
                <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=minh" className="object-cover" />
                <AvatarFallback className="text-2xl font-bold">M</AvatarFallback>
              </Avatar>
              <button className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-[#4b6cb7] text-white flex items-center justify-center shadow-md hover:bg-[#3b5b9c] transition-colors">
                <Camera className="w-4 h-4" />
              </button>
            </div>

            {/* Info */}
            <div className="flex-1 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-3 mb-1">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Minh</h2>
                <Badge className="bg-[#4b6cb7]/10 text-[#4b6cb7] border-none font-semibold text-xs rounded-full px-3 py-0.5 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Student
                </Badge>
              </div>
              <p className="text-sm text-slate-500 font-medium">minh.studying@example.com</p>

              {/* Stats Row */}
              <div className="flex items-center justify-center sm:justify-start gap-6 mt-4">
                <div className="text-center">
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Total Courses</p>
                  <p className="text-2xl font-black text-[#4b6cb7]">12</p>
                </div>
                <div className="w-px h-10 bg-slate-200 dark:bg-slate-700" />
                <div className="text-center">
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Test Score Avg</p>
                  <p className="text-2xl font-black text-emerald-600">845</p>
                </div>
              </div>
            </div>

            {/* View Public Profile Button */}
            <Button variant="outline" className="rounded-xl border-slate-200 font-semibold text-sm h-10 px-5 shrink-0 hover:bg-slate-50">
              View Public Profile
            </Button>
          </div>
        </div>

        {/* ── Tabs Layout ── */}
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-3 max-w-[600px] mb-6">
            <TabsTrigger value="profile" className="rounded-md">Profile Information</TabsTrigger>
            <TabsTrigger value="security" className="rounded-md">Password & Security</TabsTrigger>
            <TabsTrigger value="billing" className="rounded-md">Billing History</TabsTrigger>
          </TabsList>

          {/* TAB: PROFILE */}
          <TabsContent value="profile" className="space-y-6">
            <div className="bg-white dark:bg-card border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm">
              <div className="flex items-center justify-between p-6 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                    <User className="w-4.5 h-4.5 text-slate-600" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">Basic Information</h3>
                </div>
              </div>
              <div className="border-t border-slate-100 dark:border-slate-800" />
              <div className="p-6 space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-600 dark:text-slate-400">Full Name</label>
                    <div className="relative">
                      <Input defaultValue="Minh" className="rounded-xl h-12 border-slate-200 pr-10 font-medium focus:border-[#4b6cb7] focus:ring-[#4b6cb7]" />
                      <Pencil className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-600 dark:text-slate-400">Phone Number</label>
                    <div className="relative">
                      <Input defaultValue="+84 901 234 567" className="rounded-xl h-12 border-slate-200 pr-10 font-medium focus:border-[#4b6cb7] focus:ring-[#4b6cb7]" />
                      <Phone className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-600 dark:text-slate-400">Email Address</label>
                  <Input defaultValue="minh.studying@example.com" readOnly className="rounded-xl h-12 border-slate-200 bg-slate-50 dark:bg-slate-800 font-medium text-slate-500 cursor-not-allowed" />
                  <p className="text-xs text-slate-400">Email changes require identity verification.</p>
                </div>
                <div className="pt-4 flex justify-end">
                  <Button className="rounded-xl bg-[#4b6cb7] hover:bg-[#3b5b9c] text-white font-bold h-11 px-8 shadow-md">
                    Save Changes
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* TAB: SECURITY */}
          <TabsContent value="security" className="space-y-6">
            <div className="bg-white dark:bg-card border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm">
              <div className="flex items-center gap-3 p-6 pb-4">
                <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                  <Lock className="w-4.5 h-4.5 text-slate-600" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Change Password</h3>
              </div>
              <div className="border-t border-slate-100 dark:border-slate-800" />
              <div className="p-6 space-y-5">
                <div className="space-y-2 max-w-md">
                  <label className="text-sm font-semibold text-slate-600 dark:text-slate-400">Current Password</label>
                  <Input type="password" placeholder="Enter current password" className="rounded-xl h-12 border-slate-200 focus:border-[#4b6cb7] focus:ring-[#4b6cb7]" />
                </div>
                <div className="space-y-2 max-w-md">
                  <label className="text-sm font-semibold text-slate-600 dark:text-slate-400">New Password</label>
                  <Input type="password" placeholder="Enter new password" className="rounded-xl h-12 border-slate-200 focus:border-[#4b6cb7] focus:ring-[#4b6cb7]" />
                </div>
                <div className="space-y-2 max-w-md">
                  <label className="text-sm font-semibold text-slate-600 dark:text-slate-400">Confirm New Password</label>
                  <Input type="password" placeholder="Confirm new password" className="rounded-xl h-12 border-slate-200 focus:border-[#4b6cb7] focus:ring-[#4b6cb7]" />
                </div>
                <div className="pt-4 flex justify-start">
                  <Button className="rounded-xl bg-[#4b6cb7] hover:bg-[#3b5b9c] text-white font-bold h-11 px-8 shadow-md">
                    Update Password
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* TAB: BILLING */}
          <TabsContent value="billing" className="space-y-6">
            <div className="bg-white dark:bg-card border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden">
              <div className="flex items-center gap-3 p-6 pb-4">
                <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                  <CreditCard className="w-4.5 h-4.5 text-slate-600" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Transaction History</h3>
              </div>
              <div className="border-t border-slate-100 dark:border-slate-800" />
              <div className="p-0 overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[600px]">
                  <thead>
                    <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800">
                      <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Course / Item</th>
                      <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Date</th>
                      <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Amount</th>
                      <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Status</th>
                      <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase text-right">Invoice</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {currentTransactions.map((tx) => (
                      <tr key={tx.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                        <td className="px-6 py-4">
                          <p className="font-bold text-slate-900 dark:text-white text-sm">{tx.title}</p>
                          <p className="text-xs text-slate-500 mt-0.5">{tx.desc}</p>
                        </td>
                        <td className="px-6 py-4 text-slate-600 dark:text-slate-400 text-sm font-medium">{tx.date}</td>
                        <td className="px-6 py-4 text-slate-900 dark:text-white font-bold text-sm">{tx.amount}</td>
                        <td className="px-6 py-4">
                          <Badge className="bg-emerald-100 text-emerald-700 border-none font-semibold">{tx.status}</Badge>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-[#4b6cb7] font-semibold hover:bg-[#4b6cb7]/10"
                            onClick={() => handleDownloadInvoice(tx)}
                            disabled={downloadingId === tx.id}
                          >
                            {downloadingId === tx.id ? (
                              <span className="flex items-center gap-2">
                                <div className="w-4 h-4 border-2 border-[#4b6cb7]/30 border-t-[#4b6cb7] rounded-full animate-spin" />
                                Downloading...
                              </span>
                            ) : "Download"}
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination Controls */}
              <div className="flex items-center justify-between p-4 px-6 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/20">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="rounded-lg font-semibold border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Previous
                </Button>
                <div className="text-sm font-medium text-slate-500">
                  Page {currentPage} of {totalPages}
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className="rounded-lg font-semibold border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Next
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* ── Become a Teacher CTA ── */}
        <div className="bg-white dark:bg-card border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden">
          <div className="flex flex-col sm:flex-row items-center gap-6 p-6">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-900/20 flex items-center justify-center shrink-0">
              <Award className="w-6 h-6 text-amber-600" />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <Badge className="bg-amber-100 text-amber-700 border-none text-[10px] font-bold uppercase tracking-wider mb-2">Earn & Share Knowledge</Badge>
              <h4 className="font-bold text-slate-900 dark:text-white text-lg">Become a TOEIC Instructor</h4>
              <p className="text-sm text-slate-500 mt-0.5">Open Your Class</p>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-3 text-xs text-slate-500">
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Create custom tests</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Manage student analytics</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Monetize your courses</span>
              </div>
            </div>
            <Button
              onClick={() => setShowTeacherModal(true)}
              className="rounded-xl bg-[#4b6cb7] hover:bg-[#3b5b9c] text-white font-bold h-11 px-6 shadow-md shrink-0"
            >
              Get Started
            </Button>
          </div>
        </div>

        {/* ── Danger Zone ── */}
        <div className="bg-white dark:bg-card border border-red-200 dark:border-red-900/30 rounded-2xl shadow-sm">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-5 h-5 text-red-500 shrink-0" />
              <div>
                <h4 className="font-bold text-red-600 dark:text-red-400">Danger Zone</h4>
                <p className="text-sm text-slate-500">Once you delete your account, there is no going back. Please be certain.</p>
              </div>
            </div>
            <Button variant="outline" className="rounded-xl border-2 border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 font-bold h-10 px-5 shrink-0">
              Delete Account
            </Button>
          </div>
        </div>
      </div>

      {/* Teacher Application Modal */}
      <ApplyTeacherModal isOpen={showTeacherModal} onClose={() => setShowTeacherModal(false)} />
    </DashboardLayout>
  );
}
