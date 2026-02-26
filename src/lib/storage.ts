import { ResumeData, emptyResumeData } from "@/types/resume";

const STORAGE_KEY = "resumcp_data";

export function loadResumeData(): ResumeData {
  if (typeof window === "undefined") return emptyResumeData;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return emptyResumeData;
    return { ...emptyResumeData, ...JSON.parse(raw) };
  } catch {
    return emptyResumeData;
  }
}

export function saveResumeData(data: ResumeData): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // Storage full or unavailable - silently fail
  }
}

export function clearResumeData(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
}
