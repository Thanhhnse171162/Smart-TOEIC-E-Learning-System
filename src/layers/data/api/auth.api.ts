import { apiRequest } from "@/lib/api/client";
import type { ApiLoginResponse, ApiRegisterResponse } from "@/layers/data/api/types";

export async function apiLogin(email: string, password: string) {
  return apiRequest<ApiLoginResponse>("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export async function apiRegister(data: {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  role?: string;
}) {
  return apiRequest<ApiRegisterResponse>("/api/auth/register", {
    method: "POST",
    body: JSON.stringify({
      fullName: data.fullName,
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword,
      role: data.role ?? "Student",
    }),
  });
}

export async function apiGetMe() {
  return apiRequest<{
    userId: number;
    fullName: string;
    email: string;
    role: string;
    avatar?: string | null;
    isActive: boolean;
    createdDate: string;
  }>("/api/auth/me", { auth: true });
}

export async function apiLogout() {
  return apiRequest<{ message: string }>("/api/auth/logout", {
    method: "POST",
    auth: true,
  });
}
