
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Handshake, Building, Users, TrendingUp } from "lucide-react";

export const PartnerSection = () => {
  return (
    <section className="py-20 bg-light-gray relative overflow-hidden">
      {/* Background elements */}
      <div className="shape-blob w-96 h-96 bg-sky-blue/10 -top-20 -right-20" />
      <div className="shape-blob w-80 h-80 bg-soft-orange/10 bottom-10 -left-20" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-12 animate-fade-in">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Want to Become Our Lending Partner?
          </h2>
          <p className="text-lg text-gray-700">
            Join our growing network of financial institutions and reach new customers in Laos
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
          <Card className="shadow-md border-0 hover:shadow-lg transition-all duration-300">
            <CardContent className="pt-6 text-center">
              <div className="w-14 h-14 bg-soft-orange/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-7 w-7 text-soft-orange" />
              </div>
              <h3 className="text-xl font-bold mb-2">Reach New Customers</h3>
              <p className="text-gray-600">
                Connect with thousands of potential borrowers looking for financing options
              </p>
            </CardContent>
          </Card>
          
          <Card className="shadow-md border-0 hover:shadow-lg transition-all duration-300">
            <CardContent className="pt-6 text-center">
              <div className="w-14 h-14 bg-sky-blue/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-7 w-7 text-sky-blue" />
              </div>
              <h3 className="text-xl font-bold mb-2">Increase Loan Volume</h3>
              <p className="text-gray-600">
                Drive growth with qualified leads that match your lending criteria
              </p>
            </CardContent>
          </Card>
          
          <Card className="shadow-md border-0 hover:shadow-lg transition-all duration-300">
            <CardContent className="pt-6 text-center">
              <div className="w-14 h-14 bg-purple-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <Building className="h-7 w-7 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Build Your Brand</h3>
              <p className="text-gray-600">
                Enhance your institution's visibility in the growing Laotian financial market
              </p>
            </CardContent>
          </Card>
        </div>
        
        <div className="text-center">
          <Button 
            size="lg" 
            className="bg-sky-blue hover:bg-sky-blue/90 text-white shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105"
            onClick={() => window.open("mailto:partners@baanloan.la", "_blank")}
          >
            <Handshake className="mr-2 h-5 w-5" />
            Partner With Us
          </Button>
        </div>
      </div>
    </section>
  );
};
