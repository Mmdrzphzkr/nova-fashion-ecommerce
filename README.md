# Nova

## Local development

1. Copy `.env.example` to `.env.local` and set `DATABASE_URL` to a Neon connection string.
   Use Neon’s pooled connection string for the application.
2. Install dependencies with `npm install`.
3. Apply the committed database migrations with `npm run db:migrate`.
4. Start the app with `npm run dev`.

`DATABASE_URL_UNPOOLED` is optional for local work. Drizzle Kit prefers it when
present, which is useful for migrations; otherwise it uses `DATABASE_URL`.
Generate future migrations with `npm run db:generate` and commit the resulting
files in `drizzle/`.

## Deploy to Vercel with Neon

1. Create a Neon project and connect the repository to Vercel.
2. In Vercel **Project Settings → Environment Variables**, set `DATABASE_URL`
   to Neon’s pooled connection string for every environment you use.
3. Optionally set `DATABASE_URL_UNPOOLED` to Neon’s direct (unpooled) connection
   string for migration commands. Keep both values private; do not commit them.
4. Before serving the deployment, apply migrations using
   `DATABASE_URL_UNPOOLED` (or `DATABASE_URL`) in a trusted environment:
   `npm run db:migrate`.
5. Deploy with Vercel’s default Next.js build and output settings. Check
   `/api/health` on the deployed URL; it returns success only when the database
   is reachable.

The database client is initialized on first database use, so a production
connection string is not needed just to build the app.
