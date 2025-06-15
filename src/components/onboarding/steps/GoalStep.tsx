
import React from 'react';
import { Slider } from '@/components/ui/slider';

interface GoalStepProps {
  value: number;
  onChange: (value: number) => void;
}

const GoalStep = ({ value, onChange }: GoalStepProps) => {
  return (
    <div className="text-center space-y-8">
      <div className="space-y-4">
        <div className="w-16 h-16 bg-green-500 rounded-2xl mx-auto flex items-center justify-center">
          <span className="text-3xl">🎯</span>
        </div>
        
        <div className="bg-gray-200 rounded-2xl p-6 inline-block border border-gray-300">
          <h2 className="text-2xl font-bold mb-2 text-gray-800">My bracing goal is...</h2>
        </div>
      </div>

      <div className="space-y-6 max-w-md mx-auto">
        <div className="text-6xl font-bold text-green-600">
          {value}
          <span className="text-2xl font-medium text-gray-600 ml-2">hours/day</span>
        </div>
        <Slider
          value={[value]}
          onValueChange={(newValue) => onChange(newValue[0])}
          min={1}
          max={23}
          step={1}
          className="w-full"
        />
        <div className="flex justify-between text-gray-500 px-2">
          <span>1hr</span>
          <span>23hrs</span>
        </div>
      </div>
    </div>
  );
};

export default GoalStep;
