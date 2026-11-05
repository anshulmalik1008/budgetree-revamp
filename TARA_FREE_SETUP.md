# Tara AI — Budgetree deployment

The original **Tara widget from the user's tara-assistant.zip** is installed as `public/budgetree-assistant.js` and loaded from `src/app/layout.tsx`. The previous `src/components/SiteSearchAssistant.tsx` was removed. The main website remains on Next.js 14.

## Available with no paid account

- Original Tara interface (chat, voice screen, contact handoff, responsive UI)
- Budgetree website knowledge through `POST /api/assistant/chat` → `/api/assistant`
- Hindi/English/Hinglish support and follow-ups
- Browser speech recognition and permitted installed named female voices
- Visitor-side conversation history
- Protected admin dashboard code (disabled until admin password is set)

The old Tara ZIP required Anthropic; the integrated version does **not** require it for the default website-knowledge answers.

## Optional free-tier services (user's own accounts required)

| Environment variable | Purpose | Important |
|---|---|---|
| `GEMINI_API_KEY` | Gemini natural-language answers | Google AI Studio eligible free tier, subject to usage quotas and data terms |
| `GEMINI_ASSISTANT_MODEL` | Default `gemini-2.5-flash-lite` | Only change to an available model |
| `AZURE_SPEECH_KEY` | Server text-to-speech | Azure Speech F0 free tier may require account/billing verification |
| `AZURE_SPEECH_REGION` | Azure Speech region (e.g. `centralindia`) | Swara Hindi / Neerja Indian English |
| `UPSTASH_REDIS_REST_URL` | Persistent lead database | Upstash free Redis |
| `UPSTASH_REDIS_REST_TOKEN` | Redis REST authentication | Keep secret in Vercel |
| `ADMIN_PASSWORD` | Activate `/admin` | Minimum 12 characters; Basic auth username `admin` |
| `LOG_CHATS` | Set `true` only with privacy notice/consent for server logs | Off by default |
| `CHAT_RETENTION_DAYS` | Conversation log expiry | Default 30 days |

**Do not place API secrets in repository code, messages, or client-side scripts.** Configure them in Vercel project Settings → Environment Variables, then redeploy.

## Endpoints and protections

- `/api/assistant/chat`: streams newline-delimited JSON to original Tara widget.
- `/api/assistant/tts`: optional MP3 through Azure F0; falls back to selected installed browser female voices if not configured.
- `/api/assistant/config`: exposes only public widget settings.
- `/api/assistant/lead`: accepts consented leads and confirms success **only after a Redis write**.
- `/admin`, `/admin/leads`, `/admin/chats`, `/admin/health`: protected by middleware; disabled with HTTP 503 until admin password exists.
- `/api/admin/export`: authenticated CSV export with spreadsheet-formula-injection protection.

## Important limitations

1. These free tiers do not give unlimited API quotas. The user must create/authorize their own service accounts and keys.
2. Without Azure, identical Indian female voice across all visitors cannot be guaranteed by browser voice services; the widget will not intentionally pick a male browser voice.
3. Without Redis, lead submission responds unavailable instead of falsely promising the lead was saved.
4. The standalone ZIP's overnight website crawler, Anthropic billing flow, Resend notifications, and full stand-alone admin tools are **not enabled** in this integration. The website includes a maintained curated knowledge index. Do not claim daily automatic live sync is active.
5. The user-supplied standalone code targeted Next.js 15, so its original widget is retained but its server endpoints have been adapted to the existing Next.js 14 deployment.

## Verification

GitHub Actions runs `npx tsc --noEmit` and `npm run build` on each push. Confirm Vercel deployment status independently before declaring a new revision live.
