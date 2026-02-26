import type { Metadata } from "next";
import { Geist, Geist_Mono, Cormorant, Fira_Code } from "next/font/google";
import "./globals.css";
import { ResumeProvider } from "@/context/ResumeContext";
import { TooltipProvider } from "@/components/ui/tooltip";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const cormorant = Cormorant({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
});

const firaCode = Fira_Code({
  variable: "--font-fira-code",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "ResuMCP - Privacy-First Resume Builder with AI",
  description:
    "Build your resume privately with AI via WebMCP. No data collection, no server storage. 3 templates, custom CSS, ATS-friendly PDF export.",
  openGraph: {
    title: "ResuMCP - Privacy-First Resume Builder",
    description: "Bring your own AI agent to build resumes. 100% private.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${cormorant.variable} ${firaCode.variable} antialiased`}
      >
        <ResumeProvider>
          <TooltipProvider>{children}</TooltipProvider>
        </ResumeProvider>
      </body>
    </html>
  );
}
