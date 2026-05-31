import Link from "next/link";
import { GraduationCap } from "lucide-react";

export function LandingFooter() {
  return (
    <footer className="border-t bg-muted/50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <Link href="/" className="flex items-center gap-2 font-bold text-xl text-primary mb-4">
              <GraduationCap className="h-6 w-6" />
              TOEIC Master
            </Link>
            <p className="text-sm text-muted-foreground max-w-md">
              Empowering learners worldwide to achieve their TOEIC goals through AI-powered personalized learning.
            </p>
            <p className="text-xs text-muted-foreground mt-6">© 2024 TOEIC Master e-Learning. All rights reserved.</p>
          </div>
          <div className="flex flex-wrap gap-x-8 gap-y-2 md:justify-end md:items-start">
            {["Privacy Policy", "Terms of Service", "Cookie Policy", "Contact Support"].map((link) => (
              <Link key={link} href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                {link}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
