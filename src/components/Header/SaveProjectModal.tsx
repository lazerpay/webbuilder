import { useEffect } from 'react';
import { Modal, TextInput, Button, Stack, Group, Alert } from '@mantine/core';
import { AlertTriangle } from 'lucide-react';
import { useModal } from '../../hooks/useModal';
import { validateProjectName, checkProjectExists } from '../../utils/projectValidation';

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
  const modal = useModal(initialProjectName);

  // Update modal value when initialProjectName changes
  useEffect(() => {
    modal.updateValue(initialProjectName);
  }, [initialProjectName]);

  const handleConfirm = () => {
    const validation = validateProjectName(modal.value);
    
    if (!validation.isValid) {
      modal.setValidationError(validation.error!);
      return;
    }

    // Check if the new name already exists (only if it's different from initial)
    if (modal.value.trim() !== initialProjectName && checkProjectExists(modal.value)) {
      modal.setValidationError('A project with this name already exists. Please choose a different name.');
      return;
    }

    onConfirm(modal.value.trim());
    modal.close();
    onClose();
  };

  const handleClose = () => {
    modal.close();
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
          value={modal.value}
          onChange={(event) => modal.updateValue(event.currentTarget.value)}
          onKeyDown={handleKeyPress}
          error={modal.error}
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
            disabled={!modal.value.trim()}
          >
            Save
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
}