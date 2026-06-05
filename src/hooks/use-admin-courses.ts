"use client";

import { useCallback, useEffect, useState } from "react";
import { USE_API } from "@/lib/api/config";
import { apiGetCourses, apiUpdateCourse } from "@/layers/data/api/resources.api";
import { mockCourses } from "@/layers/data/mock/data";

export interface AdminCourse {
  id: string;
  title: string;
  description: string;
  level: string;
  lessonsCount: number;
  studentsCount: number;
  price: number;
  status: "Active" | "Inactive";
}

function toAdminCourse(c: {
  id: string;
  title: string;
  description: string;
  level: string;
  lessonsCount: number;
  studentsCount: number;
  price?: number;
}): AdminCourse {
  return {
    ...c,
    price: c.price ?? 0,
    status: "Active",
  };
}

export function useAdminCourses() {
  const [courses, setCourses] = useState<AdminCourse[]>([]);
  const [loading, setLoading] = useState(true);
  const [fromApi, setFromApi] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    if (USE_API) {
      try {
        const data = await apiGetCourses();
        if (data.length > 0) {
          setCourses(
            data.map((c) =>
              toAdminCourse({
                id: String(c.courseId),
                title: c.title,
                description: c.description,
                level: c.level,
                lessonsCount: 0,
                studentsCount: 0,
                price: c.price,
              })
            )
          );
          setFromApi(true);
          return;
        }
      } catch {
        /* fallback */
      }
    }
    setCourses(
      mockCourses.map((c, i) =>
        toAdminCourse({
          ...c,
          price: [29, 39, 19][i] ?? 29,
        })
      )
    );
    setFromApi(false);
  }, []);

  useEffect(() => {
    load().finally(() => setLoading(false));
  }, [load]);

  const updateCourse = async (
    id: string,
    data: Partial<Pick<AdminCourse, "title" | "description" | "level" | "price" | "status">>
  ) => {
    if (USE_API && fromApi) {
      await apiUpdateCourse(Number(id), {
        title: data.title,
        description: data.description,
        level: data.level,
        price: data.price,
      });
    }
    setCourses((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...data } : c))
    );
  };

  return { courses, loading, fromApi, updateCourse, refetch: load };
}
