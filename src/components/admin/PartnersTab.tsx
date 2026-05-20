"use client";

import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  MoreVertical, 
  Eye, 
  ShieldCheck, 
  Trash2, 
  Wallet, 
  Users,
  FileText,
  CheckCircle2,
  XCircle,
  Plus,
  DollarSign,
  Settings2,
  ArrowUpRight
} from "lucide-react";
import { Card, CardDescription, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter,
  DialogDescription
} from "@/components/ui/dialog";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { showSuccess } from "@/utils/toast";

interface PartnersTabProps {
  partners: any[];
  searchQuery: string;
}

const PartnersTab = ({ partners: initialPartners, searchQuery }: PartnersTabProps) => {
  const [partners, setPartners] = useState(initialPartners);
  const [selectedPartner, setSelectedPartner] = useState<any>(null);
  const [statusFilter, setStatusFilter] = useState("All");
  const [isAddPartnerOpen, setIsAddPartnerOpen] = useState(false);
  const [commissionRate, setCommissionRate] = useState("20");

  const [payoutRequests, setPayoutRequests] = useState([
    { id: 1, partner: "Prashant Sharma", amount: "5000", method: "UPI", date: "Oct 24, 2023", status: "Pending" },
    { id: 2, partner: "Sneha Reddy", amount: "12000", method: "Bank Transfer", date: "Oct 23, 2023", status: "Pending" },
  ]);

  const filteredPartners = partners.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         p.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "All" || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleApproveKYC = (id: number) => {
    setPartners(partners.map(p => p.id === id ? { ...p, status: 'Active' } : p));
    showSuccess("KYC documents approved successfully!");
    setSelectedPartner(null);
  };

  const handleApprovePayout = (id: number) => {
    setPayoutRequests(payoutRequests.filter(r => r.id !== id));
    showSuccess("Payout request approved and processed!");
  };

  const handleAddPartner = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newPartner = {
      id: Date.now(),
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      totalReferrals: 0,
      totalEarnings: 0,
      status: "Pending KYC",
      joinDate: new Date().toISOString().split('T')[0]
    };
    setPartners([newPartner, ...partners]);
    setIsAddPartnerOpen(false);
    showSuccess("Partner invited successfully!");
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
        <div>
          <h1 className="text-4xl font-black text-gray-900 mb-2">Partner Ecosystem</h1>
          <p className="text-gray-500 font-medium">Manage referral partners, verify KYC, and track payouts.</p>
        </div>
        <div className="flex gap-3">
          <Button 
            onClick={() => setIsAddPartnerOpen(true)}
            className="bg-gradient-to-r from-violet-600 to-cyan-600 hover:opacity-90 text-white font-black px-8 h-14 rounded-2xl shadow-xl shadow-violet-200 transition-all hover:scale-105"
          >
            <Plus className="mr-2 h-5 w-5" /> Add Partner
          </Button>
        </div>
      </div>

      <Tabs defaultValue="directory" className="space-y-8">
        <TabsList className="bg-violet-50/50 p-1.5 rounded-2xl inline-flex">
          <TabsTrigger value="directory" className="rounded-xl font-bold px-6 data-[state=active]:bg-white data-[state=active]:text-violet-600 data-[state=active]:shadow-sm">
            <Users className="mr-2 h-4 w-4" /> Partner Directory
          </TabsTrigger>
          <TabsTrigger value="payouts" className="rounded-xl font-bold px-6 data-[state=active]:bg-white data-[state=active]:text-violet-600 data-[state=active]:shadow-sm">
            <Wallet className="mr-2 h-4 w-4" /> Payout Requests
            {payoutRequests.length > 0 && <Badge className="ml-2 bg-red-500 text-white border-none">{payoutRequests.length}</Badge>}
          </TabsTrigger>
          <TabsTrigger value="settings" className="rounded-xl font-bold px-6 data-[state=active]:bg-white data-[state=active]:text-violet-600 data-[state=active]:shadow-sm">
            <Settings2 className="mr-2 h-4 w-4" /> Commission Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="directory">
          <Card className="border-none shadow-xl shadow-violet-100/30 rounded-[2.5rem] overflow-hidden bg-white/80 backdrop-blur-xl">
            <div className="p-8 border-b border-violet-50 flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="relative w-full md:w-96">
                <Search className="absolute left-4 top-3 h-5 w-5 text-gray-400" />
                <Input 
                  placeholder="Search by name or email..." 
                  className="pl-12 h-11 bg-violet-50/50 border-none rounded-xl font-medium"
                  value={searchQuery}
                  readOnly
                />
              </div>
              <div className="flex items-center gap-3">
                {['All', 'Active', 'Pending KYC'].map(status => (
                  <Button 
                    key={status}
                    variant={statusFilter === status ? 'default' : 'outline'} 
                    onClick={() => setStatusFilter(status)}
                    className="rounded-xl font-bold"
                  >{status}</Button>
                ))}
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-violet-50/50">
                    <th className="p-6 text-xs font-black text-gray-400 uppercase tracking-widest">Partner</th>
                    <th className="p-6 text-xs font-black text-gray-400 uppercase tracking-widest">Referrals</th>
                    <th className="p-6 text-xs font-black text-gray-400 uppercase tracking-widest">Total Earnings</th>
                    <th className="p-6 text-xs font-black text-gray-400 uppercase tracking-widest">Status</th>
                    <th className="p-6 text-xs font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-violet-50">
                  {filteredPartners.map((partner) => (
                    <tr key={partner.id} className="hover:bg-violet-50/30 transition-colors group">
                      <td className="p-6">
                        <div className="flex items-center gap-4">
                          <div className="h-12 w-12 rounded-2xl bg-violet-100 flex items-center justify-center text-violet-600 font-black">
                            {partner.name.charAt(0)}
                          </div>
                          <div>
                            <div className="font-black text-gray-900 group-hover:text-violet-600 transition-colors">{partner.name}</div>
                            <div className="text-xs font-bold text-gray-400">{partner.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-6">
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-blue-500" />
                          <span className="font-black text-gray-900">{partner.totalReferrals}</span>
                        </div>
                      </td>
                      <td className="p-6">
                        <div className="flex items-center gap-2">
                          <Wallet className="h-4 w-4 text-green-500" />
                          <span className="font-black text-gray-900">₹{partner.totalEarnings}</span>
                        </div>
                      </td>
                      <td className="p-6">
                        <Badge className={`rounded-lg font-bold ${
                          partner.status === 'Active' ? 'bg-green-50 text-green-600' : 
                          partner.status === 'Pending KYC' ? 'bg-orange-50 text-orange-600' : 'bg-red-50 text-red-600'
                        }`}>
                          {partner.status}
                        </Badge>
                      </td>
                      <td className="p-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => setSelectedPartner(partner)}
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
                                <ShieldCheck className="mr-2 h-4 w-4" /> Verify KYC
                              </DropdownMenuItem>
                              <DropdownMenuItem className="rounded-xl font-bold text-gray-600 focus:bg-violet-50 focus:text-violet-600 cursor-pointer">
                                <Wallet className="mr-2 h-4 w-4" /> View Payouts
                              </DropdownMenuItem>
                              <DropdownMenuItem className="rounded-xl font-bold text-red-500 focus:bg-red-50 focus:text-red-600 cursor-pointer">
                                <Trash2 className="mr-2 h-4 w-4" /> Suspend Partner
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
            {payoutRequests.length > 0 ? payoutRequests.map((req) => (
              <Card key={req.id} className="border-none shadow-lg shadow-violet-100/30 rounded-[2rem] bg-white/80 backdrop-blur-xl overflow-hidden">
                <CardContent className="p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="flex items-center gap-6">
                    <div className="h-16 w-16 rounded-2xl bg-green-50 flex items-center justify-center text-green-600">
                      <ArrowUpRight size={32} />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">Payout Request</div>
                      <h3 className="text-2xl font-black text-gray-900">₹{req.amount}</h3>
                      <p className="text-sm font-bold text-violet-600">{req.partner} • {req.method}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right mr-4">
                      <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">Requested On</div>
                      <div className="font-black text-gray-900">{req.date}</div>
                    </div>
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
            )) : (
              <div className="text-center py-20 bg-white rounded-[2.5rem] border border-dashed border-violet-100">
                <Wallet className="h-16 w-16 text-gray-200 mx-auto mb-4" />
                <h3 className="text-xl font-black text-gray-400">No pending payout requests</h3>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="settings">
          <Card className="border-none shadow-xl shadow-violet-100/30 rounded-[2.5rem] bg-white/80 backdrop-blur-xl max-w-2xl">
            <CardHeader>
              <CardTitle className="text-xl font-black">Global Commission Settings</CardTitle>
              <CardDescription>Set the default commission percentage for all referral partners.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="space-y-4">
                <Label className="font-bold text-gray-700 ml-1">Default Commission Rate (%)</Label>
                <div className="flex gap-4">
                  <div className="relative flex-1">
                    <DollarSign className="absolute left-4 top-3.5 h-5 w-5 text-violet-600" />
                    <Input 
                      type="number" 
                      value={commissionRate} 
                      onChange={(e) => setCommissionRate(e.target.value)}
                      className="pl-12 h-12 rounded-xl border-violet-100 font-black text-lg" 
                    />
                  </div>
                  <Button 
                    onClick={() => showSuccess("Commission rate updated!")}
                    className="bg-violet-600 hover:bg-violet-700 text-white font-black px-8 rounded-xl"
                  >
                    Update Rate
                  </Button>
                </div>
              </div>

              <div className="p-6 bg-violet-50 rounded-2xl border border-violet-100">
                <h4 className="font-black text-violet-600 mb-2 flex items-center gap-2">
                  <CheckCircle2 size={18} /> Tiered Commissions
                </h4>
                <p className="text-sm text-gray-500 font-medium">
                  Partners automatically move to higher tiers based on their total referral volume. 
                  Gold partners currently receive a +5% bonus.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Add Partner Dialog */}
      <Dialog open={isAddPartnerOpen} onOpenChange={setIsAddPartnerOpen}>
        <DialogContent className="sm:max-w-[500px] rounded-[2.5rem] p-10">
          <DialogHeader>
            <DialogTitle className="text-3xl font-black">Invite New Partner</DialogTitle>
            <DialogDescription className="text-lg font-medium">Manually register a new referral partner to the platform.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleAddPartner} className="space-y-6 mt-6">
            <div className="space-y-2">
              <Label className="font-bold ml-1">Full Name</Label>
              <Input name="name" placeholder="e.g. Rajesh Kumar" className="h-12 rounded-xl border-violet-100" required />
            </div>
            <div className="space-y-2">
              <Label className="font-bold ml-1">Email Address</Label>
              <Input name="email" type="email" placeholder="rajesh@example.com" className="h-12 rounded-xl border-violet-100" required />
            </div>
            <DialogFooter className="pt-6">
              <Button type="button" variant="ghost" onClick={() => setIsAddPartnerOpen(false)} className="rounded-xl font-bold">Cancel</Button>
              <Button type="submit" className="bg-violet-600 hover:bg-violet-700 text-white font-black px-8 h-12 rounded-xl shadow-lg shadow-violet-100">Send Invitation</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Partner Details Dialog */}
      <Dialog open={!!selectedPartner} onOpenChange={(open) => !open && setSelectedPartner(null)}>
        <DialogContent className="sm:max-w-[700px] rounded-[2.5rem] p-10 overflow-y-auto max-h-[90vh]">
          {selectedPartner && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-6 mb-6">
                  <div className="h-20 w-20 rounded-[1.5rem] bg-violet-100 flex items-center justify-center text-violet-600 text-3xl font-black">
                    {selectedPartner.name.charAt(0)}
                  </div>
                  <div>
                    <DialogTitle className="text-3xl font-black">{selectedPartner.name}</DialogTitle>
                    <CardDescription className="text-lg font-medium">{selectedPartner.email}</CardDescription>
                    <div className="flex gap-2 mt-2">
                      <Badge className="bg-violet-600 text-white border-none font-bold">Partner</Badge>
                      <Badge variant="outline" className="border-violet-200 text-violet-600 font-bold">{selectedPartner.status}</Badge>
                    </div>
                  </div>
                </div>
              </DialogHeader>

              <div className="space-y-8 mt-6">
                <div className="grid grid-cols-3 gap-6">
                  <div className="p-6 bg-violet-50/50 rounded-2xl border border-violet-100 text-center">
                    <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Total Referrals</div>
                    <div className="text-2xl font-black text-violet-600">{selectedPartner.totalReferrals}</div>
                  </div>
                  <div className="p-6 bg-green-50/50 rounded-2xl border border-green-100 text-center">
                    <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Total Earnings</div>
                    <div className="text-2xl font-black text-green-600">₹{selectedPartner.totalEarnings}</div>
                  </div>
                  <div className="p-6 bg-blue-50/50 rounded-2xl border border-blue-100 text-center">
                    <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Join Date</div>
                    <div className="text-lg font-black text-blue-600">{selectedPartner.joinDate}</div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-black text-gray-900 flex items-center gap-2">
                    <ShieldCheck className="h-5 w-5 text-violet-600" /> KYC Documents
                  </h3>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100 flex flex-col items-center gap-4">
                      <div className="h-12 w-12 bg-white rounded-xl flex items-center justify-center shadow-sm">
                        <FileText className="h-6 w-6 text-violet-600" />
                      </div>
                      <div className="text-center">
                        <div className="font-black text-gray-900">Aadhar Card</div>
                        <div className="text-xs font-bold text-gray-400">Uploaded on Oct 12</div>
                      </div>
                      <Button variant="outline" size="sm" className="w-full rounded-xl font-bold">View Document</Button>
                    </div>
                    <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100 flex flex-col items-center gap-4">
                      <div className="h-12 w-12 bg-white rounded-xl flex items-center justify-center shadow-sm">
                        <FileText className="h-6 w-6 text-violet-600" />
                      </div>
                      <div className="text-center">
                        <div className="font-black text-gray-900">PAN Card</div>
                        <div className="text-xs font-bold text-gray-400">Uploaded on Oct 12</div>
                      </div>
                      <Button variant="outline" size="sm" className="w-full rounded-xl font-bold">View Document</Button>
                    </div>
                  </div>
                </div>
              </div>

              <DialogFooter className="mt-10 gap-3">
                <Button variant="ghost" onClick={() => setSelectedPartner(null)} className="rounded-xl font-bold">Close</Button>
                {selectedPartner.status === 'Pending KYC' && (
                  <>
                    <Button variant="outline" className="rounded-xl font-bold border-red-100 text-red-600 hover:bg-red-50">
                      <XCircle className="mr-2 h-4 w-4" /> Reject KYC
                    </Button>
                    <Button onClick={() => handleApproveKYC(selectedPartner.id)} className="bg-green-600 hover:bg-green-700 text-white font-black px-8 rounded-xl shadow-lg">
                      <CheckCircle2 className="mr-2 h-4 w-4" /> Approve KYC
                    </Button>
                  </>
                )}
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PartnersTab;