"use client"

import React, { useState } from 'react';
import WelcomeScreen from '@/components/welcome-screen';
import ChatScreen from '@/components/chat-screen';
import ChatInput from '@/components/chat-input';
import { useChat } from '@/components/chat-provider';

export default function Home() {
  const {
    isAnalyzed,
    setIsAnalyzed,
    messages,
    setMessages,
    isLoading,
    setIsLoading,
    selectedProduct,
    setSelectedProduct
  } = useChat();

  const [suggestedInput, setSuggestedInput] = useState('');

  const handleSend = async (message: string) => {
    if (!isAnalyzed) setIsAnalyzed(true);
    setSuggestedInput('');

    const newUserMsg = { role: 'user' as const, content: message };
    setMessages(prev => [...prev, newUserMsg]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, productName: selectedProduct }),
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

  const handleSuggest = (question: string) => {
    setSuggestedInput(question);
    handleSend(question);
  };

  return (
    <>
      <div className="flex-1 min-h-0 overflow-hidden flex flex-col relative">
        {isAnalyzed ? (
          <ChatScreen
            messages={messages}
            isLoading={isLoading}
            selectedProduct={selectedProduct}
            onSelectProduct={setSelectedProduct}
          />
        ) : (
          <WelcomeScreen onSuggest={handleSuggest} />
        )}
      </div>

      <ChatInput
        isAnalyzed={isAnalyzed}
        onSend={handleSend}
        defaultValue={suggestedInput}
      />
    </>
  );
}
