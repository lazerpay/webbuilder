/**
 * Utility functions for project name validation and localStorage operations
 */

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

/**
 * Validate project name
 */
export const validateProjectName = (name: string): ValidationResult => {
  const trimmedName = name.trim();
  
  if (!trimmedName) {
    return { isValid: false, error: 'Project name is required' };
  }
  
  if (trimmedName.length < 2) {
    return { isValid: false, error: 'Project name must be at least 2 characters' };
  }
  
  return { isValid: true };
};

/**
 * Check if project name already exists in localStorage
 */
export const checkProjectExists = (projectName: string): boolean => {
  const trimmedName = projectName.trim();
  
  // Check saved projects list
  const savedProjects = JSON.parse(localStorage.getItem('saved_template_projects') || '[]');
  const duplicateProject = savedProjects.find((p: any) => 
    p.name.toLowerCase() === trimmedName.toLowerCase()
  );
  
  if (duplicateProject) {
    return true;
  }
  
  // Check individual project storage
  const storageKey = `template_project_${trimmedName.toLowerCase().replace(/[^a-z0-9]/g, '_')}`;
  const existingProject = localStorage.getItem(storageKey);
  
  return !!existingProject;
};

/**
 * Validate project name and check for duplicates
 */
export const validateAndCheckProject = (projectName: string): ValidationResult => {
  const validation = validateProjectName(projectName);
  if (!validation.isValid) {
    return validation;
  }
  
  if (checkProjectExists(projectName)) {
    return { 
      isValid: false, 
      error: 'A project with this name already exists. Please choose a different name.' 
    };
  }
  
  return { isValid: true };
};