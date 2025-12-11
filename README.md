# Fondation FG - Next.js Website

A modern, elegant website for Fondation FG built with Next.js 15, featuring a unique horizontal scrolling timeline showcasing the foundation's history and impact from 2010 to 2024.

## 🚀 Features

- **Horizontal Scroll Experience**: Smooth mouse-wheel-driven horizontal navigation through the foundation's timeline
- **Next.js 15**: Latest version with App Router and React Server Components
- **TypeScript**: Full type safety across the entire application
- **Tailwind CSS 4**: Modern utility-first styling
- **PostgreSQL + Drizzle ORM**: Robust database layer for content management
- **NextAuth.js**: Secure authentication system
- **CMS Admin Panel**: Content management for articles, events, and media
- **Responsive Design**: Mobile-first approach ensuring great UX on all devices

## 📋 Tech Stack

- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Database**: PostgreSQL
- **ORM**: Drizzle ORM
- **Authentication**: NextAuth.js v5
- **Icons**: Lucide React
- **Deployment**: Railway
- **CI/CD**: GitHub Actions

## 🛠️ Getting Started

### Prerequisites

- Node.js 20+
- pnpm 10+
- PostgreSQL database

### Installation

1. Clone the repository:
```bash
git clone https://github.com/clement893/fondation-fg-nextjs.git
cd fondation-fg-nextjs
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up environment variables:
```bash
cp .env.local.example .env.local
```

Edit `.env.local` and add your database URL and other required variables:
```env
DATABASE_URL=postgresql://user:password@host:port/database
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here
```

4. Push database schema:
```bash
pnpm db:push
```

5. Run the development server:
```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see the result.

## 📁 Project Structure

```
fondation-fg-nextjs/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Homepage with horizontal scroll
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Global styles
├── lib/
│   └── db/
│       ├── schema.ts      # Drizzle database schema
│       └── index.ts       # Database connection
├── .github/
│   └── workflows/
│       ├── lint.yml       # Linting workflow
│       └── deploy.yml     # Railway deployment
├── drizzle.config.ts      # Drizzle configuration
└── package.json           # Dependencies and scripts
```

## 🗄️ Database Schema

The project includes the following tables:

- **users**: User accounts with role-based access (admin/user)
- **articles**: Blog posts and news articles
- **events**: Foundation events and activities
- **categories**: Content categorization
- **media**: File uploads and media library

## 🚢 Deployment

### Railway Deployment

1. Create a new project on [Railway](https://railway.app)
2. Add a PostgreSQL database to your project
3. Connect your GitHub repository
4. Add the following environment variables in Railway:
   - `DATABASE_URL` (automatically provided by Railway PostgreSQL)
   - `NEXTAUTH_URL` (your production URL)
   - `NEXTAUTH_SECRET` (generate with `openssl rand -base64 32`)

5. Add `RAILWAY_TOKEN` secret to your GitHub repository:
   - Go to Settings → Secrets and variables → Actions
   - Add new repository secret: `RAILWAY_TOKEN`
   - Get the token from Railway Project Settings → Tokens

The site will automatically deploy on every push to the `main` or `master` branch.

## 📝 Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm db:generate` - Generate Drizzle migrations
- `pnpm db:push` - Push schema to database
- `pnpm db:studio` - Open Drizzle Studio

## 🎨 Design Philosophy

The website features an elegant, minimalist design with:

- Clean typography and generous whitespace
- Smooth horizontal scrolling for immersive storytelling
- Gradient backgrounds for visual depth
- Responsive layouts that adapt to all screen sizes
- Accessible color contrasts and focus states

## 📄 License

MIT

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Contact

For questions or support, please contact the Fondation FG team.
