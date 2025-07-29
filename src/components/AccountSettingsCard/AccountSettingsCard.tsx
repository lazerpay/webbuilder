import React from 'react';
import { Card, Stack, Text, Switch, Group, Button, Divider } from '@mantine/core';
import { Settings, Bell, Mail, Shield, CheckCircle } from 'lucide-react';
import { UserPreferences } from '../../types/schema';
import { ChangePasswordModal } from '../ChangePasswordModal/ChangePasswordModal';
import { NotificationToast } from '../NotificationToast/NotificationToast';
import { useToggle } from '../../hooks/useToggle';
import { useNotification } from '../../hooks/useNotification';

interface AccountSettingsCardProps {
  preferences: UserPreferences;
  onUpdatePreferences: (preferences: UserPreferences) => void;
}

export function AccountSettingsCard({ preferences, onUpdatePreferences }: AccountSettingsCardProps) {
  const [passwordModalOpened, { setTrue: openPasswordModal, setFalse: closePasswordModal }] = useToggle(false);
  const { notification, showNotification, hideNotification } = useNotification();
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
    showNotification('Your password has been successfully updated.', {
      title: 'Password Updated!',
      icon: <CheckCircle size={20} />,
      color: 'green',
      duration: 4000
    });
  };

  const handleChangePasswordClick = () => {
    openPasswordModal();
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
        onClose={closePasswordModal}
        onPasswordChanged={handlePasswordChanged}
      />

      {/* Password Success Notification */}
      <NotificationToast
        notification={notification}
        onClose={hideNotification}
      />
    </Card>
  );
}