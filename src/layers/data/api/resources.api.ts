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
