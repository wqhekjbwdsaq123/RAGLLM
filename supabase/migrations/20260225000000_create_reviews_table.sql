-- Create reviews table
CREATE TABLE IF NOT EXISTS reviews (
    id BIGINT PRIMARY KEY,
    rating INTEGER,
    title TEXT,
    content TEXT,
    author TEXT,
    date DATE,
    helpful_votes INTEGER,
    verified_purchase BOOLEAN,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for public access (anon role)
CREATE POLICY "Allow public all access"
ON reviews FOR ALL
TO anon, authenticated
USING (true)
WITH CHECK (true);
