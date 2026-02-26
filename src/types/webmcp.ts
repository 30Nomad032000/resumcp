export interface McpTool {
  name: string;
  description: string;
  parameters: {
    type: "object";
    properties: Record<string, McpToolProperty>;
    required?: string[];
  };
  execute: (params: Record<string, unknown>) => Promise<unknown>;
}

export interface McpToolProperty {
  type: string;
  description: string;
  enum?: string[];
  items?: { type: string };
}

export interface ModelContextProtocol {
  registerTool(tool: McpTool): void;
  unregisterTool(name: string): void;
}

declare global {
  interface Navigator {
    modelContext?: ModelContextProtocol;
  }
}
