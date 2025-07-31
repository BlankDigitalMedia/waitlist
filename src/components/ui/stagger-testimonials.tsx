"use client"

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { MacWindow } from './mac-window';

const workflowSteps = [
  {
    tempId: 1,
    title: "Action Triggers Survey",
    step: "1",
    content: `> Customer completes onboarding
> Your system sends webhook to blank
> Survey automatically queued for delivery
> No manual work required`,
    description: "Your customers do something important, we handle the rest"
  },
  {
    tempId: 2,
    title: "Simple Survey Delivered",
    step: "2",
    content: `> Branded CES survey sent via email
> Matches your company colors & logo
> Clean, mobile-friendly design
> "How easy was it to get started?"`,
    description: "Surveys that feel like part of your brand"
  },
  {
    tempId: 3,
    title: "Customers Actually Respond",
    step: "3",
    content: `> 78% open rate (industry avg: 21%)
> Response in under 5 minutes
> "Super easy, took 2 minutes!"`,
    description: "Clean design gets 3x higher response rates"
  },
  {
    tempId: 4,
    title: "AI Spots the Gold",
    step: "4",
    content: `> AI detects: "Mobile form spacing issue"
> Recommendation: Simplify step 2
> Priority: High impact, quick fix`,
    description: "Smart insights you'd never catch manually"
  },
  {
    tempId: 5,
    title: "Happy Customers",
    step: "5",
    content: `> Fix deployed: 18% fewer drop-offs
> Follow-up CES improved to 4.6
> Customer satisfaction trending up`,
    description: "Turn feedback into business growth, automatically"
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
        "absolute left-1/2 top-1/2 cursor-pointer transition-all duration-500 ease-in-out w-80 sm:w-96 md:w-[480px] h-64",
        isCenter ? "z-10 scale-100" : "z-0 scale-95 opacity-70"
      )}
      style={{
        transform: `
          translate(-50%, -50%) 
          translateX(${position * 320}px)
        `,
      }}
    >
      <MacWindow 
        title={step.title} 
        className="h-full"
        emailMode={false}
      >
        <div className="p-4 h-full flex flex-col">
          {/* Step number badge */}
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-6 bg-primary text-primary-foreground text-xs font-bold rounded-full flex items-center justify-center">
              {step.step}
            </div>
            <span className="text-xs text-muted-foreground font-medium">{step.description}</span>
          </div>
          
          {/* Terminal content */}
          <div className="flex-1 bg-muted/30 rounded-md p-3 text-xs leading-relaxed overflow-hidden">
            <pre className="whitespace-pre-wrap text-foreground">{step.content}</pre>
          </div>
        </div>
      </MacWindow>
    </div>
  );
};

export const StaggerTestimonials: React.FC = () => {
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
    <div className="relative w-full overflow-hidden" style={{ height: 500 }}>
      {/* Cards container with proper padding to prevent cutoff */}
      <div className="relative w-full h-80 px-16 sm:px-24 md:px-40">
        {getVisibleSteps().map(({ step, position, index }) => (
          <WorkflowCard
            key={`${step.tempId}-${index}`}
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
              "w-6 h-6 rounded-md text-xs font-medium transition-all duration-200",
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
