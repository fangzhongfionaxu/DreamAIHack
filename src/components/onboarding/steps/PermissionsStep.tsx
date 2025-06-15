
import React, { useState, useEffect } from 'react';
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Check } from 'lucide-react';

interface PermissionsStepProps {
  value: boolean;
  onChange: (value: boolean) => void;
}

const PermissionsStep = ({ value, onChange }: PermissionsStepProps) => {
  const [notificationPermission, setNotificationPermission] = useState('default');
  const { toast } = useToast();

  useEffect(() => {
    if ('Notification' in window) {
      setNotificationPermission(Notification.permission);
    }
  }, []);

  const handleRequestNotificationPermission = () => {
    if (!('Notification' in window)) {
      toast({
        title: "Unsupported Browser",
        description: "This browser does not support desktop notifications.",
        variant: "destructive",
      });
      return;
    }

    if (Notification.permission === 'granted') {
      toast({
        title: "Notifications Already Enabled",
        description: "You're all set to receive notifications.",
      });
      return;
    }

    if (Notification.permission === 'denied') {
      toast({
        title: "Notifications Blocked",
        description: "Please enable notifications for this site in your browser settings to receive reminders.",
      });
      return;
    }

    Notification.requestPermission().then(permission => {
      setNotificationPermission(permission);
      if (permission === 'granted') {
        toast({
          title: "Success! 🎉",
          description: "You will now receive gentle reminders to stay on track.",
        });
        new Notification("Welcome to emBrace notifications!", {
          body: "We'll keep you motivated!",
          icon: '/assets/branding/emBrace_logo_black.png'
        });
      } else {
        toast({
          title: "Notifications Not Enabled",
          description: "You can enable them later in your browser settings if you change your mind.",
        });
      }
    });
  };

  return (
    <div className="text-center space-y-8">
      {/* Engaging Header */}
      <div className="space-y-4">
        <div className="w-16 h-16 bg-teal-500 rounded-2xl mx-auto flex items-center justify-center">
          <span className="text-3xl">💪</span>
        </div>
        
        <div>
          <h2 className="text-3xl font-bold mb-2 text-gray-800">We'll help you get there!</h2>
          <p className="text-gray-600 text-lg leading-relaxed">Your journey to better health starts now. Let's make it amazing together!</p>
        </div>
      </div>

      <div className="space-y-6 max-w-md mx-auto">
        
        {/* Notification Permission Section */}
        <div className="bg-white/60 rounded-2xl p-6 border border-teal-200 shadow-sm space-y-3 text-left">
          <h3 className="font-semibold text-gray-800 text-lg">Stay motivated with gentle reminders</h3>
          {notificationPermission !== 'granted' ? (
            <Button variant="outline" className="w-full bg-white hover:bg-gray-50" onClick={handleRequestNotificationPermission} disabled={notificationPermission === 'denied'}>
              <span role="img" aria-label="bell" className="mr-2">🔔</span>
              {notificationPermission === 'denied' ? 'Notifications Blocked' : 'Enable Notifications'}
            </Button>
          ) : (
             <p className="text-green-600 font-medium flex items-center justify-start">
               <Check className="mr-2 h-5 w-5"/>
               Notifications Enabled
             </p>
          )}
        </div>

        {/* Terms and Conditions Section */}
        <div className="bg-gray-100 rounded-xl p-6 border border-gray-300 text-left">
          <h3 className="font-semibold mb-3 text-gray-800">Terms & Conditions Summary</h3>
          <ul className="text-sm text-gray-600 space-y-2">
            <li>• We respect your privacy and protect your data</li>
            <li>• Your health information is kept confidential</li>
            <li>• You can delete your account at any time</li>
            <li>• This app is for tracking purposes only</li>
            <li>• Always consult healthcare professionals for medical advice</li>
          </ul>
        </div>

        <div className="flex items-start space-x-3">
          <Checkbox
            id="consent"
            checked={value}
            onCheckedChange={(checked) => onChange(Boolean(checked))}
            className="mt-1"
          />
          <label
            htmlFor="consent"
            className="text-sm text-left leading-relaxed cursor-pointer text-gray-800"
          >
            I agree to the{' '}
            <a href="#" className="text-blue-600 hover:underline">
              Terms & Conditions
            </a>{' '}
            and{' '}
            <a href="#" className="text-blue-600 hover:underline">
              Privacy Policy
            </a>
            . I understand this app is for tracking purposes and should not replace professional medical advice.
          </label>
        </div>
      </div>
    </div>
  );
};

export default PermissionsStep;
