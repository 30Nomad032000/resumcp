import { McpTool } from "@/types/webmcp";
import { Action } from "@/context/ResumeContext";
import { ResumeData } from "@/types/resume";

export function personalInfoTools(
  dispatch: React.Dispatch<Action>,
  getState: () => ResumeData
): McpTool[] {
  return [
    {
      name: "set_personal_info",
      description:
        "Set personal information fields on the resume. You can set any subset of fields.",
      parameters: {
        type: "object",
        properties: {
          fullName: { type: "string", description: "Full name" },
          email: { type: "string", description: "Email address" },
          phone: { type: "string", description: "Phone number" },
          location: { type: "string", description: "City, State or location" },
          website: { type: "string", description: "Personal website URL" },
          linkedin: { type: "string", description: "LinkedIn profile URL or handle" },
          summary: { type: "string", description: "Professional summary paragraph" },
        },
      },
      execute: async (params) => {
        dispatch({ type: "SET_PERSONAL_INFO", payload: params as Record<string, string> });
        return { success: true, updated: Object.keys(params) };
      },
    },
  ];
}
