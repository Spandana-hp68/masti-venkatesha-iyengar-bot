
import React from 'react';
import { Language } from '../types';
import { LANGUAGES } from '../constants';

interface LanguageSelectorProps {
  currentLanguage: Language;
  onSelectLanguage: (language: Language) => void;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({ currentLanguage, onSelectLanguage }) => {
  return (
    <div id="language-selector" className="flex justify-center items-center space-x-2 md:space-x-4 mb-4 p-2 bg-black bg-opacity-20 backdrop-blur-sm rounded-full">
      {LANGUAGES.map((lang) => (
        <button
          key={lang.code}
          onClick={() => onSelectLanguage(lang)}
          className={`px-3 py-2 md:px-4 text-sm md:text-base font-semibold rounded-full transition-all duration-300 ease-in-out flex items-center space-x-2 ${
            currentLanguage.code === lang.code
              ? 'bg-yellow-400 text-red-900 shadow-lg scale-110'
              : 'bg-white bg-opacity-10 text-white hover:bg-opacity-20'
          }`}
        >
          <span>{lang.flag}</span>
          <span className="hidden sm:inline">{lang.name}</span>
        </button>
      ))}
    </div>
  );
};
