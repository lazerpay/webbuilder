import { Flex, Stack } from '@mantine/core';
import { useCallback } from 'react';
import { Header } from '../Header/Header';
import { NewProjectModal } from '../Header/NewProjectModal';
import { SaveProjectModal } from '../Header/SaveProjectModal';
import { TemplateSidebar } from '../TemplateSidebar/TemplateSidebar';
import { EditorPanel } from '../EditorPanel/EditorPanel';
import { RightSidebar } from '../RightSidebar/RightSidebar';
import { NotificationToast } from '../NotificationToast/NotificationToast';
import { useTemplateEditor } from '../../hooks/useTemplateEditor';

interface TemplateEditorContentProps {
  onNavigateToProjects?: () => void;
  onNavigateToProfile?: () => void;
  onNavigateToHome?: () => void;
  onLogout?: () => void;
}

export function TemplateEditorContent({ 
  onNavigateToProjects, 
  onNavigateToProfile, 
  onNavigateToHome, 
  onLogout 
}: TemplateEditorContentProps) {
  const {
    state,
    editorRef,
    notification,
    actions,
    handleNewProjectConfirm,
    handleSaveProject,
    handleSaveProjectConfirm,
    handleProjectLoad,
    handleProjectNameChange,
    hideNotification,
    saveDisabled,
  } = useTemplateEditor();

  const handleProfile = useCallback(() => {
    if (onNavigateToProfile) {
      onNavigateToProfile();
    }
  }, [onNavigateToProfile]);

  const handleMyProjects = useCallback(() => {
    if (onNavigateToProjects) {
      onNavigateToProjects();
    }
  }, [onNavigateToProjects]);

  const handleLogOut = useCallback(() => {
    if (onLogout) {
      onLogout();
    }
  }, [onLogout]);

  return (
    <Stack gap={0} h="100vh" style={{ overflow: 'hidden', position: 'relative' }}>
      <Header 
        projectName={state.projectName}
        onNewProject={actions.openNewProjectModal}
        onSaveProject={handleSaveProject}
        onProjectNameChange={handleProjectNameChange}
        onToggleSidebar={actions.toggleSidebar}
        onProfile={handleProfile}
        onMyProjects={handleMyProjects}
        onLogOut={handleLogOut}
        onLogoClick={onNavigateToHome}
        showSidebarToggle={!state.sidebarOpen}
        saveDisabled={saveDisabled}
      />
      
      <Flex style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
        {/* Editor Area - Full width and height */}
        <div style={{ flex: 1, minWidth: 0, height: '100%' }}>
          <EditorPanel 
            ref={editorRef} 
            onSelectTemplate={actions.openSidebar} 
            onProjectLoad={handleProjectLoad} 
          />
        </div>

        {/* Right Sidebar with Control Panel */}
        <div style={{ 
          width: '350px', 
          flexShrink: 0, 
          borderLeft: '1px solid var(--mantine-color-gray-3)', 
          height: '100%' 
        }}>
          <RightSidebar grapesEditor={state.grapesEditor} />
        </div>
      </Flex>

      {/* Template Sidebar Overlay - Positioned at root level to cover header */}
      {state.sidebarOpen && (
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
            onClick={actions.closeSidebar}
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
            <TemplateSidebar onTemplateSelect={actions.closeSidebar} />
          </div>
        </>
      )}

      {/* Success Notification */}
      <NotificationToast
        notification={notification}
        onClose={hideNotification}
      />

      {/* New Project Modal */}
      <NewProjectModal
        opened={state.newProjectModalOpen}
        onClose={actions.closeNewProjectModal}
        onConfirm={handleNewProjectConfirm}
      />

      {/* Save Project Modal */}
      <SaveProjectModal
        opened={state.saveProjectModalOpen}
        onClose={actions.closeSaveProjectModal}
        onConfirm={handleSaveProjectConfirm}
        initialProjectName={state.projectName}
        existingProject={state.existingProjectDetected}
      />
    </Stack>
  );
}