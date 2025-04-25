import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    password: "",
    companyName: "",
    isAgency: "yes",
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRadioChange = (value: string) => {
    setFormData((prev) => ({ ...prev, isAgency: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.fullName || !formData.email || !formData.password) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      // Save form data to localStorage
      localStorage.setItem("userData", JSON.stringify(formData));

      setIsLoading(false);
      navigate("/dashboard");
      toast({
        title: "Success",
        description: "Your account has been created successfully!",
      });
    }, 1000);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-[#D6BCFA] via-[#F1F0FB] to-[#E5DEFF] p-4">
      <div className="w-full max-w-md bg-white/70 backdrop-blur-lg rounded-2xl shadow-[0_15px_50px_rgba(0,0,0,0.1)] border border-white/30 p-8 flex flex-col space-y-6 animate-fade-in">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold text-popx-purple tracking-tight">Create your PopX account</h1>
          <p className="text-sm text-gray-600">Fill in your details to get started</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <Label htmlFor="fullName">Full Name*</Label>
            <Input id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} required />
          </div>

          <div className="space-y-1">
            <Label htmlFor="phoneNumber">Phone number*</Label>
            <Input id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />
          </div>

          <div className="space-y-1">
            <Label htmlFor="email">Email address*</Label>
            <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
          </div>

          <div className="space-y-1">
            <Label htmlFor="password">Password*</Label>
            <Input id="password" name="password" type="password" value={formData.password} onChange={handleChange} required />
          </div>

          <div className="space-y-1">
            <Label htmlFor="companyName">Company name</Label>
            <Input id="companyName" name="companyName" value={formData.companyName} onChange={handleChange} />
          </div>

          <div className="space-y-2">
            <Label>Are you an Agency?*</Label>
            <RadioGroup value={formData.isAgency} onValueChange={handleRadioChange} className="flex space-x-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="yes" />
                <Label htmlFor="yes">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="no" />
                <Label htmlFor="no">No</Label>
              </div>
            </RadioGroup>
          </div>

          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Creating..." : "Create Account"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Register;
