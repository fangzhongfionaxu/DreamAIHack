
import AiChatInterface from "@/components/AiChatInterface";
import Navigation from "@/components/Navigation";
import { useAuth } from "@/contexts/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Index = () => {
  const { user } = useAuth();
  
  // Helper function to get user initials - same as in ProfileHeader
  const getUserInitials = () => {
    if (!user) return "?";
    
    const username = user.user_metadata?.username || user.email || "";
    
    if (!username) return "?";
    
    if (username.includes(" ")) {
      const names = username.split(" ");
      return `${names[0].charAt(0)}${names[names.length - 1].charAt(0)}`.toUpperCase();
    }
    
    return username.charAt(0).toUpperCase();
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-gradient-to-br from-pastel-pink to-pastel-yellow">
      <div className="flex-1 overflow-hidden">
        {user ? (
          <div className="h-full flex flex-col">
            <h1 className="text-2xl font-bold p-4 pb-6 flex items-center gap-2">
              <Avatar className="h-8 w-8 border-2 border-brand">
                {user?.user_metadata?.avatar_url ? (
                  <AvatarImage src={user.user_metadata.avatar_url} alt={user.user_metadata?.username || "User"} />
                ) : (
                  <AvatarFallback className="bg-teal-500 text-white">{getUserInitials()}</AvatarFallback>
                )}
              </Avatar>
              Welcome, {user.user_metadata.username || 'User'}
            </h1>
            <div className="flex-1">
              <AiChatInterface />
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full">
            Loading your data...
          </div>
        )}
      </div>
      <Navigation />
    </div>
  );
};

export default Index;
