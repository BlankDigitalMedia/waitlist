import {
  Html,
  Head,
  Body,
  Container,
  Text,
  Heading,
  Hr,
  Link,
  Preview,
} from "@react-email/components";
import * as React from "react";

interface ThankYouEmailProps {
  name?: string;
  position?: number;
}

export default function ThankYouEmail({ name, position }: ThankYouEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Thank you for joining our waitlist!</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>
            Thank you{name ? `, ${name}` : ""}!
          </Heading>
          
          <Text style={text}>
            We've received your request to join the waitlist for Blank Survey. 
            We're excited to have you on board!
          </Text>

          {position && (
            <Text style={text}>
              You are #{position} on our waitlist. We'll be reaching out to early 
              users very soon with updates on our progress.
            </Text>
          )}

          <Text style={text}>
            Blank Survey is designed to help startups and small businesses gather 
            meaningful feedback through simple, branded surveys delivered via email. 
            No complex dashboards or logins required—just clean, actionable insights.
          </Text>

          <Hr style={hr} />

          <Text style={footer}>
            Stay tuned for updates and early access opportunities!
          </Text>

          <Text style={signature}>
            Best regards,<br />
            The Blank Survey Team
          </Text>

          <Text style={footerText}>
            If you have any questions, feel free to reply to this email.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

// Styles
const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
  maxWidth: "560px",
};

const h1 = {
  color: "#333",
  fontSize: "24px",
  fontWeight: "bold",
  margin: "40px 0",
  padding: "0",
  lineHeight: "32px",
};

const text = {
  color: "#333",
  fontSize: "16px",
  lineHeight: "26px",
  margin: "16px 0",
};

const hr = {
  borderColor: "#cccccc",
  margin: "20px 0",
};

const footer = {
  ...text,
  fontSize: "14px",
  fontWeight: "600",
  color: "#666",
};

const signature = {
  ...text,
  fontSize: "14px",
  color: "#666",
  marginTop: "24px",
};

const footerText = {
  ...text,
  fontSize: "12px",
  color: "#888",
  marginTop: "32px",
};
