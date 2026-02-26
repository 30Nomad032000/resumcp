"use client";

import React, { forwardRef } from "react";
import { useResumeStore } from "@/hooks/useResumeStore";
import { TemplateWrapper } from "@/components/templates/TemplateWrapper";

export const PreviewPanel = forwardRef<HTMLDivElement>(
  function PreviewPanel(_props, ref) {
    const { state } = useResumeStore();

    return (
      <div className="bg-gray-100 rounded-lg p-4 overflow-auto">
        <div className="shadow-lg" style={{ minHeight: "11in" }}>
          <TemplateWrapper ref={ref} data={state} />
        </div>
      </div>
    );
  }
);
