
import React, { useState, KeyboardEvent } from 'react';

interface ChatInputProps {
  onSendMessage: (text: string) => void;
  disabled: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, disabled }) => {
  const [text, setText] = useState('');

  const handleSend = () => {
    if (text.trim()) {
      onSendMessage(text);
      setText('');
    }
  };

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="w-full max-w-2xl bg-black bg-opacity-20 backdrop-blur-sm p-2 rounded-full flex items-center shadow-lg">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Ask about an author or a book..."
        disabled={disabled}
        className="flex-1 bg-transparent border-none text-white placeholder-gray-400 focus:ring-0 px-4 py-2"
      />
      <button
        onClick={handleSend}
        disabled={disabled || !text.trim()}
        className="p-3 rounded-full bg-yellow-400 text-red-900 hover:bg-yellow-300 disabled:bg-gray-500 disabled:cursor-not-allowed transition-colors"
        aria-label="Send message"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>
    </div>
  );
};
