"use client";

import { useWebMcp } from "@/hooks/useWebMcp";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Cpu } from "lucide-react";

export function WebMcpStatus() {
  const { available } = useWebMcp();

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full cursor-default text-[0.65rem] tracking-wider"
          style={{
            background: available ? "#4ADE8010" : "#F0ECE308",
            border: `1px solid ${available ? "#4ADE8030" : "#F0ECE315"}`,
            color: available ? "#4ADE80" : "#F0ECE344",
            fontFamily: "var(--font-fira-code), monospace",
          }}
        >
          <span
            className="size-1.5 rounded-full"
            style={{
              background: available ? "#4ADE80" : "#F0ECE333",
              boxShadow: available ? "0 0 6px #4ADE8080" : "none",
              animation: available ? "pulse 2s infinite" : "none",
            }}
          />
          <Cpu className="size-3" />
          WebMCP
        </div>
      </TooltipTrigger>
      <TooltipContent>
        {available
          ? "AI agent connected via WebMCP — 18 tools registered"
          : "WebMCP not available in this browser. Use Chrome 146+ Canary."}
      </TooltipContent>
    </Tooltip>
  );
}
