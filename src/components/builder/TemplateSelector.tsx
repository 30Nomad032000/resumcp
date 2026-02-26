"use client";

import { useResumeStore } from "@/hooks/useResumeStore";
import { TemplateName } from "@/types/resume";
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
    <div className="flex gap-3">
      {templates.map((t) => {
        const Icon = t.icon;
        const isActive = state.template === t.id;
        return (
          <button
            key={t.id}
            onClick={() => setTemplate(t.id)}
            className="flex-1 p-4 text-left transition-all duration-300 rounded-xl border relative overflow-hidden"
            style={{
              background: isActive ? "#1A1412" : "#1A141280",
              borderColor: isActive ? "#4ADE8040" : "#F0ECE30A",
              boxShadow: isActive ? "0 0 30px #4ADE8010, inset 0 1px 0 #4ADE8015" : "none",
            }}
          >
            {/* Active top glow */}
            {isActive && (
              <div
                className="absolute top-0 left-0 right-0 h-[2px]"
                style={{ background: "linear-gradient(90deg, transparent, #4ADE8060, transparent)" }}
              />
            )}
            <div className="flex items-center gap-3 mb-2">
              <div
                className="flex items-center justify-center size-8 rounded-lg transition-colors duration-300"
                style={{
                  background: isActive ? "#4ADE8018" : "#F0ECE308",
                }}
              >
                <Icon
                  className="size-4 transition-colors duration-300"
                  style={{ color: isActive ? "#4ADE80" : "#F0ECE355" }}
                />
              </div>
              <span
                className="text-sm font-medium transition-colors duration-300"
                style={{
                  color: isActive ? "#F0ECE3" : "#F0ECE388",
                  fontFamily: "var(--font-geist-sans), sans-serif",
                }}
              >
                {t.name}
              </span>
            </div>
            <p
              className="text-xs leading-snug transition-colors duration-300"
              style={{
                color: isActive ? "#F0ECE355" : "#F0ECE333",
                fontFamily: "var(--font-fira-code), monospace",
              }}
            >
              {t.description}
            </p>
          </button>
        );
      })}
    </div>
  );
}
