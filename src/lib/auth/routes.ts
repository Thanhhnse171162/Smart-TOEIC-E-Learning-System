export function getDashboardPathByRole(role: string): string {
  const r = role.toLowerCase();
  if (r === "admin") return "/admin/dashboard";
  if (r === "teacher") return "/teacher/dashboard";
  return "/student/dashboard";
}
