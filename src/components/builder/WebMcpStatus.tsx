"use client";

import { useWebMcp } from "@/hooks/useWebMcp";
import { Badge } from "@/components/ui/badge";
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
        <Badge
          variant={available ? "default" : "secondary"}
          className="gap-1.5 cursor-default"
        >
          <span
            className={`size-1.5 rounded-full ${
              available ? "bg-green-400 animate-pulse" : "bg-muted-foreground/50"
            }`}
          />
          <Cpu className="size-3" />
          WebMCP
        </Badge>
      </TooltipTrigger>
      <TooltipContent>
        {available
          ? "AI agent connected via WebMCP — 18 tools registered"
          : "WebMCP not available in this browser. Use Chrome 146+ Canary."}
      </TooltipContent>
    </Tooltip>
  );
}
