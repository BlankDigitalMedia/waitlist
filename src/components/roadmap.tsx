"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface RoadmapItem {
  title: string;
  description: string;
  status: "done" | "in-progress" | "backlog";
  eta?: string;
}

const roadmapItems: RoadmapItem[] = [
  {
    title: "Email Survey Engine",
    description: "Core functionality to send branded NPS, CSAT, and CES surveys via email with real-time response tracking.",
    status: "done",
    eta: "Launch"
  },
  {
    title: "Dashboard",
    description: "Clean, focused dashboard to view survey responses, track metrics, and export data without complexity.",
    status: "in-progress", 
    eta: "Launch"
  },
  {
    title: "Brand Customization",
    description: "Upload your logo, set colors, and customize survey appearance to match your brand identity.",
    status: "backlog",
    eta: "Week 2"
  },
    {
    title: "API Integration",
    description: "Simple API to integrate surveys into your existing tools and workflows for seamless automation.",
    status: "backlog",
    eta: "Week 3"
  },
  {
    title: "Smart Templates",
    description: "Pre-built survey templates for common use cases like onboarding feedback, feature requests, and churn prevention.",
    status: "backlog",
    eta: "Week 4"
  },
  {
    title: "Auto-Follow Up",
    description: "Automated follow-up surveys based on customer responses and behavior patterns.",
    status: "backlog", 
    eta: "Week 5"
  },

];

const getStatusVariant = (status: RoadmapItem["status"]) => {
  switch (status) {
    case "done":
      return "default";
    case "in-progress":
      return "secondary";
    case "backlog":
      return "outline";
    default:
      return "outline";
  }
};

const getStatusText = (status: RoadmapItem["status"]) => {
  switch (status) {
    case "done":
      return "Done";
    case "in-progress":
      return "In-Progress";
    case "backlog":
      return "Backlog";
    default:
      return "Backlog";
  }
};

export function Roadmap() {
  return (
    <section className="space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-xl font-semibold">What we&apos;re building</h2>
        <p className="text-muted-foreground text-sm max-w-2xl mx-auto">
          Our roadmap focuses on the essentials: fast surveys, real feedback, zero complexity.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
        {roadmapItems.map((item, index) => (
          <Card key={index} className="h-full">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between gap-2">
                <CardTitle className="text-base leading-tight">{item.title}</CardTitle>
                <Badge variant={getStatusVariant(item.status)} className="text-xs shrink-0">
                  {getStatusText(item.status)}
                </Badge>
              </div>
              {item.eta && (
                <div className="text-xs text-muted-foreground">
                  ETA: {item.eta}
                </div>
              )}
            </CardHeader>
            <CardContent className="pt-0">
              <CardDescription className="text-sm leading-relaxed">
                {item.description}
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
