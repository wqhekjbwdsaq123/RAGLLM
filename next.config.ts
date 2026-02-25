import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    // Vercel 서버리스 함수 최대 실행 시간 (초) - AI 응답 지연 대응
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
};

export default nextConfig;
