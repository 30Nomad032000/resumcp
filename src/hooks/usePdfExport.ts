"use client";

import { useRef, useCallback, useState } from "react";
import html2canvas from "html2canvas-pro";
import { jsPDF } from "jspdf";

export function usePdfExport() {
  const contentRef = useRef<HTMLDivElement>(null);
  const [generating, setGenerating] = useState(false);

  const handlePrint = useCallback(async () => {
    const el = contentRef.current;
    if (!el || generating) return;

    setGenerating(true);
    try {
      // Letter size in points: 612 x 792
      const LETTER_W = 612;
      const LETTER_H = 792;
      const SCALE = 2; // 2x for crisp output

      const canvas = await html2canvas(el, {
        scale: SCALE,
        useCORS: true,
        backgroundColor: "#ffffff",
        width: el.scrollWidth,
        height: el.scrollHeight,
      });

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "pt",
        format: "letter",
      });

      const imgData = canvas.toDataURL("image/png");

      // Scale image to fit letter width, then paginate if needed
      const imgW = LETTER_W;
      const imgH = (canvas.height / canvas.width) * LETTER_W;

      let yOffset = 0;
      let page = 0;

      while (yOffset < imgH) {
        if (page > 0) {
          pdf.addPage("letter", "portrait");
        }

        // Draw the portion of the image for this page
        pdf.addImage(imgData, "PNG", 0, -yOffset, imgW, imgH);

        yOffset += LETTER_H;
        page++;
      }

      pdf.save("resume.pdf");
    } catch (err) {
      console.error("PDF generation failed:", err);
    } finally {
      setGenerating(false);
    }
  }, [generating]);

  return { contentRef, handlePrint, generating };
}
