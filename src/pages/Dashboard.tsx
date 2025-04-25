import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ImagePlus } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Dashboard = () => {
  const navigate = useNavigate();
  const [profileImage, setProfileImage] = useState("/lovable-uploads/cfa77a70-84f4-44b8-be0f-0c8da45c4a30.png");
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    companyName: "",
    description: "Welcome to your dashboard!",
  });

  useEffect(() => {
    const stored = localStorage.getItem("userData");
    if (stored) {
      const parsed = JSON.parse(stored);
      setUserData({
        name: parsed.fullName,
        email: parsed.email,
        companyName: parsed.companyName || "",
        description: "Welcome to your dashboard!",
      });
    }
  }, []);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
        toast({
          title: "Success",
          description: "Profile image updated successfully",
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("userData");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="border-b border-gray-200 bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-xl font-medium text-gray-900">Account Settings</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Card className="bg-white shadow-lg">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-start md:space-x-6">
              <div className="relative group mb-4 md:mb-0">
                <Avatar className="h-24 w-24 border-2 border-popx-purple">
                  <AvatarImage src={profileImage} alt={userData.name} />
                  <AvatarFallback className="text-lg">{userData.name.charAt(0)}</AvatarFallback>
                </Avatar>

                <div className="absolute -bottom-2 left-0 right-0 flex justify-center">
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <Button size="icon" variant="outline" className="bg-white shadow-md hover:bg-gray-50">
                      <ImagePlus className="h-4 w-4 text-popx-purple" />
                    </Button>
                  </div>
                </div>
              </div>

              <div className="space-y-3 flex-1">
                <div className="flex items-center space-x-2">
                  <h2 className="text-xl font-bold text-gray-900">{userData.name}</h2>
                  <Badge className="bg-popx-purple text-white">Pro</Badge>
                </div>
                <p className="text-sm text-gray-600">{userData.email}</p>
                <p className="text-sm text-gray-600 max-w-2xl">{userData.description}</p>
                {userData.companyName && (
                  <p className="text-sm font-medium text-popx-purple mt-2">
                    Company: {userData.companyName}
                  </p>
                )}
              </div>
            </div>

            <div className="mt-8 border-t pt-6">
              <Button
                variant="outline"
                className="border-popx-purple text-popx-purple hover:bg-popx-purple hover:text-white transition-colors"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
