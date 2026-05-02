import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  BookOpen, 
  CreditCard, 
  Settings, 
  Bell,
  Search,
  TrendingUp,
  DollarSign,
  UserCheck,
  Plus,
  Save,
  Trash2,
  Edit3,
  MoreVertical,
  CheckCircle2,
  XCircle,
  Filter,
  Calendar,
  Mail,
  ShieldCheck,
  Clock
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { showSuccess } from "@/utils/toast";

const INITIAL_COURSES = [
  { id: 1, title: "Quantum Mechanics Mastery", instructor: "Dr. Sarah Chen", category: "Physics", price: "2499", students: 12500, status: "Active" },
  { id: 2, title: "Calculus: From Zero to Hero", instructor: "Prof. Rajesh Kumar", category: "Mathematics", price: "1999", students: 8200, status: "Active" },
  { id: 7, title: "CCC: Computer Concepts Mastery", instructor: "Prof. Alok Mishra", category: "Computer", price: "1700", students: 20100, status: "Active" },
  { id: 3, title: "Organic Chemistry Simplified", instructor: "Dr. Amit Shah", category: "Chemistry", price: "1499", students: 5100, status: "Draft" },
];

const INITIAL_STUDENTS = [
  { id: 1, name: "Aryan Sharma", email: "aryan@example.com", plan: "Yearly", status: "Active", joinDate: "2023-10-01", expiryDate: "2024-10-01", amount: "4499" },
  { id: 2, name: "Priya Patel", email: "priya@example.com", plan: "Monthly", status: "Active", joinDate: "2024-01-15", expiryDate: "2024-02-15", amount: "499" },
  { id: 3, name: "Rahul Verma", email: "rahul@example.com", plan: "Quarterly", status: "Expired", joinDate: "2023-06-10", expiryDate: "2023-09-10", amount: "1299" },
  { id: 4, name: "Anjali Gupta", email: "anjali@example.com", plan: "Trial", status: "Active", joinDate: "2024-01-20", expiryDate: "2024-01-27", amount: "0" },
  { id: 5, name: "Siddharth Singh", email: "sid@example.com", plan: "Half-Yearly", status: "Active", joinDate: "2023-11-05", expiryDate: "2024-05-05", amount: "2499" },
];

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("Overview");
  const [courses, setCourses] = useState(INITIAL_COURSES);
  const [students, setStudents] = useState(INITIAL_STUDENTS);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isRegisterDialogOpen, setIsRegisterDialogOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<any>(null);
  
  const [subscriptions, setSubscriptions] = useState({
    monthly: "499",
    quarterly: "1299",
    halfYearly: "2499",
    yearly: "4499"
  });

  const handleSaveSubscriptions = () => {
    showSuccess("Subscription plans updated successfully!");
  };

  const handleDeleteCourse = (id: number) => {
    setCourses(courses.filter(c => c.id !== id));
    showSuccess("Course removed successfully!");
  };

  const handleAddCourse = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newCourse = {
      id: Date.now(),
      title: formData.get('title') as string,
      instructor: formData.get('instructor') as string,
      category: formData.get('category') as string,
      price: formData.get('price') as string,
      students: 0,
      status: "Active"
    };
    setCourses([newCourse, ...courses]);
    setIsAddDialogOpen(false);
    showSuccess("New course added successfully!");
  };

  const handleRegisterStudent = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const plan = formData.get('plan') as string;
    const amount = plan === 'Monthly' ? subscriptions.monthly : 
                   plan === 'Quarterly' ? subscriptions.quarterly :
                   plan === 'Half-Yearly' ? subscriptions.halfYearly :
                   plan === 'Yearly' ? subscriptions.yearly : "0";

    const newStudent = {
      id: Date.now(),
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      plan: plan,
      status: "Active",
      joinDate: new Date().toISOString().split('T')[0],
      expiryDate: "2025-01-01", // Simplified for demo
      amount: amount
    };
    setStudents([newStudent, ...students]);
    setIsRegisterDialogOpen(false);
    showSuccess(`${newStudent.name} has been registered and enrolled!`);
  };

  const handleEditCourse = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const updatedCourses = courses.map(c => {
      if (c.id === editingCourse.id) {
        return {
          ...c,
          title: formData.get('title') as string,
          instructor: formData.get('instructor') as string,
          category: formData.get('category') as string,
          price: formData.get('price') as string,
        };
      }
      return c;
    });
    setCourses(updatedCourses);
    setEditingCourse(null);
    showSuccess("Course updated successfully!");
  };

  const filteredCourses = courses.filter(c => 
    c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.instructor.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredStudents = students.filter(s => 
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#FAFAFF] flex">
      {/* Sidebar */}
      <aside className="w-72 bg-white border-r border-violet-100 hidden lg:flex flex-col sticky top-0 h-screen">
        <div className="p-8 flex items-center gap-3 border-b border-violet-50">
          <div className="p-2 bg-gradient-to-br from-violet-600 to-cyan-500 rounded-xl shadow-lg shadow-violet-200">
            <LayoutDashboard className="h-6 w-6 text-white" />
          </div>
          <span className="font-black text-xl tracking-tighter text-gray-900">ADMIN PANEL</span>
        </div>
        <nav className="flex-1 p-6 space-y-2">
          {[
            { icon: <LayoutDashboard size={20} />, label: "Overview" },
            { icon: <Users size={20} />, label: "Students" },
            { icon: <BookOpen size={20} />, label: "Courses" },
            { icon: <CreditCard size={20} />, label: "Subscriptions" },
            { icon: <Bell size={20} />, label: "Notifications" },
            { icon: <Settings size={20} />, label: "Settings" },
          ].map((item, i) => (
            <button 
              key={i} 
              onClick={() => setActiveTab(item.label)}
              className={`w-full flex items-center gap-4 px-5 py-3.5 rounded-2xl text-sm font-bold transition-all ${
                activeTab === item.label 
                ? "bg-violet-600 text-white shadow-xl shadow-violet-200 scale-[1.02]" 
                : "text-gray-500 hover:bg-violet-50 hover:text-violet-600"
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>
        <div className="p-6 border-t border-violet-50">
          <div className="bg-violet-50 rounded-2xl p-4">
            <p className="text-xs font-bold text-violet-600 uppercase tracking-widest mb-1">System Status</p>
            <div className="flex items-center gap-2 text-sm font-black text-gray-900">
              <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
              All Systems Operational
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-violet-100 flex items-center justify-between px-10 sticky top-0 z-40">
          <div className="relative w-96 group">
            <Search className="absolute left-4 top-3 h-5 w-5 text-gray-400 group-focus-within:text-violet-600 transition-colors" />
            <Input 
              placeholder="Search analytics, students, courses..." 
              className="pl-12 h-11 bg-violet-50/50 border-none rounded-xl focus:ring-2 focus:ring-violet-500 font-medium" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-6">
            <Button variant="ghost" size="icon" className="relative rounded-xl hover:bg-violet-50">
              <Bell className="h-6 w-6 text-gray-500" />
              <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
            </Button>
            <div className="flex items-center gap-3 pl-6 border-l border-violet-100">
              <div className="text-right hidden sm:block">
                <div className="text-sm font-black text-gray-900">Admin User</div>
                <div className="text-[10px] font-bold text-violet-600 uppercase tracking-widest">Super Admin</div>
              </div>
              <div className="h-11 w-11 rounded-2xl bg-gradient-to-br from-violet-100 to-violet-200 flex items-center justify-center text-violet-600 font-black shadow-sm">
                A
              </div>
            </div>
          </div>
        </header>

        <div className="p-10 max-w-7xl mx-auto">
          {activeTab === "Overview" && (
            <>
              <div className="mb-10">
                <h1 className="text-4xl font-black text-gray-900 mb-2">Dashboard Overview</h1>
                <p className="text-gray-500 font-medium">Real-time insights into your learning platform's performance.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
                {[
                  { label: "Total Revenue", value: "₹4,25,000", icon: <DollarSign />, color: "text-green-600", bg: "bg-green-50" },
                  { label: "Active Students", value: "12,450", icon: <Users />, color: "text-blue-600", bg: "bg-blue-50" },
                  { label: "New Enrollments", value: "+142", icon: <TrendingUp />, color: "text-indigo-600", bg: "bg-indigo-50" },
                  { label: "Active Teachers", value: "86", icon: <UserCheck />, color: "text-orange-600", bg: "bg-orange-50" },
                ].map((stat, i) => (
                  <Card key={i} className="border-none shadow-xl shadow-violet-100/30 rounded-[2rem] bg-white/80 backdrop-blur-xl">
                    <CardContent className="p-8">
                      <div className="flex items-center justify-between mb-6">
                        <div className={`p-3 rounded-2xl ${stat.bg} ${stat.color} shadow-sm`}>{stat.icon}</div>
                        <Badge className="bg-green-100 text-green-700 border-none font-bold">+12%</Badge>
                      </div>
                      <div className="text-3xl font-black text-gray-900 mb-1">{stat.value}</div>
                      <div className="text-sm font-bold text-gray-400 uppercase tracking-widest">{stat.label}</div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                <Card className="border-none shadow-xl shadow-violet-100/30 rounded-[2.5rem] bg-white/80 backdrop-blur-xl">
                  <CardHeader className="p-8 pb-0">
                    <CardTitle className="text-xl font-black">Recent Enrollments</CardTitle>
                  </CardHeader>
                  <CardContent className="p-8">
                    <div className="space-y-6">
                      {students.slice(0, 4).map((student, i) => (
                        <div key={i} className="flex items-center justify-between p-4 hover:bg-violet-50/50 rounded-2xl transition-all group">
                          <div className="flex items-center gap-4">
                            <div className="h-12 w-12 rounded-2xl bg-violet-100 flex items-center justify-center text-violet-600 font-black group-hover:scale-110 transition-transform">
                              {student.name.charAt(0)}
                            </div>
                            <div>
                              <div className="font-black text-gray-900">{student.name}</div>
                              <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">{student.plan} Plan</div>
                            </div>
                          </div>
                          <div className="text-lg font-black text-violet-600">₹{student.amount}</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border-none shadow-xl shadow-violet-100/30 rounded-[2.5rem] bg-white/80 backdrop-blur-xl">
                  <CardHeader className="p-8 pb-0">
                    <CardTitle className="text-xl font-black">System Health</CardTitle>
                  </CardHeader>
                  <CardContent className="p-8">
                    <div className="space-y-8">
                      <div>
                        <div className="flex justify-between text-sm font-bold mb-3">
                          <span className="text-gray-600">Server Load</span>
                          <span className="text-violet-600">24%</span>
                        </div>
                        <div className="h-3 bg-violet-50 rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-violet-500 to-cyan-500 w-[24%] rounded-full"></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm font-bold mb-3">
                          <span className="text-gray-600">Storage Used</span>
                          <span className="text-cyan-600">68%</span>
                        </div>
                        <div className="h-3 bg-violet-50 rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 w-[68%] rounded-full"></div>
                        </div>
                      </div>
                      <div className="p-6 bg-violet-50/50 rounded-[2rem] border border-violet-100">
                        <div className="flex items-center gap-3 text-violet-600 font-black mb-2">
                          <CheckCircle2 size={20} />
                          Database Optimized
                        </div>
                        <p className="text-xs font-medium text-gray-500">Last optimization performed 2 hours ago. All indexes are healthy.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </>
          )}

          {activeTab === "Students" && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
                <div>
                  <h1 className="text-4xl font-black text-gray-900 mb-2">Student Management</h1>
                  <p className="text-gray-500 font-medium">Monitor student progress and subscription details.</p>
                </div>
                <Dialog open={isRegisterDialogOpen} onOpenChange={setIsRegisterDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-gradient-to-r from-violet-600 to-cyan-600 hover:opacity-90 text-white font-black px-8 h-14 rounded-2xl shadow-xl shadow-violet-200 transition-all hover:scale-105">
                      <Plus className="mr-2 h-5 w-5" /> Register Student
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[500px] rounded-[2.5rem] p-10">
                    <DialogHeader>
                      <DialogTitle className="text-3xl font-black">Register New Student</DialogTitle>
                      <CardDescription className="text-lg font-medium">Manually enroll a student into the platform.</CardDescription>
                    </DialogHeader>
                    <form onSubmit={handleRegisterStudent} className="space-y-6 mt-6">
                      <div className="space-y-2">
                        <Label className="font-bold ml-1">Full Name</Label>
                        <Input name="name" placeholder="e.g. John Doe" className="h-12 rounded-xl border-violet-100" required />
                      </div>
                      <div className="space-y-2">
                        <Label className="font-bold ml-1">Email Address</Label>
                        <Input name="email" type="email" placeholder="john@example.com" className="h-12 rounded-xl border-violet-100" required />
                      </div>
                      <div className="space-y-2">
                        <Label className="font-bold ml-1">Subscription Plan</Label>
                        <Select name="plan" defaultValue="Monthly">
                          <SelectTrigger className="h-12 rounded-xl border-violet-100">
                            <SelectValue placeholder="Select a plan" />
                          </SelectTrigger>
                          <SelectContent className="rounded-xl border-violet-50">
                            <SelectItem value="Trial">Trial (7 Days)</SelectItem>
                            <SelectItem value="Monthly">Monthly</SelectItem>
                            <SelectItem value="Quarterly">Quarterly</SelectItem>
                            <SelectItem value="Half-Yearly">Half-Yearly</SelectItem>
                            <SelectItem value="Yearly">Yearly</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <DialogFooter className="pt-6">
                        <Button type="button" variant="ghost" onClick={() => setIsRegisterDialogOpen(false)} className="rounded-xl font-bold">Cancel</Button>
                        <Button type="submit" className="bg-violet-600 hover:bg-violet-700 text-white font-black px-8 h-12 rounded-xl shadow-lg shadow-violet-100">Enroll Student</Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>

              <Card className="border-none shadow-xl shadow-violet-100/30 rounded-[2.5rem] overflow-hidden bg-white/80 backdrop-blur-xl">
                <div className="p-8 border-b border-violet-50 flex flex-col md:flex-row justify-between items-center gap-6">
                  <div className="relative w-full md:w-96">
                    <Search className="absolute left-4 top-3 h-5 w-5 text-gray-400" />
                    <Input 
                      placeholder="Search by name or email..." 
                      className="pl-12 h-11 bg-violet-50/50 border-none rounded-xl font-medium"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <div className="flex items-center gap-3">
                    <Button variant="outline" className="rounded-xl font-bold border-violet-100 text-gray-500">
                      <Filter className="mr-2 h-4 w-4" /> Filter
                    </Button>
                    <Button variant="outline" className="rounded-xl font-bold border-violet-100 text-gray-500">Export CSV</Button>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-violet-50/50">
                        <th className="p-6 text-xs font-black text-gray-400 uppercase tracking-widest">Student</th>
                        <th className="p-6 text-xs font-black text-gray-400 uppercase tracking-widest">Plan</th>
                        <th className="p-6 text-xs font-black text-gray-400 uppercase tracking-widest">Status</th>
                        <th className="p-6 text-xs font-black text-gray-400 uppercase tracking-widest">Join Date</th>
                        <th className="p-6 text-xs font-black text-gray-400 uppercase tracking-widest">Expiry Date</th>
                        <th className="p-6 text-xs font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-violet-50">
                      {filteredStudents.map((student) => (
                        <tr key={student.id} className="hover:bg-violet-50/30 transition-colors group">
                          <td className="p-6">
                            <div className="flex items-center gap-4">
                              <div className="h-12 w-12 rounded-2xl bg-violet-100 flex items-center justify-center text-violet-600 font-black">
                                {student.name.charAt(0)}
                              </div>
                              <div>
                                <div className="font-black text-gray-900 group-hover:text-violet-600 transition-colors">{student.name}</div>
                                <div className="text-xs font-bold text-gray-400">{student.email}</div>
                              </div>
                            </div>
                          </td>
                          <td className="p-6">
                            <Badge variant="outline" className="rounded-lg border-violet-100 text-violet-600 font-bold">{student.plan}</Badge>
                          </td>
                          <td className="p-6">
                            <div className={`flex items-center gap-2 text-xs font-black uppercase tracking-wider ${student.status === 'Active' ? 'text-green-600' : 'text-red-500'}`}>
                              <div className={`h-2 w-2 rounded-full ${student.status === 'Active' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                              {student.status}
                            </div>
                          </td>
                          <td className="p-6 font-bold text-gray-500">{student.joinDate}</td>
                          <td className="p-6 font-bold text-gray-500">{student.expiryDate}</td>
                          <td className="p-6 text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="rounded-xl hover:bg-violet-100">
                                  <MoreVertical className="h-5 w-5 text-gray-400" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="rounded-2xl p-2 w-48 shadow-2xl border-violet-50">
                                <DropdownMenuItem className="rounded-xl font-bold text-gray-600 focus:bg-violet-50 focus:text-violet-600 cursor-pointer">
                                  <Mail className="mr-2 h-4 w-4" /> Email Student
                                </DropdownMenuItem>
                                <DropdownMenuItem className="rounded-xl font-bold text-gray-600 focus:bg-violet-50 focus:text-violet-600 cursor-pointer">
                                  <ShieldCheck className="mr-2 h-4 w-4" /> Manage Plan
                                </DropdownMenuItem>
                                <DropdownMenuItem className="rounded-xl font-bold text-red-500 focus:bg-red-50 focus:text-red-600 cursor-pointer">
                                  <Trash2 className="mr-2 h-4 w-4" /> Remove Student
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>
          )}

          {activeTab === "Courses" && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
                <div>
                  <h1 className="text-4xl font-black text-gray-900 mb-2">Course Management</h1>
                  <p className="text-gray-500 font-medium">Manage, edit, and monitor all educational content.</p>
                </div>
                <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-gradient-to-r from-violet-600 to-cyan-600 hover:opacity-90 text-white font-black px-8 h-14 rounded-2xl shadow-xl shadow-violet-200 transition-all hover:scale-105">
                      <Plus className="mr-2 h-5 w-5" /> Add New Course
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[600px] rounded-[2.5rem] p-10">
                    <DialogHeader>
                      <DialogTitle className="text-3xl font-black">Create New Course</DialogTitle>
                      <CardDescription className="text-lg font-medium">Fill in the details to launch a new course on the platform.</CardDescription>
                    </DialogHeader>
                    <form onSubmit={handleAddCourse} className="space-y-6 mt-6">
                      <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label className="font-bold ml-1">Course Title</Label>
                          <Input name="title" placeholder="e.g. Advanced Physics" className="h-12 rounded-xl border-violet-100" required />
                        </div>
                        <div className="space-y-2">
                          <Label className="font-bold ml-1">Instructor Name</Label>
                          <Input name="instructor" placeholder="e.g. Dr. Smith" className="h-12 rounded-xl border-violet-100" required />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label className="font-bold ml-1">Category</Label>
                          <Input name="category" placeholder="e.g. Science" className="h-12 rounded-xl border-violet-100" required />
                        </div>
                        <div className="space-y-2">
                          <Label className="font-bold ml-1">Price (₹)</Label>
                          <Input name="price" type="number" placeholder="1700" className="h-12 rounded-xl border-violet-100" required />
                        </div>
                      </div>
                      <DialogFooter className="pt-6">
                        <Button type="button" variant="ghost" onClick={() => setIsAddDialogOpen(false)} className="rounded-xl font-bold">Cancel</Button>
                        <Button type="submit" className="bg-violet-600 hover:bg-violet-700 text-white font-black px-8 h-12 rounded-xl shadow-lg shadow-violet-100">Create Course</Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>

              <Card className="border-none shadow-xl shadow-violet-100/30 rounded-[2.5rem] overflow-hidden bg-white/80 backdrop-blur-xl">
                <div className="p-8 border-b border-violet-50 flex flex-col md:flex-row justify-between items-center gap-6">
                  <div className="relative w-full md:w-96">
                    <Search className="absolute left-4 top-3 h-5 w-5 text-gray-400" />
                    <Input 
                      placeholder="Search by title or instructor..." 
                      className="pl-12 h-11 bg-violet-50/50 border-none rounded-xl font-medium"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <div className="flex items-center gap-3">
                    <Button variant="outline" className="rounded-xl font-bold border-violet-100 text-gray-500">
                      <Filter className="mr-2 h-4 w-4" /> Filter
                    </Button>
                    <Button variant="outline" className="rounded-xl font-bold border-violet-100 text-gray-500">Export CSV</Button>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-violet-50/50">
                        <th className="p-6 text-xs font-black text-gray-400 uppercase tracking-widest">Course Details</th>
                        <th className="p-6 text-xs font-black text-gray-400 uppercase tracking-widest">Category</th>
                        <th className="p-6 text-xs font-black text-gray-400 uppercase tracking-widest">Price</th>
                        <th className="p-6 text-xs font-black text-gray-400 uppercase tracking-widest">Students</th>
                        <th className="p-6 text-xs font-black text-gray-400 uppercase tracking-widest">Status</th>
                        <th className="p-6 text-xs font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-violet-50">
                      {filteredCourses.map((course) => (
                        <tr key={course.id} className="hover:bg-violet-50/30 transition-colors group">
                          <td className="p-6">
                            <div className="flex items-center gap-4">
                              <div className="h-12 w-12 rounded-2xl bg-violet-100 flex items-center justify-center text-violet-600 font-black">
                                {course.title.charAt(0)}
                              </div>
                              <div>
                                <div className="font-black text-gray-900 group-hover:text-violet-600 transition-colors">{course.title}</div>
                                <div className="text-xs font-bold text-gray-400">by {course.instructor}</div>
                              </div>
                            </div>
                          </td>
                          <td className="p-6">
                            <Badge variant="outline" className="rounded-lg border-violet-100 text-violet-600 font-bold">{course.category}</Badge>
                          </td>
                          <td className="p-6 font-black text-gray-900">₹{course.price}</td>
                          <td className="p-6 font-bold text-gray-500">{course.students.toLocaleString()}</td>
                          <td className="p-6">
                            <div className={`flex items-center gap-2 text-xs font-black uppercase tracking-wider ${course.status === 'Active' ? 'text-green-600' : 'text-orange-500'}`}>
                              <div className={`h-2 w-2 rounded-full ${course.status === 'Active' ? 'bg-green-500' : 'bg-orange-500'}`}></div>
                              {course.status}
                            </div>
                          </td>
                          <td className="p-6 text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="rounded-xl hover:bg-violet-100">
                                  <MoreVertical className="h-5 w-5 text-gray-400" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="rounded-2xl p-2 w-48 shadow-2xl border-violet-50">
                                <DropdownMenuItem 
                                  onClick={() => setEditingCourse(course)}
                                  className="rounded-xl font-bold text-gray-600 focus:bg-violet-50 focus:text-violet-600 cursor-pointer"
                                >
                                  <Edit3 className="mr-2 h-4 w-4" /> Edit Course
                                </DropdownMenuItem>
                                <DropdownMenuItem className="rounded-xl font-bold text-gray-600 focus:bg-violet-50 focus:text-violet-600 cursor-pointer">
                                  <Users className="mr-2 h-4 w-4" /> View Students
                                </DropdownMenuItem>
                                <DropdownMenuItem 
                                  onClick={() => handleDeleteCourse(course.id)}
                                  className="rounded-xl font-bold text-red-500 focus:bg-red-50 focus:text-red-600 cursor-pointer"
                                >
                                  <Trash2 className="mr-2 h-4 w-4" /> Delete Course
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>

              {/* Edit Dialog */}
              <Dialog open={!!editingCourse} onOpenChange={(open) => !open && setEditingCourse(null)}>
                <DialogContent className="sm:max-w-[600px] rounded-[2.5rem] p-10">
                  <DialogHeader>
                    <DialogTitle className="text-3xl font-black">Edit Course</DialogTitle>
                    <CardDescription className="text-lg font-medium">Update the course information below.</CardDescription>
                  </DialogHeader>
                  {editingCourse && (
                    <form onSubmit={handleEditCourse} className="space-y-6 mt-6">
                      <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label className="font-bold ml-1">Course Title</Label>
                          <Input name="title" defaultValue={editingCourse.title} className="h-12 rounded-xl border-violet-100" required />
                        </div>
                        <div className="space-y-2">
                          <Label className="font-bold ml-1">Instructor Name</Label>
                          <Input name="instructor" defaultValue={editingCourse.instructor} className="h-12 rounded-xl border-violet-100" required />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label className="font-bold ml-1">Category</Label>
                          <Input name="category" defaultValue={editingCourse.category} className="h-12 rounded-xl border-violet-100" required />
                        </div>
                        <div className="space-y-2">
                          <Label className="font-bold ml-1">Price (₹)</Label>
                          <Input name="price" type="number" defaultValue={editingCourse.price} className="h-12 rounded-xl border-violet-100" required />
                        </div>
                      </div>
                      <DialogFooter className="pt-6">
                        <Button type="button" variant="ghost" onClick={() => setEditingCourse(null)} className="rounded-xl font-bold">Cancel</Button>
                        <Button type="submit" className="bg-violet-600 hover:bg-violet-700 text-white font-black px-8 h-12 rounded-xl shadow-lg shadow-violet-100">Save Changes</Button>
                      </DialogFooter>
                    </form>
                  )}
                </DialogContent>
              </Dialog>
            </div>
          )}

          {activeTab === "Subscriptions" && (
            <div className="max-w-5xl animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="mb-10">
                <h1 className="text-4xl font-black text-gray-900 mb-2">Subscription Management</h1>
                <p className="text-gray-500 font-medium">Configure pricing and packages for your students.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <Card className="border-none shadow-xl shadow-violet-100/30 rounded-[2.5rem] overflow-hidden bg-white/80 backdrop-blur-xl">
                  <CardHeader className="p-8">
                    <CardTitle className="text-xl font-black">Pricing Configuration</CardTitle>
                    <CardDescription className="font-medium">Set the base price for each subscription tier.</CardDescription>
                  </CardHeader>
                  <CardContent className="p-8 space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="monthly" className="font-bold ml-1">Monthly Plan (₹)</Label>
                      <Input 
                        id="monthly" 
                        value={subscriptions.monthly} 
                        onChange={(e) => setSubscriptions({...subscriptions, monthly: e.target.value})}
                        className="h-12 rounded-xl border-violet-100"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="quarterly" className="font-bold ml-1">Quarterly Plan (₹)</Label>
                      <Input 
                        id="quarterly" 
                        value={subscriptions.quarterly} 
                        onChange={(e) => setSubscriptions({...subscriptions, quarterly: e.target.value})}
                        className="h-12 rounded-xl border-violet-100"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="halfYearly" className="font-bold ml-1">Half-Yearly Plan (₹)</Label>
                      <Input 
                        id="halfYearly" 
                        value={subscriptions.halfYearly} 
                        onChange={(e) => setSubscriptions({...subscriptions, halfYearly: e.target.value})}
                        className="h-12 rounded-xl border-violet-100"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="yearly" className="font-bold ml-1">Yearly Plan (₹)</Label>
                      <Input 
                        id="yearly" 
                        value={subscriptions.yearly} 
                        onChange={(e) => setSubscriptions({...subscriptions, yearly: e.target.value})}
                        className="h-12 rounded-xl border-violet-100"
                      />
                    </div>
                    <Button onClick={handleSaveSubscriptions} className="w-full bg-violet-600 hover:bg-violet-700 text-white font-black h-14 rounded-2xl shadow-xl shadow-violet-100 transition-all active:scale-[0.98]">
                      <Save className="mr-2 h-5 w-5" /> Save Changes
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-none shadow-2xl shadow-violet-200/50 rounded-[2.5rem] bg-gradient-to-br from-violet-600 to-indigo-700 text-white overflow-hidden relative">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
                  <CardHeader className="p-8 relative z-10">
                    <CardTitle className="text-xl font-black text-white">Payment Gateway Status</CardTitle>
                    <CardDescription className="text-violet-100 font-medium">Connect your payment provider to start accepting payments.</CardDescription>
                  </CardHeader>
                  <CardContent className="p-8 space-y-8 relative z-10">
                    <div className="p-6 bg-white/10 backdrop-blur-md rounded-[2rem] border border-white/20">
                      <div className="flex items-center justify-between mb-4">
                        <span className="font-black text-lg">Razorpay</span>
                        <Badge className="bg-yellow-400 text-yellow-900 border-none font-black px-3 py-1">PENDING SETUP</Badge>
                      </div>
                      <p className="text-sm text-violet-100 mb-6 font-medium">Requires API Key and Secret from your Razorpay dashboard.</p>
                      <Button variant="secondary" className="w-full bg-white text-violet-600 hover:bg-violet-50 font-black h-12 rounded-xl">
                        Configure Razorpay
                      </Button>
                    </div>

                    <div className="p-6 bg-white/10 backdrop-blur-md rounded-[2rem] border border-white/20">
                      <div className="flex items-center justify-between mb-4">
                        <span className="font-black text-lg">Stripe</span>
                        <Badge className="bg-white/20 text-white border-none font-black px-3 py-1">DISABLED</Badge>
                      </div>
                      <p className="text-sm text-violet-100 mb-6 font-medium">International payments support for global students.</p>
                      <Button variant="ghost" className="w-full text-white border border-white/30 hover:bg-white/10 font-black h-12 rounded-xl">
                        Enable Stripe
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;