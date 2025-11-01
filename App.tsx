
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Header } from './components/Header';
import { LanguageSelector } from './components/LanguageSelector';
import { ChatWindow } from './components/ChatWindow';
import { QuickFeatures } from './components/QuickFeatures';
import { ChatInput } from './components/ChatInput';
import { AccessibilityControls } from './components/AccessibilityControls';
import { IntroScreen } from './components/IntroScreen';
import { Message, Language, Role } from './types';
import { LANGUAGES } from './constants';
import { sendMessageToBot, initializeChat } from './services/geminiService';
import type { Chat } from '@google/genai';

// Speech recognition setup
// Fix: Cast window to any to access browser-specific SpeechRecognition APIs which are not part of standard TypeScript DOM types.
const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
const isSpeechSupported = !!SpeechRecognition;
// Fix: Use 'any' for the recognition object's type to avoid a name collision with the 'SpeechRecognition' variable declared above.
let recognition: any | null = null;
if (isSpeechSupported) {
    recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
}

const PARTICLE_COUNT = 30;

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentLanguage, setCurrentLanguage] = useState<Language>(LANGUAGES[2]); // Default to English
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isLanguageSelected, setIsLanguageSelected] = useState(false);
  
  const chatSessionRef = useRef<Chat | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  
  const handleToggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);
  
  const getFontClass = (langCode: string) => {
    switch (langCode) {
      case 'kn': return 'font-kannada';
      case 'hi': return 'font-hindi';
      case 'te': return 'font-telugu';
      default: return 'font-sans';
    }
  };

  const reinitializeChat = useCallback(async (language: Language) => {
    setIsLoading(true);
    setMessages([{ role: Role.Bot, parts: `Switching language to ${language.name}...`, timestamp: new Date() }]);
    try {
      chatSessionRef.current = await initializeChat(language.name);
      const initialResponse = await sendMessageToBot(chatSessionRef.current, `Hello! Please introduce yourself in ${language.name} and invite me to ask about the author Masti Venkatesha Iyengar.`);
      setMessages([{ role: Role.Bot, parts: initialResponse, timestamp: new Date() }]);
    } catch (error) {
      console.error("Failed to reinitialize chat:", error);
      setMessages([{ role: Role.Bot, parts: "Sorry, I couldn't switch the language. Please try again.", timestamp: new Date() }]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isLanguageSelected) {
      reinitializeChat(currentLanguage);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentLanguage]);

  const handleInitialLanguageSelect = (lang: Language) => {
    setCurrentLanguage(lang);
    setIsLanguageSelected(true);
  };

  const handleSwitchToLanguageScreen = () => {
    setIsLanguageSelected(false);
    setMessages([]);
    chatSessionRef.current = null;
  };


  const handleSendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;
    if (isSpeaking) window.speechSynthesis.cancel();

    const userMessage: Message = {
      role: Role.User,
      parts: text,
      timestamp: new Date(),
    };
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setIsLoading(true);

    try {
      if (!chatSessionRef.current) {
        throw new Error("Chat session not initialized.");
      }
      const botResponseText = await sendMessageToBot(chatSessionRef.current, text);
      const botMessage: Message = {
        role: Role.Bot,
        parts: botResponseText,
        timestamp: new Date(),
      };
      setMessages(prevMessages => [...prevMessages, botMessage]);
    } catch (error) {
      console.error("Failed to send message:", error);
      const errorMessage: Message = {
        role: Role.Bot,
        parts: 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date(),
      };
      setMessages(prevMessages => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // --- Accessibility Features ---

  const handleListen = () => {
    if (!isSpeechSupported || !recognition) return;
    if (isListening) {
        recognition.stop();
        setIsListening(false);
        return;
    }
    recognition.lang = currentLanguage.code;
    recognition.start();
    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        handleSendMessage(transcript);
    };
    recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
    };
  };

  const handleReadAloud = () => {
      if (isSpeaking) {
          window.speechSynthesis.cancel();
          setIsSpeaking(false);
          return;
      }
      const lastBotMessage = messages.slice().reverse().find(m => m.role === Role.Bot);
      if (lastBotMessage) {
          const utterance = new SpeechSynthesisUtterance(lastBotMessage.parts.replace(/<[^>]*>?/gm, ' '));
          utterance.lang = currentLanguage.code;
          utterance.onstart = () => setIsSpeaking(true);
          utterance.onend = () => setIsSpeaking(false);
          utterance.onerror = () => setIsSpeaking(false);
          window.speechSynthesis.speak(utterance);
      }
  };

  // --- Background Audio ---
  const toggleAudio = () => {
      if (audioRef.current) {
          if (isAudioPlaying) {
              audioRef.current.pause();
          } else {
              audioRef.current.play().catch(e => console.error("Audio playback failed:", e));
          }
          setIsAudioPlaying(!isAudioPlaying);
      }
  };

  const particles = Array.from({ length: PARTICLE_COUNT }).map((_, i) => ({
      id: i,
      style: {
          left: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 25}s`,
          animationDuration: `${15 + Math.random() * 10}s`,
          transform: `scale(${Math.random() * 0.5 + 0.5})`
      }
  }));

  return (
    <div className={`relative ${getFontClass(currentLanguage.code)} min-h-screen bg-gradient-to-br from-red-600 to-yellow-400 dark:from-red-900 dark:to-yellow-800 text-gray-800 dark:text-gray-200 bg-[200%_200%] animate-gradient flex flex-col`}>
      <div className="particles">
        {particles.map(p => <div key={p.id} className="particle" style={p.style} />)}
      </div>
      <Header isDarkMode={isDarkMode} onToggleDarkMode={handleToggleDarkMode} isAudioPlaying={isAudioPlaying} onToggleAudio={toggleAudio} />
      
      <main className="flex-1 flex flex-col p-4 md:p-6 overflow-hidden">
        {!isLanguageSelected ? (
          <IntroScreen onSelectLanguage={handleInitialLanguageSelect} />
        ) : (
          <>
            <LanguageSelector
              currentLanguage={currentLanguage}
              onSelectLanguage={(lang) => setCurrentLanguage(lang)}
            />
            <ChatWindow messages={messages} isLoading={isLoading} />
            <div className="mt-4 flex flex-col items-center">
                <QuickFeatures 
                  onFeatureSelect={handleSendMessage} 
                  disabled={isLoading} 
                  onSwitchLanguage={handleSwitchToLanguageScreen}
                />
                 {/* Spacer for floating buttons on mobile to not overlap chat input */}
                <div className="h-24 md:h-0"></div>
                <ChatInput onSendMessage={handleSendMessage} disabled={isLoading} />
            </div>
          </>
        )}
      </main>
      {isLanguageSelected && (
        <AccessibilityControls
          onListen={handleListen}
          onReadAloud={handleReadAloud}
          isListening={isListening}
          isSpeaking={isSpeaking}
          isSupported={isSpeechSupported}
        />
      )}
      <audio ref={audioRef} src="https://www.chosic.com/wp-content/uploads/2021/08/purrple-cat-dreaming-of-you.mp3" loop />
    </div>
  );
}

export default App;
