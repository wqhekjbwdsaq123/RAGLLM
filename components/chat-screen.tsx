"use client"

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
    Download,
    User,
    Bot,
    ChevronDown,
    ChevronUp,
    FileText,
    ThumbsUp,
    ThumbsDown,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { PRODUCTS } from '@/lib/products';

interface Message {
    role: 'user' | 'assistant';
    content: string;
    results?: any[];
}

interface ChatScreenProps {
    messages: Message[];
    isLoading: boolean;
    selectedProduct: string;
    onSelectProduct: (name: string) => void;
}

// 현재 사용자 이름 (실제로는 auth에서 가져와야 함)
const CURRENT_USER_NAME = "Alex Morgan";

export default function ChatScreen({ messages, isLoading, selectedProduct, onSelectProduct }: ChatScreenProps) {
    const router = useRouter();
    const [productDropOpen, setProductDropOpen] = useState(false);

    const handleDownload = () => {
        const text = messages
            .map((m) => `[${m.role === 'user' ? '나' : 'ReviewBot'}] ${m.content}`)
            .join('\n\n');
        const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `chat_${new Date().toISOString().slice(0, 10)}.txt`;
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div className="flex-1 min-h-0 flex flex-col bg-[#FBFCFE]">
            {/* Header */}
            <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 shrink-0">
                <div className="flex items-center gap-3 relative">
                    <div>
                        <button
                            onClick={() => setProductDropOpen((p) => !p)}
                            className="flex items-center gap-2 px-3 py-1.5 border border-gray-200 rounded-lg text-sm bg-gray-50 hover:bg-gray-100 transition-colors"
                        >
                            <span className="truncate text-gray-700 font-bold max-w-[200px]">
                                {selectedProduct || "제품을 선택하세요"}
                            </span>
                            <ChevronDown size={14} className="text-gray-400 shrink-0" />
                        </button>
                        {productDropOpen && (
                            <div className="absolute top-12 left-0 mt-1 w-56 border border-gray-200 rounded-lg bg-white shadow-xl overflow-hidden z-20">
                                <button
                                    onClick={() => {
                                        onSelectProduct("");
                                        setProductDropOpen(false);
                                    }}
                                    className="w-full text-left px-4 py-2 text-xs text-gray-500 hover:bg-gray-50 border-b border-gray-100"
                                >
                                    전체 제품 검색
                                </button>
                                <div className="max-h-64 overflow-y-auto">
                                    {PRODUCTS.map((p) => (
                                        <button
                                            key={p.id}
                                            onClick={() => {
                                                onSelectProduct(p.name);
                                                setProductDropOpen(false);
                                            }}
                                            className={cn(
                                                "w-full text-left px-4 py-3 text-xs hover:bg-blue-50 transition-colors",
                                                selectedProduct === p.name
                                                    ? "text-blue-600 font-bold bg-blue-50"
                                                    : "text-gray-700 font-medium"
                                            )}
                                        >
                                            {p.name}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                {/* Download button - right aligned */}
                <button
                    onClick={handleDownload}
                    title="채팅 내보내기"
                    className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                >
                    <Download size={18} />
                </button>
            </header>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-8 no-scrollbar min-h-0">
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
                                    {msg.role === 'user' ? CURRENT_USER_NAME : 'ReviewBot'}
                                </span>
                                <span className="text-[10px] text-gray-400">
                                    {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                            </div>

                            <div className={cn(
                                "rounded-2xl shadow-sm text-sm leading-relaxed",
                                msg.role === 'user'
                                    ? "bg-blue-600 text-white rounded-tr-none max-w-xl ml-auto px-4 py-2.5"
                                    : "bg-white border border-gray-100 rounded-tl-none text-gray-700 max-w-2xl p-5"
                            )}>
                                {msg.content}

                                {msg.results && msg.results.length > 0 && (
                                    <References results={msg.results} />
                                )}
                            </div>

                            {/* Feedback buttons for assistant */}
                            {msg.role === 'assistant' && (
                                <FeedbackButtons />
                            )}
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
                                <span className="text-sm font-bold text-gray-900">ReviewBot</span>
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

function FeedbackButtons() {
    const [feedback, setFeedback] = useState<'up' | 'down' | null>(null);
    return (
        <div className="flex items-center gap-2 mt-1 ml-1">
            <button
                onClick={() => setFeedback('up')}
                className={cn(
                    "flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-lg border transition-all",
                    feedback === 'up'
                        ? "bg-green-50 border-green-300 text-green-600"
                        : "border-gray-200 text-gray-400 hover:border-green-300 hover:text-green-600"
                )}
            >
                <ThumbsUp size={12} />
                도움됐어요
            </button>
            <button
                onClick={() => setFeedback('down')}
                className={cn(
                    "flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-lg border transition-all",
                    feedback === 'down'
                        ? "bg-red-50 border-red-300 text-red-500"
                        : "border-gray-200 text-gray-400 hover:border-red-300 hover:text-red-500"
                )}
            >
                <ThumbsDown size={12} />
                도움 안 됐어요
            </button>
        </div>
    );
}

function References({ results }: { results: any[] }) {
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();

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
                            <div
                                key={i}
                                className="text-xs text-gray-600 border-l-2 border-blue-200 pl-3 py-1 cursor-pointer hover:border-blue-400 hover:bg-blue-50/50 rounded-r-lg transition-colors group"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    router.push(`/product/wireless-earbuds/reviews#review-${i}`);
                                }}
                            >
                                <div className="font-bold text-gray-800 mb-1 group-hover:text-blue-600 transition-colors">
                                    {res.metadata?.author || res.metadata?.title || '익명'}
                                </div>
                                <p className="italic">"{res.content}"</p>
                                {res.metadata?.author && (
                                    <span className="text-[10px] text-gray-400 mt-1 block">
                                        {res.metadata.date && `- ${res.metadata.date}`}
                                    </span>
                                )}
                                <span className="text-[10px] text-blue-400 mt-1 block group-hover:underline">
                                    전체 리뷰 보기 →
                                </span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
