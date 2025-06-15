
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

interface IdentityStepProps {
  value: 'patient' | 'other' | '';
  onChange: (value: 'patient' | 'other') => void;
}

const IdentityStep = ({ value, onChange }: IdentityStepProps) => {
  const options = [
    { type: 'patient' as const, title: 'A bracing scoliosis patient', description: "I'm here to track my bracing journey and connect with others.", icon: '💪' },
    { type: 'other' as const, title: 'Other', description: "I'm a parent, friend, or clinician interested in learning more.", icon: '🧑‍🤝‍🧑' },
  ];

  return (
    <div className="text-center space-y-8">
      <div className="space-y-4">
        <div className="w-16 h-16 bg-blue-500 rounded-2xl mx-auto flex items-center justify-center">
          <span className="text-3xl">👋</span>
        </div>
        <div className="bg-gray-200 rounded-2xl p-6 inline-block border border-gray-300">
          <h2 className="text-2xl font-bold mb-2 text-gray-800">I identify as...</h2>
        </div>
      </div>
      <div className="space-y-4 max-w-lg mx-auto">
        {options.map((option) => (
          <Card
            key={option.type}
            onClick={() => onChange(option.type)}
            className={`cursor-pointer text-left transition-all border-2 ${
              value === option.type
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-300 bg-white hover:bg-gray-50'
            }`}
          >
            <CardHeader>
              <div className="flex items-center gap-4">
                <span className="text-4xl">{option.icon}</span>
                <div>
                  <CardTitle>{option.title}</CardTitle>
                  <CardDescription className="mt-1">{option.description}</CardDescription>
                </div>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default IdentityStep;
