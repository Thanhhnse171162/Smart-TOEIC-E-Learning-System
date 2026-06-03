"use client";

import { useState, useRef } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
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

/* ================================================================
   PROFILE PAGE
   ================================================================ */
export default function ProfilePage() {
  const [showTeacherModal, setShowTeacherModal] = useState(false);

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

        {/* ── Two Column Layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6">

          {/* LEFT: Basic Information */}
          <div className="bg-white dark:bg-card border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm">
            <div className="flex items-center justify-between p-6 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                  <User className="w-4.5 h-4.5 text-slate-600" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Basic Information</h3>
              </div>
              <Button variant="link" className="text-[#4b6cb7] font-semibold text-sm p-0 h-auto">Save Changes</Button>
            </div>

            <div className="border-t border-slate-100 dark:border-slate-800" />

            <div className="p-6 space-y-5">
              {/* Full Name */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-600 dark:text-slate-400">Full Name</label>
                <div className="relative">
                  <Input
                    defaultValue="Minh"
                    className="rounded-xl h-12 border-slate-200 bg-white dark:bg-slate-800 pr-10 font-medium focus:border-[#4b6cb7] focus:ring-[#4b6cb7]"
                  />
                  <Pencil className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                </div>
              </div>

              {/* Phone Number */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-600 dark:text-slate-400">Phone Number</label>
                <div className="relative">
                  <Input
                    defaultValue="+84 901 234 567"
                    className="rounded-xl h-12 border-slate-200 bg-white dark:bg-slate-800 pr-10 font-medium focus:border-[#4b6cb7] focus:ring-[#4b6cb7]"
                  />
                  <Phone className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                </div>
              </div>

              {/* Email Address */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-600 dark:text-slate-400">Email Address</label>
                <Input
                  defaultValue="minh.studying@example.com"
                  readOnly
                  className="rounded-xl h-12 border-slate-200 bg-slate-50 dark:bg-slate-800 font-medium text-slate-500 cursor-not-allowed"
                />
                <p className="text-xs text-slate-400">Email changes require identity verification.</p>
              </div>
            </div>
          </div>

          {/* RIGHT: Account Status + Daily Goal */}
          <div className="space-y-6">
            {/* Account Status */}
            <div className="bg-white dark:bg-card border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm">
              <div className="flex items-center gap-3 p-6 pb-4">
                <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                  <Shield className="w-4.5 h-4.5 text-slate-600" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Account Status</h3>
              </div>

              <div className="border-t border-slate-100 dark:border-slate-800" />

              <div className="p-6 space-y-1">
                {/* Active Status */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-emerald-700 dark:text-emerald-400">Active Student</p>
                    <p className="text-xs text-slate-500">Membership valid until Dec 2024</p>
                  </div>
                </div>

                {/* Links */}
                <button className="w-full flex items-center justify-between py-3.5 px-1 border-t border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-colors group">
                  <span className="flex items-center gap-3 text-sm font-medium text-slate-700 dark:text-slate-300">
                    <CreditCard className="w-4 h-4 text-slate-400" /> Billing History
                  </span>
                  <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-slate-500 transition-colors" />
                </button>
                <button className="w-full flex items-center justify-between py-3.5 px-1 border-t border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-colors group">
                  <span className="flex items-center gap-3 text-sm font-medium text-slate-700 dark:text-slate-300">
                    <Lock className="w-4 h-4 text-slate-400" /> Password & Security
                  </span>
                  <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-slate-500 transition-colors" />
                </button>
              </div>
            </div>

            {/* Daily Goal */}
            <div className="bg-gradient-to-br from-[#4b6cb7] to-[#3b5b9c] rounded-2xl p-5 text-white shadow-lg relative overflow-hidden">
              <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-white/10" />
              <div className="absolute -bottom-4 -left-4 w-16 h-16 rounded-full bg-white/5" />
              <div className="relative z-10">
                <h4 className="font-bold text-lg mb-1">Daily Goal</h4>
                <p className="text-white/80 text-sm mb-4">You&apos;re 20 minutes away from hitting your study streak!</p>
                <div className="h-2 bg-white/20 rounded-full overflow-hidden mb-2">
                  <div className="h-full bg-white rounded-full w-[70%] transition-all duration-700" />
                </div>
              </div>
              <Flame className="absolute right-5 bottom-5 w-10 h-10 text-white/20" />
            </div>
          </div>
        </div>

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
