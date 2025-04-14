
import React, { createContext, useContext, useState } from "react";

export type LoanData = {
  loanAmount: number;
  interestRate: number;
  loanTerm: number;
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
};

type LoanCalculatorContextType = {
  loanData: LoanData | null;
  setLoanData: React.Dispatch<React.SetStateAction<LoanData | null>>;
  isCalculated: boolean;
  setIsCalculated: React.Dispatch<React.SetStateAction<boolean>>;
};

const LoanCalculatorContext = createContext<LoanCalculatorContextType | undefined>(undefined);

export const LoanCalculatorProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [loanData, setLoanData] = useState<LoanData | null>(null);
  const [isCalculated, setIsCalculated] = useState(false);

  return (
    <LoanCalculatorContext.Provider
      value={{
        loanData,
        setLoanData,
        isCalculated,
        setIsCalculated,
      }}
    >
      {children}
    </LoanCalculatorContext.Provider>
  );
};

export const useLoanCalculator = () => {
  const context = useContext(LoanCalculatorContext);
  if (context === undefined) {
    throw new Error("useLoanCalculator must be used within a LoanCalculatorProvider");
  }
  return context;
};
