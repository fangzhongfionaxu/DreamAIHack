
import React from 'react';

const ThankYouStep = () => {
  return (
    <div className="text-center space-y-8 max-w-md mx-auto">
      <div className="space-y-6">
        <div className="text-8xl">
          👍
        </div>
        
        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-gray-800">
            Thank You!
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            We appreciate you taking the time to check out emBrace. Your support and interest in our community means a lot.
          </p>
        </div>

        <div className="bg-white/60 rounded-2xl p-6 border border-teal-200 shadow-sm text-left">
          <p className="text-gray-700">
            If you know a patient who could benefit from emBrace, please feel free to share our app with them.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ThankYouStep;
