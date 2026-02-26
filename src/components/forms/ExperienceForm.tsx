"use client";

import { useResumeStore } from "@/hooks/useResumeStore";
import { Experience } from "@/types/resume";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { TagInput } from "@/components/ui/TagInput";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";

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
    <Card className="bg-muted/30">
      <CardContent className="pt-4 space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-foreground">
            {exp.position || exp.company || "New Experience"}
          </p>
          <Button
            variant="ghost"
            size="icon-xs"
            onClick={() => onRemove(exp.id)}
            className="text-destructive hover:text-destructive hover:bg-destructive/10"
          >
            <Trash2 className="size-3.5" />
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="space-y-2">
            <Label>Company</Label>
            <Input
              value={exp.company}
              onChange={(e) => onUpdate({ ...exp, company: e.target.value })}
              placeholder="Acme Corp"
            />
          </div>
          <div className="space-y-2">
            <Label>Position</Label>
            <Input
              value={exp.position}
              onChange={(e) => onUpdate({ ...exp, position: e.target.value })}
              placeholder="Software Engineer"
            />
          </div>
          <div className="space-y-2">
            <Label>Location</Label>
            <Input
              value={exp.location}
              onChange={(e) => onUpdate({ ...exp, location: e.target.value })}
              placeholder="Remote"
            />
          </div>
          <div className="flex items-end pb-0.5">
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={exp.current}
                onChange={(e) =>
                  onUpdate({
                    ...exp,
                    current: e.target.checked,
                    endDate: e.target.checked ? "" : exp.endDate,
                  })
                }
                className="rounded border-input"
              />
              Currently here
            </label>
          </div>
          <div className="space-y-2">
            <Label>Start Date</Label>
            <Input
              value={exp.startDate}
              onChange={(e) => onUpdate({ ...exp, startDate: e.target.value })}
              placeholder="Jan 2022"
            />
          </div>
          <div className="space-y-2">
            <Label>End Date</Label>
            <Input
              value={exp.endDate}
              onChange={(e) => onUpdate({ ...exp, endDate: e.target.value })}
              placeholder="Present"
              disabled={exp.current}
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label>Description</Label>
          <Textarea
            value={exp.description}
            onChange={(e) => onUpdate({ ...exp, description: e.target.value })}
            placeholder="What you did in this role..."
          />
        </div>
        <TagInput
          label="Key Highlights"
          tags={exp.highlights}
          onAdd={(tag) => onUpdate({ ...exp, highlights: [...exp.highlights, tag] })}
          onRemove={(tag) =>
            onUpdate({ ...exp, highlights: exp.highlights.filter((h) => h !== tag) })
          }
          placeholder="Add highlights and press Enter"
        />
      </CardContent>
    </Card>
  );
}

export function ExperienceForm() {
  const { state, addExperience, updateExperience, removeExperience } = useResumeStore();

  const handleAdd = () => {
    addExperience({ ...emptyExperience, id: generateId() });
  };

  return (
    <div className="space-y-3">
      {state.experience.map((exp) => (
        <ExperienceEntry
          key={exp.id}
          exp={exp}
          onUpdate={updateExperience}
          onRemove={removeExperience}
        />
      ))}
      <Button variant="outline" onClick={handleAdd} className="w-full gap-2">
        <Plus className="size-4" />
        Add Experience
      </Button>
    </div>
  );
}
