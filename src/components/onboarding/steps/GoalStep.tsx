
import React from 'react';
interface GoalStepProps {
  value: number;
  onChange: (value: number) => void;
}
const GoalStep = ({ value, onChange }: GoalStepProps) => <div>Placeholder: Goal Step</div>;
export default GoalStep;
