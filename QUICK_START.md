# EASY BET - Quick Start Guide

## 🚀 Get Running in 5 Minutes

### Step 1: Environment Setup (1 minute)

```bash
# Copy the environment template
cp .env.example .env.local
```

Edit `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
NEXT_PUBLIC_WS_URL=ws://localhost:3001
```

### Step 2: Start Development Server (30 seconds)

```bash
npm run dev
```

### Step 3: View the Application

Open [http://localhost:3000](http://localhost:3000)

You should see:
- ✅ EASY BET home page with green gradient hero
- ✅ Sports category grid
- ✅ Features section
- ✅ Working navigation

### Step 4: Test the Routes

Try these URLs:
- Home: `http://localhost:3000`
- Login: `http://localhost:3000/login`
- Register: `http://localhost:3000/register`
- Dashboard: `http://localhost:3000/dashboard` (redirects to login)

## 🎯 What's Working Right Now

### ✅ Fully Functional
- Home page with all sections
- Login page with form validation
- Register page with validation
- Route protection (try accessing /dashboard)
- Form validation (try submitting empty forms)
- Responsive design (resize your browser)
- Theme colors (notice the green #00D65C)

### 📋 Ready to Connect
- All API endpoints are defined
- Redux store is configured
- Authentication flow is set up
- Socket.io client is ready
- Just need a backend!

## 🏗️ Build Your First Feature

### Example: Create a Live Events Page

1. **Create the page file:**
```bash
# Create the file
touch src/app/(main)/live-events/page.tsx
```

2. **Add this code:**
```typescript
"use client";

import { useGetLiveMatchesQuery } from "@/lib/redux/api/matchApi";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function LiveEventsPage() {
  const { data, isLoading } = useGetLiveMatchesQuery();

  if (isLoading) {
    return <div className="container mx-auto py-8">Loading...</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-8 text-primary">Live Events</h1>
      <div className="grid gap-4">
        {data?.matches.map((match) => (
          <Card key={match.id}>
            <CardContent className="p-6">
              <Badge className="mb-4 bg-accent">LIVE</Badge>
              <div className="flex justify-between items-center">
                <div className="text-lg font-semibold">
                  {match.homeTeam.name}
                </div>
                <div className="text-2xl font-bold">VS</div>
                <div className="text-lg font-semibold">
                  {match.awayTeam.name}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
```

3. **Navigate to:** `http://localhost:3000/live-events`

That's it! You just created a page with API integration.

## 🔍 Exploring the Codebase

### Key Directories

1. **src/types/** - All TypeScript types
   - Start here to understand the data structures

2. **src/lib/redux/api/** - API endpoints
   - See what endpoints are available
   - Each file has detailed JSDoc comments

3. **src/lib/validators/** - Form validation schemas
   - Copy these for your forms

4. **src/hooks/** - Custom hooks
   - Use these in your components

### Important Files

- `src/middleware.ts` - Route protection (already working!)
- `src/lib/redux/store.ts` - Redux configuration
- `src/lib/constants/index.ts` - All app constants
- `src/app/layout.tsx` - Root layout with providers

## 💡 Common Tasks

### Adding Authentication to a Page

```typescript
"use client";

import { useAuth } from "@/hooks/useAuth";

export default function MyPage() {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <div>Please log in</div>;
  }

  return <div>Welcome, {user?.username}!</div>;
}
```

### Using the Betting Slip

```typescript
import { useBettingSlip } from "@/hooks/useBettingSlip";

function OddsButton({ matchId, odds }) {
  const { addItem } = useBettingSlip();

  return (
    <button
      onClick={() => addItem({
        matchId,
        match: "Team A vs Team B",
        teams: "Team A vs Team B",
        selection: "1",
        market: "match_winner",
        odds,
        startTime: new Date(),
        sport: "football",
      })}
      className="odds-button"
    >
      {odds.toFixed(2)}
    </button>
  );
}
```

### Making API Calls

```typescript
// Option 1: Use the hook (recommended)
import { useGetMatchByIdQuery } from "@/lib/redux/api/matchApi";

function MatchDetail({ matchId }) {
  const { data, isLoading, error } = useGetMatchByIdQuery(matchId);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading match</div>;

  return <div>{data?.match.homeTeam.name}</div>;
}

// Option 2: Use mutation for POST/PUT/DELETE
import { usePlaceBetMutation } from "@/lib/redux/api/bettingApi";

function BetButton() {
  const [placeBet, { isLoading }] = usePlaceBetMutation();

  const handleBet = async () => {
    try {
      await placeBet({
        betType: "single",
        selections: [/* ... */],
        stake: 10,
      }).unwrap();
      alert("Bet placed!");
    } catch (error) {
      alert("Failed to place bet");
    }
  };

  return <button onClick={handleBet}>Place Bet</button>;
}
```

## 🎨 Using the Design System

### Colors

```jsx
// Primary green button
<button className="bg-primary hover:bg-primary/90 text-white">
  Place Bet
</button>

// Accent red badge
<Badge className="bg-accent">LIVE</Badge>

// Gradient background
<div className="gradient-primary">
  Content
</div>
```

### Custom Classes

```jsx
// Odds button with hover effect
<button className="odds-button">2.50</button>

// Live indicator with pulse
<div className="live-indicator">LIVE</div>

// Match card with hover animation
<div className="match-card">Match content</div>
```

## 📚 Next Steps

1. **Read the Docs:**
   - `README.md` - Project overview
   - `PROJECT_SETUP.md` - Detailed setup guide
   - `IMPLEMENTATION_SUMMARY.md` - What's built and what's next

2. **Build Pages:**
   - Start with sports pages (football, cricket, etc.)
   - Then match detail pages
   - Then dashboard pages

3. **Add Components:**
   - Create betting components (BettingSlip, OddsButton, etc.)
   - Create layout components (MainLayout, DashboardLayout)
   - Create form components

4. **Connect Backend:**
   - The API endpoints are all defined
   - Just point to your backend URL
   - Everything will work automatically!

## ❓ Troubleshooting

### Issue: API calls failing
**Solution:** Make sure your backend is running and .env.local has correct URLs

### Issue: Types not found
**Solution:** Run `npm install` again

### Issue: Page not found
**Solution:** Create the page file in the correct app directory

### Issue: Can't access dashboard
**Solution:** You need to log in first (middleware is protecting it)

## 🆘 Need Help?

- Check `PROJECT_SETUP.md` for detailed examples
- Look at existing pages in `src/app/` for patterns
- All types are in `src/types/` - use them as reference
- API endpoints in `src/lib/redux/api/` have JSDoc comments

## ✨ Tips

1. Use the custom hooks - they handle everything for you
2. All forms already have validation schemas
3. The betting slip persists in localStorage
4. Colors are in CSS variables - use the utility classes
5. shadcn components are in `src/components/ui/`

**Happy Coding! 🚀**
