import React from 'react';
import { Card, Stack, Group, Avatar, Text, Badge } from '@mantine/core';
import { Mail, Calendar, User } from 'lucide-react';
import { EditableProfileField } from '../EditableProfileField/EditableProfileField';
import { formatMemberSince, formatLastLogin } from '../../utils/stringFormatters';
import { UserProfile } from '../../types/schema';

interface UserInfoCardProps {
  user: UserProfile;
  onUpdateProfile: (updates: Partial<UserProfile>) => void;
}

export function UserInfoCard({ user, onUpdateProfile }: UserInfoCardProps) {
  const handleNameUpdate = (name: string) => {
    onUpdateProfile({ name });
  };

  const handleEmailUpdate = (email: string) => {
    onUpdateProfile({ email });
  };

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Stack gap="lg">
        <Group gap="lg" align="flex-start">
          <Avatar
            src={user.avatar}
            size="xl"
            radius="md"
          />
          <div style={{ flex: 1 }}>
            <Group gap="xs" mb="xs">
              <Text size="xl" fw={700}>
                {user.name}
              </Text>
              {user.isEmailVerified && (
                <Badge color="green" size="sm" variant="light">
                  Verified
                </Badge>
              )}
            </Group>
            <Group gap="xs" c="dimmed" mb="sm">
              <Mail size={16} />
              <Text size="sm">{user.email}</Text>
            </Group>
            <Group gap="xl">
              <Group gap="xs" c="dimmed">
                <Calendar size={16} />
                <Text size="sm">
                  Member since {formatMemberSince(user.memberSince)}
                </Text>
              </Group>
              <Group gap="xs" c="dimmed">
                <User size={16} />
                <Text size="sm">
                  Last login: {formatLastLogin(user.lastLogin)}
                </Text>
              </Group>
            </Group>
          </div>
        </Group>

        <Stack gap="md">
          <Text size="lg" fw={600}>
            Profile Information
          </Text>
          
          <EditableProfileField
            label="Full Name"
            value={user.name}
            onSave={handleNameUpdate}
            placeholder="Enter your full name"
            required
          />
          
          <EditableProfileField
            label="Email Address"
            value={user.email}
            type="email"
            onSave={handleEmailUpdate}
            placeholder="Enter your email address"
            required
          />
        </Stack>
      </Stack>
    </Card>
  );
}