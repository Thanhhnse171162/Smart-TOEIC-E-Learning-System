"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { BookOpen, CheckCircle2, Eye, EyeOff, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { loginWithApi } from "@/layers/business/auth.client";
import { USE_API } from "@/lib/api/config";
import { getDashboardPathByRole } from "@/lib/auth/routes";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("student@toeic.com");
  const [password, setPassword] = useState("Password123!");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (USE_API) {
        const { redirectTo } = await loginWithApi(email, password);
        router.push(redirectTo);
        return;
      }
      router.push(getDashboardPathByRole("student"));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    setIsGoogleLoading(true);
    setTimeout(() => {
      router.push("/student/dashboard");
    }, 1500);
  };

  return (
    <div className="min-h-screen w-full flex">
      <div
        className="hidden lg:flex flex-col justify-between w-1/2 text-white p-12 relative overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: "url('/images/practice/screen1.png')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-[#1e3a8a]/70 via-transparent to-transparent pointer-events-none" />
        <div className="relative z-10 flex items-center gap-2 font-bold text-2xl">
          <BookOpen className="h-8 w-8" />
          SmartTOEIC
        </div>
        <div className="relative z-10 flex flex-col items-start justify-end flex-1 pb-12">
          <div className="w-full max-w-md mt-auto">
            <h1 className="text-4xl font-bold mb-8 leading-tight drop-shadow-md">
              Welcome back to<br />your journey.
            </h1>
            <div className="space-y-4">
              {["Access personalized practice tests", "Track your score progress", "Master new vocabulary daily"].map((t) => (
                <div key={t} className="flex items-center gap-3 text-lg drop-shadow-sm">
                  <CheckCircle2 className="h-6 w-6" />
                  <span>{t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white dark:bg-background">
        <form onSubmit={handleSubmit} className="w-full max-w-md space-y-8">
          <div className="text-center lg:text-left">
            <h2 className="text-3xl font-bold text-foreground mb-2">Log in to your account</h2>
            {USE_API && (
              <p className="text-xs text-muted-foreground">
                API: {process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5136"}
              </p>
            )}
          </div>

          {error && (
            <div className="rounded-xl border border-destructive/50 bg-destructive/10 px-4 py-3 text-sm text-destructive">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="student@toeic.com"
                className="rounded-xl"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password123!"
                  className="rounded-xl pr-10"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="remember" />
                <Label htmlFor="remember" className="text-sm font-normal">
                  Remember me
                </Label>
              </div>
              <Link href="#" className="text-sm text-gray-500 hover:text-gray-900">
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              className="w-full rounded-xl bg-[#4b6cb7] hover:bg-[#3b5b9c] text-white"
              size="lg"
              disabled={loading}
            >
              {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Log in"}
            </Button>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center"><span className="w-full border-t" /></div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-white dark:bg-background px-2 text-muted-foreground">or continue with</span>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              className="w-full rounded-xl"
              size="lg"
              onClick={handleGoogleLogin}
              disabled={isGoogleLoading}
            >
              {isGoogleLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : "Continue with Google"}
            </Button>

            <p className="text-center text-sm text-muted-foreground pt-2">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="text-[#4b6cb7] font-semibold hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
