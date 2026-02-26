"use client";

import { useRef, useCallback } from "react";
import { useReactToPrint } from "react-to-print";

export function usePdfExport() {
  const contentRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    contentRef,
    documentTitle: "Resume",
    pageStyle: `
      @page {
        size: letter;
        margin: 0;
      }
      @media print {
        body {
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }
        .resume-entry {
          break-inside: avoid;
        }
      }
    `,
  });

  return { contentRef, handlePrint };
}
