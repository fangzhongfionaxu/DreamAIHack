
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MessageSquare, Activity, User, Settings } from "lucide-react";

const Navigation = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-2 z-10">
      <div className="flex justify-around items-center">
        <Link to="/" className="flex flex-col items-center gap-1">
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-10 w-10 text-brand hover:text-brand-dark hover:bg-brand/10"
          >
            <MessageSquare className="h-6 w-6" />
          </Button>
          <span className="text-xs text-muted-foreground">Assistant</span>
        </Link>

        <Link to="/activities" className="flex flex-col items-center gap-1">
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-10 w-10 text-brand hover:text-brand-dark hover:bg-brand/10"
          >
            <Activity className="h-6 w-6" />
          </Button>
          <span className="text-xs text-muted-foreground">Activities</span>
        </Link>

        <Link to="/profile" className="flex flex-col items-center gap-1">
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-10 w-10 text-brand hover:text-brand-dark hover:bg-brand/10"
          >
            <User className="h-6 w-6" />
          </Button>
          <span className="text-xs text-muted-foreground">Profile</span>
        </Link>

        <Link to="/settings" className="flex flex-col items-center gap-1">
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-10 w-10 text-brand hover:text-brand-dark hover:bg-brand/10"
          >
            <Settings className="h-6 w-6" />
          </Button>
          <span className="text-xs text-muted-foreground">Settings</span>
        </Link>
      </div>
    </div>
  );
};

export default Navigation;
