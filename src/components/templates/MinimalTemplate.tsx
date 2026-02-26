"use client";

import { ResumeData } from "@/types/resume";

export function MinimalTemplate({ data }: { data: ResumeData }) {
  const { personalInfo, experience, education, skills, projects } = data;

  return (
    <div className="resume-minimal font-sans text-gray-900 p-10 max-w-[8.5in] mx-auto bg-white leading-relaxed">
      {/* Header */}
      <header className="resume-header mb-8">
        <h1 className="resume-name text-2xl font-light tracking-wide">
          {personalInfo.fullName || "Your Name"}
        </h1>
        <div className="resume-contact flex flex-wrap gap-x-3 mt-1 text-sm text-gray-500">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
          {personalInfo.website && <span>{personalInfo.website}</span>}
          {personalInfo.linkedin && <span>{personalInfo.linkedin}</span>}
        </div>
      </header>

      {/* Summary */}
      {personalInfo.summary && (
        <section className="resume-summary mb-8">
          <p className="text-sm text-gray-700">{personalInfo.summary}</p>
        </section>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <section className="resume-experience mb-8">
          <h2 className="resume-section-title text-xs font-medium uppercase tracking-[0.2em] text-gray-400 mb-4 border-b border-gray-200 pb-1">
            Experience
          </h2>
          {experience.map((exp) => (
            <div key={exp.id} className="resume-entry mb-5">
              <div className="flex justify-between items-baseline">
                <h3 className="resume-entry-title text-sm font-medium">
                  {exp.position}{exp.company ? `, ${exp.company}` : ""}
                </h3>
                <span className="resume-entry-date text-xs text-gray-400 whitespace-nowrap">
                  {exp.startDate} &ndash; {exp.current ? "Present" : exp.endDate}
                </span>
              </div>
              {exp.location && (
                <p className="resume-entry-subtitle text-xs text-gray-400">{exp.location}</p>
              )}
              {exp.description && (
                <p className="text-sm text-gray-600 mt-1">{exp.description}</p>
              )}
              {exp.highlights.length > 0 && (
                <ul className="resume-highlights text-sm text-gray-600 mt-1 space-y-0.5">
                  {exp.highlights.map((h, i) => (
                    <li key={i} className="before:content-['\2013'] before:mr-2 before:text-gray-300">
                      {h}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section className="resume-education mb-8">
          <h2 className="resume-section-title text-xs font-medium uppercase tracking-[0.2em] text-gray-400 mb-4 border-b border-gray-200 pb-1">
            Education
          </h2>
          {education.map((edu) => (
            <div key={edu.id} className="resume-entry mb-3">
              <div className="flex justify-between items-baseline">
                <h3 className="resume-entry-title text-sm font-medium">
                  {edu.degree}{edu.field ? `, ${edu.field}` : ""}
                </h3>
                <span className="resume-entry-date text-xs text-gray-400 whitespace-nowrap">
                  {edu.startDate} &ndash; {edu.endDate}
                </span>
              </div>
              <p className="resume-entry-subtitle text-sm text-gray-500">{edu.institution}</p>
              {edu.gpa && <p className="text-xs text-gray-400">GPA: {edu.gpa}</p>}
            </div>
          ))}
        </section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <section className="resume-skills mb-8">
          <h2 className="resume-section-title text-xs font-medium uppercase tracking-[0.2em] text-gray-400 mb-3 border-b border-gray-200 pb-1">
            Skills
          </h2>
          <p className="resume-skill-list text-sm text-gray-600">{skills.join(", ")}</p>
        </section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <section className="resume-projects mb-8">
          <h2 className="resume-section-title text-xs font-medium uppercase tracking-[0.2em] text-gray-400 mb-4 border-b border-gray-200 pb-1">
            Projects
          </h2>
          {projects.map((project) => (
            <div key={project.id} className="resume-entry mb-4">
              <h3 className="resume-entry-title text-sm font-medium">
                {project.name}
                {project.url && (
                  <span className="font-normal text-gray-400 ml-2 text-xs">{project.url}</span>
                )}
              </h3>
              {project.description && (
                <p className="text-sm text-gray-600 mt-0.5">{project.description}</p>
              )}
              {project.technologies.length > 0 && (
                <p className="text-xs text-gray-400 mt-0.5">{project.technologies.join(", ")}</p>
              )}
            </div>
          ))}
        </section>
      )}
    </div>
  );
}
