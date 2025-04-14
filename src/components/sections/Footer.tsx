
import React from "react";
import { Facebook, Instagram, Mail, MapPin, Phone, Twitter } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
          <div>
            <h3 className="text-xl font-bold mb-4">Baan Loan Calculator</h3>
            <p className="text-gray-400 mb-4">
              Simple loan calculator for everyone in Laos. Compare options and find the best rates.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Home</a>
              </li>
              <li>
                <a href="#calculator" className="text-gray-400 hover:text-white transition-colors">
                  Calculator
                </a>
              </li>
              <li>
                <a href="#comparison-section" className="text-gray-400 hover:text-white transition-colors">
                  Compare Loans
                </a>
              </li>
              <li>
                <a href="#apply-section" className="text-gray-400 hover:text-white transition-colors">
                  Apply Now
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Disclaimer
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 text-soft-orange shrink-0" />
                <span className="text-gray-400">Vientiane, Laos</span>
              </li>
              <li className="flex items-start">
                <Phone className="h-5 w-5 mr-2 text-soft-orange shrink-0" />
                <span className="text-gray-400">+856 20 1234 5678</span>
              </li>
              <li className="flex items-start">
                <Mail className="h-5 w-5 mr-2 text-soft-orange shrink-0" />
                <span className="text-gray-400">info@baanloan.la</span>
              </li>
            </ul>
          </div>
        </div>
        
        <Separator className="bg-gray-700" />
        
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-gray-400 text-sm">
            &copy; {currentYear} Baan Loan Calculator. All rights reserved.
          </p>
          
          <div className="flex space-x-6 items-center">
            <button className="text-sm text-gray-400 hover:text-white transition-colors">
              English
            </button>
            <span className="text-gray-600">|</span>
            <button className="text-sm text-gray-400 hover:text-white transition-colors">
              ລາວ
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
