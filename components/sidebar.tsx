"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
    Plus,
    History,
    HelpCircle,
    MessageSquare,
    LayoutGrid,
    ChevronDown,
    ChevronRight,
    User,
    Settings,
    Search,
    Package,
    X,
    Image as ImageIcon
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
    isAnalyzed: boolean;
    onNewChat: () => void;
    selectedProduct: string;
    onSelectProduct: (name: string) => void;
    history: any[];
    onSelectHistory: (sessionId: string) => void;
}

export default function Sidebar({
    onNewChat,
    history,
    onSelectHistory,
}: SidebarProps) {
    const [historyOpen, setHistoryOpen] = useState(false);
    const [settingsOpen, setSettingsOpen] = useState(false);
    const [helpOpen, setHelpOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const router = useRouter();

    const filteredHistory = history.filter(
        (s) => !searchQuery || (s.title || "").toLowerCase().includes(searchQuery.toLowerCase())
    );

    const renderHistory = () => {
        return (
            <div className="ml-6 space-y-1 mt-1">
                {history.length > 0 ? (
                    history.map((session) => (
                        <div
                            key={session.id}
                            onClick={() => onSelectHistory(session.id)}
                            className="px-3 py-1.5 text-xs text-gray-500 bg-gray-50/50 rounded-lg truncate cursor-pointer hover:bg-blue-50 hover:text-blue-600 transition-colors"
                        >
                            {session.title}
                        </div>
                    ))
                ) : (
                    <div className="px-3 py-1.5 text-xs text-gray-400">
                        대화 기록이 없습니다.
                    </div>
                )}
            </div>
        );
    };

    return (
        <>
            <aside className="w-64 h-full bg-white border-r border-gray-200 flex flex-col p-4 shadow-sm z-20">
                {/* Logo - click to go to welcome screen */}
                <Link href="/" className="flex items-center gap-2 mb-8 px-2 mt-2 group cursor-pointer block">
                    <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white group-hover:scale-105 transition-transform shadow-md shadow-blue-200">
                        <MessageSquare size={18} fill="currentColor" />
                    </div>
                    <div>
                        <h1 className="font-bold text-gray-900 leading-none group-hover:text-blue-600 transition-colors">ReviewBot</h1>
                        <p className="text-[10px] text-blue-400 mt-1 uppercase tracking-wider font-bold">
                            Analysis AI
                        </p>
                    </div>
                </Link>

                {/* Navigation */}
                <div className="flex-1 overflow-y-auto no-scrollbar flex flex-col gap-6">

                    {/* Group 1: Chatting */}
                    <div className="space-y-1">
                        <p className="px-3 text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mb-2">Chat</p>
                        <AnimatedNavItem
                            icon={<Plus size={18} />}
                            label="새 채팅"
                            onClick={onNewChat}
                            isPrimary
                        />
                        {/* Search toggle */}
                        <AnimatedNavItem
                            icon={<Search size={18} />}
                            label="채팅 검색"
                            onClick={() => setSearchOpen(!searchOpen)}
                            rightIcon={searchOpen ? <ChevronDown size={14} className="text-gray-400" /> : <ChevronRight size={14} className="text-gray-400" />}
                        />
                        {searchOpen && (
                            <div className="ml-6 mt-1 mb-1">
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        placeholder="채팅 검색..."
                                        className="w-full text-xs border border-gray-200 rounded-lg px-3 py-2 pr-8 focus:outline-none focus:border-blue-300 focus:ring-2 focus:ring-blue-50 bg-gray-50"
                                        autoFocus
                                    />
                                    {searchQuery && (
                                        <button
                                            onClick={() => setSearchQuery("")}
                                            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                        >
                                            <X size={12} />
                                        </button>
                                    )}
                                </div>
                                {searchQuery && (
                                    <div className="mt-1 space-y-1">
                                        {filteredHistory.length > 0 ? (
                                            filteredHistory.map((session) => (
                                                <div
                                                    key={session.id}
                                                    onClick={() => onSelectHistory(session.id)}
                                                    className="px-3 py-1.5 text-xs text-gray-600 bg-blue-50 rounded-lg truncate cursor-pointer hover:bg-blue-100 hover:text-blue-700 transition-colors"
                                                >
                                                    {session.title}
                                                </div>
                                            ))
                                        ) : (
                                            <div className="px-3 py-1.5 text-xs text-gray-400">검색 결과가 없습니다.</div>
                                        )}
                                    </div>
                                )}
                            </div>
                        )}
                        <AnimatedNavItem
                            icon={<History size={18} />}
                            label="히스토리"
                            onClick={() => setHistoryOpen(!historyOpen)}
                            rightIcon={historyOpen ? <ChevronDown size={14} className="text-gray-400" /> : <ChevronRight size={14} className="text-gray-400" />}
                        />
                        {historyOpen && renderHistory()}
                    </div>

                    {/* Group 2: Services */}
                    <div className="space-y-1">
                        <p className="px-3 text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mb-2">Service</p>
                        <AnimatedNavItem
                            icon={<LayoutGrid size={18} />}
                            label="제품 소개"
                            onClick={() => router.push("/intro")}
                        />
                        <AnimatedNavItem
                            icon={<Package size={18} />}
                            label="새 제품 등록"
                            onClick={() => router.push("/new-product")}
                        />
                        <AnimatedNavItem
                            icon={<User size={18} />}
                            label="마이페이지"
                            onClick={() => router.push("/mypage")}
                        />
                    </div>

                    {/* Group 3: Help */}
                    <div className="space-y-1 mt-auto">
                        <AnimatedNavItem
                            icon={<HelpCircle size={18} />}
                            label="도움말"
                            onClick={() => setHelpOpen(true)}
                        />
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer group">
                        <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 overflow-hidden ring-2 ring-transparent group-hover:ring-orange-200 transition-all">
                            <User size={20} />
                        </div>
                        <div className="flex-1 min-w-0" onClick={() => router.push("/mypage")}>
                            <p className="text-sm font-bold text-gray-900 truncate">
                                Alex Morgan
                            </p>
                            <p className="text-xs text-blue-600 font-semibold truncate hover:underline">Free Plan</p>
                        </div>
                        <div className="relative">
                            <button
                                onClick={(e) => { e.stopPropagation(); setSettingsOpen(!settingsOpen); }}
                                className="text-gray-400 hover:text-gray-600 transition-colors p-2 rounded-lg hover:bg-gray-200"
                            >
                                <Settings size={18} />
                            </button>

                            {settingsOpen && (
                                <>
                                    <div
                                        className="fixed inset-0 z-40"
                                        onClick={(e) => { e.stopPropagation(); setSettingsOpen(false); }}
                                    />
                                    <div className="absolute bottom-12 left-0 w-48 bg-white border border-gray-200 rounded-xl shadow-xl py-2 z-50">
                                        <Link href="/plan" onClick={() => setSettingsOpen(false)} className="block px-4 py-2 text-sm text-blue-600 font-semibold hover:bg-blue-50 transition-colors">플랜 업그레이드</Link>
                                        <button onClick={() => { setSettingsOpen(false); router.push("/mypage"); }} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">마이페이지</button>
                                        <button onClick={() => { setSettingsOpen(false); setHelpOpen(true); }} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">도움말</button>
                                        <div className="h-px bg-gray-100 my-1" />
                                        <button onClick={() => setSettingsOpen(false)} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors">로그아웃</button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </aside>

            {/* Help Modal */}
            {helpOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setHelpOpen(false)} />
                    <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl relative z-10 overflow-hidden flex flex-col">
                        <div className="h-40 bg-gradient-to-br from-blue-600 to-indigo-700 p-8 flex items-end">
                            <div>
                                <h2 className="text-3xl font-extrabold text-white">ReviewBot 가이드</h2>
                                <p className="text-blue-100 mt-2">그림으로 쉽게 배우는 AI 리뷰 분석 활용법</p>
                            </div>
                            <button onClick={() => setHelpOpen(false)} className="absolute top-6 right-6 w-8 h-8 flex items-center justify-center bg-white/20 hover:bg-white/40 rounded-full text-white transition-colors">
                                <X size={18} />
                            </button>
                        </div>
                        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6 overflow-y-auto max-h-[60vh]">
                            {/* Card 1 */}
                            <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100 text-center flex flex-col items-center">
                                <div className="w-32 h-24 bg-white shadow-sm border border-gray-200 rounded-xl mb-4 flex items-center justify-center text-blue-500">
                                    <LayoutGrid size={40} className="opacity-50" />
                                </div>
                                <h3 className="font-bold text-gray-900 mb-2">1. 제품 찾기</h3>
                                <p className="text-sm text-gray-500 text-center">제품 소개 메뉴에서 관심 있는 제품을 먼저 선택하세요.</p>
                            </div>
                            {/* Card 2 */}
                            <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100 text-center flex flex-col items-center">
                                <div className="w-32 h-24 bg-white shadow-sm border border-gray-200 rounded-xl mb-4 flex items-center justify-center text-indigo-500 relative">
                                    <MessageSquare size={40} className="opacity-50" />
                                    <div className="absolute -bottom-2 -right-2 bg-green-500 text-white text-[10px] px-2 py-0.5 rounded-full font-bold">AI</div>
                                </div>
                                <h3 className="font-bold text-gray-900 mb-2">2. 챗봇 질문하기</h3>
                                <p className="text-sm text-gray-500 text-center">선택한 제품의 리뷰 데이터를 바탕으로 구체적인 질문을 입력하세요.</p>
                            </div>
                            {/* Card 3 */}
                            <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100 text-center flex flex-col items-center">
                                <div className="w-32 h-24 bg-white shadow-sm border border-gray-200 rounded-xl mb-4 flex gap-2 items-center justify-center text-purple-500">
                                    <ImageIcon size={32} className="opacity-50" />
                                    <ImageIcon size={32} className="opacity-50 hidden md:block" />
                                </div>
                                <h3 className="font-bold text-gray-900 mb-2">3. 이미지 업로드</h3>
                                <p className="text-sm text-gray-500 text-center">사진을 드래그해서 올려 제품 사진이나 리뷰 캡처도 분석해 보세요.</p>
                            </div>
                            {/* Card 4 */}
                            <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100 text-center flex flex-col items-center">
                                <div className="w-32 h-24 bg-white shadow-sm border border-gray-200 rounded-xl mb-4 flex items-center justify-center text-red-500">
                                    <Package size={40} className="opacity-50" />
                                </div>
                                <h3 className="font-bold text-gray-900 mb-2">4. 내 제품 관리</h3>
                                <p className="text-sm text-gray-500 text-center">새 제품 등록 메뉴를 이용해 나만의 관심 상품을 등록해보세요.</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

function AnimatedNavItem({
    icon,
    label,
    onClick,
    rightIcon,
    isPrimary
}: {
    icon: React.ReactNode;
    label: string;
    onClick?: () => void;
    rightIcon?: React.ReactNode;
    isPrimary?: boolean;
}) {
    return (
        <button
            onClick={onClick}
            className={cn(
                "group relative w-full flex items-center justify-between px-3 py-2.5 text-sm font-medium rounded-xl transition-all overflow-hidden border",
                isPrimary
                    ? "bg-blue-600 text-white border-blue-500 shadow-md hover:shadow-blue-200"
                    : "bg-transparent text-gray-700 border-transparent hover:border-blue-100 hover:text-blue-700"
            )}
        >
            {/* Animated Gradient Background on Hover */}
            {!isPrimary && (
                <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                        background: 'linear-gradient(120deg, #eff6ff, #e0e7ff, #eff6ff)',
                        backgroundSize: '200% auto',
                        animation: 'gradientMove 3s linear infinite'
                    }}
                />
            )}

            <div className="relative z-10 flex items-center gap-3 w-full">
                <div className={cn("transition-transform group-hover:scale-110", isPrimary ? "text-white" : "text-gray-400 group-hover:text-blue-600")}>
                    {icon}
                </div>
                <span className="flex-1 text-left font-semibold tracking-tight">{label}</span>
                {rightIcon && <div className="shrink-0">{rightIcon}</div>}
            </div>

            {/* Inline keyframes for animation if not present in globals.css */}
            <style jsx>{`
                @keyframes gradientMove {
                    0% { background-position: 0% center; }
                    100% { background-position: 200% center; }
                }
            `}</style>
        </button>
    );
}
