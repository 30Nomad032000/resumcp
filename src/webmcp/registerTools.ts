import { McpTool } from "@/types/webmcp";
import { Action } from "@/context/ResumeContext";
import { ResumeData } from "@/types/resume";
import { personalInfoTools } from "./tools/personalInfo";
import { experienceTools } from "./tools/experience";
import { educationTools } from "./tools/education";
import { skillsTools } from "./tools/skills";
import { projectsTools } from "./tools/projects";
import { templateTools } from "./tools/template";
import { resumeDataTools } from "./tools/resumeData";
import { pdfTools } from "./tools/pdf";

export function collectAllTools(
  dispatch: React.Dispatch<Action>,
  getState: () => ResumeData,
  triggerPrint: () => void
): McpTool[] {
  return [
    ...personalInfoTools(dispatch, getState),
    ...experienceTools(dispatch, getState),
    ...educationTools(dispatch, getState),
    ...skillsTools(dispatch, getState),
    ...projectsTools(dispatch, getState),
    ...templateTools(dispatch, getState),
    ...resumeDataTools(dispatch, getState),
    ...pdfTools(triggerPrint),
  ];
}

export function registerAllTools(
  dispatch: React.Dispatch<Action>,
  getState: () => ResumeData,
  triggerPrint: () => void
): (() => void) | null {
  if (typeof navigator === "undefined" || !("modelContext" in navigator)) {
    return null;
  }

  const mc = navigator.modelContext;
  if (!mc) return null;

  const tools = collectAllTools(dispatch, getState, triggerPrint);
  tools.forEach((tool) => mc.registerTool(tool));

  // Return cleanup function
  return () => {
    tools.forEach((tool) => {
      try {
        mc.unregisterTool(tool.name);
      } catch {
        // Tool may already be unregistered
      }
    });
  };
}
