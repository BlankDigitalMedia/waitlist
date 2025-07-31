"use client";

import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Users } from "lucide-react";

export function WaitlistStats() {
  const stats = useQuery(api.waitlist.getWaitlistStats);

  if (!stats) {
    return (
      <div className="w-full max-w-sm mx-auto">
        <div className="flex items-center justify-center space-x-2 p-6">
          <div className="h-2 w-2 bg-gray-400 rounded-full animate-pulse"></div>
          <div className="h-2 w-2 bg-gray-400 rounded-full animate-pulse"></div>
          <div className="h-2 w-2 bg-gray-400 rounded-full animate-pulse"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-sm mx-auto">
      <div className="flex items-center justify-center space-x-4 p-6">
        <div className="flex items-center space-x-2">
          <Users className="h-5 w-5 text-muted-foreground" />
          <span className="text-2xl font-bold">{stats.total}</span>
        </div>
        <div className="text-sm text-muted-foreground">
          {stats.total === 1 ? "person" : "people"} waiting
        </div>
      </div>
    </div>
  );
}
