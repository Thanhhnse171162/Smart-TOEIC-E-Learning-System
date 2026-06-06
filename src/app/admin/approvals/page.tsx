"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { adminSidebarItems } from "@/lib/navigation";
import { CheckCircle, XCircle, Eye, Search, FileText, FileBadge, Download, Check, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

// Mock Data
const PENDING_APPLICATIONS = [
  {
    id: "APP-001",
    applicantName: "Nguyen Van A",
    email: "nguyenvana@gmail.com",
    toeicScore: "950",
    submissionDate: "2 hours ago",
    status: "Pending",
    documents: ["TOEIC_Certificate_IIG.pdf", "ID_Card.jpg"],
    bio: "I have 5 years of experience teaching TOEIC at ILA and VUS. I want to bring my highly effective curriculum to Smart TOEIC."
  },
  {
    id: "APP-002",
    applicantName: "Le Hoang C",
    email: "hoangc.le@gmail.com",
    toeicScore: "880",
    submissionDate: "1 day ago",
    status: "Pending",
    documents: ["TOEIC_Certificate.pdf"],
    bio: "English major graduate looking to start online teaching."
  },
  {
    id: "APP-003",
    applicantName: "Tran Thi B",
    email: "tranthib@gmail.com",
    toeicScore: "920",
    submissionDate: "2 days ago",
    status: "Pending",
    documents: ["TOEIC_Certificate.pdf", "Teaching_Profile.pdf"],
    bio: "Passionate English teacher with 3 years of experience. I want to help students achieve their TOEIC goals."
  }
];

export default function AdminApprovalsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedApp, setSelectedApp] = useState<typeof PENDING_APPLICATIONS[0] | null>(null);
  const [isRejecting, setIsRejecting] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredApps = PENDING_APPLICATIONS.filter(app => 
    app.applicantName.toLowerCase().includes(searchTerm.toLowerCase()) || 
    app.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const totalPages = Math.ceil(filteredApps.length / itemsPerPage);
  const paginatedApps = filteredApps.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleApprove = () => {
    alert(`Successfully approved ${selectedApp?.applicantName} to be a Teacher! An email has been sent.`);
    setSelectedApp(null);
    setIsRejecting(false);
  };

  const handleReject = () => {
    if (!rejectReason) {
      alert("Please select a reason for rejection.");
      return;
    }
    alert(`Application for ${selectedApp?.applicantName} has been rejected. Reason: ${rejectReason}`);
    setSelectedApp(null);
    setIsRejecting(false);
    setRejectReason("");
  };

  const handleCloseModal = () => {
    setSelectedApp(null);
    setIsRejecting(false);
    setRejectReason("");
  };

  return (
    <DashboardLayout sidebarItems={adminSidebarItems} title="Approvals & Verifications" subtitle="Review requests from students to become Teachers" sidebarTitle="Admin Center" userName="Super Admin">
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
                  <th className="p-5 w-[35%]">Applicant Info</th>
                  <th className="p-5 w-[15%]">TOEIC Score</th>
                  <th className="p-5 w-[15%]">Documents</th>
                  <th className="p-5 w-[15%]">Submitted</th>
                  <th className="p-5 pr-6 w-[10%] text-right">Actions</th>
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
                      <Badge className="bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border-emerald-200 px-2.5 py-0.5 text-xs font-black shadow-sm">
                        {app.toeicScore}
                      </Badge>
                    </td>
                    <td className="p-5">
                      <div className="flex items-center gap-1.5 text-[13px] font-bold text-slate-600">
                        <FileText className="w-4 h-4 text-indigo-400" />
                        <span>{app.documents.length} files</span>
                      </div>
                    </td>
                    <td className="p-5">
                      <div className="flex items-center gap-1.5 text-[12px] font-semibold text-slate-500">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        {app.submissionDate}
                      </div>
                    </td>
                    <td className="p-5 pr-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button onClick={() => { setSelectedApp(app); setIsRejecting(true); }} variant="outline" size="icon" className="h-9 w-9 rounded-xl border-rose-200 text-rose-600 hover:bg-rose-50 hover:text-rose-700" title="Reject">
                          <XCircle className="w-4 h-4" />
                        </Button>
                        <Button onClick={() => alert(`Successfully approved ${app.applicantName}!`)} variant="outline" size="icon" className="h-9 w-9 rounded-xl border-emerald-200 text-emerald-600 hover:bg-emerald-50 hover:text-emerald-700" title="Approve">
                          <Check className="w-4 h-4" />
                        </Button>
                        <Button onClick={() => setSelectedApp(app)} variant="outline" className="h-9 px-3 rounded-xl font-bold border-slate-200 text-indigo-600 hover:bg-indigo-50 hover:text-indigo-700 gap-2">
                          <Eye className="w-4 h-4" /> Review
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="p-4 border-t border-slate-100 flex items-center justify-between text-[13px] font-bold text-slate-500 bg-slate-50/50">
            <span>Showing {filteredApps.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1}-{Math.min(currentPage * itemsPerPage, filteredApps.length)} of {filteredApps.length}</span>
            <div className="flex gap-1.5">
              <Button 
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))} 
                disabled={currentPage === 1}
                variant="outline" size="sm" className="h-8 px-3 rounded-lg border-slate-200 font-bold hover:bg-slate-100"
              >
                Previous
              </Button>
              {Array.from({length: totalPages}, (_, i) => i + 1).map(page => (
                <Button 
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  variant={currentPage === page ? "default" : "outline"} 
                  size="sm" 
                  className={`h-8 w-8 rounded-lg font-bold ${currentPage === page ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm' : 'border-slate-200 hover:bg-slate-100 text-slate-600'}`}
                >
                  {page}
                </Button>
              ))}
              <Button 
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))} 
                disabled={currentPage === totalPages || totalPages === 0}
                variant="outline" size="sm" className="h-8 px-3 rounded-lg border-slate-200 font-bold hover:bg-slate-100"
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Review Modal */}
      {selectedApp && (
        <div className="fixed inset-0 bg-slate-900/40 z-50 flex items-center justify-center backdrop-blur-sm px-4">
          <div className="bg-white rounded-3xl shadow-xl w-full max-w-2xl overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-slate-50/50 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center">
                  <FileBadge className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-lg text-slate-800">Application Review</h3>
                  <p className="text-xs font-bold text-slate-500 mt-0.5">ID: {selectedApp.id}</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={handleCloseModal} className="rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-200">
                <XCircle className="w-5 h-5" />
              </Button>
            </div>
            
            {/* Content (Scrollable) */}
            <div className="p-6 space-y-6 overflow-y-auto">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Applicant Name</p>
                  <p className="text-[15px] font-black text-slate-800">{selectedApp.applicantName}</p>
                  <p className="text-[13px] font-semibold text-slate-500 mt-0.5">{selectedApp.email}</p>
                </div>
                <div>
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Submitted</p>
                  <p className="text-[15px] font-black text-slate-800">{selectedApp.submissionDate}</p>
                </div>
                <div>
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Claimed TOEIC Score</p>
                  <p className="text-[18px] font-black text-slate-800">{selectedApp.toeicScore}</p>
                </div>
                <div>
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Status</p>
                  <span className="text-[13px] font-bold text-amber-500 flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> Pending Review</span>
                </div>
              </div>

              <div>
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">Self Introduction & Bio</p>
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-sm font-medium text-slate-700 leading-relaxed">
                  {selectedApp.bio}
                </div>
              </div>

              <div>
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">Attached Credentials (Proofs)</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {selectedApp.documents.map((doc, i) => (
                    <div key={i} className="flex items-center justify-between p-3 border border-slate-200 rounded-xl hover:border-indigo-300 hover:bg-indigo-50/30 transition-colors cursor-pointer group">
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-slate-400 group-hover:text-indigo-500" />
                        <span className="text-sm font-bold text-slate-600 group-hover:text-indigo-700 truncate max-w-[150px]">{doc}</span>
                      </div>
                      <Download className="w-4 h-4 text-slate-400 group-hover:text-indigo-600" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions Footer */}
            <div className="p-6 border-t border-slate-100 bg-slate-50/50 flex flex-col gap-4 shrink-0">
              {isRejecting ? (
                <div className="flex flex-col gap-3 animate-in fade-in slide-in-from-bottom-2">
                  <p className="text-sm font-bold text-slate-700">Select reason for rejection:</p>
                  <div className="flex gap-3">
                    <select 
                      value={rejectReason}
                      onChange={(e) => setRejectReason(e.target.value)}
                      className="flex-1 h-11 px-4 rounded-xl border border-slate-200 bg-white text-sm font-semibold text-slate-700 outline-none focus:ring-2 focus:ring-rose-500"
                    >
                      <option value="" disabled>-- Choose a reason --</option>
                      <option value="Invalid TOEIC Certificate">Invalid TOEIC Certificate</option>
                      <option value="Score does not meet minimum requirement">Score does not meet minimum requirement</option>
                      <option value="Missing ID verification documents">Missing ID verification documents</option>
                      <option value="Suspicious or fake credentials">Suspicious or fake credentials</option>
                      <option value="Other">Other</option>
                    </select>
                    <Button onClick={() => setIsRejecting(false)} variant="outline" className="font-bold rounded-xl h-11 px-6 border-slate-200 text-slate-600 hover:bg-slate-100">
                      Cancel
                    </Button>
                    <Button onClick={handleReject} className="font-bold rounded-xl h-11 px-6 bg-rose-600 hover:bg-rose-700 text-white shadow-sm gap-2">
                      <XCircle className="w-4 h-4" /> Confirm Rejection
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <p className="text-xs font-semibold text-slate-500">Please review documents carefully before approving.</p>
                  <div className="flex w-full sm:w-auto items-center gap-3">
                    <Button onClick={() => setIsRejecting(true)} variant="outline" className="flex-1 sm:flex-none font-bold rounded-xl h-11 px-6 border-rose-200 text-rose-600 hover:bg-rose-50 hover:text-rose-700 gap-2">
                      <XCircle className="w-4 h-4" /> Reject
                    </Button>
                    <Button onClick={handleApprove} className="flex-1 sm:flex-none font-bold rounded-xl h-11 px-6 bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm gap-2">
                      <Check className="w-4 h-4" /> Approve & Upgrade
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
