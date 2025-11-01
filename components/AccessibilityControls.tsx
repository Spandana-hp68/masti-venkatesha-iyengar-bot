
import React from 'react';

interface AccessibilityControlsProps {
  onListen: () => void;
  onReadAloud: () => void;
  isListening: boolean;
  isSpeaking: boolean;
  isSupported: boolean;
}

const MicIcon = ({ isListening }: { isListening: boolean }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={`h-8 w-8 transition-colors ${isListening ? 'text-red-500' : 'text-red-900'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-14 0m7 10v4m0 0H9m4 0h4m-4-8a3 3 0 013-3V5a7 7 0 00-7 7v2a3 3 0 013 3z" />
    </svg>
);

const SpeakerIcon = ({ isSpeaking }: { isSpeaking: boolean }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={`h-8 w-8 transition-colors ${isSpeaking ? 'text-green-500' : 'text-red-900'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.858 15.858a5 5 0 01-2.828-7.072m9.9 9.9a1 1 0 01-1.414 0L10 14.414V9.586l2.293-2.293a1 1 0 011.414 0l.001.001.001.001a1 1 0 010 1.414L12.414 10l2.293 2.293a1 1 0 010 1.414l-2.293 2.293z" />
    </svg>
);

export const AccessibilityControls: React.FC<AccessibilityControlsProps> = ({ onListen, onReadAloud, isListening, isSpeaking, isSupported }) => {
    if (!isSupported) {
        return null;
    }

    return (
        <div className="fixed bottom-24 md:bottom-6 right-1/2 translate-x-1/2 md:right-6 md:translate-x-0 flex gap-4 z-20">
            <button
                onClick={onListen}
                className={`p-4 rounded-full bg-yellow-400 hover:bg-yellow-300 transition-all duration-300 shadow-lg ${isListening ? 'scale-110 animate-pulse' : ''}`}
                aria-label={isListening ? 'Stop listening' : 'Start listening'}
            >
                <MicIcon isListening={isListening} />
            </button>
            <button
                onClick={onReadAloud}
                className={`p-4 rounded-full bg-yellow-400 hover:bg-yellow-300 transition-all duration-300 shadow-lg ${isSpeaking ? 'scale-110' : ''}`}
                aria-label={isSpeaking ? 'Stop reading aloud' : 'Read latest message aloud'}
            >
                <SpeakerIcon isSpeaking={isSpeaking} />
            </button>
        </div>
    );
};
