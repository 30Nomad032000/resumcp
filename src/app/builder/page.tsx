"use client";

import { BuilderLayout } from "@/components/builder/BuilderLayout";
import { useResumeStore } from "@/hooks/useResumeStore";

export default function BuilderPage() {
  const { hydrated } = useResumeStore();

  if (!hydrated) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center gap-4"
        style={{ background: "#0D0D0D" }}
      >
        <div className="flex items-center gap-2">
          <span
            className="w-2 h-2 rounded-full animate-pulse"
            style={{ background: "#4ADE80" }}
          />
          <span
            className="text-xs tracking-[0.2em] uppercase"
            style={{ color: "#F0ECE355", fontFamily: "var(--font-fira-code), monospace" }}
          >
            Initializing
          </span>
        </div>
      </div>
    );
  }

  return <BuilderLayout />;
}
