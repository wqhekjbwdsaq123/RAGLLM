"use client"

import React from 'react';
import {
    Plus,
    History,
    Settings,
    HelpCircle,
    LayoutDashboard,
    MessageSquare,
    BarChart3,
    ChevronDown,
    User
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
    isAnalyzed: boolean;
    onNewChat: () => void;
}

export default function Sidebar({ isAnalyzed, onNewChat }: SidebarProps) {
    return (
        <aside className="w-64 h-full bg-white border-r border-gray-200 flex flex-col p-4">
            {/* Logo */}
            <div className="flex items-center gap-2 mb-8 px-2 mt-2">
                <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                    <MessageSquare size={18} fill="currentColor" />
                </div>
                <div>
                    <h1 className="font-bold text-gray-900 leading-none">
                        {isAnalyzed ? "AI Analyst" : "ReviewBot"}
                    </h1>
                    <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-wider font-semibold">
                        {isAnalyzed ? "Product Reviews" : "Analysis AI"}
                    </p>
                </div>
            </div>

            {/* Navigation */}
            <div className="flex-1 space-y-6 overflow-y-auto no-scrollbar">
                {!isAnalyzed ? (
                    /* Welcome Mode Sidebar */
                    <div className="space-y-1">
                        <button
                            onClick={onNewChat}
                            className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg bg-blue-50 text-blue-600 mb-6"
                        >
                            <Plus size={18} />
                            새 채팅 시작
                        </button>
                        <NavItem icon={<History size={18} />} label="히스토리" />
                        <NavItem icon={<Settings size={18} />} label="설정" />
                        <NavItem icon={<HelpCircle size={18} />} label="도움말" />
                    </div>
                ) : (
                    /* Analysis Mode Sidebar */
                    <>
                        <div className="space-y-1">
                            <NavItem icon={<LayoutDashboard size={18} />} label="대시보드" />
                            <NavItem icon={<MessageSquare size={18} />} label="채팅 분석" active />
                            <NavItem icon={<BarChart3 size={18} />} label="인사이트" />
                        </div>

                        <button
                            onClick={onNewChat}
                            className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg bg-blue-600 text-white"
                        >
                            <Plus size={18} />
                            새 채팅
                        </button>

                        <div>
                            <p className="px-3 text-[10px] font-bold text-blue-600 uppercase mb-2">제품 선택</p>
                            <div className="px-3">
                                <div className="w-full flex items-center justify-between px-3 py-2 border border-gray-200 rounded-lg text-sm bg-gray-50 cursor-pointer">
                                    <span className="truncate">Premium Wireless Earbuds Pro</span>
                                    <ChevronDown size={14} className="text-gray-400" />
                                </div>
                            </div>
                        </div>

                        <div>
                            <p className="px-3 text-[10px] font-bold text-gray-400 uppercase mb-2">최근 대화</p>
                            <div className="space-y-1">
                                <RecentItem title="노이즈 캔슬링 성능" time="2분 전" />
                                <RecentItem title="배터리 수명 관련" time="1시간 전" />
                                <RecentItem title="경쟁사 비교 분석" time="어제" />
                            </div>
                        </div>
                    </>
                )}
            </div>

            {/* Footer Profile */}
            <div className="mt-auto pt-4 border-t border-gray-100">
                <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                    <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 overflow-hidden">
                        {/* Placeholder for local avatar image if needed, for now use Icon or generic emoji */}
                        <User size={20} />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-900 truncate">Alex Morgan</p>
                        <p className="text-xs text-gray-500 truncate">{isAnalyzed ? "Product Manager" : "Free Plan"}</p>
                    </div>
                    {isAnalyzed && <Settings size={14} className="text-gray-400" />}
                </div>

                {!isAnalyzed && (
                    <button className="w-full mt-3 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                        플랜 업그레이드
                    </button>
                )}
            </div>
        </aside>
    );
}

function NavItem({ icon, label, active }: { icon: React.ReactNode, label: string, active?: boolean }) {
    return (
        <div className={cn(
            "flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors cursor-pointer",
            active ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
        )}>
            {icon}
            {label}
        </div>
    );
}

function RecentItem({ title, time }: { title: string, time: string }) {
    return (
        <div className="px-3 py-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
            <div className="flex items-center gap-2">
                <MessageSquare size={14} className="text-gray-400" />
                <p className="text-xs font-medium text-gray-700 truncate">{title}</p>
            </div>
            <p className="text-[10px] text-gray-400 mt-1 ml-5">{time}</p>
        </div>
    );
}
