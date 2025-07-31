import { WaitlistForm } from "@/components/waitlist-form";
import { ThemeToggle } from "@/components/theme-toggle";
import { Countdown } from "@/components/countdown";
import { Roadmap } from "@/components/roadmap";
import { Badge } from "@/components/ui/badge";
import { MacWindow } from "@/components/ui/mac-window";

export default function Home() {
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
            <MacWindow title="Founder Note" className="max-w-3xl mx-auto">
              <div className="space-y-2 mb-6 text-xs">
                <div>date: 7/31/2025</div>
                <div>from: blank, dave</div>
                <div className="italic">to: Early Stage Founders & Small Business Owners</div>
                <div>subject: <strong>Understanding your customers shouldn&apos;t be complex or costly</strong></div>
              </div>
              
              <div className="space-y-4 text-sm leading-6">
                <p>Hey, I&apos;m blank but some people call me Dave.</p>
                
                <p>I&apos;ve worked in customer experience tech for 7 years and spent nights and weekends helping small businesses with automation and marketing.</p>
                
                <p>The pattern&apos;s always the same. The tools I specialize in are too expensive or too bloated for the teams who need them most. Big companies get smarter and faster while <strong>small teams get stuck with clunky software or nothing at all.</strong></p>
                
                <p>I&apos;m building this to flip that. I want to make it dead simple for startups and scrappy teams to give their customers a world-class experience. No monthly fee the size of a car payment. No 10-tab dashboards. <strong>Just one clean survey, sent in seconds.</strong></p>
                
                <div className="mt-6">
                  <div className="mb-3">What it is</div>
                  <p>A lightweight survey tool that lets you send branded NPS, CSAT, or CES surveys over email.</p>
                  <p className="mt-3">You get real feedback, fast. Your customers get a clean, on-brand experience. No logins. No setup tutorials. Just signal.</p>
                </div>
              </div>
            </MacWindow>
          </div>

          {/* Waitlist Form */}
          <div className="space-y-8 mt-16">
            <h2 className="text-xl font-semibold">Join the waitlist</h2>
            <WaitlistForm />

            <Countdown />
          </div>
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
