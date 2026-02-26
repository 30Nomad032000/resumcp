"use client";

import { useResumeStore } from "@/hooks/useResumeStore";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useRef } from "react";
import { Upload, X } from "lucide-react";

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
      <div className="space-y-2">
        <Label>Custom CSS</Label>
        <Textarea
          value={state.customCss}
          onChange={(e) => setCustomCss(e.target.value)}
          placeholder={`.resume-custom .resume-name { color: #333; }\n.resume-custom .resume-section-title { border-color: red; }`}
          rows={5}
          className="font-mono text-xs"
        />
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => fileRef.current?.click()}
          className="gap-1.5"
        >
          <Upload className="size-3.5" />
          Upload CSS
        </Button>
        {state.customCss && (
          <Button variant="ghost" size="sm" onClick={() => setCustomCss("")} className="gap-1.5">
            <X className="size-3.5" />
            Clear
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
