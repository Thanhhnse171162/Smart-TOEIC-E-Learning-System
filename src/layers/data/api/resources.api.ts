import { apiRequest } from "@/lib/api/client";
import type { ApiCourse, ApiQuestion, ApiTOEICTest, ApiUser, ApiVocabulary } from "@/layers/data/api/types";

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
