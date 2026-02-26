"use client";

import { Separator } from "@/components/ui/separator";

const steps = [
  {
    number: "01",
    title: "Fill or Connect AI",
    description:
      "Enter your info manually, or let your AI agent populate everything through WebMCP.",
  },
  {
    number: "02",
    title: "Pick a Template",
    description:
      "Choose Professional, Modern, or Minimal. Customize further with your own CSS.",
  },
  {
    number: "03",
    title: "Download PDF",
    description:
      "Get an ATS-friendly PDF with real selectable text. Not rasterized — actual text.",
  },
];

export function HowItWorks() {
  return (
    <section className="border-t py-20">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-sm font-medium text-muted-foreground text-center mb-12 uppercase tracking-wider">
          How It Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div key={step.number} className="text-center">
              <div className="text-4xl font-bold text-primary/15 mb-3 font-mono">
                {step.number}
              </div>
              <h3 className="text-base font-semibold text-foreground mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
