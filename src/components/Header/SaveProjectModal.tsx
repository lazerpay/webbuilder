import { useState } from 'react';
import { Modal, TextInput, Button, Stack, Group, Alert } from '@mantine/core';
import { AlertTriangle } from 'lucide-react';

interface SaveProjectModalProps {
  opened: boolean;
  onClose: () => void;
  onConfirm: (projectName: string) => void;
  initialProjectName: string;
  existingProject?: boolean;
}

export function SaveProjectModal({ 
  opened, 
  onClose, 
  onConfirm, 
  initialProjectName,
  existingProject = false 
}: SaveProjectModalProps) {
  const [projectName, setProjectName] = useState(initialProjectName);
  const [error, setError] = useState('');

  const handleConfirm = () => {
    const trimmedName = projectName.trim();
    
    if (!trimmedName) {
      setError('Project name is required');
      return;
    }
    
    if (trimmedName.length < 2) {
      setError('Project name must be at least 2 characters');
      return;
    }

    // Check if the new name already exists
    const savedProjects = JSON.parse(localStorage.getItem('saved_template_projects') || '[]');
    const duplicateProject = savedProjects.find((p: any) => p.name.toLowerCase() === trimmedName.toLowerCase());
    
    if (duplicateProject) {
      setError('A project with this name already exists. Please choose a different name.');
      return;
    }

    onConfirm(trimmedName);
    handleClose();
  };

  const handleClose = () => {
    setProjectName(initialProjectName);
    setError('');
    onClose();
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleConfirm();
    }
  };

  return (
    <Modal
      opened={opened}
      onClose={handleClose}
      title="Save Project"
      centered
      size="md"
    >
      <Stack gap="md">
        {existingProject && (
          <Alert
            icon={<AlertTriangle size={16} />}
            color="yellow"
            title="Project Already Exists"
          >
            A project with the name "{initialProjectName}" already exists. Please choose a different name.
          </Alert>
        )}
        
        <TextInput
          label="Project Name"
          placeholder="Enter your project name"
          value={projectName}
          onChange={(event) => {
            setProjectName(event.currentTarget.value);
            setError('');
          }}
          onKeyDown={handleKeyPress}
          error={error}
          autoFocus
          required
        />
        
        <Group justify="flex-end" gap="sm">
          <Button
            variant="outline"
            onClick={handleClose}
          >
            Cancel
          </Button>
          
          <Button
            onClick={handleConfirm}
            disabled={!projectName.trim()}
          >
            Save
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
}