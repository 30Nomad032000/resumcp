"use client";

import React, { forwardRef } from "react";
import { useResumeStore } from "@/hooks/useResumeStore";
import { TemplateWrapper } from "@/components/templates/TemplateWrapper";

export const PreviewPanel = forwardRef<HTMLDivElement>(
  function PreviewPanel(_props, ref) {
    const { state } = useResumeStore();

    return (
      <div
        className="rounded-xl p-4 overflow-auto border"
        style={{
          background: "#1A1412",
          borderColor: "#F0ECE30A",
          boxShadow: "0 4px 40px rgba(0,0,0,0.3), inset 0 1px 0 #F0ECE308",
        }}
      >
        <div
          className="bg-white shadow-2xl rounded-sm mx-auto"
          style={{
            minHeight: "11in",
            maxWidth: "8.5in",
            boxShadow: "0 8px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(240,236,227,0.05)",
          }}
        >
          <TemplateWrapper ref={ref} data={state} />
        </div>
      </div>
    );
  }
);
