import { useRef, useEffect, createElement, useCallback } from 'react';
import { useAppSelector, useAppDispatch } from './redux';
import { selectTemplate, updateEditorContent } from '../store/templateStore';
import { useTemplateEditorState } from './useTemplateEditorState';
import { useProjects } from './useProjects';
import { useNotification } from './useNotification';
import { EditorPanelRef } from '../components/EditorPanel/EditorPanel';

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

  // Load project from session storage if available
  useEffect(() => {
    const projectToLoad = sessionStorage.getItem('projectToLoad');
    if (projectToLoad) {
      try {
        const project = JSON.parse(projectToLoad);
        console.log('Loading project from session storage:', project);

        // Set project name first
        actions.setProjectName(project.name);

        // Update editor content with project data
        dispatch(updateEditorContent({
          html: project.html,
          bodyContent: project.html,
          css: project.css
        }));

        // Set template as selected to trigger editor initialization
        dispatch(selectTemplate('saved-project'));

        // Close sidebar since we're loading a project
        actions.closeSidebar();

        // Remove from session storage
        sessionStorage.removeItem('projectToLoad');

        console.log('Project loaded successfully:', project.name);
      } catch (error) {
        console.error('Error loading project:', error);
        // Clean up session storage on error
        sessionStorage.removeItem('projectToLoad');
      }
    }
  }, [dispatch, actions]);

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

  // Open sidebar by default when no template is selected
  useEffect(() => {
    if (!selectedTemplate) {
      actions.openSidebar();
    }
  }, [selectedTemplate]); // Removed actions from dependency

  // Clear editor state on component mount to ensure fresh start after logout/login
  useEffect(() => {
    const projectToLoad = sessionStorage.getItem('projectToLoad');
    if (!projectToLoad) {
      localStorage.removeItem('template_editor_state');
      dispatch(selectTemplate(''));
      dispatch(updateEditorContent({ html: '', bodyContent: '', css: '' }));
      actions.setProjectName("Untitled Project");
    }
  }, []); // Empty dependency array - run only on mount

  const handleNewProjectConfirm = useCallback((newProjectName: string) => {
    console.log('Creating new project:', newProjectName);

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

    actions.closeSidebar();
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
  }, [templates, selectedTemplate, editorContent, saveProject, showNotification]);

  const handleProjectLoad = useCallback((project: any) => {
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