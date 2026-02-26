"use client";

import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useRef,
  useCallback,
} from "react";
import {
  ResumeData,
  PersonalInfo,
  Experience,
  Education,
  Project,
  TemplateName,
  emptyResumeData,
} from "@/types/resume";
import { loadResumeData, saveResumeData } from "@/lib/storage";

// Actions
type Action =
  | { type: "SET_PERSONAL_INFO"; payload: Partial<PersonalInfo> }
  | { type: "ADD_EXPERIENCE"; payload: Experience }
  | { type: "UPDATE_EXPERIENCE"; payload: Experience }
  | { type: "REMOVE_EXPERIENCE"; payload: string }
  | { type: "ADD_EDUCATION"; payload: Education }
  | { type: "UPDATE_EDUCATION"; payload: Education }
  | { type: "REMOVE_EDUCATION"; payload: string }
  | { type: "SET_SKILLS"; payload: string[] }
  | { type: "ADD_SKILL"; payload: string }
  | { type: "REMOVE_SKILL"; payload: string }
  | { type: "ADD_PROJECT"; payload: Project }
  | { type: "UPDATE_PROJECT"; payload: Project }
  | { type: "REMOVE_PROJECT"; payload: string }
  | { type: "SET_TEMPLATE"; payload: TemplateName }
  | { type: "SET_CUSTOM_CSS"; payload: string }
  | { type: "CLEAR_ALL" }
  | { type: "IMPORT_DATA"; payload: ResumeData }
  | { type: "HYDRATE"; payload: ResumeData };

function resumeReducer(state: ResumeData, action: Action): ResumeData {
  switch (action.type) {
    case "SET_PERSONAL_INFO":
      return {
        ...state,
        personalInfo: { ...state.personalInfo, ...action.payload },
      };
    case "ADD_EXPERIENCE":
      return { ...state, experience: [...state.experience, action.payload] };
    case "UPDATE_EXPERIENCE":
      return {
        ...state,
        experience: state.experience.map((e) =>
          e.id === action.payload.id ? action.payload : e
        ),
      };
    case "REMOVE_EXPERIENCE":
      return {
        ...state,
        experience: state.experience.filter((e) => e.id !== action.payload),
      };
    case "ADD_EDUCATION":
      return { ...state, education: [...state.education, action.payload] };
    case "UPDATE_EDUCATION":
      return {
        ...state,
        education: state.education.map((e) =>
          e.id === action.payload.id ? action.payload : e
        ),
      };
    case "REMOVE_EDUCATION":
      return {
        ...state,
        education: state.education.filter((e) => e.id !== action.payload),
      };
    case "SET_SKILLS":
      return { ...state, skills: action.payload };
    case "ADD_SKILL":
      return state.skills.includes(action.payload)
        ? state
        : { ...state, skills: [...state.skills, action.payload] };
    case "REMOVE_SKILL":
      return {
        ...state,
        skills: state.skills.filter((s) => s !== action.payload),
      };
    case "ADD_PROJECT":
      return { ...state, projects: [...state.projects, action.payload] };
    case "UPDATE_PROJECT":
      return {
        ...state,
        projects: state.projects.map((p) =>
          p.id === action.payload.id ? action.payload : p
        ),
      };
    case "REMOVE_PROJECT":
      return {
        ...state,
        projects: state.projects.filter((p) => p.id !== action.payload),
      };
    case "SET_TEMPLATE":
      return { ...state, template: action.payload };
    case "SET_CUSTOM_CSS":
      return { ...state, customCss: action.payload };
    case "CLEAR_ALL":
      return { ...emptyResumeData };
    case "IMPORT_DATA":
      return { ...emptyResumeData, ...action.payload };
    case "HYDRATE":
      return action.payload;
    default:
      return state;
  }
}

interface ResumeContextValue {
  state: ResumeData;
  dispatch: React.Dispatch<Action>;
  hydrated: boolean;
}

const ResumeContext = createContext<ResumeContextValue | null>(null);

export function ResumeProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(resumeReducer, emptyResumeData);
  const [hydrated, setHydrated] = React.useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Hydrate from localStorage on mount
  useEffect(() => {
    const saved = loadResumeData();
    dispatch({ type: "HYDRATE", payload: saved });
    setHydrated(true);
  }, []);

  // Debounced save to localStorage
  useEffect(() => {
    if (!hydrated) return;
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      saveResumeData(state);
    }, 300);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [state, hydrated]);

  return (
    <ResumeContext.Provider value={{ state, dispatch, hydrated }}>
      {children}
    </ResumeContext.Provider>
  );
}

export function useResumeContext() {
  const ctx = useContext(ResumeContext);
  if (!ctx) throw new Error("useResumeContext must be used within ResumeProvider");
  return ctx;
}

export type { Action };
