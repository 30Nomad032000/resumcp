"use client";

import { useWebMcp } from "@/hooks/useWebMcp";

export function WebMcpStatus() {
  const { available } = useWebMcp();

  return (
    <div className="flex items-center gap-2 text-sm">
      <div
        className={`w-2.5 h-2.5 rounded-full ${
          available ? "bg-green-500" : "bg-gray-400"
        }`}
      />
      <span className="text-gray-600">
        WebMCP {available ? "Connected" : "Not Available"}
      </span>
    </div>
  );
}
