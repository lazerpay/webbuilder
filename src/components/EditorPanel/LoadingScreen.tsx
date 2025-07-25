import React from 'react';
import { Stack, Text, Loader, Center } from '@mantine/core';
import { Logo } from '../Header/Logo';

export function LoadingScreen() {
  return (
    <Center h="100%">
      <Stack align="center" gap="xl">
        <Logo size={60} />
        
        <Stack align="center" gap="md">
          <Loader size="md" />
          <Text 
            fz="lg" 
            fw={500} 
            c="dark"
          >
            Initializing editor
          </Text>
          <Text 
            fz="sm" 
            c="dimmed" 
            ta="center"
          >
            Please wait while we load your template...
          </Text>
        </Stack>
      </Stack>
    </Center>
  );
}