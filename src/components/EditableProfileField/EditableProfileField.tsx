import React, { useState } from 'react';
import { Group, Text, TextInput, ActionIcon, Button } from '@mantine/core';
import { Edit, Check, X } from 'lucide-react';

interface EditableProfileFieldProps {
  label: string;
  value: string;
  type?: 'text' | 'email';
  onSave: (value: string) => void;
  placeholder?: string;
  required?: boolean;
}

export function EditableProfileField({ 
  label, 
  value, 
  type = 'text',
  onSave, 
  placeholder,
  required = false 
}: EditableProfileFieldProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);
  const [error, setError] = useState('');

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSave = () => {
    if (required && !editValue.trim()) {
      setError(`${label} is required`);
      return;
    }

    if (type === 'email' && !validateEmail(editValue)) {
      setError('Please enter a valid email address');
      return;
    }

    setError('');
    onSave(editValue);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditValue(value);
    setError('');
    setIsEditing(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditValue(value);
  };

  if (isEditing) {
    return (
      <div>
        <Text size="sm" fw={500} mb="xs">
          {label}
        </Text>
        <Group gap="xs" align="flex-start">
          <div style={{ flex: 1 }}>
            <TextInput
              value={editValue}
              onChange={(e) => setEditValue(e.currentTarget.value)}
              placeholder={placeholder}
              type={type}
              error={error}
              autoFocus
            />
          </div>
          <ActionIcon
            color="green"
            variant="light"
            onClick={handleSave}
            disabled={!editValue.trim()}
          >
            <Check size={16} />
          </ActionIcon>
          <ActionIcon
            color="red"
            variant="light"
            onClick={handleCancel}
          >
            <X size={16} />
          </ActionIcon>
        </Group>
      </div>
    );
  }

  return (
    <Group justify="space-between" align="center">
      <div>
        <Text size="sm" fw={500} c="dimmed">
          {label}
        </Text>
        <Text size="md">
          {value || 'Not set'}
        </Text>
      </div>
      <ActionIcon
        variant="subtle"
        onClick={handleEdit}
        aria-label={`Edit ${label}`}
      >
        <Edit size={16} />
      </ActionIcon>
    </Group>
  );
}