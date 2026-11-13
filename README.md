# Hushlane Labs

Static marketing site for [hushlanelabs.com](https://hushlanelabs.com). Tagline: **Your brand. Our build.**

White-label tech, product, and AI automation for agencies in the USA, UK, Australia, and Canada. There is no database and no admin panel. Case studies and notes are MDX files. The contact form posts to a Google Sheet.

## Folder structure

```text
content/
  blog/                         MDX notes
  case-studies/                 MDX case studies
scripts/
  google-apps-script.js         Sheet + email endpoint
src/
  app/
    layout.tsx                  Fonts, header, footer, global schema
    page.tsx                    Home
    opengraph-image.tsx         Generated OG image
    twitter-image.tsx           Same image for Twitter
    apple-icon.tsx              Generated apple touch icon
    icon.svg
    sitemap.ts
    robots.ts
    services/                   Overview + /services/[slug]
    how-we-work/
    pricing/
    work/                       Case study list + detail
    about/
    contact/
    blog/
    privacy/
    terms/
  components/
    ui/                         shadcn/ui
    site/                       Header, footer, theme, motion
    contact/contact-form.tsx
    mdx/mdx-content.tsx
    seo/json-ld.tsx
  lib/
    site.ts                     Name, URL, email, nav
    services.ts                 Keyword-page copy
    content.ts                  MDX loader
    seo.ts                      Metadata + JSON-LD
src/lib/contact.ts              Form schema
```

## Stack

Next.js App Router, TypeScript, Tailwind CSS, shadcn/ui, Framer Motion, MDX. `output: 'export'` writes a static site to `out/`.

`next/image` optimization needs a server, so this project sets `images.unoptimized`. Ship compressed assets in `public/` when you add photos. SVG and the generated Open Graph image cover the current pages.

## Setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

Production files:

```bash
npm run build
npx serve out
```

`NEXT_PUBLIC_*` values are baked in at build time. Changing the webhook, analytics IDs, or site URL requires a new build.

Edit the brand email and markets in `src/lib/site.ts`. Replace the sample case studies in `content/case-studies/` before you announce client work. Both are marked `placeholder: true`.

## Contact form → Google Sheets

1. Create a Google Sheet. Copy the ID from the URL: `https://docs.google.com/spreadsheets/d/<SHEET_ID>/edit`.
2. Extensions → Apps Script. Replace the sample with `scripts/google-apps-script.js`.
3. Set `SHEET_ID` and `NOTIFY_EMAIL`. Optionally set `FORM_TOKEN` to the same value as `NEXT_PUBLIC_FORM_TOKEN`.
4. Deploy → New deployment → type **Web app**.
5. Execute as **Me**. Who has access: **Anyone**.
6. Authorize the script when Google asks. Copy the web app URL (`https://script.google.com/macros/s/.../exec`).
7. Put that URL in `NEXT_PUBLIC_SHEETS_WEBHOOK_URL`.
8. Rebuild and redeploy the site. Open the script URL in a browser first. You should see `Hushlane form endpoint is running.`
9. Submit the contact form, then check the sheet and your inbox.

The browser posts `text/plain` JSON with `mode: "no-cors"`. Apps Script does not answer a CORS preflight, so the site cannot read the script’s response. A network failure shows an error. A script bug can still look like success in the browser. Confirm the first real submission in the sheet.

If you change the script, deploy a **new version**. The old `/exec` URL keeps serving the previous deployment until you do.

A hidden fax field is a honeypot. Submissions that fill it are dropped. Do not put passwords or customer records in the form. The [confidentiality section](src/lib/process.ts) says the NDA comes first.

## Deploy

### Firebase Hosting

Project: `hushlanelabs`. The built site in `out/` is what gets published. The web `initializeApp` config is stored in environment variables for a later client feature. Marketing pages do not load the Firebase SDK.

1. The client config lives in `.env.local` and `src/lib/firebase.ts`. Nothing on the public site imports it yet.
2. `npx firebase-tools login`
3. `npm run hosting:deploy`
4. In Firebase Console → Hosting → Add custom domain, add `hushlanelabs.com` and `www.hushlanelabs.com`.
5. Copy the DNS records Firebase shows. Point the apex and `www` at those records, and redirect `www` to the apex. `NEXT_PUBLIC_SITE_URL` stays `https://hushlanelabs.com`.
6. The first publish is `https://hushlanelabs.web.app` until the custom domain finishes provisioning.

### Vercel

1. Import the Git repository. Framework preset: Next.js. Do not set a custom output directory. Vercel understands `output: 'export'`.
2. Add the variables from `.env.example` in Project → Settings → Environment Variables, then deploy.
3. Project → Settings → Domains → add `hushlanelabs.com` and `www.hushlanelabs.com`.
4. At the DNS host:
   - `A` record `@` → `76.76.21.21`
   - `CNAME` `www` → `cname.vercel-dns.com`
5. Redirect `www` to the apex in Vercel so the canonical host is `https://hushlanelabs.com`.
6. If DNS is on Cloudflare and the site is on Vercel, set the records to **DNS only** (grey cloud). An orange-cloud proxy in front of Vercel often breaks certificate issuance.

### Cloudflare Pages

1. Workers & Pages → Create → Pages → Connect to Git.
2. Build command: `npm run build`. Build output directory: `out`.
3. Environment variables: the same `.env.example` keys. Set Node.js to 20 or newer.
4. Custom domains → add `hushlanelabs.com`. If the domain is already on Cloudflare, accept the DNS records Pages offers.
5. Redirect `www` to the apex under Bulk Redirects, or add `www` as a domain and set the apex as primary. `NEXT_PUBLIC_SITE_URL` must match the canonical host.

## Analytics and Search Console

- Google Tag Manager: `GTM-PCW867CZ` loads on every page. Put the Google Analytics tag inside that container. A direct `G-` ID still works via `NEXT_PUBLIC_GA_MEASUREMENT_ID` if you are not using the container for it.
- Sitemap: `https://hushlanelabs.com/sitemap.xml`
- Plausible: set `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` to `hushlanelabs.com`.
- Leave either blank to skip that script.
- Search Console: add the URL-prefix property `https://hushlanelabs.com`. Choose the HTML tag method, copy only the `content` value into `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`, rebuild, then confirm. Submit `https://hushlanelabs.com/sitemap.xml`.

## Pre-launch SEO checklist

- [ ] `NEXT_PUBLIC_SITE_URL` is `https://hushlanelabs.com` with no trailing slash
- [ ] Apex canonical, `www` redirects to it, HTTPS works
- [ ] Replace sample case studies or keep the Sample label until you have permission
- [ ] Unique title and description on every indexable URL (view source)
- [ ] One visible H1 per page
- [ ] Share debugger shows the generated OG image (LinkedIn, Slack, or X)
- [ ] `robots.txt` points at the sitemap
- [ ] Search Console verified, sitemap submitted, no accidental `noindex`
- [ ] Contact form writes a row and sends mail
- [ ] Privacy and terms reviewed by counsel (these are starter templates)
- [ ] Analytics fires only if you meant to enable it
- [ ] Internal links between the five service pages, pricing, and case studies still resolve
- [ ] Lighthouse on `/`, one service page, and `/contact` (mobile). Target 95+ 

## Adding a case study or note

Create `content/case-studies/<slug>.mdx` or `content/blog/<slug>.mdx` with the frontmatter the loader expects (`src/lib/content.ts`). Rebuild. The sitemap picks the file up. Blog posts stay out of the header. The footer links to Notes.

Service page copy lives in `src/lib/services.ts`, not in MDX, so the keyword pages stay structured.
