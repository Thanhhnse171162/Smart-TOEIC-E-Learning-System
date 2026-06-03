import Link from "next/link";
import Image from "next/image";
import {
  BarChart3,
  BookOpen,
  Bot,
  Check,
  ClipboardList,
  MessageCircle,
  Star,
  Trophy,
} from "lucide-react";
import { LandingFooter } from "@/components/layout/landing-footer";
import { LandingNavbar } from "@/components/layout/landing-navbar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { landingService } from "@/layers/business/services";

const features = [
  { icon: ClipboardList, title: "TOEIC Practice", desc: "Adaptive practice for all 7 parts with instant feedback.", highlight: false },
  { icon: Bot, title: "AI Learning Assistant", desc: "Get grammar explanations and strategy tips 24/7.", highlight: true },
  { icon: Trophy, title: "Full Mock Tests", desc: "Simulate real exam conditions with timed tests.", highlight: false },
  { icon: BookOpen, title: "Vocabulary Builder", desc: "Master business English vocabulary by topic.", highlight: false },
  { icon: BarChart3, title: "Progress Tracking", desc: "Visualize your improvement with detailed analytics.", highlight: false },
];

export default async function HomePage() {
  const { testimonials, pricingPlans } = await landingService.getLandingData();

  return (
    <div className="min-h-screen bg-background">
      <LandingNavbar />

      {/* Hero */}
      <section className="container mx-auto px-4 py-16 lg:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="space-y-6">
            <Badge variant="secondary" className="rounded-full px-4 py-1">AI-Powered TOEIC Platform</Badge>
            <h1 className="text-4xl font-bold tracking-tight lg:text-5xl xl:text-6xl">
              Boost Your TOEIC Score with{" "}
              <span className="text-primary">AI-Powered</span> Learning
            </h1>
            <p className="text-lg text-muted-foreground max-w-lg">
              Personalized learning platform with adaptive tests, real-time feedback, and an AI assistant to help you reach your target score faster.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/register">
                <Button size="lg" className="rounded-xl px-8">Start Learning</Button>
              </Link>
              <Link href="/student/mock-test">
                <Button size="lg" variant="outline" className="rounded-xl px-8">Try Mock Test</Button>
              </Link>
            </div>
          </div>
          <div className="relative flex justify-center items-center lg:pl-10">
            <div className="relative w-full aspect-[4/3] max-w-[550px] overflow-hidden [mask-image:linear-gradient(to_bottom,black,transparent_150%)]">
              <Image 
                src="/images/practice/screen.png" 
                alt="AI-Powered Learning Student" 
                fill
                className="object-cover scale-[1.05] mix-blend-multiply dark:mix-blend-normal hover:scale-[1.08] transition-transform duration-700 ease-out"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3">Smart Learning Features</h2>
          <p className="text-muted-foreground">Everything you need to ace the TOEIC exam</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <Card key={f.title} className={`rounded-xl transition-shadow hover:shadow-md ${f.highlight ? "bg-primary text-primary-foreground border-primary" : ""}`}>
              <CardHeader>
                <div className={`inline-flex h-10 w-10 items-center justify-center rounded-xl ${f.highlight ? "bg-white/20" : "bg-primary/10"}`}>
                  <f.icon className={`h-5 w-5 ${f.highlight ? "text-white" : "text-primary"}`} />
                </div>
                <CardTitle className={f.highlight ? "text-white" : ""}>{f.title}</CardTitle>
                <CardDescription className={f.highlight ? "text-white/80" : ""}>{f.desc}</CardDescription>
              </CardHeader>
              {f.highlight && (
                <CardContent>
                  <div className="rounded-xl bg-white/10 p-3 text-sm">
                    <MessageCircle className="inline h-4 w-4 mr-1" />
                    &quot;Why is &apos;at&apos; used here instead of &apos;in&apos;?&quot;
                  </div>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-muted/50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Trusted by Thousands</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <Card key={t.id} className="rounded-xl">
                <CardContent className="pt-6">
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="italic text-muted-foreground mb-6">&quot;{t.quote}&quot;</p>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={t.avatar} />
                      <AvatarFallback>{t.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-sm">{t.name}</p>
                      <p className="text-xs text-primary">Score: {t.score}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3">Simple, Transparent Pricing</h2>
          <p className="text-muted-foreground">Choose the plan that fits your learning goals</p>
        </div>
        <div className="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto">
          {pricingPlans.map((plan) => (
            <Card key={plan.id} className={`rounded-xl relative ${plan.popular ? "border-primary border-2 shadow-lg scale-105" : ""}`}>
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">POPULAR</Badge>
              )}
              <CardHeader className="text-center">
                <CardTitle>{plan.name}</CardTitle>
                <div className="mt-2">
                  <span className="text-4xl font-bold">${plan.price}</span>
                  <span className="text-muted-foreground">/{plan.period}</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-primary shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Link href="/register" className="w-full">
                  <Button
                    variant={plan.popular ? "default" : "outline"}
                    className="w-full rounded-xl"
                  >
                    {plan.current ? "Current Plan" : plan.popular ? "Get Started Pro" : "Contact Sales"}
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      <LandingFooter />

      {/* FAB */}
      <Link href="/student/ai-chat" className="fixed bottom-6 right-6 z-50">
        <Button size="icon" className="h-14 w-14 rounded-full shadow-lg">
          <MessageCircle className="h-6 w-6" />
        </Button>
      </Link>
    </div>
  );
}
