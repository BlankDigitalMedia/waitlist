"use client";

import { useState, useEffect } from "react";
import { Container } from "@/components/ui/container";
import { WaitlistForm } from "@/components/waitlist-form";

export default function Home() {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  } | null>(null);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const launchDate = new Date("2025-08-06T00:00:00Z");
      const now = new Date();
      const timeDiff = launchDate.getTime() - now.getTime();
      
      if (timeDiff > 0) {
        const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
        
        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    // Calculate immediately on mount
    calculateTimeLeft();
    
    // Update every second
    const timer = setInterval(calculateTimeLeft, 1000);
    
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Container className="max-w-prose py-16">
        {/* Memo header */}
        <div className="grid gap-y-1 text-sm font-medium mb-8">
          <div><strong>date:</strong> 7/31/2025</div>
          <div><strong>from:</strong> blank, dave</div>
          <div><strong>to:</strong> Early Stage Founders & Small Business Owners</div>
          <div><strong>re:</strong> Understanding your customers shouldn&apos;t be complex or costly</div>
        </div>

        {/* Main content */}
        <div className="prose prose-base md:prose-lg space-y-6">
          <p>Hey, I&apos;m blank but some people call me Dave.</p>
          
          <p>I&apos;ve worked in customer experience tech for 7 years and spent nights and weekends helping small businesses with automation and marketing.</p>
          
          <p>The pattern&apos;s always the same. The tools I specialize in are too expensive or too bloated for the teams who need them most. Big companies get smarter and faster while small teams get stuck with clunky software or nothing at all.</p>
          
          <p>I&apos;m building this to flip that. I want to make it dead simple for startups and scrappy teams to give their customers a world-class experience. No monthly fee the size of a car payment. No 10-tab dashboards. Just one clean survey, sent in seconds.</p>
          
          <div className="mt-8">
            <h2 className="font-semibold mb-4">What it is</h2>
            <p>A lightweight survey tool that lets you send branded NPS (will they tell their friends), CSAT (are they happy), or CES (did you make it easy) surveys over email.</p>
            <p className="mt-4">You get real feedback, fast. Your customers get a clean, on-brand experience. No logins. No setup tutorials. Just signal.</p>
          </div>
        </div>

        {/* Waitlist form */}
        <div className="mt-12">
          <h2 className="text-xl font-semibold mb-6">Join the waitlist</h2>
          <WaitlistForm />
        </div>

        {/* Countdown */}
        <div className="mt-8 text-sm text-muted-foreground">
          <div className="mb-2">Launching in:</div>
          <div className="font-mono text-lg">
            {timeLeft ? (
              <>
                {timeLeft.days > 0 && `${timeLeft.days} days, `}
                {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
              </>
            ) : (
              "Loading..."
            )}
          </div>
          <div className="text-xs mt-1">(on 8/6/2025)</div>
        </div>
      </Container>
    </div>
  );
}
