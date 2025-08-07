# RoastMe - A Platform for Comedic Roasts

RoastMe is a social platform where users can submit photos and request to be "roasted" by the community. The platform features a gamified experience with leaderboards, achievements, and a voting system for the best roasts.

## Features

- User authentication and profile management
- Photo uploads for roasting
- Roast submission, voting, and ranking
- Leaderboards for top roasters
- XP and leveling system
- Moderation features to flag inappropriate content
- Responsive design for all devices

## Tech Stack

- **Frontend**: Next.js, React, TypeScript, TailwindCSS
- **Backend**: Supabase (PostgreSQL, Authentication, Storage)
- **Deployment**: Vercel/Netlify/Docker
- **CI/CD**: GitHub Actions

## Local Development Setup

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/roast-me-rank.git
cd roast-me-rank
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up Supabase**

- Create a Supabase project at https://supabase.com
- Copy the SQL from `supabase/schema.sql` and run it in the Supabase SQL editor
- Get your API keys from the Supabase dashboard

4. **Set up environment variables**

Copy the example environment file and fill in your Supabase details:

```bash
cp .env.local.example .env.local
```

Edit `.env.local` and add your Supabase URL, anon key, and service role key:

```
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_KEY=your-service-role-key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

5. **Run the development server**

Edit `.env.local` and add your Supabase URL and anon key:

```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_KEY=your-supabase-service-key
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret
```

5. **Run the development server**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
