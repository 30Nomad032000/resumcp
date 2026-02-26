"use client";

import { useResumeStore } from "@/hooks/useResumeStore";
import { Project } from "@/types/resume";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { TagInput } from "@/components/ui/TagInput";

function generateId() {
  return Math.random().toString(36).substring(2, 10);
}

const emptyProject: Omit<Project, "id"> = {
  name: "",
  description: "",
  url: "",
  technologies: [],
  highlights: [],
};

function ProjectEntry({
  project,
  onUpdate,
  onRemove,
}: {
  project: Project;
  onUpdate: (p: Project) => void;
  onRemove: (id: string) => void;
}) {
  return (
    <div className="space-y-3 rounded-lg border border-gray-200 bg-gray-50 p-4">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-medium text-gray-700">
          {project.name || "New Project"}
        </h4>
        <Button variant="danger" size="sm" onClick={() => onRemove(project.id)}>
          Remove
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Input
          label="Project Name"
          value={project.name}
          onChange={(e) => onUpdate({ ...project, name: e.target.value })}
          placeholder="My Open Source Project"
        />
        <Input
          label="URL"
          type="url"
          value={project.url}
          onChange={(e) => onUpdate({ ...project, url: e.target.value })}
          placeholder="https://github.com/user/project"
        />
      </div>
      <Textarea
        label="Description"
        value={project.description}
        onChange={(e) => onUpdate({ ...project, description: e.target.value })}
        placeholder="What is this project about?"
      />
      <TagInput
        label="Technologies"
        tags={project.technologies}
        onAdd={(tag) =>
          onUpdate({ ...project, technologies: [...project.technologies, tag] })
        }
        onRemove={(tag) =>
          onUpdate({
            ...project,
            technologies: project.technologies.filter((t) => t !== tag),
          })
        }
        placeholder="React, TypeScript..."
      />
      <TagInput
        label="Highlights"
        tags={project.highlights}
        onAdd={(tag) =>
          onUpdate({ ...project, highlights: [...project.highlights, tag] })
        }
        onRemove={(tag) =>
          onUpdate({
            ...project,
            highlights: project.highlights.filter((h) => h !== tag),
          })
        }
        placeholder="Key achievements..."
      />
    </div>
  );
}

export function ProjectsForm() {
  const { state, addProject, updateProject, removeProject } = useResumeStore();

  const handleAdd = () => {
    addProject({ ...emptyProject, id: generateId() });
  };

  return (
    <div className="space-y-4">
      {state.projects.map((project) => (
        <ProjectEntry
          key={project.id}
          project={project}
          onUpdate={updateProject}
          onRemove={removeProject}
        />
      ))}
      <Button variant="secondary" onClick={handleAdd} className="w-full">
        + Add Project
      </Button>
    </div>
  );
}
