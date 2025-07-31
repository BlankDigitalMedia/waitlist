"use client";

import { WaitlistForm } from "@/components/waitlist-form";
import { ThemeToggle } from "@/components/theme-toggle";
import { Countdown } from "@/components/countdown";
import { Roadmap } from "@/components/roadmap";
import { Badge } from "@/components/ui/badge";
import { MacWindow } from "@/components/ui/mac-window";
import { SequentialText } from "@/components/ui/sequential-text";
import { StaggerTestimonials } from "@/components/ui/stagger-testimonials";

export default function Home() {
  const emailLines = [
    "Hey, I'm blank—but some people call me Dave.",
    "",
    "I'm building a lightweight survey tool that lets you send branded NPS, CSAT, or CES surveys over email.",
    "",
    "You get real feedback, fast. Your customers get a clean, on-brand experience. No logins. No setup. Just signal.",
    "",
    "After 7 years in customer experience tech—and a lot of late nights helping small teams—I kept seeing the same thing:",
    "",
    "The best tools are either overpriced, overbuilt, or just plain overwhelming.",
    "",
    "Big companies get smarter. Small ones get stuck with nothing or worse: clunky junk.",
    "",
    "I'm flipping that script.",
    "",
    "No car-payment-sized pricing. No bloated dashboards.",
    "",
    "Just one clean survey, sent in seconds."
  ];
  return (
    <main className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-6">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header aligned with content */}
          <div className="max-w-2xl mx-auto">
            <div className="flex justify-between items-center py-6">
              <div className="flex items-center space-x-2">
                <h1 className="text-2xl font-bold">blank survey</h1>
                <Badge variant="outline">Coming Soon</Badge>
              </div>
              <ThemeToggle />
            </div>
          </div>
          
          <div className="text-center space-y-8">
          <div className="space-y-4">
            <MacWindow title="Founder Note" emailMode={true} className="max-w-3xl mx-auto">
              {/* Email Headers */}
              <div className="space-y-2 mb-6 text-xs bg-muted/30 px-4 py-3 border-b border-border">
                <div className="flex">
                  <span className="w-12 text-muted-foreground">FROM:</span>
                  <span>Dave Blank</span>
                </div>
                <div className="flex">
                  <span className="w-12 text-muted-foreground">TO:</span>
                  <span className="italic">Early Stage Founders & Small Business Owners</span>
                </div>
                <div className="flex">
                  <span className="w-12 text-muted-foreground">SUBJ:</span>
                  <span className="font-bold">Understanding your customers shouldn&apos;t be complex or costly</span>
                </div>
              </div>
              
              <SequentialText lines={emailLines} />
            </MacWindow>
          </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-4">From webhook to wow in 5 steps</h2>
            <p className="text-muted-foreground">See how one webhook turns into happy customers and growing revenue</p>
          </div>
          <StaggerTestimonials />
        </div>
      </section>

      {/* Waitlist Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">Ready to get started?</h2>
              <p className="text-muted-foreground">Join the waitlist to be notified when blank survey launches</p>
            </div>
            <WaitlistForm />
            <Countdown />
          </div>
        </div>
      </section>

      {/* Roadmap Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <Roadmap />
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 border-t">
        <div className="flex justify-center items-center space-x-4 text-sm text-muted-foreground">
          <span>© 2025 blank. All rights reserved.</span>
        </div>
      </footer>
    </main>
  );
}
