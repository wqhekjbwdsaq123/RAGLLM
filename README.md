# 🛍️ ReviewBot — AI 쇼핑 리뷰 분석 챗봇

> **RAG(Retrieval-Augmented Generation)** 기반의 쇼핑 리뷰 분석 AI 챗봇입니다.  
> 상품 리뷰를 업로드하면 AI가 자동으로 분석하고, 사용자의 질문에 맞게 핵심 정보를 답변해줍니다.

---

## ✨ 주요 기능

| 기능                       | 설명                                                         |
| -------------------------- | ------------------------------------------------------------ |
| 💬 **AI 리뷰 분석 채팅**    | 상품에 대해 자유롭게 질문하면 리뷰 기반으로 정확한 답변 제공 |
| 📦 **상품 등록 및 관리**    | 새 상품을 등록하고 CSV 형식의 리뷰 데이터를 업로드           |
| 📊 **리뷰 전체 요약**       | 수백 개의 리뷰를 한 번에 요약해서 핵심만 파악                |
| 🗂️ **마이 페이지**          | 내가 등록한 상품과 리뷰 수를 한눈에 확인                     |
| 💎 **플랜 업그레이드**      | 무료 / 프로 / 엔터프라이즈 요금제 선택                       |
| 🔍 **벡터 검색 (Pinecone)** | 리뷰를 벡터로 변환해 시맨틱 검색으로 관련 리뷰만 정확히 추출 |

---

## 🏗️ 기술 스택

### 프론트엔드
- **Next.js 16** — React 기반 풀스택 프레임워크
- **TypeScript** — 타입 안전성
- **Tailwind CSS** — 유틸리티 퍼스트 스타일링
- **Framer Motion** — 부드러운 UI 애니메이션
- **Lucide React** — 아이콘 라이브러리

### AI / 백엔드
- **LangChain** — LLM 오케스트레이션 프레임워크
- **OpenAI GPT** — 자연어 이해 및 답변 생성
- **Pinecone** — 리뷰 벡터 저장 및 시맨틱 검색
- **Supabase** — 상품·채팅·메시지 데이터 저장 (PostgreSQL)

---

## 🔄 동작 원리 (RAG 아키텍처)

```
사용자 질문
    │
    ▼
[Pinecone] ── 관련 리뷰 벡터 검색 ──▶ 관련 리뷰 추출
    │
    ▼
[LangChain + OpenAI] ── 리뷰 컨텍스트 + 질문 결합 ──▶ AI 답변 생성
    │
    ▼
사용자에게 답변 반환
```

1. **리뷰 인덱싱**: CSV로 업로드된 리뷰를 OpenAI 임베딩으로 변환해 Pinecone에 저장
2. **질문 처리**: 사용자 질문을 벡터로 변환해 유사한 리뷰를 검색
3. **답변 생성**: 검색된 리뷰 + 질문을 GPT에 전달해 자연어로 답변 생성

---

## 📁 프로젝트 구조

```
RAGLLM/
├── app/                    # Next.js 페이지 라우터
│   ├── page.tsx            # 웰컴 화면 (홈)
│   ├── intro/              # 상품 소개 페이지
│   ├── product/[id]/       # 상품 상세 & 리뷰 채팅
│   ├── mypage/             # 마이 페이지
│   ├── new-product/        # 새 상품 등록
│   ├── plan/               # 요금제 안내
│   └── api/                # 백엔드 API 라우트
│       ├── chat/           # 채팅 API (LangChain + Pinecone)
│       └── index-reviews/  # 리뷰 인덱싱 API
├── components/             # 재사용 UI 컴포넌트
│   ├── sidebar.tsx         # 사이드바 네비게이션
│   ├── chat-screen.tsx     # 채팅 화면
│   ├── welcome-screen.tsx  # 웰컴 화면
│   └── ...
├── lib/                    # 유틸리티 및 설정
│   ├── supabase.ts         # Supabase 클라이언트
│   ├── pinecone.ts         # Pinecone 클라이언트
│   └── products.ts         # 상품 데이터 관리
├── supabase/migrations/    # DB 마이그레이션 SQL
└── samples/                # 샘플 리뷰 CSV 데이터
```

---

## 🚀 로컬 실행 방법

### 1. 저장소 클론

```bash
git clone https://github.com/wqhekjbwdsaq123/RAGLLM.git
cd RAGLLM
```

### 2. 패키지 설치

```bash
npm install
```

### 3. 환경변수 설정

`.env.local` 파일을 생성하고 아래 값을 입력하세요:

```env
# OpenAI
OPENAI_API_KEY=sk-...

# Pinecone
PINECONE_API_KEY=...
PINECONE_INDEX_NAME=...

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://...supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

### 4. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 을 열면 앱이 실행됩니다.

---

## 📊 데이터베이스 구조 (Supabase)

| 테이블     | 설명                                                     |
| ---------- | -------------------------------------------------------- |
| `reviews`  | 상품 리뷰 데이터 (id, rating, title, content, author 등) |
| `chats`    | 채팅 세션                                                |
| `messages` | 채팅 메시지 기록                                         |

---

## 📝 사용 방법

1. **홈 화면**에서 분석할 상품을 선택합니다.
2. **상품 소개 페이지**에서 CSV 리뷰 파일을 업로드합니다.
3. **채팅 화면**에서 상품에 대해 자유롭게 질문합니다.
   - 예: _"이 제품 배터리 수명은 어때요?"_
   - 예: _"불만 사항이 주로 뭔가요?"_
4. AI가 실제 리뷰를 기반으로 답변을 생성합니다.

---

## 🤖 AI 모델 정보

- **LLM**: OpenAI GPT (gpt-4o-mini / gpt-4)
- **임베딩**: OpenAI `text-embedding-ada-002`
- **RAG 프레임워크**: LangChain
- **벡터 DB**: Pinecone
