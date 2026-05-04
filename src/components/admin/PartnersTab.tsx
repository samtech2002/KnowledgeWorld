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
  XCircle
} from "lucide-react";
import { Card, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { showSuccess } from "@/utils/toast";

interface PartnersTabProps {
  partners: any[];
  searchQuery: string;
}

const PartnersTab = ({ partners, searchQuery }: PartnersTabProps) => {
  const [selectedPartner, setSelectedPartner] = useState<any>(null);
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredPartners = partners.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         p.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "All" || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleApproveKYC = (id: number) => {
    showSuccess("KYC documents approved successfully!");
    setSelectedPartner(null);
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
        <div>
          <h1 className="text-4xl font-black text-gray-900 mb-2">Partner Management</h1>
          <p className="text-gray-500 font-medium">Manage referral partners, verify KYC, and track payouts.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-xl font-bold border-violet-100 text-violet-600 bg-white">
            Payout Requests <Badge className="ml-2 bg-red-500 text-white border-none">3</Badge>
          </Button>
        </div>
      </div>

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
            <Button 
              variant={statusFilter === 'All' ? 'default' : 'outline'} 
              onClick={() => setStatusFilter('All')}
              className="rounded-xl font-bold"
            >All</Button>
            <Button 
              variant={statusFilter === 'Active' ? 'default' : 'outline'} 
              onClick={() => setStatusFilter('Active')}
              className="rounded-xl font-bold"
            >Active</Button>
            <Button 
              variant={statusFilter === 'Pending KYC' ? 'default' : 'outline'} 
              onClick={() => setStatusFilter('Pending KYC')}
              className="rounded-xl font-bold"
            >Pending KYC</Button>
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