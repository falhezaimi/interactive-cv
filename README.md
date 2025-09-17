# Interactive CV — Fares Alhezaimi

PDF-look résumé with a built-in chatbot that speaks in first person (as Fares). Ready for Vercel deploy.

## Quickstart
```bash
npm i
npm run dev
```

Open http://localhost:3000

## Configure (recommended)
- Create `content/resume.json` (already included) as your single source of truth.
- In Vercel → Project → Settings → Environment Variables:
  - `OPENAI_API_KEY` — enables polished answers in your voice.
  - `NEXT_PUBLIC_BASE_URL` — your site URL (e.g., https://your-site.vercel.app).

## Deploy on Vercel
1. Push this folder to GitHub.
2. Import repo on Vercel.
3. Set env vars above and redeploy.

## Print to PDF
Click **Download PDF** in the header (calls `window.print()` with print styles for a clean export).

## Notes
- The chatbot uses a simple RAG-lite keyword retrieval over `resume.json` and then calls the LLM (if available) with a strict persona prompt so answers sound like Fares and stay on-topic.
- To edit the page, see `app/page.tsx`. To edit the API, see `app/api/chat/route.ts`.
