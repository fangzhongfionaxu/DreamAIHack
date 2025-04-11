
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import Navigation from "@/components/Navigation";
import { Mail, Send, Share, Link, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Referrals = () => {
  const [friendEmails, setFriendEmails] = useState<string[]>(['']);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [referralLink, setReferralLink] = useState<string>('');
  const { toast } = useToast();
  const [referralCount, setReferralCount] = useState<number>(0);
  const INVITATION_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSfxLM6lGL5VGjBwZUtG_YGE8h_M0ml9O_CLbUSP54bgXPb4RA/viewform?usp=sharing";

  // Generate or retrieve a referral link for the current user
  const generateReferralLink = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    
    const baseUrl = window.location.origin;
    const link = `${baseUrl}?ref=${encodeURIComponent(user.id)}`;
    setReferralLink(link);
  };

  React.useEffect(() => {
    generateReferralLink();
    
    // This would normally fetch the count from the database
    // For now we'll just use a placeholder
    setReferralCount(0);
  }, []);

  const addEmailField = () => {
    setFriendEmails([...friendEmails, '']);
  };

  const removeEmailField = (index: number) => {
    if (friendEmails.length === 1) return;
    const newEmails = [...friendEmails];
    newEmails.splice(index, 1);
    setFriendEmails(newEmails);
  };

  const handleEmailChange = (index: number, value: string) => {
    const newEmails = [...friendEmails];
    newEmails[index] = value;
    setFriendEmails(newEmails);
  };

  const copyReferralLink = () => {
    navigator.clipboard.writeText(referralLink);
    toast({
      title: "Link copied!",
      description: "Referral link copied to clipboard.",
    });
  };

  const handleInvite = () => {
    window.open(INVITATION_FORM_URL, '_blank', 'noopener,noreferrer');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Filter out empty emails
    const validEmails = friendEmails.filter(email => email.trim() !== '');
    
    if (validEmails.length === 0) {
      toast({
        title: "No emails provided",
        description: "Please enter at least one email address.",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    try {
      // Here you would typically send this data to your backend
      // For now, we'll just simulate success
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Success message
      toast({
        title: "Invitations sent!",
        description: `Successfully sent ${validEmails.length} invitation${validEmails.length > 1 ? 's' : ''}.`,
      });
      
      // Reset form
      setFriendEmails(['']);
    } catch (error) {
      console.error("Error sending invitations:", error);
      toast({
        title: "Error",
        description: "Failed to send invitations. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen pb-20">
      <div className="p-4 bg-white border-b">
        <h1 className="text-2xl font-semibold text-brand-dark">Refer Friends</h1>
      </div>
      
      <div className="p-4 space-y-4 flex-1 bg-gradient-to-br from-pastel-pink to-pastel-yellow">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Share className="h-5 w-5" />
              Invite Friends to emBrace
            </CardTitle>
            <CardDescription>
              Share emBrace with friends who might benefit from our community
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-6 p-4 bg-blue-50 rounded-md border border-blue-100 text-blue-800 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-200">
              <p className="font-medium mb-2">Why refer friends?</p>
              <ul className="list-disc ml-5 space-y-1">
                <li>Help others access support and healing tools</li>
                <li>Grow a supportive community around you</li>
                <li>Earn rewards when your friends join (coming soon)</li>
              </ul>
            </div>

            <div className="mb-6">
              <Label htmlFor="referral-link" className="mb-2 block">Your personal referral link</Label>
              <div className="flex gap-2">
                <Input 
                  id="referral-link" 
                  value={referralLink} 
                  readOnly 
                  className="font-mono text-sm"
                />
                <Button onClick={copyReferralLink} variant="outline" size="icon">
                  <Link className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Share this link directly with friends or use the invitation form
              </p>
            </div>
            
            <Button 
              className="w-full mb-6" 
              onClick={handleInvite}
            >
              <ExternalLink className="mr-2 h-4 w-4" />
              Invite Friends
            </Button>
            
            <Separator className="my-6" />

            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <Label className="mb-2 block">Send email invitations</Label>
                  {friendEmails.map((email, index) => (
                    <div key={index} className="flex items-center gap-2 mb-2">
                      <Mail className="h-4 w-4 text-muted-foreground shrink-0" />
                      <Input
                        type="email"
                        value={email}
                        onChange={(e) => handleEmailChange(index, e.target.value)}
                        placeholder="friend@example.com"
                        className="flex-1"
                      />
                      {friendEmails.length > 1 && (
                        <Button 
                          type="button"
                          variant="ghost" 
                          size="sm"
                          onClick={() => removeEmailField(index)}
                        >
                          Remove
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addEmailField}
                    className="mt-2"
                  >
                    Add another email
                  </Button>
                </div>

                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    "Sending invites..."
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Send Invitations
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Your Referral Stats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-around text-center">
              <div>
                <p className="text-3xl font-bold">{referralCount}</p>
                <p className="text-sm text-muted-foreground">Friends Referred</p>
              </div>
              <div>
                <p className="text-3xl font-bold">0</p>
                <p className="text-sm text-muted-foreground">Rewards Earned</p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center border-t pt-4">
            <p className="text-sm text-muted-foreground">
              Rewards program coming soon!
            </p>
          </CardFooter>
        </Card>
      </div>
      
      <Navigation />
    </div>
  );
};

export default Referrals;
