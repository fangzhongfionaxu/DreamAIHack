
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { OnboardingData } from '../OnboardingWorkflow';

interface OptionalSurveyStepProps {
  data: OnboardingData;
  onChange: (field: keyof OnboardingData, value: any) => void;
  onSkip: () => void;
}

const OptionalSurveyStep = ({ data, onChange, onSkip }: OptionalSurveyStepProps) => {
  const ageRanges = ['Under 13', '13-17', '18-24', '25-34', '35-44', '45-54', '55-64', '65+'];
  const genderOptions = [
    { value: 'male', label: 'Male', icon: '👨' },
    { value: 'female', label: 'Female', icon: '👩' },
    { value: 'other', label: 'Other', icon: '🧑' }
  ];
  const discoveryOptions = [
    { value: 'friends-family', label: 'Friends & Family', icon: '👥' },
    { value: 'social-media', label: 'Social Media', icon: '📱' },
    { value: 'search-engine', label: 'Search Engine', icon: '🔍' },
    { value: 'other', label: 'Other', icon: '💭' }
  ];

  return (
    <div className="text-center space-y-8">
      <div className="space-y-4">
        <div className="w-16 h-16 bg-purple-500 rounded-2xl mx-auto flex items-center justify-center">
          <span className="text-3xl">📝</span>
        </div>
        <div className="bg-gray-200 rounded-2xl p-6 inline-block border border-gray-300">
          <h2 className="text-2xl font-bold mb-2 text-gray-800">Tell us a bit more (Optional)</h2>
          <p className="text-gray-600">This helps us personalize your experience.</p>
        </div>
      </div>

      <div className="space-y-6 max-w-md mx-auto text-left">
        <div>
          <label className="font-semibold text-gray-700 mb-2 block">I am ___ years old</label>
          <Select value={data.ageRange} onValueChange={(value) => onChange('ageRange', value)}>
            <SelectTrigger className="h-12 text-lg bg-gray-100 border-gray-300 hover:bg-gray-50 rounded-xl text-gray-800 w-full">
              <SelectValue placeholder="Select your age range" />
            </SelectTrigger>
            <SelectContent className="bg-white border-gray-300">
              {ageRanges.map((range) => (
                <SelectItem key={range} value={range} className="text-gray-800 hover:bg-gray-100 focus:bg-gray-100">
                  {range}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <label className="font-semibold text-gray-700 mb-2 block">I am a...</label>
          <div className="space-y-2">
            {genderOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => onChange('gender', option.value)}
                className={`w-full p-3 rounded-xl border-2 transition-all flex items-center gap-4 ${
                  data.gender === option.value
                    ? 'border-pink-500 bg-pink-100'
                    : 'border-gray-300 bg-gray-100 hover:bg-gray-50'
                }`}
              >
                <span className="text-2xl">{option.icon}</span>
                <span className="text-lg font-medium text-gray-800">{option.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="font-semibold text-gray-700 mb-2 block">I found out about emBrace through...</label>
          <div className="space-y-2">
            {discoveryOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => onChange('discoveryMethod', option.value)}
                className={`w-full p-3 rounded-xl border-2 transition-all flex items-center gap-4 ${
                  data.discoveryMethod === option.value
                    ? 'border-blue-500 bg-blue-100'
                    : 'border-gray-300 bg-gray-100 hover:bg-gray-50'
                }`}
              >
                <span className="text-2xl">{option.icon}</span>
                <span className="text-lg font-medium text-gray-800">{option.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
      
      <button onClick={onSkip} className="mt-4 underline text-gray-600 hover:text-gray-800">
        Skip for now
      </button>
    </div>
  );
};

export default OptionalSurveyStep;
