import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mail, Lock, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { showSuccess } from "@/utils/toast";
import Logo from "@/components/Logo";

const Login = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(false);

  const handleLogin = (role: string) => {
    setIsLoading(true);
    setTimeout(() => {
      showSuccess(`Welcome back, ${role === 'referral' ? 'Partner' : role.charAt(0).toUpperCase() + role.slice(1)}!`);
      navigate(`/${role}`);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAFAFF] p-4 relative overflow-hidden">
      {/* Decorative Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-violet-200/30 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-cyan-200/30 rounded-full blur-[120px]"></div>

      <Link to="/" className="absolute top-8 left-8 flex items-center text-gray-500 hover:text-violet-600 font-bold transition-colors z-10">
        <ArrowLeft className="mr-2 h-5 w-5" /> Back to Home
      </Link>
      
      <Card className="w-full max-w-md border-none shadow-2xl shadow-violet-100/50 rounded-[2.5rem] bg-white/80 backdrop-blur-xl relative z-10">
        <CardHeader className="text-center space-y-2 pt-10">
          <div className="flex justify-center mb-4">
            <Logo iconSize={32} textSize="text-3xl" showText={false} />
          </div>
          <CardTitle className="text-3xl font-black tracking-tight text-gray-900">Welcome Back</CardTitle>
          <CardDescription className="text-gray-500 font-medium">Access your personalized portal</CardDescription>
        </CardHeader>
        <CardContent className="pb-10">
          <Tabs defaultValue="student" className="w-full">
            <TabsList className="grid w-full grid-cols-5 mb-8 bg-violet-50/50 p-1.5 rounded-2xl">
              <TabsTrigger value="student" className="rounded-xl font-bold text-[9px] data-[state=active]:bg-white data-[state=active]:text-violet-600 data-[state=active]:shadow-sm">Student</TabsTrigger>
              <TabsTrigger value="teacher" className="rounded-xl font-bold text-[9px] data-[state=active]:bg-white data-[state=active]:text-violet-600 data-[state=active]:shadow-sm">Teacher</TabsTrigger>
              <TabsTrigger value="moderator" className="rounded-xl font-bold text-[9px] data-[state=active]:bg-white data-[state=active]:text-violet-600 data-[state=active]:shadow-sm">Mod</TabsTrigger>
              <TabsTrigger value="referral" className="rounded-xl font-bold text-[9px] data-[state=active]:bg-white data-[state=active]:text-violet-600 data-[state=active]:shadow-sm">Partner</TabsTrigger>
              <TabsTrigger value="admin" className="rounded-xl font-bold text-[9px] data-[state=active]:bg-white data-[state=active]:text-violet-600 data-[state=active]:shadow-sm">Admin</TabsTrigger>
            </TabsList>
            
            {['student', 'teacher', 'moderator', 'referral', 'admin'].map((role) => (
              <TabsContent key={role} value={role} className="animate-in fade-in zoom-in-95 duration-300">
                <form onSubmit={(e) => { e.preventDefault(); handleLogin(role); }} className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor={`${role}-email`} className="font-bold text-gray-700 ml-1">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
                      <Input 
                        id={`${role}-email`} 
                        placeholder="name@example.com" 
                        className="pl-12 h-12 rounded-xl border-violet-100 bg-white focus:ring-violet-500 focus:border-violet-500 font-medium" 
                        required 
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between ml-1">
                      <Label htmlFor={`${role}-password`} className="font-bold text-gray-700">Password</Label>
                      <button type="button" className="text-xs font-bold text-violet-600 hover:underline">Forgot password?</button>
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
                      <Input 
                        id={`${role}-password`} 
                        type="password" 
                        placeholder="••••••••" 
                        className="pl-12 h-12 rounded-xl border-violet-100 bg-white focus:ring-violet-500 focus:border-violet-500 font-medium" 
                        required 
                      />
                    </div>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-violet-600 to-cyan-600 hover:opacity-90 h-14 rounded-2xl text-lg font-black shadow-lg shadow-violet-100 transition-all active:scale-[0.98]" disabled={isLoading}>
                    {isLoading ? "Authenticating..." : `Sign in as ${role === 'referral' ? 'Partner' : role.charAt(0).toUpperCase() + role.slice(1)}`}
                  </Button>
                </form>
              </TabsContent>
            ))}
          </Tabs>
          
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500 font-medium">
              New to KnowledgeWorld? <button className="text-violet-600 font-black hover:underline">Create an account</button>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;