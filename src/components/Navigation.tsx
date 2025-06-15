import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MessageSquare, Activity, User } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Navigation = () => {
  const { user } = useAuth();
  const location = useLocation();
  
  // Don't show navigation if not authenticated
  if (!user) return null;

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
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-2 z-20">
      <div className="flex justify-around items-center">
        <Link to="/" className="flex flex-col items-center gap-1">
          <Button 
            variant="ghost" 
            size="icon" 
            className={`h-10 w-10 ${location.pathname === '/' ? 'bg-brand/10 text-brand-dark' : 'text-brand hover:text-brand-dark hover:bg-brand/10'}`}
          >
            <MessageSquare className="h-6 w-6" />
          </Button>
          <span className="text-xs text-muted-foreground">Assistant</span>
        </Link>

        <Link to="/activities" className="flex flex-col items-center gap-1">
          <Button 
            variant="ghost" 
            size="icon" 
            className={`h-10 w-10 ${location.pathname === '/activities' ? 'bg-brand/10 text-brand-dark' : 'text-brand hover:text-brand-dark hover:bg-brand/10'}`}
          >
            <Activity className="h-6 w-6" />
          </Button>
          <span className="text-xs text-muted-foreground">Activities</span>
        </Link>

        <Link to="/profile" className="flex flex-col items-center gap-1">
          <Button 
            variant="ghost" 
            size="icon" 
            className={`h-10 w-10 ${location.pathname === '/profile' ? 'bg-brand/10 text-brand-dark' : 'text-brand hover:text-brand-dark hover:bg-brand/10'}`}
          >
            {location.pathname === '/profile' ? (
              <Avatar className="h-6 w-6 border border-brand">
                {user?.user_metadata?.avatar_url ? (
                  <AvatarImage src={user.user_metadata.avatar_url} alt={user.user_metadata?.username || "User"} />
                ) : (
                  <AvatarFallback className="bg-teal-500 text-white text-xs">{getUserInitials()}</AvatarFallback>
                )}
              </Avatar>
            ) : (
              <User className="h-6 w-6" />
            )}
          </Button>
          <span className="text-xs text-muted-foreground">Profile</span>
        </Link>
      </div>
    </div>
  );
};

export default Navigation;
