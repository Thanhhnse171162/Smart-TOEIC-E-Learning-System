// ============================================================
// DOMAIN LAYER - Shared types and entities
// ============================================================

export type UserRole = "student" | "teacher" | "admin";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  toeicScore?: number;
  isActive?: boolean;
  createdAt: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  level: "beginner" | "intermediate" | "advanced";
  lessonsCount: number;
  studentsCount: number;
  thumbnail?: string;
}

export interface Question {
  id: string;
  part: number;
  type: "listening" | "reading";
  text: string;
  audioUrl?: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

export interface MockTest {
  id: string;
  title: string;
  duration: number;
  totalQuestions: number;
  questions: Question[];
}

export interface VocabularyWord {
  id: string;
  word: string;
  meaning: string;
  example: string;
  topic: VocabularyTopic;
  pronunciation?: string;
  isFavorite?: boolean;
}

export type VocabularyTopic =
  | "business"
  | "marketing"
  | "finance"
  | "office"
  | "travel"
  | "technology";

export interface TestResult {
  id: string;
  userId: string;
  testId: string;
  totalScore: number;
  listeningScore: number;
  readingScore: number;
  correctAnswers: number;
  incorrectAnswers: number;
  completedAt: string;
}

export interface DashboardStats {
  currentScore: number;
  weeklyStudyHours: number;
  completedLessons: number;
  vocabularyLearned: number;
  learningStreak: number;
}

export interface Activity {
  id: string;
  type: string;
  title: string;
  description: string;
  timestamp: string;
}

export interface LearningGoal {
  id: string;
  title: string;
  targetDate: string;
  progress: number;
  completed: boolean;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

export interface ChatSession {
  id: string;
  title: string;
  messages: ChatMessage[];
  createdAt: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: number;
  period: string;
  features: string[];
  popular?: boolean;
  current?: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  score: number;
  quote: string;
  avatar?: string;
}

export interface LeaderboardEntry {
  rank: number;
  name: string;
  score: number;
  avatar?: string;
}

export interface AdminStats {
  totalUsers: number;
  activeStudents: number;
  totalRevenue: number;
  totalTests: number;
}

export interface TeacherAnalytics {
  averageScore: number;
  completionRate: number;
  difficultQuestions: { id: string; text: string; errorRate: number }[];
}

export interface Payment {
  id: string;
  user: string;
  amount: number;
  plan: string;
  date: string;
  status: "completed" | "pending" | "failed";
}
