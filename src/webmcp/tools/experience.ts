import { McpTool } from "@/types/webmcp";
import { Action } from "@/context/ResumeContext";
import { ResumeData, Experience } from "@/types/resume";

export function experienceTools(
  dispatch: React.Dispatch<Action>,
  getState: () => ResumeData
): McpTool[] {
  return [
    {
      name: "add_experience",
      description: "Add a work experience entry to the resume.",
      parameters: {
        type: "object",
        properties: {
          company: { type: "string", description: "Company name" },
          position: { type: "string", description: "Job title / position" },
          location: { type: "string", description: "Job location" },
          startDate: { type: "string", description: "Start date (e.g. Jan 2022)" },
          endDate: { type: "string", description: "End date (e.g. Dec 2023)" },
          current: { type: "boolean", description: "Whether this is the current job" },
          description: { type: "string", description: "Role description" },
          highlights: { type: "array", description: "Key achievements", items: { type: "string" } },
        },
        required: ["company", "position"],
      },
      execute: async (params) => {
        const id = Math.random().toString(36).substring(2, 10);
        const exp: Experience = {
          id,
          company: (params.company as string) || "",
          position: (params.position as string) || "",
          location: (params.location as string) || "",
          startDate: (params.startDate as string) || "",
          endDate: (params.endDate as string) || "",
          current: (params.current as boolean) || false,
          description: (params.description as string) || "",
          highlights: (params.highlights as string[]) || [],
        };
        dispatch({ type: "ADD_EXPERIENCE", payload: exp });
        return { success: true, id };
      },
    },
    {
      name: "update_experience",
      description: "Update an existing experience entry by its ID.",
      parameters: {
        type: "object",
        properties: {
          id: { type: "string", description: "ID of the experience to update" },
          company: { type: "string", description: "Company name" },
          position: { type: "string", description: "Job title" },
          location: { type: "string", description: "Job location" },
          startDate: { type: "string", description: "Start date" },
          endDate: { type: "string", description: "End date" },
          current: { type: "boolean", description: "Currently employed here" },
          description: { type: "string", description: "Role description" },
          highlights: { type: "array", description: "Key achievements", items: { type: "string" } },
        },
        required: ["id"],
      },
      execute: async (params) => {
        const state = getState();
        const existing = state.experience.find((e) => e.id === params.id);
        if (!existing) return { success: false, error: "Experience not found" };
        const updated: Experience = { ...existing, ...params } as Experience;
        dispatch({ type: "UPDATE_EXPERIENCE", payload: updated });
        return { success: true };
      },
    },
    {
      name: "remove_experience",
      description: "Remove an experience entry by its ID.",
      parameters: {
        type: "object",
        properties: {
          id: { type: "string", description: "ID of the experience to remove" },
        },
        required: ["id"],
      },
      execute: async (params) => {
        dispatch({ type: "REMOVE_EXPERIENCE", payload: params.id as string });
        return { success: true };
      },
    },
  ];
}
