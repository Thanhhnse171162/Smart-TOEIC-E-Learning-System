"use client";

import { useEffect, useState } from "react";
import { USE_API } from "@/lib/api/config";
import { apiGetUsers, apiGetUsersByRole } from "@/layers/data/api/resources.api";
import { mapApiUser } from "@/layers/data/api/mappers";
import type { User } from "@/layers/domain/types";
import { mockUsers } from "@/layers/data/mock/data";

export function useUsers(role?: "Student" | "Teacher" | "Admin") {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [fromApi, setFromApi] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      if (USE_API) {
        try {
          const data = role
            ? await apiGetUsersByRole(role)
            : await apiGetUsers();
          if (!cancelled) {
            setUsers(data.map(mapApiUser));
            setFromApi(true);
            return;
          }
        } catch {
          /* fallback */
        }
      }
      if (!cancelled) {
        const filtered = role
          ? mockUsers.filter((u) => u.role === role.toLowerCase())
          : mockUsers;
        setUsers(filtered);
        setFromApi(false);
      }
    }

    load().finally(() => {
      if (!cancelled) setLoading(false);
    });

    return () => {
      cancelled = true;
    };
  }, [role]);

  return { users, loading, fromApi };
}
