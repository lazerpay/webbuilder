import React from 'react';
import { Modal, Stack, Text, Button, Group } from '@mantine/core';

interface ConfirmationModalProps {
  opened: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  confirmColor?: string;
}

export function ConfirmationModal({
  opened,
  onClose,
  onConfirm,
  title,
  message,
  confirmLabel = "Delete",
  cancelLabel = "Cancel",
  confirmColor = "red"
}: ConfirmationModalProps) {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={title}
      centered
      size="sm"
    >
      <Stack gap="md">
        <Text size="sm">
          {message}
        </Text>
        <Text size="xs" c="dimmed">
          This action cannot be undone.
        </Text>

        <Group justify="flex-end" mt="md">
          <Button variant="subtle" onClick={onClose}>
            {cancelLabel}
          </Button>
          <Button color={confirmColor} onClick={handleConfirm}>
            {confirmLabel}
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
}