"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { PersonalInfoForm } from "@/components/forms/PersonalInfoForm";
import { ExperienceForm } from "@/components/forms/ExperienceForm";
import { EducationForm } from "@/components/forms/EducationForm";
import { SkillsForm } from "@/components/forms/SkillsForm";
import { ProjectsForm } from "@/components/forms/ProjectsForm";
import { User, Briefcase, GraduationCap, Wrench, FolderOpen } from "lucide-react";

const sections = [
  { id: "personal", label: "Personal Info", icon: User, Component: PersonalInfoForm },
  { id: "experience", label: "Experience", icon: Briefcase, Component: ExperienceForm },
  { id: "education", label: "Education", icon: GraduationCap, Component: EducationForm },
  { id: "skills", label: "Skills", icon: Wrench, Component: SkillsForm },
  { id: "projects", label: "Projects", icon: FolderOpen, Component: ProjectsForm },
] as const;

export function FormPanel() {
  return (
    <Accordion type="multiple" defaultValue={["personal"]} className="space-y-2">
      {sections.map(({ id, label, icon: Icon, Component }) => (
        <AccordionItem
          key={id}
          value={id}
          className="rounded-xl border px-4 transition-all duration-200 data-[state=open]:border-[#4ADE8020]"
          style={{
            background: "#1A1412",
            borderColor: "#F0ECE30A",
          }}
        >
          <AccordionTrigger className="hover:no-underline gap-3 py-3">
            <div className="flex items-center gap-3">
              <div
                className="flex items-center justify-center size-7 rounded-lg"
                style={{ background: "#4ADE8012" }}
              >
                <Icon className="size-3.5" style={{ color: "#4ADE80" }} />
              </div>
              <span
                className="font-medium text-sm"
                style={{ color: "#F0ECE3", fontFamily: "var(--font-geist-sans), sans-serif" }}
              >
                {label}
              </span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="pb-4">
            <Component />
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
