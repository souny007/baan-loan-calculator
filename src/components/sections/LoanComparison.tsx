
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight, Star, Banknote, TrendingUp } from "lucide-react";
import { useLoanCalculator } from "@/components/LoanCalculatorContext";

// Update the mockBanks to use Banknote instead of Bank
const mockBanks = [
  {
    id: 1,
    name: "Baan Finance",
    logo: <Banknote className="h-10 w-10 text-soft-orange" />,
    interestRateOffset: -0.5,
    description: "Quick approval, flexible repayment options",
    features: ["No early repayment fee", "Fast approvals", "Flexible terms"],
  },
  {
    id: 2,
    name: "Laos Credit Union",
    logo: <Banknote className="h-10 w-10 text-sky-blue" />,
    interestRateOffset: 0,
    description: "Trusted by thousands of Laotians",
    features: ["Low fees", "Member benefits", "Personal financial advice"],
  },
  {
    id: 3,
    name: "VIP Bank",
    logo: <Banknote className="h-10 w-10 text-purple-500" />,
    interestRateOffset: 0.5,
    description: "Premium banking services with extra benefits",
    features: ["Premium customer service", "Additional insurance options", "Exclusive rewards"],
  },
];

export const LoanComparison = () => {
  const { loanData, isCalculated } = useLoanCalculator();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      });
    }, { threshold: 0.1 });

    const element = document.getElementById('comparison-section');
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  const calculateMonthlyPayment = (amount: number, rate: number, term: number) => {
    const monthlyRate = rate / 100 / 12;
    return (amount * monthlyRate * Math.pow(1 + monthlyRate, term)) / 
           (Math.pow(1 + monthlyRate, term) - 1);
  };

  return (
    <section id="comparison-section" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-12 animate-fade-in">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Compare Loan Options
          </h2>
          <p className="text-lg text-gray-700">
            {isCalculated 
              ? "Here's how your calculated loan compares with our partners' offerings" 
              : "Calculate your loan above to see how it compares with our partners' offerings"}
          </p>
        </div>

        {loanData ? (
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {mockBanks.map((bank, index) => {
              // Calculate this bank's rate and payment
              const bankRate = Math.max(0.1, loanData.interestRate + bank.interestRateOffset);
              const bankPayment = calculateMonthlyPayment(
                loanData.loanAmount,
                bankRate,
                loanData.loanTerm
              );
              
              // Calculate total payment and interest
              const totalPayment = bankPayment * loanData.loanTerm;
              const totalInterest = totalPayment - loanData.loanAmount;
              
              // Is this the best rate?
              const isBestRate = bankRate === Math.min(
                ...mockBanks.map(b => Math.max(0.1, loanData.interestRate + b.interestRateOffset))
              );

              return (
                <Card 
                  key={bank.id}
                  className={`shadow-lg border-0 transition-all duration-500 hover:shadow-xl hover:scale-105 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                  }`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  <CardHeader className="text-center border-b pb-4">
                    <div className="mx-auto mb-2">
                      {bank.logo}
                    </div>
                    <CardTitle className="text-xl font-bold flex items-center justify-center">
                      {bank.name}
                      {isBestRate && (
                        <Star className="ml-2 h-5 w-5 text-yellow-500 fill-yellow-500" />
                      )}
                    </CardTitle>
                    <CardDescription>{bank.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6 space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Interest Rate:</span>
                        <span className="font-bold text-lg flex items-center">
                          {bankRate.toFixed(1)}%
                          {bank.interestRateOffset < 0 && (
                            <TrendingUp className="ml-1 h-4 w-4 text-green-500" />
                          )}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Monthly Payment:</span>
                        <span className="font-bold text-lg">
                          ₭ {bankPayment.toLocaleString('en-US', { maximumFractionDigits: 2 })}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Total Interest:</span>
                        <span className="font-bold">
                          ₭ {totalInterest.toLocaleString('en-US', { maximumFractionDigits: 2 })}
                        </span>
                      </div>
                    </div>
                    
                    <div className="border-t pt-4">
                      <p className="font-semibold mb-2">Features:</p>
                      <ul className="space-y-1">
                        {bank.features.map((feature, i) => (
                          <li key={i} className="flex items-start">
                            <ChevronRight className="h-5 w-5 text-soft-orange mr-1 shrink-0" />
                            <span className="text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      className="w-full bg-soft-orange hover:bg-soft-orange/90 transition-all duration-300"
                      onClick={() => document.getElementById('apply-section')?.scrollIntoView({ behavior: 'smooth' })}
                    >
                      Apply Now
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-10 text-gray-500">
            <p className="text-lg">
              Calculate your loan above to see comparison options
            </p>
          </div>
        )}
      </div>
    </section>
  );
};
