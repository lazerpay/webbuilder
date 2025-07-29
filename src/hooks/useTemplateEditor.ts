import { useRef, useEffect, createElement, useCallback } from 'react';
import { useAppSelector, useAppDispatch } from './redux';
import { selectTemplate, updateEditorContent } from '../store/templateStore';
import { useTemplateEditorState } from './useTemplateEditorState';
import { useProjects } from './useProjects';
import { useNotification } from './useNotification';
import { EditorPanelRef } from '../components/EditorPanel/EditorPanel';
import { projectService } from '../services/projectService';

/**
 * Custom hook that encapsulates all TemplateEditor logic
 */
export function useTemplateEditor() {
  const editorRef = useRef<EditorPanelRef>(null);
  const { state, actions } = useTemplateEditorState();
  const { editorContent, selectedTemplate, templates } = useAppSelector((state) => state.template);
  const dispatch = useAppDispatch();
  const { projectExists, saveProject } = useProjects();
  const { notification, showNotification, hideNotification } = useNotification();

  // Load current project from sessionStorage if available on mount
  useEffect(() => {
    const currentProject = projectService.getCurrentProject();
    if (currentProject) {
      console.log('Loading current project from sessionStorage:', currentProject);

      // Set project name
      actions.setProjectName(currentProject.projectName || 'Untitled Project');

      // Update editor content with project data
      dispatch(updateEditorContent(currentProject.editorContent));

      // Set appropriate template selection
      if (currentProject.type === 'saved-project') {
        dispatch(selectTemplate('saved-project'));
      } else if (currentProject.templateId) {
        dispatch(selectTemplate(currentProject.templateId));
      } else {
        dispatch(selectTemplate('new-project'));
      }

      // Close sidebar since we're loading a project
      actions.closeSidebar();

      console.log('Current project loaded successfully:', currentProject.projectName);
    } else {
      // No current project - initialize with empty state
      console.log('No current project found, initializing empty state');
      localStorage.removeItem('template_editor_state');
      dispatch(selectTemplate(''));
      dispatch(updateEditorContent({ html: '', bodyContent: '', css: '' }));
      actions.setProjectName("Untitled Project");
    }
  }, []); // Empty dependency array - run only on mount

  // Poll for the editor instance
  useEffect(() => {
    const checkEditor = () => {
      const editor = editorRef.current?.getEditor();
      if (editor && editor !== state.grapesEditor) {
        actions.setGrapesEditor(editor);
      }
    };

    const interval = setInterval(checkEditor, 100);
    return () => clearInterval(interval);
  }, [state.grapesEditor]); // Removed actions from dependency

  // Open sidebar by default when no template is selected (after initial load)
  useEffect(() => {
    if (!selectedTemplate) {
      // Add a small delay to ensure the initial project loading is complete
      const timer = setTimeout(() => {
        actions.openSidebar();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [selectedTemplate, actions]);

  const handleNewProjectConfirm = useCallback((newProjectName: string) => {
    console.log('Creating new project:', newProjectName);

    // Clear sessionStorage first
    projectService.clearCurrentProject();

    // Clear editor state
    actions.setProjectName(newProjectName);
    localStorage.removeItem('template_editor_state');
    dispatch(selectTemplate(''));
    dispatch(updateEditorContent({ html: '', bodyContent: '', css: '' }));

    if (state.grapesEditor) {
      try {
        state.grapesEditor.setComponents('');
        state.grapesEditor.setStyle('');
      } catch (error) {
        console.error('Error clearing editor:', error);
      }
    }

    // Open sidebar to allow template selection
    actions.openSidebar();
  }, [actions, dispatch, state.grapesEditor]);

  const handleSaveProject = useCallback(() => {
    if (projectExists(state.projectName)) {
      actions.openSaveProjectModal(true);
    } else {
      performSave(state.projectName);
    }
  }, [projectExists, state.projectName, actions]);

  const handleSaveProjectConfirm = useCallback((finalProjectName: string) => {
    if (finalProjectName !== state.projectName) {
      actions.setProjectName(finalProjectName);
    }
    performSave(finalProjectName);
  }, [state.projectName, actions]);

  const performSave = useCallback((nameToSave: string) => {
    try {
      console.log('Saving project:', nameToSave);

      const currentTemplate = templates.find((t) => t.id === selectedTemplate);
      const thumbnailUrl = currentTemplate?.thumbnailUrl || '';

      const projectData = {
        name: nameToSave,
        html: editorContent.bodyContent,
        css: editorContent.css,
        savedAt: new Date().toISOString(),
        version: '1.0',
        thumbnailUrl
      };

      saveProject(projectData);

      // Update current project in sessionStorage to reflect the saved state
      projectService.setCurrentProjectFromSaved(projectData);
      actions.setProjectName(nameToSave);

      console.log('Project saved successfully to localStorage');

      showNotification(`${nameToSave} has been saved to your browser's local storage.`, {
        title: 'Project Saved!',
        icon: createElement('svg', {
          width: 18,
          height: 18,
          viewBox: '0 0 24 24',
          fill: 'none',
          stroke: 'currentColor',
          strokeWidth: 2,
          strokeLinecap: 'round',
          strokeLinejoin: 'round'
        }, createElement('polyline', { points: '20,6 9,17 4,12' })),
        color: 'green',
        duration: 4000
      });

    } catch (error) {
      console.error('Error saving project:', error);
    }
  }, [templates, selectedTemplate, editorContent, saveProject, showNotification, actions]);

  const handleProjectLoad = useCallback((project: any) => {
    // Store the loaded project as current project in sessionStorage
    projectService.setCurrentProjectFromSaved(project);
    actions.setProjectName(project.name);
    console.log('Project loaded:', project.name);
  }, [actions]);

  const handleProjectNameChange = useCallback((name: string) => {
    actions.setProjectName(name);
    console.log('Project name changed to:', name);
  }, [actions]);

  return {
    // State
    state,
    editorRef,
    editorContent,
    selectedTemplate,
    notification,

    // Actions
    actions,
    handleNewProjectConfirm,
    handleSaveProject,
    handleSaveProjectConfirm,
    handleProjectLoad,
    handleProjectNameChange,
    hideNotification,

    // Computed values
    saveDisabled: !selectedTemplate && !editorContent.bodyContent,
  };
}