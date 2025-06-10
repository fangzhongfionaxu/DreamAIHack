
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface CurveStepProps {
  value: string;
  onChange: (value: string) => void;
}

const CurveStep = ({ value, onChange }: CurveStepProps) => {
  const curveOptions = [
    '1-10 degrees',
    '11-20 degrees',
    '21-30 degrees',
    '31-40 degrees',
    '40+ degrees'
  ];

  return (
    <div className="text-center space-y-8">
      <div className="space-y-4">
        <div className="w-16 h-16 bg-teal-500 rounded-2xl mx-auto flex items-center justify-center">
          <span className="text-3xl">📏</span>
        </div>
        
        <div className="bg-gray-200 rounded-2xl p-6 inline-block border border-gray-300">
          <h2 className="text-2xl font-bold mb-2 text-gray-800">The degree of my curve is...</h2>
        </div>
      </div>

      <div className="space-y-4 max-w-md mx-auto">
        <Select value={value} onValueChange={onChange}>
          <SelectTrigger className="h-16 text-lg bg-gray-100 border-gray-300 hover:bg-gray-50 rounded-xl text-gray-800">
            <SelectValue placeholder="Select your curve degree" />
          </SelectTrigger>
          <SelectContent className="bg-white border-gray-300">
            {curveOptions.map((option) => (
              <SelectItem 
                key={option} 
                value={option}
                className="text-gray-800 hover:bg-gray-100 focus:bg-gray-100"
              >
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default CurveStep;
