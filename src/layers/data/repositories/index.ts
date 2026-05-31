// ============================================================
// DATA ACCESS LAYER - Repositories
// ============================================================

import {
  mockAchievements,
  mockActivities,
  mockAdminStats,
  mockChatSessions,
  mockCourses,
  mockDashboardStats,
  mockLeaderboard,
  mockGoals,
  mockMockTest,
  mockQuestions,
  mockRecentPayments,
  mockRevenueData,
  mockScoreHistory,
  mockTestimonials,
  mockTestResults,
  mockUsers,
  mockUserGrowth,
  mockVocabulary,
  mockTeacherAnalytics,
  mockPricingPlans,
  mockPerformanceData,
  studyHoursData,
  skillDistribution,
} from "@/layers/data/mock/data";
import type { User, UserRole } from "@/layers/domain/types";

export class UserRepository {
  async findByEmail(email: string): Promise<User | null> {
    return mockUsers.find((u) => u.email === email) ?? null;
  }

  async findById(id: string): Promise<User | null> {
    return mockUsers.find((u) => u.id === id) ?? null;
  }

  async findAll(): Promise<User[]> {
    return mockUsers;
  }

  async findByRole(role: UserRole): Promise<User[]> {
    return mockUsers.filter((u) => u.role === role);
  }
}

export class DashboardRepository {
  async getStats() {
    return mockDashboardStats;
  }

  async getScoreHistory() {
    return mockScoreHistory;
  }

  async getPerformanceData() {
    return mockPerformanceData;
  }

  async getActivities() {
    return mockActivities;
  }

  async getGoals() {
    return mockGoals;
  }

  async getStudyHours() {
    return studyHoursData;
  }

  async getSkillDistribution() {
    return skillDistribution;
  }
}

export class PracticeRepository {
  async getQuestions() {
    return mockQuestions;
  }

  async getQuestionById(id: string) {
    return mockQuestions.find((q) => q.id === id) ?? null;
  }
}

export class MockTestRepository {
  async getTest(id: string) {
    return id === mockMockTest.id ? mockMockTest : null;
  }

  async getResults(userId: string) {
    return mockTestResults.filter((r) => r.userId === userId);
  }
}

export class VocabularyRepository {
  async getAll() {
    return mockVocabulary;
  }

  async getByTopic(topic: string) {
    return mockVocabulary.filter((v) => v.topic === topic);
  }

  async getFavorites() {
    return mockVocabulary.filter((v) => v.isFavorite);
  }
}

export class ChatRepository {
  async getSessions() {
    return mockChatSessions;
  }

  async getSession(id: string) {
    return mockChatSessions.find((s) => s.id === id) ?? null;
  }
}

export class ProgressRepository {
  async getAchievements() {
    return mockAchievements;
  }

  async getLeaderboard() {
    return mockLeaderboard;
  }
}

export class LandingRepository {
  async getTestimonials() {
    return mockTestimonials;
  }

  async getPricingPlans() {
    return mockPricingPlans;
  }
}

export class CourseRepository {
  async getAll() {
    return mockCourses;
  }
}

export class AdminRepository {
  async getStats() {
    return mockAdminStats;
  }

  async getUserGrowth() {
    return mockUserGrowth;
  }

  async getRevenueData() {
    return mockRevenueData;
  }

  async getRecentPayments() {
    return mockRecentPayments;
  }

  async getRecentUsers() {
    return mockUsers.slice(0, 5);
  }

  async getPopularCourses() {
    return mockCourses;
  }
}

export class TeacherRepository {
  async getAnalytics() {
    return mockTeacherAnalytics;
  }

  async getStudents() {
    return mockUsers.filter((u) => u.role === "student");
  }
}
