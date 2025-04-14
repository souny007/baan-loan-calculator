
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";

export const Hero = () => {
  const scrollToCalculator = () => {
    const calculatorSection = document.getElementById("calculator");
    if (calculatorSection) {
      calculatorSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-[90vh] w-full flex items-center justify-center gradient-bg overflow-hidden">
      {/* Animated background elements */}
      <div className="shape-blob w-72 h-72 bg-soft-orange/20 -top-20 -left-20 animate-float" />
      <div className="shape-blob w-96 h-96 bg-sky-blue/20 bottom-20 -right-20 animate-float" style={{ animationDelay: "2s" }} />
      <div className="shape-blob w-64 h-64 bg-soft-orange/10 bottom-10 left-1/4 animate-float" style={{ animationDelay: "4s" }} />

      <div className="container px-4 mx-auto relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900">
            Simple Loan Calculator for Everyone in Laos
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mt-6">
            Estimate your monthly payments and compare mock loan plans instantly.
          </p>
          <div className="mt-10">
            <Button 
              onClick={scrollToCalculator} 
              size="lg" 
              className="bg-soft-orange hover:bg-soft-orange/90 text-white transition-all duration-300 hover:shadow-lg hover:scale-105"
            >
              Start Calculating
              <ArrowDown className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
