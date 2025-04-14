
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PiggyBank } from "lucide-react";
import { useLoanCalculator } from "@/components/LoanCalculatorContext";

type AnimatedNumberProps = {
  value: number;
  duration?: number;
  decimals?: number;
  prefix?: string;
};

// Animated counter component
const AnimatedNumber: React.FC<AnimatedNumberProps> = ({ 
  value, 
  duration = 1000, 
  decimals = 0,
  prefix = ""
}) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    let start = 0;
    const end = value;
    const incrementTime = duration / end;
    let timer: number;
    
    const updateCount = () => {
      start += 1;
      const progress = Math.min(start / end, 1);
      setCount(Math.floor(progress * end));
      
      if (start < end) {
        timer = window.setTimeout(updateCount, incrementTime);
      }
    };
    
    updateCount();
    
    return () => clearTimeout(timer);
  }, [value, duration]);
  
  // Format with commas and decimals
  const formattedNumber = count.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  });
  
  return <span>{prefix}{formattedNumber}</span>;
};

export const CalculatorResults: React.FC<{ show: boolean }> = ({ show }) => {
  const { loanData } = useLoanCalculator();
  
  if (!show || !loanData) {
    return (
      <Card className="shadow-lg border-0 flex items-center justify-center bg-gray-50 opacity-70">
        <CardContent className="py-16 text-center text-gray-500">
          <PiggyBank className="mx-auto h-16 w-16 mb-4 opacity-50" />
          <p className="text-lg">Enter your loan details and click calculate</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-lg border-0 animate-scale-in">
      <CardHeader className="bg-gradient-to-r from-sky-blue/80 to-sky-blue text-white rounded-t-lg">
        <CardTitle className="flex items-center">
          <PiggyBank className="mr-2" />
          Loan Results
        </CardTitle>
        <CardDescription className="text-white/90">
          Based on your entered details
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-6">
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-gray-600 text-sm mb-1">Monthly Payment</p>
            <p className="text-3xl font-bold text-gray-900">
              ₭ <AnimatedNumber value={loanData.monthlyPayment} decimals={2} />
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-gray-600 text-sm mb-1">Total Payment</p>
              <p className="text-xl font-bold text-gray-900">
                ₭ <AnimatedNumber value={loanData.totalPayment} decimals={2} />
              </p>
            </div>
            
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-gray-600 text-sm mb-1">Total Interest</p>
              <p className="text-xl font-bold text-gray-900">
                ₭ <AnimatedNumber value={loanData.totalInterest} decimals={2} />
              </p>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Loan Amount:</span>
              <span className="font-semibold">₭ {loanData.loanAmount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Interest Rate:</span>
              <span className="font-semibold">{loanData.interestRate}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Loan Term:</span>
              <span className="font-semibold">{loanData.loanTerm} months</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
