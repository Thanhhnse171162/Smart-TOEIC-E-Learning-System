// Backend API response types (ASP.NET DTOs)

export interface ApiLoginResponse {
  userId: number;
  fullName: string;
  email: string;
  role: string;
  accessToken: string;
  refreshToken: string;
  expiresIn: string;
}

export interface ApiRegisterResponse {
  userId: number;
  fullName: string;
  email: string;
  role: string;
  message: string;
}

export interface ApiUser {
  userId: number;
  fullName: string;
  email: string;
  role: string;
  avatar?: string | null;
  isActive: boolean;
  createdDate: string;
}

export interface ApiCourse {
  courseId: number;
  title: string;
  description: string;
  level: string;
  price: number;
  instructorId: number;
  createdDate: string;
}

export interface ApiVocabulary {
  vocabId: number;
  word: string;
  meaning: string;
  example?: string | null;
  topic: string;
  imageUrl?: string | null;
  audioUrl?: string | null;
  difficulty: number;
}

export interface ApiQuestion {
  questionId: number;
  testId: number;
  part: number;
  questionText: string;
  audioUrl?: string | null;
  imageUrl?: string | null;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  questionOrder: number;
}

// Teacher Question Bank — matches actual backend response
export interface ApiTeacherQuestion {
  questionId: number;
  testId: number;
  createdByUserId: number;
  part: number;
  type: string;           // "listening" | "reading"
  difficulty: string;     // "Easy" | "Medium" | "Hard"
  text: string;
  options: Record<string, string>; // { additionalProp1: "A text", ... }
  audioUrl?: string | null;
  imageUrl?: string | null;
  questionOrder: number;
  createdDate: string;
  updatedDate: string;
}

export interface ApiTeacherQuestionCreatePayload {
  part: number;
  type: string;
  difficulty: string;
  text: string;
  options: Record<string, string>;
  audioUrl?: string | null;
  imageUrl?: string | null;
  questionOrder?: number;
}

export interface ApiTeacherQuestionUpdatePayload {
  part?: number;
  type?: string;
  difficulty?: string;
  text?: string;
  options?: Record<string, string>;
  audioUrl?: string | null;
  imageUrl?: string | null;
}

export interface ApiTOEICTest {
  testId: number;
  title: string;
  description: string;
  duration: number;
  totalQuestions: number;
  testType: string;
  createdByUserId: number;
  createdDate: string;
}
