
import React from 'react';
import { Checkbox } from "@/components/ui/checkbox";

interface ConsentStepProps {
  value: boolean;
  onChange: (value: boolean) => void;
}

const ConsentStep = ({ value, onChange }: ConsentStepProps) => {
  return (
    <div className="text-center space-y-8">
      <div className="space-y-4">
        <div className="w-16 h-16 bg-green-500 rounded-2xl mx-auto flex items-center justify-center">
          <span className="text-3xl">📝</span>
        </div>
        
        <div className="bg-gray-200 rounded-2xl p-6 inline-block border border-gray-300">
          <h2 className="text-2xl font-bold mb-2 text-gray-800">Almost there!</h2>
          <p className="text-gray-600">Please review and accept our terms</p>
        </div>
      </div>

      <div className="space-y-6 max-w-md mx-auto">
        <div className="bg-gray-100 rounded-xl p-6 border border-gray-300 text-left">
          <h3 className="font-semibold mb-3 text-gray-800">Terms & Conditions Summary</h3>
          <ul className="text-sm text-gray-600 space-y-2">
            <li>• We respect your privacy and protect your data</li>
            <li>• Your health information is kept confidential</li>
            <li>• You can delete your account at any time</li>
            <li>• This app is for tracking purposes only</li>
            <li>• Always consult healthcare professionals for medical advice</li>
          </ul>
        </div>

        <div className="flex items-start space-x-3">
          <Checkbox
            id="consent"
            checked={value}
            onCheckedChange={onChange}
            className="mt-1"
          />
          <label
            htmlFor="consent"
            className="text-sm text-left leading-relaxed cursor-pointer text-gray-800"
          >
            I agree to the{' '}
            <a href="#" className="text-blue-600 hover:underline">
              Terms & Conditions
            </a>{' '}
            and{' '}
            <a href="#" className="text-blue-600 hover:underline">
              Privacy Policy
            </a>
            . I understand this app is for tracking purposes and should not replace professional medical advice.
          </label>
        </div>
      </div>
    </div>
  );
};

export default ConsentStep;
