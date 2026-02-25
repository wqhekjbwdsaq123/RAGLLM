"use client";

import Link from "next/link";
import { notFound } from "next/navigation";
import { getProduct } from "@/lib/products";
import { ArrowLeft, Star, ThumbsUp, CheckCircle, User } from "lucide-react";
import { use } from "react";

// Derive reviews that feel consistent with the CSV data
function generateReviews(productId: string) {
    const reviewData = [
        { name: "홍길동", rating: 5, title: "정말 최고예요!", content: "배송도 빠르고 제품 품질이 정말 좋습니다. 설명이랑 똑같아요. 강력 추천합니다!", date: "2024-01-15", helpful: 10, verified: true },
        { name: "김철수", rating: 4, title: "만족스럽습니다", content: "디자인이 예쁘고 성능도 준수하네요. 다만 배송이 하루 정도 늦어서 별 하나 뺐어요.", date: "2024-01-16", helpful: 5, verified: true },
        { name: "이영희", rating: 3, title: "보통이에요", content: "가격 대비 나쁘지 않은데, 마감이 조금 아쉬운 부분이 있네요.", date: "2024-01-17", helpful: 2, verified: false },
        { name: "박민수", rating: 2, title: "실망했습니다", content: "기대한 것보다 내구성이 떨어지는 것 같아요. 이틀 만에 고장 나서 속상하네요.", date: "2024-01-18", helpful: 15, verified: true },
        { name: "최민지", rating: 5, title: "가성비 갑", content: "이 가격에 이 정도 퀄리티라니 믿기지 않네요. 정말 만족하며 사용 중입니다.", date: "2024-01-19", helpful: 8, verified: true },
        { name: "정훈", rating: 4, title: "좋은 선택이었어요", content: "무난하게 사용하기 좋습니다. 소음도 적고 디자인도 깔끔해요.", date: "2024-01-20", helpful: 3, verified: true },
        { name: "강지민", rating: 1, title: "절대 사지 마세요", content: "돈 낭비입니다. 포장도 엉망이고 작동도 제대로 안 돼요.", date: "2024-01-21", helpful: 20, verified: false },
        { name: "윤서연", rating: 5, title: "완벽합니다!", content: "찾고 있던 바로 그 제품이에요. 핏도 완벽하고 색상도 화면이랑 똑같아요.", date: "2024-01-22", helpful: 12, verified: true },
        { name: "설현", rating: 4, title: "괜찮네요", content: "성능은 좋은데 처음에 설정하는 게 조금 복잡했어요. 그거 빼곤 다 좋습니다.", date: "2024-01-23", helpful: 4, verified: true },
        { name: "유재석", rating: 3, title: "그저 그래요", content: "그냥 평범한 제품입니다. 딱히 좋지도 나쁘지도 않아요.", date: "2024-01-24", helpful: 1, verified: true },
        { name: "박명수", rating: 5, title: "인생 템 등극", content: "올해 산 물건 중에 제일 맘에 들어요. 품질이 장난 아니네요.", date: "2024-01-25", helpful: 9, verified: true },
        { name: "정준하", rating: 2, title: "생각보다 별로네요", content: "광고만큼 좋은지 모르겠어요. 소리가 생각보다 커서 신경 쓰입니다.", date: "2024-01-26", helpful: 7, verified: true },
    ];
    return reviewData;
}

function StarRating({ value }: { value: number }) {
    return (
        <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map((s) => (
                <Star
                    key={s}
                    size={14}
                    className={
                        s <= value
                            ? "fill-amber-400 text-amber-400"
                            : "fill-gray-200 text-gray-200"
                    }
                />
            ))}
        </div>
    );
}

export default function ReviewsPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = use(params);
    const product = getProduct(id);
    if (!product) notFound();

    const reviews = generateReviews(id);
    const avgRating =
        reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

    const dist = [5, 4, 3, 2, 1].map((star) => ({
        star,
        count: reviews.filter((r) => r.rating === star).length,
        pct: (reviews.filter((r) => r.rating === star).length / reviews.length) * 100,
    }));

    return (
        <div className="min-h-screen h-full bg-gradient-to-br from-slate-50 to-blue-50">
            {/* Header */}
            <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-10">
                <div className="max-w-5xl mx-auto px-6 py-4 flex items-center gap-4">
                    <Link
                        href={`/product/${id}`}
                        className="flex items-center gap-2 text-gray-500 hover:text-blue-600 text-sm font-medium transition-colors"
                    >
                        <ArrowLeft size={16} />
                        제품 상세로
                    </Link>
                    <div className="w-px h-5 bg-gray-200" />
                    <span className="text-sm text-gray-700 font-medium">
                        {product.name} · 리뷰 목록
                    </span>
                </div>
            </header>

            <div className="max-w-5xl mx-auto px-6 py-8">
                {/* Product Summary */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-6">
                    <div className="flex items-center gap-5">
                        <div className="w-20 h-20 rounded-2xl overflow-hidden shrink-0 shadow-md border border-gray-100 bg-gray-50">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={product.imageUrl}
                                alt={product.name}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="flex-1">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-blue-600">
                                {product.category}
                            </span>
                            <h1 className="text-2xl font-extrabold text-gray-900 mt-0.5 mb-1">
                                {product.name}
                            </h1>
                            <p className="text-sm text-gray-500">{product.description}</p>
                        </div>
                        {/* Average */}
                        <div className="text-center shrink-0">
                            <div className="text-5xl font-extrabold text-gray-900">
                                {avgRating.toFixed(1)}
                            </div>
                            <StarRating value={Math.round(avgRating)} />
                            <div className="text-xs text-gray-400 mt-1">
                                {reviews.length}개 리뷰
                            </div>
                        </div>
                    </div>

                    {/* Rating Distribution */}
                    <div className="mt-6 space-y-2">
                        {dist.map(({ star, count, pct }) => (
                            <div key={star} className="flex items-center gap-3">
                                <div className="flex items-center gap-1 w-8 shrink-0">
                                    <span className="text-xs font-medium text-gray-600">
                                        {star}
                                    </span>
                                    <Star size={11} className="fill-amber-400 text-amber-400" />
                                </div>
                                <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-amber-400 rounded-full"
                                        style={{ width: `${pct}%` }}
                                    />
                                </div>
                                <span className="text-xs text-gray-400 w-6 text-right">
                                    {count}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Review List */}
                <div className="space-y-4">
                    {reviews.map((review, i) => (
                        <div
                            key={i}
                            id={`review-${i}`}
                            className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6"
                        >
                            <div className="flex items-start justify-between mb-3">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold text-sm shrink-0">
                                        <User size={16} />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <span className="font-semibold text-gray-900 text-sm">
                                                {review.name}
                                            </span>
                                            {review.verified && (
                                                <span className="flex items-center gap-1 text-[10px] text-green-600 font-medium">
                                                    <CheckCircle size={11} />
                                                    구매 인증
                                                </span>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-2 mt-0.5">
                                            <StarRating value={review.rating} />
                                            <span className="text-xs text-gray-400">
                                                {review.date}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <h3 className="font-bold text-gray-900 mb-1">{review.title}</h3>
                            <p className="text-sm text-gray-600 leading-relaxed">
                                {review.content}
                            </p>

                            <div className="mt-4 flex items-center gap-2">
                                <button className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-blue-600 transition-colors px-3 py-1.5 rounded-lg hover:bg-blue-50">
                                    <ThumbsUp size={13} />
                                    도움됐어요 ({review.helpful})
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
