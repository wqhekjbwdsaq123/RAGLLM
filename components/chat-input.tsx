"use client";

import React, { useState, useRef } from "react";
import { Search, Plus, X, Image as ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatInputProps {
    isAnalyzed: boolean;
    onSend: (message: string) => void;
    defaultValue?: string;
}

export default function ChatInput({
    isAnalyzed,
    onSend,
    defaultValue,
}: ChatInputProps) {
    const [input, setInput] = useState(defaultValue || "");
    const [attachedImage, setAttachedImage] = useState<string | null>(null);
    const [showAttachMenu, setShowAttachMenu] = useState(false);
    const fileRef = useRef<HTMLInputElement>(null);

    React.useEffect(() => {
        if (defaultValue) {
            setInput(defaultValue);
        }
    }, [defaultValue]);

    const handleSubmit = (e?: React.FormEvent) => {
        e?.preventDefault();
        if (input.trim()) {
            onSend(input);
            setInput("");
            setAttachedImage(null);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = () => setAttachedImage(reader.result as string);
        reader.readAsDataURL(file);
        setShowAttachMenu(false);
    };

    return (
        <div className="w-full max-w-4xl mx-auto p-4 mb-4">
            {/* Image preview */}
            {attachedImage && (
                <div className="mb-2 flex items-center gap-2">
                    <div className="relative">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={attachedImage}
                            alt="첨부 이미지"
                            className="h-16 w-16 object-cover rounded-xl border border-gray-200"
                        />
                        <button
                            onClick={() => setAttachedImage(null)}
                            className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-gray-700 text-white rounded-full flex items-center justify-center hover:bg-red-500 transition-colors"
                        >
                            <X size={10} />
                        </button>
                    </div>
                    <span className="text-xs text-gray-400">이미지 첨부됨</span>
                </div>
            )}

            <form
                onSubmit={handleSubmit}
                className={cn(
                    "relative flex items-center bg-white border border-gray-200 rounded-2xl shadow-sm focus-within:border-blue-300 focus-within:ring-4 focus-within:ring-blue-50 transition-all",
                    isAnalyzed ? "p-2 pl-3" : "p-3 pl-6"
                )}
            >
                {/* + Attach button */}
                <div className="relative">
                    <button
                        type="button"
                        onClick={() => setShowAttachMenu((p) => !p)}
                        className="p-2 text-gray-400 hover:text-blue-600 transition-colors rounded-lg hover:bg-blue-50"
                    >
                        <Plus size={20} />
                    </button>
                    {showAttachMenu && (
                        <div className="absolute bottom-12 left-0 bg-white border border-gray-200 rounded-xl shadow-xl p-1 min-w-36 z-10">
                            <button
                                type="button"
                                onClick={() => fileRef.current?.click()}
                                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 rounded-lg transition-colors"
                            >
                                <ImageIcon size={15} className="text-blue-500" />
                                이미지 첨부
                            </button>
                        </div>
                    )}
                    <input
                        ref={fileRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleFileChange}
                    />
                </div>

                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                    placeholder={
                        isAnalyzed
                            ? "감정, 기능 또는 특정 키워드에 대해 질문하세요..."
                            : "제품 링크를 붙여넣거나 질문을 입력하세요..."
                    }
                    className="flex-1 bg-transparent border-none focus:ring-0 text-gray-700 placeholder-gray-400 text-sm md:text-base py-2 px-2 ml-1"
                />

                <div className="flex items-center gap-1 md:gap-2 pr-1">
                    <button
                        type="submit"
                        disabled={!input.trim()}
                        className="p-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:hover:bg-blue-600 transition-all shadow-md shadow-blue-100"
                    >
                        <Search size={isAnalyzed ? 18 : 20} />
                    </button>
                </div>
            </form>

            <p className="text-center text-[10px] text-gray-400 mt-2">
                {isAnalyzed
                    ? "AI는 실수를 할 수 있습니다. 권장 리뷰의 중요한 정보를 확인하세요."
                    : "ReviewBot은 사람, 장소 또는 사실에 대해 부정확한 정보를 생성할 수 있습니다."}
            </p>
        </div>
    );
}
