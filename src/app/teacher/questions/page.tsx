"use client";

import React, { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { teacherSidebarItems } from "@/lib/navigation";
import { Search, Plus, Camera, MessageCircle, Users, Mic, PenLine, FileText, BookOpen, ChevronRight, ChevronDown, Eye, Edit2, Trash2, X, PlayCircle, CheckCircle2, Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import {
  apiGetTeacherQuestions,
  apiGetTeacherQuestionById,
  apiUpdateTeacherQuestion,
  apiDeleteTeacherQuestion,
  apiExportTeacherQuestions,
  apiImportTeacherQuestions,
} from "@/layers/data/api/resources.api";
import { ApiError } from "@/lib/api/client";
import type { ApiTeacherQuestion } from "@/layers/data/api/types";
import { clearSession } from "@/lib/auth/session";

// --- UI Types ---
type SubQuestion = {
  subId: string;
  questionText: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
};

type QuestionGroup = {
  id: string;
  questionId: number;
  isGroup: boolean;
  part: number;
  difficulty: "Easy" | "Medium" | "Hard";
  topic: string;
  sharedContent: {
    audioUrl: string | null;
    passageText: string | null;
  };
  usage: string[];
  text: string;
  subQuestions: SubQuestion[];
};

// Map flat API question → UI QuestionGroup
function mapApiToGroup(q: ApiTeacherQuestion): QuestionGroup {
  const optVals = Object.values(q.options ?? {});
  return {
    id: String(q.questionId),
    questionId: q.questionId,
    isGroup: false,
    part: q.part,
    difficulty: (q.difficulty as "Easy" | "Medium" | "Hard") ?? "Medium",
    topic: q.type ?? "General",
    sharedContent: { audioUrl: q.audioUrl ?? null, passageText: null },
    usage: [],
    text: q.text ?? "",
    subQuestions: [
      {
        subId: String(q.questionId),
        questionText: q.text ?? "",
        options: optVals,
        correctAnswer: "A",
        explanation: "",
      },
    ],
  };
}

// FALLBACK removed

export default function TeacherQuestionsPage() {
  const router = useRouter();
  const [questions, setQuestions] = useState<QuestionGroup[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [apiError, setApiError] = useState<string | null>(null);
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [isImporting, setIsImporting] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Filter States
  const [searchTerm, setSearchTerm] = useState("");
  const [filterPart, setFilterPart] = useState<string>("all");
  const [filterDifficulty, setFilterDifficulty] = useState<string>("all");
  const [filterTopic, setFilterTopic] = useState<string>("all");
  const [unusedOnly, setUnusedOnly] = useState(false);

  // Drawer state
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [previewData, setPreviewData] = useState<QuestionGroup | null>(null);

  // Edit state
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editData, setEditData] = useState<QuestionGroup | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  // Dialog state
  const [confirmDialog, setConfirmDialog] = useState<{isOpen: boolean, parentId: string, subId: string} | null>(null);

  // ── Fetch list from API ──────────────────────────────────────
  const fetchQuestions = useCallback(async () => {
    setIsLoading(true);
    setApiError(null);
    try {
      const params: Parameters<typeof apiGetTeacherQuestions>[0] = {};
      if (filterPart !== "all") params.part = Number(filterPart);
      if (filterDifficulty !== "all") params.difficulty = filterDifficulty;
      if (searchTerm.trim()) params.search = searchTerm.trim();
      const data = await apiGetTeacherQuestions(params);
      setQuestions(data.map(mapApiToGroup));
    } catch (e: unknown) {
      const isUnauthorized = e instanceof ApiError && e.status === 401;
      if (isUnauthorized) {
        clearSession();
        router.push("/login");
      } else {
        setApiError(e instanceof Error ? e.message : "Failed to load questions");
      }
    } finally {
      setIsLoading(false);
    }
  }, [filterPart, filterDifficulty, searchTerm]);

  useEffect(() => { fetchQuestions(); }, [fetchQuestions]);

  // Toggle Accordion
  const toggleExpand = useCallback((id: string) => {
    setExpandedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  // Pagination (resets accordion state)
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setExpandedIds(new Set()); 
  };

  // Checkbox logic
  const handleParentCheckbox = (group: QuestionGroup, checked: boolean) => {
    setSelectedIds(prev => {
      const next = new Set(prev);
      group.subQuestions.forEach(sq => {
        if (checked) next.add(sq.subId);
        else next.delete(sq.subId);
      });
      return next;
    });
  };

  const handleChildCheckbox = (parentId: string, subId: string, checked: boolean) => {
    if (checked) {
      // Logic requirement: show prompt to select all when picking a single subId
      setConfirmDialog({ isOpen: true, parentId, subId });
    } else {
      setSelectedIds(prev => {
        const next = new Set(prev);
        next.delete(subId);
        return next;
      });
    }
  };

  const confirmChildSelection = (selectAll: boolean) => {
    if (!confirmDialog) return;
    const { parentId, subId } = confirmDialog;
    const group = questions.find(q => q.id === parentId);
    
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (selectAll && group) {
        group.subQuestions.forEach(sq => next.add(sq.subId));
      } else {
        next.add(subId);
      }
      return next;
    });
    setConfirmDialog(null);
  };

  // Preview Drawer
  const openPreview = (group: QuestionGroup) => {
    setPreviewData(group);
    setIsPreviewOpen(true);
  };

  // Edit Drawer
  const openEdit = (group: QuestionGroup) => {
    setEditData(JSON.parse(JSON.stringify(group)));
    setIsEditOpen(true);
  };

  // PUT /api/teacher/questions/{id}
  const handleSaveEdit = async () => {
    if (!editData) return;
    setIsSaving(true);
    try {
      await apiUpdateTeacherQuestion(editData.questionId, {
        difficulty: editData.difficulty,
        type: editData.topic,
        text: editData.text,
        audioUrl: editData.sharedContent.audioUrl,
      });
      setQuestions(prev => prev.map(q => q.id === editData.id ? editData : q));
      setIsEditOpen(false);
    } catch (e: unknown) {
      alert(e instanceof Error ? e.message : "Save failed");
    } finally {
      setIsSaving(false);
    }
  };

  // DELETE /api/teacher/questions/{id}
  const handleDelete = async (group: QuestionGroup) => {
    if (!confirm(`Delete question #${group.id}?`)) return;
    setIsDeleting(group.id);
    try {
      await apiDeleteTeacherQuestion(group.questionId);
      setQuestions(prev => prev.filter(q => q.id !== group.id));
    } catch (e: unknown) {
      alert(e instanceof Error ? e.message : "Delete failed");
    } finally {
      setIsDeleting(null);
    }
  };

  // GET /api/teacher/questions/export
  const handleExport = async () => {
    try {
      const part = filterPart !== "all" ? Number(filterPart) : undefined;
      await apiExportTeacherQuestions(part !== undefined ? { part } : undefined);
    } catch (e: unknown) {
      alert(e instanceof Error ? e.message : "Export failed");
    }
  };

  // POST /api/teacher/questions/import
  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsImporting(true);
    try {
      await apiImportTeacherQuestions(file);
      alert("Import successfully!");
      fetchQuestions(); // reload
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : "Import failed");
    } finally {
      setIsImporting(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const filteredQuestions = questions.filter(q => {
    if (filterPart !== "all" && q.part.toString() !== filterPart) return false;
    if (filterDifficulty !== "all" && q.difficulty !== filterDifficulty) return false;
    if (filterTopic !== "all" && q.topic !== filterTopic) return false;
    if (unusedOnly && q.usage.length > 0) return false;
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      if (!q.text.toLowerCase().includes(term) && !q.id.toLowerCase().includes(term) && !q.topic.toLowerCase().includes(term)) {
        return false;
      }
    }
    return true;
  });

  const totalPages = Math.max(1, Math.ceil(filteredQuestions.length / itemsPerPage));
  const paginatedQuestions = filteredQuestions.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const totalQuestions = questions.length;
  const listeningQs = questions.filter(q => q.part >= 1 && q.part <= 4).length;
  const readingQs = questions.filter(q => q.part >= 5 && q.part <= 7).length;
  const usedQs = questions.filter(q => q.usage && q.usage.length > 0).length;
  const unusedQs = questions.filter(q => !q.usage || q.usage.length === 0).length;
  const getPartCount = (part: number) => questions.filter(q => q.part === part).length;

  return (
    <DashboardLayout 
      sidebarItems={teacherSidebarItems} 
      title="Question Bank" 
      subtitle={`${totalQuestions} questions • Parts 1-7`} 
      
    >
      <div className="max-w-[1400px] mx-auto pb-10">
        {/* Top Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-4 text-center shadow-sm flex flex-col justify-center transition-all hover:shadow-md">
            <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Total Questions</p>
            <p className="text-2xl font-black text-slate-800">{totalQuestions}</p>
          </div>
          <div className="bg-white border border-slate-200 rounded-2xl p-4 text-center shadow-sm flex flex-col justify-center transition-all hover:shadow-md">
            <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Listening (Parts 1-4)</p>
            <p className="text-2xl font-black text-[#4f46e5]">{listeningQs}</p>
          </div>
          <div className="bg-white border border-slate-200 rounded-2xl p-4 text-center shadow-sm flex flex-col justify-center transition-all hover:shadow-md">
            <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Reading (Parts 5-7)</p>
            <p className="text-2xl font-black text-emerald-600">{readingQs}</p>
          </div>
          <div className="bg-white border border-slate-200 rounded-2xl p-4 text-center shadow-sm flex flex-col justify-center transition-all hover:shadow-md">
            <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Used Questions</p>
            <p className="text-2xl font-black text-teal-600">{usedQs}</p>
          </div>
          <div className="bg-white border border-slate-200 rounded-2xl p-4 text-center shadow-sm flex flex-col justify-center transition-all hover:shadow-md">
            <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Unused Questions</p>
            <p className="text-2xl font-black text-amber-500">{unusedQs}</p>
          </div>
        </div>

        {/* Part Selection Row */}
        <div className="flex items-center gap-6 mb-6 overflow-x-auto pb-2 custom-scrollbar px-2">
          <button 
            onClick={() => { setFilterPart('all'); setCurrentPage(1); }}
            className={`shrink-0 font-bold text-[15px] transition-colors ${filterPart === 'all' ? 'text-slate-800' : 'text-slate-500 hover:text-slate-700'}`}
          >
            All Parts
          </button>
          
          <div className="flex items-center gap-4 border-l-2 border-slate-200 pl-6">
            <div className="flex items-center gap-1.5 text-[#4f46e5] bg-indigo-50/80 px-2.5 py-1 rounded-md">
              <Mic className="w-3.5 h-3.5" />
              <span className="text-[11px] font-black uppercase tracking-wider">Listening</span>
            </div>
            {[
              { part: 1, qs: getPartCount(1) },
              { part: 2, qs: getPartCount(2) },
              { part: 3, qs: getPartCount(3) },
              { part: 4, qs: getPartCount(4) },
            ].map((p) => {
              const isActive = filterPart === p.part.toString();
              return (
                <button 
                  key={p.part} 
                  onClick={() => { setFilterPart(isActive ? 'all' : p.part.toString()); setCurrentPage(1); }}
                  className={`shrink-0 flex items-center gap-1.5 font-semibold text-[14px] transition-colors ${isActive ? 'text-[#4f46e5]' : 'text-slate-600 hover:text-[#4f46e5]'}`}
                >
                  Part {p.part}
                  <span className={`px-2 py-0.5 rounded-md text-[11px] font-bold transition-colors ${isActive ? 'bg-[#4f46e5] text-white' : 'bg-slate-100 text-slate-500'}`}>
                    {p.qs}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-4 border-l-2 border-slate-200 pl-6">
            <div className="flex items-center gap-1.5 text-emerald-600 bg-emerald-50/80 px-2.5 py-1 rounded-md">
              <BookOpen className="w-3.5 h-3.5" />
              <span className="text-[11px] font-black uppercase tracking-wider">Reading</span>
            </div>
            {[
              { part: 5, qs: getPartCount(5) },
              { part: 6, qs: getPartCount(6) },
              { part: 7, qs: getPartCount(7) },
            ].map((p) => {
              const isActive = filterPart === p.part.toString();
              return (
                <button 
                  key={p.part} 
                  onClick={() => { setFilterPart(isActive ? 'all' : p.part.toString()); setCurrentPage(1); }}
                  className={`shrink-0 flex items-center gap-1.5 font-semibold text-[14px] transition-colors ${isActive ? 'text-emerald-700' : 'text-slate-600 hover:text-emerald-600'}`}
                >
                  Part {p.part}
                  <span className={`px-2 py-0.5 rounded-md text-[11px] font-bold transition-colors ${isActive ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-500'}`}>
                    {p.qs}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-3 ml-auto pl-4 shrink-0">
            <input 
              type="file" 
              accept=".xlsx,.xls,.csv" 
              ref={fileInputRef} 
              className="hidden" 
              onChange={handleImport} 
            />
            <Button variant="outline" disabled={isImporting} onClick={() => fileInputRef.current?.click()} className="bg-white border-slate-200 text-slate-700 font-bold rounded-xl h-9 px-4 shadow-sm hover:bg-slate-50 transition-colors text-sm">
              {isImporting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
              Import
            </Button>
            <Button variant="outline" onClick={handleExport} className="bg-white border-slate-200 text-slate-700 font-bold rounded-xl h-9 px-4 shadow-sm hover:bg-slate-50 transition-colors text-sm">Export</Button>
            <Button onClick={() => router.push('/teacher/questions/add')} className="bg-[#4f46e5] hover:bg-[#4338ca] text-white font-bold rounded-xl gap-2 h-9 px-4 shadow-sm transition-colors text-sm"><Plus className="w-4 h-4 stroke-[3]"/> Add Question</Button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-4 mb-6">
          <div className="relative flex-1 min-w-[250px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input 
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
              placeholder="Search by ID, content, tag..." 
              className="pl-9 bg-white border-slate-200 rounded-xl font-semibold text-sm shadow-sm h-11" 
            />
          </div>
          <div className="relative">
            <select 
              value={filterPart}
              onChange={(e) => { setFilterPart(e.target.value); setCurrentPage(1); }}
              className="h-11 rounded-xl border border-slate-200 px-4 appearance-none bg-white font-bold text-slate-700 text-sm focus:ring-2 focus:ring-indigo-500 outline-none w-36 shadow-sm"
            >
              <option value="all">All Parts</option>
              <optgroup label="Listening">
                {[1,2,3,4].map(n => <option key={n} value={n.toString()}>Part {n}</option>)}
              </optgroup>
              <optgroup label="Reading">
                {[5,6,7].map(n => <option key={n} value={n.toString()}>Part {n}</option>)}
              </optgroup>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          </div>
          <div className="relative">
            <select 
              value={filterDifficulty}
              onChange={(e) => { setFilterDifficulty(e.target.value); setCurrentPage(1); }}
              className="h-11 rounded-xl border border-slate-200 px-4 appearance-none bg-white font-bold text-slate-700 text-sm focus:ring-2 focus:ring-indigo-500 outline-none w-44 shadow-sm"
            >
              <option value="all">All Difficulties</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          </div>
          <div className="relative">
            <select 
              value={filterTopic}
              onChange={(e) => { setFilterTopic(e.target.value); setCurrentPage(1); }}
              className="h-11 rounded-xl border border-slate-200 px-4 appearance-none bg-white font-bold text-slate-700 text-sm focus:ring-2 focus:ring-indigo-500 outline-none w-40 shadow-sm"
            >
              <option value="all">All Topics</option>
              <option value="Grammar">Grammar</option>
              <option value="Vocabulary">Vocabulary</option>
              <option value="Business">Business</option>
              <option value="Announcement">Announcement</option>
              <option value="Email">Email</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          </div>
          <div className="flex items-center gap-3 ml-auto bg-white border border-slate-200 px-4 h-11 rounded-xl shadow-sm">
            <span className="text-sm font-bold text-slate-700">Unused only</span>
            <Switch checked={unusedOnly} onCheckedChange={(v) => { setUnusedOnly(v); setCurrentPage(1); }} />
          </div>
        </div>

        {/* Loading / Error states */}
        {isLoading && (
          <div className="flex items-center justify-center py-20 gap-3 text-slate-500">
            <Loader2 className="w-6 h-6 animate-spin" />
            <span className="font-semibold">Loading questions...</span>
          </div>
        )}
        {!isLoading && apiError && apiError !== "401" && (
          <div className="flex items-center gap-3 bg-rose-50 border border-rose-200 rounded-2xl p-5 mb-6 text-rose-700">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span className="font-semibold">{apiError}</span>
            <Button size="sm" variant="outline" onClick={fetchQuestions} className="ml-auto">Retry</Button>
          </div>
        )}


        {/* Data Table */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          {/* Header */}
          <div className="grid grid-cols-12 gap-4 items-center p-4 border-b border-slate-100 bg-slate-50 text-[12px] font-bold text-slate-500 uppercase tracking-wider">
            <div className="col-span-1 flex items-center gap-3 pl-2">
              <span>ID</span>
            </div>
            <div className="col-span-5">Question</div>
            <div className="col-span-1">Part</div>
            <div className="col-span-1">Difficulty</div>
            <div className="col-span-1">Topic</div>
            <div className="col-span-2">Usage</div>
            <div className="col-span-1 text-right pr-4">Actions</div>
          </div>

          {/* Body */}
          <div className="divide-y divide-slate-100">
            {paginatedQuestions.map(group => {
              const isExpanded = expandedIds.has(group.id);
              const groupSubIds = group.isGroup ? group.subQuestions.map(sq => sq.subId) : [group.id];
              const selectedCount = groupSubIds.filter(id => selectedIds.has(id)).length;
              const allSelected = selectedCount === groupSubIds.length && groupSubIds.length > 0;
              const someSelected = selectedCount > 0 && selectedCount < groupSubIds.length;
              
              return (
                <React.Fragment key={group.id}>
                  {/* Parent Row */}
                  <div className={`grid grid-cols-12 gap-4 items-center p-4 transition-colors hover:bg-slate-50/80 ${isExpanded ? 'bg-slate-50/50' : ''}`}>
                    <div className="col-span-1 flex items-center gap-3 pl-2">
                      <Checkbox 
                        checked={allSelected ? true : someSelected ? 'indeterminate' : false}
                        onCheckedChange={(c) => handleParentCheckbox(group, !!c)}
                        className="rounded border-slate-300 w-4 h-4 shadow-sm data-[state=checked]:bg-[#4f46e5] data-[state=checked]:border-[#4f46e5]" 
                      />
                      <span className="font-bold text-slate-700 text-[13px]">#{group.id}</span>
                    </div>
                    
                    <div className="col-span-5 flex items-start gap-3">
                      {group.isGroup && (
                        <button onClick={() => toggleExpand(group.id)} className="mt-1 p-0.5 hover:bg-slate-200 rounded text-slate-400 transition-colors shrink-0">
                          {isExpanded ? <ChevronDown className="w-4 h-4 text-indigo-600" /> : <ChevronRight className="w-4 h-4" />}
                        </button>
                      )}
                      {!group.isGroup && <div className="w-5 shrink-0"></div>}
                      
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${group.part <= 4 ? 'bg-[#4f46e5]' : 'bg-emerald-500'} text-white shadow-sm mt-0.5`}>
                        {group.part === 1 && <Camera className="w-4 h-4" />}
                        {group.part === 2 && <MessageCircle className="w-4 h-4" />}
                        {group.part === 3 && <Users className="w-4 h-4" />}
                        {group.part === 4 && <Mic className="w-4 h-4" />}
                        {group.part === 5 && <PenLine className="w-4 h-4" />}
                        {group.part === 6 && <FileText className="w-4 h-4" />}
                        {group.part === 7 && <BookOpen className="w-4 h-4" />}
                      </div>
                      <div className="space-y-1.5 cursor-pointer" onClick={() => openPreview(group)}>
                        <p className="text-[13px] font-bold text-slate-800 hover:text-indigo-600 transition-colors line-clamp-2 leading-relaxed">{group.text}</p>
                        {group.isGroup && (
                          <div className="flex gap-2 items-center">
                            <Badge className="bg-amber-100 text-amber-700 border-none hover:bg-amber-100 shadow-none text-[10px] px-1.5 py-0 font-bold uppercase tracking-wider">Group</Badge>
                            <span className="text-[11px] font-bold text-slate-500">· {group.subQuestions.length} Qs</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="col-span-1">
                      <Badge className={`${group.part <= 4 ? 'bg-indigo-500' : 'bg-emerald-500'} text-white border-none shadow-sm rounded-lg px-2.5 py-0.5 text-[11px] font-bold hover:opacity-90`}>Part {group.part}</Badge>
                    </div>

                    <div className="col-span-1">
                      <Badge className={`${group.difficulty === 'Hard' ? 'bg-rose-500' : group.difficulty === 'Medium' ? 'bg-amber-500' : 'bg-emerald-500'} text-white border-none shadow-sm rounded-lg px-2.5 py-0.5 text-[11px] font-bold hover:opacity-90`}>{group.difficulty}</Badge>
                    </div>

                    <div className="col-span-1">
                      <Badge className="bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200 rounded-lg px-2.5 py-0.5 text-[11px] font-bold shadow-none">{group.topic}</Badge>
                    </div>

                    <div className="col-span-2 flex flex-wrap gap-1.5">
                      {group.usage.length > 0 ? (
                        group.usage.map((u, i) => (
                          <span key={i} className="text-[11px] font-bold text-slate-600 bg-white border border-slate-200 rounded-md px-2 py-0.5 shadow-sm">{u}</span>
                        ))
                      ) : (
                        <span className="text-[11px] font-bold text-slate-400 italic bg-slate-50 border border-slate-200 border-dashed rounded-md px-2 py-0.5">Unused</span>
                      )}
                    </div>

                    <div className="col-span-1 flex items-center justify-end gap-2 pr-2 text-slate-400">
                      <button onClick={() => openPreview(group)} className="hover:text-indigo-600 transition-colors p-1"><Eye className="w-4 h-4 stroke-[2.5]" /></button>
                      <button onClick={() => openEdit(group)} className="hover:text-amber-600 transition-colors p-1"><Edit2 className="w-4 h-4 stroke-[2.5]" /></button>
                      <button
                        onClick={() => handleDelete(group)}
                        disabled={isDeleting === group.id}
                        className="hover:text-rose-600 transition-colors p-1 disabled:opacity-50"
                      >
                        {isDeleting === group.id
                          ? <Loader2 className="w-4 h-4 animate-spin" />
                          : <Trash2 className="w-4 h-4 stroke-[2.5]" />}
                      </button>
                    </div>
                  </div>

                  {/* Child Rows (Accordion) */}
                  {isExpanded && group.isGroup && (
                    <div className="bg-slate-50/50 border-y border-slate-100 divide-y divide-slate-100/60">
                      {group.subQuestions.map((sq, idx) => (
                        <div key={sq.subId} className="grid grid-cols-12 gap-4 items-center py-3 px-4 pl-14 hover:bg-slate-100/50 transition-colors">
                          <div className="col-span-1 flex items-center gap-3">
                            <Checkbox 
                              checked={selectedIds.has(sq.subId)}
                              onCheckedChange={(c) => handleChildCheckbox(group.id, sq.subId, !!c)}
                              className="rounded border-slate-300 w-4 h-4 shadow-sm data-[state=checked]:bg-[#4f46e5] data-[state=checked]:border-[#4f46e5]" 
                            />
                          </div>
                          <div className="col-span-11 flex items-center gap-3">
                            <span className="text-[11px] font-bold text-slate-400 bg-white border border-slate-200 px-1.5 py-0.5 rounded-md shadow-sm">#{sq.subId}</span>
                            <span className="text-[13px] font-semibold text-slate-600">{idx + 1}. {sq.questionText}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
          
          {/* Pagination */}
          <div className="p-4 border-t border-slate-200 flex items-center justify-between text-[13px] font-bold text-slate-500 bg-white">
            <span>Showing {(currentPage - 1) * itemsPerPage + 1}-{Math.min(currentPage * itemsPerPage, filteredQuestions.length)} of {filteredQuestions.length}</span>
            <div className="flex gap-1.5">
              <Button 
                onClick={() => handlePageChange(Math.max(1, currentPage - 1))} 
                disabled={currentPage === 1}
                variant="outline" 
                size="sm" 
                className="h-8 px-3 rounded-lg border-slate-200 font-bold hover:bg-slate-50"
              >
                Previous
              </Button>
              {Array.from({length: totalPages}, (_, i) => i + 1).map(page => (
                <Button 
                  key={page}
                  onClick={() => handlePageChange(page)}
                  variant={currentPage === page ? "default" : "outline"} 
                  size="sm" 
                  className={`h-8 w-8 rounded-lg font-bold ${currentPage === page ? 'bg-[#4f46e5] hover:bg-[#4338ca] text-white shadow-sm' : 'border-slate-200 hover:bg-slate-50 text-slate-600'}`}
                >
                  {page}
                </Button>
              ))}
              <Button 
                onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))} 
                disabled={currentPage === totalPages || totalPages === 0}
                variant="outline" 
                size="sm" 
                className="h-8 px-3 rounded-lg border-slate-200 font-bold hover:bg-slate-50"
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* --- Overlay Modals --- */}
      
      {/* Drawer: Preview Question */}
      {isPreviewOpen && previewData && (
        <>
          <div className="fixed inset-0 bg-slate-900/40 z-50 transition-opacity backdrop-blur-sm" onClick={() => setIsPreviewOpen(false)}></div>
          <div className="fixed top-0 right-0 h-screen w-full max-w-[550px] bg-white shadow-2xl z-50 flex flex-col transform transition-transform animate-in slide-in-from-right duration-300">
            {/* Drawer Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-slate-50/80">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center shadow-sm">
                  <Eye className="w-5 h-5 stroke-[2.5]" />
                </div>
                <div>
                  <h2 className="text-[17px] font-extrabold text-slate-900">Preview Question Group</h2>
                  <p className="text-xs font-bold text-slate-500 mt-0.5">ID: #{previewData.id}</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setIsPreviewOpen(false)} className="rounded-full hover:bg-slate-200 text-slate-500">
                <X className="w-5 h-5" />
              </Button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
              {/* Info Badges & Title */}
              <div className="space-y-4">
                <div className="flex gap-2">
                  <Badge className="bg-indigo-500 text-white font-bold px-2.5 py-0.5 rounded-lg text-[11px] shadow-sm uppercase tracking-wider">Part {previewData.part}</Badge>
                  <Badge className={`${previewData.difficulty === 'Hard' ? 'bg-rose-500' : previewData.difficulty === 'Medium' ? 'bg-amber-500' : 'bg-emerald-500'} text-white font-bold px-2.5 py-0.5 rounded-lg text-[11px] shadow-sm uppercase tracking-wider`}>{previewData.difficulty}</Badge>
                  <Badge className="bg-slate-100 text-slate-600 border border-slate-200 font-bold px-2.5 py-0.5 rounded-lg text-[11px] shadow-sm uppercase tracking-wider">{previewData.topic}</Badge>
                </div>
                <h3 className="text-[15px] font-bold text-slate-800 leading-relaxed">{previewData.text}</h3>
              </div>

              {/* Shared Content Area */}
              {(previewData.sharedContent.audioUrl || previewData.sharedContent.passageText) && (
                <div className="space-y-4">
                  {previewData.sharedContent.audioUrl && (
                    <div className="bg-white border border-slate-200 rounded-2xl p-4 flex items-center gap-4 shadow-sm">
                      <button className="w-10 h-10 rounded-full bg-[#4f46e5] text-white flex items-center justify-center shrink-0 hover:bg-[#4338ca] transition-colors shadow-sm">
                        <PlayCircle className="w-5 h-5 ml-0.5" />
                      </button>
                      <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className="w-1/3 h-full bg-[#4f46e5] rounded-full"></div>
                      </div>
                      <span className="text-[11px] font-bold text-slate-500">0:45 / 2:30</span>
                    </div>
                  )}
                  {previewData.sharedContent.passageText && (
                    <div className="bg-amber-50 border border-amber-100 rounded-2xl p-5 shadow-sm">
                      <p className="text-xs font-bold text-amber-700 uppercase tracking-wider mb-2">Reading Passage</p>
                      <p className="text-[14px] text-slate-800 leading-relaxed font-medium whitespace-pre-wrap">
                        {previewData.sharedContent.passageText}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Sub Questions List */}
              <div className="space-y-6 pt-2">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-1 h-4 bg-indigo-600 rounded-full"></div>
                  <h4 className="text-[13px] font-bold text-slate-800 uppercase tracking-wider">Questions ({previewData.subQuestions.length})</h4>
                </div>
                
                {previewData.subQuestions.map((sq, index) => (
                  <div key={sq.subId} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                    <div className="bg-slate-50 p-4 border-b border-slate-100 flex gap-3 items-start">
                      <div className="w-7 h-7 rounded-lg bg-indigo-100 text-indigo-700 text-[13px] font-bold flex items-center justify-center shrink-0 shadow-sm">{index + 1}</div>
                      <p className="text-[14px] font-bold text-slate-800 pt-0.5 leading-snug">{sq.questionText}</p>
                    </div>
                    <div className="p-5 space-y-3">
                      {sq.options.map((opt, i) => {
                        const letter = String.fromCharCode(65 + i);
                        const isCorrect = sq.correctAnswer === letter;
                        return (
                          <div key={i} className={`flex items-center gap-3 p-3 rounded-xl border-2 transition-colors ${isCorrect ? 'bg-emerald-50 border-emerald-200' : 'bg-white border-slate-100'}`}>
                            <div className={`w-6 h-6 rounded-md flex items-center justify-center text-[11px] font-black shadow-sm ${isCorrect ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-500'}`}>
                              {letter}
                            </div>
                            <span className={`text-[14px] font-semibold ${isCorrect ? 'text-emerald-800' : 'text-slate-600'}`}>{opt}</span>
                            {isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-500 ml-auto" />}
                          </div>
                        );
                      })}
                      {/* Explanation Block */}
                      <div className="mt-5 p-4 bg-blue-50 border border-blue-100 rounded-xl">
                        <span className="text-[11px] font-black text-blue-700 uppercase tracking-wider block mb-1.5 flex items-center gap-1.5"><MessageCircle className="w-3.5 h-3.5"/> Explanation</span>
                        <span className="text-[13px] text-blue-800 font-medium leading-relaxed">{sq.explanation}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      {/* Drawer: Edit Question */}
      {isEditOpen && editData && (
        <>
          <div className="fixed inset-0 bg-slate-900/40 z-50 transition-opacity backdrop-blur-sm" onClick={() => setIsEditOpen(false)}></div>
          <div className="fixed top-0 right-0 h-screen w-full max-w-[600px] bg-white shadow-2xl z-50 flex flex-col transform transition-transform animate-in slide-in-from-right duration-300">
            {/* Drawer Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-slate-50/80">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center shadow-sm">
                  <Edit2 className="w-5 h-5 stroke-[2.5]" />
                </div>
                <div>
                  <h2 className="text-[17px] font-extrabold text-slate-900">Edit Question Group</h2>
                  <p className="text-xs font-bold text-slate-500 mt-0.5">ID: #{editData.id}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" onClick={() => setIsEditOpen(false)} className="rounded-xl font-bold">Cancel</Button>
                <Button onClick={handleSaveEdit} disabled={isSaving} className="rounded-xl bg-[#4f46e5] hover:bg-[#4338ca] text-white font-bold">
                  {isSaving ? <><Loader2 className="w-4 h-4 animate-spin mr-1" />Saving...</> : "Save Changes"}
                </Button>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
              {/* Basic Info */}
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Difficulty</label>
                    <select 
                      value={editData.difficulty}
                      onChange={(e) => setEditData({...editData, difficulty: e.target.value as any})}
                      className="w-full h-10 rounded-xl border border-slate-200 px-3 text-sm font-semibold bg-white"
                    >
                      <option value="Easy">Easy</option>
                      <option value="Medium">Medium</option>
                      <option value="Hard">Hard</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Topic</label>
                    <Input 
                      value={editData.topic}
                      onChange={(e) => setEditData({...editData, topic: e.target.value})}
                      className="h-10 rounded-xl border-slate-200 font-semibold"
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Group Text / Instruction</label>
                  <Input 
                    value={editData.text}
                    onChange={(e) => setEditData({...editData, text: e.target.value})}
                    className="h-10 rounded-xl border-slate-200 font-semibold"
                  />
                </div>
              </div>

              {/* Shared Content */}
              <div className="space-y-4">
                <h4 className="text-[13px] font-bold text-slate-800 uppercase tracking-wider border-b pb-2">Shared Content</h4>
                <div className="space-y-3">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500">Audio URL</label>
                    <Input 
                      value={editData.sharedContent.audioUrl || ""}
                      onChange={(e) => setEditData({
                        ...editData, 
                        sharedContent: {...editData.sharedContent, audioUrl: e.target.value}
                      })}
                      placeholder="e.g. /audio/sample.mp3"
                      className="rounded-xl border-slate-200"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500">Reading Passage</label>
                    <textarea 
                      value={editData.sharedContent.passageText || ""}
                      onChange={(e) => setEditData({
                        ...editData, 
                        sharedContent: {...editData.sharedContent, passageText: e.target.value}
                      })}
                      className="w-full rounded-xl border border-slate-200 p-3 min-h-[100px] text-sm"
                      placeholder="Enter passage text here..."
                    />
                  </div>
                </div>
              </div>

              {/* Sub Questions */}
              <div className="space-y-6">
                <h4 className="text-[13px] font-bold text-slate-800 uppercase tracking-wider border-b pb-2">Questions ({editData.subQuestions.length})</h4>
                
                {editData.subQuestions.map((sq, index) => (
                  <div key={sq.subId} className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 rounded-md bg-indigo-100 text-indigo-700 text-xs font-bold flex items-center justify-center">{index + 1}</div>
                      <span className="font-bold text-slate-600 text-sm">#{sq.subId}</span>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-500">Question Text</label>
                      <Input 
                        value={sq.questionText}
                        onChange={(e) => {
                          const newSubQs = [...editData.subQuestions];
                          newSubQs[index].questionText = e.target.value;
                          setEditData({...editData, subQuestions: newSubQs});
                        }}
                        className="rounded-xl border-slate-200"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500">Options</label>
                      {sq.options.map((opt, optIndex) => {
                        const letter = String.fromCharCode(65 + optIndex);
                        const isCorrect = sq.correctAnswer === letter;
                        return (
                          <div key={optIndex} className="flex items-center gap-3">
                            <button 
                              onClick={() => {
                                const newSubQs = [...editData.subQuestions];
                                newSubQs[index].correctAnswer = letter;
                                setEditData({...editData, subQuestions: newSubQs});
                              }}
                              className={`w-8 h-8 shrink-0 rounded-md font-bold text-xs transition-colors ${isCorrect ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-600 hover:bg-slate-300'}`}
                            >
                              {letter}
                            </button>
                            <Input 
                              value={opt}
                              onChange={(e) => {
                                const newSubQs = [...editData.subQuestions];
                                newSubQs[index].options[optIndex] = e.target.value;
                                setEditData({...editData, subQuestions: newSubQs});
                              }}
                              className={`rounded-xl ${isCorrect ? 'border-emerald-300 bg-emerald-50/30' : 'border-slate-200'}`}
                            />
                          </div>
                        );
                      })}
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-500">Explanation</label>
                      <textarea 
                        value={sq.explanation}
                        onChange={(e) => {
                          const newSubQs = [...editData.subQuestions];
                          newSubQs[index].explanation = e.target.value;
                          setEditData({...editData, subQuestions: newSubQs});
                        }}
                        className="w-full rounded-xl border border-slate-200 p-3 min-h-[80px] text-sm"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      {/* Dialog: Checkbox Selection Warning */}
      {confirmDialog && (
        <>
          <div className="fixed inset-0 bg-slate-900/40 z-[60] flex items-center justify-center backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200 m-4">
              <div className="p-8 text-center space-y-5">
                <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-2 shadow-inner">
                  <Users className="w-10 h-10 text-indigo-600" />
                </div>
                <div>
                  <h3 className="text-xl font-extrabold text-slate-900 mb-2">Group Question Selection</h3>
                  <p className="text-[15px] text-slate-600 font-medium leading-relaxed px-2">
                    Câu hỏi này thuộc nhóm <span className="font-bold text-slate-800">#{confirmDialog.parentId}</span>. Bạn có muốn tự động chọn toàn bộ câu hỏi trong nhóm này không?
                  </p>
                </div>
              </div>
              <div className="p-5 bg-slate-50 border-t border-slate-100 flex flex-col-reverse sm:flex-row gap-3 sm:justify-end">
                <Button variant="ghost" onClick={() => setConfirmDialog(null)} className="font-bold text-slate-500 hover:text-slate-700 hover:bg-slate-200 rounded-xl h-11">Cancel</Button>
                <Button variant="outline" onClick={() => confirmChildSelection(false)} className="bg-white font-bold border-slate-200 text-slate-700 rounded-xl h-11 hover:bg-slate-50 shadow-sm">Select this only</Button>
                <Button onClick={() => confirmChildSelection(true)} className="bg-[#4f46e5] hover:bg-[#4338ca] text-white font-bold rounded-xl h-11 shadow-sm">Agree (Select All)</Button>
              </div>
            </div>
          </div>
        </>
      )}
    </DashboardLayout>
  );
}
