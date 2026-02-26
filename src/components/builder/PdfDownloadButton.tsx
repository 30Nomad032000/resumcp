"use client";

import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

interface PdfDownloadButtonProps {
  onPrint: () => void;
}

export function PdfDownloadButton({ onPrint }: PdfDownloadButtonProps) {
  return (
    <Button onClick={onPrint} size="default" className="gap-2">
      <Download className="size-4" />
      Download PDF
    </Button>
  );
}
