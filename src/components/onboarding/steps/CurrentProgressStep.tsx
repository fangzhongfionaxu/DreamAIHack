
import React from 'react';
interface CurrentProgressStepProps {
  data: { curveDegree: string; currentBracingHours: string };
  onChange: (field: 'curveDegree' | 'currentBracingHours', value: string) => void;
}
const CurrentProgressStep = ({ data, onChange }: CurrentProgressStepProps) => <div>Placeholder: Current Progress Step</div>;
export default CurrentProgressStep;
