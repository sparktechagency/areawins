# EASY BET - Sports Betting Platform Setup Guide

## Project Overview

This is a comprehensive Next.js 16 sports betting platform with TypeScript, featuring real-time betting, live match updates, wallet management, and a complete user dashboard.

## ✅ What Has Been Completed

### 1. **Package Installation & Configuration**
- ✅ All core dependencies installed:
  - Next.js 16 with App Router
  - TypeScript (strict mode)
  - Tailwind CSS v4
  - shadcn/ui components
  - Redux Toolkit & RTK Query
  - React Hook Form + Zod validation
  - Socket.io client for real-time updates
  - react-hot-toast & sonner for notifications
  - date-fns for date formatting
  - js-cookie for cookie management
  - lucide-react for icons
  - recharts for statistics

### 2. **Styling & Theme**
- ✅ Complete globals.css with EASY BET color scheme:
  - Primary: #00D65C (Bright Green)
  - Secondary: #1a1a1a (Dark Gray/Black)
  - Accent: #FF3B3B (Red for live/urgent)
  - Background: #f5f5f5 (Light Gray)
- ✅ Custom CSS animations (pulse, shimmer, etc.)
- ✅ Responsive design utilities
- ✅ Light mode only (no dark mode)
- ✅ Accessibility features (focus states, screen reader support)

### 3. **TypeScript Type Definitions** (src/types/)
- ✅ auth.types.ts - Authentication & user types
- ✅ user.types.ts - User profile, settings, stats
- ✅ betting.types.ts - Bets, markets, odds, betting slip
- ✅ match.types.ts - Matches, teams, tournaments, sports
- ✅ wallet.types.ts - Wallet, transactions, payments
- ✅ message.types.ts - Messages, conversations, notifications

### 4. **Constants & Utilities** (src/lib/)
- ✅ routes.ts - All application routes
- ✅ sports.ts - Sports configuration
- ✅ betTypes.ts - Betting types and markets
- ✅ API configuration
- ✅ Cookie & localStorage keys
- ✅ Date formats, currencies, languages
- ✅ Error & success messages

### 5. **Validation Schemas** (src/lib/validators/)
- ✅ authSchema.ts - Login, register, password reset
- ✅ betSchema.ts - Place bet, cash out, filters
- ✅ walletSchema.ts - Deposit, withdraw, payments
- ✅ profileSchema.ts - Profile updates, settings

### 6. **Redux & State Management** (src/lib/redux/)

#### API Slices (RTK Query):
- ✅ **baseApi.ts** - Base configuration with:
  - Token refresh logic
  - Auto-retry on failure
  - Error handling
  - Authentication headers

- ✅ **authApi.ts** - Authentication endpoints:
  - login, register, logout
  - forgotPassword, verifyEmail, resetPassword
  - refreshToken, resendVerificationEmail

- ✅ **bettingApi.ts** - Betting endpoints:
  - getOdds, placeBet, cashOut
  - getBetHistory, getActiveBets
  - getBettingMarkets, getBettingLimits
  - getBetStatistics

- ✅ **matchApi.ts** - Match & tournament endpoints:
  - getLiveMatches, getUpcomingMatches
  - getMatchById, getMatchesBySport
  - getTournaments, getTeams
  - getMatchStatistics

- ✅ **walletApi.ts** - Wallet & payment endpoints:
  - getBalance, deposit, withdraw
  - getTransactions, getPaymentMethods
  - getDepositLimits, getWithdrawLimits

- ✅ **userApi.ts** - User profile endpoints:
  - getUserProfile, updateProfile
  - changePassword, uploadAvatar
  - getUserStats, updatePreferences
  - getFavoriteMatches, getFavoriteTeams

- ✅ **messageApi.ts** - Messaging & notifications:
  - getConversations, getMessages, sendMessage
  - getNotifications, markAsRead
  - deleteNotifications

#### Feature Slices:
- ✅ **authSlice.ts** - Authentication state
- ✅ **bettingSlice.ts** - Betting slip management with:
  - Add/remove items
  - Calculate odds and potential winnings
  - LocalStorage persistence
  - Accumulator support

- ✅ **userSlice.ts** - User profile state
- ✅ **walletSlice.ts** - Wallet balance state

#### Store Configuration:
- ✅ **store.ts** - Redux store with all slices
- ✅ **hooks.ts** - Typed Redux hooks
- ✅ **provider.tsx** - Redux Provider component

### 7. **Socket.io Client** (src/lib/socket/)
- ✅ **socketClient.ts** - Real-time communication:
  - Live match updates
  - Odds changes
  - Bet result notifications
  - Wallet balance updates
  - Auto-reconnection logic
  - Event subscription management

### 8. **Custom Hooks** (src/hooks/)
- ✅ **useAuth.ts** - Authentication hook
- ✅ **useBettingSlip.ts** - Betting slip operations
- ✅ **useWallet.ts** - Wallet operations
- ✅ **useToast.ts** - Toast notifications

### 9. **shadcn/ui Components Installed** (src/components/ui/)
- ✅ button, input, form, label
- ✅ card, dialog, dropdown-menu
- ✅ avatar, badge, select
- ✅ table, checkbox, textarea
- ✅ tabs, sonner (toast)

### 10. **Middleware & Security**
- ✅ **middleware.ts** - Route protection:
  - Public route access
  - Protected route authentication
  - Automatic redirects
  - Cookie-based auth checking

### 11. **Root Layout**
- ✅ **src/app/layout.tsx** - Configured with:
  - Redux Provider
  - Toast notifications (both react-hot-toast and sonner)
  - SEO metadata
  - Font configuration

### 12. **Folder Structure**
```
src/
├── app/
│   ├── (main)/          # Public pages
│   ├── (auth)/          # Auth pages
│   ├── dashboard/       # Protected dashboard
│   ├── globals.css
│   └── layout.tsx
├── components/
│   ├── layouts/         # Layout components
│   ├── ui/             # shadcn components
│   ├── shared/         # Shared components
│   ├── betting/        # Betting components
│   ├── forms/          # Form components
│   ├── cards/          # Card components
│   └── messages/       # Message components
├── lib/
│   ├── redux/          # Redux setup
│   │   ├── api/        # RTK Query APIs
│   │   └── features/   # Redux slices
│   ├── validators/     # Zod schemas
│   ├── constants/      # App constants
│   ├── socket/         # Socket.io client
│   └── utils.ts        # Utility functions
├── hooks/              # Custom hooks
├── types/              # TypeScript types
└── assets/             # Static assets
```

## 🚀 Next Steps

### 1. Environment Setup
Create a `.env.local` file (copy from `.env.example`):
```bash
cp .env.example .env.local
```

Edit `.env.local` and set your backend API URLs:
```
NEXT_PUBLIC_API_URL=http://localhost:3001/api
NEXT_PUBLIC_WS_URL=ws://localhost:3001
```

### 2. Create Page Components

You need to create the actual page files in `src/app/`. Here's the priority order:

#### High Priority Pages:
1. **Home Page** (`src/app/(main)/page.tsx`)
   - Display tournaments
   - Live events section
   - Upcoming matches table
   - Use the match API hooks

2. **Auth Pages** (`src/app/(auth)/`)
   - login/page.tsx
   - register/page.tsx
   - forgot-password/page.tsx
   - verify-email/page.tsx (OTP input)
   - reset-password/page.tsx

3. **Dashboard Pages** (`src/app/dashboard/`)
   - page.tsx (Dashboard overview)
   - my-bets/page.tsx
   - wallet/page.tsx
   - profile/page.tsx

#### Medium Priority:
4. **Sport Pages** (`src/app/(main)/`)
   - football/page.tsx
   - cricket/page.tsx
   - basketball/page.tsx
   - etc.

5. **Match Detail** (`src/app/(main)/match/[id]/page.tsx`)

### 3. Create Layout Components

Create these in `src/components/layouts/`:

1. **MainLayout.tsx** - For public pages
   - Navbar with logo, search, language selector, login/register buttons
   - Sports navigation bar (Football, Cricket, etc.)
   - Main content area with betting slip sidebar
   - Footer

2. **AuthLayout.tsx** - For auth pages
   - Split screen design
   - Left: Stadium background with logo
   - Right: Form container

3. **DashboardLayout.tsx** - For dashboard
   - Top bar with balance display
   - Sidebar with navigation
   - Main content area

### 4. Create Shared Components

In `src/components/shared/`:

1. **Navbar.tsx** - Main navigation
2. **Footer.tsx** - Site footer
3. **SportsNav.tsx** - Sports navigation bar
4. **BettingSlip.tsx** - Right sidebar for bets (use `useBettingSlip` hook)
5. **SearchBar.tsx** - Match search

### 5. Create Betting Components

In `src/components/betting/`:

1. **LiveEventCard.tsx** - Live match card with countdown
2. **UpcomingMatchCard.tsx** - Upcoming match card
3. **OddsButton.tsx** - Clickable odds button
4. **BettingMarketCard.tsx** - Betting market display

### 6. Create Form Components

In `src/components/forms/`:

1. **LoginForm.tsx** - Use `loginSchema` and `useAuth`
2. **RegisterForm.tsx** - Use `registerSchema` and `useAuth`
3. **BetPlacementForm.tsx** - Use `useBettingSlip`
4. **DepositForm.tsx** - Use `useWallet`

## 📝 Example Implementation

### Example: Home Page

```typescript
// src/app/(main)/page.tsx
"use client";

import { useGetLiveMatchesQuery, useGetUpcomingMatchesQuery } from "@/lib/redux/api/matchApi";
import { LiveEventCard } from "@/components/betting/LiveEventCard";
import { UpcomingMatchCard } from "@/components/betting/UpcomingMatchCard";

export default function HomePage() {
  const { data: liveMatches, isLoading: loadingLive } = useGetLiveMatchesQuery();
  const { data: upcomingMatches, isLoading: loadingUpcoming } = useGetUpcomingMatchesQuery();

  return (
    <div className="container mx-auto py-8">
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6 text-primary">Live Events</h2>
        {loadingLive ? (
          <div>Loading...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {liveMatches?.matches.map((match) => (
              <LiveEventCard key={match.id} match={match} />
            ))}
          </div>
        )}
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-6">Upcoming Matches</h2>
        {loadingUpcoming ? (
          <div>Loading...</div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {upcomingMatches?.matches.map((match) => (
              <UpcomingMatchCard key={match.id} match={match} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
```

### Example: Login Form

```typescript
// src/components/forms/LoginForm.tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginFormData } from "@/lib/validators";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/lib/constants";

export function LoginForm() {
  const router = useRouter();
  const { login, isLoggingIn } = useAuth();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data).unwrap();
      router.push(ROUTES.DASHBOARD);
    } catch (error) {
      // Error handled by useAuth hook
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="your@email.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="••••••••" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={isLoggingIn}>
          {isLoggingIn ? "Logging in..." : "Login"}
        </Button>
      </form>
    </Form>
  );
}
```

## 🎨 Design Guidelines

### Colors (Already configured in globals.css):
- Primary buttons: `bg-primary` (#00D65C)
- Secondary: `bg-secondary` (#1a1a1a)
- Live indicators: `bg-accent` (#FF3B3B)
- Use the custom CSS classes: `.text-primary`, `.bg-primary`, `.gradient-primary`, etc.

### Components:
- Use shadcn components for consistency
- Apply the betting-specific styles: `.odds-button`, `.match-card`, `.live-indicator`
- Mobile-first approach
- Accessibility: proper ARIA labels, keyboard navigation

## 🔧 Development Commands

```bash
# Development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Type checking
npx tsc --noEmit

# Linting
npm run lint
```

## 📱 Real-time Features

The Socket.io client is ready to use. Example:

```typescript
import { socketClient } from "@/lib/socket/socketClient";
import { useEffect } from "react";

// In your component:
useEffect(() => {
  socketClient.connect();

  socketClient.subscribeToOddsUpdates("match-123", (update) => {
    console.log("Odds updated:", update);
    // Update your UI
  });

  return () => {
    socketClient.unsubscribeFromOddsUpdates("match-123");
  };
}, []);
```

## 🚨 Important Notes

1. **Backend API Required**: This frontend needs a backend API. All API endpoints are configured in the RTK Query slices but need a real backend.

2. **Authentication**: Uses cookie-based auth with automatic token refresh. The middleware protects routes.

3. **Betting Slip**: Persists to localStorage before login, syncs with backend after login.

4. **Type Safety**: All API responses should match the TypeScript types defined in `src/types/`.

5. **Error Handling**: Already configured in baseApi.ts with retry logic and error messages.

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [shadcn/ui](https://ui.shadcn.com/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [React Hook Form](https://react-hook-form.com/)
- [Zod](https://zod.dev/)

## 🎯 Summary

You have a **production-ready foundation** with:
- ✅ Complete type system
- ✅ State management (Redux + RTK Query)
- ✅ Form validation (Zod)
- ✅ Real-time communication (Socket.io)
- ✅ Authentication & route protection
- ✅ Styled components library (shadcn)
- ✅ Utility functions and constants

**Next**: Create the page components and layouts using the provided hooks and APIs!
