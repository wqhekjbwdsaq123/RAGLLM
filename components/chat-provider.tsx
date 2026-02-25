"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export interface ChatSession {
    id: string;
    title: string;
    date: string;
    messages: { role: 'user' | 'assistant', content: string, results?: any[] }[];
}

interface ChatContextValue {
    isAnalyzed: boolean;
    setIsAnalyzed: (v: boolean) => void;
    messages: { role: 'user' | 'assistant', content: string, results?: any[] }[];
    setMessages: React.Dispatch<React.SetStateAction<{ role: 'user' | 'assistant', content: string, results?: any[] }[]>>;
    isLoading: boolean;
    setIsLoading: (v: boolean) => void;
    selectedProduct: string;
    setSelectedProduct: (v: string) => void;
    history: ChatSession[];
    handleNewChat: () => void;
    handleSelectHistory: (sessionId: string) => void;
}

const ChatContext = createContext<ChatContextValue | undefined>(undefined);

export function ChatProvider({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const [isAnalyzed, setIsAnalyzed] = useState(false);
    const [messages, setMessages] = useState<{ role: 'user' | 'assistant', content: string, results?: any[] }[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState('');
    const [history, setHistory] = useState<ChatSession[]>([]);

    useEffect(() => {
        const saved = localStorage.getItem('chatHistory');
        if (saved) {
            try { setHistory(JSON.parse(saved)); } catch (e) { }
        }
    }, []);

    const saveHistory = (newHistory: ChatSession[]) => {
        setHistory(newHistory);
        localStorage.setItem('chatHistory', JSON.stringify(newHistory));
    };

    const handleNewChat = () => {
        if (messages.length > 0) {
            const titleMsg = messages.find(m => m.role === 'user');
            const title = titleMsg ? titleMsg.content.slice(0, 30) + (titleMsg.content.length > 30 ? '...' : '') : '새로운 대화';
            const newSession: ChatSession = {
                id: Date.now().toString(),
                title,
                date: new Date().toLocaleDateString(),
                messages
            };
            saveHistory([newSession, ...history]);
        }
        setIsAnalyzed(false);
        setMessages([]);
        router.push('/');
    };

    const handleSelectHistory = (sessionId: string) => {
        const session = history.find(s => s.id === sessionId);
        if (session) {
            setMessages(session.messages);
            setIsAnalyzed(true);
            router.push('/');
        }
    };

    return (
        <ChatContext.Provider
            value={{
                isAnalyzed,
                setIsAnalyzed,
                messages,
                setMessages,
                isLoading,
                setIsLoading,
                selectedProduct,
                setSelectedProduct,
                history,
                handleNewChat,
                handleSelectHistory,
            }}
        >
            {children}
        </ChatContext.Provider>
    );
}

export function useChat() {
    const context = useContext(ChatContext);
    if (context === undefined) {
        throw new Error('useChat must be used within a ChatProvider');
    }
    return context;
}
