"use client";

import { useResumeStore } from "@/hooks/useResumeStore";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export function PersonalInfoForm() {
  const { state, setPersonalInfo } = useResumeStore();
  const info = state.personalInfo;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            id="fullName"
            value={info.fullName}
            onChange={(e) => setPersonalInfo({ fullName: e.target.value })}
            placeholder="Jane Doe"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={info.email}
            onChange={(e) => setPersonalInfo({ email: e.target.value })}
            placeholder="jane@example.com"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            type="tel"
            value={info.phone}
            onChange={(e) => setPersonalInfo({ phone: e.target.value })}
            placeholder="+1 (555) 123-4567"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            value={info.location}
            onChange={(e) => setPersonalInfo({ location: e.target.value })}
            placeholder="San Francisco, CA"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="website">Website</Label>
          <Input
            id="website"
            type="url"
            value={info.website}
            onChange={(e) => setPersonalInfo({ website: e.target.value })}
            placeholder="https://janedoe.com"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="linkedin">LinkedIn</Label>
          <Input
            id="linkedin"
            value={info.linkedin}
            onChange={(e) => setPersonalInfo({ linkedin: e.target.value })}
            placeholder="linkedin.com/in/janedoe"
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="summary">Professional Summary</Label>
        <Textarea
          id="summary"
          value={info.summary}
          onChange={(e) => setPersonalInfo({ summary: e.target.value })}
          placeholder="Brief overview of your professional background and goals..."
          rows={4}
        />
      </div>
    </div>
  );
}
