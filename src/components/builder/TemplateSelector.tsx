"use client";

import { useResumeStore } from "@/hooks/useResumeStore";
import { TemplateName } from "@/types/resume";

const templates: { id: TemplateName; name: string; description: string }[] = [
  {
    id: "professional",
    name: "Professional",
    description: "Classic serif, single-column, navy accents",
  },
  {
    id: "modern",
    name: "Modern",
    description: "Two-column sidebar, teal-indigo gradient",
  },
  {
    id: "minimal",
    name: "Minimal",
    description: "Clean, maximum whitespace, zero decoration",
  },
];

export function TemplateSelector() {
  const { state, setTemplate } = useResumeStore();

  return (
    <div className="flex gap-3">
      {templates.map((t) => (
        <button
          key={t.id}
          onClick={() => setTemplate(t.id)}
          className={`flex-1 rounded-lg border-2 p-3 text-left transition-all ${
            state.template === t.id
              ? "border-indigo-500 bg-indigo-50"
              : "border-gray-200 hover:border-gray-300 bg-white"
          }`}
        >
          <p className="font-medium text-sm text-gray-900">{t.name}</p>
          <p className="text-xs text-gray-500 mt-0.5">{t.description}</p>
        </button>
      ))}
    </div>
  );
}
