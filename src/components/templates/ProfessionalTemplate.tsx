"use client";

import { ResumeData } from "@/types/resume";

export function ProfessionalTemplate({ data }: { data: ResumeData }) {
  const { personalInfo, experience, education, skills, projects } = data;

  return (
    <div className="resume-professional font-serif text-gray-900 p-8 max-w-[8.5in] mx-auto bg-white">
      {/* Header */}
      <header className="resume-header text-center border-b-2 border-navy pb-4 mb-6" style={{ borderColor: "#1e3a5f" }}>
        <h1 className="resume-name text-3xl font-bold tracking-wide" style={{ color: "#1e3a5f" }}>
          {personalInfo.fullName || "Your Name"}
        </h1>
        <div className="resume-contact flex flex-wrap justify-center gap-x-4 gap-y-1 mt-2 text-sm text-gray-600">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
          {personalInfo.website && <span>{personalInfo.website}</span>}
          {personalInfo.linkedin && <span>{personalInfo.linkedin}</span>}
        </div>
      </header>

      {/* Summary */}
      {personalInfo.summary && (
        <section className="resume-summary mb-6">
          <h2 className="resume-section-title text-sm font-bold uppercase tracking-widest mb-2" style={{ color: "#1e3a5f" }}>
            Professional Summary
          </h2>
          <p className="text-sm leading-relaxed">{personalInfo.summary}</p>
        </section>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <section className="resume-experience mb-6">
          <h2 className="resume-section-title text-sm font-bold uppercase tracking-widest mb-3" style={{ color: "#1e3a5f" }}>
            Experience
          </h2>
          {experience.map((exp) => (
            <div key={exp.id} className="resume-entry mb-4">
              <div className="flex justify-between items-baseline">
                <div>
                  <h3 className="resume-entry-title font-bold text-sm">{exp.position}</h3>
                  <p className="resume-entry-subtitle text-sm text-gray-600">
                    {exp.company}{exp.location ? `, ${exp.location}` : ""}
                  </p>
                </div>
                <span className="resume-entry-date text-sm text-gray-500 whitespace-nowrap">
                  {exp.startDate} &ndash; {exp.current ? "Present" : exp.endDate}
                </span>
              </div>
              {exp.description && (
                <p className="text-sm mt-1 leading-relaxed">{exp.description}</p>
              )}
              {exp.highlights.length > 0 && (
                <ul className="resume-highlights list-disc list-inside text-sm mt-1 space-y-0.5">
                  {exp.highlights.map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section className="resume-education mb-6">
          <h2 className="resume-section-title text-sm font-bold uppercase tracking-widest mb-3" style={{ color: "#1e3a5f" }}>
            Education
          </h2>
          {education.map((edu) => (
            <div key={edu.id} className="resume-entry mb-3">
              <div className="flex justify-between items-baseline">
                <div>
                  <h3 className="resume-entry-title font-bold text-sm">
                    {edu.degree}{edu.field ? ` in ${edu.field}` : ""}
                  </h3>
                  <p className="resume-entry-subtitle text-sm text-gray-600">{edu.institution}</p>
                </div>
                <span className="resume-entry-date text-sm text-gray-500 whitespace-nowrap">
                  {edu.startDate} &ndash; {edu.endDate}
                </span>
              </div>
              {edu.gpa && <p className="text-sm text-gray-600">GPA: {edu.gpa}</p>}
              {edu.highlights.length > 0 && (
                <ul className="resume-highlights list-disc list-inside text-sm mt-1 space-y-0.5">
                  {edu.highlights.map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <section className="resume-skills mb-6">
          <h2 className="resume-section-title text-sm font-bold uppercase tracking-widest mb-2" style={{ color: "#1e3a5f" }}>
            Skills
          </h2>
          <p className="resume-skill-list text-sm">{skills.join(" \u2022 ")}</p>
        </section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <section className="resume-projects mb-6">
          <h2 className="resume-section-title text-sm font-bold uppercase tracking-widest mb-3" style={{ color: "#1e3a5f" }}>
            Projects
          </h2>
          {projects.map((project) => (
            <div key={project.id} className="resume-entry mb-3">
              <div className="flex justify-between items-baseline">
                <h3 className="resume-entry-title font-bold text-sm">{project.name}</h3>
                {project.url && (
                  <span className="text-sm text-gray-500">{project.url}</span>
                )}
              </div>
              {project.description && (
                <p className="text-sm mt-1">{project.description}</p>
              )}
              {project.technologies.length > 0 && (
                <p className="text-xs text-gray-500 mt-1">
                  Technologies: {project.technologies.join(", ")}
                </p>
              )}
              {project.highlights.length > 0 && (
                <ul className="resume-highlights list-disc list-inside text-sm mt-1 space-y-0.5">
                  {project.highlights.map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </section>
      )}
    </div>
  );
}
