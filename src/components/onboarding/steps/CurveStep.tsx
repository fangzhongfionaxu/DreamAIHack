
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
        
        <div className="bg-slate-800/50 rounded-2xl p-6 inline-block border border-slate-700">
          <h2 className="text-2xl font-bold mb-2">The degree of my curve is...</h2>
        </div>
      </div>

      <div className="space-y-4 max-w-md mx-auto">
        <Select value={value} onValueChange={onChange}>
          <SelectTrigger className="h-16 text-lg bg-slate-800/50 border-slate-600 hover:bg-slate-700/50 rounded-xl">
            <SelectValue placeholder="Select your curve degree" />
          </SelectTrigger>
          <SelectContent className="bg-slate-800 border-slate-600">
            {curveOptions.map((option) => (
              <SelectItem 
                key={option} 
                value={option}
                className="text-white hover:bg-slate-700 focus:bg-slate-700"
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
