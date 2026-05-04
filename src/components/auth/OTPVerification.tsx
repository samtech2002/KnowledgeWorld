"use client";

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShieldCheck, Timer, RefreshCw } from "lucide-react";
import { showSuccess, showError } from "@/utils/toast";

interface OTPVerificationProps {
  email: string;
  onVerify: () => void;
}

const OTPVerification = ({ email, onVerify }: OTPVerificationProps) => {
  const [otp, setOtp] = useState("");
  const [timeLeft, setTimeLeft] = useState(60);
  const [isVerifying, setIsVerifying] = useState(false);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 6) {
      showError("Please enter a valid 6-digit OTP");
      return;
    }
    
    setIsVerifying(true);
    // Simulate API call
    setTimeout(() => {
      if (otp === "123456") { // Mock OTP
        showSuccess("Email verified successfully!");
        onVerify();
      } else {
        showError("Invalid OTP. Please try again.");
        setIsVerifying(false);
      }
    }, 1500);
  };

  const handleResend = () => {
    setTimeLeft(60);
    showSuccess("New OTP sent to " + email);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center space-y-2">
        <div className="h-16 w-16 bg-violet-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <ShieldCheck className="h-8 w-8 text-violet-600" />
        </div>
        <h3 className="text-2xl font-black text-gray-900">Verify Your Email</h3>
        <p className="text-gray-500 font-medium">We've sent a 6-digit code to <span className="text-violet-600 font-bold">{email}</span></p>
      </div>

      <form onSubmit={handleVerify} className="space-y-6">
        <div className="space-y-2">
          <Label className="font-bold text-gray-700 ml-1">Enter OTP</Label>
          <Input 
            type="text" 
            maxLength={6}
            placeholder="000000"
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
            className="h-14 text-center text-2xl tracking-[1em] font-black rounded-2xl border-violet-100 focus:ring-violet-500"
            required
          />
        </div>

        <Button 
          type="submit" 
          disabled={isVerifying}
          className="w-full bg-violet-600 hover:bg-violet-700 text-white font-black h-14 rounded-2xl shadow-xl shadow-violet-100"
        >
          {isVerifying ? "Verifying..." : "Verify & Continue"}
        </Button>

        <div className="flex items-center justify-between px-2">
          <div className="flex items-center gap-2 text-sm font-bold text-gray-400">
            <Timer size={16} />
            {timeLeft > 0 ? `Resend in ${timeLeft}s` : "Ready to resend"}
          </div>
          <Button 
            type="button" 
            variant="ghost" 
            disabled={timeLeft > 0}
            onClick={handleResend}
            className="text-violet-600 font-black hover:bg-violet-50 rounded-xl"
          >
            <RefreshCw size={16} className="mr-2" /> Resend Code
          </Button>
        </div>
      </form>
    </div>
  );
};

export default OTPVerification;