import { CSVLoader } from "@langchain/community/document_loaders/fs/csv";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';

export interface Review {
    id: number;
    rating: number;
    title: string;
    content: string;
    author: string;
    date: string;
    helpful_votes: number;
    verified_purchase: boolean;
}

export async function processCSVForRAG(filePath: string) {
    const loader = new CSVLoader(filePath, {
        column: "content" // Focus on the review content
    });

    const docs = await loader.load();

    const splitter = new RecursiveCharacterTextSplitter({
        chunkSize: 500,
        chunkOverlap: 50,
    });

    const splitDocs = await splitter.splitDocuments(docs);
    return splitDocs;
}

export function loadRawReviews(filePath: string): Review[] {
    const fullPath = path.resolve(process.cwd(), filePath);
    const fileContent = fs.readFileSync(fullPath, 'utf-8');

    return parse(fileContent, {
        columns: true,
        skip_empty_lines: true,
        bom: true, // This strips the BOM from the first column name
        cast: (value, context) => {
            if (['id', 'rating', 'helpful_votes'].includes(context.column as string)) {
                return parseInt(value, 10);
            }
            if (context.column === 'verified_purchase') {
                return value.toLowerCase() === 'true';
            }
            return value;
        }
    });
}
