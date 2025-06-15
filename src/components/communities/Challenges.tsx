
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Award } from "lucide-react";

const Challenges = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Challenges</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center p-4">
          <p className="text-muted-foreground mb-4">Join challenges with friends to stay motivated!</p>
          <Button className="bg-brand hover:bg-brand-dark">
            <Award className="h-4 w-4 mr-2" />
            Join a Challenge
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default Challenges;
