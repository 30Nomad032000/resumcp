import { McpTool } from "@/types/webmcp";
import { Action } from "@/context/ResumeContext";
import { ResumeData } from "@/types/resume";

export function resumeDataTools(
  dispatch: React.Dispatch<Action>,
  getState: () => ResumeData
): McpTool[] {
  return [
    {
      name: "get_resume_data",
      description:
        "Get the complete current resume data including personal info, experience, education, skills, projects, and template settings.",
      parameters: { type: "object", properties: {} },
      execute: async () => {
        return getState();
      },
    },
    {
      name: "import_resume",
      description: "Import a complete resume data object, replacing all current data.",
      parameters: {
        type: "object",
        properties: {
          data: { type: "object", description: "Complete ResumeData object to import" },
        },
        required: ["data"],
      },
      execute: async (params) => {
        dispatch({ type: "IMPORT_DATA", payload: params.data as ResumeData });
        return { success: true };
      },
    },
    {
      name: "clear_resume",
      description: "Clear all resume data and reset to empty state.",
      parameters: { type: "object", properties: {} },
      execute: async () => {
        dispatch({ type: "CLEAR_ALL" });
        return { success: true, message: "Resume data cleared" };
      },
    },
  ];
}
