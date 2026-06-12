import { useState, useCallback, useEffect } from "react";
import type { ApiTeacherQuestion } from "@/layers/data/api/types";
import {
  apiGetTeacherQuestions,
  apiGetTeacherQuestionById,
  apiUpdateTeacherQuestion,
  apiDeleteTeacherQuestion,
  apiExportTeacherQuestions,
} from "@/layers/data/api/resources.api";

export type { ApiTeacherQuestion };

// Map API flat question → UI display shape
export function mapApiQuestion(q: ApiTeacherQuestion) {
  const optionValues = Object.values(q.options ?? {});
  return {
    id: String(q.questionId),
    questionId: q.questionId,
    part: q.part,
    difficulty: (q.difficulty ?? "Medium") as "Easy" | "Medium" | "Hard",
    topic: q.type ?? "General",
    text: q.text ?? "",
    audioUrl: q.audioUrl ?? null,
    imageUrl: q.imageUrl ?? null,
    options: optionValues,
    updatedDate: q.updatedDate,
  };
}

export type MappedQuestion = ReturnType<typeof mapApiQuestion>;

export function useTeacherQuestions(filters: {
  part: string;
  difficulty: string;
  search: string;
}) {
  const [questions, setQuestions] = useState<MappedQuestion[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchQuestions = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const params: Parameters<typeof apiGetTeacherQuestions>[0] = {};
      if (filters.part !== "all") params.part = Number(filters.part);
      if (filters.difficulty !== "all") params.difficulty = filters.difficulty;
      if (filters.search.trim()) params.search = filters.search.trim();

      const data = await apiGetTeacherQuestions(params);
      setQuestions(data.map(mapApiQuestion));
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Failed to load questions");
    } finally {
      setIsLoading(false);
    }
  }, [filters.part, filters.difficulty, filters.search]);

  useEffect(() => {
    fetchQuestions();
  }, [fetchQuestions]);

  // GET single question for Preview
  const fetchQuestionDetail = useCallback(async (id: number) => {
    return apiGetTeacherQuestionById(id);
  }, []);

  // PUT — Edit save
  const updateQuestion = useCallback(
    async (id: number, data: { difficulty?: string; topic?: string; text?: string; audioUrl?: string | null }) => {
      await apiUpdateTeacherQuestion(id, {
        difficulty: data.difficulty,
        type: data.topic,
        text: data.text,
        audioUrl: data.audioUrl,
      });
      await fetchQuestions();
    },
    [fetchQuestions]
  );

  // DELETE
  const deleteQuestion = useCallback(
    async (id: number) => {
      await apiDeleteTeacherQuestion(id);
      setQuestions((prev) => prev.filter((q) => q.questionId !== id));
    },
    []
  );

  // Export
  const exportQuestions = useCallback(async (part?: number) => {
    await apiExportTeacherQuestions(part !== undefined ? { part } : undefined);
  }, []);

  return {
    questions,
    isLoading,
    error,
    refetch: fetchQuestions,
    fetchQuestionDetail,
    updateQuestion,
    deleteQuestion,
    exportQuestions,
  };
}
