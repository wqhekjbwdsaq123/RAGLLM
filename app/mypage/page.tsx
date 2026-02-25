"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { User, Package, Star, MessageSquare, ChevronRight, Settings, CreditCard, LogOut } from "lucide-react";
import { PRODUCTS } from "@/lib/products";

// Sample registered products (first 2 from PRODUCTS)
const MY_PRODUCTS = PRODUCTS.slice(0, 2);

// Sample reviews written by user
const MY_REVIEWS = [
    {
        productId: PRODUCTS[2].id,
        productName: PRODUCTS[2].name,
        rating: 4,
        content: "정말 맘에 드는 청소기입니다. 맵핑 속도가 엄청나게 빠르고 가구들을 정확히 회피해서 바닥에 물건이 널브러져 있어도 안심이에요.",
        date: "2026.02.24",
        reviewIdx: 2,
    },
    {
        productId: PRODUCTS[4].id,
        productName: PRODUCTS[4].name,
        rating: 5,
        content: "알러지 비염이 심한데 이거 틀어놓고 자면 아침에 코가 안 막힙니다. 소음도 거의 안 들려서 수면에 방해되지 않아요.",
        date: "2026.02.15",
        reviewIdx: 4,
    },
];

export default function MyPage() {
    const router = useRouter();

    return (
        <div className="flex-1 overflow-y-auto bg-gray-50 font-sans p-8 min-h-screen">
            <div className="max-w-5xl mx-auto space-y-8">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">마이페이지</h1>
                        <p className="text-sm text-gray-500 mt-1">내 활동 내역과 계정 설정을 관리하세요.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Profile & Quick Actions */}
                    <div className="space-y-6">
                        {/* Profile Card */}
                        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-center">
                            <div className="w-20 h-20 mx-auto bg-orange-100 rounded-full flex items-center justify-center text-orange-600 mb-4 overflow-hidden relative border-4 border-white shadow-md">
                                <User size={40} />
                            </div>
                            <h2 className="text-xl font-bold text-gray-900">Alex Morgan</h2>
                            <p className="text-sm text-gray-500 mb-6">alex.morgan@example.com</p>

                            <div className="flex justify-center gap-4 text-sm font-semibold text-gray-700">
                                <div className="text-center">
                                    <span className="block text-2xl font-black text-blue-600">{MY_PRODUCTS.length}</span>
                                    <span className="text-xs text-gray-400">등록한 제품</span>
                                </div>
                                <div className="w-px h-10 bg-gray-100" />
                                <div className="text-center">
                                    <span className="block text-2xl font-black text-blue-600">{MY_REVIEWS.length}</span>
                                    <span className="text-xs text-gray-400">작성한 리뷰</span>
                                </div>
                            </div>
                        </div>

                        {/* Settings Menu */}
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                            <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors border-b border-gray-100 group">
                                <div className="flex items-center gap-3 text-gray-700 font-medium">
                                    <Settings size={18} className="text-gray-400 group-hover:text-blue-500 transition-colors" />
                                    프로필 설정
                                </div>
                                <ChevronRight size={16} className="text-gray-300" />
                            </button>
                            <button
                                onClick={() => router.push("/plan")}
                                className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors border-b border-gray-100 group"
                            >
                                <div className="flex items-center gap-3 text-gray-700 font-medium">
                                    <CreditCard size={18} className="text-gray-400 group-hover:text-blue-500 transition-colors" />
                                    결제 및 플랜 관리
                                </div>
                                <ChevronRight size={16} className="text-gray-300" />
                            </button>
                            <button className="w-full flex items-center justify-between p-4 hover:bg-red-50 transition-colors group">
                                <div className="flex items-center gap-3 text-red-600 font-medium">
                                    <LogOut size={18} />
                                    로그아웃
                                </div>
                            </button>
                        </div>
                    </div>

                    {/* Right Column - Content */}
                    <div className="lg:col-span-2 space-y-6">

                        {/* Registered Products */}
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 relative overflow-hidden">
                            <div className="flex items-center justify-between mb-6 relative z-10">
                                <div className="flex items-center gap-2 font-bold text-gray-900 text-lg">
                                    <Package className="text-blue-500" size={20} />
                                    내가 등록한 제품
                                </div>
                                <button
                                    onClick={() => router.push("/new-product")}
                                    className="text-sm text-blue-600 font-semibold hover:underline"
                                >
                                    + 새 제품 추가
                                </button>
                            </div>

                            <div className="space-y-4 relative z-10">
                                {MY_PRODUCTS.map((product) => (
                                    <div
                                        key={product.id}
                                        onClick={() => router.push(`/product/${product.id}`)}
                                        className="flex gap-4 p-4 rounded-xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50/50 transition-colors cursor-pointer group"
                                    >
                                        <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0 bg-gray-100">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex-1 min-w-0 flex flex-col justify-center">
                                            <div className="text-xs font-bold text-blue-600 uppercase mb-1">{product.category}</div>
                                            <h3 className="font-bold text-gray-900 truncate group-hover:text-blue-700 transition-colors">{product.name}</h3>
                                            <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                                                <span className="flex items-center gap-1"><Star size={12} className="fill-amber-400 text-amber-400" /> {product.rating}</span>
                                                <span>•</span>
                                                <span>리뷰 {product.reviewCount}개</span>
                                            </div>
                                        </div>
                                        <ChevronRight size={20} className="text-gray-300 my-auto group-hover:text-blue-500 transition-colors shrink-0" />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Recent Reviews */}
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-2 font-bold text-gray-900 text-lg">
                                    <MessageSquare className="text-blue-500" size={20} />
                                    최근 작성한 리뷰
                                </div>
                                <button className="text-sm text-gray-500 hover:text-gray-900 font-medium">
                                    전체 보기
                                </button>
                            </div>

                            <div className="space-y-4">
                                {MY_REVIEWS.map((review, i) => (
                                    <div
                                        key={i}
                                        onClick={() => router.push(`/product/${review.productId}/reviews#review-${review.reviewIdx}`)}
                                        className="p-4 border border-gray-100 rounded-xl hover:border-blue-200 hover:bg-blue-50/50 transition-colors cursor-pointer group"
                                    >
                                        <div className="flex justify-between items-start mb-2">
                                            <div className="font-semibold text-gray-900 text-sm group-hover:text-blue-700 transition-colors">{review.productName}</div>
                                            <div className="flex text-amber-400">
                                                {[1, 2, 3, 4, 5].map(s => (
                                                    <Star key={s} size={12} className={s <= review.rating ? "fill-current" : "text-gray-200 fill-current"} />
                                                ))}
                                            </div>
                                        </div>
                                        <p className="text-sm text-gray-600 line-clamp-2">"{review.content}"</p>
                                        <div className="mt-3 text-[10px] text-gray-400 font-medium">{review.date} 작성</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
