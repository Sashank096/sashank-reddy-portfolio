# Sashank Reddy Sathi — Portfolio

Next.js 15 (App Router) + TypeScript. Chat-first home page, light/dark theme, global search, project and skill filters, and a contact form that emails you.

## Run locally
```bash
npm install
cp .env.example .env.local   # then add your Resend key (and optional OpenAI key)
npm run dev                  # http://localhost:3000
```

## Contact form → your inbox (Resend, free)
1. Sign up at https://resend.com using **sathisashankreddy@gmail.com** (the free test sender only delivers to your own sign-up email).
2. Create an API key.
3. For local testing, copy `.env.example` to `.env.local` and replace `RESEND_API_KEY` with your real key. Never commit `.env.local`.
4. On Vercel: Project → Settings → Environment Variables, add
   - `RESEND_API_KEY` = your key
   - `CONTACT_TO_EMAIL` = sathisashankreddy@gmail.com
   - `RESEND_FROM_EMAIL` = `Portfolio <onboarding@resend.dev>` for the Resend test sender, or a sender address on a domain verified with Resend
5. Redeploy. Replies go to the visitor because their email is set as Reply-To.

The chat works without an AI key and displays a fallback for free-form questions. To enable
fact-grounded answers, add `OPENAI_API_KEY` as a server-only environment variable (never prefix it
with `NEXT_PUBLIC_`). Optionally set `OPENAI_MODEL`; the default is `gpt-4o-mini`.

## Deploy
Push to GitHub → import the repo on Vercel → add the two variables → Deploy.

## Edit your content
| What | File |
| --- | --- |
| Name, bio, email, phone, links | `data/site.ts` |
| Projects (GitHub/live links, tags) | `data/projects.ts` |
| Skills | `data/skills.ts` |
| Education, internship, certifications | `data/experience.ts` |
| Profile photo | `public/images/profile.jpg` |
| Project cover images | `public/images/projects/` (replace with real screenshots, same file names) |
| Resume | `public/resume.pdf` |
| Memoji expressions | `public/images/memoji/default.png`, `thinking.png`, `projects.png`, `skills.png`, `fun.png`, `contact.png` |
| Postcard photos | Add images under `public/images/postcards/` and set their paths in `data/postcards.ts` |
| Days journal entries | `data/days.ts` |
