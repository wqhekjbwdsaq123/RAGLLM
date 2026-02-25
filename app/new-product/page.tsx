"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Package, AlertCircle, Check } from "lucide-react";

const CATEGORIES = [
    "오디오 장비", "웨어러블", "가전제품", "홈오피스",
    "건강/환경", "주방가전", "스마트홈", "모바일", "컴퓨터", "기타",
];

interface ProductForm {
    name: string;
    category: string;
    price: string;
    description: string;
    imageUrl: string;
}

export default function NewProductPage() {
    const router = useRouter();
    const [form, setForm] = useState<ProductForm>({
        name: "", category: "", price: "", description: "", imageUrl: "",
    });
    const [submitted, setSubmitted] = useState(false);
    const [errors, setErrors] = useState<Partial<ProductForm>>({});

    const validate = (): boolean => {
        const e: Partial<ProductForm> = {};
        if (!form.name.trim()) e.name = "제품명을 입력해주세요.";
        if (!form.category) e.category = "카테고리를 선택해주세요.";
        if (!form.price.trim()) e.price = "가격을 입력해주세요.";
        if (!form.description.trim()) e.description = "제품 설명을 입력해주세요.";
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const handleSubmit = (ev: React.FormEvent) => {
        ev.preventDefault();
        if (validate()) setSubmitted(true);
    };

    const handleChange = (field: keyof ProductForm, value: string) => {
        setForm(p => ({ ...p, [field]: value }));
        if (errors[field]) setErrors(p => ({ ...p, [field]: undefined }));
    };

    // ── 성공 화면 ──────────────────────────────────────
    if (submitted) {
        return (
            <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-8">
                <div className="bg-white rounded-3xl shadow-xl p-10 max-w-md w-full text-center">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Check className="text-green-500" size={40} />
                    </div>
                    <h2 className="text-2xl font-extrabold text-gray-900 mb-2">등록 완료!</h2>
                    <p className="text-gray-600 font-semibold text-lg mb-1">{form.name}</p>
                    <p className="text-sm text-gray-400 mb-8">
                        제품이 성공적으로 등록되었습니다.<br />
                        리뷰 데이터가 수집되면 AI 분석을 시작할 수 있습니다.
                    </p>
                    <div className="flex gap-3">
                        <button
                            onClick={() => { setSubmitted(false); setForm({ name: "", category: "", price: "", description: "", imageUrl: "" }); }}
                            className="flex-1 py-3 border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                            다른 제품 등록
                        </button>
                        <button
                            onClick={() => router.push("/intro")}
                            className="flex-1 py-3 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors"
                        >
                            제품 목록으로
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // ── 등록 폼 ───────────────────────────────────────
    return (
        <div className="flex-1 overflow-y-auto bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
            {/* 상단 헤더 */}
            <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-10">
                <div className="px-8 py-4 flex items-center gap-3">
                    <Link
                        href="/intro"
                        className="flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors"
                    >
                        <ArrowLeft size={15} />
                        돌아가기
                    </Link>
                    <span className="text-gray-200">|</span>
                    <span className="text-sm font-bold text-gray-900 flex items-center gap-1.5">
                        <Package size={15} className="text-blue-500" />
                        새 제품 등록
                    </span>
                </div>
            </header>

            {/* 콘텐츠 */}
            <div className="px-8 py-10 max-w-5xl mx-auto">
                {/* 안내 헤딩 */}
                <div className="mb-8">
                    <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-1">
                        제품을 등록하세요
                    </h1>
                    <p className="text-gray-400 text-sm">
                        제품 정보를 입력하면 AI가 리뷰를 분석해 드립니다.
                    </p>
                </div>

                {/* 2열 레이아웃: 폼 | 미리보기 */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* ── 폼 (2/3) ── */}
                    <form onSubmit={handleSubmit} className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-8 space-y-6">
                        {/* 제품명 */}
                        <div>
                            <label className="block text-sm font-bold text-gray-800 mb-1.5">
                                제품명 <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={form.name}
                                onChange={e => handleChange("name", e.target.value)}
                                placeholder="예: Sony WH-1000XM5 노이즈캔슬링 헤드폰"
                                className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 transition-all ${errors.name
                                    ? "border-red-300 focus:border-red-400 focus:ring-red-50"
                                    : "border-gray-200 focus:border-blue-300 focus:ring-blue-50"}`}
                            />
                            {errors.name && <p className="mt-1 text-xs text-red-500 flex items-center gap-1"><AlertCircle size={11} />{errors.name}</p>}
                        </div>

                        {/* 카테고리 + 가격 (나란히) */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-bold text-gray-800 mb-1.5">
                                    카테고리 <span className="text-red-500">*</span>
                                </label>
                                <select
                                    value={form.category}
                                    onChange={e => handleChange("category", e.target.value)}
                                    className={`w-full border rounded-xl px-4 py-3 text-sm bg-white focus:outline-none focus:ring-2 transition-all ${errors.category
                                        ? "border-red-300 focus:border-red-400 focus:ring-red-50"
                                        : "border-gray-200 focus:border-blue-300 focus:ring-blue-50"}`}
                                >
                                    <option value="">선택하세요</option>
                                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                                </select>
                                {errors.category && <p className="mt-1 text-xs text-red-500 flex items-center gap-1"><AlertCircle size={11} />{errors.category}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-800 mb-1.5">
                                    가격 <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={form.price}
                                    onChange={e => handleChange("price", e.target.value)}
                                    placeholder="예: ₩350,000"
                                    className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 transition-all ${errors.price
                                        ? "border-red-300 focus:border-red-400 focus:ring-red-50"
                                        : "border-gray-200 focus:border-blue-300 focus:ring-blue-50"}`}
                                />
                                {errors.price && <p className="mt-1 text-xs text-red-500 flex items-center gap-1"><AlertCircle size={11} />{errors.price}</p>}
                            </div>
                        </div>

                        {/* 제품 설명 */}
                        <div>
                            <label className="block text-sm font-bold text-gray-800 mb-1.5">
                                제품 설명 <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                value={form.description}
                                onChange={e => handleChange("description", e.target.value)}
                                placeholder="제품의 주요 특징과 사용 목적을 간략히 설명해주세요."
                                rows={5}
                                className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 transition-all resize-none ${errors.description
                                    ? "border-red-300 focus:border-red-400 focus:ring-red-50"
                                    : "border-gray-200 focus:border-blue-300 focus:ring-blue-50"}`}
                            />
                            {errors.description && <p className="mt-1 text-xs text-red-500 flex items-center gap-1"><AlertCircle size={11} />{errors.description}</p>}
                        </div>

                        {/* 이미지 URL */}
                        <div>
                            <label className="block text-sm font-bold text-gray-800 mb-1.5">
                                제품 이미지 URL <span className="text-gray-400 font-normal">(선택)</span>
                            </label>
                            <input
                                type="url"
                                value={form.imageUrl}
                                onChange={e => handleChange("imageUrl", e.target.value)}
                                placeholder="https://example.com/product-image.jpg"
                                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-300 focus:ring-2 focus:ring-blue-50 transition-all"
                            />
                        </div>

                        {/* 버튼 */}
                        <div className="flex gap-3 pt-2">
                            <Link
                                href="/intro"
                                className="flex-1 py-3.5 border border-gray-200 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors text-center"
                            >
                                취소
                            </Link>
                            <button
                                type="submit"
                                className="flex-1 py-3.5 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-100 flex items-center justify-center gap-2"
                            >
                                <Package size={15} />
                                제품 등록하기
                            </button>
                        </div>
                    </form>

                    {/* ── 미리보기 패널 (1/3) ── */}
                    <div className="space-y-4">
                        {/* 이미지 미리보기 */}
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">이미지 미리보기</p>
                            {form.imageUrl ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img
                                    src={form.imageUrl}
                                    alt="미리보기"
                                    className="w-full h-48 object-cover rounded-xl border border-gray-200"
                                    onError={e => { (e.target as HTMLImageElement).src = ""; }}
                                />
                            ) : (
                                <div className="w-full h-48 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-gray-300">
                                    <Package size={36} />
                                    <p className="text-xs mt-2">이미지 URL을 입력하면<br />여기에 미리보기가 표시됩니다</p>
                                </div>
                            )}
                        </div>

                        {/* 제품 카드 미리보기 */}
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">카드 미리보기</p>
                            <div className="rounded-xl border border-gray-100 p-4 bg-gray-50">
                                {form.category && (
                                    <span className="inline-block text-[10px] font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full mb-2">
                                        {form.category}
                                    </span>
                                )}
                                <p className="font-bold text-gray-900 text-sm leading-tight mb-1">
                                    {form.name || <span className="text-gray-300 font-normal">제품명</span>}
                                </p>
                                <p className="text-xs text-gray-400 line-clamp-2 mb-2">
                                    {form.description || <span className="text-gray-300">제품 설명</span>}
                                </p>
                                {form.price && (
                                    <p className="text-sm font-extrabold text-gray-900">{form.price}</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
