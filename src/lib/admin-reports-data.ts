export const REPORT_MONTHS = [
  { value: 1, label: "January", short: "Jan" },
  { value: 2, label: "February", short: "Feb" },
  { value: 3, label: "March", short: "Mar" },
  { value: 4, label: "April", short: "Apr" },
  { value: 5, label: "May", short: "May" },
  { value: 6, label: "June", short: "Jun" },
  { value: 7, label: "July", short: "Jul" },
  { value: 8, label: "August", short: "Aug" },
  { value: 9, label: "September", short: "Sep" },
  { value: 10, label: "October", short: "Oct" },
  { value: 11, label: "November", short: "Nov" },
  { value: 12, label: "December", short: "Dec" },
] as const;

export const REPORT_YEARS = [2023, 2024, 2025] as const;

export const CHART_COLORS = ["#2563eb", "#7c3aed", "#0891b2", "#059669", "#d97706", "#e11d48"];

function periodSeed(year: number, month: number, offset = 0) {
  return year * 100 + month + offset;
}

export function getMonthLabel(month: number) {
  return REPORT_MONTHS.find((m) => m.value === month)?.label ?? "Unknown";
}

export function getUserActivityData(year: number, month: number) {
  const base = periodSeed(year, month);
  return [1, 2, 3, 4].map((w) => ({
    week: `W${w}`,
    active: 1100 + ((base * w * 7) % 700),
    newUsers: 140 + ((base * w * 5) % 180),
  }));
}

export function getRevenueData(year: number, month: number) {
  const base = periodSeed(year, month);
  return [1, 2, 3, 4].map((w) => ({
    week: `W${w}`,
    revenue: 9000 + ((base * w * 11) % 8000),
    subscriptions: 80 + ((base * w * 3) % 120),
  }));
}

export function getTestPerformanceData(year: number, month: number) {
  const base = periodSeed(year, month);
  const bands = ["650–750", "751–850", "851–950", "951+"];
  const raw = bands.map((_, i) => 12 + ((base * (i + 1) * 3) % 28));
  const total = raw.reduce((sum, n) => sum + n, 0);
  return bands.map((name, i) => ({
    name,
    value: Math.round((raw[i] / total) * 100),
    color: CHART_COLORS[i],
  }));
}

const COURSES = [
  "Business English",
  "Listening Mastery",
  "Reading Strategies",
  "Grammar Basics",
] as const;

export function getCourseEngagementData(year: number, month: number) {
  const base = periodSeed(year, month);
  return COURSES.map((course, i) => ({
    course,
    completion: 55 + ((base * (i + 2) * 4) % 35),
    enrollments: 800 + ((base * (i + 1) * 13) % 1600),
  }));
}
