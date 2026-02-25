"use client"

import React, { useState } from 'react';
import { BarChart2, Battery, PhoneCall, ArrowRightLeft, Bell } from 'lucide-react';
import { motion } from 'framer-motion';

const SUGGESTIONS = [
    {
        icon: <BarChart2 className="text-blue-500" size={24} />,
        title: "피트니스 호환성",
        description: "\"운동할 때 이 헤드셋을 사용해도 괜찮을까요?\"",
        bgColor: "bg-blue-50"
    },
    {
        icon: <Battery className="text-green-500" size={24} />,
        title: "배터리 수명",
        description: "\"배터리가 실제로 24시간 동안 지속되나요?\"",
        bgColor: "bg-green-50"
    },
    {
        icon: <PhoneCall className="text-purple-500" size={24} />,
        title: "통화 품질",
        description: "\"Zoom 회의용으로 마이크 성능은 어떤가요?\"",
        bgColor: "bg-purple-50"
    },
    {
        icon: <ArrowRightLeft className="text-orange-500" size={24} />,
        title: "제품 비교",
        description: "\"Sony XM5와 Bose QC45를 비교해줘\"",
        bgColor: "bg-orange-50"
    }
];

export default function WelcomeScreen() {
    const [isIndexing, setIsIndexing] = useState(false);
    const [indexStatus, setIndexStatus] = useState<string | null>(null);

    const handleIndexing = async () => {
        setIsIndexing(true);
        setIndexStatus('인덱싱 중...');
        try {
            const res = await fetch('/api/index-data', { method: 'POST' });
            const data = await res.json();
            if (res.ok) {
                setIndexStatus(`인덱싱 완료! (${data.totalReviews}개 리뷰)`);
            } else {
                setIndexStatus(`에러: ${data.error}`);
            }
        } catch (error) {
            setIndexStatus('인덱싱 실패');
        } finally {
            setIsIndexing(false);
        }
    };

    return (
        <div className="flex-1 flex flex-col items-center relative overflow-hidden h-full">
            {/* Top Header for Welcome */}
            <div className="w-full h-16 flex items-center justify-end px-8 shrink-0">
                <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                    <Bell size={20} />
                </button>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center max-w-4xl mx-auto w-full">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-8"
                >
                    <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white mx-auto mb-6 shadow-lg shadow-blue-200">
                        <BarChart2 size={32} />
                    </div>
                    <h2 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight">
                        안녕하세요! 오늘 어떤 제품을<br />분석해 드릴까요?
                    </h2>
                    <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed mb-6">
                        수천 개의 리뷰를 몇 초 만에 읽어드립니다. 장단점, 상세 비교,<br />
                        또는 특정 기능에 대해 무엇이든 물어보세요.
                    </p>

                    <div className="flex flex-col items-center gap-2">
                        <button
                            onClick={handleIndexing}
                            disabled={isIndexing}
                            className={`px-6 py-3 rounded-xl font-semibold shadow-md transition-all flex items-center gap-2 ${isIndexing
                                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                    : 'bg-white text-blue-600 border border-blue-200 hover:bg-blue-50'
                                }`}
                        >
                            <BarChart2 size={18} />
                            {isIndexing ? '인덱싱 중...' : '샘플 데이터 인덱싱'}
                        </button>
                        {indexStatus && (
                            <p className={`text-sm ${indexStatus.includes('에러') || indexStatus.includes('실패') ? 'text-red-500' : 'text-blue-500'} font-medium`}>
                                {indexStatus}
                            </p>
                        )}
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mt-4">
                    {SUGGESTIONS.map((item, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3, delay: idx * 0.1 }}
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
