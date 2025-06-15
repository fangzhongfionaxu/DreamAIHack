import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Calendar, MessageSquare, User, Share } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

const NavigationWithReferral = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsMobile();

  const navItems = [
    {
      name: 'Home',
      path: '/',
      icon: <Home className="h-5 w-5" />,
    },
    {
      name: 'Activities',
      path: '/activities',
      icon: <Calendar className="h-5 w-5" />,
    },
    {
      name: 'Chat',
      path: '/chat',
      icon: <MessageSquare className="h-5 w-5" />,
    },
    {
      name: 'Refer',
      path: '/referrals',
      icon: <Share className="h-5 w-5" />,
    },
    {
      name: 'Profile',
      path: '/profile',
      icon: <User className="h-5 w-5" />,
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 w-full bg-background border-t shadow-sm z-10">
      <div className="flex justify-around items-center px-4 py-2 md:py-3 max-w-4xl mx-auto">
        {navItems.map((item) => (
          <Button
            key={item.name}
            variant="ghost"
            size={isMobile ? 'icon' : 'default'}
            onClick={() => navigate(item.path)}
            className={cn(
              'flex flex-col items-center justify-center h-14 rounded-lg transition-all',
              location.pathname === item.path
                ? 'text-primary bg-primary/5 hover:bg-primary/10'
                : 'text-muted-foreground hover:bg-transparent hover:text-primary'
            )}
          >
            {item.icon}
            {!isMobile && <span className="mt-1 text-xs">{item.name}</span>}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default NavigationWithReferral;
