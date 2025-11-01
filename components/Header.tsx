
import React from 'react';

interface HeaderProps {
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  isAudioPlaying: boolean;
  onToggleAudio: () => void;
}

const SunIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);

const MoonIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
  </svg>
);

const BookIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-2 text-yellow-300 drop-shadow-lg animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
);

const MusicOnIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-13c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2z" />
    </svg>
);

const MusicOffIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM3 3l18 18" />
    </svg>
);


export const Header: React.FC<HeaderProps> = ({ isDarkMode, onToggleDarkMode, isAudioPlaying, onToggleAudio }) => {
  return (
    <header className="flex items-center justify-between p-4 bg-black bg-opacity-20 backdrop-blur-sm shadow-lg sticky top-0 z-10">
      <div className="flex items-center">
        <BookIcon />
        <h1 className="text-xl md:text-2xl font-bold text-white" style={{ textShadow: '0 0 8px rgba(252, 211, 77, 0.7)' }}>
          Masti Venkatesha Iyengar Bot
        </h1>
      </div>
      <div className="flex items-center space-x-2">
        <button
            onClick={onToggleAudio}
            className="p-2 rounded-full text-yellow-300 dark:text-yellow-400 bg-white bg-opacity-10 hover:bg-opacity-20 transition-colors"
            aria-label="Toggle background audio"
        >
            {isAudioPlaying ? <MusicOnIcon /> : <MusicOffIcon />}
        </button>
        <button
          onClick={onToggleDarkMode}
          className="p-2 rounded-full text-yellow-300 dark:text-yellow-400 bg-white bg-opacity-10 hover:bg-opacity-20 transition-colors"
          aria-label="Toggle dark mode"
        >
          {isDarkMode ? <SunIcon /> : <MoonIcon />}
        </button>
      </div>
    </header>
  );
};
