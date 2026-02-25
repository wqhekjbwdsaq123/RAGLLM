"use client"

import React, { useState } from 'react';
import {
    Download,
    ListFilter,
    Headset,
    User,
    Bot,
    ChevronDown,
    ChevronUp,
    CheckCircle2,
    FileText
} from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface Message {
    role: 'user' | 'assistant';
    content: string;
    results?: any[];
}

interface ChatScreenProps {
    messages: Message[];
    isLoading: boolean;
}

export default function ChatScreen({ messages, isLoading }: ChatScreenProps) {
    return (
        <div className="flex-1 flex flex-col h-full bg-[#FBFCFE]">
            {/* Header */}
            <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 shrink-0">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                        <Headset size={22} />
                    </div>
                    <div>
                        <h2 className="text-sm font-bold text-gray-900 leading-tight">Review Chatbot Analyst</h2>
                        <p className="text-[10px] text-gray-400 font-medium tracking-wide">PINE CONE RAG SYSTEM ACTIVE</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                        <Download size={18} />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                        <ListFilter size={18} />
                    </button>
                </div>
            </header>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-8 no-scrollbar">
                {messages.length === 0 && (
                    <div className="flex flex-col items-center justify-center h-full text-gray-400 space-y-2 opacity-60">
                        <Bot size={48} />
                        <p className="text-sm font-medium">제품에 대해 궁금한 점을 질문해 주세요.</p>
                    </div>
                )}

                {messages.map((msg, idx) => (
                    <div key={idx} className={cn("flex gap-4", msg.role === 'user' ? "justify-end" : "max-w-4xl pb-4")}>
                        {msg.role === 'assistant' && (
                            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white shrink-0">
                                <Bot size={18} />
                            </div>
                        )}

                        <div className={cn("space-y-1", msg.role === 'user' ? "text-right" : "flex-1")}>
                            <div className={cn("flex items-center gap-2", msg.role === 'user' && "justify-end")}>
                                <span className="text-sm font-bold text-gray-900">
                                    {msg.role === 'user' ? 'You' : 'AI Analyst'}
                                </span>
                                <span className="text-[10px] text-gray-400">
                                    {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                            </div>

                            <div className={cn(
                                "p-5 rounded-2xl shadow-sm text-sm leading-relaxed",
                                msg.role === 'user'
                                    ? "bg-blue-600 text-white rounded-tr-none max-w-xl ml-auto"
                                    : "bg-white border border-gray-100 rounded-tl-none text-gray-700 max-w-2xl"
                            )}>
                                {msg.content}

                                {msg.results && msg.results.length > 0 && (
                                    <References results={msg.results} />
                                )}
                            </div>
                        </div>

                        {msg.role === 'user' && (
                            <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 shrink-0">
                                <User size={18} />
                            </div>
                        )}
                    </div>
                ))}

                {isLoading && (
                    <div className="flex gap-4 max-w-4xl">
                        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white shrink-0 animate-pulse">
                            <Bot size={18} />
                        </div>
                        <div className="space-y-1">
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-bold text-gray-900">AI Analyst</span>
                            </div>
                            <div className="bg-white border border-gray-100 p-4 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-2">
                                <div className="flex gap-1">
                                    <span className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                    <span className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                    <span className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce"></span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

function References({ results }: { results: any[] }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="mt-4">
            <div
                onClick={() => setIsOpen(!isOpen)}
                className="border border-gray-100 rounded-xl overflow-hidden hover:border-blue-200 transition-colors cursor-pointer"
            >
                <div className="flex items-center justify-between p-3 bg-gray-50/50">
                    <div className="flex items-center gap-2 text-blue-600 font-bold text-xs uppercase tracking-tight">
                        <FileText size={14} />
                        참조된 리뷰 ({results.length})
                    </div>
                    {isOpen ? <ChevronUp size={14} className="text-gray-400" /> : <ChevronDown size={14} className="text-gray-400" />}
                </div>

                {isOpen && (
                    <div className="p-3 bg-white border-t border-gray-100 space-y-3">
                        {results.map((res, i) => (
                            <div key={i} className="text-xs text-gray-600 border-l-2 border-blue-200 pl-3 py-1">
                                <div className="font-bold text-gray-800 mb-1">
                                    {res.metadata?.title || '리뷰 발췌'}
                                </div>
                                <p className="italic">"{res.content}"</p>
                                {res.metadata?.author && (
                                    <span className="text-[10px] text-gray-400 mt-1 block">
                                        - {res.metadata.author} ({res.metadata.date})
                                    </span>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
