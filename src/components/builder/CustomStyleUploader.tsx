"use client";

import { useResumeStore } from "@/hooks/useResumeStore";
import { Textarea } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useRef } from "react";

export function CustomStyleUploader() {
  const { state, setCustomCss } = useResumeStore();
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setCustomCss(reader.result);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-3">
      <Textarea
        label="Custom CSS"
        value={state.customCss}
        onChange={(e) => setCustomCss(e.target.value)}
        placeholder={`.resume-custom .resume-name { color: #333; }\n.resume-custom .resume-section-title { border-color: red; }`}
        rows={5}
        className="font-mono text-xs"
      />
      <div className="flex items-center gap-2">
        <Button
          variant="secondary"
          size="sm"
          onClick={() => fileRef.current?.click()}
        >
          Upload CSS File
        </Button>
        {state.customCss && (
          <Button variant="ghost" size="sm" onClick={() => setCustomCss("")}>
            Clear CSS
          </Button>
        )}
        <input
          ref={fileRef}
          type="file"
          accept=".css"
          onChange={handleFileUpload}
          className="hidden"
        />
      </div>
    </div>
  );
}
