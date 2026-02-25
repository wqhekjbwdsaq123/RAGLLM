"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PRODUCTS } from "@/lib/products";
import { Star, ChevronRight, ArrowLeft, Plus } from "lucide-react";

export default function IntroPage() {
    const router = useRouter();

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
            {/* Header */}
            <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    {/* Left: Logo */}
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white text-sm font-bold">
                            R
                        </div>
                        <span className="font-bold text-gray-900">ReviewBot</span>
                    </div>

                    {/* Right: Actions */}
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => router.push("/new-product")}
                            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 transition-colors shadow-md shadow-blue-100"
                        >
                            <Plus size={15} />
                            새 제품 등록
                        </button>
                        <Link
                            href="/"
                            className="flex items-center gap-2 text-gray-500 hover:text-blue-600 transition-colors text-sm font-medium px-3 py-2 rounded-xl border border-gray-200 hover:border-blue-200 bg-white"
                        >
                            <ArrowLeft size={16} />
                            채팅으로 돌아가기
                        </Link>
                    </div>
                </div>
            </header>

            {/* Hero */}
            <div className="max-w-7xl mx-auto px-6 pt-12 pb-8">
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-4">
                        <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                        AI 리뷰 분석 시스템
                    </div>
                    <h1 className="text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                            제품을 알아보세요
                        </span>
                    </h1>
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {PRODUCTS.map((product) => (
                        <Link key={product.id} href={`/product/${product.id}`}>
                            <div className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden cursor-pointer">
                                {/* Card Header Image */}
                                <div className="relative h-48 bg-gray-100">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={product.imageUrl}
                                        alt={product.name}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/10" />
                                </div>

                                {/* Card Body */}
                                <div className="p-6">
                                    {/* Stars + Category row */}
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="flex">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <Star
                                                    key={star}
                                                    size={13}
                                                    className={
                                                        star <= Math.round(product.rating)
                                                            ? "fill-amber-400 text-amber-400"
                                                            : "text-gray-200 fill-gray-200"
                                                    }
                                                />
                                            ))}
                                        </div>
                                        <span className="text-xs font-bold text-gray-700">{product.rating}</span>
                                        <span className="inline-block text-[10px] font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full ml-1">
                                            {product.category}
                                        </span>
                                    </div>

                                    <div className="flex items-start justify-between mb-2">
                                        <div className="flex-1 pr-2">
                                            <h2 className="text-lg font-bold text-gray-900 leading-tight group-hover:text-blue-600 transition-colors">
                                                {product.name}
                                            </h2>
                                        </div>
                                        <ChevronRight
                                            size={18}
                                            className="text-gray-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all shrink-0 mt-1"
                                        />
                                    </div>
                                    <p className="text-sm text-gray-500 mb-4 leading-relaxed line-clamp-2">
                                        {product.description}
                                    </p>

                                    {/* Price */}
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs text-gray-400">({product.reviewCount}개 리뷰)</span>
                                        <span className="text-base font-bold text-gray-900">
                                            {product.price}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
