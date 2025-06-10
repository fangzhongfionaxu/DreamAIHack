
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface AgeStepProps {
  value: string;
  onChange: (value: string) => void;
}

const AgeStep = ({ value, onChange }: AgeStepProps) => {
  const ageRanges = [
    'Under 13',
    '13-17',
    '18-24',
    '25-34',
    '35-44',
    '45-54',
    '55-64',
    '65+'
  ];

  return (
    <div className="text-center space-y-8">
      <div className="space-y-4">
        <div className="w-16 h-16 bg-orange-500 rounded-2xl mx-auto flex items-center justify-center">
          <span className="text-3xl">🎂</span>
        </div>
        
        <div className="bg-slate-800/50 rounded-2xl p-6 inline-block border border-slate-700">
          <h2 className="text-2xl font-bold mb-2">I am ___ years old</h2>
        </div>
      </div>

      <div className="space-y-4 max-w-md mx-auto">
        <Select value={value} onValueChange={onChange}>
          <SelectTrigger className="h-16 text-lg bg-slate-800/50 border-slate-600 hover:bg-slate-700/50 rounded-xl">
            <SelectValue placeholder="Select your age range" />
          </SelectTrigger>
          <SelectContent className="bg-slate-800 border-slate-600">
            {ageRanges.map((range) => (
              <SelectItem 
                key={range} 
                value={range}
                className="text-white hover:bg-slate-700 focus:bg-slate-700"
              >
                {range}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default AgeStep;
