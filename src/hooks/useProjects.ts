import { useMemo } from 'react';
import { SavedProject } from '../types/schema';
import { useLocalStorage } from './useLocalStorage';

/**
 * Custom hook for managing saved projects with localStorage persistence
 */
export function useProjects() {
  const [projects, setProjects] = useLocalStorage<SavedProject[]>('saved_template_projects', []);

  const deleteProject = (projectName: string) => {
    setProjects(prev => prev.filter(p => p.name !== projectName));
  };

  const deleteAllProjects = () => {
    setProjects([]);
  };

  const saveProject = (projectData: SavedProject) => {
    setProjects(prev => {
      const existingIndex = prev.findIndex(p => p.name === projectData.name);
      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex] = projectData;
        return updated;
      } else {
        return [...prev, projectData];
      }
    });
  };

  const getProjectByName = (name: string) => {
    return projects.find(p => p.name === name);
  };

  const projectExists = (name: string) => {
    return projects.some(p => p.name.toLowerCase() === name.toLowerCase());
  };

  const filteredProjects = (searchQuery: string) => {
    return useMemo(() => {
      if (!searchQuery.trim()) return projects;
      return projects.filter(project =>
        project.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }, [projects, searchQuery]);
  };

  return {
    projects,
    deleteProject,
    deleteAllProjects,
    saveProject,
    getProjectByName,
    projectExists,
    filteredProjects,
  };
}