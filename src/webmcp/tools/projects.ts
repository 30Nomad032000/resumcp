import { McpTool } from "@/types/webmcp";
import { Action } from "@/context/ResumeContext";
import { ResumeData, Project } from "@/types/resume";

export function projectsTools(
  dispatch: React.Dispatch<Action>,
  getState: () => ResumeData
): McpTool[] {
  return [
    {
      name: "add_project",
      description: "Add a project to the resume.",
      parameters: {
        type: "object",
        properties: {
          name: { type: "string", description: "Project name" },
          description: { type: "string", description: "Project description" },
          url: { type: "string", description: "Project URL" },
          technologies: { type: "array", description: "Technologies used", items: { type: "string" } },
          highlights: { type: "array", description: "Key achievements", items: { type: "string" } },
        },
        required: ["name"],
      },
      execute: async (params) => {
        const id = Math.random().toString(36).substring(2, 10);
        const project: Project = {
          id,
          name: (params.name as string) || "",
          description: (params.description as string) || "",
          url: (params.url as string) || "",
          technologies: (params.technologies as string[]) || [],
          highlights: (params.highlights as string[]) || [],
        };
        dispatch({ type: "ADD_PROJECT", payload: project });
        return { success: true, id };
      },
    },
    {
      name: "remove_project",
      description: "Remove a project by its ID.",
      parameters: {
        type: "object",
        properties: {
          id: { type: "string", description: "ID of the project to remove" },
        },
        required: ["id"],
      },
      execute: async (params) => {
        dispatch({ type: "REMOVE_PROJECT", payload: params.id as string });
        return { success: true };
      },
    },
  ];
}
