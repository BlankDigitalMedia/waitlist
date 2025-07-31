"use client";

import { useState } from "react";

// Re-export shadcn UI components
export { Input } from "@/components/ui/input";
export { Textarea } from "@/components/ui/textarea";
export { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface WaitlistFormProps {
  onSuccess?: () => void;
}

export function WaitlistForm({ onSuccess }: WaitlistFormProps) {
  const [email, setEmail] = useState("");
  const [feedback, setFeedback] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) return;
    
    setIsLoading(true);
    
    try {
      // Simple submit handler - console.log for now
      console.log({
        email: email.trim(),
        feedback: feedback.trim(),
        timestamp: new Date().toISOString()
      });
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setIsSubmitted(true);
      onSuccess?.();
    } catch (error) {
      console.error("Failed to submit form:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div 
        className="p-6 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800"
        role="alert"
        aria-live="polite"
      >
        <p className="text-green-800 dark:text-green-200">
          Thanks for joining! We&apos;ll be in touch soon.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <div>
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
          required
          className="w-full"
          aria-label="Email address"
          aria-describedby="email-hint"
          aria-invalid={email.trim() && !email.includes("@") ? "true" : "false"}
        />
        <div id="email-hint" className="sr-only">
          Enter your email address to join the waitlist
        </div>
      </div>
      
      <div>
        <Textarea
          placeholder="Optional: What do you wish feedback tools did better?"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          disabled={isLoading}
          className="w-full h-20 resize-none"
          aria-label="Feedback about current feedback tools (optional)"
          aria-describedby="feedback-hint"
        />
        <div id="feedback-hint" className="sr-only">
          Optional feedback about what you wish current feedback tools did better
        </div>
      </div>
      
      <Button 
        type="submit" 
        disabled={isLoading || !email.trim()}
        className="w-full bg-black hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200 disabled:opacity-50"
        aria-label={isLoading ? "Submitting waitlist form" : "Join the waitlist"}
      >
        {isLoading ? "Joining..." : "Join the waitlist"}
      </Button>
    </form>
  );
}
