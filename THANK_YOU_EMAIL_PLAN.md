# Plan: Thank You Email on Waitlist Signup

## Goal
Send a branded "Thank you, we'll be in touch soon" email automatically when a user joins the waitlist, using Convex, the Convex Resend component, and React Email.

---

## 1. Dependencies
- **Convex Resend Component**
  ```sh
  npm install @convex-dev/resend
  ```
- **React Email**
  ```sh
  npm install react-email @react-email/components react react-dom
  ```
- **Resend Node.js SDK** (if needed)
  ```sh
  npm install resend
  ```

---

## 2. Create a React Email Template
Create `ThankYouEmail.tsx`:
```tsx
import { Html, Container, Text } from "@react-email/components";
import * as React from "react";

export default function ThankYouEmail({ name }: { name?: string }) {
  return (
    <Html>
      <Container style={{ padding: "24px", background: "#f9f9f9" }}>
        <Text style={{ fontSize: "20px", fontWeight: "bold" }}>
          Thank you{name ? `, ${name}` : ""}!
        </Text>
        <Text>
          We’ve received your request to join the waitlist. We’ll be in touch soon with updates.
        </Text>
        <Text style={{ marginTop: "24px", color: "#888" }}>
          — The Blank Survey Team
        </Text>
      </Container>
    </Html>
  );
}
```

---

## 3. Render Email to HTML
Use React Email’s render utility:
```ts
import { render } from "@react-email/render";
import ThankYouEmail from "./ThankYouEmail";

const html = render(<ThankYouEmail name="Dave" />);
```

---

## 4. Send Email via Convex Resend Component
In your Convex mutation (e.g., `convex/waitlist.ts`):
```ts
import { Resend } from "@convex-dev/resend";
import { internalMutation } from "./_generated/server";
import ThankYouEmail from "./emails/ThankYouEmail";
import { render } from "@react-email/render";

export const resend = new Resend(/* ... */);

export const sendThankYouEmail = internalMutation({
  args: { to: v.string(), name: v.optional(v.string()) },
  handler: async (ctx, args) => {
    const html = render(<ThankYouEmail name={args.name} />);
    await resend.sendEmail(ctx, {
      from: "Blank Survey <hello@yourdomain.com>",
      to: args.to,
      subject: "Thank you for joining the waitlist!",
      html,
    });
  },
});
```

---

## 5. Trigger Email on Waitlist Signup
Call the mutation with the user's email and name when they sign up.

---

## 6. (Optional) Handle Delivery Events
Use Resend webhook handler to track delivery, bounces, etc.

---

## References
- [Convex Resend Component Docs](https://github.com/get-convex/resend)
- [Resend Docs](https://resend.com/docs)
- [React Email Docs](https://react.email/docs)

---

Let me know if you want code for a specific file, or help wiring this up in your project!
