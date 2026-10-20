#!/usr/bin/env bash
# Script to launch Finu Anniversary Website
export PATH="/Users/mohammednazim/.gemini/antigravity/scratch/.node/bin:$PATH"
cd "$(dirname "$0")"

echo "❤️ Starting Finu's 7th Anniversary Website..."
echo "👉 Opening at http://localhost:5173"

npm run dev -- --host --port 5173
