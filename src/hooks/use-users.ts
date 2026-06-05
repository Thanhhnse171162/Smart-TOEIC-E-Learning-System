"use client";

import { useCallback, useEffect, useState } from "react";
import { USE_API } from "@/lib/api/config";
import { apiGetUsers, apiGetUsersByRole, apiUpdateUserStatus } from "@/layers/data/api/resources.api";
import { mapApiUser } from "@/layers/data/api/mappers";
import type { User } from "@/layers/domain/types";
import { mockUsers } from "@/layers/data/mock/data";

interface UseUsersOptions {
  role?: "Student" | "Teacher" | "Admin";
  excludeAdmin?: boolean;
}

export function useUsers(options?: UseUsersOptions) {
  const { role, excludeAdmin = false } = options ?? {};
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [fromApi, setFromApi] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    if (USE_API) {
      try {
        const data = role ? await apiGetUsersByRole(role) : await apiGetUsers();
        let mapped = data.map(mapApiUser);
        if (excludeAdmin) mapped = mapped.filter((u) => u.role !== "admin");
        setUsers(mapped);
        setFromApi(true);
        return;
      } catch {
        /* fallback */
      }
    }
    let filtered = role
      ? mockUsers.filter((u) => u.role === role.toLowerCase())
      : [...mockUsers];
    if (excludeAdmin) filtered = filtered.filter((u) => u.role !== "admin");
    setUsers(filtered.map((u) => ({ ...u, isActive: u.isActive ?? true })));
    setFromApi(false);
  }, [role, excludeAdmin]);

  useEffect(() => {
    load().finally(() => setLoading(false));
  }, [load]);

  const updateStatus = async (userId: string, isActive: boolean) => {
    if (USE_API) {
      await apiUpdateUserStatus(Number(userId), isActive);
    }
    setUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, isActive } : u))
    );
  };

  return { users, loading, fromApi, updateStatus, refetch: load };
}
