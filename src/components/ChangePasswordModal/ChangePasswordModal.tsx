import React, { useState } from 'react';
import { Modal, Stack, PasswordInput, Button, Group, Text, Alert } from '@mantine/core';
import { Lock, AlertCircle, CheckCircle } from 'lucide-react';

interface ChangePasswordModalProps {
  opened: boolean;
  onClose: () => void;
  onPasswordChanged: () => void;
}

export function ChangePasswordModal({ opened, onClose, onPasswordChanged }: ChangePasswordModalProps) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const validatePasswords = (): boolean => {
    if (!currentPassword.trim()) {
      setError('Current password is required');
      return false;
    }

    if (!newPassword.trim()) {
      setError('New password is required');
      return false;
    }

    if (newPassword.length < 6) {
      setError('New password must be at least 6 characters long');
      return false;
    }

    if (newPassword !== confirmPassword) {
      setError('New passwords do not match');
      return false;
    }

    // Validate current password against stored password
    const signInInfo = localStorage.getItem('webbuilder_signin');
    if (signInInfo) {
      try {
        const parsedInfo = JSON.parse(signInInfo);
        if (parsedInfo.credentials && parsedInfo.credentials.password !== currentPassword) {
          setError('Current password is incorrect');
          return false;
        }
      } catch (error) {
        setError('Error validating current password');
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validatePasswords()) {
      return;
    }

    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      try {
        // Update password in localStorage
        const signInInfo = localStorage.getItem('webbuilder_signin');
        if (signInInfo) {
          const parsedInfo = JSON.parse(signInInfo);
          if (parsedInfo.credentials) {
            parsedInfo.credentials.password = newPassword;
            localStorage.setItem('webbuilder_signin', JSON.stringify(parsedInfo));
          }
        }

        onPasswordChanged();
        handleClose();
      } catch (error) {
        setError('Failed to update password. Please try again.');
      } finally {
        setLoading(false);
      }
    }, 1000);
  };

  const handleClose = () => {
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setError('');
    onClose();
  };

  return (
    <Modal
      opened={opened}
      onClose={handleClose}
      title={
        <Group gap="xs">
          <Lock size={20} />
          <Text size="lg" fw={600}>
            Change Password
          </Text>
        </Group>
      }
      centered
      size="md"
      radius="md"
    >
      <form onSubmit={handleSubmit}>
        <Stack gap="md">
          {error && (
            <Alert 
              icon={<AlertCircle size={16} />} 
              color="red" 
              variant="light"
              radius="md"
            >
              {error}
            </Alert>
          )}

          <PasswordInput
            label="Current Password"
            placeholder="Enter your current password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.currentTarget.value)}
            leftSection={<Lock size={16} />}
            required
            radius="md"
          />

          <PasswordInput
            label="New Password"
            placeholder="Enter your new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.currentTarget.value)}
            leftSection={<Lock size={16} />}
            required
            radius="md"
            description="Password must be at least 6 characters long"
          />

          <PasswordInput
            label="Confirm New Password"
            placeholder="Confirm your new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.currentTarget.value)}
            leftSection={<Lock size={16} />}
            required
            radius="md"
          />

          <Group justify="space-between" mt="md">
            <Button
              variant="subtle"
              onClick={handleClose}
              disabled={loading}
            >
              Cancel
            </Button>
            
            <Button
              type="submit"
              loading={loading}
              disabled={!currentPassword || !newPassword || !confirmPassword}
              style={{
                background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                border: 'none',
              }}
            >
              Update Password
            </Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  );
}