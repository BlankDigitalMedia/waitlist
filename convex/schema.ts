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
