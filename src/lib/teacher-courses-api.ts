import { apiRequest } from "@/lib/api/client";

export interface ApiCourseLesson {
  lessonId: number;
  courseId: number;
  title: string;
  description: string;
  videoUrl?: string;
  orderNumber: number;
}

export interface ApiTeacherCourse {
  courseId: number;
  title: string;
  description: string;
  level: string;
  price: number;
  instructorId: number;
  lessonsCount: number;
  createdDate: string;
  updatedDate: string | null;
  lessons?: ApiCourseLesson[];
  status?: string; // Adding status if the frontend needs it or if backend returns it
}

export interface CreateTeacherCoursePayload {
  title: string;
  description: string;
  level: string;
  price: number;
}

export interface UpdateTeacherCoursePayload {
  title?: string;
  description?: string;
  level?: string;
  price?: number;
  status?: string;
}

export interface CreateCourseLessonPayload {
  title: string;
  description: string;
  videoUrl?: string;
  orderNumber?: number;
}

// 1. Get all courses for teacher
export async function apiGetTeacherCourses() {
  return apiRequest<ApiTeacherCourse[]>("/api/teacher/courses", { auth: true });
}

// 2. Get specific course by ID
export async function apiGetTeacherCourseById(id: number | string) {
  return apiRequest<ApiTeacherCourse>(`/api/teacher/courses/${id}`, { auth: true });
}

// 3. Create a new course
export async function apiCreateTeacherCourse(data: CreateTeacherCoursePayload) {
  return apiRequest<ApiTeacherCourse>("/api/teacher/courses", {
    method: "POST",
    body: JSON.stringify(data),
    auth: true,
  });
}

// 4. Update a course
export async function apiUpdateTeacherCourse(id: number | string, data: UpdateTeacherCoursePayload) {
  return apiRequest<ApiTeacherCourse>(`/api/teacher/courses/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
    auth: true,
  });
}

// 5. Delete a course
export async function apiDeleteTeacherCourse(id: number | string) {
  return apiRequest<{ message: string }>(`/api/teacher/courses/${id}`, {
    method: "DELETE",
    auth: true,
  });
}

// 6. Get lessons for a course
export async function apiGetCourseLessons(courseId: number | string) {
  return apiRequest<ApiCourseLesson[]>(`/api/teacher/courses/${courseId}/lessons`, { auth: true });
}

// 7. Add a lesson to a course
export async function apiCreateCourseLesson(courseId: number | string, data: CreateCourseLessonPayload) {
  return apiRequest<ApiCourseLesson>(`/api/teacher/courses/${courseId}/lessons`, {
    method: "POST",
    body: JSON.stringify(data),
    auth: true,
  });
}

// 8. Update a lesson
export async function apiUpdateCourseLesson(courseId: number | string, lessonId: number | string, data: Partial<CreateCourseLessonPayload>) {
  return apiRequest<ApiCourseLesson>(`/api/teacher/courses/${courseId}/lessons/${lessonId}`, {
    method: "PUT",
    body: JSON.stringify(data),
    auth: true,
  });
}

// 9. Delete a lesson
export async function apiDeleteCourseLesson(courseId: number | string, lessonId: number | string) {
  return apiRequest<{ message: string }>(`/api/teacher/courses/${courseId}/lessons/${lessonId}`, {
    method: "DELETE",
    auth: true,
  });
}
