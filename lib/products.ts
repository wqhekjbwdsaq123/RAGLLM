export interface Product {
    id: string;
    name: string;
    category: string;
    description: string;
    longDescription: string;
    rating: number;
    reviewCount: number;
    sentiment: { positive: number; neutral: number; negative: number };
    pros: string[];
    cons: string[];
    scores: { label: string; value: number; color: string }[];
    price: string;
    imageUrl: string;
}

export const PRODUCTS: Product[] = [
    {
        id: "wireless-earbuds",
        name: "Premium Wireless Earbuds Pro",
        category: "오디오 장비",
        description: "업계 최고 수준의 노이즈 캔슬링과 30시간 배터리 수명",
        longDescription:
            "최신 액티브 노이즈 캔슬링 기술로 완벽한 몰입감을 선사하는 프리미엄 무선 이어버드. 멀티포인트 연결, 투명 모드, IPX5 방수 등 풍성한 기능을 갖추었습니다.",
        rating: 4.8,
        reviewCount: 328,
        sentiment: { positive: 85, neutral: 9, negative: 6 },
        pros: [
            "압도적인 노이즈 캔슬링 성능",
            "장시간 착용에도 가벼운 착감",
            "30시간 이상 배터리 지속",
            "멀티포인트 연결 완벽 지원",
        ],
        cons: [
            "케이스 크기가 다소 큼",
            "경쟁사 대비 가격이 높음",
            "터치 컨트롤 민감도 과도",
        ],
        scores: [
            { label: "가격 대비 가치", value: 4.2, color: "bg-blue-500" },
            { label: "음질", value: 4.9, color: "bg-purple-500" },
            { label: "내구성", value: 4.5, color: "bg-green-500" },
        ],
        price: "₩349,000",
        imageUrl: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&h=600&fit=crop",
    },
    {
        id: "smart-watch",
        name: "FitTrack Ultra Smartwatch",
        category: "웨어러블",
        description: "건강 모니터링부터 결제까지, 당신의 일상을 스마트하게",
        longDescription:
            "심박수, 혈중 산소, 수면 트래킹, GPS 내장 등 포괄적인 건강 관리 기능을 제공하는 올인원 스마트워치. 7일 배터리와 5ATM 방수를 갖춰 언제 어디서나 믿을 수 있습니다.",
        rating: 4.3,
        reviewCount: 215,
        sentiment: { positive: 72, neutral: 15, negative: 13 },
        pros: [
            "정확한 건강 지표 측정",
            "7일 배터리 수명",
            "GPS 내장으로 별도 폰 불필요",
            "5ATM 방수 지원",
        ],
        cons: [
            "앱 연동이 가끔 끊김",
            "작은 화면에 정보 밀도 높음",
            "고급 기능은 구독 필요",
        ],
        scores: [
            { label: "가격 대비 가치", value: 3.9, color: "bg-blue-500" },
            { label: "정확도", value: 4.6, color: "bg-purple-500" },
            { label: "디자인", value: 4.1, color: "bg-green-500" },
        ],
        price: "₩289,000",
        imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=600&fit=crop",
    },
    {
        id: "robot-vacuum",
        name: "CleanBot AI 로봇청소기",
        category: "가전제품",
        description: "AI 장애물 회피와 자동 물걸레 세척으로 진화한 청소",
        longDescription:
            "LiDAR 센서와 AI 비전을 결합해 가구 하나하나를 인식하고 최적 경로를 스스로 설계합니다. 자동 먼지통 비움 기능과 물걸레 자동 세척 기능까지 갖춰 완전 자동화를 실현했습니다.",
        rating: 4.6,
        reviewCount: 184,
        sentiment: { positive: 80, neutral: 12, negative: 8 },
        pros: [
            "AI 장애물 인식으로 꼼꼼한 청소",
            "자동 먼지통 비움 기능",
            "조용한 작동음",
            "앱으로 구역 지정 청소",
        ],
        cons: [
            "초기 세팅이 복잡함",
            "필터 교체 비용 발생",
            "카펫 경계 간혹 미인식",
        ],
        scores: [
            { label: "청소 성능", value: 4.8, color: "bg-blue-500" },
            { label: "소음", value: 4.4, color: "bg-purple-500" },
            { label: "앱 연동", value: 4.0, color: "bg-green-500" },
        ],
        price: "₩520,000",
        imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop",
    },
    {
        id: "standing-desk",
        name: "ErgoDesk Pro 전동 책상",
        category: "홈오피스",
        description: "원터치 높이 조절로 앉아서도 서서도 편안한 작업 환경",
        longDescription:
            "4개의 메모리 프리셋, 듀얼 모터, 50kg 하중 지지. 케이블 정리 트레이와 USB 충전 허브가 일체형으로 포함됩니다. 조용한 모터로 사무실 환경에서도 방해 없이 높이 조절 가능합니다.",
        rating: 4.5,
        reviewCount: 97,
        sentiment: { positive: 78, neutral: 14, negative: 8 },
        pros: [
            "4개 높이 메모리 프리셋",
            "조용한 듀얼 모터",
            "50kg 하중 거뜬히 지지",
            "케이블 정리 트레이 내장",
        ],
        cons: [
            "조립 시간이 길고 복잡함",
            "무게가 무거워 이동 불편",
            "유리 상판 지문 잘 묻음",
        ],
        scores: [
            { label: "조립 편의성", value: 3.5, color: "bg-blue-500" },
            { label: "안정성", value: 4.7, color: "bg-purple-500" },
            { label: "내구성", value: 4.8, color: "bg-green-500" },
        ],
        price: "₩680,000",
        imageUrl: "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=800&h=600&fit=crop",
    },
    {
        id: "air-purifier",
        name: "PureAir Max 공기청정기",
        category: "건강/환경",
        description: "HEPA 14 필터 + UV 살균으로 99.97% 유해 입자 제거",
        longDescription:
            "HEPA 14 등급 필터와 UV-C 살균 램프를 동시에 탑재한 올인원 공기청정기. 실시간 PM2.5 센서와 자동 모드로 공기 질에 따라 풍량을 스스로 조절합니다. 32평 이상도 쾌적하게 커버합니다.",
        rating: 4.7,
        reviewCount: 261,
        sentiment: { positive: 83, neutral: 11, negative: 6 },
        pros: [
            "HEPA 14 등급 필터 탑재",
            "PM2.5 실시간 측정",
            "자동 풍량 조절",
            "밤새 저소음 취침 모드",
        ],
        cons: [
            "필터 교체 주기가 짧음",
            "최대 풍량 시 소음 있음",
            "앱 UI가 직관적이지 않음",
        ],
        scores: [
            { label: "필터 성능", value: 4.9, color: "bg-blue-500" },
            { label: "소음", value: 4.2, color: "bg-purple-500" },
            { label: "에너지 효율", value: 4.5, color: "bg-green-500" },
        ],
        price: "₩399,000",
        imageUrl: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=800&h=600&fit=crop",
    },
    {
        id: "coffee-machine",
        name: "BrewMaster Pro 커피머신",
        category: "주방가전",
        description: "바리스타 수준의 에스프레소를 집에서, 원두 분쇄부터 추출까지",
        longDescription:
            "내장 버 그라인더, 15bar 압력 펌프, 정밀 온도 제어로 카페 수준의 에스프레소를 구현합니다. 스팀 완드로 라떼 아트까지 가능하며, 예약 추출 기능으로 기상 직후 신선한 커피를 즐길 수 있습니다.",
        rating: 4.4,
        reviewCount: 143,
        sentiment: { positive: 76, neutral: 13, negative: 11 },
        pros: [
            "내장 그라인더로 신선한 원두",
            "15bar 고압 추출",
            "정밀 온도 제어",
            "예약 추출 기능",
        ],
        cons: [
            "청소와 유지관리 번거로움",
            "기계음이 다소 큰 편",
            "초보자에게 러닝커브 있음",
        ],
        scores: [
            { label: "커피 품질", value: 4.9, color: "bg-blue-500" },
            { label: "사용 편의성", value: 3.8, color: "bg-purple-500" },
            { label: "내구성", value: 4.4, color: "bg-green-500" },
        ],
        price: "₩450,000",
        imageUrl: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&h=600&fit=crop",
    },
];

export function getProduct(id: string): Product | undefined {
    return PRODUCTS.find((p) => p.id === id);
}
