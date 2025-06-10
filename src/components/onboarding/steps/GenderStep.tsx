
import React from 'react';

interface GenderStepProps {
  value: string;
  onChange: (value: string) => void;
}

const GenderStep = ({ value, onChange }: GenderStepProps) => {
  const genderOptions = [
    { value: 'male', label: 'Male', icon: '👨' },
    { value: 'female', label: 'Female', icon: '👩' },
    { value: 'other', label: 'Other', icon: '🧑' }
  ];

  return (
    <div className="text-center space-y-8">
      <div className="space-y-4">
        <div className="w-16 h-16 bg-pink-500 rounded-2xl mx-auto flex items-center justify-center">
          <span className="text-3xl">👤</span>
        </div>
        
        <div className="bg-slate-800/50 rounded-2xl p-6 inline-block border border-slate-700">
          <h2 className="text-2xl font-bold mb-2">I am a...</h2>
        </div>
      </div>

      <div className="space-y-4 max-w-md mx-auto">
        {genderOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => onChange(option.value)}
            className={`w-full p-4 rounded-xl border-2 transition-all ${
              value === option.value
                ? 'border-pink-500 bg-pink-500/20'
                : 'border-slate-600 bg-slate-800/50 hover:bg-slate-700/50'
            }`}
          >
            <div className="flex items-center gap-4">
              <span className="text-2xl">{option.icon}</span>
              <span className="text-lg font-medium">{option.label}</span>
              <div className={`ml-auto w-6 h-6 rounded-full border-2 ${
                value === option.value ? 'border-pink-500 bg-pink-500' : 'border-slate-400'
              }`}>
                {value === option.value && (
                  <div className="w-full h-full rounded-full bg-pink-500"></div>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default GenderStep;
