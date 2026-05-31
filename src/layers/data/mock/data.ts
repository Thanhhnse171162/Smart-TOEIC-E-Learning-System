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
  { id: 1, title: "Part 1: Photographs", questions: 50, description: "Identify correctly the scene and actions in a given photo.", icon: "camera", progress: 65, successRate: 82 },
  { id: 2, title: "Part 2: Question-Response", questions: 75, description: "Choose the most appropriate response to various verbal questions.", icon: "messageSquare", progress: 40, successRate: 64 },
  { id: 3, title: "Part 3: Short Conversations", questions: 120, description: "Understand details and implications in multi-speaker dialogues.", icon: "users", progress: 10, successRate: 0 },
  { id: 4, title: "Part 4: Short Talks", questions: 100, description: "Listen to announcements and speeches for specific information.", icon: "mic", progress: 5, successRate: 0 },
];

export const readingParts = [
  { id: 5, title: "Part 5: Incomplete Sentences", questions: 100, description: "Test your grammar and vocabulary knowledge with fill-in-the-blanks.", icon: "fileText", progress: 80, successRate: 91 },
  { id: 6, title: "Part 6: Text Completion", questions: 64, description: "Complete passages by choosing the best words or sentences.", icon: "alignLeft", progress: 35, successRate: 68 },
  { id: 7, title: "Part 7: Reading Comprehension", questions: 120, description: "Read texts and answer questions to verify full comprehension.", icon: "bookOpen", progress: 25, successRate: 52 },
];

/* ---------- Practice Question Data ---------- */
export interface PracticeQuestion {
  id: string;
  text: string;
  imageUrl?: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

export interface PartPracticeData {
  partId: number;
  category: "listening" | "reading";
  tips: string[];
  vocabulary: string[];
  questions: PracticeQuestion[];
}

export const practiceQuestionsData: PartPracticeData[] = [
  {
    partId: 1,
    category: "listening",
    tips: [
      "Look at the main subject.",
      "Listen for prepositions.",
      "Watch out for similar-sounding words.",
      "Focus on the action in the photo.",
    ],
    vocabulary: ["Meeting", "Conference", "Agenda", "Presentation", "Colleague", "Whiteboard"],
    questions: [
      {
        id: "p1q1",
        text: "Look at the picture and choose the statement that best describes what you see.",
        imageUrl: "/images/practice/part1-photo.png",
        options: ["People are having a meeting in a conference room.", "A man is working alone at his desk.", "The office is empty and the lights are off.", "Someone is making a phone call."],
        correctAnswer: 0,
        explanation: "The photograph shows several people in a conference room having a meeting.",
      },
      {
        id: "p1q2",
        text: "Look at the picture and choose the statement that best describes what you see.",
        imageUrl: "/images/practice/part1-photo.png",
        options: ["The woman is writing on a whiteboard.", "Documents are spread across the table.", "Everyone is looking at their laptops.", "The room has no windows."],
        correctAnswer: 2,
        explanation: "In the photo, all participants are looking at their laptop screens.",
      },
      {
        id: "p1q3",
        text: "Look at the picture and choose the statement that best describes what you see.",
        imageUrl: "/images/practice/part1-photo.png",
        options: ["A delivery truck is parked outside.", "The man is reading a newspaper.", "People are sitting around a table.", "The woman is talking on the phone."],
        correctAnswer: 2,
        explanation: "The image shows people seated around a conference table.",
      },
      {
        id: "p1q4",
        text: "Look at the picture and choose the statement that best describes what you see.",
        imageUrl: "/images/practice/part1-photo.png",
        options: ["The office has modern furniture.", "There is food on the table.", "The lights are turned off.", "People are standing in a line."],
        correctAnswer: 0,
        explanation: "The conference room has modern office furniture and equipment.",
      },
      {
        id: "p1q5",
        text: "Look at the picture and choose the statement that best describes what you see.",
        imageUrl: "/images/practice/part1-photo.png",
        options: ["A presenter is using a projector.", "The chairs are arranged in rows.", "Business professionals are in a discussion.", "The room is being cleaned."],
        correctAnswer: 2,
        explanation: "The people in the photo appear to be business professionals engaged in a discussion.",
      },
      {
        id: "p1q6",
        text: "Look at the picture and choose the statement that best describes what you see.",
        imageUrl: "/images/practice/part1-photo.png",
        options: ["The conference room is on the top floor.", "Everyone is wearing formal attire.", "There are plants on the windowsill.", "People are shaking hands."],
        correctAnswer: 1,
        explanation: "The participants are dressed in professional/formal business attire.",
      },
      {
        id: "p1q7",
        text: "Look at the picture and choose the statement that best describes what you see.",
        imageUrl: "/images/practice/part1-photo.png",
        options: ["A group is celebrating a birthday.", "People are eating lunch together.", "Colleagues are collaborating on a project.", "The office is under renovation."],
        correctAnswer: 2,
        explanation: "The scene shows colleagues collaborating and working together on a project.",
      },
      {
        id: "p1q8",
        text: "Look at the picture and choose the statement that best describes what you see.",
        imageUrl: "/images/practice/part1-photo.png",
        options: ["The meeting room has glass walls.", "Cars are parked in the garage.", "A waiter is serving drinks.", "Children are playing in the park."],
        correctAnswer: 0,
        explanation: "The conference room appears to have glass walls typical of modern offices.",
      },
      {
        id: "p1q9",
        text: "Look at the picture and choose the statement that best describes what you see.",
        imageUrl: "/images/practice/part1-photo.png",
        options: ["An employee is giving a presentation.", "The room is decorated for a party.", "Workers are unpacking boxes.", "There are multiple screens in the room."],
        correctAnswer: 0,
        explanation: "One of the people appears to be leading/presenting in the meeting.",
      },
      {
        id: "p1q10",
        text: "Look at the picture and choose the statement that best describes what you see.",
        imageUrl: "/images/practice/part1-photo.png",
        options: ["The building is surrounded by trees.", "People are waiting at a bus stop.", "A team is reviewing documents together.", "The parking lot is full."],
        correctAnswer: 2,
        explanation: "The team appears to be reviewing and discussing documents together.",
      },
    ],
  },
  {
    partId: 2,
    category: "listening",
    tips: [
      "Listen for WH-words (Who, What, Where, When, Why, How).",
      "Eliminate answers that repeat words from the question.",
      "Yes/No questions often have indirect answers.",
      "Watch for tag questions and embedded questions.",
    ],
    vocabulary: ["Schedule", "Appointment", "Deadline", "Department", "Supervisor", "Quarterly"],
    questions: [
      { id: "p2q1", text: "Where is the annual meeting being held?", options: ["In the main conference hall.", "Yes, it starts at noon.", "About 200 attendees."], correctAnswer: 0 },
      { id: "p2q2", text: "When does the new policy take effect?", options: ["The HR department.", "Starting next Monday.", "It was approved."], correctAnswer: 1 },
      { id: "p2q3", text: "Who is in charge of the project?", options: ["Ms. Johnson is leading it.", "In the third quarter.", "Yes, it is."], correctAnswer: 0 },
      { id: "p2q4", text: "Would you like to join us for lunch?", options: ["At the Italian restaurant.", "Sure, I'd love to.", "It's on the second floor."], correctAnswer: 1 },
      { id: "p2q5", text: "How long will the renovation take?", options: ["About three weeks.", "On the fifth floor.", "Yes, they started."], correctAnswer: 0 },
      { id: "p2q6", text: "Why was the meeting postponed?", options: ["In the boardroom.", "The director is unavailable.", "At 3 PM."], correctAnswer: 1 },
      { id: "p2q7", text: "Has the report been submitted yet?", options: ["By Friday.", "I'll check with accounting.", "The monthly report."], correctAnswer: 1 },
      { id: "p2q8", text: "Could you help me with this form?", options: ["Of course, what do you need?", "Form B-12.", "It was filed yesterday."], correctAnswer: 0 },
      { id: "p2q9", text: "What time does the train leave?", options: ["Platform 5.", "Every 30 minutes.", "The express train."], correctAnswer: 1 },
      { id: "p2q10", text: "Don't you think we should update the website?", options: ["The IT department.", "I agree, it needs a refresh.", "Last month."], correctAnswer: 1 },
    ],
  },
  {
    partId: 3,
    category: "listening",
    tips: [
      "Read questions before listening.",
      "Focus on who, where, and what is discussed.",
      "Note transitions like 'however' and 'actually'.",
      "Pay attention to the speakers' intentions.",
    ],
    vocabulary: ["Reservation", "Itinerary", "Accommodation", "Negotiate", "Proposal", "Invoice"],
    questions: [
      { id: "p3q1", text: "What are the speakers mainly discussing?", options: ["A project timeline", "A lunch order", "Office supplies", "A holiday plan"], correctAnswer: 0 },
      { id: "p3q2", text: "Where does the conversation take place?", options: ["In a restaurant", "At an office", "At a train station", "In a hospital"], correctAnswer: 1 },
      { id: "p3q3", text: "What does the woman suggest?", options: ["Extending the deadline", "Hiring more staff", "Canceling the meeting", "Ordering new equipment"], correctAnswer: 0 },
      { id: "p3q4", text: "Why is the man concerned?", options: ["The budget is limited", "He lost his keys", "The printer is broken", "He missed the bus"], correctAnswer: 0 },
      { id: "p3q5", text: "What will the woman probably do next?", options: ["Call the client", "Go to lunch", "Send an email", "Print the report"], correctAnswer: 2 },
      { id: "p3q6", text: "What does the man ask about?", options: ["The meeting agenda", "The parking policy", "The dress code", "The lunch menu"], correctAnswer: 0 },
      { id: "p3q7", text: "When will the project be completed?", options: ["Next week", "By end of month", "In two days", "Tomorrow morning"], correctAnswer: 1 },
      { id: "p3q8", text: "Who will lead the presentation?", options: ["The manager", "The intern", "The CEO", "The client"], correctAnswer: 0 },
      { id: "p3q9", text: "What problem do the speakers mention?", options: ["Late shipment", "Power outage", "Missing files", "Wrong address"], correctAnswer: 0 },
      { id: "p3q10", text: "How will the speakers resolve the issue?", options: ["Contact the supplier", "Wait until Monday", "Ask for help", "File a complaint"], correctAnswer: 0 },
    ],
  },
  {
    partId: 4,
    category: "listening",
    tips: [
      "Identify the purpose of the talk early on.",
      "Listen for details about times, places, and names.",
      "Note what the speaker asks the audience to do.",
      "Pay attention to announcements and instructions.",
    ],
    vocabulary: ["Announcement", "Broadcast", "Keynote", "Attendee", "Venue", "Registration"],
    questions: [
      { id: "p4q1", text: "What is the purpose of the announcement?", options: ["To introduce a new product", "To announce a schedule change", "To welcome new employees", "To close the store"], correctAnswer: 1 },
      { id: "p4q2", text: "Who is the intended audience?", options: ["Company employees", "Hotel guests", "University students", "Airport passengers"], correctAnswer: 0 },
      { id: "p4q3", text: "What are listeners asked to do?", options: ["Register online", "Contact the front desk", "Submit feedback", "Arrive early"], correctAnswer: 0 },
      { id: "p4q4", text: "When will the event take place?", options: ["This Friday", "Next Monday", "Tomorrow afternoon", "In two weeks"], correctAnswer: 0 },
      { id: "p4q5", text: "What is being advertised?", options: ["A fitness program", "A restaurant opening", "A job fair", "A travel package"], correctAnswer: 2 },
      { id: "p4q6", text: "Where should listeners go for more information?", options: ["The company website", "The reception desk", "The bulletin board", "Room 205"], correctAnswer: 0 },
      { id: "p4q7", text: "What has changed about the schedule?", options: ["The time was moved up", "A session was canceled", "The venue was changed", "A speaker was replaced"], correctAnswer: 2 },
      { id: "p4q8", text: "What benefit is mentioned?", options: ["Free parking", "Complimentary lunch", "Early bird discount", "Gift certificates"], correctAnswer: 2 },
      { id: "p4q9", text: "Who is the speaker?", options: ["A tour guide", "A store manager", "A flight attendant", "A teacher"], correctAnswer: 1 },
      { id: "p4q10", text: "What is the main topic of the talk?", options: ["Safety procedures", "Marketing strategy", "Customer feedback", "Budget planning"], correctAnswer: 0 },
    ],
  },
  {
    partId: 5,
    category: "reading",
    tips: [
      "Identify the part of speech needed in the blank.",
      "Look for subject-verb agreement clues.",
      "Check time markers (yesterday, next week, etc.).",
      "Eliminate obviously wrong answers first.",
    ],
    vocabulary: ["Comply", "Revenue", "Acquisition", "Implement", "Considerable", "Subsequently"],
    questions: [
      { id: "p5q1", text: "The company _______ a new branch office in Singapore next month.", options: ["open", "will open", "opened", "opening"], correctAnswer: 1, explanation: "Future tense needed because of 'next month'." },
      { id: "p5q2", text: "All employees must _______ with the new safety regulations.", options: ["comply", "compliant", "compliance", "complied"], correctAnswer: 0 },
      { id: "p5q3", text: "The report was _______ completed before the deadline.", options: ["success", "succeed", "successful", "successfully"], correctAnswer: 3 },
      { id: "p5q4", text: "Ms. Park is _______ for overseeing the marketing department.", options: ["responsible", "responsibility", "responsibly", "respond"], correctAnswer: 0 },
      { id: "p5q5", text: "The merger resulted in _______ savings for both companies.", options: ["consider", "considerable", "considerably", "consideration"], correctAnswer: 1 },
      { id: "p5q6", text: "_______ attending the conference must register in advance.", options: ["Those", "That", "This", "These"], correctAnswer: 0 },
      { id: "p5q7", text: "The new software will be _______ across all departments.", options: ["implement", "implemented", "implementing", "implementation"], correctAnswer: 1 },
      { id: "p5q8", text: "Revenue increased _______ during the third quarter.", options: ["significant", "significance", "significantly", "signify"], correctAnswer: 2 },
      { id: "p5q9", text: "The contract _______ signed by both parties last week.", options: ["is", "was", "has", "will"], correctAnswer: 1 },
      { id: "p5q10", text: "Employees are encouraged to submit _______ ideas for improvement.", options: ["they", "them", "their", "theirs"], correctAnswer: 2 },
    ],
  },
  {
    partId: 6,
    category: "reading",
    tips: [
      "Read the entire passage before answering.",
      "Context clues are in surrounding sentences.",
      "Consider tone and purpose of the text.",
      "Watch for transitions between paragraphs.",
    ],
    vocabulary: ["Memorandum", "Correspondence", "Amendment", "Preceding", "Hereby", "Forthcoming"],
    questions: [
      { id: "p6q1", text: "Dear Employees, we are pleased to _______ that the company picnic will be held on July 15th.", options: ["announce", "announcing", "announced", "announcement"], correctAnswer: 0 },
      { id: "p6q2", text: "The event will take place at Riverside Park, _______ is located just 10 minutes from the office.", options: ["who", "which", "where", "what"], correctAnswer: 1 },
      { id: "p6q3", text: "Please confirm your _______ by responding to this email before July 10th.", options: ["attend", "attendance", "attending", "attendee"], correctAnswer: 1 },
      { id: "p6q4", text: "_______, we will also be celebrating the company's 25th anniversary at the event.", options: ["Additionally", "However", "Therefore", "Otherwise"], correctAnswer: 0 },
      { id: "p6q5", text: "All team leaders should submit their _______ reports by Friday.", options: ["month", "months", "monthly", "monthly's"], correctAnswer: 2 },
      { id: "p6q6", text: "The building renovations are expected to be completed _______ the end of the year.", options: ["by", "on", "at", "in"], correctAnswer: 0 },
      { id: "p6q7", text: "We _______ appreciate your patience during this transition period.", options: ["great", "greater", "greatly", "greatness"], correctAnswer: 2 },
      { id: "p6q8", text: "The management team has decided to _______ the policy effective immediately.", options: ["revise", "revision", "revised", "revising"], correctAnswer: 0 },
      { id: "p6q9", text: "Clients who wish to schedule an appointment should call the office _______.", options: ["direct", "directing", "direction", "directly"], correctAnswer: 3 },
      { id: "p6q10", text: "The _______ version of the handbook includes updated safety guidelines.", options: ["late", "later", "lately", "latest"], correctAnswer: 3 },
    ],
  },
  {
    partId: 7,
    category: "reading",
    tips: [
      "Skim the passage first for the main idea.",
      "Look for keywords in questions to locate answers.",
      "Be careful with NOT/EXCEPT questions.",
      "Cross-reference information in double passages.",
    ],
    vocabulary: ["Brochure", "Warranty", "Reimbursement", "Compliance", "Subsidiary", "Fiscal"],
    questions: [
      { id: "p7q1", text: "According to the memo, when is the deadline for project proposals?", options: ["March 15", "April 1", "March 30", "April 15"], correctAnswer: 2 },
      { id: "p7q2", text: "What is the main purpose of the email?", options: ["To request time off", "To announce a meeting", "To introduce a new policy", "To provide feedback"], correctAnswer: 2 },
      { id: "p7q3", text: "Who is the intended recipient of this notice?", options: ["All staff members", "Department heads only", "New employees", "Customers"], correctAnswer: 0 },
      { id: "p7q4", text: "What is NOT mentioned as a benefit of the new program?", options: ["Flexible hours", "Health insurance", "Free parking", "Remote work options"], correctAnswer: 2 },
      { id: "p7q5", text: "The word 'preliminary' in line 5 is closest in meaning to:", options: ["Final", "Initial", "Comprehensive", "Optional"], correctAnswer: 1 },
      { id: "p7q6", text: "What does the advertisement offer?", options: ["A 20% discount", "Free shipping", "A free trial", "A gift card"], correctAnswer: 2 },
      { id: "p7q7", text: "According to the article, what caused the delay?", options: ["Bad weather", "Staff shortage", "Supply chain issues", "Budget cuts"], correctAnswer: 2 },
      { id: "p7q8", text: "What can be inferred from the notice?", options: ["The office will be closed", "New staff will be hired", "Prices will increase", "A merger is planned"], correctAnswer: 1 },
      { id: "p7q9", text: "Where would this text most likely appear?", options: ["In a newspaper", "On a company website", "In a textbook", "On a product label"], correctAnswer: 1 },
      { id: "p7q10", text: "What action should readers take?", options: ["Contact HR", "Visit the website", "Complete a form", "Attend a meeting"], correctAnswer: 2 },
    ],
  },
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

// Dynamically expand each part to 30 questions for demonstration
practiceQuestionsData.forEach((part) => {
  const originalQuestions = [...part.questions];
  if (originalQuestions.length === 0) return;
  
  let i = originalQuestions.length;
  while (part.questions.length < 30) {
    const template = originalQuestions[i % originalQuestions.length];
    part.questions.push({
      ...template,
      id: `${template.id}-dup-${i}`,
    });
    i++;
  }
});
