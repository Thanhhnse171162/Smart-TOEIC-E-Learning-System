// ============================================================
// BUSINESS LOGIC LAYER - Services
// ============================================================

import {
  AdminRepository,
  ChatRepository,
  CourseRepository,
  DashboardRepository,
  LandingRepository,
  MockTestRepository,
  PracticeRepository,
  ProgressRepository,
  TeacherRepository,
  UserRepository,
  VocabularyRepository,
} from "@/layers/data/repositories";
import type { User } from "@/layers/domain/types";

const userRepo = new UserRepository();
const dashboardRepo = new DashboardRepository();
const practiceRepo = new PracticeRepository();
const mockTestRepo = new MockTestRepository();
const vocabularyRepo = new VocabularyRepository();
const chatRepo = new ChatRepository();
const progressRepo = new ProgressRepository();
const landingRepo = new LandingRepository();
const courseRepo = new CourseRepository();
const adminRepo = new AdminRepository();
const teacherRepo = new TeacherRepository();

export class AuthService {
  async login(email: string, _password: string): Promise<User | null> {
    const user = await userRepo.findByEmail(email);
    return user;
  }

  async register(name: string, email: string, _password: string): Promise<User> {
    return {
      id: Date.now().toString(),
      name,
      email,
      role: "student",
      createdAt: new Date().toISOString(),
    };
  }

  async getUser(id: string) {
    return userRepo.findById(id);
  }
}

export class DashboardService {
  async getStudentDashboard() {
    const [stats, scoreHistory, performance, activities, goals] = await Promise.all([
      dashboardRepo.getStats(),
      dashboardRepo.getScoreHistory(),
      dashboardRepo.getPerformanceData(),
      dashboardRepo.getActivities(),
      dashboardRepo.getGoals(),
    ]);
    return { stats, scoreHistory, performance, activities, goals };
  }
}

export class PracticeService {
  async getQuestions(type?: "listening" | "reading") {
    const questions = await practiceRepo.getQuestions();
    if (type) return questions.filter((q) => q.type === type);
    return questions;
  }

  async getQuestion(id: string) {
    return practiceRepo.getQuestionById(id);
  }

  checkAnswer(questionId: string, selectedIndex: number) {
    return practiceRepo.getQuestionById(questionId).then((q) => {
      if (!q) return { correct: false, explanation: "" };
      return {
        correct: q.correctAnswer === selectedIndex,
        explanation: q.explanation ?? "",
      };
    });
  }
}

export class MockTestService {
  async getTest(id: string) {
    return mockTestRepo.getTest(id);
  }

  async getResults(userId: string) {
    return mockTestRepo.getResults(userId);
  }

  calculateScore(answers: Record<string, number>, questions: { id: string; correctAnswer: number }[]) {
    let correct = 0;
    questions.forEach((q) => {
      if (answers[q.id] === q.correctAnswer) correct++;
    });
    const total = questions.length;
    const score = Math.round((correct / total) * 990);
    return {
      totalScore: score,
      listeningScore: Math.round(score * 0.5),
      readingScore: Math.round(score * 0.5),
      correctAnswers: correct,
      incorrectAnswers: total - correct,
    };
  }
}

export class VocabularyService {
  async getAll() {
    return vocabularyRepo.getAll();
  }

  async getByTopic(topic: string) {
    return vocabularyRepo.getByTopic(topic);
  }

  async getFavorites() {
    return vocabularyRepo.getFavorites();
  }
}

export class ChatService {
  async getSessions() {
    return chatRepo.getSessions();
  }

  async getSession(id: string) {
    return chatRepo.getSession(id);
  }

  async sendMessage(content: string) {
    return {
      id: Date.now().toString(),
      role: "assistant" as const,
      content: `I understand your question about "${content.slice(0, 50)}...". In TOEIC context, focus on identifying key grammar patterns and eliminate wrong answers systematically. Would you like a detailed explanation or a mini quiz on this topic?`,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
  }
}

export class ProgressService {
  async getProgressData() {
    const [achievements, leaderboard, stats, scoreHistory, studyHours, skillDistribution] =
      await Promise.all([
        progressRepo.getAchievements(),
        progressRepo.getLeaderboard(),
        dashboardRepo.getStats(),
        dashboardRepo.getScoreHistory(),
        dashboardRepo.getStudyHours(),
        dashboardRepo.getSkillDistribution(),
      ]);
    return { achievements, leaderboard, stats, scoreHistory, studyHours, skillDistribution };
  }
}

export class LandingService {
  async getLandingData() {
    const [testimonials, pricingPlans] = await Promise.all([
      landingRepo.getTestimonials(),
      landingRepo.getPricingPlans(),
    ]);
    return { testimonials, pricingPlans };
  }
}

export class CourseService {
  async getAll() {
    return courseRepo.getAll();
  }
}

export class AdminService {
  async getDashboardData() {
    const [stats, userGrowth, revenueData, recentPayments, recentUsers, popularCourses] =
      await Promise.all([
        adminRepo.getStats(),
        adminRepo.getUserGrowth(),
        adminRepo.getRevenueData(),
        adminRepo.getRecentPayments(),
        adminRepo.getRecentUsers(),
        adminRepo.getPopularCourses(),
      ]);
    return { stats, userGrowth, revenueData, recentPayments, recentUsers, popularCourses };
  }
}

export class TeacherService {
  async getDashboardData() {
    const [analytics, students, courses] = await Promise.all([
      teacherRepo.getAnalytics(),
      teacherRepo.getStudents(),
      courseRepo.getAll(),
    ]);
    return { analytics, students, courses };
  }
}

export const authService = new AuthService();
export const dashboardService = new DashboardService();
export const practiceService = new PracticeService();
export const mockTestService = new MockTestService();
export const vocabularyService = new VocabularyService();
export const chatService = new ChatService();
export const progressService = new ProgressService();
export const landingService = new LandingService();
export const courseService = new CourseService();
export const adminService = new AdminService();
export const teacherService = new TeacherService();
