import { apiRequest } from "@/lib/api/client";
import type {
  ApiCourse,
  ApiQuestion,
  ApiTOEICTest,
  ApiUser,
  ApiVocabulary,
  ApiTeacherQuestion,
  ApiTeacherQuestionCreatePayload,
  ApiTeacherQuestionUpdatePayload,
} from "@/layers/data/api/types";

export async function apiGetUsers() {
  return apiRequest<ApiUser[]>("/api/users");
}

export async function apiGetUsersByRole(role: string) {
  return apiRequest<ApiUser[]>(`/api/users/role/${role}`);
}

export async function apiGetCourses() {
  return apiRequest<ApiCourse[]>("/api/courses");
}

export async function apiUpdateCourse(
  id: number,
  data: { title?: string; description?: string; level?: string; price?: number }
) {
  return apiRequest<{ message: string }>(`/api/courses/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
    auth: true,
  });
}

export async function apiGetVocabularies() {
  return apiRequest<ApiVocabulary[]>("/api/vocabularies");
}

export async function apiGetVocabulariesByTopic(topic: string) {
  return apiRequest<ApiVocabulary[]>(
    `/api/vocabularies/topic/${encodeURIComponent(topic)}`
  );
}

export async function apiGetQuestionsByPart(part: number) {
  return apiRequest<ApiQuestion[]>(`/api/questions/part/${part}`);
}

export async function apiGetTOEICTests() {
  return apiRequest<ApiTOEICTest[]>("/api/toeictests");
}

export async function apiCreateTOEICTest(data: {
  title: string;
  description: string;
  duration: number;
  totalQuestions: number;
  testType: string;
  createdByUserId: number;
}) {
  return apiRequest<ApiTOEICTest>("/api/toeictests", {
    method: "POST",
    body: JSON.stringify(data),
    auth: true,
  });
}

export async function apiUpdateTOEICTest(
  id: number,
  data: { title?: string; description?: string; duration?: number; totalQuestions?: number }
) {
  return apiRequest<{ message: string }>(`/api/toeictests/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
    auth: true,
  });
}

export async function apiDeleteTOEICTest(id: number) {
  return apiRequest<{ message: string }>(`/api/toeictests/${id}`, {
    method: "DELETE",
    auth: true,
  });
}

export async function apiUpdateUserStatus(userId: number, isActive: boolean) {
  return apiRequest<{ message: string }>(`/api/users/${userId}`, {
    method: "PUT",
    body: JSON.stringify({ isActive }),
    auth: true,
  });
}

// ============================================================
// Teacher Question Bank APIs
// ============================================================

/** GET /api/teacher/questions */
export async function apiGetTeacherQuestions(params?: {
  part?: number;
  difficulty?: string;
  search?: string;
  page?: number;
  pageSize?: number;
}) {
  const query = new URLSearchParams();
  if (params?.part !== undefined) query.set("part", String(params.part));
  if (params?.difficulty) query.set("difficulty", params.difficulty);
  if (params?.search) query.set("search", params.search);
  if (params?.page !== undefined) query.set("page", String(params.page));
  if (params?.pageSize !== undefined) query.set("pageSize", String(params.pageSize));
  const qs = query.toString();
  return apiRequest<ApiTeacherQuestion[]>(
    `/api/teacher/questions${qs ? `?${qs}` : ""}`,
    { auth: true }
  );
}

/** GET /api/teacher/questions/{id} */
export async function apiGetTeacherQuestionById(id: number) {
  return apiRequest<ApiTeacherQuestion>(`/api/teacher/questions/${id}`, {
    auth: true,
  });
}

/** POST /api/teacher/questions */
export async function apiCreateTeacherQuestion(
  data: ApiTeacherQuestionCreatePayload
) {
  return apiRequest<ApiTeacherQuestion>("/api/teacher/questions", {
    method: "POST",
    body: JSON.stringify(data),
    auth: true,
  });
}

/** PUT /api/teacher/questions/{id} */
export async function apiUpdateTeacherQuestion(
  id: number,
  data: ApiTeacherQuestionUpdatePayload
) {
  return apiRequest<ApiTeacherQuestion>(`/api/teacher/questions/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
    auth: true,
  });
}

/** DELETE /api/teacher/questions/{id} */
export async function apiDeleteTeacherQuestion(id: number) {
  return apiRequest<{ message: string }>(`/api/teacher/questions/${id}`, {
    method: "DELETE",
    auth: true,
  });
}

/** POST /api/teacher/questions/{id}/audio — Upload audio (multipart/form-data) */
export async function apiUploadTeacherQuestionAudio(id: number, audioFile: File) {
  const formData = new FormData();
  formData.append("audio", audioFile);
  const token = typeof window !== "undefined" ? (localStorage.getItem("accessToken") ?? "") : "";
  const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? "";
  const res = await fetch(`${baseUrl}/api/teacher/questions/${id}/audio`, {
    method: "POST",
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    body: formData,
    cache: "no-store",
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.message ?? res.statusText);
  }
  return res.json() as Promise<{ audioUrl: string }>;
}

/** GET /api/teacher/questions/export — Download export file */
export async function apiExportTeacherQuestions(params?: { part?: number }) {
  const query = new URLSearchParams();
  if (params?.part !== undefined) query.set("part", String(params.part));
  const qs = query.toString();
  const token = typeof window !== "undefined" ? (localStorage.getItem("accessToken") ?? "") : "";
  const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? "";
  const res = await fetch(
    `${baseUrl}/api/teacher/questions/export${qs ? `?${qs}` : ""}`,
    { headers: token ? { Authorization: `Bearer ${token}` } : {}, cache: "no-store" }
  );
  if (!res.ok) throw new Error(res.statusText);
  const blob = await res.blob();
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  const disposition = res.headers.get("content-disposition");
  const filename = disposition
    ? (disposition.split("filename=")[1]?.replace(/"/g, "") ?? "questions_export")
    : "questions_export";
  a.download = filename;
  a.click();
  window.URL.revokeObjectURL(url);
}

/** POST /api/teacher/questions/import — Import questions from file */
export async function apiImportTeacherQuestions(file: File) {
  const formData = new FormData();
  formData.append("file", file);
  const token = typeof window !== "undefined" ? (localStorage.getItem("toeic_access_token") ?? "") : "";
  const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? "";
  const res = await fetch(`${baseUrl}/api/teacher/questions/import`, {
    method: "POST",
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    body: formData,
    cache: "no-store",
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.message ?? res.statusText);
  }
  return res.json() as Promise<{ imported: number, message?: string }>;
}
