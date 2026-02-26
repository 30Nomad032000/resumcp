"use client";

import { FormPanel } from "./FormPanel";
import { PreviewPanel } from "./PreviewPanel";
import { TemplateSelector } from "./TemplateSelector";
import { PdfDownloadButton } from "./PdfDownloadButton";
import { CustomStyleUploader } from "./CustomStyleUploader";
import { WebMcpStatus } from "./WebMcpStatus";
import { usePdfExport } from "@/hooks/usePdfExport";
import { useResumeStore } from "@/hooks/useResumeStore";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Paintbrush, RotateCcw, ArrowLeft } from "lucide-react";
import Link from "next/link";

export function BuilderLayout() {
  const { contentRef, handlePrint, generating } = usePdfExport();
  const { clearAll } = useResumeStore();

  return (
    <div className="spore-theme min-h-screen bg-background">
      {/* Subtle grid background */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: `
            linear-gradient(#4ADE8040 1px, transparent 1px),
            linear-gradient(90deg, #4ADE8040 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Top Bar */}
      <header
        className="sticky top-0 z-20 border-b"
        style={{
          background: "#0D0D0DE0",
          backdropFilter: "blur(20px) saturate(1.4)",
          borderColor: "#F0ECE310",
        }}
      >
        <div className="max-w-[1600px] mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="flex items-center gap-2 text-sm transition-opacity hover:opacity-70"
              style={{ color: "#F0ECE366", fontFamily: "var(--font-fira-code), monospace" }}
            >
              <ArrowLeft className="size-3.5" />
              Home
            </Link>
            <div
              className="w-[1px] h-5"
              style={{ background: "#F0ECE315" }}
            />
            <span
              className="text-lg font-bold tracking-tight"
              style={{ color: "#F0ECE3", fontFamily: "var(--font-geist-sans), sans-serif" }}
            >
              Resu<span style={{ color: "#4ADE80" }}>MCP</span>
            </span>
            <WebMcpStatus />
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAll}
              className="gap-1.5 text-[#F0ECE355] hover:text-red-400 hover:bg-red-400/10 text-xs"
              style={{ fontFamily: "var(--font-fira-code), monospace" }}
            >
              <RotateCcw className="size-3" />
              Clear
            </Button>
            <PdfDownloadButton onPrint={handlePrint} generating={generating} />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="relative z-10 max-w-[1600px] mx-auto px-6 py-8">
        {/* Template Selector */}
        <div className="mb-8">
          <p
            className="text-xs tracking-[0.2em] uppercase mb-3 flex items-center gap-3"
            style={{ color: "#4ADE80", fontFamily: "var(--font-fira-code), monospace" }}
          >
            <span className="inline-block w-6 h-[1px]" style={{ background: "#4ADE80" }} />
            Template
          </p>
          <TemplateSelector />
        </div>

        {/* Two-panel layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-8">
          {/* Left: Forms */}
          <div className="space-y-4">
            <p
              className="text-xs tracking-[0.2em] uppercase mb-1 flex items-center gap-3"
              style={{ color: "#4ADE80", fontFamily: "var(--font-fira-code), monospace" }}
            >
              <span className="inline-block w-6 h-[1px]" style={{ background: "#4ADE80" }} />
              Resume Data
            </p>
            <FormPanel />

            {/* Custom CSS section */}
            <Accordion type="single" collapsible>
              <AccordionItem
                value="custom-css"
                className="rounded-xl border px-4"
                style={{
                  background: "#1A1412",
                  borderColor: "#F0ECE312",
                }}
              >
                <AccordionTrigger className="hover:no-underline gap-3 py-3">
                  <div className="flex items-center gap-3">
                    <div
                      className="flex items-center justify-center size-7 rounded-lg"
                      style={{ background: "#4ADE8015" }}
                    >
                      <Paintbrush className="size-3.5" style={{ color: "#4ADE80" }} />
                    </div>
                    <span className="font-medium text-sm" style={{ color: "#F0ECE3" }}>
                      Custom Styles
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-4">
                  <CustomStyleUploader />
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          {/* Right: Preview */}
          <div className="lg:sticky lg:top-20 lg:self-start">
            <p
              className="text-xs tracking-[0.2em] uppercase mb-3 flex items-center gap-3"
              style={{ color: "#4ADE80", fontFamily: "var(--font-fira-code), monospace" }}
            >
              <span className="inline-block w-6 h-[1px]" style={{ background: "#4ADE80" }} />
              Live Preview
            </p>
            <PreviewPanel ref={contentRef} />
          </div>
        </div>
      </div>
    </div>
  );
}
