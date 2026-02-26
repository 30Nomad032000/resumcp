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
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Paintbrush, RotateCcw } from "lucide-react";
import Link from "next/link";

export function BuilderLayout() {
  const { contentRef, handlePrint } = usePdfExport();
  const { clearAll } = useResumeStore();

  return (
    <div className="min-h-screen bg-background">
      {/* Top Bar */}
      <header className="sticky top-0 z-10 border-b bg-background/80 backdrop-blur-sm">
        <div className="max-w-[1600px] mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-lg font-bold tracking-tight">
              Resu<span className="text-primary">MCP</span>
            </Link>
            <Separator orientation="vertical" className="h-5" />
            <WebMcpStatus />
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAll}
              className="gap-1.5 text-muted-foreground hover:text-destructive"
            >
              <RotateCcw className="size-3.5" />
              Clear
            </Button>
            <PdfDownloadButton onPrint={handlePrint} />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-[1600px] mx-auto px-4 py-6">
        {/* Template Selector */}
        <div className="mb-6">
          <h2 className="text-sm font-medium text-muted-foreground mb-2 uppercase tracking-wider">
            Template
          </h2>
          <TemplateSelector />
        </div>

        {/* Two-panel layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left: Forms */}
          <div className="space-y-4">
            <FormPanel />

            {/* Custom CSS section */}
            <Accordion type="single" collapsible>
              <AccordionItem
                value="custom-css"
                className="rounded-lg border bg-card px-4"
              >
                <AccordionTrigger className="hover:no-underline gap-3 py-3">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center size-7 rounded-md bg-muted">
                      <Paintbrush className="size-3.5 text-muted-foreground" />
                    </div>
                    <span className="font-medium">Custom Styles</span>
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
            <PreviewPanel ref={contentRef} />
          </div>
        </div>
      </div>
    </div>
  );
}
