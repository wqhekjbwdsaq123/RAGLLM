import { Pinecone } from '@pinecone-database/pinecone';
import { Embeddings, EmbeddingsParams } from '@langchain/core/embeddings';

export const pinecone = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY!,
});

export const indexName = 'review-chatbot';
export const modelName = 'llama-text-embed-v2';
const BATCH_SIZE = 90;

/**
 * Custom Embeddings class that uses Pinecone's Inference API with correct response parsing.
 */
export class PineconeInferenceEmbeddings extends Embeddings {
    private model: string;
    private pc: Pinecone;

    constructor(fields: EmbeddingsParams & { model: string; pc: Pinecone }) {
        super(fields);
        this.model = fields.model;
        this.pc = fields.pc;
    }

    async embedDocuments(texts: string[]): Promise<number[][]> {
        try {
            console.log(`Embedding ${texts.length} documents using ${this.model} (Batching: ${BATCH_SIZE})...`);

            const results: number[][] = [];

            for (let i = 0; i < texts.length; i += BATCH_SIZE) {
                const batch = texts.slice(i, i + BATCH_SIZE);
                const response = await this.pc.inference.embed(
                    this.model,
                    batch,
                    { inputType: 'passage' }
                );

                // Pinecone SDK returns an object with 'data' property
                const data = (response as any).data;

                if (!data || !Array.isArray(data)) {
                    console.error('Unexpected Pinecone Inference response in batch:', response);
                    throw new Error('Pinecone Inference API returned an invalid response structure.');
                }

                results.push(...data.map((e: any) => e.values as number[]));
            }

            return results;
        } catch (error) {
            console.error('Pinecone embedDocuments failed:', error);
            throw error;
        }
    }

    async embedQuery(text: string): Promise<number[]> {
        try {
            console.log(`Embedding query using ${this.model}...`);
            const response = await this.pc.inference.embed(
                this.model,
                [text],
                { inputType: 'query' }
            );

            const data = (response as any).data;

            if (!data || !Array.isArray(data) || data.length === 0) {
                console.error('Unexpected Pinecone Inference response for query:', response);
                throw new Error('Pinecone Inference API returned an invalid response structure for query.');
            }

            return data[0].values as number[];
        } catch (error) {
            console.error('Pinecone embedQuery failed:', error);
            throw error;
        }
    }
}

export const pineconeEmbeddings = new PineconeInferenceEmbeddings({
    model: modelName,
    pc: pinecone
});
