
import AiChatInterface from "@/components/AiChatInterface";
import Navigation from "@/components/Navigation";

const Index = () => {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 overflow-hidden bg-gradient-to-br from-pastel-pink via-white to-pastel-yellow">
        <AiChatInterface />
      </div>
      <Navigation />
    </div>
  );
};

export default Index;
