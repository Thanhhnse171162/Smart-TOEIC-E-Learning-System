"use client";

import { apiLogin, apiRegister } from "@/layers/data/api/auth.api";
import { saveSession, type StoredUser } from "@/lib/auth/session";
import { getDashboardPathByRole } from "@/lib/auth/routes";

export async function loginWithApi(email: string, password: string) {
  const res = await apiLogin(email, password);
  const user: StoredUser = {
    userId: res.userId,
    fullName: res.fullName,
    email: res.email,
    role: res.role,
  };
  saveSession({
    accessToken: res.accessToken,
    refreshToken: res.refreshToken,
    user,
  });
  return { user, redirectTo: getDashboardPathByRole(res.role) };
}

export async function registerWithApi(data: {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  role?: string;
}) {
  await apiRegister(data);
  return loginWithApi(data.email, data.password);
}
