# quiz-ai

AI-powered quiz funnel with personalized chat analysis. Users go through a short quiz, submit their email, and receive a tailored AI analysis via chat interface.

## Stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4** + **shadcn/ui**
- **Zustand** — client state
- **Supabase** — event tracking
- **DeepSeek** (via OpenRouter) — AI analysis

## Funnel

`/` → `/quiz` → `/email` → `/chat` → `/paywall`

Debug events: `/debug/events`

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
SUPABASE_SECRET_KEY=
OPENROUTER_API_KEY=
```
