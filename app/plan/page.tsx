"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Check, Zap, Star, Crown } from "lucide-react";

const CURRENT_PLAN = "free"; // 현재 사용 중인 플랜

const PLANS = [
    {
        id: "free",
        name: "Free",
        price: "₩0",
        period: "/월",
        description: "무료로 시작하는 리뷰 분석",
        icon: <Star size={22} />,
        iconBg: "bg-gray-100",
        iconColor: "text-gray-500",
        borderColor: "border-gray-400",
        buttonStyle: "bg-gray-500 hover:bg-gray-600 text-white",
        badge: null,
        features: [
            "월 10건 AI 리뷰 분석",
            "1개 제품 분석",
            "챗봇 기본 응답",
        ],
        notIncluded: [
            "심층 인사이트 리포트",
            "무제한 제품 분석",
            "API 액세스",
        ],
    },
    {
        id: "plus",
        name: "Plus",
        price: "₩9,900",
        period: "/월",
        description: "개인 사용자를 위한 핵심 기능",
        icon: <Zap size={22} />,
        iconBg: "bg-blue-100",
        iconColor: "text-blue-600",
        borderColor: "border-blue-200",
        buttonStyle: "bg-blue-600 hover:bg-blue-700 text-white",
        badge: null,
        features: [
            "월 100건 AI 리뷰 분석",
            "3개 제품 동시 분석",
            "챗봇 기본 응답",
            "긍/부정 감성 분포",
            "이메일 지원",
        ],
        notIncluded: [
            "심층 인사이트 리포트",
            "무제한 제품 분석",
            "API 액세스",
        ],
    },
    {
        id: "pro",
        name: "Pro",
        price: "₩29,900",
        period: "/월",
        description: "파워 유저와 소규모 팀을 위한 플랜",
        icon: <Star size={22} />,
        iconBg: "bg-purple-100",
        iconColor: "text-purple-600",
        borderColor: "border-purple-300",
        buttonStyle: "bg-purple-600 hover:bg-purple-700 text-white",
        badge: "인기",
        features: [
            "월 1,000건 AI 리뷰 분석",
            "30개 제품 동시 분석",
            "챗봇 심층 응답 & 요약",
            "심층 인사이트 리포트",
            "경쟁사 비교 분석",
            "채팅 내보내기 (PDF/TXT)",
            "우선 지원 (24시간 이내)",
        ],
        notIncluded: [
            "무제한 제품 분석",
            "API 액세스",
        ],
    },
    {
        id: "ultra",
        name: "Ultra",
        price: "₩79,900",
        period: "/월",
        description: "기업과 대규모 분석에 최적화된 최상위 플랜",
        icon: <Crown size={22} />,
        iconBg: "bg-amber-100",
        iconColor: "text-amber-600",
        borderColor: "border-amber-300",
        buttonStyle:
            "bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white",
        badge: "최고 사양",
        features: [
            "무제한 AI 리뷰 분석",
            "무제한 제품 분석",
            "챗봇 GPT 전용 모델",
            "심층 인사이트 + 트렌드 분석",
            "경쟁사 실시간 모니터링",
            "팀 협업 (최대 10명)",
            "REST API 액세스",
            "전담 매니저 지원",
            "화이트라벨 옵션",
        ],
        notIncluded: [],
    },
];

export default function PlanPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            {/* Header */}
            <header className="border-b border-white/10">
                <div className="max-w-6xl mx-auto px-6 py-4 flex items-center gap-4">
                    <Link
                        href="/mypage"
                        className="flex items-center gap-2 text-gray-400 hover:text-white text-sm font-medium transition-colors"
                    >
                        <ArrowLeft size={16} />
                        마이페이지로
                    </Link>
                </div>
            </header>

            <div className="max-w-6xl mx-auto px-6 py-16">
                {/* Hero */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 bg-white/10 text-blue-300 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
                        <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                        플랜 선택
                    </div>
                    <h1 className="text-5xl font-extrabold text-white mb-4 tracking-tight">
                        지금 시작하세요
                    </h1>
                    <p className="text-lg text-gray-400 max-w-xl mx-auto">
                        필요에 맞는 플랜을 선택해 AI 리뷰 분석의 모든 기능을 경험해 보세요.
                        <br />
                        언제든지 플랜을 변경하거나 취소할 수 있습니다.
                    </p>
                </div>

                {/* Plan Cards */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                    {PLANS.map((plan) => {
                        const isCurrent = plan.id === CURRENT_PLAN;
                        return (
                            <div
                                key={plan.id}
                                className={`relative border ${plan.borderColor} rounded-3xl p-6 flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl ${isCurrent
                                        ? "bg-white/15 backdrop-blur-sm ring-2 ring-white/40"
                                        : "bg-white/5 backdrop-blur-sm hover:bg-white/10"
                                    }`}
                            >
                                {isCurrent && (
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                                        <span className="bg-green-500 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg">
                                            현재 사용 중
                                        </span>
                                    </div>
                                )}
                                {plan.badge && !isCurrent && (
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                                        <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg">
                                            {plan.badge}
                                        </span>
                                    </div>
                                )}

                                {/* Plan Header */}
                                <div className="mb-6">
                                    <div
                                        className={`w-12 h-12 ${plan.iconBg} ${plan.iconColor} rounded-2xl flex items-center justify-center mb-4`}
                                    >
                                        {plan.icon}
                                    </div>
                                    <h2 className="text-2xl font-extrabold text-white mb-1">
                                        {plan.name}
                                    </h2>
                                    <p className="text-sm text-gray-400">{plan.description}</p>
                                </div>

                                {/* Price */}
                                <div className="mb-6">
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-4xl font-extrabold text-white">
                                            {plan.price}
                                        </span>
                                        <span className="text-gray-400 text-sm">
                                            {plan.period}
                                        </span>
                                    </div>
                                </div>

                                {/* CTA */}
                                <button
                                    className={`w-full py-3 rounded-xl font-bold text-sm transition-all mb-6 shadow-lg ${isCurrent
                                            ? "bg-white/20 text-white cursor-default"
                                            : plan.buttonStyle
                                        }`}
                                    disabled={isCurrent}
                                >
                                    {isCurrent ? "현재 플랜" : `${plan.name} 시작하기`}
                                </button>

                                {/* Features */}
                                <div className="flex-1 space-y-3">
                                    {plan.features.map((f, i) => (
                                        <div key={i} className="flex items-start gap-3">
                                            <div className="w-5 h-5 bg-green-500/20 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                                                <Check size={12} className="text-green-400" />
                                            </div>
                                            <span className="text-sm text-gray-300">{f}</span>
                                        </div>
                                    ))}
                                    {plan.notIncluded.map((f, i) => (
                                        <div key={i} className="flex items-start gap-3 opacity-40">
                                            <div className="w-5 h-5 bg-gray-600 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                                                <span className="text-gray-400 text-xs font-bold">–</span>
                                            </div>
                                            <span className="text-sm text-gray-500 line-through">
                                                {f}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>

                <p className="text-center text-gray-500 text-sm mt-10">
                    모든 플랜은 14일 무료 체험을 포함합니다. 카드 등록 없이 시작하세요.
                </p>
            </div>
        </div>
    );
}
