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
          className="rounded-lg border bg-card px-4 data-[state=open]:shadow-sm transition-shadow"
        >
          <AccordionTrigger className="hover:no-underline gap-3 py-3">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center size-7 rounded-md bg-muted">
                <Icon className="size-3.5 text-muted-foreground" />
              </div>
              <span className="font-medium">{label}</span>
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
