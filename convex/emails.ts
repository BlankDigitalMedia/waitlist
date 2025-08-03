import { internal } from "./_generated/api";
import { Resend } from "@convex-dev/resend";
import { internalMutation } from "./_generated/server";
import { vEmailId, vEmailEvent } from "@convex-dev/resend";
import { v } from "convex/values";
import { render } from "@react-email/render";
import ThankYouEmail from "./emails/ThankYouEmail";

// Initialize Resend - will be properly configured after setting environment variables
export const resend = new Resend({});

// Send thank you email when user joins waitlist
export const sendThankYouEmail = internalMutation({
  args: { 
    to: v.string(), 
    name: v.optional(v.string()),
    position: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    try {
      // Render the React email component to HTML
      const html = await render(
        ThankYouEmail({ 
          name: args.name, 
          position: args.position 
        })
      );

      // Send the email using Resend
      const emailId = await resend.sendEmail(ctx, {
        from: "Blank Survey <hello@blanktechnology.co>", // Update with your domain
        to: args.to,
        subject: "Thank you for joining the Blank Survey waitlist!",
        html,
      });

      console.log(`Thank you email sent to ${args.to} with ID: ${emailId}`);
      return emailId;
    } catch (error) {
      console.error("Failed to send thank you email:", error);
      throw new Error(`Failed to send thank you email: ${error}`);
    }
  },
});

// Handle email status events (delivery, bounces, etc.)
export const handleEmailEvent = internalMutation({
  args: {
    id: vEmailId,
    event: vEmailEvent,
  },
  handler: async (ctx, args) => {
    console.log("Email event received:", args.id, args.event);
    
    // You can store email status in the database here if needed
    // For example, update a waitlist entry with email delivery status
    
    // Handle different email event types
    if (args.event && typeof args.event === 'object' && 'type' in args.event) {
      const eventType = (args.event as any).type;
      switch (eventType) {
        case "email.delivered":
          console.log(`Email ${args.id} was successfully delivered`);
          break;
        case "email.bounced":
          console.log(`Email ${args.id} bounced:`, args.event);
          break;
        case "email.complained":
          console.log(`Email ${args.id} was marked as spam`);
          break;
        case "email.sent":
          console.log(`Email ${args.id} was sent`);
          break;
        case "email.failed":
          console.log(`Email ${args.id} failed to send`);
          break;
        case "email.opened":
          console.log(`Email ${args.id} was opened`);
          break;
        case "email.clicked":
          console.log(`Email ${args.id} had a link clicked`);
          break;
        case "email.delivery_delayed":
          console.log(`Email ${args.id} delivery was delayed`);
          break;
        default:
          console.log(`Email ${args.id} event:`, eventType);
      }
    } else {
      console.log(`Email ${args.id} received unknown event:`, args.event);
    }
  },
});

// Optional: Function to check email status
export const checkEmailStatus = internalMutation({
  args: { emailId: vEmailId },
  handler: async (ctx, args) => {
    try {
      const status = await resend.status(ctx, args.emailId);
      console.log(`Email ${args.emailId} status:`, status);
      return status;
    } catch (error) {
      console.error("Failed to check email status:", error);
      throw new Error(`Failed to check email status: ${error}`);
    }
  },
});
