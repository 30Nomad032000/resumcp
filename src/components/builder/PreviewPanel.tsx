"use client";

import React, { forwardRef } from "react";
import { useResumeStore } from "@/hooks/useResumeStore";
import { TemplateWrapper } from "@/components/templates/TemplateWrapper";

export const PreviewPanel = forwardRef<HTMLDivElement>(
  function PreviewPanel(_props, ref) {
    const { state } = useResumeStore();

    return (
      <div className="rounded-xl bg-muted/50 p-4 overflow-auto border">
        <div
          className="bg-white shadow-lg rounded-sm mx-auto"
          style={{ minHeight: "11in", maxWidth: "8.5in" }}
        >
          <TemplateWrapper ref={ref} data={state} />
        </div>
      </div>
    );
  }
);
