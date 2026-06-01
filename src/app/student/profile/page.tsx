import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { studentSidebarItems } from "@/lib/navigation";
import { Mail, Calendar, Target, User } from "lucide-react";

export default function ProfilePage() {
  return (
    <DashboardLayout sidebarItems={studentSidebarItems} title="Profile" subtitle="Manage your account">
      <div className="max-w-4xl mx-auto space-y-8 pb-8 pt-4">
        
        {/* Profile Header Card */}
        <Card className="rounded-3xl overflow-hidden shadow-sm border-none bg-card">
          {/* Blue Banner */}
          <div className="h-40 bg-gradient-to-r from-[#3A5BCC] to-[#5b7aeb] w-full relative">
            <div className="absolute inset-0 bg-white/10 mix-blend-overlay"></div>
          </div>
          
          <CardContent className="px-8 pb-8">
            <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6 -mt-20 relative z-10">
              <Avatar className="h-40 w-40 border-[6px] border-card shadow-lg bg-card">
                <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=student" className="object-cover" />
                <AvatarFallback>NA</AvatarFallback>
              </Avatar>
              
              <div className="flex-1 text-center sm:text-left mb-3">
                <h2 className="text-3xl font-extrabold text-foreground tracking-tight">Nguyen Van A</h2>
                <p className="text-muted-foreground font-medium flex items-center justify-center sm:justify-start gap-2 mt-2">
                  <Mail className="w-4 h-4" />
                  student@toeic.com
                </p>
              </div>
              
              <div className="mb-4">
                <Button variant="outline" className="rounded-full px-6 font-semibold border-2 hover:bg-muted">
                  Change Avatar
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Form Card */}
        <Card className="rounded-3xl shadow-sm border-none bg-card">
          <CardContent className="p-8 sm:p-10">
            <div className="flex items-center gap-3 mb-8">
              <div className="h-10 w-3 rounded-full bg-[#3A5BCC]"></div>
              <h3 className="text-2xl font-bold text-foreground">Personal Information</h3>
            </div>
            
            <div className="grid gap-8 sm:grid-cols-2">
              <div className="space-y-3">
                <Label className="text-sm font-semibold text-muted-foreground flex items-center gap-2">
                  <User className="w-4 h-4 text-[#3A5BCC]" />
                  Full Name
                </Label>
                <Input defaultValue="Nguyen Van A" className="rounded-2xl h-14 bg-muted/40 border-transparent hover:bg-muted/60 focus:bg-background transition-colors text-base font-medium px-4" />
              </div>
              
              <div className="space-y-3">
                <Label className="text-sm font-semibold text-muted-foreground flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#3A5BCC]" />
                  Email Address
                </Label>
                <Input defaultValue="student@toeic.com" readOnly className="rounded-2xl h-14 bg-muted/40 border-transparent text-muted-foreground cursor-not-allowed text-base px-4" />
              </div>
              
              <div className="space-y-3">
                <Label className="text-sm font-semibold text-muted-foreground flex items-center gap-2">
                  <Target className="w-4 h-4 text-[#3A5BCC]" />
                  Target Score
                </Label>
                <Input defaultValue="850" type="number" className="rounded-2xl h-14 bg-muted/40 border-transparent hover:bg-muted/60 focus:bg-background transition-colors text-base font-medium px-4" />
              </div>
              
              <div className="space-y-3">
                <Label className="text-sm font-semibold text-muted-foreground flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#3A5BCC]" />
                  Exam Date
                </Label>
                <Input type="date" defaultValue="2024-08-15" className="rounded-2xl h-14 bg-muted/40 border-transparent hover:bg-muted/60 focus:bg-background transition-colors text-base font-medium px-4" />
              </div>
            </div>
            
            <div className="mt-10 flex justify-end">
              <Button className="rounded-full px-10 h-14 bg-[#3A5BCC] hover:bg-blue-700 text-white shadow-lg shadow-blue-500/20 transition-all hover:-translate-y-1 text-base font-bold">
                Save Changes
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
