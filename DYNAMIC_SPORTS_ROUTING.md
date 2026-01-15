# Dynamic Sport Routing System

## Overview

The sport categories are now **fully dynamic**. Admin can add/remove sports from the data file and they will automatically appear in the navigation and work with routing.

## How It Works

### 1. Data Source

All sports are managed in: `src/data/match.data.ts`

```typescript
export const MOCK_SPORTS: SportInfo[] = [
  {
    _id: "s1",
    sportId: "SPORT-001",
    name: "Football",
    slug: "football", // This becomes the URL: /matches/football
    icon: "⚽",
    displayOrder: 1,
    isActive: true, // Only active sports show in navigation
  },
  // ... more sports
];
```

### 2. Dynamic Route

- **Route**: `app/(main)/matches/[sport]/page.tsx`
- This single file handles ALL sports: football, cricket, basketball, tennis, etc.
- No need to create separate folders for each sport

### 3. Navigation

- **Component**: `components/pages/main/matches/SportCategories.tsx`
- Automatically reads from `MOCK_SPORTS`
- Only shows sports where `isActive: true`
- Sorted by `displayOrder`

## Adding a New Sport

### Step 1: Add to MOCK_SPORTS

```typescript
{
  _id: "s9",
  sportId: "SPORT-009",
  name: "Badminton",
  slug: "badminton",
  icon: "🏸",
  displayOrder: 9,
  isActive: true,
}
```

### Step 2: That's it! ✅

- The sport will automatically appear in navigation
- Route `/matches/badminton` will work
- No code changes needed

## Disabling a Sport

Set `isActive: false`:

```typescript
{
  name: "Rugby",
  slug: "rugby",
  isActive: false,  // Won't show in navigation
}
```

## Future: API Integration

When you connect to backend API, replace `MOCK_SPORTS` with:

```typescript
// Fetch from API
const sports = await fetch("/api/sports").then((r) => r.json());
```

The entire system will work the same way!
