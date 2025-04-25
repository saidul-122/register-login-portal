import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      navigate("/dashboard");
      toast({
        title: "Success",
        description: "You have successfully logged in!",
      });
    }, 1000);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-4">
      <div className="w-full max-w-md bg-white rounded-2xl p-6 shadow-2xl animate-fade-in transition-all duration-500 ease-out">
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-popx-text">Sign in to your PopX account</h1>
          <p className="text-sm text-gray-500">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4 mt-4">
          <div className="space-y-1">
            <Label htmlFor="email" className="text-sm font-medium text-popx-purple">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-popx-purple"
              required
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="password" className="text-sm font-medium text-popx-purple">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-popx-purple"
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-popx-gray text-black hover:bg-gray-300 mt-4 py-2 rounded"
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Login"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
