import { SavedProject } from '../types/schema';

export interface CurrentProject {
  type: 'template' | 'saved-project' | 'new-project';
  templateId?: string;
  templateName?: string;
  projectName?: string;
  projectData?: SavedProject;
  editorContent: {
    html: string;
    bodyContent: string;
    css: string;
  };
  lastModified: string;
}

const CURRENT_PROJECT_KEY = 'currentProject';

export const projectService = {
  /**
   * Store current project in sessionStorage
   */
  setCurrentProject(project: CurrentProject): void {
    try {
      sessionStorage.setItem(CURRENT_PROJECT_KEY, JSON.stringify(project));
    } catch (error) {
      console.error('Error saving current project to sessionStorage:', error);
    }
  },

  /**
   * Get current project from sessionStorage
   */
  getCurrentProject(): CurrentProject | null {
    try {
      const projectData = sessionStorage.getItem(CURRENT_PROJECT_KEY);
      return projectData ? JSON.parse(projectData) : null;
    } catch (error) {
      console.error('Error loading current project from sessionStorage:', error);
      return null;
    }
  },

  /**
   * Clear current project from sessionStorage
   */
  clearCurrentProject(): void {
    try {
      sessionStorage.removeItem(CURRENT_PROJECT_KEY);
    } catch (error) {
      console.error('Error clearing current project from sessionStorage:', error);
    }
  },

  /**
   * Store a saved project as current project and prepare for editing
   */
  setCurrentProjectFromSaved(savedProject: SavedProject): void {
    const currentProject: CurrentProject = {
      type: 'saved-project',
      projectName: savedProject.name,
      projectData: savedProject,
      editorContent: {
        html: savedProject.html,
        bodyContent: savedProject.html,
        css: savedProject.css,
      },
      lastModified: new Date().toISOString(),
    };
    this.setCurrentProject(currentProject);
  },

  /**
   * Store a template as current project
   */
  setCurrentProjectFromTemplate(templateId: string, templateName: string, editorContent: any): void {
    const currentProject: CurrentProject = {
      type: 'template',
      templateId,
      templateName,
      editorContent,
      lastModified: new Date().toISOString(),
    };
    this.setCurrentProject(currentProject);
  },

  /**
   * Update current project content
   */
  updateCurrentProjectContent(editorContent: any): void {
    const currentProject = this.getCurrentProject();
    if (currentProject) {
      currentProject.editorContent = editorContent;
      currentProject.lastModified = new Date().toISOString();
      this.setCurrentProject(currentProject);
    }
  },

  /**
   * Create a new empty project
   */
  createNewProject(projectName: string = 'Untitled Project'): void {
    const currentProject: CurrentProject = {
      type: 'new-project',
      projectName,
      editorContent: {
        html: '',
        bodyContent: '',
        css: '',
      },
      lastModified: new Date().toISOString(),
    };
    this.setCurrentProject(currentProject);
  },
};