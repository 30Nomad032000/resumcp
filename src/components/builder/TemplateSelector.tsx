"use client";

import { useResumeStore } from "@/hooks/useResumeStore";
import { TemplateName } from "@/types/resume";
import { cn } from "@/lib/utils";
import { FileText, LayoutDashboard, Minus } from "lucide-react";

const templates: { id: TemplateName; name: string; description: string; icon: React.ElementType }[] = [
  {
    id: "professional",
    name: "Professional",
    description: "Classic single-column, navy accents",
    icon: FileText,
  },
  {
    id: "modern",
    name: "Modern",
    description: "Two-column sidebar, gradient",
    icon: LayoutDashboard,
  },
  {
    id: "minimal",
    name: "Minimal",
    description: "Maximum whitespace, zero decoration",
    icon: Minus,
  },
];

export function TemplateSelector() {
  const { state, setTemplate } = useResumeStore();

  return (
    <div className="flex gap-2">
      {templates.map((t) => {
        const Icon = t.icon;
        const isActive = state.template === t.id;
        return (
          <button
            key={t.id}
            onClick={() => setTemplate(t.id)}
            className={cn(
              "flex-1 rounded-lg border-2 p-3 text-left transition-all",
              isActive
                ? "border-primary bg-primary/5 shadow-sm"
                : "border-border hover:border-muted-foreground/30 bg-card"
            )}
          >
            <div className="flex items-center gap-2 mb-1">
              <Icon className={cn("size-4", isActive ? "text-primary" : "text-muted-foreground")} />
              <span className={cn("text-sm font-medium", isActive ? "text-primary" : "text-foreground")}>
                {t.name}
              </span>
            </div>
            <p className="text-xs text-muted-foreground leading-snug">{t.description}</p>
          </button>
        );
      })}
    </div>
  );
}
