import { internal } from "./_generated/api";
import { internalMutation } from "./_generated/server";
import { v } from "convex/values";

// Placeholder for future email functionality
// These functions are disabled to avoid dependency conflicts
// Re-enable when email functionality is needed

// Send thank you email when user joins waitlist (DISABLED)
export const sendThankYouEmail = internalMutation({
  args: { 
    to: v.string(), 
    name: v.optional(v.string()),
    position: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    console.log(`Email sending disabled - would send to ${args.to}`);
    return "email-disabled";
  },
});

// Handle email status events (DISABLED)
export const handleEmailEvent = internalMutation({
  args: { 
    id: v.string(),
    event: v.any(),
  },
  handler: async (ctx, args) => {
    console.log("Email event handling disabled:", args.id);
  },
});

// Optional: Function to check email status (DISABLED)
export const checkEmailStatus = internalMutation({
  args: { emailId: v.string() },
  handler: async (ctx, args) => {
    console.log(`Email status checking disabled for ${args.emailId}`);
    return "email-disabled";
  },
});
