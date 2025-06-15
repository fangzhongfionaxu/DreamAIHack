
import React from 'react';
import { Input } from '@/components/ui/input';
import { OnboardingData } from '../OnboardingWorkflow';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";


interface OtherUserSurveyStepProps {
  data: OnboardingData;
  onChange: (field: keyof OnboardingData, value: any) => void;
}

const OtherUserSurveyStep = ({ data, onChange }: OtherUserSurveyStepProps) => {

  const interestReasons = [
    "I'm a parent or guardian of a patient.",
    "I'm a clinician or healthcare provider.",
    "I'm a friend of a patient.",
    "I'm conducting research.",
    "I'm just curious.",
  ];

  return (
    <div className="text-center space-y-8">
      <div className="space-y-4">
        <div className="w-16 h-16 bg-blue-500 rounded-2xl mx-auto flex items-center justify-center">
          <span className="text-3xl">🧑‍🤝‍🧑</span>
        </div>
        <div className="bg-gray-200 rounded-2xl p-6 inline-block border border-gray-300">
          <h2 className="text-2xl font-bold mb-2 text-gray-800">Thanks for your interest!</h2>
          <p className="text-gray-600">A couple of questions to help us understand.</p>
        </div>
      </div>

      <div className="space-y-6 max-w-md mx-auto text-left">
        <div>
          <label className="font-semibold text-gray-700 mb-2 block">I'm interested because...</label>
          <Select value={data.interestReason} onValueChange={(value) => onChange('interestReason', value)}>
            <SelectTrigger className="h-12 text-lg bg-gray-100 border-gray-300 hover:bg-gray-50 rounded-xl text-gray-800 w-full">
              <SelectValue placeholder="Select a reason" />
            </SelectTrigger>
            <SelectContent className="bg-white border-gray-300">
              {interestReasons.map((reason) => (
                <SelectItem key={reason} value={reason} className="text-gray-800 hover:bg-gray-100 focus:bg-gray-100">
                  {reason}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <label className="font-semibold text-gray-700 mb-2 block">How did you hear about us?</label>
          <Input 
            type="text" 
            placeholder="e.g., a friend, social media, doctor..."
            value={data.otherDiscoveryMethod}
            onChange={(e) => onChange('otherDiscoveryMethod', e.target.value)}
            className="h-12 text-lg bg-gray-100 border-gray-300 rounded-xl"
          />
        </div>
      </div>
    </div>
  );
};

export default OtherUserSurveyStep;
