import { apiRequest } from "@/lib/api/client";
import type { CreateTeacherQuestionPayload } from "@/lib/teacher-questions-api";
import type {
  ApiCourse,
  ApiQuestion,
  ApiTeacherQuestion,
  ApiTeacherQuestionDetail,
  ApiTOEICTest,
  ApiUser,
  ApiVocabulary,
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

export async function apiGetTeacherQuestions(params?: {
  part?: number;
  type?: string;
  difficulty?: string;
  search?: string;
}) {
  const query = new URLSearchParams();
  if (params?.part) query.set("part", String(params.part));
  if (params?.type) query.set("type", params.type);
  if (params?.difficulty) query.set("difficulty", params.difficulty);
  if (params?.search) query.set("search", params.search);
  const qs = query.toString();
  return apiRequest<ApiTeacherQuestion[]>(`/api/teacher/questions${qs ? `?${qs}` : ""}`, {
    auth: true,
  });
}

export async function apiGetTeacherQuestionById(id: number) {
  return apiRequest<ApiTeacherQuestionDetail>(`/api/teacher/questions/${id}`, { auth: true });
}

export async function apiUpdateTeacherQuestion(
  id: number,
  data: Record<string, unknown>
) {
  return apiRequest<ApiTeacherQuestionDetail>(`/api/teacher/questions/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
    auth: true,
  });
}

export async function apiDeleteTeacherQuestion(id: number) {
  return apiRequest<{ message: string }>(`/api/teacher/questions/${id}`, {
    method: "DELETE",
    auth: true,
  });
}

export async function apiCreateTeacherQuestion(data: CreateTeacherQuestionPayload) {
  return apiRequest<ApiTeacherQuestionDetail>("/api/teacher/questions", {
    method: "POST",
    body: JSON.stringify(data),
    auth: true,
  });
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
