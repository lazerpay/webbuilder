import React from 'react';
import { Group, Button, ActionIcon } from '@mantine/core';
import { Plus, Save, PanelLeftOpen } from 'lucide-react';
import { EditableProjectName } from './EditableProjectName';
import { UserMenu } from './UserMenu';
import { Logo } from './Logo';

interface HeaderProps {
  onNewProject?: () => void;
  onSaveProject?: () => void;
  onProjectNameChange?: (name: string) => void;
  onToggleSidebar?: () => void;
  onProfile?: () => void;
  onMyProjects?: () => void;
  onLogOut?: () => void;
  onLogoClick?: () => void;
  projectName?: string;
  showSidebarToggle?: boolean;
  showProjectActions?: boolean;
  showProjectName?: boolean;
  saveDisabled?: boolean;
}

export function Header({ 
  onNewProject, 
  onSaveProject,
  onProjectNameChange, 
  onToggleSidebar,
  onProfile,
  onMyProjects,
  onLogOut,
  onLogoClick,
  projectName = "Untitled Project",
  showSidebarToggle = false,
  showProjectActions = true,
  showProjectName = true,
  saveDisabled = false
}: HeaderProps) {
  return (
    <div 
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        backgroundColor: 'white',
        borderBottom: '1px solid var(--mantine-color-gray-3)',
        padding: '12px 24px',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
      }}
    >
      <Group justify="space-between" align="center">
        {/* Left Section */}
        <Group gap="lg" align="center">
          {showSidebarToggle && (
            <ActionIcon
              variant="subtle"
              size="lg"
              onClick={onToggleSidebar}
              aria-label="Open sidebar"
            >
              <PanelLeftOpen size={20} />
            </ActionIcon>
          )}
          <Logo size={40} onClick={onLogoClick} />
          {showProjectName && (
            <>
              <div style={{ 
                width: '1px', 
                height: '24px', 
                backgroundColor: 'var(--mantine-color-gray-4)' 
              }} />
              <EditableProjectName 
                initialName={projectName}
                onNameChange={onProjectNameChange}
              />
            </>
          )}
        </Group>

        {/* Right Section */}
        <Group gap="md" align="center">
          {showProjectActions && (
            <>
              <Button
                leftSection={<Save size={16} />}
                variant="outline"
                size="sm"
                onClick={onSaveProject}
                disabled={saveDisabled}
              >
                Save Project
              </Button>
              <Button
                leftSection={<Plus size={16} />}
                variant="filled"
                size="sm"
                onClick={onNewProject}
                style={{ pointerEvents: 'none', cursor: 'normal' }}
              >
                New Project
              </Button>
            </>
          )}
          <UserMenu 
            onProfile={onProfile}
            onMyProjects={onMyProjects}
            onLogOut={onLogOut}
          />
        </Group>
      </Group>
    </div>
  );
}