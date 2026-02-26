"use client";

import { useCallback } from "react";
import { useResumeContext } from "@/context/ResumeContext";
import {
  PersonalInfo,
  Experience,
  Education,
  Project,
  TemplateName,
  ResumeData,
} from "@/types/resume";

export function useResumeStore() {
  const { state, dispatch, hydrated } = useResumeContext();

  const setPersonalInfo = useCallback(
    (info: Partial<PersonalInfo>) =>
      dispatch({ type: "SET_PERSONAL_INFO", payload: info }),
    [dispatch]
  );

  const addExperience = useCallback(
    (exp: Experience) => dispatch({ type: "ADD_EXPERIENCE", payload: exp }),
    [dispatch]
  );

  const updateExperience = useCallback(
    (exp: Experience) => dispatch({ type: "UPDATE_EXPERIENCE", payload: exp }),
    [dispatch]
  );

  const removeExperience = useCallback(
    (id: string) => dispatch({ type: "REMOVE_EXPERIENCE", payload: id }),
    [dispatch]
  );

  const addEducation = useCallback(
    (edu: Education) => dispatch({ type: "ADD_EDUCATION", payload: edu }),
    [dispatch]
  );

  const updateEducation = useCallback(
    (edu: Education) => dispatch({ type: "UPDATE_EDUCATION", payload: edu }),
    [dispatch]
  );

  const removeEducation = useCallback(
    (id: string) => dispatch({ type: "REMOVE_EDUCATION", payload: id }),
    [dispatch]
  );

  const setSkills = useCallback(
    (skills: string[]) => dispatch({ type: "SET_SKILLS", payload: skills }),
    [dispatch]
  );

  const addSkill = useCallback(
    (skill: string) => dispatch({ type: "ADD_SKILL", payload: skill }),
    [dispatch]
  );

  const removeSkill = useCallback(
    (skill: string) => dispatch({ type: "REMOVE_SKILL", payload: skill }),
    [dispatch]
  );

  const addProject = useCallback(
    (project: Project) => dispatch({ type: "ADD_PROJECT", payload: project }),
    [dispatch]
  );

  const updateProject = useCallback(
    (project: Project) =>
      dispatch({ type: "UPDATE_PROJECT", payload: project }),
    [dispatch]
  );

  const removeProject = useCallback(
    (id: string) => dispatch({ type: "REMOVE_PROJECT", payload: id }),
    [dispatch]
  );

  const setTemplate = useCallback(
    (template: TemplateName) =>
      dispatch({ type: "SET_TEMPLATE", payload: template }),
    [dispatch]
  );

  const setCustomCss = useCallback(
    (css: string) => dispatch({ type: "SET_CUSTOM_CSS", payload: css }),
    [dispatch]
  );

  const clearAll = useCallback(
    () => dispatch({ type: "CLEAR_ALL" }),
    [dispatch]
  );

  const importData = useCallback(
    (data: ResumeData) => dispatch({ type: "IMPORT_DATA", payload: data }),
    [dispatch]
  );

  return {
    state,
    hydrated,
    setPersonalInfo,
    addExperience,
    updateExperience,
    removeExperience,
    addEducation,
    updateEducation,
    removeEducation,
    setSkills,
    addSkill,
    removeSkill,
    addProject,
    updateProject,
    removeProject,
    setTemplate,
    setCustomCss,
    clearAll,
    importData,
  };
}
