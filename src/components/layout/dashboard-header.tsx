"use client";

import { Bell, Search } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";

interface DashboardHeaderProps {
  title: string;
  subtitle?: string;
  userName?: string;
  userAvatar?: string;
}

export function DashboardHeader({ title, subtitle, userName = "Student", userAvatar }: DashboardHeaderProps) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-background/95 px-4 lg:px-6 backdrop-blur">
      <div>
        <h1 className="text-lg font-semibold lg:text-xl">{title}</h1>
        {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
      </div>
      <div className="flex items-center gap-2 lg:gap-4">
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search..." className="w-64 pl-9 rounded-xl" />
        </div>
        <ThemeToggle />
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
        </Button>
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src={userAvatar ?? "https://api.dicebear.com/7.x/avataaars/svg?seed=student"} />
            <AvatarFallback>{userName[0]}</AvatarFallback>
          </Avatar>
          <span className="hidden text-sm font-medium sm:block">{userName}</span>
        </div>
      </div>
    </header>
  );
}
