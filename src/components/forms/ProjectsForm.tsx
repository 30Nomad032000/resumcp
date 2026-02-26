"use client";

import { useResumeStore } from "@/hooks/useResumeStore";
import { Project } from "@/types/resume";
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
    <Card className="bg-muted/30">
      <CardContent className="pt-4 space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-foreground">
            {project.name || "New Project"}
          </p>
          <Button
            variant="ghost"
            size="icon-xs"
            onClick={() => onRemove(project.id)}
            className="text-destructive hover:text-destructive hover:bg-destructive/10"
          >
            <Trash2 className="size-3.5" />
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="space-y-2">
            <Label>Project Name</Label>
            <Input
              value={project.name}
              onChange={(e) => onUpdate({ ...project, name: e.target.value })}
              placeholder="My Open Source Project"
            />
          </div>
          <div className="space-y-2">
            <Label>URL</Label>
            <Input
              type="url"
              value={project.url}
              onChange={(e) => onUpdate({ ...project, url: e.target.value })}
              placeholder="https://github.com/user/project"
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label>Description</Label>
          <Textarea
            value={project.description}
            onChange={(e) => onUpdate({ ...project, description: e.target.value })}
            placeholder="What is this project about?"
          />
        </div>
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
      </CardContent>
    </Card>
  );
}

export function ProjectsForm() {
  const { state, addProject, updateProject, removeProject } = useResumeStore();

  const handleAdd = () => {
    addProject({ ...emptyProject, id: generateId() });
  };

  return (
    <div className="space-y-3">
      {state.projects.map((project) => (
        <ProjectEntry
          key={project.id}
          project={project}
          onUpdate={updateProject}
          onRemove={removeProject}
        />
      ))}
      <Button variant="outline" onClick={handleAdd} className="w-full gap-2">
        <Plus className="size-4" />
        Add Project
      </Button>
    </div>
  );
}
