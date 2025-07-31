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

// Keep the old submit function for backward compatibility during migration
export const submit = mutation({
  args: { email: v.string(), feedback: v.optional(v.string()) },
  handler: async (ctx, args) => {
    await ctx.db.insert('waitlist', {
      email: args.email,
      createdAt: Date.now(),
      status: "pending",
    });
  },
});
