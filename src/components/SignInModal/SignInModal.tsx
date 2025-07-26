import React, { useState } from 'react';
import { 
  Modal, 
  Stack, 
  TextInput, 
  PasswordInput, 
  Button, 
  Text, 
  Group,
  Divider,
  Paper,
  Alert
} from '@mantine/core';
import { User, Lock, Info } from 'lucide-react';

interface SignInModalProps {
  opened: boolean;
  onClose: () => void;
  onSignIn: (email: string, password: string) => void;
  onShowSuccessNotification: () => void;
}

export function SignInModal({ opened, onClose, onSignIn, onShowSuccessNotification }: SignInModalProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const dummyCredentials = [
    { email: 'demo@webbuilder.com', password: 'demo123' },
    { email: 'admin@webbuilder.com', password: 'admin123' },
    { email: 'user@webbuilder.com', password: 'user123' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      onSignIn(email, password);
      onShowSuccessNotification();
      setLoading(false);
      onClose();
      setEmail('');
      setPassword('');
    }, 1000);
  };

  const fillCredentials = (creds: { email: string; password: string }) => {
    setEmail(creds.email);
    setPassword(creds.password);
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={
        <Text size="lg" fw={600}>
          Sign In to WebBuilder
        </Text>
      }
      centered
      size="md"
      radius="md"
    >
      <Stack gap="md">
        {/* Demo Credentials Info */}
        <Alert 
          icon={<Info size={16} />} 
          color="blue" 
          variant="light"
          radius="md"
        >
          <Text size="sm" mb="xs" fw={500}>
            Demo Credentials (Click to auto-fill):
          </Text>
          <Stack gap="xs">
            {dummyCredentials.map((creds, index) => (
              <Paper
                key={index}
                p="xs"
                style={{
                  cursor: 'pointer',
                  border: '1px solid #e9ecef',
                  borderRadius: '6px',
                  transition: 'all 0.2s ease',
                }}
                onClick={() => fillCredentials(creds)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#f8f9fa';
                  e.currentTarget.style.borderColor = '#6366f1';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.borderColor = '#e9ecef';
                }}
              >
                <Group gap="xs">
                  <Text size="xs" c="dimmed">Email:</Text>
                  <Text size="xs" fw={500}>{creds.email}</Text>
                  <Text size="xs" c="dimmed">Password:</Text>
                  <Text size="xs" fw={500}>{creds.password}</Text>
                </Group>
              </Paper>
            ))}
          </Stack>
        </Alert>

        <Divider />

        {/* Sign In Form */}
        <form onSubmit={handleSubmit}>
          <Stack gap="md">
            <TextInput
              label="Email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
              leftSection={<User size={16} />}
              required
              radius="md"
            />

            <PasswordInput
              label="Password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.currentTarget.value)}
              leftSection={<Lock size={16} />}
              required
              radius="md"
            />

            <Group justify="space-between" mt="md">
              <Button
                variant="subtle"
                onClick={onClose}
                disabled={loading}
              >
                Cancel
              </Button>
              
              <Button
                type="submit"
                loading={loading}
                style={{
                  background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                  border: 'none',
                }}
              >
                Sign In
              </Button>
            </Group>
          </Stack>
        </form>
      </Stack>
    </Modal>
  );
}