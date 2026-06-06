import type { Course, User, UserRole, VocabularyWord, VocabularyTopic } from "@/layers/domain/types";
import type { ApiCourse, ApiUser, ApiVocabulary } from "@/layers/data/api/types";

export function mapRole(role: string): UserRole {
  const r = role.toLowerCase();
  if (r === "admin" || r === "teacher" || r === "student") return r;
  return "student";
}

export function mapApiUser(u: ApiUser): User {
  return {
    id: String(u.userId),
    name: u.fullName,
    email: u.email,
    role: mapRole(u.role),
    avatar: u.avatar ?? undefined,
    isActive: u.isActive,
    createdAt: u.createdDate,
  };
}

export function mapApiCourse(c: ApiCourse): Course {
  const level = c.level.toLowerCase();
  const validLevel =
    level === "beginner" || level === "intermediate" || level === "advanced"
      ? level
      : "intermediate";

  return {
    id: String(c.courseId),
    title: c.title,
    description: c.description,
    level: validLevel,
    lessonsCount: 0,
    studentsCount: 0,
  };
}

export function mapApiVocabulary(v: ApiVocabulary): VocabularyWord {
  const topic = v.topic.toLowerCase() as VocabularyTopic;
  return {
    id: String(v.vocabId),
    word: v.word,
    meaning: v.meaning,
    example: v.example ?? "",
    topic:
      topic === "business" ||
      topic === "marketing" ||
      topic === "finance" ||
      topic === "office" ||
      topic === "travel" ||
      topic === "technology"
        ? topic
        : "business",
    pronunciation: v.audioUrl ?? undefined,
    isFavorite: false,
  };
}

export function mapQuestionOptions(q: {
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
}): string[] {
  return [q.optionA, q.optionB, q.optionC, q.optionD];
}

export function answerLetterToIndex(letter: string): number {
  const map: Record<string, number> = { A: 0, B: 1, C: 2, D: 3 };
  return map[letter.toUpperCase()] ?? 0;
}
