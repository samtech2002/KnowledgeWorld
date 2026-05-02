"use client";

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Wallet, 
  CreditCard, 
  Smartphone, 
  History, 
  ArrowUpRight,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { showSuccess } from "@/utils/toast";

const ReferralWallet = () => {
  const navigate = useNavigate();
  const [withdrawMethod, setWithdrawMethod] = useState("upi");
  const [isWithdrawing, setIsWithdrawing] = useState(false);

  const handleWithdraw = (e: React.FormEvent) => {
    e.preventDefault();
    setIsWithdrawing(true);
    setTimeout(() => {
      showSuccess("Withdrawal request submitted successfully! Funds will reach your account in 24-48 hours.");
      setIsWithdrawing(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#FAFAFF] pb-20">
      <nav className="bg-white/80 backdrop-blur-md border-b border-violet-100 px-8 h-16 flex items-center gap-4 sticky top-0 z-50">
        <Button variant="ghost" size="icon" onClick={() => navigate('/referral')} className="rounded-full">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="font-black text-xl text-gray-900">My Wallet</h1>
      </nav>

      <main className="max-w-5xl mx-auto p-8 grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-10">
          <Card className="border-none shadow-2xl shadow-violet-100/50 bg-gradient-to-br from-violet-600 to-indigo-700 text-white rounded-[2.5rem] p-10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
            <div className="relative z-10">
              <p className="text-violet-200 text-sm font-black uppercase tracking-widest mb-2">Available Balance</p>
              <h2 className="text-6xl font-black mb-8">₹12,450.00</h2>
              <div className="flex gap-8">
                <div>
                  <p className="text-violet-200 text-xs font-bold uppercase tracking-wider mb-1">Total Earned</p>
                  <p className="text-xl font-black">₹45,200</p>
                </div>
                <div>
                  <p className="text-violet-200 text-xs font-bold uppercase tracking-wider mb-1">Total Withdrawn</p>
                  <p className="text-xl font-black">₹32,750</p>
                </div>
              </div>
            </div>
          </Card>

          <Card className="border-none shadow-xl shadow-violet-100/30 rounded-[2.5rem] bg-white/80 backdrop-blur-xl overflow-hidden">
            <CardHeader className="p-8 border-b border-violet-50">
              <CardTitle className="text-xl font-black flex items-center gap-2">
                <History className="h-5 w-5 text-violet-600" /> Transaction History
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-violet-50">
                {[
                  { type: "Withdrawal", amount: "-₹5,000", date: "Oct 12, 2023", status: "Completed" },
                  { type: "Referral Bonus", amount: "+₹499", date: "Oct 10, 2023", status: "Completed" },
                  { type: "Referral Bonus", amount: "+₹340", date: "Oct 08, 2023", status: "Completed" },
                ].map((tx, i) => (
                  <div key={i} className="p-6 flex items-center justify-between hover:bg-violet-50/20 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className={`h-10 w-10 rounded-xl flex items-center justify-center ${tx.amount.startsWith('+') ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                        {tx.amount.startsWith('+') ? <ArrowUpRight size={20} /> : <Wallet size={20} />}
                      </div>
                      <div>
                        <div className="font-black text-gray-900">{tx.type}</div>
                        <div className="text-xs font-bold text-gray-400">{tx.date}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`font-black ${tx.amount.startsWith('+') ? 'text-green-600' : 'text-gray-900'}`}>{tx.amount}</div>
                      <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{tx.status}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-10">
          <Card className="border-none shadow-xl shadow-violet-100/30 rounded-[2.5rem] bg-white/80 backdrop-blur-xl p-8">
            <h3 className="text-xl font-black text-gray-900 mb-6">Withdraw Funds</h3>
            <form onSubmit={handleWithdraw} className="space-y-6">
              <div className="space-y-4">
                <Label className="font-bold text-gray-700">Withdrawal Method</Label>
                <RadioGroup value={withdrawMethod} onValueChange={setWithdrawMethod} className="grid grid-cols-2 gap-4">
                  <div className={`flex items-center justify-center p-4 rounded-2xl border-2 transition-all cursor-pointer ${withdrawMethod === 'upi' ? 'border-violet-600 bg-violet-50' : 'border-gray-50'}`}>
                    <RadioGroupItem value="upi" id="upi" className="sr-only" />
                    <Label htmlFor="upi" className="flex flex-col items-center gap-2 cursor-pointer">
                      <Smartphone className={`h-6 w-6 ${withdrawMethod === 'upi' ? 'text-violet-600' : 'text-gray-400'}`} />
                      <span className={`text-xs font-black ${withdrawMethod === 'upi' ? 'text-violet-600' : 'text-gray-400'}`}>UPI ID</span>
                    </Label>
                  </div>
                  <div className={`flex items-center justify-center p-4 rounded-2xl border-2 transition-all cursor-pointer ${withdrawMethod === 'bank' ? 'border-violet-600 bg-violet-50' : 'border-gray-50'}`}>
                    <RadioGroupItem value="bank" id="bank" className="sr-only" />
                    <Label htmlFor="bank" className="flex flex-col items-center gap-2 cursor-pointer">
                      <CreditCard className={`h-6 w-6 ${withdrawMethod === 'bank' ? 'text-violet-600' : 'text-gray-400'}`} />
                      <span className={`text-xs font-black ${withdrawMethod === 'bank' ? 'text-violet-600' : 'text-gray-400'}`}>BANK A/C</span>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label className="font-bold text-gray-700">Amount to Withdraw</Label>
                <Input type="number" placeholder="Min. ₹500" className="h-12 rounded-xl border-violet-100" required />
              </div>

              {withdrawMethod === 'upi' ? (
                <div className="space-y-2">
                  <Label className="font-bold text-gray-700">UPI ID</Label>
                  <Input placeholder="username@upi" className="h-12 rounded-xl border-violet-100" required />
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="font-bold text-gray-700">Account Number</Label>
                    <Input placeholder="Enter A/C Number" className="h-12 rounded-xl border-violet-100" required />
                  </div>
                  <div className="space-y-2">
                    <Label className="font-bold text-gray-700">IFSC Code</Label>
                    <Input placeholder="SBIN0001234" className="h-12 rounded-xl border-violet-100" required />
                  </div>
                </div>
              )}

              <Button 
                type="submit" 
                disabled={isWithdrawing}
                className="w-full bg-violet-600 hover:bg-violet-700 text-white font-black h-14 rounded-2xl shadow-lg shadow-violet-100"
              >
                {isWithdrawing ? "Processing..." : "Request Withdrawal"}
              </Button>
            </form>
          </Card>

          <div className="p-6 bg-orange-50 rounded-[2rem] border border-orange-100 flex gap-4">
            <AlertCircle className="h-6 w-6 text-orange-600 shrink-0" />
            <p className="text-xs font-medium text-orange-800 leading-relaxed">
              Withdrawals are processed every Tuesday and Friday. Minimum withdrawal amount is ₹500.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ReferralWallet;