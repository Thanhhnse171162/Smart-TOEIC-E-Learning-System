"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { BookOpen, CheckCircle2, Eye, EyeOff, Loader2, User, Mail, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { registerWithApi, verifyEmailWithApi } from "@/layers/business/auth.client";
import { USE_API } from "@/lib/api/config";
import { getDashboardPathByRole } from "@/lib/auth/routes";

export default function RegisterPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const focusInput = (index: number) => {
    inputRefs.current[index]?.focus();
    inputRefs.current[index]?.select();
  };

  const handleOtpChange = (index: number, value: string) => {
    // Strip non-digits
    const digits = value.replace(/\D/g, '');

    // Paste / autocomplete: distribute from position 0
    if (digits.length > 1) {
      const newOtp = ["", "", "", "", "", ""];
      digits.split('').slice(0, 6).forEach((d, i) => { newOtp[i] = d; });
      setOtp(newOtp);
      focusInput(Math.min(digits.length, 5));
      return;
    }

    // Single digit typed
    if (digits === '' && value !== '') return; // blocked non-digit
    const newOtp = [...otp];
    newOtp[index] = digits;
    setOtp(newOtp);
    if (digits && index < 5) focusInput(index + 1);
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      if (otp[index]) {
        // Clear current cell
        const newOtp = [...otp];
        newOtp[index] = '';
        setOtp(newOtp);
      } else if (index > 0) {
        // Move back and clear
        const newOtp = [...otp];
        newOtp[index - 1] = '';
        setOtp(newOtp);
        focusInput(index - 1);
      }
      e.preventDefault();
    } else if (e.key === "ArrowLeft" && index > 0) {
      focusInput(index - 1);
    } else if (e.key === "ArrowRight" && index < 5) {
      focusInput(index + 1);
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
      if (password.length < 6) {
        setError("Password must be at least 6 characters");
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
            role: "Student",
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
          await verifyEmailWithApi(email, otpCode, password);
        }
        // Luôn redirect về login sau khi verify thành công
        router.push("/login?registered=1");
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
      {/* Left Panel */}
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
              Your TOEIC journey<br />starts here.
            </h1>
            <div className="space-y-4">
              {["Personalized practice for all 7 parts", "AI-powered learning assistant", "Track your progress in real-time"].map((t) => (
                <div key={t} className="flex items-center gap-3 text-lg drop-shadow-sm">
                  <CheckCircle2 className="h-6 w-6 shrink-0" />
                  <span>{t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-8 bg-slate-50 dark:bg-background">
        <form onSubmit={handleSubmit} className="w-full max-w-[440px] space-y-6 p-8 sm:p-10 bg-white dark:bg-card border border-slate-200 dark:border-slate-800 rounded-3xl shadow-xl">
          
          {/* Header */}
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
              {step === 1 ? "Create your account" : "Verify your email"}
            </h2>
            {step === 1 && (
              <p className="text-sm text-muted-foreground">
                Join thousands of students preparing for TOEIC
              </p>
            )}
          </div>

          {error && (
            <div className="rounded-xl border border-destructive/50 bg-destructive/10 px-4 py-3 text-sm text-destructive">
              {error}
            </div>
          )}

          {step === 1 ? (
            <>
              {/* Full Name */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-semibold">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input
                    id="name"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Enter your full name"
                    className="rounded-xl h-12 pl-10 border-slate-200 focus:border-[#4b6cb7] focus:ring-[#4b6cb7]"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-semibold">Email address</Label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="rounded-xl h-12 pl-10 border-slate-200 focus:border-[#4b6cb7] focus:ring-[#4b6cb7]"
                  />
                </div>
              </div>

              {/* Password Row */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-semibold">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="rounded-xl h-12 pl-10 pr-10 border-slate-200 focus:border-[#4b6cb7] focus:ring-[#4b6cb7]"
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm" className="text-sm font-semibold">Confirm</Label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input
                      id="confirm"
                      type={showConfirm ? "text" : "password"}
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      className="rounded-xl h-12 pl-10 pr-10 border-slate-200 focus:border-[#4b6cb7] focus:ring-[#4b6cb7]"
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                      onClick={() => setShowConfirm(!showConfirm)}
                    >
                      {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Submit */}
              <Button
                type="submit"
                className="w-full rounded-xl bg-[#4b6cb7] hover:bg-[#3b5b9c] text-white h-12 text-[15px] font-semibold shadow-md shadow-blue-500/10 mt-2"
                disabled={loading}
              >
                {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Create Account"}
              </Button>

              {/* Divider */}
              <div className="relative my-1">
                <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-slate-200" /></div>
                <div className="relative flex justify-center text-xs">
                  <span className="bg-white dark:bg-card px-3 text-muted-foreground">or continue with</span>
                </div>
              </div>

              {/* Google */}
              <Button
                type="button"
                variant="outline"
                className="w-full rounded-xl h-12 border-slate-200 hover:bg-slate-50 font-medium"
                onClick={handleGoogleLogin}
                disabled={isGoogleLoading}
              >
                {isGoogleLoading ? (
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                ) : (
                  <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
                )}
                {isGoogleLoading ? "Connecting..." : "Continue with Google"}
              </Button>
            </>
          ) : (
            <div className="space-y-6">
              <div className="text-center space-y-3">
                <div className="w-16 h-16 rounded-full bg-[#4b6cb7]/10 flex items-center justify-center mx-auto">
                  <Mail className="w-7 h-7 text-[#4b6cb7]" />
                </div>
                <p className="text-sm text-muted-foreground">
                  We sent a 6-digit code to<br />
                  <span className="font-semibold text-foreground">{email}</span>
                </p>
              </div>
              
              <div className="flex justify-center gap-2.5 my-6">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => { inputRefs.current[index] = el; }}
                    id={`otp-${index}`}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(index, e)}
                    onFocus={(e) => e.target.select()}
                    onPaste={(e) => {
                      e.preventDefault();
                      const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
                      const newOtp = ["", "", "", "", "", ""];
                      pasted.split('').forEach((d, i) => { newOtp[i] = d; });
                      setOtp(newOtp);
                      focusInput(Math.min(pasted.length, 5));
                    }}
                    autoComplete={index === 0 ? "one-time-code" : "off"}
                    className="w-12 h-14 text-center text-2xl rounded-xl font-bold border border-slate-200 focus:border-[#4b6cb7] focus:ring-2 focus:ring-[#4b6cb7] outline-none transition-all focus:scale-105 bg-white"
                  />
                ))}
              </div>

              <Button type="submit" className="w-full rounded-xl bg-[#4b6cb7] hover:bg-[#3b5b9c] text-white h-12 font-semibold" disabled={loading}>
                {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Verify & Create Account"}
              </Button>

              <div className="text-center space-y-1">
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
