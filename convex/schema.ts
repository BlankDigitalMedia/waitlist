import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  waitlist: defineTable({
    email: v.string(),
    feedback: v.optional(v.string()), // Keep feedback field for the submit function
    name: v.optional(v.string()),
    company: v.optional(v.string()),
    interests: v.optional(v.array(v.string())),
    referralSource: v.optional(v.string()),
    createdAt: v.number(),
    status: v.optional(v.union(v.literal("pending"), v.literal("approved"), v.literal("declined"))), // Make status optional for backward compatibility
  })
    .index("by_email", ["email"])
    .index("by_status", ["status"])
    .index("by_created_at", ["createdAt"]),
});
