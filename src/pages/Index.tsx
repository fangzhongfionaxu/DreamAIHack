
import AiChatInterface from "@/components/AiChatInterface";
import Navigation from "@/components/Navigation";
import { useAuth } from "@/contexts/AuthContext";

const Index = () => {
  const { user } = useAuth();

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 overflow-hidden">
        {user ? (
          <div className="p-4 flex flex-col gap-2">
            <h1 className="text-2xl font-bold">Welcome, {user.user_metadata.username || 'User'}</h1>
            <AiChatInterface />
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
