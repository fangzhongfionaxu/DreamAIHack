
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, CheckCircle2 } from "lucide-react";

interface StatusAlertsProps {
  tableCheckStatus?: string;
  dbError?: string | null;
  dbSuccess?: string | null;
}

export const StatusAlerts = ({ 
  tableCheckStatus, 
  dbError, 
  dbSuccess 
}: StatusAlertsProps) => {
  return (
    <>
      {tableCheckStatus && (
        <div className="mb-4">
          <Alert variant="default" className="text-xs">
            <AlertDescription className="text-muted-foreground">
              {tableCheckStatus}
            </AlertDescription>
          </Alert>
        </div>
      )}
      
      {dbError && (
        <div className="mb-4">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4 mr-2" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{dbError}</AlertDescription>
          </Alert>
        </div>
      )}
      
      {dbSuccess && (
        <div className="mb-4">
          <Alert variant="default" className="bg-green-50 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800">
            <CheckCircle2 className="h-4 w-4 mr-2" />
            <AlertTitle>Success</AlertTitle>
            <AlertDescription>{dbSuccess}</AlertDescription>
          </Alert>
        </div>
      )}
    </>
  );
};
