
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Check, Copy, CreditCard } from "lucide-react";
import { useLoanCalculator } from "@/components/LoanCalculatorContext";
import { useToast } from "@/components/ui/use-toast";

const formSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(8, "Please enter a valid phone number"),
  loanPurpose: z.string().min(5, "Please briefly describe your loan purpose"),
});

export const ApplySection = () => {
  const { loanData } = useLoanCalculator();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      loanPurpose: "",
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log("Application submitted:", data);
    
    // Simulate submission delay
    setTimeout(() => {
      setIsSubmitted(true);
      
      // Show success toast
      toast({
        title: "Application Received!",
        description: "We'll contact you soon about your loan application.",
        duration: 5000,
      });
      
      // Reset after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setIsOpen(false);
        form.reset();
      }, 5000);
    }, 1500);
  };

  return (
    <section id="apply-section" className="py-20 bg-gradient-to-br from-soft-orange/10 via-white to-sky-blue/10">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Apply now for your loan and our team will contact you within 24 hours to discuss the next steps
          </p>
        </div>
        
        <div className="text-center">
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button 
                size="lg" 
                className="bg-soft-orange hover:bg-soft-orange/90 text-white shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105"
              >
                <CreditCard className="mr-2 h-5 w-5" />
                Apply for a Loan
              </Button>
            </DialogTrigger>
            
            <DialogContent className="sm:max-w-[500px]">
              {!isSubmitted ? (
                <>
                  <DialogHeader>
                    <DialogTitle>Loan Application</DialogTitle>
                    <DialogDescription>
                      Fill out the form below to apply for a loan. We'll contact you shortly.
                    </DialogDescription>
                  </DialogHeader>
                  
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-4">
                      <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input placeholder="John Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="john@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <Input placeholder="+856 20 12345678" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="loanPurpose"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Loan Purpose</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Briefly describe what you need the loan for..." 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      {loanData && (
                        <div className="p-3 bg-gray-50 rounded-md text-sm">
                          <p className="font-medium mb-1">Your calculated loan details:</p>
                          <p>Amount: ₭ {loanData.loanAmount.toLocaleString()}</p>
                          <p>Term: {loanData.loanTerm} months</p>
                          <p>Est. Monthly Payment: ₭ {loanData.monthlyPayment.toLocaleString('en-US', { maximumFractionDigits: 2 })}</p>
                        </div>
                      )}
                      
                      <DialogFooter className="pt-4">
                        <Button type="submit" className="w-full bg-soft-orange hover:bg-soft-orange/90">
                          Submit Application
                        </Button>
                      </DialogFooter>
                    </form>
                  </Form>
                </>
              ) : (
                <div className="py-10 text-center">
                  <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <Check className="h-10 w-10 text-green-600" />
                  </div>
                  <DialogTitle className="text-2xl mb-2">Application Submitted!</DialogTitle>
                  <DialogDescription className="text-center max-w-md mx-auto mb-6">
                    Thank you for your application. Our team will review it and contact you within 24 hours.
                  </DialogDescription>
                  <p className="text-sm text-gray-500">Reference ID: {Math.random().toString(36).substring(2, 10).toUpperCase()}</p>
                </div>
              )}
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </section>
  );
};
