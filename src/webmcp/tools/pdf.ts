import { McpTool } from "@/types/webmcp";

export function pdfTools(triggerPrint: () => void): McpTool[] {
  return [
    {
      name: "generate_pdf",
      description: "Trigger PDF download of the current resume. Opens the browser print dialog.",
      parameters: { type: "object", properties: {} },
      execute: async () => {
        triggerPrint();
        return { success: true, message: "Print dialog opened" };
      },
    },
  ];
}
