import { Hero } from "@/components/landing/Hero";
import { FeatureCards } from "@/components/landing/FeatureCards";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Hero />
      <FeatureCards />
      <HowItWorks />
      <Separator />
      <footer className="py-8 text-center text-sm text-muted-foreground">
        <p>
          ResuMCP &mdash; Privacy-first resume builder. No data leaves your browser.
        </p>
      </footer>
    </main>
  );
}
