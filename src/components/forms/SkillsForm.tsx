"use client";

import { useResumeStore } from "@/hooks/useResumeStore";
import { TagInput } from "@/components/ui/TagInput";

export function SkillsForm() {
  const { state, addSkill, removeSkill } = useResumeStore();

  return (
    <div className="space-y-2">
      <p className="text-sm text-gray-500">
        Type a skill and press Enter to add it.
      </p>
      <TagInput
        tags={state.skills}
        onAdd={addSkill}
        onRemove={removeSkill}
        placeholder="JavaScript, React, Node.js..."
      />
    </div>
  );
}
