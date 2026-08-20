# Fares Alhezaimi — Interactive CV

A mobile-first research portfolio and grounded AI CV focused on thermal remote sensing, wildfire research, scientific software, ecological machine learning, and geospatial product engineering.

## Stack

- Next.js 16 and React 19
- TypeScript
- OpenAI Responses API
- Zod request validation
- CSS design system with no UI framework dependency
- Vercel deployment

## Local development

```bash
npm install
cp .env.example .env.local
npm run dev
```

The site works without an OpenAI key: the assistant returns deterministic answers from the verified CV knowledge base. Add `OPENAI_API_KEY` to enable model-generated answers.

## Environment variables

| Variable | Required | Purpose |
| --- | --- | --- |
| `OPENAI_API_KEY` | No | Enables the live grounded AI assistant. |
| `OPENAI_MODEL` | No | Overrides the default `gpt-5-mini` model. |

Keep these values server-side. Do not prefix them with `NEXT_PUBLIC_`.

## Content updates

All portfolio and assistant source content lives in:

```text
app/content/profile.ts
```

The visible site and AI knowledge base are maintained together to reduce drift. Claims about ECOSTRESS active-fire work are intentionally marked as preliminary research.

## Validation

```bash
npm run lint
npm run typecheck
npm run build
```

## Vercel

The existing Vercel project should rebuild automatically when `main` is updated. Confirm `OPENAI_API_KEY` in the Vercel project settings if live model responses are desired. Without it, the grounded fallback remains available.
