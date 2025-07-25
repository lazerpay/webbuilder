import { useState } from 'react';
import { Modal, TextInput, Button, Stack, Group } from '@mantine/core';

interface NewProjectModalProps {
  opened: boolean;
  onClose: () => void;
  onConfirm: (projectName: string) => void;
}

export function NewProjectModal({ opened, onClose, onConfirm }: NewProjectModalProps) {
  const [projectName, setProjectName] = useState('');
  const [error, setError] = useState('');

  const handleConfirm = () => {
    if (!projectName.trim()) {
      setError('Project name is required');
      return;
    }
    
    if (projectName.trim().length < 2) {
      setError('Project name must be at least 2 characters');
      return;
    }

    onConfirm(projectName.trim());
    handleClose();
  };

  const handleClose = () => {
    setProjectName('');
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
      title="Create New Project"
      centered
      size="md"
    >
      <Stack gap="md">
        <TextInput
          label="Project Name"
          placeholder="Enter your project name"
          value={projectName}
          onChange={(event) => {
            setProjectName(event.currentTarget.value);
            setError('');
          }}
          onKeyPress={handleKeyPress}
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
            Create Project
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
}