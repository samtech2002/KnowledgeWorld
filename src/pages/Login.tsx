import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GraduationCap, Mail, Lock, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { showSuccess } from "@/utils/toast";

const Login = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(false);

  const handleLogin = (role: string) => {
    setIsLoading(true);
    // Mock login logic
    setTimeout(() => {
      showSuccess(`Logged in as ${role}`);
      navigate(`/${role}`);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Link to="/" className="absolute top-8 left-8 flex items-center text-gray-600 hover:text-indigo-600 transition-colors">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
      </Link>
      
      <Card className="w-full max-w-md border-none shadow-xl">
        <CardHeader className="text-center space-y-1">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-indigo-600 rounded-2xl">
              <GraduationCap className="h-8 w-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
          <CardDescription>Login to your KnowledgeWorld account</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="student" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="student">Student</TabsTrigger>
              <TabsTrigger value="teacher">Teacher</TabsTrigger>
              <TabsTrigger value="admin">Admin</TabsTrigger>
            </TabsList>
            
            {['student', 'teacher', 'admin'].map((role) => (
              <TabsContent key={role} value={role}>
                <form onSubmit={(e) => { e.preventDefault(); handleLogin(role); }} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor={`${role}-email`}>Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input id={`${role}-email`} placeholder="name@example.com" className="pl-10" required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor={`${role}-password`}>Password</Label>
                      <button type="button" className="text-xs text-indigo-600 hover:underline">Forgot password?</button>
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input id={`${role}-password`} type="password" placeholder="••••••••" className="pl-10" required />
                    </div>
                  </div>
                  <Button className="w-full bg-indigo-600 hover:bg-indigo-700 h-11" disabled={isLoading}>
                    {isLoading ? "Signing in..." : `Sign in as ${role.charAt(0).toUpperCase() + role.slice(1)}`}
                  </Button>
                </form>
              </TabsContent>
            ))}
          </Tabs>
          
          <div className="mt-6 text-center text-sm text-gray-500">
            Don't have an account? <button className="text-indigo-600 font-semibold hover:underline">Sign up</button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;