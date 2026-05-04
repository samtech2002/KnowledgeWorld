import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Courses from "./pages/Courses";
import CourseDetails from "./pages/CourseDetails";
import Syllabus from "./pages/Syllabus";
import Resources from "./pages/Resources";
import AdminDashboard from "./pages/admin/AdminDashboard";
import TeacherDashboard from "./pages/teacher/TeacherDashboard";
import CreateCourse from "./pages/teacher/CreateCourse";
import StudentDashboard from "./pages/student/StudentDashboard";
import Exam from "./pages/student/Exam";
import DoubtHub from "./pages/student/DoubtHub";
import ReferralDashboard from "./pages/referral/ReferralDashboard";
import ReferralWallet from "./pages/referral/ReferralWallet";
import ReferralProfile from "./pages/referral/ReferralProfile";
import ModeratorDashboard from "./pages/moderator/ModeratorDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/course/:id" element={<CourseDetails />} />
          <Route path="/syllabus" element={<Syllabus />} />
          <Route path="/resources" element={<Resources />} />
          
          {/* Role-based Dashboards */}
          <Route path="/admin/*" element={<AdminDashboard />} />
          <Route path="/teacher" element={<TeacherDashboard />} />
          <Route path="/teacher/create" element={<CreateCourse />} />
          <Route path="/student" element={<StudentDashboard />} />
          <Route path="/student/exam" element={<Exam />} />
          <Route path="/student/doubts" element={<DoubtHub />} />
          <Route path="/moderator" element={<ModeratorDashboard />} />
          
          {/* Referral Partner Routes */}
          <Route path="/referral" element={<ReferralDashboard />} />
          <Route path="/referral/wallet" element={<ReferralWallet />} />
          <Route path="/referral/profile" element={<ReferralProfile />} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;