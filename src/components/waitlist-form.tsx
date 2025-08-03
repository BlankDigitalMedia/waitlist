"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Loader2, CheckCircle } from "lucide-react";

const formSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  feedback: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

export function WaitlistForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const submitToWaitlist = useMutation(api.waitlist.submit);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      feedback: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      await submitToWaitlist({
        email: data.email,
        feedback: data.feedback,
      });
      setIsSubmitted(true);
      toast.success("Successfully joined the waitlist!");
    } catch (error) {
      if (error instanceof Error && error.message.includes("already registered")) {
        toast.error("This email is already registered for our waitlist.");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    }
  };

  if (isSubmitted) {
    return (
      <div className="w-full max-w-md mx-auto">
        <div className="flex flex-col items-center text-center space-y-4 p-6">
          <CheckCircle className="h-12 w-12 text-green-500" />
          <h3 className="text-lg font-semibold">You&apos;re on the list!</h3>
          <p className="text-sm text-muted-foreground">
            We&apos;ll notify you when we&apos;re ready to launch.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Input
            type="email"
            placeholder="Enter your email"
            {...form.register("email")}
            disabled={form.formState.isSubmitting}
          />
          {form.formState.errors.email && (
            <p className="text-sm text-red-500">
              {form.formState.errors.email.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Textarea
            placeholder="Optional: What do you wish feedback tools did better?"
            {...form.register("feedback")}
            disabled={form.formState.isSubmitting}
            className="h-20 resize-none"
          />
        </div>

        <Button
          type="submit"
          className="w-full"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Joining...
            </>
          ) : (
            "Join the waitlist"
          )}
        </Button>
      </form>
    </div>
  );
}
