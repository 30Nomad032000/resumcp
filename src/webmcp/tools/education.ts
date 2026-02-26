import { McpTool } from "@/types/webmcp";
import { Action } from "@/context/ResumeContext";
import { ResumeData, Education } from "@/types/resume";

export function educationTools(
  dispatch: React.Dispatch<Action>,
  getState: () => ResumeData
): McpTool[] {
  return [
    {
      name: "add_education",
      description: "Add an education entry to the resume.",
      parameters: {
        type: "object",
        properties: {
          institution: { type: "string", description: "School / university name" },
          degree: { type: "string", description: "Degree (e.g. Bachelor of Science)" },
          field: { type: "string", description: "Field of study" },
          startDate: { type: "string", description: "Start date" },
          endDate: { type: "string", description: "End date" },
          gpa: { type: "string", description: "GPA" },
          highlights: { type: "array", description: "Achievements", items: { type: "string" } },
        },
        required: ["institution", "degree"],
      },
      execute: async (params) => {
        const id = Math.random().toString(36).substring(2, 10);
        const edu: Education = {
          id,
          institution: (params.institution as string) || "",
          degree: (params.degree as string) || "",
          field: (params.field as string) || "",
          startDate: (params.startDate as string) || "",
          endDate: (params.endDate as string) || "",
          gpa: (params.gpa as string) || "",
          highlights: (params.highlights as string[]) || [],
        };
        dispatch({ type: "ADD_EDUCATION", payload: edu });
        return { success: true, id };
      },
    },
    {
      name: "remove_education",
      description: "Remove an education entry by its ID.",
      parameters: {
        type: "object",
        properties: {
          id: { type: "string", description: "ID of the education to remove" },
        },
        required: ["id"],
      },
      execute: async (params) => {
        dispatch({ type: "REMOVE_EDUCATION", payload: params.id as string });
        return { success: true };
      },
    },
  ];
}
