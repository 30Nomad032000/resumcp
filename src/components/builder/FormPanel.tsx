"use client";

import { useState } from "react";
import { PersonalInfoForm } from "@/components/forms/PersonalInfoForm";
import { ExperienceForm } from "@/components/forms/ExperienceForm";
import { EducationForm } from "@/components/forms/EducationForm";
import { SkillsForm } from "@/components/forms/SkillsForm";
import { ProjectsForm } from "@/components/forms/ProjectsForm";

const sections = [
  { id: "personal", label: "Personal Info", Component: PersonalInfoForm },
  { id: "experience", label: "Experience", Component: ExperienceForm },
  { id: "education", label: "Education", Component: EducationForm },
  { id: "skills", label: "Skills", Component: SkillsForm },
  { id: "projects", label: "Projects", Component: ProjectsForm },
] as const;

export function FormPanel() {
  const [openSections, setOpenSections] = useState<Set<string>>(
    new Set(["personal"])
  );

  const toggle = (id: string) => {
    setOpenSections((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="space-y-2">
      {sections.map(({ id, label, Component }) => {
        const isOpen = openSections.has(id);
        return (
          <div key={id} className="rounded-lg border border-gray-200 bg-white overflow-hidden">
            <button
              onClick={() => toggle(id)}
              className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-gray-50 transition-colors"
            >
              <span className="font-medium text-gray-800">{label}</span>
              <svg
                className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {isOpen && (
              <div className="px-4 pb-4">
                <Component />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
