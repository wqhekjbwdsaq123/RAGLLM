"use client"

import React, { useState } from 'react';
import { Send, Image as ImageIcon, Mic, PlusCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ChatInputProps {
    isAnalyzed: boolean;
    onSend: (message: string) => void;
}

export default function ChatInput({ isAnalyzed, onSend }: ChatInputProps) {
    const [input, setInput] = useState('');

    const handleSubmit = (e?: React.FormEvent) => {
        e?.preventDefault();
        if (input.trim()) {
            onSend(input);
            setInput('');
        }
    };

    return (
        <div className="w-full max-w-4xl mx-auto p-4 mb-4">
            <form
                onSubmit={handleSubmit}
                className={cn(
                    "relative flex items-center bg-white border border-gray-200 rounded-2xl shadow-sm focus-within:border-blue-300 focus-within:ring-4 focus-within:ring-blue-50 transition-all",
                    isAnalyzed ? "p-2 pl-4" : "p-3 pl-6"
                )}
            >
                {isAnalyzed && (
                    <button type="button" className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                        <PlusCircle size={20} />
                    </button>
                )}

                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={isAnalyzed ? "감정, 기능 또는 특정 키워드에 대해 질문하세요..." : "제품 링크를 붙여넣거나 질문을 입력하세요..."}
                    className="flex-1 bg-transparent border-none focus:ring-0 text-gray-700 placeholder-gray-400 text-sm md:text-base py-2"
                />

                <div className="flex items-center gap-1 md:gap-2 pr-1">
                    {!isAnalyzed ? (
                        <>
                            <button type="button" className="p-2 text-gray-400 hover:bg-gray-50 rounded-lg transition-colors">
                                <ImageIcon size={20} />
                            </button>
                            <button
                                type="submit"
                                disabled={!input.trim()}
                                className="p-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:hover:bg-blue-600 transition-all shadow-md shadow-blue-100"
                            >
                                <Send size={20} />
                            </button>
                        </>
                    ) : (
                        <button
                            type="submit"
                            disabled={!input.trim()}
                            className="p-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 transition-all"
                        >
                            <Send size={18} />
                        </button>
                    )}
                </div>
            </form>

            <p className="text-center text-[10px] text-gray-400 mt-2">
                {isAnalyzed ?
                    "AI는 실수를 할 수 있습니다. 권장 리뷰의 중요한 정보를 확인하세요." :
                    "ReviewBot은 사람, 장소 또는 사실에 대해 부정확한 정보를 생성할 수 있습니다."}
            </p>
        </div>
    );
}
