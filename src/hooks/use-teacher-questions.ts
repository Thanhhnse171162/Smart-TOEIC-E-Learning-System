"use client";

import { useCallback, useEffect, useState } from "react";
import { USE_API } from "@/lib/api/config";
import { ApiError } from "@/lib/api/client";
import {
  apiGetTeacherQuestionById,
  apiGetTeacherQuestions,
} from "@/layers/data/api/resources.api";
import type { ApiTeacherQuestion } from "@/layers/data/api/types";

export type QuestionDifficulty = "Easy" | "Medium" | "Hard";

export interface SubQuestion {
  subId: string;
  questionText: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export interface QuestionGroup {
  id: string;
  questionId: number;
  isGroup: boolean;
  part: number;
  difficulty: QuestionDifficulty;
  topic: string;
  sharedContent: {
    audioUrl: string | null;
    passageText: string | null;
  };
  usage: string[];
  text: string;
  subQuestions: SubQuestion[];
}

function normalizeDifficulty(value: string): QuestionDifficulty {
  const v = value.toLowerCase();
  if (v === "easy") return "Easy";
  if (v === "hard") return "Hard";
  return "Medium";
}

function optionsFromApi(options: Record<string, string>) {
  return ["A", "B", "C", "D"].map((key) => options[key] ?? "");
}

function passageFromExplanation(part: number, explanation?: string | null) {
  if (part >= 6 && explanation?.trim()) return explanation;
  return null;
}

export function mapTeacherQuestion(q: ApiTeacherQuestion): QuestionGroup {
  const options = optionsFromApi(q.options);
  return {
    id: `Q${q.questionId}`,
    questionId: q.questionId,
    isGroup: false,
    part: q.part,
    difficulty: normalizeDifficulty(q.difficulty),
    topic: q.type ? q.type.charAt(0).toUpperCase() + q.type.slice(1) : "Reading",
    sharedContent: {
      audioUrl: q.audioUrl ?? null,
      passageText: passageFromExplanation(q.part, null),
    },
    usage: q.testId ? [`Test #${q.testId}`] : [],
    text: q.text || `Part ${q.part} question`,
    subQuestions: [
      {
        subId: `Q${q.questionId}`,
        questionText: q.text,
        options,
        correctAnswer: "A",
        explanation: "",
      },
    ],
  };
}

export async function enrichQuestionDetail(group: QuestionGroup): Promise<QuestionGroup> {
  try {
    const detail = await apiGetTeacherQuestionById(group.questionId);
    const options = optionsFromApi(detail.options);
    const passage = passageFromExplanation(detail.part, detail.explanation);
    return {
      ...group,
      difficulty: normalizeDifficulty(detail.difficulty),
      sharedContent: {
        audioUrl: detail.audioUrl ?? null,
        passageText: passage,
      },
      subQuestions: [
        {
          subId: `Q${detail.questionId}`,
          questionText: detail.text,
          options,
          correctAnswer: detail.correctAnswer,
          explanation: passage ? "" : detail.explanation ?? "",
        },
      ],
    };
  } catch {
    return group;
  }
}

export interface TeacherQuestionsFilters {
  part?: string;
  difficulty?: string;
  search?: string;
}

export function useTeacherQuestions(filters: TeacherQuestionsFilters = {}) {
  const [questions, setQuestions] = useState<QuestionGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [fromApi, setFromApi] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);

    if (!USE_API) {
      setQuestions([]);
      setFromApi(false);
      setLoading(false);
      return;
    }

    try {
      const data = await apiGetTeacherQuestions({
        part: filters.part && filters.part !== "all" ? Number(filters.part) : undefined,
        type: "reading",
        difficulty:
          filters.difficulty && filters.difficulty !== "all"
            ? filters.difficulty.toLowerCase()
            : undefined,
        search: filters.search?.trim() || undefined,
      });
      setQuestions(data.filter((q) => q.part >= 5).map(mapTeacherQuestion));
      setFromApi(true);
    } catch (e) {
      setQuestions([]);
      setFromApi(false);
      if (e instanceof ApiError && e.status === 401) {
        setError("Unauthorized — please login as Teacher (teacher@toeic.com) to access Question Bank.");
      } else {
        setError(e instanceof Error ? e.message : "Failed to load questions");
      }
    } finally {
      setLoading(false);
    }
  }, [filters.part, filters.difficulty, filters.search]);

  useEffect(() => {
    load();
  }, [load]);

  return { questions, setQuestions, loading, fromApi, error, refetch: load };
}
