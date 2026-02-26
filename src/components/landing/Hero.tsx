"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="max-w-5xl mx-auto px-6 py-24 sm:py-32 text-center">
        <h1 className="text-5xl sm:text-6xl font-bold tracking-tight text-gray-900">
          Build your resume
          <br />
          <span className="text-indigo-600">with AI, privately.</span>
        </h1>
        <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
          ResuMCP is a privacy-first resume builder. Bring your own AI agent via
          WebMCP, or fill forms manually. No data collection, no server storage.
          Your resume stays on your device.
        </p>
        <div className="mt-10 flex items-center justify-center gap-4">
          <Link href="/builder">
            <Button size="lg">Start Building</Button>
          </Link>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="secondary" size="lg">
              View Source
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}
