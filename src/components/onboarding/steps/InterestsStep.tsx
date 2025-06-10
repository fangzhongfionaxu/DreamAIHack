
import React from 'react';

interface InterestsStepProps {
  value: string[];
  onChange: (value: string[]) => void;
}

const InterestsStep = ({ value, onChange }: InterestsStepProps) => {
  const interestOptions = [
    { value: 'improving-condition', label: 'Improving my condition', icon: '📈' },
    { value: 'motivational-tool', label: 'Having a motivational tool', icon: '💪' },
    { value: 'connect-others', label: 'Getting connected with others', icon: '🤝' }
  ];

  const toggleInterest = (interest: string) => {
    if (value.includes(interest)) {
      onChange(value.filter(i => i !== interest));
    } else {
      onChange([...value, interest]);
    }
  };

  return (
    <div className="text-center space-y-8">
      <div className="space-y-4">
        <div className="w-16 h-16 bg-purple-500 rounded-2xl mx-auto flex items-center justify-center">
          <span className="text-3xl">✨</span>
        </div>
        
        <div className="bg-gray-200 rounded-2xl p-6 inline-block border border-gray-300">
          <h2 className="text-2xl font-bold mb-2 text-gray-800">I'm interested in...</h2>
          <p className="text-gray-600">Select all that apply</p>
        </div>
      </div>

      <div className="space-y-4 max-w-md mx-auto">
        {interestOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => toggleInterest(option.value)}
            className={`w-full p-4 rounded-xl border-2 transition-all ${
              value.includes(option.value)
                ? 'border-purple-500 bg-purple-100'
                : 'border-gray-300 bg-gray-100 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center gap-4">
              <span className="text-2xl">{option.icon}</span>
              <span className="text-lg font-medium text-left flex-1 text-gray-800">{option.label}</span>
              <div className={`w-6 h-6 rounded border-2 ${
                value.includes(option.value) ? 'border-purple-500 bg-purple-500' : 'border-gray-400'
              }`}>
                {value.includes(option.value) && (
                  <div className="w-full h-full rounded bg-purple-500 flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default InterestsStep;
