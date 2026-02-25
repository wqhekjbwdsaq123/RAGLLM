"use client"

import React, { useState } from 'react';
import Sidebar from '@/components/sidebar';
import WelcomeScreen from '@/components/welcome-screen';
import ChatScreen from '@/components/chat-screen';
import ChatInput from '@/components/chat-input';

export default function Home() {
  const [isAnalyzed, setIsAnalyzed] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant', content: string, results?: any[] }[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async (message: string) => {
    if (!isAnalyzed) setIsAnalyzed(true);

    // Add user message
    const newUserMsg = { role: 'user' as const, content: message };
    setMessages(prev => [...prev, newUserMsg]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: data.answer || `${data.results.length}개의 관련 리뷰를 찾았습니다.`,
          results: data.results
        }]);
      } else {
        setMessages(prev => [...prev, { role: 'assistant', content: `에러가 발생했습니다: ${data.error}` }]);
      }
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: "요청 처리 중 오류가 발생했습니다." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewChat = () => {
    setIsAnalyzed(false);
    setMessages([]);
  };

  return (
    <main className="flex h-screen bg-gray-50 overflow-hidden font-sans">
      <Sidebar isAnalyzed={isAnalyzed} onNewChat={handleNewChat} />

      <div className="flex-1 flex flex-col min-w-0">
        <div className="flex-1 overflow-hidden relative">
          {isAnalyzed ? (
            <ChatScreen messages={messages} isLoading={isLoading} />
          ) : (
            <WelcomeScreen />
          )}
        </div>

        <ChatInput isAnalyzed={isAnalyzed} onSend={handleSend} />
      </div>
    </main>
  );
}
