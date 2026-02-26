import { McpTool } from "@/types/webmcp";
import { Action } from "@/context/ResumeContext";
import { ResumeData, TemplateName } from "@/types/resume";

export function templateTools(
  dispatch: React.Dispatch<Action>,
  getState: () => ResumeData
): McpTool[] {
  return [
    {
      name: "get_available_templates",
      description: "Get the list of available resume templates.",
      parameters: { type: "object", properties: {} },
      execute: async () => {
        return {
          templates: [
            { id: "professional", name: "Professional", description: "Classic serif, single-column, navy accents" },
            { id: "modern", name: "Modern", description: "Two-column sidebar, teal-indigo gradient" },
            { id: "minimal", name: "Minimal", description: "Clean, maximum whitespace, zero decoration" },
          ],
          current: getState().template,
        };
      },
    },
    {
      name: "set_template",
      description: "Change the resume template. Options: professional, modern, minimal.",
      parameters: {
        type: "object",
        properties: {
          template: {
            type: "string",
            description: "Template name",
            enum: ["professional", "modern", "minimal"],
          },
        },
        required: ["template"],
      },
      execute: async (params) => {
        dispatch({ type: "SET_TEMPLATE", payload: params.template as TemplateName });
        return { success: true, template: params.template };
      },
    },
    {
      name: "set_custom_css",
      description: "Set custom CSS to override template styles. CSS is scoped under .resume-custom.",
      parameters: {
        type: "object",
        properties: {
          css: { type: "string", description: "CSS string to apply" },
        },
        required: ["css"],
      },
      execute: async (params) => {
        dispatch({ type: "SET_CUSTOM_CSS", payload: params.css as string });
        return { success: true };
      },
    },
  ];
}
