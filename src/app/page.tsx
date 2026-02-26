import { Hero } from "@/components/landing/Hero";
import { FeatureCards } from "@/components/landing/FeatureCards";
import { HowItWorks } from "@/components/landing/HowItWorks";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <FeatureCards />
      <HowItWorks />
      <footer className="bg-gray-50 border-t border-gray-200 py-8 text-center text-sm text-gray-500">
        <p>
          ResuMCP &mdash; Privacy-first resume builder. No data leaves your browser.
        </p>
      </footer>
    </main>
  );
}
