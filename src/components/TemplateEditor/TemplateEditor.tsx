import { useRef, useState, useEffect } from 'react';
import { Flex, Stack, Notification } from '@mantine/core';
import { Check } from 'lucide-react';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import { useAppSelector, useAppDispatch } from '../../hooks/redux';
import { selectTemplate, updateEditorContent } from '../../store/templateStore';
import { Header } from '../Header/Header';
import { NewProjectModal } from '../Header/NewProjectModal';
import { SaveProjectModal } from '../Header/SaveProjectModal';
import { TemplateSidebar } from '../TemplateSidebar/TemplateSidebar';
import { EditorPanel, EditorPanelRef } from '../EditorPanel/EditorPanel';
import { RightSidebar } from '../RightSidebar/RightSidebar';

// Utility function to minify HTML
const minifyHtml = (html: string): string => {
  return html
    .replace(/\s+/g, ' ')
    .replace(/>\s+</g, '><')
    .replace(/\s+>/g, '>')
    .replace(/<\s+/g, '<')
    .trim();
};

// Utility function to minify CSS
const minifyCss = (css: string): string => {
  return css
    .replace(/\s+/g, ' ')
    .replace(/;\s+/g, ';')
    .replace(/{\s+/g, '{')
    .replace(/\s+}/g, '}')
    .replace(/:\s+/g, ':')
    .replace(/,\s+/g, ',')
    .trim();
};

interface TemplateEditorProps {
  onNavigateToProjects?: () => void;
  onNavigateToProfile?: () => void;
  onNavigateToHome?: () => void;
  onLogout?: () => void;
}

function TemplateEditorContent({ onNavigateToProjects, onNavigateToProfile, onNavigateToHome, onLogout }: TemplateEditorProps) {
  const editorRef = useRef<EditorPanelRef>(null);
  const [grapesEditor, setGrapesEditor] = useState<any>(null);
  const [projectName, setProjectName] = useState("Untitled Project");
  const [showNotification, setShowNotification] = useState(false);
  const [newProjectModalOpen, setNewProjectModalOpen] = useState(false);
  const [saveProjectModalOpen, setSaveProjectModalOpen] = useState(false);
  const [existingProjectDetected, setExistingProjectDetected] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { editorContent, selectedTemplate, templates } = useAppSelector((state) => state.template);
  const dispatch = useAppDispatch();

  // Load project from session storage if available
  useEffect(() => {
    const projectToLoad = sessionStorage.getItem('projectToLoad');
    if (projectToLoad) {
      try {
        const project = JSON.parse(projectToLoad);
        setProjectName(project.name);
        dispatch(updateEditorContent({
          html: project.html,
          bodyContent: project.html,
          css: project.css
        }));
        dispatch(selectTemplate('saved-project'));
        sessionStorage.removeItem('projectToLoad');
      } catch (error) {
        console.error('Error loading project:', error);
      }
    }
  }, [dispatch]);

  useEffect(() => {
    // Poll for the editor instance
    const checkEditor = () => {
      const editor = editorRef.current?.getEditor();
      if (editor && editor !== grapesEditor) {
        setGrapesEditor(editor);
      }
    };

    const interval = setInterval(checkEditor, 100);
    return () => clearInterval(interval);
  }, [grapesEditor]);

  // Open sidebar by default when no template is selected
  useEffect(() => {
    if (!selectedTemplate) {
      setSidebarOpen(true);
    }
  }, [selectedTemplate]);

  const handleNewProject = () => {
    setNewProjectModalOpen(true);
  };

  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleCloseSidebar = () => {
    setSidebarOpen(false);
  };

  const handleOpenSidebar = () => {
    setSidebarOpen(true);
  };

  const handleProfile = () => {
    if (onNavigateToProfile) {
      onNavigateToProfile();
    }
  };

  const handleMyProjects = () => {
    if (onNavigateToProjects) {
      onNavigateToProjects();
    }
  };

  const handleLogOut = () => {
    if (onLogout) {
      onLogout();
    }
  };

  const handleNewProjectConfirm = (newProjectName: string) => {
    console.log('Creating new project:', newProjectName);
    
    // Update the project name immediately - this will show in the header
    setProjectName(newProjectName);
    
    // Clear any saved state
    localStorage.removeItem('template_editor_state');
    
    // Clear the editor state through Redux
    dispatch(selectTemplate(''));
    dispatch(updateEditorContent({ html: '', bodyContent: '', css: '' }));
    
    // Reset the GrapesJS editor if it exists
    if (grapesEditor) {
      try {
        grapesEditor.setComponents('');
        grapesEditor.setStyle('');
      } catch (error) {
        console.error('Error clearing editor:', error);
      }
    }
    
    // Close the sidebar after creating new project
    setSidebarOpen(false);
  };

  const handleSaveProject = () => {
    // Check if project already exists in saved projects list
    const savedProjects = JSON.parse(localStorage.getItem('saved_template_projects') || '[]');
    const duplicateProject = savedProjects.find((p: any) => p.name.toLowerCase() === projectName.toLowerCase());
    
    if (duplicateProject) {
      setExistingProjectDetected(true);
      setSaveProjectModalOpen(true);
    } else {
      // No duplicate found, save directly
      performSave(projectName);
    }
  };

  const handleSaveProjectConfirm = (finalProjectName: string) => {
    // Update project name if it was changed
    if (finalProjectName !== projectName) {
      setProjectName(finalProjectName);
    }
    
    performSave(finalProjectName);
  };

  const performSave = (nameToSave: string) => {
    try {
      console.log('Saving project:', nameToSave);
      
      // Get thumbnail URL from the selected template
      const currentTemplate = templates.find((t) => t.id === selectedTemplate);
      const thumbnailUrl = currentTemplate?.thumbnailUrl || '';
      
      // Create project data
      const projectData = {
        name: nameToSave,
        html: editorContent.bodyContent,
        css: editorContent.css,
        savedAt: new Date().toISOString(),
        version: '1.0',
        thumbnailUrl
      };
      
      // Save to saved_template_projects list only
      const savedProjects = JSON.parse(localStorage.getItem('saved_template_projects') || '[]');
      const existingIndex = savedProjects.findIndex((p: any) => p.name === nameToSave);
      
      if (existingIndex >= 0) {
        savedProjects[existingIndex] = projectData;
      } else {
        savedProjects.push(projectData);
      }
      
      localStorage.setItem('saved_template_projects', JSON.stringify(savedProjects));
      
      console.log('Project saved successfully to localStorage');
      
      // Show success notification
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 4000);
      
    } catch (error) {
      console.error('Error saving project:', error);
      // TODO: Show error notification
    }
  };

  const handleProjectLoad = (project: any) => {
    setProjectName(project.name);
    console.log('Project loaded:', project.name);
  };

  const handleProjectNameChange = (name: string) => {
    setProjectName(name);
    console.log('Project name changed to:', name);
  };

  return (
    <Stack gap={0} h="100vh" style={{ overflow: 'hidden', position: 'relative' }}>
      <Header 
        projectName={projectName}
        onNewProject={handleNewProject}
        onSaveProject={handleSaveProject}
        onProjectNameChange={handleProjectNameChange}
        onToggleSidebar={handleToggleSidebar}
        onProfile={handleProfile}
        onMyProjects={handleMyProjects}
        onLogOut={handleLogOut}
        onLogoClick={onNavigateToHome}
        showSidebarToggle={!sidebarOpen}
        saveDisabled={!selectedTemplate && !editorContent.bodyContent}
      />
      
      <Flex style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
        {/* Editor Area - Full width and height */}
        <div style={{ flex: 1, minWidth: 0, height: '100%' }}>
          <EditorPanel ref={editorRef} onSelectTemplate={handleOpenSidebar} onProjectLoad={handleProjectLoad} />
        </div>

        {/* Right Sidebar with Control Panel */}
        <div style={{ width: '350px', flexShrink: 0, borderLeft: '1px solid var(--mantine-color-gray-3)', height: '100%' }}>
          <RightSidebar grapesEditor={grapesEditor} />
        </div>

      </Flex>

      {/* Template Sidebar Overlay - Positioned at root level to cover header */}
      {sidebarOpen && (
        <>
          {/* Backdrop - covers entire viewport including header */}
          <div 
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              zIndex: 1001,
              animation: 'fadeIn 0.3s ease-out',
            }}
            onClick={handleCloseSidebar}
          />
          {/* Sidebar - positioned to cover header as well */}
          <div style={{ 
            position: 'fixed',
            top: 0,
            left: 0,
            width: '300px',
            height: '100vh',
            backgroundColor: 'white',
            borderRight: '1px solid var(--mantine-color-gray-3)',
            zIndex: 1002,
            boxShadow: '2px 0 8px rgba(0, 0, 0, 0.15)',
            animation: 'slideInLeft 0.3s ease-out',
          }}>
            <TemplateSidebar onTemplateSelect={handleCloseSidebar} />
          </div>
        </>
      )}

      {/* Success Notification */}
      {showNotification && (
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          zIndex: 1000
        }}>
          <Notification
            icon={<Check size={18} />}
            color="green"
            title="Project Saved!"
            onClose={() => setShowNotification(false)}
            withCloseButton
          >
            {projectName} has been saved to your browser's local storage.
          </Notification>
        </div>
      )}

      {/* New Project Modal */}
      <NewProjectModal
        opened={newProjectModalOpen}
        onClose={() => setNewProjectModalOpen(false)}
        onConfirm={handleNewProjectConfirm}
      />

      {/* Save Project Modal */}
      <SaveProjectModal
        opened={saveProjectModalOpen}
        onClose={() => {
          setSaveProjectModalOpen(false);
          setExistingProjectDetected(false);
        }}
        onConfirm={handleSaveProjectConfirm}
        initialProjectName={projectName}
        existingProject={existingProjectDetected}
      />
    </Stack>
  );
}

export function TemplateEditor({ onNavigateToProjects, onNavigateToProfile, onNavigateToHome, onLogout }: TemplateEditorProps) {
  return (
    <Provider store={store}>
      <TemplateEditorContent 
        onNavigateToProjects={onNavigateToProjects}
        onNavigateToProfile={onNavigateToProfile}
        onNavigateToHome={onNavigateToHome}
        onLogout={onLogout}
      />
    </Provider>
  );
}