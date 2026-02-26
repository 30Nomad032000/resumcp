"use client";

import { useState, useEffect, useRef } from "react";
import { useResumeContext } from "@/context/ResumeContext";
import { registerAllTools } from "@/webmcp/registerTools";
import { usePdfExport } from "./usePdfExport";

export function useWebMcp() {
  const [available, setAvailable] = useState(false);
  const { state, dispatch } = useResumeContext();
  const stateRef = useRef(state);
  const cleanupRef = useRef<(() => void) | null>(null);

  // Keep stateRef current so tools always read latest state
  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  useEffect(() => {
    const isAvailable =
      typeof navigator !== "undefined" && "modelContext" in navigator && !!navigator.modelContext;
    setAvailable(isAvailable);

    if (!isAvailable) return;

    // We pass a getter function so tools always read the latest state
    const cleanup = registerAllTools(
      dispatch,
      () => stateRef.current,
      () => {
        // Trigger print via a custom event that the builder page listens to
        window.dispatchEvent(new CustomEvent("resumcp:print"));
      }
    );

    cleanupRef.current = cleanup;

    return () => {
      if (cleanupRef.current) {
        cleanupRef.current();
        cleanupRef.current = null;
      }
    };
  }, [dispatch]);

  return { available };
}
