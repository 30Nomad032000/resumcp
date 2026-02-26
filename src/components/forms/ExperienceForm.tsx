"use client";

import { useState } from "react";
import { useResumeStore } from "@/hooks/useResumeStore";
import { Experience } from "@/types/resume";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { TagInput } from "@/components/ui/TagInput";

function generateId() {
  return Math.random().toString(36).substring(2, 10);
}

const emptyExperience: Omit<Experience, "id"> = {
  company: "",
  position: "",
  location: "",
  startDate: "",
  endDate: "",
  current: false,
  description: "",
  highlights: [],
};

function ExperienceEntry({
  exp,
  onUpdate,
  onRemove,
}: {
  exp: Experience;
  onUpdate: (exp: Experience) => void;
  onRemove: (id: string) => void;
}) {
  return (
    <div className="space-y-3 rounded-lg border border-gray-200 bg-gray-50 p-4">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-medium text-gray-700">
          {exp.position || exp.company || "New Experience"}
        </h4>
        <Button variant="danger" size="sm" onClick={() => onRemove(exp.id)}>
          Remove
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Input
          label="Company"
          value={exp.company}
          onChange={(e) => onUpdate({ ...exp, company: e.target.value })}
          placeholder="Acme Corp"
        />
        <Input
          label="Position"
          value={exp.position}
          onChange={(e) => onUpdate({ ...exp, position: e.target.value })}
          placeholder="Software Engineer"
        />
        <Input
          label="Location"
          value={exp.location}
          onChange={(e) => onUpdate({ ...exp, location: e.target.value })}
          placeholder="Remote"
        />
        <div className="flex items-end gap-2">
          <label className="flex items-center gap-2 text-sm text-gray-700 pb-2">
            <input
              type="checkbox"
              checked={exp.current}
              onChange={(e) =>
                onUpdate({ ...exp, current: e.target.checked, endDate: e.target.checked ? "" : exp.endDate })
              }
              className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            Currently here
          </label>
        </div>
        <Input
          label="Start Date"
          value={exp.startDate}
          onChange={(e) => onUpdate({ ...exp, startDate: e.target.value })}
          placeholder="Jan 2022"
        />
        <Input
          label="End Date"
          value={exp.endDate}
          onChange={(e) => onUpdate({ ...exp, endDate: e.target.value })}
          placeholder="Present"
          disabled={exp.current}
        />
      </div>
      <Textarea
        label="Description"
        value={exp.description}
        onChange={(e) => onUpdate({ ...exp, description: e.target.value })}
        placeholder="What you did in this role..."
      />
      <TagInput
        label="Key Highlights"
        tags={exp.highlights}
        onAdd={(tag) => onUpdate({ ...exp, highlights: [...exp.highlights, tag] })}
        onRemove={(tag) =>
          onUpdate({ ...exp, highlights: exp.highlights.filter((h) => h !== tag) })
        }
        placeholder="Add highlights and press Enter"
      />
    </div>
  );
}

export function ExperienceForm() {
  const { state, addExperience, updateExperience, removeExperience } = useResumeStore();

  const handleAdd = () => {
    addExperience({ ...emptyExperience, id: generateId() });
  };

  return (
    <div className="space-y-4">
      {state.experience.map((exp) => (
        <ExperienceEntry
          key={exp.id}
          exp={exp}
          onUpdate={updateExperience}
          onRemove={removeExperience}
        />
      ))}
      <Button variant="secondary" onClick={handleAdd} className="w-full">
        + Add Experience
      </Button>
    </div>
  );
}
