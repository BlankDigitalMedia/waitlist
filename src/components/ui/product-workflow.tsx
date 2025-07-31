"use client"

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { MacWindow } from './mac-window';

const workflowSteps = [
  {
    id: 0,
    title: "Customer Event Logged",
    step: "1",
    content: `> Event: Customer completed onboarding.
> Time: 2025-07-31T10:42:19Z
> Trigger: onboarding_complete
> Status: Event captured successfully`,
    description: "Your system logs key customer events automatically"
  },
  {
    id: 1,
    title: "Trigger Fired",
    step: "2",
    content: `> Automation triggered.
> Branded CES survey scheduled for delivery.
> Recipient: jessie@acme.io
> Delivery method: Email via Resend`,
    description: "Smart triggers activate the right survey at the right time"
  },
  {
    id: 2,
    title: "Survey Sent",
    step: "3",
    content: `> CES Survey dispatched via Resend.
> Question: "How easy was it to get started?"
> Theme: dark, includes company logo.
> Delivery status: Sent successfully`,
    description: "Beautiful, branded surveys sent instantly via email"
  },
  {
    id: 3,
    title: "Feedback Received",
    step: "4",
    content: `> Response received at 10:47:02Z
> Answer: "Super easy. Took 2 minutes."
> Score: 1.8 (CES)
> Response time: 5 minutes`,
    description: "Customers respond with real, actionable feedback"
  },
  {
    id: 4,
    title: "Insights Dashboard",
    step: "5",
    content: `> New feedback visualized on dashboard.
> Avg. onboarding CES: 2.3 (last 7 days)
> Alert: Setup friction trending down.
> Action recommended: Review form flow`,
    description: "Insights automatically surface in your dashboard"
  },
  {
    id: 5,
    title: "Team Takes Action",
    step: "6",
    content: `> Action created: Improve mobile form spacing.
> Assigned to: Product Team
> Status: In Progress
> Priority: Medium`,
    description: "Turn feedback into concrete improvements"
  },
  {
    id: 6,
    title: "Results Measured",
    step: "7",
    content: `> Follow-up CES after 14 days: 1.6
> Onboarding drop-off decreased by 18%
> Positive trend detected.
> ROI: 12% improvement in conversion`,
    description: "Track the impact of your improvements over time"
  }
];

interface WorkflowCardProps {
  position: number;
  step: typeof workflowSteps[0];
  handleMove: (steps: number) => void;
  isVisible: boolean;
}

const WorkflowCard: React.FC<WorkflowCardProps> = ({ 
  position, 
  step, 
  handleMove,
  isVisible
}) => {
  const isCenter = position === 0;
  
  if (!isVisible) return null;

  return (
    <div
      onClick={() => handleMove(position)}
      className={cn(
        "absolute left-1/2 top-1/2 cursor-pointer transition-all duration-500 ease-in-out w-80 sm:w-96 md:w-[420px] h-64",
        isCenter ? "z-10 scale-100" : "z-0 scale-95 opacity-70"
      )}
      style={{
        transform: `
          translate(-50%, -50%) 
          translateX(${position * 280}px)
        `,
      }}
    >
      <MacWindow 
        title={step.title}
        className="h-full"
        emailMode={false}
      >
        <div className="p-6 h-full flex flex-col">
          {/* Content */}
          <div className="flex-1 flex flex-col gap-4">
            <pre className="text-sm leading-relaxed text-foreground whitespace-pre-wrap flex-1 overflow-hidden">
              {step.content}
            </pre>
            <p className="text-sm text-muted-foreground italic border-t border-border pt-3">
              {step.description}
            </p>
          </div>
        </div>
      </MacWindow>
    </div>
  );
};

export const ProductWorkflow: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [stepsList] = useState(workflowSteps);

  const handleMove = (steps: number) => {
    if (steps === 0) return;
    
    setCurrentIndex(prevIndex => {
      let newIndex = prevIndex + steps;
      if (newIndex < 0) {
        newIndex = stepsList.length - 1;
      } else if (newIndex >= stepsList.length) {
        newIndex = 0;
      }
      return newIndex;
    });
  };

  const getVisibleSteps = () => {
    const visible = [];
    for (let i = -1; i <= 1; i++) {
      const index = (currentIndex + i + stepsList.length) % stepsList.length;
      visible.push({
        step: stepsList[index],
        position: i,
        index
      });
    }
    return visible;
  };

  return (
    <div className="relative w-full overflow-hidden" style={{ height: 480 }}>
      {/* Cards container with proper padding to prevent cutoff */}
      <div className="relative w-full h-80 px-16 sm:px-24 md:px-40">
        {getVisibleSteps().map(({ step, position, index }) => (
          <WorkflowCard
            key={`${step.id}-${index}`}
            step={step}
            handleMove={handleMove}
            position={position}
            isVisible={true}
          />
        ))}
      </div>
      
      {/* Navigation buttons positioned closer to cards */}
      <div className="absolute bottom-16 left-1/2 flex -translate-x-1/2 gap-3 z-20">
        <button
          onClick={() => handleMove(-1)}
          className={cn(
            "flex h-10 w-10 items-center justify-center transition-all duration-200",
            "bg-primary text-primary-foreground hover:bg-primary/90 shadow-xs",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            "rounded-md"
          )}
          aria-label="Previous step"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <button
          onClick={() => handleMove(1)}
          className={cn(
            "flex h-10 w-10 items-center justify-center transition-all duration-200",
            "bg-primary text-primary-foreground hover:bg-primary/90 shadow-xs",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            "rounded-md"
          )}
          aria-label="Next step"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
      
      {/* Number indicators positioned closer to navigation buttons */}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2 z-20">
        {stepsList.map((_, index: number) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={cn(
              "w-8 h-8 rounded-md text-sm font-medium transition-all duration-200",
              index === currentIndex 
                ? "bg-primary text-primary-foreground shadow-xs" 
                : "bg-background border border-border text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            )}
            aria-label={`Go to step ${index + 1}`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};
