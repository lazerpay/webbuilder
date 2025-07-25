import { useRef, useState, useEffect } from 'react';
import { Flex, Stack, Notification } from '@mantine/core';
import { Check } from 'lucide-react';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import { useAppSelector, useAppDispatch } from '../../hooks/redux';
import { selectTemplate, updateEditorContent } from '../../store/templateStore';
import { Header } from '../Header/Header';
import { NewProjectModal } from '../Header/NewProjectModal';
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

function TemplateEditorContent() {
  const editorRef = useRef<EditorPanelRef>(null);
  const [grapesEditor, setGrapesEditor] = useState<any>(null);
  const [projectName, setProjectName] = useState("My Template Project");
  const [showNotification, setShowNotification] = useState(false);
  const [newProjectModalOpen, setNewProjectModalOpen] = useState(false);
  const { editorContent } = useAppSelector((state) => state.template);
  const dispatch = useAppDispatch();

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

  const handleNewProject = () => {
    setNewProjectModalOpen(true);
  };

  const handleNewProjectConfirm = (newProjectName: string) => {
    console.log('Creating new project:', newProjectName);
    
    // Update the project name immediately
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
  };

  const handleSaveProject = () => {
    try {
      console.log('Saving project:', projectName);
      
      // Create full HTML with CSS
      const fullHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${projectName}</title>
    <style>
${editorContent.css}
    </style>
</head>
<body>
${editorContent.bodyContent}
</body>
</html>`;

      // Minify the HTML and CSS
      const minifiedHtml = minifyHtml(fullHtml);
      const minifiedCss = minifyCss(editorContent.css);
      
      // Create project data
      const projectData = {
        name: projectName,
        html: minifiedHtml,
        css: minifiedCss,
        bodyContent: minifyHtml(editorContent.bodyContent),
        savedAt: new Date().toISOString(),
        version: '1.0'
      };
      
      // Save to localStorage
      const storageKey = `template_project_${projectName.toLowerCase().replace(/[^a-z0-9]/g, '_')}`;
      localStorage.setItem(storageKey, JSON.stringify(projectData));
      
      // Also maintain a list of saved projects
      const savedProjects = JSON.parse(localStorage.getItem('saved_template_projects') || '[]');
      const existingIndex = savedProjects.findIndex((p: any) => p.name === projectName);
      
      if (existingIndex >= 0) {
        savedProjects[existingIndex] = { name: projectName, key: storageKey, savedAt: projectData.savedAt };
      } else {
        savedProjects.push({ name: projectName, key: storageKey, savedAt: projectData.savedAt });
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
      />
      
      <Flex style={{ flex: 1, overflow: 'hidden' }}>
      {/* Template Sidebar */}
      <div style={{ width: '300px', flexShrink: 0, borderRight: '1px solid var(--mantine-color-gray-3)' }}>
        <TemplateSidebar />
      </div>

      {/* Editor Area - Full width and height */}
      <div style={{ flex: 1, minWidth: 0, height: '100%' }}>
        <EditorPanel ref={editorRef} />
      </div>

        {/* Right Sidebar with Control Panel */}
        <div style={{ width: '350px', flexShrink: 0, borderLeft: '1px solid var(--mantine-color-gray-3)', height: '100%' }}>
          <RightSidebar grapesEditor={grapesEditor} />
        </div>
      </Flex>

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
    </Stack>
  );
}

export function TemplateEditor() {
  return (
    <Provider store={store}>
      <TemplateEditorContent />
    </Provider>
  );
}