
import React from 'react';

const WelcomePatientStep = () => {
  return (
    <div className="text-center space-y-8 max-w-md mx-auto">
      <div className="space-y-6">
        <div className="text-8xl animate-bounce">
          🎉
        </div>
        
        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-gray-800">
            Welcome to emBrace!
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Congratulations! You've successfully completed your onboarding. 
            We're so excited to have you join our supportive community! 💙
          </p>
        </div>
        
        <div className="bg-white/60 rounded-2xl p-6 border border-teal-200 shadow-sm">
          <div className="flex items-center gap-4 justify-center">
            <div className="w-12 h-12 bg-teal-500 rounded-xl flex items-center justify-center">
              <span className="text-2xl">🌱</span>
            </div>
            <div className="text-left">
              <h3 className="text-lg font-semibold text-teal-700">Your Journey Begins</h3>
              <p className="text-gray-600">Let's start building healthy habits together</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white/60 rounded-2xl p-6 border border-pink-200 shadow-sm">
          <div className="flex items-center gap-4 justify-center">
            <div className="w-12 h-12 bg-pink-500 rounded-xl flex items-center justify-center">
              <span className="text-2xl">💝</span>
            </div>
            <div className="text-left">
              <h3 className="text-lg font-semibold text-pink-700">Community Support</h3>
              <p className="text-gray-600">You're never alone on this journey</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomePatientStep;
