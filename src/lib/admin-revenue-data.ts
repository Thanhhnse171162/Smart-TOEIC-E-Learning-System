export type RevenuePeriod = "day" | "month" | "year";

export const REVENUE_BY_PERIOD: Record<RevenuePeriod, { label: string; revenue: number }[]> = {
  day: [
    { label: "Mon", revenue: 2100 },
    { label: "Tue", revenue: 2450 },
    { label: "Wed", revenue: 1980 },
    { label: "Thu", revenue: 2670 },
    { label: "Fri", revenue: 3120 },
    { label: "Sat", revenue: 2890 },
    { label: "Sun", revenue: 2340 },
  ],
  month: [
    { label: "Jan", revenue: 32000 },
    { label: "Feb", revenue: 38500 },
    { label: "Mar", revenue: 42000 },
    { label: "Apr", revenue: 48000 },
    { label: "May", revenue: 55000 },
    { label: "Jun", revenue: 69000 },
  ],
  year: [
    { label: "2021", revenue: 185000 },
    { label: "2022", revenue: 224000 },
    { label: "2023", revenue: 256000 },
    { label: "2024", revenue: 284500 },
    { label: "2025", revenue: 312000 },
  ],
};

export const REVENUE_PERIOD_LABELS: Record<RevenuePeriod, string> = {
  day: "Day",
  month: "Month",
  year: "Year",
};

export const USER_GROWTH_BY_PERIOD: Record<RevenuePeriod, { label: string; users: number }[]> = {
  day: [
    { label: "Mon", users: 18 },
    { label: "Tue", users: 24 },
    { label: "Wed", users: 21 },
    { label: "Thu", users: 32 },
    { label: "Fri", users: 28 },
    { label: "Sat", users: 19 },
    { label: "Sun", users: 15 },
  ],
  month: [
    { label: "Jan", users: 8500 },
    { label: "Feb", users: 9200 },
    { label: "Mar", users: 10500 },
    { label: "Apr", users: 12100 },
    { label: "May", users: 13800 },
    { label: "Jun", users: 15420 },
  ],
  year: [
    { label: "2021", users: 6200 },
    { label: "2022", users: 8900 },
    { label: "2023", users: 11200 },
    { label: "2024", users: 13800 },
    { label: "2025", users: 15420 },
  ],
};
