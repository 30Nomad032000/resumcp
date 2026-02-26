"use client";

import { FormPanel } from "./FormPanel";
import { PreviewPanel } from "./PreviewPanel";
import { TemplateSelector } from "./TemplateSelector";
import { PdfDownloadButton } from "./PdfDownloadButton";
import { CustomStyleUploader } from "./CustomStyleUploader";
import { WebMcpStatus } from "./WebMcpStatus";
import { usePdfExport } from "@/hooks/usePdfExport";
import { useResumeStore } from "@/hooks/useResumeStore";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export function BuilderLayout() {
  const { contentRef, handlePrint } = usePdfExport();
  const { clearAll } = useResumeStore();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Bar */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-[1600px] mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-xl font-bold text-gray-900">
              Resu<span className="text-indigo-600">MCP</span>
            </Link>
            <WebMcpStatus />
          </div>
          <div className="flex items-center gap-3">
            <Button variant="danger" size="sm" onClick={clearAll}>
              Clear All
            </Button>
            <PdfDownloadButton onPrint={handlePrint} />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-[1600px] mx-auto px-4 py-6">
        {/* Template Selector */}
        <div className="mb-6">
          <h2 className="text-sm font-medium text-gray-700 mb-2">Template</h2>
          <TemplateSelector />
        </div>

        {/* Two-panel layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left: Forms */}
          <div className="space-y-4">
            <FormPanel />
            <div className="rounded-lg border border-gray-200 bg-white p-4">
              <h3 className="font-medium text-gray-800 mb-3">Custom Styles</h3>
              <CustomStyleUploader />
            </div>
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
