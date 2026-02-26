"use client";

import React, { forwardRef } from "react";
import { ResumeData } from "@/types/resume";
import { ProfessionalTemplate } from "./ProfessionalTemplate";
import { ModernTemplate } from "./ModernTemplate";
import { MinimalTemplate } from "./MinimalTemplate";

interface TemplateWrapperProps {
  data: ResumeData;
}

export const TemplateWrapper = forwardRef<HTMLDivElement, TemplateWrapperProps>(
  function TemplateWrapper({ data }, ref) {
    const Template = {
      professional: ProfessionalTemplate,
      modern: ModernTemplate,
      minimal: MinimalTemplate,
    }[data.template];

    return (
      <div ref={ref} className="resume-custom">
        <Template data={data} />
        {data.customCss && <style>{data.customCss}</style>}
      </div>
    );
  }
);
