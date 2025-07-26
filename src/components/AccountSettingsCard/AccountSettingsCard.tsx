import React, { useState } from 'react';
import { Card, Stack, Text, Switch, Group, Button, Divider, Notification } from '@mantine/core';
import { Settings, Bell, Mail, Shield, CheckCircle } from 'lucide-react';
import { UserPreferences } from '../../types/schema';
import { ChangePasswordModal } from '../ChangePasswordModal/ChangePasswordModal';

interface AccountSettingsCardProps {
  preferences: UserPreferences;
  onUpdatePreferences: (preferences: UserPreferences) => void;
}

export function AccountSettingsCard({ preferences, onUpdatePreferences }: AccountSettingsCardProps) {
  const [passwordModalOpened, setPasswordModalOpened] = useState(false);
  const [showPasswordSuccessNotification, setShowPasswordSuccessNotification] = useState(false);
  const handleNotificationsChange = (checked: boolean) => {
    onUpdatePreferences({
      ...preferences,
      notifications: checked
    });
  };

  const handleNewsletterChange = (checked: boolean) => {
    onUpdatePreferences({
      ...preferences,
      newsletter: checked
    });
  };

  const handlePasswordChanged = () => {
    setShowPasswordSuccessNotification(true);
    setTimeout(() => setShowPasswordSuccessNotification(false), 4000);
  };

  const handleChangePasswordClick = () => {
    setPasswordModalOpened(true);
  };

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Stack gap="lg">
        <Group gap="xs">
          <Settings size={20} />
          <Text size="lg" fw={600}>
            Account Settings
          </Text>
        </Group>

        <Stack gap="md">
          <Text size="md" fw={500} c="dimmed">
            Preferences
          </Text>
          
          <Group justify="space-between">
            <Group gap="xs">
              <Bell size={16} />
              <div>
                <Text size="sm" fw={500}>
                  Push Notifications
                </Text>
                <Text size="xs" c="dimmed">
                  Receive notifications about your projects
                </Text>
              </div>
            </Group>
            <Switch
              checked={preferences.notifications}
              onChange={(e) => handleNotificationsChange(e.currentTarget.checked)}
            />
          </Group>

          <Group justify="space-between">
            <Group gap="xs">
              <Mail size={16} />
              <div>
                <Text size="sm" fw={500}>
                  Newsletter
                </Text>
                <Text size="xs" c="dimmed">
                  Receive updates and tips via email
                </Text>
              </div>
            </Group>
            <Switch
              checked={preferences.newsletter}
              onChange={(e) => handleNewsletterChange(e.currentTarget.checked)}
            />
          </Group>

        </Stack>

        <Divider />

        <Stack gap="md">
          <Text size="md" fw={500} c="dimmed">
            Security
          </Text>
          
          <Group justify="space-between">
            <Group gap="xs">
              <Shield size={16} />
              <div>
                <Text size="sm" fw={500}>
                  Change Password
                </Text>
                <Text size="xs" c="dimmed">
                  Update your account password
                </Text>
              </div>
            </Group>
            <Button 
              variant="light" 
              size="xs"
              onClick={handleChangePasswordClick}
            >
              Change
            </Button>
          </Group>
        </Stack>
      </Stack>

      <ChangePasswordModal
        opened={passwordModalOpened}
        onClose={() => setPasswordModalOpened(false)}
        onPasswordChanged={handlePasswordChanged}
      />

      {/* Password Success Notification */}
      {showPasswordSuccessNotification && (
        <div
          style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            zIndex: 10000,
          }}
        >
          <Notification
            icon={<CheckCircle size={20} />}
            color="green"
            title="Password Updated!"
            onClose={() => setShowPasswordSuccessNotification(false)}
            style={{
              boxShadow: '0 10px 40px rgba(0, 0, 0, 0.15)',
              border: '1px solid rgba(34, 197, 94, 0.2)',
            }}
          >
            Your password has been successfully updated.
          </Notification>
        </div>
      )}
    </Card>
  );
}