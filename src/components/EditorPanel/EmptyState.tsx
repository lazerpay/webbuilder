import React from 'react';
import { Stack, Text, Center } from '@mantine/core';
import { Logo } from '../Header/Logo';

export function EmptyState() {
  return (
    <Center h="100%">
      <Stack align="center" gap="lg">
        <Logo size={80} />
        
        <Text 
          fz="md" 
          c="dimmed" 
          ta="center"
          style={{ maxWidth: '400px', lineHeight: 1.6 }}
        >
          Click on a template from the left to begin editing
        </Text>
      </Stack>
    </Center>
  );
}