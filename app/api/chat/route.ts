import { NextResponse } from 'next/server';
import { pinecone, indexName, pineconeEmbeddings } from '@/lib/pinecone';
import { PineconeStore } from '@langchain/pinecone';
import { ChatOpenAI } from '@langchain/openai';

export async function POST(req: Request) {
    try {
        const { message } = await req.json();

        if (!message) {
            return NextResponse.json({ error: 'Message is required' }, { status: 400 });
        }

        const pineconeIndex = pinecone.Index(indexName);
        const vectorStore = await PineconeStore.fromExistingIndex(pineconeEmbeddings, {
            pineconeIndex,
        });

        // Similarity search for top 3 results
        const results = await vectorStore.similaritySearch(message, 3);

        const llm = new ChatOpenAI({
            modelName: "gpt-5-nano",
        });

        const context = results.map(doc => doc.pageContent).join('\n---\n');

        const prompt = `당신은 제품 리뷰를 분석하는 친절한 AI 어시스턴트입니다.
사용자의 질문에 답변할 때 다음 규칙을 따르세요:
1. 사용자가 "안녕", "ㅎㅇ", "반가워" 등 단순한 인사말을 건네면, 억지로 리뷰를 요약하지 말고 자연스럽게 인사하며 "저는 제품 리뷰 분석 AI입니다. 제품에 대해 궁금한 점을 물어보세요!"라고 안내하세요.
2. 사용자의 질문이 제품 리뷰와 관련된 것이라면, 아래의 [리뷰 컨텍스트]를 기반으로 정확하게 답변하세요.
3. 한국어로 자연스럽게 답변하세요.

[리뷰 컨텍스트]
${context}

사용자 질문: ${message}
`;

        const response = await llm.invoke(prompt);

        return NextResponse.json({
            answer: response.content,
            results: results.map(doc => ({
                content: doc.pageContent,
                metadata: doc.metadata
            }))
        });
    } catch (error: any) {
        console.error('Chat API failed:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
