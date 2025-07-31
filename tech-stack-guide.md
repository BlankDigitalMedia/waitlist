# Next.js 15 + Tailwind v4 + shadcn/ui + Convex: Integration Guide & Vercel Deployment

## Overview

This guide covers the integration of Next.js 15, Tailwind CSS v4, shadcn/ui, and Convex backend for building modern web applications, with specific focus on deployment to Vercel and potential conflicts to watch out for.

## Technology Stack

### Next.js 15 (Latest)
- **React Framework**: Full-stack React framework with App Router
- **Key Features**: Server Components, Server Actions, Streaming, Edge Runtime
- **Breaking Changes**: Async Request APIs (cookies, headers, draftMode, params, searchParams)

### Tailwind CSS v4 (Latest)
- **Utility-First CSS**: Rapid UI development with utility classes
- **Key Changes**: CSS-based configuration, simplified import syntax, improved performance
- **Breaking Changes**: Configuration migration from JS to CSS, new plugin system

### shadcn/ui (Latest)
- **Component Library**: Copy-paste components built on Radix UI and Tailwind CSS
- **Philosophy**: Own your components, customizable, accessible
- **Integration**: Seamless with Next.js App Router and Tailwind CSS

### Convex (Latest)
- **Backend-as-a-Service**: Real-time database, serverless functions, file storage
- **TypeScript-First**: End-to-end type safety
- **Real-time**: Built-in reactivity and subscriptions

## Setup and Integration

### 1. Initialize Next.js 15 Project

```bash
# Create new Next.js project
npx create-next-app@latest my-project --typescript --eslint --app
cd my-project

# Or use Convex starter template
npm create convex@latest -- -t nextjs-clerk
```

### 2. Install and Configure Tailwind CSS v4

```bash
# Install Tailwind CSS v4
npm install tailwindcss @tailwindcss/postcss postcss
```

**PostCSS Configuration** (`postcss.config.mjs`):
```javascript
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
export default config;
```

**Import Tailwind in Global CSS** (`app/globals.css`):
```css
@import "tailwindcss";
```

### 3. Initialize shadcn/ui

```bash
# Initialize shadcn/ui
npx shadcn@latest init
```

This creates a `components.json` configuration file:
```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "",
    "css": "src/app/globals.css",
    "baseColor": "neutral",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui"
  }
}
```

Add components:
```bash
npx shadcn@latest add button
npx shadcn@latest add form
npx shadcn@latest add input
```

### 4. Set Up Convex Backend

```bash
# Install Convex
npm install convex

# Initialize Convex
npx convex dev
```

**Convex Client Provider** (`app/ConvexClientProvider.tsx`):
```typescript
"use client";

import { ConvexProvider, ConvexReactClient } from "convex/react";
import { ReactNode } from "react";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export function ConvexClientProvider({ children }: { children: ReactNode }) {
  return <ConvexProvider client={convex}>{children}</ConvexProvider>;
}
```

**Layout Integration** (`app/layout.tsx`):
```typescript
import { ConvexClientProvider } from "./ConvexClientProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ConvexClientProvider>{children}</ConvexClientProvider>
      </body>
    </html>
  );
}
```

## Breaking Changes & Migration Notes

### Next.js 15 Breaking Changes

1. **Async Request APIs**: `params`, `searchParams`, `cookies()`, `headers()`, and `draftMode()` are now async
```typescript
// Before (Next.js 14)
export default function Page({ params, searchParams }) {
  const { slug } = params;
  const { query } = searchParams;
}

// After (Next.js 15)
export default async function Page({ params, searchParams }) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const { slug } = resolvedParams;
  const { query } = resolvedSearchParams;
}
```

2. **Geolocation API Changes**: Use `@vercel/functions` for geo data
```typescript
import { geolocation, ipAddress } from '@vercel/functions';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { city } = geolocation(request);
  const ip = ipAddress(request);
}
```

### Tailwind CSS v4 Breaking Changes

1. **Import Syntax**: Simplified from directives to single import
```css
/* Before (v3) */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* After (v4) */
@import "tailwindcss";
```

2. **Configuration**: Moved from JS to CSS-based
```css
/* CSS-based theme configuration */
@theme {
  --font-display: "Satoshi", "sans-serif";
  --breakpoint-3xl: 120rem;
  --color-avocado-100: oklch(0.99 0 0);
}
```

3. **Container Utility**: Now requires manual configuration
```css
@utility container {
  margin-inline: auto;
  padding-inline: 2rem;
}
```

## Vercel Deployment Configuration

### Environment Variables

Create `.env.local`:
```bash
NEXT_PUBLIC_CONVEX_URL=https://your-deployment.convex.cloud
# Add other environment variables as needed
```

### Vercel Integration

1. **Automatic Deployment**: Push to GitHub triggers automatic deployment
2. **Convex Integration**: 
```bash
# Deploy Convex with frontend build
npx convex deploy --cmd 'npm run build'
```

3. **Preview Deployments**: Convex supports preview environments
```bash
npx convex deploy --preview-create my-branch-name
```

## Potential Conflicts and Solutions

### 1. Next.js 15 + Tailwind v4 Conflicts

**Issue**: PostCSS configuration conflicts
**Solution**: Use dedicated `@tailwindcss/postcss` plugin
```javascript
// postcss.config.mjs
export default {
  plugins: {
    "@tailwindcss/postcss": {}, // Use v4 plugin
  },
};
```

### 2. shadcn/ui + Tailwind v4 Conflicts

**Issue**: Component styling not working with v4
**Solution**: Ensure proper CSS variable setup and import order
```css
/* globals.css - Import order matters */
@import "tailwindcss";

/* shadcn/ui base styles will work with CSS variables */
```

**Issue**: `@apply` directive in component styles
**Solution**: Use `@reference` directive for bundled stylesheets
```vue
<style>
@reference "../../app.css";
h1 {
  @apply text-2xl font-bold text-red-500;
}
</style>
```

### 3. Convex + Vercel Edge Runtime Conflicts

**Issue**: Convex client initialization in Edge Runtime
**Solution**: Use standard Node.js runtime for pages with Convex integration
```typescript
// Avoid this in edge runtime
export const runtime = 'edge'; // Don't use with Convex

// Use default Node.js runtime instead
export default function Page() {
  const data = useQuery(api.tasks.list);
  // ...
}
```

### 4. Authentication Integration Conflicts

**Issue**: Multiple auth providers (Clerk + Auth0)
**Solution**: Choose one primary auth provider for Convex
```typescript
// With Clerk
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { useAuth } from "@clerk/nextjs";

export default function ConvexClientProvider({ children }) {
  return (
    <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
      {children}
    </ConvexProviderWithClerk>
  );
}
```

### 5. Build Performance Issues

**Issue**: Large bundle sizes with all dependencies
**Solution**: Optimize imports and use tree shaking
```typescript
// Good: Import only what you need
import { Button } from "@/components/ui/button";

// Avoid: Importing entire libraries
import * as RadixUI from "@radix-ui/react-button";
```

### 6. TypeScript Configuration Conflicts

**Issue**: Conflicting path aliases between Next.js and shadcn/ui
**Solution**: Align `tsconfig.json` with `components.json`
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"],
      "@/components/*": ["./components/*"],
      "@/lib/*": ["./lib/*"]
    }
  }
}
```

## Best Practices for Vercel Deployment

### 1. Environment Management
- Use Vercel's environment variable interface for production secrets
- Keep development variables in `.env.local`
- Use preview deployments for testing

### 2. Build Optimization
```bash
# Use Convex deploy command for coordinated deployment
npx convex deploy --cmd 'npm run build'
```

### 3. Monitoring and Analytics
- Enable Vercel Analytics for performance monitoring
- Use Convex dashboard for backend monitoring
- Implement error boundaries for client-side errors

### 4. Progressive Enhancement
- Use React Server Components where possible
- Implement proper loading states with Suspense
- Optimize for Core Web Vitals

## Troubleshooting Common Issues

### Build Failures
1. **Tailwind CSS not found**: Ensure `@tailwindcss/postcss` is installed
2. **shadcn components not styled**: Check CSS import order
3. **Convex types missing**: Run `npx convex dev` to generate types

### Runtime Errors
1. **Environment variables undefined**: Check `NEXT_PUBLIC_` prefix for client-side variables
2. **Convex connection failed**: Verify deployment URL and authentication
3. **Hydration mismatches**: Ensure server and client render consistently

### Performance Issues
1. **Large bundle size**: Use dynamic imports for large components
2. **Slow page loads**: Implement proper caching strategies
3. **Database query performance**: Optimize Convex queries and indexes

## Conclusion

This stack provides a powerful foundation for modern web applications:
- **Next.js 15**: Latest React features and performance improvements
- **Tailwind v4**: Improved performance and developer experience
- **shadcn/ui**: Production-ready, customizable components
- **Convex**: Real-time backend with excellent TypeScript support

The key to successful deployment on Vercel is understanding the integration points and potential conflicts between these technologies. With proper configuration and following the best practices outlined above, you can build and deploy robust, scalable applications.

Remember to:
1. Keep dependencies updated but test thoroughly
2. Use TypeScript throughout for better DX
3. Implement proper error handling and loading states
4. Monitor performance and optimize accordingly
5. Leverage Vercel's preview deployments for safe testing

## Implementation Plan: Minimalist Waitlist Landing Page

### Project Overview
Build a clean, minimalist landing page with:
- Light/dark mode toggle
- Responsive design using Tailwind defaults
- shadcn/ui components throughout
- Waitlist form with Convex backend
- Email validation and duplicate prevention

### Step 1: Backend Setup

#### 1.1 Convex Schema (`convex/schema.ts`)
```typescript
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  waitlist: defineTable({
    email: v.string(),
    name: v.optional(v.string()),
    company: v.optional(v.string()),
    interests: v.optional(v.array(v.string())),
    referralSource: v.optional(v.string()),
    createdAt: v.number(),
    status: v.union(v.literal("pending"), v.literal("approved"), v.literal("declined")),
  })
    .index("by_email", ["email"])
    .index("by_status", ["status"])
    .index("by_created_at", ["createdAt"]),
});
```

#### 1.2 Convex Functions (`convex/waitlist.ts`)
```typescript
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const addToWaitlist = mutation({
  args: {
    email: v.string(),
    name: v.optional(v.string()),
    company: v.optional(v.string()),
    interests: v.optional(v.array(v.string())),
    referralSource: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // Check if email already exists
    const existing = await ctx.db
      .query("waitlist")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();

    if (existing) {
      throw new Error("Email already registered for waitlist");
    }

    const waitlistId = await ctx.db.insert("waitlist", {
      ...args,
      createdAt: Date.now(),
      status: "pending",
    });

    return waitlistId;
  },
});

export const getWaitlistStats = query({
  args: {},
  handler: async (ctx) => {
    const total = await ctx.db.query("waitlist").collect();
    return {
      total: total.length,
      pending: total.filter(entry => entry.status === "pending").length,
      approved: total.filter(entry => entry.status === "approved").length,
    };
  },
});

export const getWaitlistPosition = query({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    const userEntry = await ctx.db
      .query("waitlist")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();

    if (!userEntry) return null;

    const earlierEntries = await ctx.db
      .query("waitlist")
      .withIndex("by_created_at")
      .filter((q) => q.lt(q.field("createdAt"), userEntry.createdAt))
      .collect();

    return {
      position: earlierEntries.length + 1,
      status: userEntry.status,
      joinedAt: userEntry.createdAt,
    };
  },
});
```

### Step 2: Frontend Components

#### 2.1 Theme Provider (`components/theme-provider.tsx`)
```typescript
"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
```

#### 2.2 Theme Toggle (`components/theme-toggle.tsx`)
```typescript
"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
```

#### 2.3 Waitlist Form (`components/waitlist-form.tsx`)
```typescript
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Loader2, CheckCircle } from "lucide-react";

const formSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  name: z.string().min(2, "Name must be at least 2 characters").optional(),
  company: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

export function WaitlistForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const addToWaitlist = useMutation(api.waitlist.addToWaitlist);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      name: "",
      company: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      await addToWaitlist({
        email: data.email,
        name: data.name || undefined,
        company: data.company || undefined,
      });
      setIsSubmitted(true);
      toast.success("Successfully joined the waitlist!");
    } catch (error) {
      if (error instanceof Error && error.message.includes("already registered")) {
        toast.error("This email is already registered for our waitlist.");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    }
  };

  if (isSubmitted) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center text-center space-y-4">
            <CheckCircle className="h-12 w-12 text-green-500" />
            <h3 className="text-lg font-semibold">You're on the list!</h3>
            <p className="text-sm text-muted-foreground">
              We'll notify you when we're ready to launch.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Join the Waitlist</CardTitle>
        <CardDescription>
          Be the first to know when we launch.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              {...form.register("email")}
            />
            {form.formState.errors.email && (
              <p className="text-sm text-red-500">
                {form.formState.errors.email.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="name">Name (Optional)</Label>
            <Input
              id="name"
              placeholder="Your name"
              {...form.register("name")}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="company">Company (Optional)</Label>
            <Input
              id="company"
              placeholder="Your company"
              {...form.register("company")}
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Joining...
              </>
            ) : (
              "Join Waitlist"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
```

#### 2.4 Stats Component (`components/waitlist-stats.tsx`)
```typescript
"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users } from "lucide-react";

export function WaitlistStats() {
  const stats = useQuery(api.waitlist.getWaitlistStats);

  if (!stats) {
    return (
      <Card className="w-full max-w-sm mx-auto">
        <CardContent className="pt-6">
          <div className="flex items-center justify-center space-x-2">
            <div className="h-2 w-2 bg-gray-400 rounded-full animate-pulse"></div>
            <div className="h-2 w-2 bg-gray-400 rounded-full animate-pulse"></div>
            <div className="h-2 w-2 bg-gray-400 rounded-full animate-pulse"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-sm mx-auto">
      <CardContent className="pt-6">
        <div className="flex items-center justify-center space-x-4">
          <div className="flex items-center space-x-2">
            <Users className="h-5 w-5 text-muted-foreground" />
            <span className="text-2xl font-bold">{stats.total}</span>
          </div>
          <Badge variant="secondary">
            {stats.total === 1 ? "person" : "people"} waiting
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}
```

### Step 3: Main Layout

#### 3.1 Update Layout (`app/layout.tsx`)
```typescript
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ConvexClientProvider } from "./ConvexClientProvider";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Join Our Waitlist",
  description: "Be the first to know when we launch.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ConvexClientProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster />
          </ThemeProvider>
        </ConvexClientProvider>
      </body>
    </html>
  );
}
```

#### 3.2 Main Page (`app/page.tsx`)
```typescript
import { WaitlistForm } from "@/components/waitlist-form";
import { WaitlistStats } from "@/components/waitlist-stats";
import { ThemeToggle } from "@/components/theme-toggle";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-bold">YourApp</h1>
            <Badge variant="outline">Coming Soon</Badge>
          </div>
          <ThemeToggle />
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-4xl sm:text-6xl font-bold tracking-tight">
              Something Amazing{" "}
              <span className="text-primary">is Coming</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We're building the next generation of [your product category]. 
              Join our waitlist to be the first to experience it.
            </p>
          </div>

          {/* Waitlist Form */}
          <div className="space-y-8">
            <WaitlistForm />
            
            <div className="flex items-center justify-center space-x-4">
              <Separator className="flex-1 max-w-20" />
              <span className="text-sm text-muted-foreground">or</span>
              <Separator className="flex-1 max-w-20" />
            </div>

            <WaitlistStats />
          </div>
        </div>
      </section>

      {/* Features Preview */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-3xl font-bold text-center mb-12">
            What to Expect
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                <span className="text-2xl">⚡</span>
              </div>
              <h4 className="text-xl font-semibold">Lightning Fast</h4>
              <p className="text-muted-foreground">
                Built for speed and performance.
              </p>
            </div>
            <div className="text-center space-y-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                <span className="text-2xl">🛡️</span>
              </div>
              <h4 className="text-xl font-semibold">Secure</h4>
              <p className="text-muted-foreground">
                Your data is safe and encrypted.
              </p>
            </div>
            <div className="text-center space-y-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                <span className="text-2xl">🎨</span>
              </div>
              <h4 className="text-xl font-semibold">Beautiful</h4>
              <p className="text-muted-foreground">
                Designed with attention to detail.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 border-t">
        <div className="flex justify-center items-center space-x-4 text-sm text-muted-foreground">
          <span>© 2025 YourApp. All rights reserved.</span>
        </div>
      </footer>
    </main>
  );
}
```

### Step 4: Styling & Polish 

#### 4.1 Update Global CSS (`app/globals.css`)
```css
@import "tailwindcss";

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 0 0% 3.9%;
    --card: 0 0% 100%;
    --card-foreground: 0 0% 3.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 0 0% 3.9%;
    --primary: 0 0% 9%;
    --primary-foreground: 0 0% 98%;
    --secondary: 0 0% 96.1%;
    --secondary-foreground: 0 0% 9%;
    --muted: 0 0% 96.1%;
    --muted-foreground: 0 0% 45.1%;
    --accent: 0 0% 96.1%;
    --accent-foreground: 0 0% 9%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 0 0% 98%;
    --border: 0 0% 89.8%;
    --input: 0 0% 89.8%;
    --ring: 0 0% 3.9%;
    --radius: 0.5rem;
  }

  .dark {
    --background: 0 0% 3.9%;
    --foreground: 0 0% 98%;
    --card: 0 0% 3.9%;
    --card-foreground: 0 0% 98%;
    --popover: 0 0% 3.9%;
    --popover-foreground: 0 0% 98%;
    --primary: 0 0% 98%;
    --primary-foreground: 0 0% 9%;
    --secondary: 0 0% 14.9%;
    --secondary-foreground: 0 0% 98%;
    --muted: 0 0% 14.9%;
    --muted-foreground: 0 0% 63.9%;
    --accent: 0 0% 14.9%;
    --accent-foreground: 0 0% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 0 0% 98%;
    --border: 0 0% 14.9%;
    --input: 0 0% 14.9%;
    --ring: 0 0% 83.1%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}
```

### Step 5: Testing & Deployment

#### 5.1 Environment Variables
Create `.env.local`:
```bash
NEXT_PUBLIC_CONVEX_URL=your-convex-deployment-url
```

#### 5.2 Testing Checklist
- [ ] Form validation works correctly
- [ ] Email duplicates are prevented
- [ ] Dark/light mode toggle functions
- [ ] Responsive design on mobile
- [ ] Loading states display properly
- [ ] Success/error messages show
- [ ] Stats update in real-time

#### 5.3 Deploy to Vercel
```bash
# Build and deploy Convex
npx convex deploy --cmd 'npm run build'

# Push to GitHub and deploy via Vercel dashboard
git add .
git commit -m "Initial waitlist landing page"
git push origin main
```

This implementation creates a production-ready waitlist landing page with:
- ✅ Minimalist design using Tailwind defaults
- ✅ Light/dark mode with smooth transitions
- ✅ All shadcn/ui components properly integrated
- ✅ Form validation with error handling
- ✅ Real-time stats display
- ✅ Duplicate email prevention
- ✅ Responsive design
- ✅ Loading states and success feedback
- ✅ Convex backend with proper schema
- ✅ Ready for Vercel deployment

The design is clean, professional, and follows modern web development best practices!

## Additional Resources

- [Next.js 15 Upgrade Guide](https://nextjs.org/docs/app/building-your-application/upgrading)
- [Tailwind CSS v4 Upgrade Guide](https://tailwindcss.com/docs/upgrade-guide)
- [shadcn/ui Documentation](https://ui.shadcn.com/)
- [Convex Documentation](https://docs.convex.dev/)
- [Vercel Deployment Documentation](https://vercel.com/docs)
