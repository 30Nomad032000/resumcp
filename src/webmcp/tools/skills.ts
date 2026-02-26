import { McpTool } from "@/types/webmcp";
import { Action } from "@/context/ResumeContext";
import { ResumeData } from "@/types/resume";

export function skillsTools(
  dispatch: React.Dispatch<Action>,
  getState: () => ResumeData
): McpTool[] {
  return [
    {
      name: "set_skills",
      description: "Replace all skills with the provided list.",
      parameters: {
        type: "object",
        properties: {
          skills: { type: "array", description: "List of skills", items: { type: "string" } },
        },
        required: ["skills"],
      },
      execute: async (params) => {
        dispatch({ type: "SET_SKILLS", payload: params.skills as string[] });
        return { success: true };
      },
    },
    {
      name: "add_skill",
      description: "Add a single skill to the resume.",
      parameters: {
        type: "object",
        properties: {
          skill: { type: "string", description: "Skill to add" },
        },
        required: ["skill"],
      },
      execute: async (params) => {
        dispatch({ type: "ADD_SKILL", payload: params.skill as string });
        return { success: true };
      },
    },
    {
      name: "remove_skill",
      description: "Remove a skill from the resume.",
      parameters: {
        type: "object",
        properties: {
          skill: { type: "string", description: "Skill to remove" },
        },
        required: ["skill"],
      },
      execute: async (params) => {
        dispatch({ type: "REMOVE_SKILL", payload: params.skill as string });
        return { success: true };
      },
    },
  ];
}
