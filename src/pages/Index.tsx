
import React from "react";
import { Hero } from "@/components/sections/Hero";
import { LoanCalculator } from "@/components/sections/LoanCalculator";
import { LoanComparison } from "@/components/sections/LoanComparison";
import { ApplySection } from "@/components/sections/ApplySection";
import { PartnerSection } from "@/components/sections/PartnerSection";
import { Footer } from "@/components/sections/Footer";
import { LoanCalculatorProvider } from "@/components/LoanCalculatorContext";

const Index = () => {
  return (
    <LoanCalculatorProvider>
      <div className="w-full overflow-hidden">
        <Hero />
        <LoanCalculator />
        <LoanComparison />
        <ApplySection />
        <PartnerSection />
        <Footer />
      </div>
    </LoanCalculatorProvider>
  );
};

export default Index;
