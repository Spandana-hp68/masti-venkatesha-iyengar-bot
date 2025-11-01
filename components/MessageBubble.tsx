
import React, { useEffect, useState } from 'react';
import { Message, Role } from '../types';

interface MessageBubbleProps {
  message: Message;
}

const BotIcon = () => (
    <div className="w-8 h-8 rounded-full flex-shrink-0 bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center mr-2 shadow-md">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
    </div>
);

const UserIcon = () => (
    <div className="w-8 h-8 rounded-full flex-shrink-0 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center ml-2 shadow-md">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
    </div>
);

const FormattedBotMessage: React.FC<{ text: string }> = ({ text }) => {
    const formatText = (inputText: string) => {
        const lines = inputText.split('\n');
        return lines.map((line, index) => {
            // Bold
            line = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
            // Heading
            if (line.startsWith('# ')) {
                return <h3 key={index} className="text-xl font-bold mt-2 mb-1" dangerouslySetInnerHTML={{ __html: line.substring(2) }} />;
            }
            // Bullet points
            if (line.startsWith('* ')) {
                return <li key={index} className="ml-5 list-disc" dangerouslySetInnerHTML={{ __html: line.substring(2) }} />;
            }
            return <p key={index} className="my-1" dangerouslySetInnerHTML={{ __html: line }} />;
        });
    };
    return <>{formatText(text)}</>;
};

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const [visible, setVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);
  
  const isBot = message.role === Role.Bot;
  const bubbleAlignment = isBot ? 'justify-start' : 'justify-end';
  const bubbleColor = isBot 
    ? 'bg-white dark:bg-gray-800' 
    : 'bg-red-500 dark:bg-red-700 text-white';
  const bubbleStyles = `rounded-xl p-3 max-w-md md:max-w-lg lg:max-w-2xl shadow-md transition-all duration-500 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`;
  
  return (
    <div className={`flex items-end ${bubbleAlignment}`}>
      {isBot && <BotIcon />}
      <div className={`${bubbleColor} ${bubbleStyles}`}>
        {isBot ? <FormattedBotMessage text={message.parts} /> : message.parts}
      </div>
      {!isBot && <UserIcon />}
    </div>
  );
};
