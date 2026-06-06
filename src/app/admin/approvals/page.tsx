"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { adminSidebarItems } from "@/lib/navigation";
import {
  Check,
  CheckCircle,
  Clock,
  CreditCard,
  Download,
  Eye,
  FileBadge,
  FileText,
  Search,
  X,
  XCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ApplicationDocument {
  name: string;
  url: string;
  type: "image" | "pdf";
}

interface Application {
  id: string;
  applicantName: string;
  email: string;
  phone: string;
  roleRequested: string;
  toeicScore: number | string;
  submissionDate: string;
  status: string;
  bio: string;
  idFront: ApplicationDocument;
  idBack: ApplicationDocument;
  credentials: ApplicationDocument;
}

const PENDING_APPLICATIONS: Application[] = [
  {
    id: "APP-001",
    applicantName: "Nguyen Van A",
    email: "nguyenvana@gmail.com",
    phone: "+84 901 234 567",
    roleRequested: "Teacher",
    toeicScore: 950,
    submissionDate: "2 hours ago",
    status: "Pending",
    idFront: { name: "CCCD_Front.jpg", url: "/images/practice/1.png", type: "image" },
    idBack: { name: "CCCD_Back.jpg", url: "/images/practice/part1-photo.png", type: "image" },
    credentials: { name: "TOEIC_Certificate_IIG.pdf", url: "#", type: "pdf" },
    bio: "I have 5 years of experience teaching TOEIC at ILA and VUS. I want to bring my highly effective curriculum to Smart TOEIC.",
  },
  {
    id: "APP-002",
    applicantName: "Le Hoang C",
    email: "hoangc.le@gmail.com",
    phone: "+84 912 345 678",
    roleRequested: "Teacher",
    toeicScore: 880,
    submissionDate: "1 day ago",
    status: "Pending",
    idFront: { name: "CCCD_Front.jpg", url: "/images/practice/screen.png", type: "image" },
    idBack: { name: "CCCD_Back.jpg", url: "/images/practice/screen1.png", type: "image" },
    credentials: { name: "TOEIC_Certificate.pdf", url: "#", type: "pdf" },
    bio: "English major graduate looking to start online teaching.",
  },
  {
    id: "APP-003",
    applicantName: "Language Center EnglishPlus",
    email: "contact@englishplus.edu",
    phone: "+84 28 3822 1234",
    roleRequested: "Partner Center",
    toeicScore: "N/A",
    submissionDate: "2 days ago",
    status: "Pending",
    idFront: { name: "Business_License_Front.pdf", url: "#", type: "pdf" },
    idBack: { name: "Business_License_Back.pdf", url: "#", type: "pdf" },
    credentials: { name: "Center_Profile.pdf", url: "#", type: "pdf" },
    bio: "We are an established center with 500+ active students. We want to use Smart TOEIC as our official LMS platform.",
  },
];

function DocumentPreview({
  label,
  doc,
  onView,
}: {
  label: string;
  doc: ApplicationDocument;
  onView: () => void;
}) {
  return (
    <div className="rounded-2xl border border-border overflow-hidden bg-card">
      <div className="px-3 py-2 bg-muted border-b border-border flex items-center gap-2">
        <CreditCard className="w-4 h-4 text-primary" />
        <span className="text-xs font-bold text-muted-foreground">{label}</span>
      </div>
      <div className="p-3">
        {doc.type === "image" ? (
          <div
            className="relative aspect-[4/3] rounded-xl overflow-hidden bg-muted cursor-pointer group"
            onClick={onView}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={doc.url}
              alt={doc.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
              <Eye className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>
        ) : (
          <div
            className="aspect-[4/3] rounded-xl bg-muted border border-dashed border-border flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-colors"
            onClick={onView}
          >
            <FileText className="w-10 h-10 text-muted-foreground" />
            <span className="text-xs font-bold text-muted-foreground px-2 text-center truncate max-w-full">{doc.name}</span>
          </div>
        )}
        <div className="flex items-center justify-between mt-2">
          <span className="text-[11px] font-semibold text-muted-foreground truncate">{doc.name}</span>
          <Button variant="ghost" size="icon" className="h-7 w-7 shrink-0" onClick={onView}>
            <Download className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function AdminApprovalsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  const [previewDoc, setPreviewDoc] = useState<ApplicationDocument | null>(null);
  const [isRejecting, setIsRejecting] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredApps = PENDING_APPLICATIONS.filter(
    (app) =>
      app.applicantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.max(1, Math.ceil(filteredApps.length / itemsPerPage));
  const paginatedApps = filteredApps.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const openReview = (app: Application) => {
    setSelectedApp(app);
    setIsRejecting(false);
    setRejectReason("");
  };

  const handleCloseModal = () => {
    setSelectedApp(null);
    setIsRejecting(false);
    setRejectReason("");
  };

  const handleApprove = () => {
    alert(`Successfully approved ${selectedApp?.applicantName} to be a ${selectedApp?.roleRequested}!`);
    handleCloseModal();
  };

  const handleReject = () => {
    if (!rejectReason) {
      alert("Please select a reason for rejection.");
      return;
    }
    alert(`Application for ${selectedApp?.applicantName} rejected. Reason: ${rejectReason}`);
    handleCloseModal();
  };

  return (
    <DashboardLayout
      sidebarItems={adminSidebarItems}
      title="Approvals & Verifications"
      subtitle="Review requests from students to become Teachers or Partners"
      sidebarTitle="Admin Center"
      userName="Super Admin"
    >
      <div className="max-w-[1400px] mx-auto pb-10 space-y-6">
        
        {/* Toolbar */}
        <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input 
              placeholder="Search by applicant name or email..." 
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="pl-9 h-11 rounded-xl bg-slate-50 border-slate-200 text-sm font-medium w-full"
            />
          </div>
          <div className="flex gap-2">
            <Badge className="bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border-none px-3 py-1.5 text-xs font-bold cursor-pointer">Pending (3)</Badge>
            <Badge className="bg-slate-50 text-slate-500 hover:bg-slate-100 border-none px-3 py-1.5 text-xs font-bold cursor-pointer">Approved</Badge>
            <Badge className="bg-slate-50 text-slate-500 hover:bg-slate-100 border-none px-3 py-1.5 text-xs font-bold cursor-pointer">Rejected</Badge>
          </div>
        </div>

        {/* Applications Table */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-50 bg-slate-50/50 text-[11px] font-black text-slate-500 uppercase tracking-wider">
                  <th className="p-5 pl-6 w-[10%]">ID</th>
                  <th className="p-5 w-[25%]">Applicant Info</th>
                  <th className="p-5 w-[15%]">Role Requested</th>
                  <th className="p-5 w-[15%]">TOEIC Score</th>
                  <th className="p-5 w-[15%]">Submitted</th>
                  <th className="p-5 pr-6 w-[20%] text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {paginatedApps.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-slate-500 font-bold">No applications found.</td>
                  </tr>
                ) : paginatedApps.map((app) => (
                  <tr key={app.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="p-5 pl-6">
                      <div className="inline-flex items-center justify-center px-2.5 py-1 rounded-md bg-slate-100 border border-slate-200 text-[11px] font-bold text-slate-500">
                        {app.id}
                      </div>
                    </td>
                    <td className="p-5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-sm shrink-0">
                          {app.applicantName.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-[14px] text-slate-800">{app.applicantName}</p>
                          <p className="text-[12px] font-semibold text-slate-500">{app.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-5">
                      <Badge className={`px-2.5 py-0.5 text-xs font-black shadow-sm ${app.roleRequested === "Teacher" ? "bg-indigo-50 text-indigo-700 border-indigo-200" : "bg-amber-50 text-amber-700 border-amber-200"}`}>
                        {app.roleRequested}
                      </Badge>
                    </td>
                    <td className="p-5">
                      <Badge className="bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border-emerald-200 px-2.5 py-0.5 text-xs font-black shadow-sm">
                        {app.toeicScore}
                      </Badge>
                    </td>
                    <td className="p-5">
                      <div className="flex items-center gap-1.5 text-[12px] font-semibold text-slate-500">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        {app.submissionDate}
                      </div>
                    </td>
                    <td className="p-5 pr-6 text-right">
                      <Button onClick={() => openReview(app)} variant="outline" className="h-9 px-3 rounded-xl font-bold border-slate-200 text-indigo-600 hover:bg-indigo-50 hover:text-indigo-700 gap-2">
                        <Eye className="w-4 h-4" /> Review
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Review Modal */}
      <Dialog open={!!selectedApp} onOpenChange={(open) => !open && handleCloseModal()}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-hidden rounded-3xl p-0 flex flex-col">
          {selectedApp && (
            <>
              <DialogHeader className="shrink-0 sticky top-0 z-10 p-6 pr-14 border-b bg-background">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                    <FileBadge className="w-5 h-5" />
                  </div>
                  <div>
                    <DialogTitle className="text-lg font-extrabold">Application Review</DialogTitle>
                    <p className="text-xs font-bold text-muted-foreground mt-0.5">ID: {selectedApp.id}</p>
                  </div>
                </div>
              </DialogHeader>

              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-[11px] font-bold text-muted-foreground uppercase mb-1">Applicant</p>
                    <p className="font-bold">{selectedApp.applicantName}</p>
                    <p className="text-sm text-muted-foreground">{selectedApp.email}</p>
                    <p className="text-sm text-muted-foreground">{selectedApp.phone}</p>
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-muted-foreground uppercase mb-1">Status</p>
                    <span className="text-sm font-bold text-amber-500 dark:text-amber-400 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" /> Pending Review
                    </span>
                    <p className="text-sm font-bold mt-2">TOEIC: {selectedApp.toeicScore}</p>
                  </div>
                </div>

                <div>
                  <p className="text-[11px] font-bold text-muted-foreground uppercase mb-2">Bio</p>
                  <p className="p-4 bg-muted rounded-2xl text-sm">{selectedApp.bio}</p>
                </div>

                {/* 2 CCCD documents + credentials */}
                <div>
                  <p className="text-[11px] font-bold text-muted-foreground uppercase mb-3">
                    Identity Verification (CCCD) — 2 files submitted
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <DocumentPreview
                      label="Front Side"
                      doc={selectedApp.idFront}
                      onView={() => setPreviewDoc(selectedApp.idFront)}
                    />
                    <DocumentPreview
                      label="Back Side"
                      doc={selectedApp.idBack}
                      onView={() => setPreviewDoc(selectedApp.idBack)}
                    />
                  </div>
                </div>

                <div>
                  <p className="text-[11px] font-bold text-muted-foreground uppercase mb-3">
                    Expert Credentials
                  </p>
                  <DocumentPreview
                    label="Certificate / Degree"
                    doc={selectedApp.credentials}
                    onView={() => setPreviewDoc(selectedApp.credentials)}
                  />
                </div>
              </div>

              <DialogFooter className="shrink-0 sticky bottom-0 z-10 p-6 border-t bg-background flex-col sm:flex-row gap-3">
                {isRejecting ? (
                  <div className="w-full flex flex-col gap-3">
                    <select
                      value={rejectReason}
                      onChange={(e) => setRejectReason(e.target.value)}
                      className="h-11 px-4 rounded-xl border border-input bg-background text-sm font-semibold text-foreground"
                    >
                      <option value="">-- Choose rejection reason --</option>
                      <option value="Invalid TOEIC Certificate">Invalid TOEIC Certificate</option>
                      <option value="Missing ID verification documents">Missing ID verification documents</option>
                      <option value="Suspicious credentials">Suspicious credentials</option>
                    </select>
                    <div className="flex gap-2 justify-end">
                      <Button variant="outline" className="rounded-xl" onClick={() => setIsRejecting(false)}>
                        Cancel
                      </Button>
                      <Button className="rounded-xl bg-rose-600 hover:bg-rose-700" onClick={handleReject}>
                        Confirm Rejection
                      </Button>
                    </div>
                  </div>
                ) : (
                  <>
                    <p className="text-xs text-muted-foreground mr-auto">Review CCCD front & back before approving.</p>
                    <Button variant="outline" className="rounded-xl text-destructive border-destructive/30 hover:bg-destructive/10" onClick={() => setIsRejecting(true)}>
                      Reject
                    </Button>
                    <Button className="rounded-xl bg-emerald-600 hover:bg-emerald-700" onClick={handleApprove}>
                      <CheckCircle className="w-4 h-4 mr-1" /> Approve
                    </Button>
                  </>
                )}
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Full-size document preview */}
      <Dialog open={!!previewDoc} onOpenChange={(open) => !open && setPreviewDoc(null)}>
        <DialogContent className="max-w-2xl rounded-2xl">
          <DialogHeader>
            <DialogTitle>{previewDoc?.name}</DialogTitle>
          </DialogHeader>
          {previewDoc?.type === "image" ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={previewDoc.url} alt={previewDoc.name} className="w-full rounded-xl border" />
          ) : (
            <div className="flex flex-col items-center py-12 gap-4">
              <FileText className="w-16 h-16 text-muted-foreground" />
              <p className="font-bold">{previewDoc?.name}</p>
              <p className="text-sm text-muted-foreground">PDF preview — download to view full file</p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
