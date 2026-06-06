"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  BookOpen,
  Bot,
  CheckCircle,
  ClipboardList,
  GraduationCap,
  LayoutDashboard,
  Menu,
  Settings,
  Trophy,
  User,
  X,
  LogOut,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const iconMap: Record<string, React.ElementType> = {
  LayoutDashboard,
  BookOpen,
  ClipboardList,
  Trophy,
  Bot,
  BarChart3,
  User,
  Settings,
  CheckCircle,
};

export interface SidebarItem {
  href: string;
  label: string;
  icon: string;
}

interface DashboardSidebarProps {
  items: SidebarItem[];
  title?: string;
}

export function DashboardSidebar({ items, title = "SmartTOEIC" }: DashboardSidebarProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant="ghost" size="icon" className="fixed top-4 left-4 z-50 lg:hidden" onClick={() => setOpen(!open)}>
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {open && <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={() => setOpen(false)} />}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r bg-card transition-transform lg:sticky lg:top-0 lg:h-screen lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-16 items-center gap-2 border-b px-6">
          <GraduationCap className="h-7 w-7 text-primary" />
          <span className="font-bold text-lg">{title}</span>
        </div>
        <nav className="space-y-1 p-4 pb-0">
          {items.map((item) => {
            const Icon = iconMap[item.icon] ?? LayoutDashboard;
            const active = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                  active ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <Icon className="h-5 w-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        
        <div className="p-4 pt-4">
          <div className="border-t pt-4">
            <Link
              href="/login"
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-rose-500 hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-950/30 transition-colors"
            >
              <LogOut className="h-5 w-5" />
              Logout
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
}
