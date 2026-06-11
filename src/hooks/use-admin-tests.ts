"use client";

import { useCallback, useEffect, useState } from "react";
import { USE_API } from "@/lib/api/config";
import {
  apiCreateTOEICTest,
  apiDeleteTOEICTest,
  apiGetTOEICTests,
  apiUpdateTOEICTest,
} from "@/layers/data/api/resources.api";

export interface AdminTest {
  id: string;
  title: string;
  description: string;
  duration: number;
  totalQuestions: number;
  testType: string;
  attempts: number;
  avgScore: number;
  status: "Active" | "Inactive";
  createdDate?: string;
}

const MOCK_TESTS: AdminTest[] = [
  {
    id: "t1",
    title: "Full Mock Test #1",
    description: "Complete 200-question TOEIC simulation",
    duration: 120,
    totalQuestions: 200,
    testType: "Full",
    attempts: 1250,
    avgScore: 742,
    status: "Active",
  },
  {
    id: "t2",
    title: "Listening Practice Set A",
    description: "Focused listening practice — Parts 1–4",
    duration: 45,
    totalQuestions: 100,
    testType: "Listening",
    attempts: 890,
    avgScore: 680,
    status: "Active",
  },
  {
    id: "t3",
    title: "Reading Mini Test",
    description: "Quick reading assessment — Parts 5–7",
    duration: 35,
    totalQuestions: 54,
    testType: "Reading",
    attempts: 456,
    avgScore: 710,
    status: "Active",
  },
];

function fromApi(t: {
  testId: number;
  title: string;
  description: string;
  duration: number;
  totalQuestions: number;
  testType: string;
  createdDate: string;
}): AdminTest {
  return {
    id: String(t.testId),
    title: t.title,
    description: t.description,
    duration: t.duration,
    totalQuestions: t.totalQuestions,
    testType: t.testType,
    attempts: 0,
    avgScore: 0,
    status: "Active",
    createdDate: t.createdDate,
  };
}

export function useAdminTests() {
  const [tests, setTests] = useState<AdminTest[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFromApi, setIsFromApi] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    if (USE_API) {
      try {
        const data = await apiGetTOEICTests();
        if (data.length > 0) {
          setTests(data.map(fromApi));
          setIsFromApi(true);
          return;
        }
      } catch {
        /* fallback */
      }
    }
    setTests(MOCK_TESTS);
    setIsFromApi(false);
  }, []);

  useEffect(() => {
    load().finally(() => setLoading(false));
  }, [load]);

  const updateTest = async (
    id: string,
    data: Partial<
      Pick<AdminTest, "title" | "description" | "duration" | "totalQuestions" | "testType" | "status">
    >
  ) => {
    if (USE_API && isFromApi) {
      await apiUpdateTOEICTest(Number(id), {
        title: data.title,
        description: data.description,
        duration: data.duration,
        totalQuestions: data.totalQuestions,
      });
    }
    setTests((prev) => prev.map((t) => (t.id === id ? { ...t, ...data } : t)));
  };

  const createTest = async (
    data: Omit<AdminTest, "id" | "attempts" | "avgScore" | "status" | "createdDate">,
    createdByUserId: number
  ) => {
    if (USE_API) {
      const created = await apiCreateTOEICTest({
        title: data.title,
        description: data.description,
        duration: data.duration,
        totalQuestions: data.totalQuestions,
        testType: data.testType,
        createdByUserId,
      });
      const row = fromApi(created);
      setTests((prev) => [...prev, row]);
      setIsFromApi(true);
      return row;
    }
    const row: AdminTest = {
      ...data,
      id: `t${Date.now()}`,
      attempts: 0,
      avgScore: 0,
      status: "Active",
    };
    setTests((prev) => [...prev, row]);
    return row;
  };

  const deleteTest = async (id: string) => {
    if (USE_API && isFromApi) {
      await apiDeleteTOEICTest(Number(id));
    }
    setTests((prev) => prev.filter((t) => t.id !== id));
  };

  return { tests, loading, isFromApi, updateTest, createTest, deleteTest, refetch: load };
}
