# עודד אמר — Landing Page

Production-ready Hebrew RTL landing page for the entertainment brand "עודד אמר" by Oded Manster.

## Tech Stack

- **Framework**: Next.js 16 (App Router) + TypeScript
- **Styling**: Tailwind CSS v4 + Heebo font (Hebrew/RTL)
- **Storage**: Upstash Redis (content + leads CRM) via `@upstash/redis`
- **File storage**: Vercel Blob for image uploads
- **Email**: Resend
- **Spam protection**: Cloudflare Turnstile + honeypot + per-IP rate limiting
- **Auth**: HMAC-SHA256 signed session cookie (no external auth library)
- **Proxy/Middleware**: `proxy.ts` (Next.js 16 style)

## Project Structure

```
app/
  page.tsx                  # Landing page (server component)
  layout.tsx                # Root layout — RTL, Heebo font, metadata
  admin/                    # Password-protected admin area
    login/page.tsx          # Login form
    leads/page.tsx          # Leads CRM
    content/page.tsx        # Content editor
  api/
    contact/route.ts        # Lead submission endpoint
    admin/                  # Protected admin API routes
components/
  sections/                 # All landing page sections
  ui/                       # Shared UI components
lib/
  content.ts                # getContent() / setContent()
  defaultContent.ts         # Full Hebrew content seed data
  kv.ts                     # Upstash Redis wrapper with in-memory fallback
  blob.ts                   # Vercel Blob wrapper with dev stub
  auth.ts                   # Session signing/verification
  resend.ts                 # Email sender
  rateLimit.ts              # Per-IP rate limiter
types/
  content.ts                # SiteContent + Lead interfaces
proxy.ts                    # Route protection (Next.js 16 middleware)
```

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `ADMIN_PASSWORD` | Yes | Admin area password |
| `CONTACT_EMAIL` | For email | Receives lead notification emails |
| `RESEND_API_KEY` | For email | Get at resend.com |
| `UPSTASH_REDIS_REST_URL` | For KV | Upstash Redis endpoint |
| `UPSTASH_REDIS_REST_TOKEN` | For KV | Upstash Redis token |
| `BLOB_READ_WRITE_TOKEN` | For uploads | Vercel Blob token |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | For spam | Cloudflare Turnstile site key |
| `TURNSTILE_SECRET_KEY` | For spam | Cloudflare Turnstile secret |
| `NEXT_PUBLIC_SITE_URL` | For SEO | Full site URL (https://...) |
| `WEBHOOK_URL` | Optional | Webhook for leads (Make, Zapier, n8n) |

## Local Development

```bash
# 1. Install dependencies
npm install

# 2. Copy env example
cp .env.local.example .env.local
# Fill in ADMIN_PASSWORD at minimum

# 3. Run dev server
npm run dev

# 4. Open http://localhost:3000
```

Without Redis/Blob credentials, the app uses in-memory fallbacks — works fully for development.

## Admin Area

Visit `/admin` → redirected to login → enter `ADMIN_PASSWORD`.

- **Leads CRM** (`/admin/leads`): View all form submissions, filter, mark as handled
- **Content Editor** (`/admin/content`): Edit all Hebrew copy, images, FAQ items

## Content Architecture

All site content is stored as a single JSON object in Redis under key `site:content`. On first load, falls back to `lib/defaultContent.ts`. Update via the admin panel or directly via `PUT /api/admin/content`.

## Spam Protection (3 layers)

1. **Cloudflare Turnstile** — verified server-side on every form submission
2. **Honeypot field** — invisible to humans; bots fill it and get silently rejected
3. **Rate limiting** — max 10 submissions/hour per IP (in-memory)

## Webhook Payload

When `WEBHOOK_URL` is set, every lead is POSTed as JSON:

```json
{
  "id": "lead_1234567890_abc123",
  "createdAt": "2024-01-15T10:30:00.000Z",
  "handled": false,
  "fullName": "ישראל ישראלי",
  "phone": "050-0000000",
  "eventType": "אירוע חברה",
  "company": "חברה בע\"מ",
  "email": "israel@example.com",
  "eventDate": "2024-03-20",
  "participants": "100",
  "location": "תל אביב",
  "packageInterest": "ערב מעודד בלבד",
  "message": "הודעה חופשית",
  "source": "אתר"
}
```

## Deployment

```bash
# Build check
npm run build

# Deploy to Vercel (after vercel CLI login)
vercel --prod

# Or connect via Vercel dashboard → Import Git Repository
```

Set all environment variables in Vercel Dashboard → Project → Settings → Environment Variables.
