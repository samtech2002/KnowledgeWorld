"use client";

import React, { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { 
  CheckCircle2, 
  CreditCard, 
  Zap, 
  Mail, 
  ArrowRight,
  Lock,
  ShieldCheck
} from "lucide-react";
import OTPVerification from "@/components/auth/OTPVerification";
import { showSuccess } from "@/utils/toast";

interface PurchaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  course: {
    id: number;
    title: string;
    price: string;
  };
}

const PurchaseModal = ({ isOpen, onClose, course }: PurchaseModalProps) => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [selectedPlan, setSelectedPlan] = useState("monthly");
  const [isProcessing, setIsProcessing] = useState(false);

  const plans = [
    { id: "monthly", label: "Monthly", price: "₹499", desc: "Full access for 30 days" },
    { id: "quarterly", label: "Quarterly", price: "₹1,299", desc: "Save 15% on 3 months" },
    { id: "yearly", label: "Yearly", price: "₹4,499", desc: "Best value - Save 25%" },
  ];

  const handleNext = () => {
    if (step === 1) setStep(2);
    else if (step === 2) setStep(3);
  };

  const handlePayment = () => {
    setIsProcessing(true);
    // Simulate Payment Gateway
    setTimeout(() => {
      showSuccess(`Payment successful! ${course.title} is now active.`);
      setIsProcessing(false);
      onClose();
      setStep(1);
    }, 2000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if(!open) { onClose(); setStep(1); } }}>
      <DialogContent className="sm:max-w-[500px] rounded-[2.5rem] p-0 overflow-hidden border-none shadow-2xl">
        <div className="bg-gradient-to-br from-violet-600 to-indigo-700 p-8 text-white">
          <DialogHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-white/20 rounded-xl backdrop-blur-md">
                <Zap className="h-5 w-5 text-white" />
              </div>
              <DialogTitle className="text-2xl font-black text-white">Unlock Course</DialogTitle>
            </div>
            <DialogDescription className="text-violet-100 font-medium">
              {course.title}
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex items-center gap-2 mt-6">
            {[1, 2, 3, 4].map((s) => (
              <div 
                key={s} 
                className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${
                  step >= s ? "bg-white" : "bg-white/20"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="p-8 bg-white">
          {step === 1 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
              <h3 className="text-xl font-black text-gray-900">Select Your Plan</h3>
              <RadioGroup value={selectedPlan} onValueChange={setSelectedPlan} className="space-y-4">
                {plans.map((plan) => (
                  <div 
                    key={plan.id}
                    className={`flex items-center justify-between p-5 rounded-2xl border-2 transition-all cursor-pointer ${
                      selectedPlan === plan.id ? "border-violet-600 bg-violet-50" : "border-gray-50 hover:border-violet-100"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <RadioGroupItem value={plan.id} id={plan.id} className="text-violet-600" />
                      <div>
                        <Label htmlFor={plan.id} className="font-black text-gray-900 cursor-pointer">{plan.label}</Label>
                        <p className="text-xs font-bold text-gray-400">{plan.desc}</p>
                      </div>
                    </div>
                    <div className="text-lg font-black text-violet-600">{plan.price}</div>
                  </div>
                ))}
              </RadioGroup>
              <Button onClick={handleNext} className="w-full bg-violet-600 hover:bg-violet-700 text-white font-black h-14 rounded-2xl shadow-lg">
                Continue to Verification <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="text-center space-y-2 mb-6">
                <div className="h-16 w-16 bg-violet-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Mail className="h-8 w-8 text-violet-600" />
                </div>
                <h3 className="text-2xl font-black text-gray-900">Email Verification</h3>
                <p className="text-gray-500 font-medium">Enter your email to receive a verification code.</p>
              </div>
              <div className="space-y-2">
                <Label className="font-bold text-gray-700 ml-1">Email Address</Label>
                <Input 
                  type="email" 
                  placeholder="name@example.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 rounded-xl border-violet-100"
                  required
                />
              </div>
              <Button 
                onClick={handleNext} 
                disabled={!email.includes('@')}
                className="w-full bg-violet-600 hover:bg-violet-700 text-white font-black h-14 rounded-2xl shadow-lg"
              >
                Send OTP <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          )}

          {step === 3 && (
            <OTPVerification email={email} onVerify={handleNext} />
          )}

          {step === 4 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="p-6 bg-violet-50 rounded-[2rem] border border-violet-100 mb-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm font-bold text-gray-500 uppercase tracking-widest">Order Summary</span>
                  <Badge className="bg-violet-600 text-white border-none font-bold">Verified</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-black text-gray-900">{course.title}</span>
                  <span className="font-black text-violet-600">{plans.find(p => p.id === selectedPlan)?.price}</span>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-black text-gray-900 flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-violet-600" /> Payment Method
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl border-2 border-violet-600 bg-violet-50 flex flex-col items-center gap-2">
                    <ShieldCheck className="h-6 w-6 text-violet-600" />
                    <span className="text-xs font-black text-violet-600">Razorpay</span>
                  </div>
                  <div className="p-4 rounded-2xl border-2 border-gray-50 flex flex-col items-center gap-2 opacity-50 grayscale">
                    <CreditCard className="h-6 w-6 text-gray-400" />
                    <span className="text-xs font-black text-gray-400">Stripe</span>
                  </div>
                </div>
              </div>

              <Button 
                onClick={handlePayment} 
                disabled={isProcessing}
                className="w-full bg-gradient-to-r from-violet-600 to-cyan-600 hover:opacity-90 text-white font-black h-16 rounded-2xl shadow-xl shadow-violet-200 text-lg"
              >
                {isProcessing ? (
                  <span className="flex items-center gap-2">
                    <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Processing Payment...
                  </span>
                ) : (
                  `Pay ${plans.find(p => p.id === selectedPlan)?.price} Now`
                )}
              </Button>
              
              <div className="flex items-center justify-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest">
                <Lock size={12} /> Secure 256-bit SSL Encryption
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PurchaseModal;