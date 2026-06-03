"use client";

import { useEffect, useState } from "react";
import { USE_API } from "@/lib/api/config";
import { apiGetCourses } from "@/layers/data/api/resources.api";
import { mapApiCourse } from "@/layers/data/api/mappers";
import type { Course } from "@/layers/domain/types";
import { mockCourses } from "@/layers/data/mock/data";

export function useCourses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [fromApi, setFromApi] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      if (USE_API) {
        try {
          const data = await apiGetCourses();
          if (!cancelled) {
            const mapped = data.map(mapApiCourse);
            setCourses(mapped.length > 0 ? mapped : mockCourses);
            setFromApi(mapped.length > 0);
            return;
          }
        } catch {
          /* fallback */
        }
      }
      if (!cancelled) {
        setCourses(mockCourses);
        setFromApi(false);
      }
    }

    load().finally(() => {
      if (!cancelled) setLoading(false);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  return { courses, loading, fromApi };
}
