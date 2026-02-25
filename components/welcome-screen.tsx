"use client"

import React from 'react';
import { BarChart2, Battery, PhoneCall, ArrowRightLeft, LayoutGrid } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const SUGGESTIONS = [
    {
        icon: <BarChart2 className="text-blue-500" size={24} />,
        title: "피트니스 호환성",
        description: "\"운동할 때 이 헤드셋을 사용해도 괜찮을까요?\"",
        question: "운동할 때 이 헤드셋을 사용해도 괜찮을까요?",
        bgColor: "bg-blue-50"
    },
    {
        icon: <Battery className="text-green-500" size={24} />,
        title: "배터리 수명",
        description: "\"배터리가 실제로 24시간 동안 지속되나요?\"",
        question: "배터리가 실제로 24시간 동안 지속되나요?",
        bgColor: "bg-green-50"
    },
    {
        icon: <PhoneCall className="text-purple-500" size={24} />,
        title: "통화 품질",
        description: "\"Zoom 회의용으로 마이크 성능은 어떤가요?\"",
        question: "Zoom 회의용으로 마이크 성능은 어떤가요?",
        bgColor: "bg-purple-50"
    },
    {
        icon: <ArrowRightLeft className="text-orange-500" size={24} />,
        title: "제품 비교",
        description: "\"Sony XM5와 Bose QC45를 비교해줘\"",
        question: "Sony XM5와 Bose QC45를 비교해줘",
        bgColor: "bg-orange-50"
    }
];

interface WelcomeScreenProps {
    onSuggest?: (question: string) => void;
}

export default function WelcomeScreen({ onSuggest }: WelcomeScreenProps) {
    return (
        <div className="flex-1 flex flex-col items-center relative overflow-hidden h-full">

            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center max-w-4xl mx-auto w-full">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-8"
                >
                    {/* Gradient description text */}
                    <div className="relative mb-8">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-500/10 to-pink-500/10 rounded-3xl blur-xl" />
                        <div className="relative bg-gradient-to-br from-white/80 to-blue-50/80 backdrop-blur-sm border border-blue-100/60 rounded-3xl px-8 py-6 shadow-lg">
                            <motion.p
                                className="text-2xl md:text-3xl font-extrabold leading-tight tracking-tight"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.7, delay: 0.1 }}
                            >
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500"
                                    style={{ backgroundSize: "200% auto" }}>
                                    수천 개의 리뷰를 몇 초 만에 읽어드립니다.
                                </span>
                            </motion.p>
                            <motion.p
                                className="text-lg text-gray-500 mt-2 leading-relaxed"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.7, delay: 0.2 }}
                            >
                                장단점, 상세 비교, 또는 특정 기능에 대해 무엇이든 물어보세요.
                            </motion.p>
                        </div>
                    </div>

                    <Link href="/intro">
                        <button className="px-6 py-3 rounded-xl font-semibold shadow-lg transition-all flex items-center gap-2 mx-auto text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 hover:shadow-blue-200 hover:scale-105">
                            <LayoutGrid size={18} />
                            제품 둘러보기
                        </button>
                    </Link>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mt-4">
                    {SUGGESTIONS.map((item, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3, delay: idx * 0.1 }}
                            onClick={() => onSuggest?.(item.question)}
                            className="flex items-start gap-4 p-5 bg-white border border-gray-100 rounded-2xl text-left hover:border-blue-200 hover:shadow-md transition-all cursor-pointer group"
                        >
                            <div className={`w-12 h-12 rounded-xl ${item.bgColor} flex items-center justify-center shrink-0`}>
                                {item.icon}
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                                    {item.title}
                                </h3>
                                <p className="text-sm text-gray-500 leading-snug">
                                    {item.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
