
import AiChatInterface from "@/components/AiChatInterface";
import Navigation from "@/components/Navigation";
import { useAuth } from "@/contexts/AuthContext";

const Index = () => {
  const { user } = useAuth();

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 overflow-hidden">
        <AiChatInterface />
      </div>
      <Navigation />
    </div>
  );
};

export default Index;
