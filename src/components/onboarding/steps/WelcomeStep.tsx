
import React from 'react';

const WelcomeStep = () => {
  return (
    <div className="text-center space-y-8">
      <div className="space-y-4">
        <img 
          src="/assets/branding/emBrace_logo_black.png" 
          alt="emBrace Logo" 
          className="h-16 mx-auto"
        />
        <h1 className="text-3xl font-bold text-gray-800">Welcome to emBrace!</h1>
        <p className="text-xl text-gray-600">
          Let's personalize your experience to help you achieve your bracing goals.
        </p>
      </div>
      
      <div className="space-y-6">
        <div className="bg-white/60 rounded-2xl p-6 border border-teal-200 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-teal-500 rounded-xl flex items-center justify-center">
              <span className="text-2xl">🌱</span>
            </div>
            <div className="text-left">
              <h3 className="text-lg font-semibold text-teal-700">Track Your Progress</h3>
              <p className="text-gray-600">Monitor your bracing journey and celebrate milestones</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white/60 rounded-2xl p-6 border border-pink-200 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-pink-500 rounded-xl flex items-center justify-center">
              <span className="text-2xl">💝</span>
            </div>
            <div className="text-left">
              <h3 className="text-lg font-semibold text-pink-700">Connect with Others</h3>
              <p className="text-gray-600">Join a supportive community on the same journey</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeStep;
