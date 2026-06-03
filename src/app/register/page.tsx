"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { BookOpen, CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { registerWithApi } from "@/layers/business/auth.client";
import { USE_API } from "@/lib/api/config";
import { getDashboardPathByRole } from "@/lib/auth/routes";

export default function RegisterPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("Student");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      if (USE_API) {
        const { redirectTo } = await registerWithApi({
          fullName,
          email,
          password,
          confirmPassword,
          role,
        });
        router.push(redirectTo);
        return;
      }
      router.push(getDashboardPathByRole(role));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    setIsGoogleLoading(true);
    setTimeout(() => router.push("/student/dashboard"), 1500);
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
          <h1 className="text-4xl font-bold mb-8 leading-tight drop-shadow-md">
            Your TOEIC journey<br />starts here.
          </h1>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white dark:bg-background">
        <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6">
          <h2 className="text-3xl font-bold text-foreground">Create your account</h2>

          {error && (
            <div className="rounded-xl border border-destructive/50 bg-destructive/10 px-4 py-3 text-sm text-destructive">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" required value={fullName} onChange={(e) => setFullName(e.target.value)} className="rounded-xl" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <Select value={role} onValueChange={setRole}>
              <SelectTrigger className="rounded-xl">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Student">Student</SelectItem>
                <SelectItem value="Teacher">Teacher</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email address</Label>
            <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="rounded-xl" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="rounded-xl" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm">Confirm Password</Label>
              <Input id="confirm" type="password" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="rounded-xl" />
            </div>
          </div>

          <Button type="submit" className="w-full rounded-xl bg-[#4b6cb7] hover:bg-[#3b5b9c] text-white" size="lg" disabled={loading}>
            {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Create account"}
          </Button>

          <Button type="button" variant="outline" className="w-full rounded-xl" size="lg" onClick={handleGoogleLogin} disabled={isGoogleLoading}>
            {isGoogleLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : "Continue with Google"}
          </Button>

          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="text-[#4b6cb7] font-semibold hover:underline">Log in</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
