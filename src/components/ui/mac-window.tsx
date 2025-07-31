import React from "react";
import { cn } from "@/lib/utils";

interface MacWindowProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export function MacWindow({ title = "TeachText", children, className }: MacWindowProps) {
  return (
    <div className={cn(
      "bg-card border-2 border-border rounded-none shadow-xl",
      className
    )}>
      {/* Title Bar */}
      <div className="bg-secondary border-b-2 border-border px-3 py-2 flex items-center justify-between relative">
        {/* Window Controls */}
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-muted border-2 border-border" />
          <div className="w-4 h-4 bg-muted border-2 border-border relative">
            <div className="absolute inset-1 bg-foreground" />
          </div>
        </div>
        
        {/* Title */}
        <div className="text-sm font-bold text-secondary-foreground absolute left-1/2 transform -translate-x-1/2">
          {title}
        </div>
        
        {/* Right side spacer */}
        <div className="w-12" />
      </div>
      
      {/* Content Area */}
      <div className="bg-card p-6 min-h-[300px] font-mono text-sm text-card-foreground text-left">
        {children}
      </div>
    </div>
  );
}
