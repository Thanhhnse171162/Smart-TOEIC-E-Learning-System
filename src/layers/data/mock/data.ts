// ============================================================
// DATA ACCESS LAYER - Mock data
// ============================================================

import type {
  Achievement,
  Activity,
  AdminStats,
  ChatSession,
  Course,
  DashboardStats,
  LeaderboardEntry,
  LearningGoal,
  MockTest,
  Payment,
  PricingPlan,
  Question,
  TeacherAnalytics,
  Testimonial,
  TestResult,
  User,
  VocabularyWord,
} from "@/layers/domain/types";

export const mockUsers: User[] = [
  {
    id: "1",
    name: "Nguyen Van A",
    email: "student@toeic.com",
    role: "student",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=student",
    toeicScore: 785,
    createdAt: "2024-01-15",
  },
  {
    id: "2",
    name: "Tran Thi B",
    email: "teacher@toeic.com",
    role: "teacher",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=teacher",
    createdAt: "2024-01-10",
  },
  {
    id: "3",
    name: "Admin User",
    email: "admin@toeic.com",
    role: "admin",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=admin",
    createdAt: "2024-01-01",
  },
];

export const mockDashboardStats: DashboardStats = {
  currentScore: 785,
  weeklyStudyHours: 12.5,
  completedLessons: 48,
  vocabularyLearned: 342,
  learningStreak: 14,
};

export const mockScoreHistory = [
  { month: "Jan", score: 620 },
  { month: "Feb", score: 680 },
  { month: "Mar", score: 710 },
  { month: "Apr", score: 745 },
  { month: "May", score: 770 },
  { month: "Jun", score: 785 },
];

export const mockPerformanceData = [
  { skill: "Listening", score: 395 },
  { skill: "Reading", score: 390 },
];

export const mockActivities: Activity[] = [
  {
    id: "1",
    type: "practice",
    title: "Completed Part 3 Practice",
    description: "Scored 85% on Conversations",
    timestamp: "2 hours ago",
  },
  {
    id: "2",
    type: "vocabulary",
    title: "Learned 15 new words",
    description: "Business vocabulary topic",
    timestamp: "5 hours ago",
  },
  {
    id: "3",
    type: "mock",
    title: "Mock Test #5 Completed",
    description: "Score: 780 (Listening: 390, Reading: 390)",
    timestamp: "1 day ago",
  },
  {
    id: "4",
    type: "lesson",
    title: "Finished Lesson 12",
    description: "Advanced Reading Strategies",
    timestamp: "2 days ago",
  },
];

export const mockGoals: LearningGoal[] = [
  {
    id: "1",
    title: "Complete Mock Test #6",
    targetDate: "2024-06-05",
    progress: 0,
    completed: false,
  },
  {
    id: "2",
    title: "Learn 50 Business Vocabulary",
    targetDate: "2024-06-10",
    progress: 68,
    completed: false,
  },
  {
    id: "3",
    title: "Achieve 800+ TOEIC Score",
    targetDate: "2024-06-30",
    progress: 78,
    completed: false,
  },
];

export const mockQuestions: Question[] = [
  {
    id: "q1",
    part: 1,
    type: "listening",
    text: "Look at the picture and choose the statement that best describes what you see.",
    audioUrl: "/audio/part1-sample.mp3",
    options: [
      "The man is reading a newspaper.",
      "The woman is talking on the phone.",
      "People are waiting at a bus stop.",
      "A delivery truck is parked outside.",
    ],
    correctAnswer: 2,
    explanation: "The photograph shows several people standing at a bus stop.",
  },
  {
    id: "q2",
    part: 2,
    type: "listening",
    text: "Mark your answer on your answer sheet.",
    audioUrl: "/audio/part2-sample.mp3",
    options: [
      "Yes, I'll be there at 3 PM.",
      "The meeting room is on the second floor.",
      "She works in the marketing department.",
    ],
    correctAnswer: 0,
  },
  {
    id: "q3",
    part: 5,
    type: "reading",
    text: "The company announced that it _______ a new branch office in Singapore next month.",
    options: ["open", "will open", "opened", "opening"],
    correctAnswer: 1,
    explanation: "Future tense 'will open' is correct because 'next month' indicates a future action.",
  },
];

export const mockMockTest: MockTest = {
  id: "mock-1",
  title: "Full TOEIC Mock Test #1",
  duration: 7200,
  totalQuestions: 200,
  questions: mockQuestions,
};

export const mockVocabulary: VocabularyWord[] = [
  {
    id: "v1",
    word: "negotiate",
    meaning: "to discuss something formally in order to reach an agreement",
    example: "We need to negotiate the terms of the contract.",
    topic: "business",
    isFavorite: true,
  },
  {
    id: "v2",
    word: "revenue",
    meaning: "income generated from normal business operations",
    example: "The company's revenue increased by 15% this quarter.",
    topic: "finance",
  },
  {
    id: "v3",
    word: "campaign",
    meaning: "a planned series of activities to achieve a goal",
    example: "The marketing campaign was very successful.",
    topic: "marketing",
  },
  {
    id: "v4",
    word: "deadline",
    meaning: "the latest time by which something must be completed",
    example: "We must meet the project deadline.",
    topic: "office",
  },
  {
    id: "v5",
    word: "itinerary",
    meaning: "a planned route or journey",
    example: "Please send me your travel itinerary.",
    topic: "travel",
  },
  {
    id: "v6",
    word: "innovation",
    meaning: "a new method, idea, or product",
    example: "Technology innovation drives business growth.",
    topic: "technology",
  },
];

export const mockChatSessions: ChatSession[] = [
  {
    id: "chat-1",
    title: "Grammar: Prepositions",
    createdAt: "2024-05-28",
    messages: [
      {
        id: "m1",
        role: "user",
        content: "Why is 'at' used here instead of 'in'?",
        timestamp: "10:30 AM",
      },
      {
        id: "m2",
        role: "assistant",
        content:
          "Great question! Use 'at' for specific points or locations (at the office, at 3 PM), while 'in' is used for enclosed spaces or larger areas (in the building, in Vietnam). In your sentence, 'at the meeting' refers to a specific event point.",
        timestamp: "10:30 AM",
      },
    ],
  },
  {
    id: "chat-2",
    title: "TOEIC Part 5 Strategy",
    createdAt: "2024-05-27",
    messages: [
      {
        id: "m3",
        role: "user",
        content: "What's the best strategy for Part 5?",
        timestamp: "2:15 PM",
      },
      {
        id: "m4",
        role: "assistant",
        content:
          "For Part 5, focus on: 1) Identify the part of speech needed, 2) Check subject-verb agreement, 3) Look for time markers (yesterday → past tense), 4) Eliminate obviously wrong answers first. Aim for 30 seconds per question.",
        timestamp: "2:15 PM",
      },
    ],
  },
];

export const mockAchievements: Achievement[] = [
  { id: "a1", title: "7-Day Streak", description: "Study 7 days in a row", icon: "flame", unlocked: true, unlockedAt: "2024-05-20" },
  { id: "a2", title: "100 Vocabulary Learned", description: "Master 100 words", icon: "book", unlocked: true, unlockedAt: "2024-05-15" },
  { id: "a3", title: "First Mock Test", description: "Complete your first mock test", icon: "trophy", unlocked: true, unlockedAt: "2024-04-01" },
  { id: "a4", title: "TOEIC 700+", description: "Score 700 or above", icon: "star", unlocked: true, unlockedAt: "2024-05-01" },
  { id: "a5", title: "TOEIC 850+", description: "Score 850 or above", icon: "crown", unlocked: false },
];

export const mockLeaderboard: LeaderboardEntry[] = [
  { rank: 1, name: "Minh Tran", score: 945, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=minh" },
  { rank: 2, name: "Lan Nguyen", score: 920, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=lan" },
  { rank: 3, name: "Hoang Le", score: 905, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=hoang" },
  { rank: 4, name: "Nguyen Van A", score: 785, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=student" },
  { rank: 5, name: "Thu Pham", score: 770, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=thu" },
];

export const mockTestimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Sarah L.",
    score: 920,
    quote: "The AI assistant helped me understand grammar patterns I struggled with for years. My score jumped 150 points in 3 months!",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
  },
  {
    id: "t2",
    name: "James K.",
    score: 880,
    quote: "Mock tests feel exactly like the real TOEIC exam. The detailed analytics showed me exactly where to focus my study time.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=james",
  },
  {
    id: "t3",
    name: "Maria G.",
    score: 950,
    quote: "Best TOEIC prep platform I've used. The vocabulary builder and daily practice kept me motivated throughout my preparation.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=maria",
  },
];

export const mockPricingPlans: PricingPlan[] = [
  {
    id: "starter",
    name: "Starter",
    price: 0,
    period: "month",
    features: ["5 Practice tests/month", "Basic vocabulary", "Progress tracking", "Community support"],
    current: true,
  },
  {
    id: "pro",
    name: "Pro Learner",
    price: 29,
    period: "month",
    features: ["Unlimited practice", "AI Learning Assistant", "Full mock tests", "Advanced analytics", "Priority support"],
    popular: true,
  },
  {
    id: "team",
    name: "Team / B2B",
    price: 19,
    period: "user",
    features: ["Everything in Pro", "Team dashboard", "Custom tests", "Bulk licensing", "Dedicated account manager"],
  },
];

export const mockCourses: Course[] = [
  { id: "c1", title: "TOEIC Listening Mastery", description: "Master all 4 listening parts", level: "intermediate", lessonsCount: 24, studentsCount: 1250 },
  { id: "c2", title: "TOEIC Reading Strategies", description: "Advanced reading techniques", level: "advanced", lessonsCount: 20, studentsCount: 980 },
  { id: "c3", title: "Business English for TOEIC", description: "Essential business vocabulary", level: "beginner", lessonsCount: 16, studentsCount: 2100 },
];

export const mockTestResults: TestResult[] = [
  { id: "r1", userId: "1", testId: "mock-1", totalScore: 780, listeningScore: 390, readingScore: 390, correctAnswers: 156, incorrectAnswers: 44, completedAt: "2024-05-25" },
  { id: "r2", userId: "1", testId: "mock-2", totalScore: 750, listeningScore: 375, readingScore: 375, correctAnswers: 150, incorrectAnswers: 50, completedAt: "2024-05-18" },
];

export const mockAdminStats: AdminStats = {
  totalUsers: 15420,
  activeStudents: 8934,
  totalRevenue: 284500,
  totalTests: 45678,
};

export const mockUserGrowth = [
  { month: "Jan", users: 8500 },
  { month: "Feb", users: 9200 },
  { month: "Mar", users: 10500 },
  { month: "Apr", users: 12100 },
  { month: "May", users: 13800 },
  { month: "Jun", users: 15420 },
];

export const mockRevenueData = [
  { month: "Jan", revenue: 32000 },
  { month: "Feb", revenue: 38500 },
  { month: "Mar", revenue: 42000 },
  { month: "Apr", revenue: 48000 },
  { month: "May", revenue: 55000 },
  { month: "Jun", revenue: 69000 },
];

export const mockRecentPayments: Payment[] = [
  { id: "p1", user: "Nguyen Van A", amount: 29, plan: "Pro Learner", date: "2024-05-30", status: "completed" },
  { id: "p2", user: "Tran Thi B", amount: 29, plan: "Pro Learner", date: "2024-05-29", status: "completed" },
  { id: "p3", user: "Le Van C", amount: 19, plan: "Team", date: "2024-05-28", status: "pending" },
];

export const mockTeacherAnalytics: TeacherAnalytics = {
  averageScore: 742,
  completionRate: 78,
  difficultQuestions: [
    { id: "q10", text: "Part 5: Subjunctive mood question", errorRate: 72 },
    { id: "q25", text: "Part 3: Inference question", errorRate: 65 },
    { id: "q48", text: "Part 7: Double passage question", errorRate: 58 },
  ],
};

export const listeningParts = [
  { id: 1, title: "Part 1: Photographs", questions: 6 },
  { id: 2, title: "Part 2: Question Response", questions: 25 },
  { id: 3, title: "Part 3: Conversations", questions: 39 },
  { id: 4, title: "Part 4: Talks", questions: 30 },
];

export const readingParts = [
  { id: 5, title: "Part 5: Incomplete Sentences", questions: 30 },
  { id: 6, title: "Part 6: Text Completion", questions: 16 },
  { id: 7, title: "Part 7: Reading Comprehension", questions: 54 },
];

export const vocabularyTopics = [
  { id: "business", label: "Business", icon: "briefcase" },
  { id: "marketing", label: "Marketing", icon: "megaphone" },
  { id: "finance", label: "Finance", icon: "dollar-sign" },
  { id: "office", label: "Office", icon: "building" },
  { id: "travel", label: "Travel", icon: "plane" },
  { id: "technology", label: "Technology", icon: "cpu" },
];

export const studyHoursData = [
  { day: "Mon", hours: 2.5 },
  { day: "Tue", hours: 1.8 },
  { day: "Wed", hours: 3.2 },
  { day: "Thu", hours: 2.0 },
  { day: "Fri", hours: 1.5 },
  { day: "Sat", hours: 4.0 },
  { day: "Sun", hours: 2.5 },
];

export const skillDistribution = [
  { name: "Listening", value: 45 },
  { name: "Reading", value: 35 },
  { name: "Vocabulary", value: 12 },
  { name: "Grammar", value: 8 },
];
