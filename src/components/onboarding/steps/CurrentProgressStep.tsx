
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface CurrentProgressStepProps {
  data: { curveDegree: string; currentBracingHours: string };
  onChange: (field: 'curveDegree' | 'currentBracingHours', value: string) => void;
}

const CurrentProgressStep = ({ data, onChange }: CurrentProgressStepProps) => {
  const curveOptions = [
    '1-10 degrees',
    '11-20 degrees',
    '21-30 degrees',
    '31-40 degrees',
    '40+ degrees'
  ];

  const hoursOptions = [
    '0-4 hours/day',
    '5-9 hours/day',
    '10-14 hours/day',
    '15-19 hours/day',
    '20+ hours/day',
  ];

  return (
    <div className="text-center space-y-8">
      <div className="space-y-4">
        <div className="w-16 h-16 bg-teal-500 rounded-2xl mx-auto flex items-center justify-center">
          <span className="text-3xl">📊</span>
        </div>
        
        <div className="bg-gray-200 rounded-2xl p-6 inline-block border border-gray-300">
          <h2 className="text-2xl font-bold mb-2 text-gray-800">Your current progress</h2>
          <p className="text-gray-600">Let's get a baseline to track your improvement.</p>
        </div>
      </div>

      <div className="space-y-6 max-w-md mx-auto text-left">
        <div>
          <label className="font-semibold text-gray-700 mb-2 block">The degree of my curve is...</label>
          <Select value={data.curveDegree} onValueChange={(value) => onChange('curveDegree', value)}>
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
        <div>
          <label className="font-semibold text-gray-700 mb-2 block">My current bracing time is...</label>
          <Select value={data.currentBracingHours} onValueChange={(value) => onChange('currentBracingHours', value)}>
            <SelectTrigger className="h-16 text-lg bg-gray-100 border-gray-300 hover:bg-gray-50 rounded-xl text-gray-800">
              <SelectValue placeholder="Select your daily average" />
            </SelectTrigger>
            <SelectContent className="bg-white border-gray-300">
              {hoursOptions.map((option) => (
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
    </div>
  );
};

export default CurrentProgressStep;
