import { API_BASE_URL } from "@/lib/api/config";
import { getAccessToken } from "@/lib/auth/session";
import { ApiError } from "@/lib/api/client";
import type { ApiTeacherQuestionDetail } from "@/layers/data/api/types";

export type CreateTeacherQuestionPayload = {
  part: number;
  type?: string;
  difficulty?: string;
  text?: string;
  questionText?: string;
  optionA?: string;
  optionB?: string;
  optionC?: string;
  optionD?: string;
  correctAnswer: string;
  explanation?: string;
  testId?: number | null;
  questionOrder?: number;
};

export function buildReadingQuestionPayload(input: {
  part: number;
  difficulty: string;
  questionText: string;
  options: string[];
  correctIndex: number;
  explanation?: string;
  questionOrder?: number;
  testId?: number | null;
}): CreateTeacherQuestionPayload {
  const letter = String.fromCharCode(65 + input.correctIndex);
  return {
    part: input.part,
    type: "reading",
    difficulty: input.difficulty.toLowerCase(),
    text: input.questionText,
    questionText: input.questionText,
    optionA: input.options[0] ?? "",
    optionB: input.options[1] ?? "",
    optionC: input.options[2] ?? "",
    optionD: input.options[3] ?? "",
    correctAnswer: letter,
    explanation: input.explanation,
    questionOrder: input.questionOrder,
    testId: input.testId ?? null,
  };
}

export async function downloadTeacherQuestionsExport(params?: {
  part?: number;
  type?: string;
  difficulty?: string;
  search?: string;
}) {
  const query = new URLSearchParams();
  if (params?.part) query.set("part", String(params.part));
  if (params?.type) query.set("type", params.type);
  if (params?.difficulty) query.set("difficulty", params.difficulty);
  if (params?.search) query.set("search", params.search);
  const qs = query.toString();

  const token = getAccessToken();
  const res = await fetch(
    `${API_BASE_URL}/api/teacher/questions/export${qs ? `?${qs}` : ""}`,
    {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      cache: "no-store",
    }
  );

  if (!res.ok) {
    let message = res.statusText;
    try {
      const body = await res.json();
      message = body.message ?? message;
    } catch {
      /* ignore */
    }
    throw new ApiError(message, res.status);
  }

  const blob = await res.blob();
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `teacher-question-bank-${Date.now()}.csv`;
  link.click();
  URL.revokeObjectURL(url);
}

export function mapDetailToUpdatePayload(
  detail: ApiTeacherQuestionDetail,
  overrides: Partial<CreateTeacherQuestionPayload> = {}
): CreateTeacherQuestionPayload {
  return {
    part: detail.part,
    type: detail.type || "reading",
    difficulty: detail.difficulty,
    text: detail.text,
    questionText: detail.text,
    optionA: detail.options.A ?? "",
    optionB: detail.options.B ?? "",
    optionC: detail.options.C ?? "",
    optionD: detail.options.D ?? "",
    correctAnswer: detail.correctAnswer,
    explanation: detail.explanation ?? undefined,
    testId: detail.testId ?? null,
    questionOrder: detail.questionOrder,
    ...overrides,
  };
}
