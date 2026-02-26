"use client";

import { Download, Loader2 } from "lucide-react";

interface PdfDownloadButtonProps {
  onPrint: () => void;
  generating?: boolean;
}

export function PdfDownloadButton({ onPrint, generating }: PdfDownloadButtonProps) {
  return (
    <button
      onClick={onPrint}
      disabled={generating}
      className="inline-flex items-center gap-2 px-5 py-2 text-xs font-medium tracking-wide transition-all duration-300 rounded-full hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
      style={{
        background: "#4ADE80",
        color: "#0D0D0D",
        fontFamily: "var(--font-geist-sans), sans-serif",
        boxShadow: "0 0 20px #4ADE8025",
      }}
    >
      {generating ? (
        <Loader2 className="size-3.5 animate-spin" />
      ) : (
        <Download className="size-3.5" />
      )}
      {generating ? "Generating..." : "Download PDF"}
    </button>
  );
}
