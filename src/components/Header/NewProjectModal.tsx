import { Modal, TextInput, Button, Stack, Group } from '@mantine/core';
import { useModal } from '../../hooks/useModal';
import { validateAndCheckProject } from '../../utils/projectValidation';

interface NewProjectModalProps {
  opened: boolean;
  onClose: () => void;
  onConfirm: (projectName: string) => void;
}

export function NewProjectModal({ opened, onClose, onConfirm }: NewProjectModalProps) {
  const modal = useModal('');

  const handleConfirm = () => {
    const validation = validateAndCheckProject(modal.value);
    
    if (!validation.isValid) {
      modal.setValidationError(validation.error!);
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
      title="Create New Project"
      centered
      size="md"
    >
      <Stack gap="md">
        <TextInput
          label="Project Name"
          placeholder="Enter your project name"
          value={modal.value}
          onChange={(event) => modal.updateValue(event.currentTarget.value)}
          onKeyPress={handleKeyPress}
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
            Create Project
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
}