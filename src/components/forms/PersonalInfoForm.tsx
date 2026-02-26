"use client";

import { useResumeStore } from "@/hooks/useResumeStore";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Input";

export function PersonalInfoForm() {
  const { state, setPersonalInfo } = useResumeStore();
  const info = state.personalInfo;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Full Name"
          value={info.fullName}
          onChange={(e) => setPersonalInfo({ fullName: e.target.value })}
          placeholder="Jane Doe"
        />
        <Input
          label="Email"
          type="email"
          value={info.email}
          onChange={(e) => setPersonalInfo({ email: e.target.value })}
          placeholder="jane@example.com"
        />
        <Input
          label="Phone"
          type="tel"
          value={info.phone}
          onChange={(e) => setPersonalInfo({ phone: e.target.value })}
          placeholder="+1 (555) 123-4567"
        />
        <Input
          label="Location"
          value={info.location}
          onChange={(e) => setPersonalInfo({ location: e.target.value })}
          placeholder="San Francisco, CA"
        />
        <Input
          label="Website"
          type="url"
          value={info.website}
          onChange={(e) => setPersonalInfo({ website: e.target.value })}
          placeholder="https://janedoe.com"
        />
        <Input
          label="LinkedIn"
          value={info.linkedin}
          onChange={(e) => setPersonalInfo({ linkedin: e.target.value })}
          placeholder="linkedin.com/in/janedoe"
        />
      </div>
      <Textarea
        label="Professional Summary"
        value={info.summary}
        onChange={(e) => setPersonalInfo({ summary: e.target.value })}
        placeholder="Brief overview of your professional background and goals..."
        rows={4}
      />
    </div>
  );
}
