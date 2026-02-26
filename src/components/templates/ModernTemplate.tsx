"use client";

import { ResumeData } from "@/types/resume";

export function ModernTemplate({ data }: { data: ResumeData }) {
  const { personalInfo, experience, education, skills, projects } = data;

  return (
    <div className="resume-modern font-sans text-gray-900 max-w-[8.5in] mx-auto bg-white flex min-h-[11in]">
      {/* Sidebar */}
      <aside
        className="resume-sidebar w-[35%] p-6 text-white flex-shrink-0"
        style={{
          background: "linear-gradient(135deg, #0f766e 0%, #4f46e5 100%)",
        }}
      >
        <div className="resume-header mb-8">
          <h1 className="resume-name text-2xl font-bold leading-tight">
            {personalInfo.fullName || "Your Name"}
          </h1>
        </div>

        {/* Contact */}
        <div className="resume-contact mb-8">
          <h2 className="resume-section-title text-xs font-bold uppercase tracking-widest mb-3 opacity-80">
            Contact
          </h2>
          <div className="space-y-2 text-sm">
            {personalInfo.email && <p className="break-all">{personalInfo.email}</p>}
            {personalInfo.phone && <p>{personalInfo.phone}</p>}
            {personalInfo.location && <p>{personalInfo.location}</p>}
            {personalInfo.website && <p className="break-all">{personalInfo.website}</p>}
            {personalInfo.linkedin && <p className="break-all">{personalInfo.linkedin}</p>}
          </div>
        </div>

        {/* Skills */}
        {skills.length > 0 && (
          <div className="resume-skills mb-8">
            <h2 className="resume-section-title text-xs font-bold uppercase tracking-widest mb-3 opacity-80">
              Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="resume-skill-badge inline-block rounded-full bg-white/20 px-3 py-1 text-xs"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {education.length > 0 && (
          <div className="resume-education">
            <h2 className="resume-section-title text-xs font-bold uppercase tracking-widest mb-3 opacity-80">
              Education
            </h2>
            {education.map((edu) => (
              <div key={edu.id} className="resume-entry mb-4">
                <h3 className="resume-entry-title font-semibold text-sm">
                  {edu.degree}{edu.field ? ` in ${edu.field}` : ""}
                </h3>
                <p className="resume-entry-subtitle text-sm opacity-80">{edu.institution}</p>
                <p className="resume-entry-date text-xs opacity-60">
                  {edu.startDate} &ndash; {edu.endDate}
                </p>
                {edu.gpa && (
                  <p className="text-xs opacity-60">GPA: {edu.gpa}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </aside>

      {/* Main Content */}
      <main className="resume-main flex-1 p-8">
        {/* Summary */}
        {personalInfo.summary && (
          <section className="resume-summary mb-6">
            <h2 className="resume-section-title text-sm font-bold uppercase tracking-widest mb-2 text-indigo-600">
              About Me
            </h2>
            <p className="text-sm leading-relaxed text-gray-700">{personalInfo.summary}</p>
          </section>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <section className="resume-experience mb-6">
            <h2 className="resume-section-title text-sm font-bold uppercase tracking-widest mb-4 text-indigo-600">
              Experience
            </h2>
            {experience.map((exp) => (
              <div key={exp.id} className="resume-entry mb-5 relative pl-4 border-l-2 border-indigo-200">
                <h3 className="resume-entry-title font-bold text-sm">{exp.position}</h3>
                <p className="resume-entry-subtitle text-sm text-gray-500">
                  {exp.company}{exp.location ? ` \u2022 ${exp.location}` : ""}
                </p>
                <p className="resume-entry-date text-xs text-gray-400 mb-1">
                  {exp.startDate} &ndash; {exp.current ? "Present" : exp.endDate}
                </p>
                {exp.description && (
                  <p className="text-sm text-gray-700 leading-relaxed">{exp.description}</p>
                )}
                {exp.highlights.length > 0 && (
                  <ul className="resume-highlights list-disc list-inside text-sm text-gray-700 mt-1 space-y-0.5">
                    {exp.highlights.map((h, i) => (
                      <li key={i}>{h}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </section>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <section className="resume-projects mb-6">
            <h2 className="resume-section-title text-sm font-bold uppercase tracking-widest mb-4 text-indigo-600">
              Projects
            </h2>
            {projects.map((project) => (
              <div key={project.id} className="resume-entry mb-4">
                <div className="flex items-baseline gap-2">
                  <h3 className="resume-entry-title font-bold text-sm">{project.name}</h3>
                  {project.url && (
                    <span className="text-xs text-gray-400">{project.url}</span>
                  )}
                </div>
                {project.description && (
                  <p className="text-sm text-gray-700 mt-1">{project.description}</p>
                )}
                {project.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-1">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="resume-skill-badge inline-block rounded-full bg-indigo-50 text-indigo-700 px-2 py-0.5 text-xs"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
                {project.highlights.length > 0 && (
                  <ul className="resume-highlights list-disc list-inside text-sm text-gray-700 mt-1 space-y-0.5">
                    {project.highlights.map((h, i) => (
                      <li key={i}>{h}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </section>
        )}
      </main>
    </div>
  );
}
