"use client";

import { BuilderLayout } from "@/components/builder/BuilderLayout";
import { useResumeStore } from "@/hooks/useResumeStore";

export default function BuilderPage() {
  const { hydrated } = useResumeStore();

  if (!hydrated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-pulse text-gray-400">Loading...</div>
      </div>
    );
  }

  return <BuilderLayout />;
}
