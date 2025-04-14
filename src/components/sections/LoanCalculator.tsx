
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Calculator, PiggyBank } from "lucide-react";
import { useLoanCalculator } from "@/components/LoanCalculatorContext";
import { CalculatorResults } from "@/components/CalculatorResults";

const formSchema = z.object({
  loanAmount: z.string().min(1, "Please enter a loan amount"),
  interestRate: z.string().min(1, "Please enter an interest rate"),
  loanTerm: z.string().min(1, "Please enter a loan term"),
});

export const LoanCalculator = () => {
  const { setLoanData, setIsCalculated } = useLoanCalculator();
  const [showResults, setShowResults] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      loanAmount: "10000",
      interestRate: "5",
      loanTerm: "36",
    },
  });

  const calculateLoan = (data: z.infer<typeof formSchema>) => {
    const amount = parseFloat(data.loanAmount);
    const interestRate = parseFloat(data.interestRate) / 100 / 12; // Monthly interest rate
    const term = parseInt(data.loanTerm);

    const monthlyPayment = (amount * interestRate * Math.pow(1 + interestRate, term)) / 
                          (Math.pow(1 + interestRate, term) - 1);
    
    const totalPayment = monthlyPayment * term;
    const totalInterest = totalPayment - amount;

    setLoanData({
      loanAmount: amount,
      interestRate: parseFloat(data.interestRate),
      loanTerm: term,
      monthlyPayment,
      totalPayment,
      totalInterest,
    });
    
    setIsCalculated(true);
    setShowResults(true);
  };

  return (
    <section id="calculator" className="py-20 bg-light-gray">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-12 animate-fade-in">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Calculate Your Loan
          </h2>
          <p className="text-lg text-gray-700">
            Get a clear picture of your loan's monthly payments, total interest, and more
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <Card className="shadow-lg border-0 animate-fade-in">
            <CardHeader className="bg-gradient-to-r from-soft-orange/80 to-soft-orange text-white rounded-t-lg">
              <CardTitle className="flex items-center">
                <Calculator className="mr-2" />
                Loan Calculator
              </CardTitle>
              <CardDescription className="text-white/90">
                Enter your loan details below
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(calculateLoan)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="loanAmount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Loan Amount (₭)</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="10000" {...field} />
                        </FormControl>
                        <FormDescription>
                          Enter the amount you want to borrow in Lao Kip
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="interestRate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Interest Rate (%)</FormLabel>
                        <FormControl>
                          <Input type="number" step="0.1" placeholder="5" {...field} />
                        </FormControl>
                        <FormDescription>
                          Annual interest rate
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="loanTerm"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Loan Term (months)</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="36" {...field} />
                        </FormControl>
                        <FormDescription>
                          Number of months to repay the loan
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button 
                    type="submit" 
                    className="w-full bg-sky-blue hover:bg-sky-blue/90 transition-all duration-300"
                  >
                    Calculate
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>

          <CalculatorResults show={showResults} />
        </div>
      </div>
    </section>
  );
};
