# Bioval — Frontend

Next.js 15 frontend for the Bioval biomass data management platform. Uses Clerk for authentication, TanStack Query for data fetching, shadcn/ui for components, and connects to the Django REST backend.

---

## Tech Stack

- **Next.js 15** (App Router)
- **TypeScript**
- **Clerk** (authentication)
- **TanStack Query** (server state management)
- **Tailwind CSS v4**
- **shadcn/ui** (component library)
- **Sonner** (toast notifications)
- **Stripe.js** (payment redirect)

---

## Prerequisites

Make sure you have the following installed:

- Node.js 18+
- npm (or yarn / pnpm)
- git
- A [Clerk](https://clerk.com) account
- The backend running locally (see backend README)

---

## Local Setup

### 1. Clone the repository

```bash
git clone https://github.com/your-org/bioval-frontend.git
cd bioval-frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create the `.env.local` file

Create a `.env.local` file at the root of the project:

```env
# Backend API URL
NEXT_PUBLIC_API_URL=http://localhost:8000

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxx
CLERK_SECRET_KEY=sk_test_xxx

# Clerk redirect URLs
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
```

> **Where to find these values:**
> - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY`: in your Clerk dashboard → API Keys
> - `NEXT_PUBLIC_API_URL`: URL of your running backend (`http://localhost:8000` for local dev, or your Render URL in production)

### 4. Configure Clerk

In your **Clerk dashboard**:

1. Go to **User & Authentication → Email, Phone, Username** and enable Email
2. Go to **JWT Templates** — no changes needed, the backend uses the default Clerk JWT
3. Go to **Webhooks** if you want to sync user events (optional for local dev)

### 5. Run the development server

```bash
npm run dev
```

The app will be available at `http://localhost:3000`.

---

## Project Structure

```
bioval-frontend/
├── app/
│   ├── (auth)/
│   │   ├── sign-in/        # Clerk sign-in page
│   │   └── sign-up/        # Clerk sign-up page
│   └── (dashboard)/
│       ├── dashboard/      # Home dashboard with stats
│       ├── datasets/       # Dataset list and detail
│       ├── requests/       # Access request management
│       ├── users/          # User management
│       ├── groups/         # Group management
│       ├── subscriptions/  # Subscription management
│       ├── logs/           # Activity logs
│       ├── settings/       # User profile (Clerk)
│       └── layout.tsx      # Dashboard shell (sidebar + header)
├── components/
│   ├── datasets/           # Dataset table, upload dialog, card
│   ├── groups/             # Groups table, group dialog
│   ├── requests/           # Requests table, detail dialog
│   ├── subscriptions/      # Subscription card, Stripe button
│   ├── users/              # Users table, detail dialog
│   ├── layout/             # Sidebar, header, mobile nav, sync-user
│   └── shared/             # DataTable, PageHeader, StatCard, RoleGuard
├── lib/
│   ├── api/                # API client functions (one file per resource)
│   ├── hooks/              # TanStack Query hooks (one file per resource)
│   ├── providers/          # QueryProvider, ThemeProvider
│   ├── types/              # TypeScript interfaces
│   └── utils.ts            # cn(), formatDate(), role helpers
├── middleware.ts            # Clerk auth middleware
└── next.config.ts
```

---

## Authentication Flow

1. User signs in via Clerk (`/sign-in`)
2. On successful login, `SyncUser` component calls `POST /api/users/sync/` to create or update the user record in the backend database
3. Clerk JWT is attached to every subsequent API request via `Authorization: Bearer <token>`
4. The backend verifies the JWT against Clerk's JWKS endpoint

---

## Role-Based Access

Pages and actions are gated by the `useRole()` hook and `<RoleGuard>` component.

| Role | Access |
|------|--------|
| `admin_global` | Everything |
| `admin_metier` | Datasets (validate), Access requests, Users (read) |
| `admin_externe` | Groups, Subscriptions, Datasets (read) |
| `user_interne` | Datasets (upload + read) |
| `user_externe` | Datasets (read, conditioned on subscription) |

---

## Key Scripts

```bash
npm run dev       # Start development server (http://localhost:3000)
npm run build     # Build for production
npm run start     # Start production server
npm run lint      # Run ESLint
```

---

## Connecting to a Deployed Backend

To point the frontend at your deployed Render backend, update `NEXT_PUBLIC_API_URL` in your environment:

**For local dev pointing at production backend:**
```env
NEXT_PUBLIC_API_URL=https://your-app-name.onrender.com
```

**For Vercel deployment**, add this in your Vercel project → Settings → Environment Variables:
```
NEXT_PUBLIC_API_URL=https://your-app-name.onrender.com
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_xxx
CLERK_SECRET_KEY=sk_live_xxx
```

---

## Environment Variables Reference

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_API_URL` | ✅ | Backend base URL (no trailing slash) |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | ✅ | Clerk publishable key |
| `CLERK_SECRET_KEY` | ✅ | Clerk secret key (server-side only) |
| `NEXT_PUBLIC_CLERK_SIGN_IN_URL` | ✅ | `/sign-in` |
| `NEXT_PUBLIC_CLERK_SIGN_UP_URL` | ✅ | `/sign-up` |
| `NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL` | ✅ | `/dashboard` |
| `NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL` | ✅ | `/dashboard` |

---

## Common Issues

**API requests return 401**
→ Make sure the backend is running and `NEXT_PUBLIC_API_URL` is correct. Check that `CLERK_JWKS_URL` in the backend `.env` matches your Clerk app.

**CORS errors in the browser**
→ Make sure `CORS_ALLOWED_ORIGINS` in the backend `.env` includes your frontend URL (no trailing slash).

**User role shows undefined**
→ The `GET /api/users/me/` call failed. Check that the user was synced via `/api/users/sync/` after login and that the backend is reachable.