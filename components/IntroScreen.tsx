
import React from 'react';
import { Language } from '../types';
import { LanguageSelector } from './LanguageSelector';

interface IntroScreenProps {
  onSelectLanguage: (language: Language) => void;
}

export const IntroScreen: React.FC<IntroScreenProps> = ({ onSelectLanguage }) => {
  return (
    <div className="flex flex-col items-center justify-center flex-1 text-center z-10">
      <div className="bg-black bg-opacity-30 backdrop-blur-md p-8 rounded-2xl shadow-2xl">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-3" style={{ textShadow: '0 0 10px rgba(252, 211, 77, 0.8)' }}>
          Welcome to Masti Venkatesha Iyengar Bot
        </h2>
        <p className="text-lg md:text-xl text-yellow-200 mb-8">
          Please select your preferred language to begin.
        </p>
        <LanguageSelector
          currentLanguage={{ code: '', name: '', flag: '' }}
          onSelectLanguage={onSelectLanguage}
        />
      </div>
    </div>
  );
};
