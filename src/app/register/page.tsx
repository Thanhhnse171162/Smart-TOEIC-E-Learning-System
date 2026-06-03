"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { BookOpen, CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { registerWithApi, verifyEmailWithApi } from "@/layers/business/auth.client";
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
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) {
      const digits = value.replace(/\D/g, '').split('').slice(0, 6);
      const newOtp = [...otp];
      digits.forEach((digit, i) => {
        if (index + i < 6) newOtp[index + i] = digit;
      });
      setOtp(newOtp);
      const nextIndex = Math.min(index + digits.length, 5);
      document.getElementById(`otp-${nextIndex}`)?.focus();
      return;
    }

    if (value && !/^\d$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`)?.focus();
    } else if (e.key === "ArrowLeft" && index > 0) {
      document.getElementById(`otp-${index - 1}`)?.focus();
    } else if (e.key === "ArrowRight" && index < 5) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (step === 1) {
      if (password !== confirmPassword) {
        setError("Passwords do not match");
        return;
      }
      setLoading(true);
      try {
        if (USE_API) {
          await registerWithApi({
            fullName,
            email,
            password,
            confirmPassword,
            role,
          });
        }
        setStep(2);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Registration failed");
      } finally {
        setLoading(false);
      }
      return;
    }

    if (step === 2) {
      const otpCode = otp.join("");
      if (otpCode.length < 6) {
        setError("Please enter the complete 6-digit OTP code");
        return;
      }

      setLoading(true);
      try {
        if (USE_API) {
          const { redirectTo } = await verifyEmailWithApi(email, otpCode, password);
          router.push(redirectTo);
          return;
        }
        router.push(getDashboardPathByRole(role));
      } catch (err) {
        setError(err instanceof Error ? err.message : "Verification failed");
      } finally {
        setLoading(false);
      }
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

      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-slate-50 dark:bg-background">
        <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6 p-8 sm:p-10 bg-white dark:bg-card border rounded-3xl shadow-xl">
          <h2 className="text-3xl font-bold text-foreground">
            {step === 1 ? "Create your account" : "Verify your email"}
          </h2>

          {error && (
            <div className="rounded-xl border border-destructive/50 bg-destructive/10 px-4 py-3 text-sm text-destructive">
              {error}
            </div>
          )}

          {step === 1 ? (
            <>
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

              <Button type="submit" className="w-full rounded-xl bg-[#4b6cb7] hover:bg-[#3b5b9c] text-white mt-4" size="lg" disabled={loading}>
                {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Continue to Verify"}
              </Button>

              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center"><span className="w-full border-t" /></div>
                <div className="relative flex justify-center text-xs">
                  <span className="bg-white dark:bg-card px-2 text-muted-foreground">or</span>
                </div>
              </div>

              <Button type="button" variant="outline" className="w-full rounded-xl" size="lg" onClick={handleGoogleLogin} disabled={isGoogleLoading}>
                {isGoogleLoading ? (
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                ) : (
                  <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
                )}
                {isGoogleLoading ? "Connecting to Google..." : "Continue with Google"}
              </Button>
            </>
          ) : (
            <div className="space-y-6">
              <p className="text-sm text-muted-foreground text-center">
                We have sent a 6-digit verification code to <br/>
                <span className="font-semibold text-foreground">{email}</span>.
              </p>
              
              <div className="flex justify-between gap-2 my-8">
                {otp.map((digit, index) => (
                  <Input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    inputMode="numeric"
                    maxLength={6}
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(index, e)}
                    onFocus={(e) => e.target.select()}
                    autoComplete="one-time-code"
                    className="w-12 h-14 text-center text-2xl rounded-xl font-bold transition-all focus:scale-110"
                  />
                ))}
              </div>

              <Button type="submit" className="w-full rounded-xl bg-[#4b6cb7] hover:bg-[#3b5b9c] text-white" size="lg" disabled={loading}>
                {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Verify & Create Account"}
              </Button>

              <div className="text-center mt-4 space-y-2">
                <Button type="button" variant="link" className="text-sm text-[#4b6cb7]" onClick={() => {
                  setOtp(["", "", "", "", "", ""]);
                  setLoading(true);
                  setTimeout(() => setLoading(false), 1000);
                }}>
                  Resend OTP code
                </Button>
                <div>
                  <Button type="button" variant="link" className="text-xs text-muted-foreground" onClick={() => setStep(1)}>
                    Wrong email? Go back
                  </Button>
                </div>
              </div>
            </div>
          )}

          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="text-[#4b6cb7] font-semibold hover:underline">Log in</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
