"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { notFound } from "next/navigation";
import { getProduct, PRODUCTS } from "@/lib/products";
import {
    ArrowLeft,
    Star,
    ThumbsUp,
    ThumbsDown,
    Bot,
    Send,
    X,
    MessageSquare,
    FileText,
    ChevronDown,
    ChevronUp,
} from "lucide-react";
import { use } from "react";

interface ChatMsg {
    role: "user" | "assistant";
    content: string;
}

export default function ProductPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = use(params);
    const product = getProduct(id);
    if (!product) notFound();

    const [chatOpen, setChatOpen] = useState(false);
    const [messages, setMessages] = useState<ChatMsg[]>([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [summaryOpen, setSummaryOpen] = useState(false);
    const [summaryLoading, setSummaryLoading] = useState(false);
    const [summaryText, setSummaryText] = useState<string | null>(null);
    const router = useRouter();

    const sendMessage = async () => {
        if (!input.trim()) return;
        const msg = input.trim();
        setInput("");
        setMessages((prev) => [...prev, { role: "user", content: msg }]);
        setLoading(true);
        try {
            const res = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: msg, productName: product.name }),
            });
            const data = await res.json();
            setMessages((prev) => [
                ...prev,
                {
                    role: "assistant",
                    content: data.answer || "답변을 가져오지 못했습니다.",
                },
            ]);
        } catch {
            setMessages((prev) => [
                ...prev,
                { role: "assistant", content: "오류가 발생했습니다." },
            ]);
        } finally {
            setLoading(false);
        }
    };

    const handleSummary = async () => {
        if (summaryText) {
            setSummaryOpen(!summaryOpen);
            return;
        }
        setSummaryOpen(true);
        setSummaryLoading(true);
        try {
            const res = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    message: `${product.name}의 전체 리뷰를 요약해줘. 주요 장단점과 구매자들이 가장 많이 언급한 내용을 정리해줘.`,
                    productName: product.name,
                }),
            });
            const data = await res.json();
            setSummaryText(data.answer || "요약을 가져오지 못했습니다.");
        } catch {
            setSummaryText("요약을 불러오는 중 오류가 발생했습니다.");
        } finally {
            setSummaryLoading(false);
        }
    };

    // Sample reviews for the list
    const sampleReviews = [
        { name: "홍길동", rating: 5, title: "정말 최고예요!", idx: 0 },
        { name: "김철수", rating: 4, title: "만족스럽습니다", idx: 1 },
        { name: "이영희", rating: 3, title: "보통이에요", idx: 2 },
        { name: "박민수", rating: 2, title: "실망했습니다", idx: 3 },
        { name: "최민지", rating: 5, title: "가성비 갑", idx: 4 },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
            {/* Header */}
            <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-20">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-4">
                    <Link
                        href="/intro"
                        className="flex items-center gap-2 text-gray-500 hover:text-blue-600 text-sm font-medium transition-colors"
                    >
                        <ArrowLeft size={16} />
                        제품 목록
                    </Link>
                    <div className="w-px h-5 bg-gray-200" />
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                        <span>{product.category}</span>
                        <span>/</span>
                        <span className="text-gray-700 font-medium">{product.name}</span>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-6 py-8 flex gap-8">
                {/* Left - Main Content */}
                <div className="flex-1 min-w-0 space-y-6">
                    {/* Title Bar */}
                    <div className="flex items-start justify-between">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <span className="inline-block text-[10px] font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                                    {product.category}
                                </span>
                                <span className="text-xs text-gray-400">
                                    리뷰 {product.reviewCount}개 분석
                                </span>
                            </div>
                            <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-2">
                                {product.name}
                            </h1>
                            <p className="text-gray-500">{product.longDescription}</p>
                        </div>
                        <div className="flex gap-2 ml-6 shrink-0">
                            <Link
                                href={`/product/${id}/reviews`}
                                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:border-blue-300 transition-colors"
                            >
                                <FileText size={15} />
                                전체 리뷰 보기
                            </Link>
                        </div>
                    </div>

                    {/* Overview Card */}
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                        <div className="flex gap-6">
                            {/* Product Image */}
                            <div className="w-44 h-44 rounded-2xl overflow-hidden shrink-0 shadow-lg border border-gray-100 bg-gray-50">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={product.imageUrl}
                                    alt={product.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            {/* Rating Info */}
                            <div className="flex-1">
                                {/* Price at top */}
                                <div className="text-2xl font-extrabold text-gray-900 mb-3">
                                    {product.price}
                                </div>
                                {/* Rating row */}
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="text-4xl font-extrabold text-gray-900">
                                        {product.rating}
                                    </span>
                                    <div className="flex items-center gap-1">
                                        {[1, 2, 3, 4, 5].map((s) => (
                                            <Star
                                                key={s}
                                                size={18}
                                                className={
                                                    s <= Math.round(product.rating)
                                                        ? "fill-amber-400 text-amber-400"
                                                        : "fill-gray-200 text-gray-200"
                                                }
                                            />
                                        ))}
                                    </div>
                                    <span className="text-sm text-gray-500">
                                        ({product.reviewCount}개 리뷰)
                                    </span>
                                </div>

                                {/* Sentiment Bar - directly below rating */}
                                <div className="flex h-3 rounded-full overflow-hidden gap-0.5 mb-1">
                                    <div
                                        className="bg-green-400"
                                        style={{ width: `${product.sentiment.positive}%` }}
                                    />
                                    <div
                                        className="bg-gray-200"
                                        style={{ width: `${product.sentiment.neutral}%` }}
                                    />
                                    <div
                                        className="bg-red-400"
                                        style={{ width: `${product.sentiment.negative}%` }}
                                    />
                                </div>
                                <div className="flex gap-4 text-xs text-gray-400">
                                    <span className="flex items-center gap-1">
                                        <span className="w-2 h-2 bg-green-400 rounded-full" />
                                        긍정 {product.sentiment.positive}%
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <span className="w-2 h-2 bg-gray-300 rounded-full" />
                                        중립
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <span className="w-2 h-2 bg-red-400 rounded-full" />
                                        부정 {product.sentiment.negative}%
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Pros & Cons */}
                        <div className="grid grid-cols-2 gap-4 mt-6">
                            <div className="bg-green-50 rounded-xl p-4">
                                <div className="flex items-center gap-2 mb-3">
                                    <div className="w-7 h-7 bg-green-100 rounded-lg flex items-center justify-center">
                                        <ThumbsUp size={14} className="text-green-600" />
                                    </div>
                                    <span className="font-bold text-gray-900">주요 장점</span>
                                </div>
                                <ul className="space-y-2">
                                    {product.pros.map((pro, i) => (
                                        <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                                            <span className="mt-0.5 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center shrink-0">
                                                <span className="text-white text-[10px] font-bold">✓</span>
                                            </span>
                                            {pro}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="bg-red-50 rounded-xl p-4">
                                <div className="flex items-center gap-2 mb-3">
                                    <div className="w-7 h-7 bg-red-100 rounded-lg flex items-center justify-center">
                                        <ThumbsDown size={14} className="text-red-500" />
                                    </div>
                                    <span className="font-bold text-gray-900">주요 단점</span>
                                </div>
                                <ul className="space-y-2">
                                    {product.cons.map((con, i) => (
                                        <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                                            <span className="mt-0.5 w-4 h-4 bg-red-400 rounded-full flex items-center justify-center shrink-0">
                                                <span className="text-white text-[10px] font-bold">✕</span>
                                            </span>
                                            {con}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Review List (replaces sub-score cards) */}
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-bold text-gray-900 text-base flex items-center gap-2">
                                <FileText size={16} className="text-blue-500" />
                                제품 리뷰
                            </h3>
                            <Link
                                href={`/product/${id}/reviews`}
                                className="text-xs text-blue-600 font-semibold hover:underline"
                            >
                                전체 보기 →
                            </Link>
                        </div>
                        <div className="space-y-2">
                            {sampleReviews.map((review) => (
                                <Link
                                    key={review.idx}
                                    href={`/product/${id}/reviews#review-${review.idx}`}
                                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-blue-50 transition-colors group cursor-pointer"
                                >
                                    <div className="flex shrink-0">
                                        {[1, 2, 3, 4, 5].map((s) => (
                                            <Star
                                                key={s}
                                                size={11}
                                                className={s <= review.rating ? "fill-amber-400 text-amber-400" : "fill-gray-200 text-gray-200"}
                                            />
                                        ))}
                                    </div>
                                    <span className="text-xs font-semibold text-gray-700 group-hover:text-blue-700 transition-colors truncate">
                                        {review.title}
                                    </span>
                                    <span className="text-xs text-gray-400 shrink-0">— {review.name}</span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right - CTA */}
                <div className="w-72 shrink-0 space-y-4">
                    <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl shadow-lg p-6 text-white relative overflow-hidden">
                        {/* Decorative background circle */}
                        <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none" />

                        <div className="text-4xl mb-3">🤖</div>
                        <h3 className="text-xl font-extrabold mb-2 tracking-tight">AI 분석 결과</h3>
                        <p className="text-sm text-blue-100 leading-relaxed mb-6">
                            실제 구매자 {product.reviewCount}명의 리뷰를 AI가 완벽하게 분석했습니다.
                            더 깊은 인사이트가 필요하거나 궁금한 점이 있다면 챗봇에게 바로 물어보세요!
                        </p>

                        <div className="space-y-3 relative z-10">
                            <button
                                onClick={() => setChatOpen(true)}
                                className="w-full flex items-center justify-center gap-2 py-3.5 bg-white text-blue-600 rounded-xl font-bold hover:bg-blue-50 hover:scale-[1.02] transition-all shadow-md"
                            >
                                <MessageSquare size={16} />
                                챗봇과 대화하기
                            </button>
                            <button
                                onClick={handleSummary}
                                className="w-full flex items-center justify-center gap-2 py-3.5 bg-blue-700/50 border border-blue-400/50 text-white rounded-xl font-semibold hover:bg-blue-700/80 transition-all"
                            >
                                {summaryOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                                전체 리뷰 요약
                            </button>

                            {/* Summary toggle */}
                            {summaryOpen && (
                                <div className="bg-blue-900/40 border border-blue-400/30 rounded-xl p-4 text-sm text-blue-100 leading-relaxed">
                                    {summaryLoading ? (
                                        <div className="flex items-center gap-2">
                                            <div className="flex gap-1">
                                                {[0, 1, 2].map((i) => (
                                                    <span key={i} className="w-1.5 h-1.5 bg-blue-300 rounded-full animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                                                ))}
                                            </div>
                                            <span className="text-blue-300 text-xs">요약 생성 중...</span>
                                        </div>
                                    ) : (
                                        summaryText
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Chat Panel */}
            {chatOpen && (
                <div className="fixed inset-0 z-50 flex items-end justify-end p-6 pointer-events-none">
                    <div className="pointer-events-auto w-96 h-[600px] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden">
                        {/* Chat Header */}
                        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 bg-gradient-to-r from-blue-600 to-blue-700">
                            <div className="flex items-center gap-2 text-white">
                                <Bot size={18} />
                                <span className="font-bold text-sm">
                                    {product.name} 챗봇
                                </span>
                            </div>
                            <button
                                onClick={() => setChatOpen(false)}
                                className="text-blue-200 hover:text-white transition-colors"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-3">
                            {messages.length === 0 && (
                                <div className="text-center text-sm text-gray-400 mt-8">
                                    <Bot size={40} className="mx-auto mb-2 text-gray-200" />
                                    <p>{product.name}에 대해 무엇이든 물어보세요!</p>
                                </div>
                            )}
                            {messages.map((m, i) => (
                                <div
                                    key={i}
                                    className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                                >
                                    <div
                                        className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${m.role === "user"
                                            ? "bg-blue-600 text-white rounded-tr-none"
                                            : "bg-gray-100 text-gray-800 rounded-tl-none"
                                            }`}
                                    >
                                        {m.content}
                                    </div>
                                </div>
                            ))}
                            {loading && (
                                <div className="flex justify-start">
                                    <div className="bg-gray-100 px-4 py-2.5 rounded-2xl rounded-tl-none">
                                        <div className="flex gap-1">
                                            {[0, 1, 2].map((i) => (
                                                <span
                                                    key={i}
                                                    className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"
                                                    style={{
                                                        animationDelay: `${i * 0.15}s`,
                                                    }}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Input */}
                        <div className="p-4 border-t border-gray-100">
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                                    placeholder="질문을 입력하세요..."
                                    className="flex-1 text-sm border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition"
                                />
                                <button
                                    onClick={sendMessage}
                                    className="w-10 h-10 flex items-center justify-center bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
                                >
                                    <Send size={16} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
