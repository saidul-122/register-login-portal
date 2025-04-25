
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  const handleCreateAccount = () => {
    navigate("/register");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-white to-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.12)] backdrop-blur-sm border border-gray-100">
        <div className="space-y-4">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-popx-text tracking-tight">
              Welcome to PopX
            </h1>
            <p className="text-sm text-gray-500">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </div>

          <div className="flex flex-col space-y-4 mt-8">
            <Button 
              className="w-full bg-popx-purple hover:bg-popx-purple/90 text-white py-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 text-base font-medium" 
              onClick={handleCreateAccount}
            >
              Create Account
            </Button>
            
            <Button 
              variant="outline"
              className="w-full bg-popx-lightpurple text-popx-purple hover:bg-popx-purple hover:text-white border-none py-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 text-base font-medium" 
              onClick={handleLogin}
            >
              Already Registered? Login
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;

