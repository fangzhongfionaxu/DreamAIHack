
import React from 'react';
interface OptionalSurveyStepProps {
  data: any;
  onChange: (field: string, value: any) => void;
  onSkip: () => void;
}
const OptionalSurveyStep = ({ data, onChange, onSkip }: OptionalSurveyStepProps) => (
  <div>
    <div>Placeholder: Optional Survey Step</div>
    <button onClick={onSkip} className="mt-4 underline">Skip for now</button>
  </div>
);
export default OptionalSurveyStep;
