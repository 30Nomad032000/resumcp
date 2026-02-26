"use client";

import { useResumeStore } from "@/hooks/useResumeStore";
import { Education } from "@/types/resume";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { TagInput } from "@/components/ui/TagInput";

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
    <div className="space-y-3 rounded-lg border border-gray-200 bg-gray-50 p-4">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-medium text-gray-700">
          {edu.institution || edu.degree || "New Education"}
        </h4>
        <Button variant="danger" size="sm" onClick={() => onRemove(edu.id)}>
          Remove
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Input
          label="Institution"
          value={edu.institution}
          onChange={(e) => onUpdate({ ...edu, institution: e.target.value })}
          placeholder="MIT"
        />
        <Input
          label="Degree"
          value={edu.degree}
          onChange={(e) => onUpdate({ ...edu, degree: e.target.value })}
          placeholder="Bachelor of Science"
        />
        <Input
          label="Field of Study"
          value={edu.field}
          onChange={(e) => onUpdate({ ...edu, field: e.target.value })}
          placeholder="Computer Science"
        />
        <Input
          label="GPA"
          value={edu.gpa}
          onChange={(e) => onUpdate({ ...edu, gpa: e.target.value })}
          placeholder="3.8 / 4.0"
        />
        <Input
          label="Start Date"
          value={edu.startDate}
          onChange={(e) => onUpdate({ ...edu, startDate: e.target.value })}
          placeholder="Sep 2018"
        />
        <Input
          label="End Date"
          value={edu.endDate}
          onChange={(e) => onUpdate({ ...edu, endDate: e.target.value })}
          placeholder="May 2022"
        />
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
    </div>
  );
}

export function EducationForm() {
  const { state, addEducation, updateEducation, removeEducation } = useResumeStore();

  const handleAdd = () => {
    addEducation({ ...emptyEducation, id: generateId() });
  };

  return (
    <div className="space-y-4">
      {state.education.map((edu) => (
        <EducationEntry
          key={edu.id}
          edu={edu}
          onUpdate={updateEducation}
          onRemove={removeEducation}
        />
      ))}
      <Button variant="secondary" onClick={handleAdd} className="w-full">
        + Add Education
      </Button>
    </div>
  );
}
