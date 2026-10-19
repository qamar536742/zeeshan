# ZEESHAN — Graphic Designer Portfolio

A responsive premium navy/gold portfolio with your uploaded ZGD logo and portrait, animated sections, mobile navbar, portfolio gallery/lightbox, project-specific WhatsApp inquiry and password-protected admin dashboard.

## Features
- Custom branded responsive layout and scroll animations
- Add/edit/delete/reorder projects from `/admin`
- Upload a project image; optional external demo website URL
- Click image or **LIVE PREVIEW** for full-size lightbox, open external demo when provided
- Per-project WhatsApp request, including project title, category, description and demo/image URL, starting with “Hi Zeeshan! I want this type of banner/design.”
- Edit headings, biography, WhatsApp number, logo, portrait, services, skills, and navbar
- Supabase PostgreSQL + public image bucket as durable cloud storage
- Server-only service-role key, HttpOnly 8-hour session, secure cookie in production, authenticated mutations

## Important security
The requested admin username is `zeeshan`. You requested password `1233245` — configure it as `ADMIN_PASSWORD` in your private `.env.local` or Vercel environment settings, **not in GitHub source code**. That password is easy to guess. Replace it with a strong password before making the website public. The admin login fails closed until credentials and `SESSION_SECRET` are configured.

## Run locally
1. Install **Node.js 20 or later**.
2. In the folder run `npm install`.
3. Copy `.env.example` to `.env.local`.
4. Create Supabase project at https://supabase.com. Go to **SQL Editor**, run `supabase/schema.sql` (creates `projects`, `site_settings`, public `portfolio` bucket).
5. In Supabase **Project Settings > API**, copy **Project URL** and **service_role secret** to `.env.local`. Keep service-role secret private.
6. Set `ADMIN_USERNAME=zeeshan`, `ADMIN_PASSWORD=<your private password>`, `SESSION_SECRET=<random at least 32 characters>`. To generate: `node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"`.
7. Run `npm run dev`, open http://localhost:3000 and http://localhost:3000/admin.
8. Add portfolio projects in admin. The three stylish demo cards are **illustrative placeholders only** until the database is configured. They are not Zeeshan's actual past projects. Once Supabase is connected, your real project list starts empty.

## Publish with GitHub + Vercel
1. Push the project to a **private GitHub repo** (do not upload `.env.local`).
2. Visit https://vercel.com/new and import the repo.
3. Framework preset: **Next.js**. Build command: `npm run build`. Root directory: repo root.
4. Before deployment, add Vercel environment variables for Production, Preview and Development:
   - `ADMIN_USERNAME` — `zeeshan`
   - `ADMIN_PASSWORD` — your PRIVATE admin password
   - `SESSION_SECRET` — secure random secret 32+ characters
   - `SUPABASE_URL` — your Supabase project URL
   - `SUPABASE_SERVICE_ROLE_KEY` — service_role secret (server-only)
   - `SUPABASE_STORAGE_BUCKET` — `portfolio`
5. Deploy and visit `https://your-project.vercel.app/admin`.
6. Upload project images / replace brand images in the admin. Files are stored in Supabase storage, not local Vercel filesystem.
7. Add the exact live demo URL for external website demos; project pictures open in a built-in full-size preview even without a demo URL.

### Updating code after deployment
`git add . && git commit -m "Update site" && git push` then Vercel redeploys automatically. Updating text, projects, logo, or navbar in Admin **does not require** redeployment.

## Files
- `app/page.tsx` — server-loaded homepage
- `components/Portfolio.tsx` — animated portfolio layout
- `app/admin/page.tsx` and `components/Dashboard.tsx` — admin dashboard
- `app/api/admin/*` — authenticated endpoints
- `lib/db.ts` — server-only Supabase REST/Storage access
- `lib/auth.ts` — signed HTTP-only admin session
- `supabase/schema.sql` — database and bucket setup
- `public/images` — supplied initial images

## Notes
- WhatsApp number defaults to `+92 343 3319516`.
- Images are public so they can display on the website. Do not upload private documents.
- The site does not process payments or collect customer contact data.
- Images are limited to 8MB each. JPG/PNG/WebP/GIF are accepted.
- For production-scale use, consider request rate-limiting on the admin login and enabling MFA via an external identity provider.
