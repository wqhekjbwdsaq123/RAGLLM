import { NextResponse } from 'next/server';
import { processCSVForRAG, loadRawReviews } from '@/lib/document-processor';
import { pinecone, indexName, pineconeEmbeddings } from '@/lib/pinecone';
import { PineconeStore } from '@langchain/pinecone';
import { supabase } from '@/lib/supabase';
import path from 'path';

export async function POST() {
    try {
        const filePath = path.join(process.cwd(), 'samples', 'review.csv');

        // 1. Process for RAG (Pinecone)
        console.log('Starting indexing for Pinecone...');
        const splitDocs = await processCSVForRAG(filePath);

        const pineconeIndex = pinecone.Index(indexName);

        // Clear existing vectors to prevent duplicates across multiple indexings
        try {
            await pineconeIndex.deleteAll();
            console.log('Cleared existing Pinecone index.');
        } catch (e) {
            console.log('Could not clear Pinecone index (might be empty):', e);
        }

        // Upload to Pinecone using LangChain PineconeStore
        await PineconeStore.fromDocuments(splitDocs, pineconeEmbeddings, {
            pineconeIndex,
        });
        console.log('Pinecone indexing complete.');

        // 2. Process for Database (Supabase)
        console.log('Starting sync with Supabase...');
        const rawReviews = loadRawReviews(filePath);
        const { error } = await supabase
            .from('reviews')
            .upsert(rawReviews, { onConflict: 'id' });

        if (error) {
            console.error('Supabase upsert error:', error);
            return NextResponse.json({ error: 'Failed to sync with Supabase: ' + error.message }, { status: 500 });
        }
        console.log('Supabase sync complete.');

        return NextResponse.json({ message: 'Indexing complete', totalReviews: rawReviews.length, documentChunks: splitDocs.length });
    } catch (error: any) {
        console.error('Indexing failed:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
