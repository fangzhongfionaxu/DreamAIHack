
import React from 'react';
import { Button } from "@/components/ui/button";
import { Check, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ActivityItemProps {
  id: string;
  title: string;
  description: string;
  icon?: React.ReactNode;
  completed: boolean;
  timeOfDay?: string;
  onComplete: (id: string) => void;
  className?: string;
}

const ActivityItem: React.FC<ActivityItemProps> = ({
  id,
  title,
  description,
  icon,
  completed,
  timeOfDay,
  onComplete,
  className
}) => {
  return (
    <Card 
      className={cn(
        "transition-all duration-300 overflow-hidden",
        completed ? "border-plant/50 bg-plant/5" : "border-muted bg-card",
        className
      )}
    >
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 mt-1">
            {icon || (
              <Clock className={cn(
                "w-6 h-6",
                completed ? "text-plant" : "text-muted-foreground"
              )} />
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start gap-2">
              <h3 className={cn(
                "font-medium text-lg leading-tight",
                completed ? "text-plant-dark" : "text-foreground"
              )}>
                {title}
              </h3>
              
              {timeOfDay && (
                <span className="text-xs bg-secondary px-2 py-1 rounded-full whitespace-nowrap">
                  {timeOfDay}
                </span>
              )}
            </div>
            
            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
              {description}
            </p>
            
            <div className="mt-3 flex justify-end">
              <Button
                variant={completed ? "outline" : "default"}
                size="sm"
                onClick={() => onComplete(id)}
                className={cn(
                  completed 
                    ? "border-plant text-plant hover:bg-plant/10" 
                    : "bg-brand hover:bg-brand-dark text-white"
                )}
              >
                {completed ? (
                  <>
                    <Check className="h-4 w-4 mr-1" />
                    Completed
                  </>
                ) : (
                  "Mark Complete"
                )}
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ActivityItem;
