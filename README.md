# ResuMCP

Privacy-first resume builder with WebMCP AI agent integration. No data collection, no server storage — your resume stays on your device.

## Features

- **100% Private** — All data lives in your browser's `localStorage`. Nothing is sent to any server.
- **AI-Powered via WebMCP** — Connect your own AI agent through the [WebMCP](https://anthropic.com/webmcp) protocol. The agent can read and write resume data through 18 registered tools.
- **3 Built-in Templates**
  - **Professional** — Serif fonts, single-column, navy accents, traditional corporate look
  - **Modern** — Two-column sidebar, teal-indigo gradient, pill badges for skills
  - **Minimal** — System sans-serif, single-column, pure black on white, maximum whitespace
- **Custom CSS** — Paste or upload your own CSS to override any template styles (scoped under `.resume-custom`)
- **ATS-Friendly PDF Export** — Uses `react-to-print` to produce real selectable text, not rasterized images
- **Manual or AI** — Fill forms by hand or let your AI agent do it. Both work seamlessly.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| State | React Context + useReducer |
| Persistence | localStorage (single key: `resumcp_data`) |
| PDF | react-to-print |
| AI Integration | WebMCP (`navigator.modelContext`) |

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the landing page. Click **Start Building** to go to the resume builder.

## Project Structure

```
src/
├── app/                        # Next.js pages
│   ├── page.tsx                # Landing page
│   └── builder/page.tsx        # Resume builder
├── components/
│   ├── landing/                # Hero, FeatureCards, HowItWorks
│   ├── builder/                # BuilderLayout, FormPanel, PreviewPanel, TemplateSelector
│   ├── forms/                  # PersonalInfo, Experience, Education, Skills, Projects
│   ├── templates/              # Professional, Modern, Minimal, TemplateWrapper
│   └── ui/                     # Button, Input, Card, TagInput
├── context/ResumeContext.tsx    # State management
├── hooks/                      # useResumeStore, useWebMcp, usePdfExport
├── webmcp/                     # WebMCP tool registration (18 tools)
├── lib/                        # localStorage helpers
└── types/                      # TypeScript type definitions
```

## WebMCP Tools

When a WebMCP-compatible browser is detected, the following tools are registered:

| Tool | Type | Description |
|------|------|-------------|
| `get_resume_data` | Read | Get complete resume data |
| `get_available_templates` | Read | List templates and current selection |
| `set_personal_info` | Write | Set name, email, phone, location, etc. |
| `add_experience` | Write | Add a work experience entry |
| `update_experience` | Write | Update an existing experience by ID |
| `remove_experience` | Write | Remove an experience by ID |
| `add_education` | Write | Add an education entry |
| `remove_education` | Write | Remove an education by ID |
| `set_skills` | Write | Replace all skills |
| `add_skill` | Write | Add a single skill |
| `remove_skill` | Write | Remove a skill |
| `add_project` | Write | Add a project entry |
| `remove_project` | Write | Remove a project by ID |
| `set_template` | Write | Switch template (professional/modern/minimal) |
| `set_custom_css` | Write | Apply custom CSS overrides |
| `import_resume` | Write | Import a complete resume data object |
| `generate_pdf` | Action | Trigger PDF download |
| `clear_resume` | Action | Reset all data |

## Custom CSS

Templates use consistent class names you can target:

```css
.resume-custom .resume-name { }
.resume-custom .resume-section-title { }
.resume-custom .resume-entry { }
.resume-custom .resume-entry-title { }
.resume-custom .resume-entry-subtitle { }
.resume-custom .resume-entry-date { }
.resume-custom .resume-highlights { }
.resume-custom .resume-skill-list { }
.resume-custom .resume-skill-badge { }
.resume-custom .resume-contact { }
.resume-custom .resume-summary { }
```

## Deploy

```bash
npm run build
```

Deploy the output to any static hosting (Vercel, Netlify, Cloudflare Pages, etc.). No server-side infrastructure needed.

## License

MIT
