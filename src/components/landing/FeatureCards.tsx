"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Cpu, LayoutTemplate } from "lucide-react";

const features = [
  {
    title: "100% Private",
    description:
      "No servers, no databases, no tracking. Everything stays in your browser's localStorage. Export and leave — we keep nothing.",
    icon: Shield,
  },
  {
    title: "AI via WebMCP",
    description:
      "Connect your AI agent through WebMCP. It reads and writes resume data through 18 standardized tools — no API keys needed.",
    icon: Cpu,
  },
  {
    title: "3 Templates + CSS",
    description:
      "Professional, Modern, and Minimal templates built for ATS. Inject custom CSS to make it yours.",
    icon: LayoutTemplate,
  },
];

export function FeatureCards() {
  return (
    <section className="border-t bg-muted/30 py-20">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-sm font-medium text-muted-foreground text-center mb-10 uppercase tracking-wider">
          Why ResuMCP
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Card key={feature.title} className="bg-card">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-center size-10 rounded-lg bg-primary/5 mb-3">
                    <Icon className="size-5 text-primary" />
                  </div>
                  <CardTitle className="text-base">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
