"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Shield, Sparkles } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      <div className="relative max-w-4xl mx-auto px-6 py-28 sm:py-36">
        <div className="flex justify-center mb-6">
          <Badge variant="outline" className="gap-1.5 px-3 py-1 text-xs">
            <Shield className="size-3" />
            100% client-side. Zero data collection.
          </Badge>
        </div>

        <h1 className="text-center text-5xl sm:text-7xl font-bold tracking-tight text-foreground leading-[1.08]">
          Build your resume
          <br />
          <span className="text-primary/80">with your AI.</span>
        </h1>

        <p className="mt-6 text-center text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
          Bring your own AI agent via WebMCP, or fill forms manually.
          Private by design — your data never leaves your browser.
        </p>

        <div className="mt-10 flex items-center justify-center gap-3">
          <Link href="/builder">
            <Button size="lg" className="gap-2 px-8">
              Start Building
              <ArrowRight className="size-4" />
            </Button>
          </Link>
          <Link
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="outline" size="lg">
              View Source
            </Button>
          </Link>
        </div>

        {/* Floating accent pills */}
        <div className="mt-16 flex flex-wrap justify-center gap-2">
          {[
            "Privacy-first",
            "WebMCP",
            "3 Templates",
            "Custom CSS",
            "ATS-friendly PDF",
            "No sign-up",
          ].map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
