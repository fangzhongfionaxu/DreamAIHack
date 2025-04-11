
import AiChatInterface from "@/components/AiChatInterface";
import Navigation from "@/components/Navigation";
import { useAuth } from "@/contexts/AuthContext";

const Index = () => {
  const { user } = useAuth();

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-gradient-to-br from-pastel-pink to-pastel-yellow">
      <div className="flex-1 overflow-hidden">
        {user ? (
          <div className="h-full flex flex-col">
            <h1 className="text-2xl font-bold p-4 pb-0">{`Welcome, ${user.user_metadata.username || 'User'}`}</h1>
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
