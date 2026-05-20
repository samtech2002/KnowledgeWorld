"use client";

import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Mail, 
  ShieldCheck, 
  Trash2,
  Eye,
  BookOpen,
  Star,
  Video,
  Users,
  Award,
  Ban,
  Wallet,
  FileText,
  CheckCircle2,
  XCircle,
  ArrowUpRight
} from "lucide-react";
import { Card, CardDescription, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { showSuccess } from "@/utils/toast";

interface TeachersTabProps {
  teachers: any[];
  searchQuery: string;
}

const TeachersTab = ({ teachers: initialTeachers, searchQuery }: TeachersTabProps) => {
  const [teachers, setTeachers] = useState(initialTeachers);
  const [selectedTeacher, setSelectedTeacher] = useState<any>(null);
  const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false);

  const [payoutRequests, setPayoutRequests] = useState([
    { id: 1, teacher: "Dr. Sarah Chen", amount: "45000", method: "Bank Transfer", date: "Oct 24, 2023", status: "Pending" },
    { id: 2, teacher: "Prof. Rajesh Kumar", amount: "28000", method: "UPI", date: "Oct 23, 2023", status: "Pending" },
  ]);

  const [verificationRequests, setVerificationRequests] = useState([
    { id: 1, teacher: "New Applicant: Dr. Mehra", subject: "Biology", docs: ["PhD Certificate", "ID Proof"], date: "2 hours ago" },
  ]);

  const filteredTeachers = teachers.filter(t => 
    t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleInvite = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newTeacher = {
      id: Date.now(),
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      subject: formData.get('subject') as string,
      rating: "0.0",
      students: 0,
      courses: 0,
      status: "Pending",
      joinDate: new Date().toISOString().split('T')[0]
    };
    setTeachers([newTeacher, ...teachers]);
    setIsInviteDialogOpen(false);
    showSuccess(`Invitation sent to ${newTeacher.name}!`);
  };

  const handleApprovePayout = (id: number) => {
    setPayoutRequests(payoutRequests.filter(r => r.id !== id));
    showSuccess("Teacher payout approved!");
  };

  const handleDelete = (id: number) => {
    setTeachers(teachers.filter(t => t.id !== id));
    showSuccess("Teacher removed from platform.");
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
        <div>
          <h1 className="text-4xl font-black text-gray-900 mb-2">Teacher Management</h1>
          <p className="text-gray-500 font-medium">Manage educators, monitor ratings, and track course performance.</p>
        </div>
        <Dialog open={isInviteDialogOpen} onOpenChange={setIsInviteDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-violet-600 to-cyan-600 hover:opacity-90 text-white font-black px-8 h-14 rounded-2xl shadow-xl shadow-violet-200 transition-all hover:scale-105">
              <Plus className="mr-2 h-5 w-5" /> Invite Teacher
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px] rounded-[2.5rem] p-10">
            <DialogHeader>
              <DialogTitle className="text-3xl font-black">Invite Educator</DialogTitle>
              <CardDescription className="text-lg font-medium">Send an invitation to a new teacher to join the platform.</CardDescription>
            </DialogHeader>
            <form onSubmit={handleInvite} className="space-y-6 mt-6">
              <div className="space-y-2">
                <Label className="font-bold ml-1">Full Name</Label>
                <Input name="name" placeholder="e.g. Prof. Alok Mishra" className="h-12 rounded-xl border-violet-100" required />
              </div>
              <div className="space-y-2">
                <Label className="font-bold ml-1">Email Address</Label>
                <Input name="email" type="email" placeholder="alok@example.com" className="h-12 rounded-xl border-violet-100" required />
              </div>
              <div className="space-y-2">
                <Label className="font-bold ml-1">Primary Subject</Label>
                <Input name="subject" placeholder="e.g. Physics, Computer" className="h-12 rounded-xl border-violet-100" required />
              </div>
              <DialogFooter className="pt-6">
                <Button type="button" variant="ghost" onClick={() => setIsInviteDialogOpen(false)} className="rounded-xl font-bold">Cancel</Button>
                <Button type="submit" className="bg-violet-600 hover:bg-violet-700 text-white font-black px-8 h-12 rounded-xl shadow-lg shadow-violet-100">Send Invite</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="directory" className="space-y-8">
        <TabsList className="bg-violet-50/50 p-1.5 rounded-2xl inline-flex">
          <TabsTrigger value="directory" className="rounded-xl font-bold px-6 data-[state=active]:bg-white data-[state=active]:text-violet-600 data-[state=active]:shadow-sm">
            <Users className="mr-2 h-4 w-4" /> Directory
          </TabsTrigger>
          <TabsTrigger value="payouts" className="rounded-xl font-bold px-6 data-[state=active]:bg-white data-[state=active]:text-violet-600 data-[state=active]:shadow-sm">
            <Wallet className="mr-2 h-4 w-4" /> Payouts
            {payoutRequests.length > 0 && <Badge className="ml-2 bg-red-500 text-white border-none">{payoutRequests.length}</Badge>}
          </TabsTrigger>
          <TabsTrigger value="verification" className="rounded-xl font-bold px-6 data-[state=active]:bg-white data-[state=active]:text-violet-600 data-[state=active]:shadow-sm">
            <ShieldCheck className="mr-2 h-4 w-4" /> Verification
          </TabsTrigger>
        </TabsList>

        <TabsContent value="directory">
          <Card className="border-none shadow-xl shadow-violet-100/30 rounded-[2.5rem] overflow-hidden bg-white/80 backdrop-blur-xl">
            <div className="p-8 border-b border-violet-50 flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="relative w-full md:w-96">
                <Search className="absolute left-4 top-3 h-5 w-5 text-gray-400" />
                <Input 
                  placeholder="Search by name, email or subject..." 
                  className="pl-12 h-11 bg-violet-50/50 border-none rounded-xl font-medium"
                  value={searchQuery}
                  readOnly
                />
              </div>
              <Button variant="outline" className="rounded-xl font-bold border-violet-100 text-gray-500">
                <Filter className="mr-2 h-4 w-4" /> Filter
              </Button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-violet-50/50">
                    <th className="p-6 text-xs font-black text-gray-400 uppercase tracking-widest">Teacher</th>
                    <th className="p-6 text-xs font-black text-gray-400 uppercase tracking-widest">Subject</th>
                    <th className="p-6 text-xs font-black text-gray-400 uppercase tracking-widest">Rating</th>
                    <th className="p-6 text-xs font-black text-gray-400 uppercase tracking-widest">Stats</th>
                    <th className="p-6 text-xs font-black text-gray-400 uppercase tracking-widest">Status</th>
                    <th className="p-6 text-xs font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-violet-50">
                  {filteredTeachers.map((teacher) => (
                    <tr key={teacher.id} className="hover:bg-violet-50/30 transition-colors group">
                      <td className="p-6">
                        <div className="flex items-center gap-4">
                          <div className="h-12 w-12 rounded-2xl bg-violet-100 flex items-center justify-center text-violet-600 font-black">
                            {teacher.name.charAt(0)}
                          </div>
                          <div>
                            <div className="font-black text-gray-900 group-hover:text-violet-600 transition-colors">{teacher.name}</div>
                            <div className="text-xs font-bold text-gray-400">{teacher.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-6">
                        <Badge variant="outline" className="rounded-lg border-violet-100 text-violet-600 font-bold">{teacher.subject}</Badge>
                      </td>
                      <td className="p-6">
                        <div className="flex items-center gap-1.5 text-yellow-500 font-black">
                          <Star className="h-4 w-4 fill-current" />
                          {teacher.rating}
                        </div>
                      </td>
                      <td className="p-6">
                        <div className="flex flex-col gap-1">
                          <div className="text-xs font-bold text-gray-500 flex items-center gap-1">
                            <Users size={12} /> {teacher.students.toLocaleString()} Students
                          </div>
                          <div className="text-xs font-bold text-gray-500 flex items-center gap-1">
                            <BookOpen size={12} /> {teacher.courses} Courses
                          </div>
                        </div>
                      </td>
                      <td className="p-6">
                        <Badge className={`rounded-lg font-bold ${
                          teacher.status === 'Active' ? 'bg-green-50 text-green-600' : 
                          teacher.status === 'Pending' ? 'bg-orange-50 text-orange-600' : 'bg-red-50 text-red-600'
                        }`}>
                          {teacher.status}
                        </Badge>
                      </td>
                      <td className="p-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => setSelectedTeacher(teacher)}
                            className="rounded-xl hover:bg-violet-100 text-violet-600"
                          >
                            <Eye className="h-5 w-5" />
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="rounded-xl hover:bg-violet-100">
                                <MoreVertical className="h-5 w-5 text-gray-400" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="rounded-2xl p-2 w-48 shadow-2xl border-violet-50">
                              <DropdownMenuItem className="rounded-xl font-bold text-gray-600 focus:bg-violet-50 focus:text-violet-600 cursor-pointer">
                                <Mail className="mr-2 h-4 w-4" /> Message Teacher
                              </DropdownMenuItem>
                              <DropdownMenuItem className="rounded-xl font-bold text-gray-600 focus:bg-violet-50 focus:text-violet-600 cursor-pointer">
                                <Award className="mr-2 h-4 w-4" /> Assign Bonus
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                onClick={() => handleDelete(teacher.id)}
                                className="rounded-xl font-bold text-red-500 focus:bg-red-50 focus:text-red-600 cursor-pointer"
                              >
                                <Ban className="mr-2 h-4 w-4" /> Suspend Account
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="payouts">
          <div className="grid grid-cols-1 gap-6">
            {payoutRequests.map((req) => (
              <Card key={req.id} className="border-none shadow-lg shadow-violet-100/30 rounded-[2rem] bg-white/80 backdrop-blur-xl overflow-hidden">
                <CardContent className="p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="flex items-center gap-6">
                    <div className="h-16 w-16 rounded-2xl bg-green-50 flex items-center justify-center text-green-600">
                      <ArrowUpRight size={32} />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">Earnings Withdrawal</div>
                      <h3 className="text-2xl font-black text-gray-900">₹{req.amount}</h3>
                      <p className="text-sm font-bold text-violet-600">{req.teacher} • {req.method}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Button variant="ghost" className="rounded-xl font-bold text-red-500 hover:bg-red-50">Reject</Button>
                    <Button 
                      onClick={() => handleApprovePayout(req.id)}
                      className="bg-green-600 hover:bg-green-700 text-white font-black px-8 h-12 rounded-xl shadow-lg"
                    >
                      Approve & Pay
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="verification">
          <div className="grid grid-cols-1 gap-6">
            {verificationRequests.map((req) => (
              <Card key={req.id} className="border-none shadow-lg shadow-violet-100/30 rounded-[2rem] bg-white/80 backdrop-blur-xl overflow-hidden">
                <CardContent className="p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="flex items-center gap-6">
                    <div className="h-16 w-16 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600">
                      <ShieldCheck size={32} />
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-gray-900">{req.teacher}</h3>
                      <p className="text-sm font-bold text-gray-500">{req.subject} Expert • Applied {req.date}</p>
                      <div className="flex gap-2 mt-2">
                        {req.docs.map((doc, i) => (
                          <Badge key={i} variant="secondary" className="bg-gray-100 text-gray-600 border-none text-[10px] font-bold">
                            <FileText size={10} className="mr-1" /> {doc}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Button variant="outline" className="rounded-xl font-bold border-violet-100 text-violet-600">View Documents</Button>
                    <Button className="bg-violet-600 hover:bg-violet-700 text-white font-black px-8 h-12 rounded-xl shadow-lg">
                      Verify & Activate
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Teacher Details Dialog */}
      <Dialog open={!!selectedTeacher} onOpenChange={(open) => !open && setSelectedTeacher(null)}>
        <DialogContent className="sm:max-w-[600px] rounded-[2.5rem] p-10">
          {selectedTeacher && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-6 mb-6">
                  <div className="h-20 w-20 rounded-[1.5rem] bg-violet-100 flex items-center justify-center text-violet-600 text-3xl font-black">
                    {selectedTeacher.name.charAt(0)}
                  </div>
                  <div>
                    <DialogTitle className="text-3xl font-black">{selectedTeacher.name}</DialogTitle>
                    <CardDescription className="text-lg font-medium">{selectedTeacher.email}</CardDescription>
                    <Badge className="mt-2 bg-violet-600 text-white border-none font-bold">{selectedTeacher.subject} Expert</Badge>
                  </div>
                </div>
              </DialogHeader>

              <div className="grid grid-cols-2 gap-6 mt-6">
                <div className="p-6 bg-violet-50/50 rounded-2xl border border-violet-100">
                  <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Total Students</div>
                  <div className="text-2xl font-black text-violet-600">{selectedTeacher.students.toLocaleString()}</div>
                </div>
                <div className="p-6 bg-cyan-50/50 rounded-2xl border border-cyan-100">
                  <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Average Rating</div>
                  <div className="text-2xl font-black text-cyan-600 flex items-center gap-2">
                    <Star className="h-6 w-6 fill-current text-yellow-500" /> {selectedTeacher.rating}
                  </div>
                </div>
              </div>

              <div className="mt-8 space-y-4">
                <h3 className="text-xl font-black text-gray-900 flex items-center gap-2">
                  <Video className="h-5 w-5 text-violet-600" /> Active Courses
                </h3>
                <div className="space-y-3">
                  {[1, 2].map((i) => (
                    <div key={i} className="p-4 bg-gray-50 rounded-2xl border border-gray-100 flex items-center justify-between">
                      <div className="font-bold text-gray-700">Advanced {selectedTeacher.subject} Module {i}</div>
                      <Badge variant="outline" className="border-green-200 text-green-600 font-bold">Live</Badge>
                    </div>
                  ))}
                </div>
              </div>

              <DialogFooter className="mt-10">
                <Button variant="ghost" onClick={() => setSelectedTeacher(null)} className="rounded-xl font-bold">Close</Button>
                <Button className="bg-violet-600 hover:bg-violet-700 text-white font-black px-8 rounded-xl shadow-lg">
                  <Mail className="mr-2 h-4 w-4" /> Contact Teacher
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TeachersTab;