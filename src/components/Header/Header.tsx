import React from 'react';
import { Group, Button, Avatar } from '@mantine/core';
import { Plus, Save } from 'lucide-react';
import { EditableProjectName } from './EditableProjectName';
import { Logo } from './Logo';

interface HeaderProps {
  onNewProject?: () => void;
  onSaveProject?: () => void;
  onProjectNameChange?: (name: string) => void;
  projectName?: string;
}

export function Header({ 
  onNewProject, 
  onSaveProject,
  onProjectNameChange, 
  projectName = "Untitled Project" 
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
          <Logo size={40} />
          <div style={{ 
            width: '1px', 
            height: '24px', 
            backgroundColor: 'var(--mantine-color-gray-4)' 
          }} />
          <EditableProjectName 
            initialName={projectName}
            onNameChange={onProjectNameChange}
          />
        </Group>

        {/* Right Section */}
        <Group gap="md" align="center">
          <Button
            leftSection={<Save size={16} />}
            variant="outline"
            size="sm"
            onClick={onSaveProject}
          >
            Save Project
          </Button>
          <Button
            leftSection={<Plus size={16} />}
            variant="filled"
            size="sm"
            onClick={onNewProject}
          >
            New Project
          </Button>
          <Avatar 
            size="md" 
            radius="xl"
            src="https://i.pravatar.cc/150?img=1"
            alt="User Avatar"
          />
        </Group>
      </Group>
    </div>
  );
}