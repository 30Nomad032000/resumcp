"use client";

import { useResumeStore } from "@/hooks/useResumeStore";
import { Education } from "@/types/resume";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { TagInput } from "@/components/ui/TagInput";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";

function generateId() {
  return Math.random().toString(36).substring(2, 10);
}

const emptyEducation: Omit<Education, "id"> = {
  institution: "",
  degree: "",
  field: "",
  startDate: "",
  endDate: "",
  gpa: "",
  highlights: [],
};

function EducationEntry({
  edu,
  onUpdate,
  onRemove,
}: {
  edu: Education;
  onUpdate: (edu: Education) => void;
  onRemove: (id: string) => void;
}) {
  return (
    <Card className="bg-muted/30">
      <CardContent className="pt-4 space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-foreground">
            {edu.institution || edu.degree || "New Education"}
          </p>
          <Button
            variant="ghost"
            size="icon-xs"
            onClick={() => onRemove(edu.id)}
            className="text-destructive hover:text-destructive hover:bg-destructive/10"
          >
            <Trash2 className="size-3.5" />
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="space-y-2">
            <Label>Institution</Label>
            <Input
              value={edu.institution}
              onChange={(e) => onUpdate({ ...edu, institution: e.target.value })}
              placeholder="MIT"
            />
          </div>
          <div className="space-y-2">
            <Label>Degree</Label>
            <Input
              value={edu.degree}
              onChange={(e) => onUpdate({ ...edu, degree: e.target.value })}
              placeholder="Bachelor of Science"
            />
          </div>
          <div className="space-y-2">
            <Label>Field of Study</Label>
            <Input
              value={edu.field}
              onChange={(e) => onUpdate({ ...edu, field: e.target.value })}
              placeholder="Computer Science"
            />
          </div>
          <div className="space-y-2">
            <Label>GPA</Label>
            <Input
              value={edu.gpa}
              onChange={(e) => onUpdate({ ...edu, gpa: e.target.value })}
              placeholder="3.8 / 4.0"
            />
          </div>
          <div className="space-y-2">
            <Label>Start Date</Label>
            <Input
              value={edu.startDate}
              onChange={(e) => onUpdate({ ...edu, startDate: e.target.value })}
              placeholder="Sep 2018"
            />
          </div>
          <div className="space-y-2">
            <Label>End Date</Label>
            <Input
              value={edu.endDate}
              onChange={(e) => onUpdate({ ...edu, endDate: e.target.value })}
              placeholder="May 2022"
            />
          </div>
        </div>
        <TagInput
          label="Highlights / Activities"
          tags={edu.highlights}
          onAdd={(tag) => onUpdate({ ...edu, highlights: [...edu.highlights, tag] })}
          onRemove={(tag) =>
            onUpdate({ ...edu, highlights: edu.highlights.filter((h) => h !== tag) })
          }
          placeholder="Dean's List, TA for CS101..."
        />
      </CardContent>
    </Card>
  );
}

export function EducationForm() {
  const { state, addEducation, updateEducation, removeEducation } = useResumeStore();

  const handleAdd = () => {
    addEducation({ ...emptyEducation, id: generateId() });
  };

  return (
    <div className="space-y-3">
      {state.education.map((edu) => (
        <EducationEntry
          key={edu.id}
          edu={edu}
          onUpdate={updateEducation}
          onRemove={removeEducation}
        />
      ))}
      <Button variant="outline" onClick={handleAdd} className="w-full gap-2">
        <Plus className="size-4" />
        Add Education
      </Button>
    </div>
  );
}
