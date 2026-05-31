"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, GraduationCap } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/#features", label: "Courses" },
  { href: "/#features", label: "Practice" },
  { href: "/#features", label: "Mock Tests" },
  { href: "/#features", label: "AI Help" },
];

export function LandingNavbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-primary">
          <GraduationCap className="h-7 w-7" />
          TOEIC Master
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                link.label === "Courses" ? "text-primary border-b-2 border-primary pb-0.5" : "text-muted-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button variant="ghost" size="icon" className="hidden sm:flex">
            <Bell className="h-5 w-5" />
          </Button>
          <Link href="/login">
            <Avatar className="h-9 w-9 cursor-pointer ring-2 ring-primary/20">
              <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=guest" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          </Link>
        </div>
      </div>
    </header>
  );
}
